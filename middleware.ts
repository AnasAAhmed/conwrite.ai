// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/checkout(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  const { pathname } = req.nextUrl;

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.nextUrl.pathname + "?auth=sign-in" });
  }

  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
