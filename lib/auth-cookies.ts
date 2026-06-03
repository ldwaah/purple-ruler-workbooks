import { NextResponse } from "next/server";
import {
  STUDENT_CLASS_COOKIE,
  STUDENT_ID_COOKIE,
  STUDENT_NAME_COOKIE,
  STUDENT_TOKEN_COOKIE,
} from "@/lib/db/config";
import type { StudentRow } from "@/lib/db/types";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export function applyStudentCookies(
  response: NextResponse,
  student: StudentRow,
): void {
  const secure = process.env.NODE_ENV === "production";
  const base = {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax" as const,
    secure,
  };
  // Readable by client for POST /api/submissions (magic link is the credential)
  response.cookies.set(STUDENT_TOKEN_COOKIE, student.token, base);
  response.cookies.set(STUDENT_NAME_COOKIE, student.name, base);
  response.cookies.set(STUDENT_ID_COOKIE, student.id, base);
  response.cookies.set(STUDENT_CLASS_COOKIE, student.class_id, base);
}
