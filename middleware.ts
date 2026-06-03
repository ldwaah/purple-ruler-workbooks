import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STUDENT_TOKEN_COOKIE } from "@/lib/db/config";

const PROTECTED_PREFIXES = ["/hub", "/year", "/workbook", "/leaderboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsToken = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!needsToken) return NextResponse.next();

  const token = request.cookies.get(STUDENT_TOKEN_COOKIE)?.value;
  if (token) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/need-link";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/hub/:path*", "/year", "/workbook/:path*", "/leaderboard"],
};
