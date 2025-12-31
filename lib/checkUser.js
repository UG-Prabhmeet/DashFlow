import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// checks if user exists, if not creates a new user
export const checkUser = async () => {
    console.log("[checkUser] running");
    const user = await currentUser();

    console.log("[checkUser] currentUser:", user?.id);

    if (!user) {
        return null;
    }

    try {
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        if (loggedInUser) {
            console.log("[checkUser] user already exists:", loggedInUser.id);
            return loggedInUser;
        }

        const name = `${user.firstName} ${user.lastName}`;

        console.log("[checkUser] creating new user...");

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        console.log("[checkUser] new user created:", newUser.id);
        return newUser;
    } catch (error) {
        console.error("checkUser error:", error);
        return null;
    }
};
