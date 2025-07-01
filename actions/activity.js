"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getRecentProjectActivity(projectId) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const project = await db.project.findUnique({
        where: { id: projectId },
    });

    if (!project || project.organizationId !== orgId) {
        throw new Error("Unauthorized");
    }

    const activity = await db.activity.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
            project: true,
            user: true,
        },
    });

    return activity;
}
