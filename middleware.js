import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organisation(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth();

  // Redirect unauthenticated users from protected routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // Redirect users without an org to onboarding (unless already there)
  const isOnboardingOrRoot =
    req.nextUrl.pathname === "/onboarding" || req.nextUrl.pathname === "/";

  if (userId && !orgId && !isOnboardingOrRoot) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Continue normally
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
