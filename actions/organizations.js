"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

// get db organization by [slug / organization name]
export async function getOrganization(slug) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const client = await clerkClient();
    const organization = await client.organizations.getOrganization({
        slug,
    });

    if (!organization) {
        return null;
    }

    const { data: membership } =
        await client.organizations.getOrganizationMembershipList({
            organizationId: organization.id,
        });

    const userMembership = membership.find(
        (member) => member.publicUserData.userId === userId
    );

    if (!userMembership) {
        return null;
    }

    return organization;
}

// get db projects by organization id
export async function getProjects(orgId) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const projects = await db.project.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: "desc" },
    });

    return projects;
}

// get user issues by user id and organization id
export async function getUserIssues(userId) {
    const { orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("No user id or organization id found");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const issues = await db.issue.findMany({
        where: {
            OR: [{ assigneeId: user.id }, { reporterId: user.id }],
            project: {
                organizationId: orgId,
            },
        },
        include: {
            project: true,
            assignee: true,
            reporter: true,
        },
        orderBy: { updatedAt: "desc" },
    });

    return issues;
}

// get all org users by organization id
export async function getOrganizationUsers(orgId) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const client = await clerkClient();
    const organizationMemberships =
        await client.organizations.getOrganizationMembershipList({
            organizationId: orgId,
        });

    const userIds = organizationMemberships.data.map(
        (membership) => membership.publicUserData.userId
    );

    const users = await db.user.findMany({
        where: {
            clerkUserId: {
                in: userIds,
            },
        },
    });

    return users;
}
