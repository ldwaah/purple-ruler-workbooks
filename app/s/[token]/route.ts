import { NextResponse } from "next/server";
import { applyStudentCookies } from "@/lib/auth-cookies";
import { getStudentByToken } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const student = await getStudentByToken(token);

  if (!student) {
    return NextResponse.redirect(new URL("/need-link", request.url));
  }

  const url = new URL("/year", request.url);
  const response = NextResponse.redirect(url);
  applyStudentCookies(response, student);
  return response;
}
