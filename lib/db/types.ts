export type ClassRow = {
  id: string;
  name: string;
  teacher_id: string;
};

export type TeacherRow = {
  id: string;
  name: string;
  token: string;
};

export type StudentRow = {
  id: string;
  name: string;
  token: string;
  class_id: string;
};

export type SubmissionRow = {
  id: string;
  student_id: string;
  lesson_id: string;
  responses: Record<string, unknown>;
  status: "submitted" | "draft";
  submitted_at: string;
  file_url?: string | null;
};

export type PointsRow = {
  student_id: string;
  total_points: number;
};

export type SubmissionWithStudent = SubmissionRow & {
  student_name: string;
};

export type LeaderboardEntry = {
  student_id: string;
  name: string;
  total_points: number;
};
