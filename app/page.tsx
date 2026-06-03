import Link from "next/link";
import { PILOT_LESSONS, LEARNING_JOURNEY } from "@/lib/curriculum";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-purple-900">
          KS4 Workbooks
        </h1>
        <p className="mt-2 max-w-2xl text-gray-700">
          Lesson-aligned practice for Purple Ruler students. Each workbook maps
          to your scheme of work lesson units — use it after your live lesson to
          stay on track.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {(["english", "maths"] as const).map((subject) => {
          const meta = PILOT_LESSONS[subject];
          return (
            <Link
              key={subject}
              href={`/${subject}`}
              className="block rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm transition hover:border-purple-500 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-purple-900">
                {meta.label}
              </h2>
              <p className="mt-1 text-sm text-purple-700">{meta.examBoard}</p>
              <p className="mt-3 text-sm text-gray-600">
                {meta.lessons.length} pilot workbook
                {meta.lessons.length !== 1 ? "s" : ""} ·{" "}
                {meta.lessonsPerWeek} lessons/week
              </p>
            </Link>
          );
        })}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Learning journey overview
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-medium text-purple-800">English — Year 10</h3>
            <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
              {LEARNING_JOURNEY.english.year10.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-purple-800">Maths — Year 10</h3>
            <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
              {LEARNING_JOURNEY.maths.year10.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
