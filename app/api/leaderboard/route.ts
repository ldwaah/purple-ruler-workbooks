import { NextResponse } from "next/server";
import { getDbMode, getLeaderboard, getStudentByToken } from "@/lib/db";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const student = await getStudentByToken(token);
  if (!student) {
    return NextResponse.json({ error: "Unknown student" }, { status: 401 });
  }

  const entries = await getLeaderboard(student.class_id);
  const me = entries.find((e) => e.student_id === student.id);

  return NextResponse.json({
    classId: student.class_id,
    studentId: student.id,
    studentName: student.name,
    myPoints: me?.total_points ?? 0,
    entries,
    dbMode: getDbMode(),
  });
}
