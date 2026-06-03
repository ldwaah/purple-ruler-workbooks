import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { STUDENT_TOKEN_COOKIE } from "@/lib/db/config";
import { getStudentByToken, submitWorkbook } from "@/lib/db";

const bodySchema = z.object({
  lessonId: z.string().min(1),
  responses: z.record(z.string(), z.unknown()),
  studentToken: z.string().optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token =
    parsed.data.studentToken ??
    cookieStore.get(STUDENT_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const student = await getStudentByToken(token);
  if (!student) {
    return NextResponse.json({ error: "Unknown student link" }, { status: 401 });
  }

  try {
    const result = await submitWorkbook({
      studentId: student.id,
      lessonId: parsed.data.lessonId,
      responses: parsed.data.responses,
    });

    return NextResponse.json({
      ok: true,
      submissionId: result.submission.id,
      pointsAwarded: result.pointsAwarded,
      totalPoints: result.totalPoints,
      alreadySubmitted: result.pointsAwarded === 0,
    });
  } catch (err) {
    console.error("submitWorkbook", err);
    return NextResponse.json(
      { error: "Could not save submission" },
      { status: 500 },
    );
  }
}
