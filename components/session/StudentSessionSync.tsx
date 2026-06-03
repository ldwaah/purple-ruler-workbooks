"use client";

import { useEffect } from "react";
import { syncStudentSessionFromCookies } from "@/lib/student-session";

/** Copies httpOnly-adjacent cookies into sessionStorage for client API calls. */
export function StudentSessionSync() {
  useEffect(() => {
    syncStudentSessionFromCookies();
  }, []);
  return null;
}
