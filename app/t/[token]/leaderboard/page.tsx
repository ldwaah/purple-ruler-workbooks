import Link from "next/link";
import { getClassIdForTeacher, getLeaderboard, getTeacherByToken } from "@/lib/db";

export default async function TeacherLeaderboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const teacher = await getTeacherByToken(token);

  if (!teacher) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <p className="text-violet-700">Teacher link not recognised.</p>
        <Link href="/" className="pr-btn-ghost text-sm">
          Home
        </Link>
      </div>
    );
  }

  const classId = await getClassIdForTeacher(token);
  const entries = classId ? await getLeaderboard(classId) : [];

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <header>
        <p className="font-display text-sm font-bold text-pink-500">
          Teacher view
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          Class leaderboard
        </h1>
        <p className="mt-2 text-violet-600">
          {teacher.name}, students earn 10 points on each new workbook submit.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className="pr-panel p-8 text-center text-violet-700">
          No points yet. Students appear here after they submit work.
        </p>
      ) : (
        <ol className="pr-panel space-y-2 p-6">
          {entries.map((row, index) => (
            <li
              key={row.student_id}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm text-violet-800"
            >
              <span>
                <span className="mr-2 text-violet-400">{index + 1}.</span>
                {row.name}
              </span>
              <span className="tabular-nums font-semibold">{row.total_points}</span>
            </li>
          ))}
        </ol>
      )}

      <p className="text-center">
        <Link href={`/t/${token}`} className="pr-btn-ghost text-sm">
          Back to teacher dashboard
        </Link>
      </p>
    </div>
  );
}
