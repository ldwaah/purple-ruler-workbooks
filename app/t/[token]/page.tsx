import Link from "next/link";
import { AddStudentForm } from "@/components/teacher/AddStudentForm";
import { CopyLinkButton } from "@/components/teacher/CopyLinkButton";
import { buildAppPath, getBaseUrl } from "@/lib/app-url";
import {
  getLeaderboard,
  getStudentsForTeacher,
  getSubmissionsForTeacher,
  getTeacherByToken,
} from "@/lib/db";
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
        <p className="text-sm text-violet-500">
          Pilot teachers use{" "}
          <code className="rounded bg-violet-50 px-1">/t/teacher-pilot-token</code>
        </p>
      </div>
    );
  }

  const baseUrl = await getBaseUrl();
  const teacherUrl = buildAppPath(baseUrl, `/t/${token}`);
  const students = await getStudentsForTeacher(token);
  const submissions = await getSubmissionsForTeacher(token);
  const classId = students[0]?.class_id;
  const leaderboard = classId ? await getLeaderboard(classId) : [];

  return (
    <div className="space-y-10">
      <header>
        <p className="font-display text-sm font-bold text-pink-500">
          Purple Ruler
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          Teacher dashboard
        </h1>
        <p className="mt-2 text-violet-600">
          Hello {teacher.name}. Share student magic links, review work, and
          check class points.
        </p>
      </header>

      <section className="pr-panel space-y-3 p-5">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-violet-500">
          Your teacher link
        </h2>
        <p className="text-sm text-violet-700">
          Bookmark this page. Students do not use this link.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <code className="break-all rounded-xl bg-violet-50 px-3 py-2 text-sm text-violet-900">
            {teacherUrl}
          </code>
          <CopyLinkButton url={teacherUrl} label="Copy URL" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-violet-900">
              Student magic links
            </h2>
            <p className="text-sm text-violet-600">
              Each student opens their own link once. No passwords.
            </p>
          </div>
          <Link
            href={`/t/${token}/leaderboard`}
            className="pr-btn-ghost text-sm"
          >
            Class leaderboard
          </Link>
        </div>

        <AddStudentForm teacherToken={token} />

        {students.length === 0 ? (
          <p className="pr-panel p-6 text-center text-violet-700">
            No students yet. Add one above, or run the Supabase bootstrap seed.
          </p>
        ) : (
          <div className="overflow-x-auto pr-panel">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 text-violet-500">
                  <th className="px-4 py-3 font-display font-bold">Name</th>
                  <th className="px-4 py-3 font-display font-bold">Magic link</th>
                  <th className="px-4 py-3 font-display font-bold"> </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const fullUrl = buildAppPath(baseUrl, `/s/${student.token}`);
                  return (
                    <tr
                      key={student.id}
                      className="border-b border-violet-50 last:border-0"
                    >
                      <td className="px-4 py-3 font-semibold text-violet-900">
                        {student.name}
                      </td>
                      <td className="px-4 py-3">
                        <code className="break-all text-violet-800">{fullUrl}</code>
                      </td>
                      <td className="px-4 py-3">
                        <CopyLinkButton url={fullUrl} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-violet-900">
          Submissions to review
        </h2>
        {submissions.length === 0 ? (
          <p className="pr-panel p-8 text-center text-violet-700">
            No submissions yet. Share student magic links so they can hand in
            work.
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
                <li
                  key={sub.id}
                  className="pr-panel flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
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
      </section>

      {leaderboard.length > 0 ? (
        <section className="pr-panel space-y-3 p-5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-violet-500">
            Class points (preview)
          </h2>
          <ol className="space-y-1 text-sm text-violet-800">
            {leaderboard.slice(0, 5).map((row, index) => (
              <li key={row.student_id} className="flex justify-between">
                <span>
                  {index + 1}. {row.name}
                </span>
                <span className="tabular-nums">{row.total_points}</span>
              </li>
            ))}
          </ol>
          <Link
            href={`/t/${token}/leaderboard`}
            className="pr-btn-ghost inline-block text-xs"
          >
            Open full class leaderboard
          </Link>
        </section>
      ) : null}
    </div>
  );
}
