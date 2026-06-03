import { isSupabaseConfigured } from "./config";
import type {
  LeaderboardEntry,
  StudentRow,
  SubmissionRow,
  SubmissionWithStudent,
  TeacherRow,
} from "./types";
import * as local from "./local-store";
import * as supabase from "./supabase";

export { isSupabaseConfigured, POINTS_PER_SUBMISSION } from "./config";
export type * from "./types";

export function getDbMode(): "supabase" | "local" {
  return isSupabaseConfigured() ? "supabase" : "local";
}

export async function getStudentByToken(
  token: string,
): Promise<StudentRow | null> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetStudentByToken(token);
  }
  return local.localGetStudentByToken(token);
}

export async function getTeacherByToken(
  token: string,
): Promise<TeacherRow | null> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetTeacherByToken(token);
  }
  return local.localGetTeacherByToken(token);
}

export async function submitWorkbook(input: {
  studentId: string;
  lessonId: string;
  responses: Record<string, unknown>;
}): Promise<{
  submission: SubmissionRow;
  pointsAwarded: number;
  totalPoints: number;
}> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseSubmitWorkbook(input);
  }
  return local.localSubmitWorkbook(input);
}

export async function getLeaderboard(
  classId: string,
): Promise<LeaderboardEntry[]> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetLeaderboard(classId);
  }
  return local.localGetLeaderboard(classId);
}

export async function getStudentPoints(studentId: string): Promise<number> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetStudentPoints(studentId);
  }
  return local.localGetStudentPoints(studentId);
}

export async function getSubmissionsForTeacher(
  teacherToken: string,
): Promise<SubmissionWithStudent[]> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetSubmissionsForTeacher(teacherToken);
  }
  return local.localGetSubmissionsForTeacher(teacherToken);
}

export async function getSubmissionById(
  submissionId: string,
  teacherToken: string,
): Promise<SubmissionWithStudent | null> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetSubmissionById(submissionId, teacherToken);
  }
  return local.localGetSubmissionById(submissionId, teacherToken);
}

export async function getStudentsForTeacher(
  teacherToken: string,
): Promise<StudentRow[]> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetStudentsForTeacher(teacherToken);
  }
  return local.localGetStudentsForTeacher(teacherToken);
}

export async function getClassIdForTeacher(
  teacherToken: string,
): Promise<string | null> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseGetClassIdForTeacher(teacherToken);
  }
  return local.localGetClassIdForTeacher(teacherToken);
}

export async function createStudent(input: {
  teacherToken: string;
  name: string;
  token: string;
}): Promise<{ student: StudentRow } | { error: string; status: number }> {
  if (isSupabaseConfigured()) {
    return supabase.supabaseCreateStudent(input);
  }
  return local.localCreateStudent(input);
}
