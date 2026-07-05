import { NextResponse, type NextRequest } from "next/server";

/**
 * Auth gate stub (feature 110). While NEXT_PUBLIC_ENABLE_AUTH=false every
 * /auth request bounces home, so no auth surface exists in the UI at all.
 * Session refresh logic slots in here when auth goes live (AUTH_TODO.md).
 */
export default function proxy(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENABLE_AUTH !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};
