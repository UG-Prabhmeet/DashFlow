"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { logActivity } from "@/utils/activity";

export async function getIssuesForSprint(sprintId) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const issues = await db.issue.findMany({
        where: { sprintId: sprintId },
        orderBy: [{ status: "asc" }, { order: "asc" }],
        include: {
            assignee: true,
            reporter: true,
        },
    });

    return issues;
}

export async function createIssue(projectId, data) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    let user = await db.user.findUnique({ where: { clerkUserId: userId } });

    const lastIssue = await db.issue.findFirst({
        where: { projectId, status: data.status },
        orderBy: { order: "desc" },
    });

    const newOrder = lastIssue ? lastIssue.order + 1 : 0;

    const issue = await db.issue.create({
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            projectId: projectId,
            sprintId: data.sprintId,
            reporterId: user.id,
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
            tags: data.tags || [],
            assigneeId: data.assigneeId || null,
            order: newOrder,
        },
        include: {
            assignee: true,
            reporter: true,
        },
    });

    await logActivity(
        projectId,
        `created issue '${issue.title}'`,
        "ISSUE_CREATED",
        issue.id,
        user.id // ✅ new argument
    );

    return issue;
}

export async function updateIssueOrder(updatedIssues) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    await db.$transaction(async (prisma) => {
        for (const issue of updatedIssues) {
            await prisma.issue.update({
                where: { id: issue.id },
                data: {
                    status: issue.status,
                    order: issue.order,
                },
            });
        }
    });

    return { success: true };
}

export async function deleteIssue(issueId) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
        throw new Error("User not found");
    }

    const issue = await db.issue.findUnique({
        where: { id: issueId },
        include: { project: true },
    });

    if (!issue) {
        throw new Error("Issue not found");
    }

    if (
        issue.reporterId !== user.id &&
        !issue.project.adminIds.includes(user.id)
    ) {
        throw new Error("You don't have permission to delete this issue");
    }

    await db.issue.delete({ where: { id: issueId } });

    await logActivity(
        issue.projectId,
        `deleted issue '${issue.title}'`,
        "ISSUE_DELETED",
        issue.id
    );

    return { success: true };
}

export async function updateIssue(issueId, data) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const issue = await db.issue.findUnique({
            where: { id: issueId },
            include: {
                project: true,
                assignee: true, // 👈 needed to fetch current assignee info
            },
        });

        if (!issue) {
            throw new Error("Issue not found");
        }

        if (issue.project.organizationId !== orgId) {
            throw new Error("Unauthorized");
        }

        if (
            user.id !== issue.reporterId &&
            !issue.project.adminIds.includes(user.id)
        ) {
            throw new Error("You don't have permission to update this issue");
        }

        const updates = {};
        const changeLogs = [];

        // === Status Change ===
        if (data.status && data.status !== issue.status) {
            changeLogs.push({
                desc: `changed status from '${issue.status}' to '${data.status}'`,
                type: "STATUS_UPDATED",
            });
            updates.status = data.status;
        }

        // === Priority Change ===
        if (data.priority && data.priority !== issue.priority) {
            changeLogs.push({
                desc: `changed priority from '${issue.priority}' to '${data.priority}'`,
                type: "PRIORITY_UPDATED",
            });
            updates.priority = data.priority;
        }

        // === Assignee Change ===
        if ("assigneeId" in data && data.assigneeId !== issue.assigneeId) {
            // Get previous assignee
            let previousAssignee = "Unassigned";
            if (issue.assigneeId) {
                const prevUser = await db.user.findUnique({
                    where: { id: issue.assigneeId },
                });
                previousAssignee =
                    prevUser?.name || prevUser?.email || "Unknown User";
            }

            // Get new assignee
            let newAssignee = "Unassigned";
            if (data.assigneeId) {
                const newUser = await db.user.findUnique({
                    where: { id: data.assigneeId },
                });
                newAssignee = newUser?.name || newUser?.email || "Unknown User";
            }

            updates.assigneeId = data.assigneeId || null;

            changeLogs.push({
                desc: `changed assignee from '${previousAssignee}' to '${newAssignee}'`,
                type: "ASSIGNEE_UPDATED",
            });
        }

        const updatedIssue = await db.issue.update({
            where: { id: issueId },
            data: updates,
            include: {
                assignee: true,
                reporter: true,
            },
        });

        for (const log of changeLogs) {
            await logActivity(
                issue.projectId,
                `${log.desc} for issue '${issue.title}'`,
                log.type,
                issue.id,
                user.id
            );
        }

        return updatedIssue;
    } catch (error) {
        throw new Error("Error updating issue: " + error.message);
    }
}
