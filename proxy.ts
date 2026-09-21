import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const PROTECTED_MATCHERS = [
  /^\/notes\/[^/]+\/exam(\/|$)/,
  /^\/results(\/|$)/,
  /^\/interview\/[^/]+/,
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_MATCHERS.some((pattern) => pattern.test(pathname));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const username = verifySessionToken(token);

  if (!username) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:slug/exam/:path*", "/results/:path*", "/interview/:track"],
};
