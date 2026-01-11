"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// get project report
export async function getProjectReport(projectId) {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) throw new Error("Unauthorized");

    const project = await db.project.findUnique({
        where: { id: projectId },
        include: {
            issues: { include: { assignee: true } },
            sprints: {
                orderBy: { createdAt: "desc" },
                include: { issues: true },
            },
        },
    });

    if (!project || project.organizationId !== orgId)
        throw new Error("Project not found");

    const allDates = [
        ...project.issues.map((i) => i.createdAt),
        ...project.sprints.map((s) => s.startDate),
    ];

    // find project start date
    const projectStartDate = new Date(
        Math.min(...allDates.map((d) => +new Date(d)))
    );
    // find project last activity based on issue updates
    const projectLastActivity = new Date(
        Math.max(...project.issues.map((i) => +new Date(i.updatedAt)))
    );

    const enrichedSprints = project.sprints.map((sprint) => {
        // no. of issues moved to 'DONE' status
        const closedIssues = sprint.issues.filter(
            (i) => i.status === "DONE"
        ).length;

        // total sprint duration
        const durationDays =
            (new Date(sprint.endDate) - new Date(sprint.startDate)) /
                (1000 * 60 * 60 * 24) +
            1;

        // velocity = avg issues closed per day
        const velocity = durationDays ? closedIssues / durationDays : 0;
        return {
            ...sprint,
            closedIssues,
            totalIssues: sprint.issues.length,
            velocity: +velocity.toFixed(2),
        };
    });

    return {
        ...project,
        sprints: enrichedSprints,
        projectStartDate,
        projectLastActivity,
    };
}
