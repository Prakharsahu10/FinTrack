import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Clerk Middleware (Runs First)
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = auth();

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect("/sign-in"); // 🔹 Redirect if not signed in
  }

  return NextResponse.next();
});

// Arcjet Middleware (Runs After Clerk)
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

// Chain Middlewares: Clerk first, then ArcJet
export default createMiddleware(clerk, aj);

// Middleware Matcher
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
    "/sign-in",
    "/sign-up",
  ],
};
