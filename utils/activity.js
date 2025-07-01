import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Logs an activity to the database
 * @param {string} projectId - Project ID
 * @param {string} description - Detailed message for UI
 * @param {string} actionType - Enum-like string e.g., ISSUE_CREATED, STATUS_UPDATED
 * @param {string} [issueId] - Optional Issue ID
 */
export async function logActivity(
    projectId,
    description,
    actionType,
    issueId = null,
    dbUserId
) {
    const { userId } = await auth();
    if (!userId) return;

    await db.activity.create({
        data: {
            projectId,
            userId: dbUserId,
            description,
            actionType,
            issueId,
        },
    });
}
