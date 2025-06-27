"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Get all comments for an issue
export async function getComments(issueId) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    if (!issueId) {
        throw new Error("Missing issue ID");
    }

    return await db.comment.findMany({
        where: { issueId },
        include: { author: true },
        orderBy: { createdAt: "asc" },
    });
}

// Create a new comment on an issue
export async function createComment({ issueId, content }) {
    const { userId, orgId } = await auth();

    console.log("🧪 DEBUG — createComment:", {
        userId,
        orgId,
        issueId,
        content,
        trimmed: content?.trim(),
    });

    if (!userId || !orgId || !issueId || !content?.trim()) {
        throw new Error("Missing required fields");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return await db.comment.create({
        data: {
            issueId,
            content,
            authorId: user.id,
        },
        include: {
            author: true,
        },
    });
}
