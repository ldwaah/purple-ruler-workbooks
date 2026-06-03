import { promises as fs } from "fs";
import path from "path";
import type {
  ClassRow,
  LeaderboardEntry,
  PointsRow,
  StudentRow,
  SubmissionRow,
  SubmissionWithStudent,
  TeacherRow,
} from "./types";
import { POINTS_PER_SUBMISSION } from "./config";

export type LocalDb = {
  classes: ClassRow[];
  teachers: TeacherRow[];
  students: StudentRow[];
  submissions: SubmissionRow[];
  points: PointsRow[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "local-db.json");

const DEFAULT_DB: LocalDb = {
  classes: [
    {
      id: "class-pilot-ks4",
      name: "KS4 Pilot",
      teacher_id: "teacher-pilot",
    },
  ],
  teachers: [
    {
      id: "teacher-pilot",
      name: "Pilot Teacher",
      token: "teacher-pilot-token",
    },
  ],
  students: [
    {
      id: "student-alex",
      name: "Alex",
      token: "student-alex-token",
      class_id: "class-pilot-ks4",
    },
    {
      id: "student-sam",
      name: "Sam",
      token: "student-sam-token",
      class_id: "class-pilot-ks4",
    },
    {
      id: "student-jordan",
      name: "Jordan",
      token: "student-jordan-token",
      class_id: "class-pilot-ks4",
    },
  ],
  submissions: [],
  points: [
    { student_id: "student-alex", total_points: 0 },
    { student_id: "student-sam", total_points: 0 },
    { student_id: "student-jordan", total_points: 0 },
  ],
};

let memoryDb: LocalDb | null = null;

async function ensureStore(): Promise<LocalDb> {
  if (memoryDb) return memoryDb;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(STORE_PATH, "utf8");
    memoryDb = JSON.parse(raw) as LocalDb;
    return memoryDb;
  } catch {
    memoryDb = structuredClone(DEFAULT_DB);
    try {
      await fs.writeFile(STORE_PATH, JSON.stringify(memoryDb, null, 2));
    } catch {
      // Read-only FS (e.g. Vercel): in-memory only
    }
    return memoryDb;
  }
}

async function persist(db: LocalDb): Promise<void> {
  memoryDb = db;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(db, null, 2));
  } catch {
    // Ephemeral on serverless
  }
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function localGetStudentByToken(
  token: string,
): Promise<StudentRow | null> {
  const db = await ensureStore();
  return db.students.find((s) => s.token === token) ?? null;
}

export async function localGetTeacherByToken(
  token: string,
): Promise<TeacherRow | null> {
  const db = await ensureStore();
  return db.teachers.find((t) => t.token === token) ?? null;
}

export async function localSubmitWorkbook(input: {
  studentId: string;
  lessonId: string;
  responses: Record<string, unknown>;
}): Promise<{ submission: SubmissionRow; pointsAwarded: number; totalPoints: number }> {
  const db = await ensureStore();
  const existing = db.submissions.find(
    (s) => s.student_id === input.studentId && s.lesson_id === input.lessonId,
  );
  const now = new Date().toISOString();
  let pointsAwarded = 0;

  if (existing) {
    existing.responses = input.responses;
    existing.status = "submitted";
    existing.submitted_at = now;
    await persist(db);
    const pts =
      db.points.find((p) => p.student_id === input.studentId)?.total_points ?? 0;
    return { submission: existing, pointsAwarded: 0, totalPoints: pts };
  }

  const submission: SubmissionRow = {
    id: newId("sub"),
    student_id: input.studentId,
    lesson_id: input.lessonId,
    responses: input.responses,
    status: "submitted",
    submitted_at: now,
  };
  db.submissions.push(submission);
  pointsAwarded = POINTS_PER_SUBMISSION;
  let row = db.points.find((p) => p.student_id === input.studentId);
  if (!row) {
    row = { student_id: input.studentId, total_points: 0 };
    db.points.push(row);
  }
  row.total_points += pointsAwarded;
  await persist(db);
  return {
    submission,
    pointsAwarded,
    totalPoints: row.total_points,
  };
}

export async function localGetLeaderboard(
  classId: string,
): Promise<LeaderboardEntry[]> {
  const db = await ensureStore();
  const students = db.students.filter((s) => s.class_id === classId);
  return students
    .map((s) => {
      const pts =
        db.points.find((p) => p.student_id === s.id)?.total_points ?? 0;
      return { student_id: s.id, name: s.name, total_points: pts };
    })
    .sort((a, b) => b.total_points - a.total_points);
}

export async function localGetStudentPoints(
  studentId: string,
): Promise<number> {
  const db = await ensureStore();
  return db.points.find((p) => p.student_id === studentId)?.total_points ?? 0;
}

export async function localGetSubmissionsForTeacher(
  teacherToken: string,
): Promise<SubmissionWithStudent[]> {
  const db = await ensureStore();
  const teacher = db.teachers.find((t) => t.token === teacherToken);
  if (!teacher) return [];
  const classIds = db.classes
    .filter((c) => c.teacher_id === teacher.id)
    .map((c) => c.id);
  const studentIds = new Set(
    db.students.filter((s) => classIds.includes(s.class_id)).map((s) => s.id),
  );
  const nameById = new Map(db.students.map((s) => [s.id, s.name]));
  return db.submissions
    .filter((s) => studentIds.has(s.student_id))
    .map((s) => ({
      ...s,
      student_name: nameById.get(s.student_id) ?? "Student",
    }))
    .sort(
      (a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    );
}

export async function localGetSubmissionById(
  submissionId: string,
  teacherToken: string,
): Promise<SubmissionWithStudent | null> {
  const all = await localGetSubmissionsForTeacher(teacherToken);
  return all.find((s) => s.id === submissionId) ?? null;
}

export async function localSeedDb(seed: LocalDb): Promise<void> {
  await persist(seed);
}
