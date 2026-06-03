"use client";

import { useCallback, useEffect, useState } from "react";
import type { ItemResponse } from "@/lib/progress";
import { getStudentSession, syncStudentSessionFromCookies } from "@/lib/student-session";

type SubmitPanelProps = {
  lessonId: string;
  responses: Record<string, ItemResponse>;
};

type SubmitState = "idle" | "submitting" | "done" | "error";

export function SubmitPanel({ lessonId, responses }: SubmitPanelProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);

  useEffect(() => {
    syncStudentSessionFromCookies();
  }, []);

  const submit = useCallback(async () => {
    const session = getStudentSession();
    if (!session) {
      setState("error");
      setMessage("We could not find your student link. Ask your teacher for it.");
      return;
    }

    setState("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          responses,
          studentToken: session.token,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        pointsAwarded?: number;
        totalPoints?: number;
        alreadySubmitted?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again in a moment.");
        return;
      }

      setState("done");
      setTotalPoints(data.totalPoints ?? null);
      if (data.alreadySubmitted) {
        setMessage("Already submitted. Your teacher can see your work.");
      } else if (data.pointsAwarded && data.pointsAwarded > 0) {
        setMessage(`Submitted! +${data.pointsAwarded} points`);
      } else {
        setMessage("Submitted! Your teacher can see your work.");
      }
    } catch {
      setState("error");
      setMessage("Could not reach the server. Check your connection and try again.");
    }
  }, [lessonId, responses]);

  return (
    <div className="pr-panel-active flex flex-col items-center gap-4 p-8 text-center">
      {state === "done" ? (
        <>
          <p className="font-display text-xl font-bold text-violet-900">
            {message}
          </p>
          {totalPoints !== null && (
            <p className="text-sm text-violet-600">
              You have {totalPoints} points in total.
            </p>
          )}
        </>
      ) : (
        <>
          <p className="font-display text-lg font-bold text-violet-900">
            Ready to hand in?
          </p>
          <p className="max-w-sm text-sm text-violet-700">
            Send your answers to your teacher. You earn 10 points when you submit
            a workbook for the first time.
          </p>
          {message && state === "error" && (
            <p className="text-sm text-pink-700" role="alert">
              {message}
            </p>
          )}
          <button
            type="button"
            onClick={submit}
            disabled={state === "submitting"}
            className="pr-btn-primary disabled:opacity-60"
          >
            {state === "submitting" ? "Sending…" : "Submit my work"}
          </button>
        </>
      )}
    </div>
  );
}
