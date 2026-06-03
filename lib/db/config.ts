export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export const POINTS_PER_SUBMISSION = 10;

export const STUDENT_TOKEN_COOKIE = "purple-ruler-student-token";
export const STUDENT_NAME_COOKIE = "purple-ruler-student-name";
export const STUDENT_ID_COOKIE = "purple-ruler-student-id";
export const STUDENT_CLASS_COOKIE = "purple-ruler-student-class";
