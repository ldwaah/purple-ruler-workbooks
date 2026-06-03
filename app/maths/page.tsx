import Link from "next/link";
import { PILOT_LESSONS } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";

export default function MathsPage() {
  const meta = PILOT_LESSONS.maths;

  return (
    <div className="space-y-8">
      <header className="pr-panel p-8">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-pink-500">
          {meta.examBoard}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          {meta.label}
        </h1>
        <p className="mt-2 text-violet-600">
          {meta.lessonsPerWeek} lessons per week
        </p>
      </header>

      <ul className="space-y-4">
        {meta.lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link
              href={`/workbook/${lesson.id}`}
              className="pr-panel group flex items-center justify-between gap-4 px-6 py-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-2xl font-bold text-violet-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-violet-900">
                    {lesson.title}
                  </p>
                  <p className="mt-1 text-sm text-violet-600">
                    Lesson {lesson.lessonUnits} · {lesson.blockTitle}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-2xl px-4 py-2 font-display text-xs font-bold ${
                  lessonExists(lesson.id)
                    ? "pr-btn-primary"
                    : "border-2 border-violet-100 text-violet-400"
                }`}
              >
                {lessonExists(lesson.id) ? "Open" : "Soon"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/start" className="pr-btn-ghost inline-block text-sm">
        Back
      </Link>
    </div>
  );
}
