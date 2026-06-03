import Link from "next/link";
import { PILOT_LESSONS } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";

export default function MathsPage() {
  const meta = PILOT_LESSONS.maths;

  return (
    <div className="space-y-8">
      <header>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          {meta.examBoard}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white">
          {meta.label}
        </h1>
        <p className="mt-2 text-sm text-violet-300/80">
          {meta.lessonsPerWeek} lessons per week
        </p>
      </header>

      <ul className="space-y-4">
        {meta.lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link
              href={`/workbook/${lesson.id}`}
              className="group flex items-center justify-between gap-4 rounded-2xl pr-panel px-6 py-5 transition hover:border-violet-400/35"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-2xl font-bold text-violet-500/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-white group-hover:text-violet-100">
                    {lesson.title}
                  </p>
                  <p className="mt-1 text-sm text-violet-400/80">
                    Lesson {lesson.lessonUnits} · {lesson.blockTitle}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-4 py-1.5 font-display text-xs font-semibold ${
                  lessonExists(lesson.id)
                    ? "bg-violet-600/80 text-white"
                    : "bg-white/5 text-violet-500"
                }`}
              >
                {lessonExists(lesson.id) ? "Open" : "Soon"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" className="pr-btn-ghost inline-block text-sm">
        Back
      </Link>
    </div>
  );
}
