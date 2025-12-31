import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// routes that require authentication
const isProtectedRoute = createRouteMatcher([
    "/onboarding(.*)",
    "/organisation(.*)",
    "/project(.*)",
    "/issue(.*)",
    "/sprint(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, orgId, redirectToSignIn } = await auth();

    // If user is not logged in and trying to access a protected route, redirect to sign-in
    if (!userId && isProtectedRoute(req)) {
        return redirectToSignIn();
    }

    const isOnboardingOrRoot =
        req.nextUrl.pathname === "/onboarding" || req.nextUrl.pathname === "/";

    // If user is logged in but hasn't selected an organization, 
    // redirect them to the onboarding page (unless already there or at root)
    if (userId && !orgId && !isOnboardingOrRoot) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Continue normally if all checks pass
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always match API and tRPC routes
        "/(api|trpc)(.*)",
    ],
};
