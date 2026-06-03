import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  LeaderboardEntry,
  StudentRow,
  SubmissionRow,
  SubmissionWithStudent,
  TeacherRow,
} from "./types";
import { POINTS_PER_SUBMISSION } from "./config";

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export async function supabaseGetStudentByToken(
  token: string,
): Promise<StudentRow | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb
    .from("students")
    .select("id, name, token, class_id")
    .eq("token", token)
    .maybeSingle();
  if (error || !data) return null;
  return data as StudentRow;
}

export async function supabaseGetTeacherByToken(
  token: string,
): Promise<TeacherRow | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb
    .from("teachers")
    .select("id, name, token")
    .eq("token", token)
    .maybeSingle();
  if (error || !data) return null;
  return data as TeacherRow;
}

export async function supabaseSubmitWorkbook(input: {
  studentId: string;
  lessonId: string;
  responses: Record<string, unknown>;
}): Promise<{
  submission: SubmissionRow;
  pointsAwarded: number;
  totalPoints: number;
}> {
  const sb = getSupabaseAdmin();
  if (!sb) throw new Error("Supabase not configured");

  const { data: existing } = await sb
    .from("submissions")
    .select("*")
    .eq("student_id", input.studentId)
    .eq("lesson_id", input.lessonId)
    .maybeSingle();

  const now = new Date().toISOString();

  if (existing) {
    const { data: updated, error } = await sb
      .from("submissions")
      .update({
        responses: input.responses,
        status: "submitted",
        submitted_at: now,
      })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    const total = await supabaseGetStudentPoints(input.studentId);
    return {
      submission: updated as SubmissionRow,
      pointsAwarded: 0,
      totalPoints: total,
    };
  }

  const { data: created, error: createErr } = await sb
    .from("submissions")
    .insert({
      student_id: input.studentId,
      lesson_id: input.lessonId,
      responses: input.responses,
      status: "submitted",
      submitted_at: now,
    })
    .select()
    .single();
  if (createErr) throw createErr;

  const { data: pointsRow } = await sb
    .from("points")
    .select("total_points")
    .eq("student_id", input.studentId)
    .maybeSingle();

  const current = (pointsRow?.total_points as number) ?? 0;
  const next = current + POINTS_PER_SUBMISSION;

  await sb.from("points").upsert({
    student_id: input.studentId,
    total_points: next,
  });

  return {
    submission: created as SubmissionRow,
    pointsAwarded: POINTS_PER_SUBMISSION,
    totalPoints: next,
  };
}

export async function supabaseGetStudentPoints(
  studentId: string,
): Promise<number> {
  const sb = getSupabaseAdmin();
  if (!sb) return 0;
  const { data } = await sb
    .from("points")
    .select("total_points")
    .eq("student_id", studentId)
    .maybeSingle();
  return (data?.total_points as number) ?? 0;
}

export async function supabaseGetLeaderboard(
  classId: string,
): Promise<LeaderboardEntry[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data: students } = await sb
    .from("students")
    .select("id, name")
    .eq("class_id", classId);
  if (!students?.length) return [];

  const ids = students.map((s) => s.id);
  const { data: points } = await sb
    .from("points")
    .select("student_id, total_points")
    .in("student_id", ids);

  const byId = new Map(
    (points ?? []).map((p) => [p.student_id as string, p.total_points as number]),
  );

  return students
    .map((s) => ({
      student_id: s.id as string,
      name: s.name as string,
      total_points: byId.get(s.id as string) ?? 0,
    }))
    .sort((a, b) => b.total_points - a.total_points);
}

export async function supabaseGetSubmissionsForTeacher(
  teacherToken: string,
): Promise<SubmissionWithStudent[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const teacher = await supabaseGetTeacherByToken(teacherToken);
  if (!teacher) return [];

  const { data: classes } = await sb
    .from("classes")
    .select("id")
    .eq("teacher_id", teacher.id);
  const classIds = (classes ?? []).map((c) => c.id as string);
  if (!classIds.length) return [];

  const { data: students } = await sb
    .from("students")
    .select("id, name, class_id")
    .in("class_id", classIds);
  if (!students?.length) return [];

  const studentIds = students.map((s) => s.id as string);
  const nameById = new Map(students.map((s) => [s.id as string, s.name as string]));

  const { data: submissions } = await sb
    .from("submissions")
    .select("*")
    .in("student_id", studentIds)
    .order("submitted_at", { ascending: false });

  return (submissions ?? []).map((s) => ({
    ...(s as SubmissionRow),
    student_name: nameById.get(s.student_id as string) ?? "Student",
  }));
}

export async function supabaseGetSubmissionById(
  submissionId: string,
  teacherToken: string,
): Promise<SubmissionWithStudent | null> {
  const all = await supabaseGetSubmissionsForTeacher(teacherToken);
  return all.find((s) => s.id === submissionId) ?? null;
}
