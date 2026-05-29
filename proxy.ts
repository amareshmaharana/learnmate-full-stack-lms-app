import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { env } from "./lib/env";

const aj = arcjet({
  key: env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
        "STRIPE_WEBHOOK", // Allow Stripe webhooks
      ],
    }),
  ],
});

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Exclude static, image, favicon, auth API and the login page itself
  // to avoid middleware redirect loops when the app redirects to /login.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|login).*)"],
};

export default createMiddleware(aj, async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return proxy(request);
  }

  return NextResponse.next();
});
