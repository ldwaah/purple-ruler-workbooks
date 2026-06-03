"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getStudentSession,
  syncStudentSessionFromCookies,
} from "@/lib/student-session";
import type { LeaderboardEntry } from "@/lib/db/types";

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [myPoints, setMyPoints] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myStudentId, setMyStudentId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    syncStudentSessionFromCookies();
    const session = getStudentSession();
    if (!session) {
      setError("We need your personal link to show points.");
      setLoading(false);
      return;
    }

    fetch(`/api/leaderboard?token=${encodeURIComponent(session.token)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json() as Promise<{
          myPoints: number;
          studentName: string;
          studentId: string;
          entries: LeaderboardEntry[];
        }>;
      })
      .then((data) => {
        setMyPoints(data.myPoints);
        setStudentName(data.studentName);
        setMyStudentId(data.studentId);
        setEntries(data.entries);
      })
      .catch(() => setError("Could not load points right now."))
      .finally(() => setLoading(false));
  }, []);

  const top = entries.slice(0, 5);
  const list = showAll ? entries : top;
  if (loading) {
    return (
      <p className="text-center text-violet-600" aria-live="polite">
        Loading your points
      </p>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md space-y-4 text-center">
        <p className="text-violet-700">{error}</p>
        <Link href="/need-link" className="pr-btn-primary inline-block">
          About your link
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <header className="text-center">
        <p className="font-display text-sm font-bold text-pink-500">Leaderboard</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          {myPoints}
        </h1>
        <p className="mt-1 text-sm text-violet-500">Your points</p>
        <p className="mt-2 text-violet-600">
          {studentName}, you earn 10 points each time you submit a new workbook.
        </p>
      </header>

      {entries.length > 0 && (
        <section className="pr-panel space-y-4 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-violet-500">
            Class top {showAll ? entries.length : Math.min(5, entries.length)}
          </h2>
          <ol className="space-y-2">
            {list.map((row, index) => {
              const isMe = row.student_id === myStudentId;
              return (
                <li
                  key={row.student_id}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                    isMe
                      ? "border-2 border-violet-200 bg-violet-50 font-semibold text-violet-900"
                      : "bg-white text-violet-800"
                  }`}
                >
                  <span>
                    <span className="mr-2 text-violet-400">{index + 1}.</span>
                    {row.name}
                    {isMe ? " (you)" : ""}
                  </span>
                  <span className="tabular-nums">{row.total_points}</span>
                </li>
              );
            })}
          </ol>
          {entries.length > 5 && (
            <button
              type="button"
              className="pr-btn-ghost w-full text-xs"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show top 5 only" : "Show full list"}
            </button>
          )}
        </section>
      )}

      <p className="text-center">
        <Link href="/hub" className="pr-btn-ghost text-sm">
          Back to workbooks
        </Link>
      </p>
    </div>
  );
}
