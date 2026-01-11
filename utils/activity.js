import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// logs activity to db
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
