import {
  STUDENT_CLASS_COOKIE,
  STUDENT_ID_COOKIE,
  STUDENT_NAME_COOKIE,
  STUDENT_TOKEN_COOKIE,
} from "@/lib/db/config";

export const STUDENT_TOKEN_STORAGE_KEY = "purple-ruler:studentToken";
export const STUDENT_NAME_STORAGE_KEY = "purple-ruler:studentName";
export const STUDENT_ID_STORAGE_KEY = "purple-ruler:studentId";
export const STUDENT_CLASS_STORAGE_KEY = "purple-ruler:studentClassId";

export type StudentSession = {
  token: string;
  name: string;
  id?: string;
  classId?: string;
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function getStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return null;
  try {
    const token =
      sessionStorage.getItem(STUDENT_TOKEN_STORAGE_KEY) ??
      readCookie(STUDENT_TOKEN_COOKIE);
    const name =
      sessionStorage.getItem(STUDENT_NAME_STORAGE_KEY) ??
      readCookie(STUDENT_NAME_COOKIE);
    const id =
      sessionStorage.getItem(STUDENT_ID_STORAGE_KEY) ??
      readCookie(STUDENT_ID_COOKIE);
    const classId =
      sessionStorage.getItem(STUDENT_CLASS_STORAGE_KEY) ??
      readCookie(STUDENT_CLASS_COOKIE);
    if (!token || !name) return null;
    return {
      token,
      name,
      ...(id ? { id } : {}),
      ...(classId ? { classId } : {}),
    };
  } catch {
    return null;
  }
}

export function setStudentSession(session: StudentSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STUDENT_TOKEN_STORAGE_KEY, session.token);
  sessionStorage.setItem(STUDENT_NAME_STORAGE_KEY, session.name);
  if (session.id) {
    sessionStorage.setItem(STUDENT_ID_STORAGE_KEY, session.id);
  }
  if (session.classId) {
    sessionStorage.setItem(STUDENT_CLASS_STORAGE_KEY, session.classId);
  }
}

export function clearStudentSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STUDENT_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(STUDENT_NAME_STORAGE_KEY);
  sessionStorage.removeItem(STUDENT_ID_STORAGE_KEY);
  sessionStorage.removeItem(STUDENT_CLASS_STORAGE_KEY);
}

export function syncStudentSessionFromCookies(): void {
  const session = getStudentSession();
  if (session) setStudentSession(session);
}
