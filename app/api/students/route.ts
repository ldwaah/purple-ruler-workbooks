import { NextResponse } from "next/server";
import { z } from "zod";
import { createStudent, getTeacherByToken } from "@/lib/db";
import { isValidStudentTokenSlug, slugifyName } from "@/lib/slugify";

const bodySchema = z.object({
  teacherToken: z.string().min(1),
  name: z.string().min(1).max(80),
  slug: z.string().max(48).optional(),
});

async function resolveUniqueToken(
  baseSlug: string,
  teacherToken: string,
): Promise<string> {
  const { getStudentsForTeacher } = await import("@/lib/db");
  const taken = new Set(
    (await getStudentsForTeacher(teacherToken)).map((s) => s.token),
  );
  if (!taken.has(baseSlug)) return baseSlug;
  for (let n = 2; n <= 99; n++) {
    const candidate = `${baseSlug}-${n}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${baseSlug}-${Date.now().toString(36)}`;
}

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

  const teacher = await getTeacherByToken(parsed.data.teacherToken);
  if (!teacher) {
    return NextResponse.json({ error: "Unknown teacher link" }, { status: 401 });
  }

  const slugProvided = Boolean(parsed.data.slug?.trim());
  const rawSlug = (
    parsed.data.slug?.trim() || slugifyName(parsed.data.name)
  ).toLowerCase();
  if (!isValidStudentTokenSlug(rawSlug)) {
    return NextResponse.json(
      {
        error:
          "Slug must use lowercase letters, numbers, and hyphens (e.g. michael).",
      },
      { status: 400 },
    );
  }

  const token = slugProvided
    ? rawSlug
    : await resolveUniqueToken(rawSlug, parsed.data.teacherToken);
  const result = await createStudent({
    teacherToken: parsed.data.teacherToken,
    name: parsed.data.name.trim(),
    token,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    ok: true,
    student: result.student,
    magicLinkPath: `/s/${result.student.token}`,
  });
}
