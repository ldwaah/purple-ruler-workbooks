"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getStudentSession,
  syncStudentSessionFromCookies,
} from "@/lib/student-session";
import { setStoredYear, type StoredYear } from "@/lib/year-session";

export function YearPicker() {
  const router = useRouter();
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    syncStudentSessionFromCookies();
    const session = getStudentSession();
    if (session?.name) setStudentName(session.name);
  }, []);

  function choose(year: StoredYear) {
    setStoredYear(year);
    router.push("/hub");
  }

  return (
    <div className="mx-auto max-w-lg space-y-10 py-4">
      <header className="text-center">
        {studentName ? (
          <p className="pr-welcome-fade font-display text-lg font-semibold text-violet-800">
            Welcome, {studentName}
          </p>
        ) : null}
        <p className="font-display text-sm font-bold text-pink-500">
          One step at a time
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-violet-900 sm:text-4xl">
          Pick your year
        </h1>
        <p className="mt-3 text-violet-600">
          Are you in Year 10 or Year 11?
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {([10, 11] as const).map((year) => (
          <button
            key={year}
            type="button"
            className="pr-panel group px-8 py-12 text-center transition hover:-translate-y-1 hover:border-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            onClick={() => choose(year)}
          >
            <span className="font-display text-4xl font-bold text-violet-900 group-hover:text-violet-700">
              Year {year}
            </span>
            <span className="mt-4 block font-display text-sm font-bold text-pink-500">
              Continue
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
