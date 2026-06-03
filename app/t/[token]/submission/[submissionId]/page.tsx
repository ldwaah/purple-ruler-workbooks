import Link from "next/link";
import { getSubmissionById } from "@/lib/db";
import { getLessonById } from "@/lib/lessons";

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "(empty)";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default async function TeacherSubmissionPage({
  params,
}: {
  params: Promise<{ token: string; submissionId: string }>;
}) {
  const { token, submissionId } = await params;
  const submission = await getSubmissionById(submissionId, token);

  if (!submission) {
    return (
      <div className="space-y-4">
        <p className="text-violet-700">Submission not found.</p>
        <Link href={`/t/${token}`} className="pr-btn-ghost text-sm">
          Back to list
        </Link>
      </div>
    );
  }

  const lesson = getLessonById(submission.lesson_id);
  const responses = submission.responses as Record<
    string,
    { value?: unknown; marked?: boolean; correct?: boolean }
  >;

  const itemLabels = new Map<string, string>();
  if (lesson) {
    for (const section of lesson.sections) {
      for (const item of section.items) {
        itemLabels.set(item.id, item.prompt ?? item.id);
      }
    }
  }

  const entries = Object.entries(responses);

  return (
    <div className="space-y-6">
      <header>
        <Link
          href={`/t/${token}`}
          className="text-sm font-semibold text-violet-600 hover:text-violet-900"
        >
          Back to submissions
        </Link>
        <h1 className="mt-4 font-display text-2xl font-bold text-violet-900">
          {submission.student_name}
        </h1>
        <p className="text-violet-700">
          {lesson?.title ?? submission.lesson_id}
        </p>
        <p className="text-xs text-violet-500">
          Submitted{" "}
          {new Date(submission.submitted_at).toLocaleString("en-GB", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
      </header>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <p className="pr-panel p-6 text-violet-700">No responses stored.</p>
        ) : (
          entries.map(([itemId, resp]) => (
            <article key={itemId} className="pr-panel space-y-2 p-5">
              <h2 className="font-display text-sm font-bold text-violet-800">
                {itemLabels.get(itemId) ?? itemId}
              </h2>
              <pre className="whitespace-pre-wrap rounded-lg bg-violet-50/80 p-3 text-sm text-violet-900">
                {formatValue(resp?.value)}
              </pre>
              {resp?.marked !== undefined && (
                <p className="text-xs text-violet-500">
                  Marked: {resp.marked ? "yes" : "no"}
                  {resp.correct !== undefined
                    ? ` · ${resp.correct ? "correct" : "needs review"}`
                    : ""}
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
