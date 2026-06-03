import Link from "next/link";
import { getSubmissionsForTeacher, getTeacherByToken } from "@/lib/db";
import { getLessonById } from "@/lib/lessons";

export default async function TeacherDashboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const teacher = await getTeacherByToken(token);

  if (!teacher) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <h1 className="font-display text-2xl font-bold text-violet-900">
          Link not recognised
        </h1>
        <p className="text-violet-700">
          Check the teacher link you were given, or ask for a new one.
        </p>
      </div>
    );
  }

  const submissions = await getSubmissionsForTeacher(token);

  return (
    <div className="space-y-8">
      <header>
        <p className="font-display text-sm font-bold text-pink-500">
          Teacher view
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          Submitted work
        </h1>
        <p className="mt-2 text-violet-600">
          Hello {teacher.name}. Students earn 10 points when they submit. You can
          review answers here.
        </p>
      </header>

      {submissions.length === 0 ? (
        <p className="pr-panel p-8 text-center text-violet-700">
          No submissions yet. Share student magic links so they can hand in work.
        </p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((sub) => {
            const lesson = getLessonById(sub.lesson_id);
            const title = lesson?.title ?? sub.lesson_id;
            const when = new Date(sub.submitted_at).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            });
            return (
              <li key={sub.id} className="pr-panel flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display font-bold text-violet-900">
                    {sub.student_name}
                  </p>
                  <p className="text-sm text-violet-700">{title}</p>
                  <p className="text-xs text-violet-500">{when}</p>
                </div>
                <Link
                  href={`/t/${token}/submission/${sub.id}`}
                  className="pr-btn-primary shrink-0 text-center text-sm"
                >
                  View responses
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
