import Link from "next/link";
import { PILOT_LESSONS } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";
import { Mascot } from "@/components/ui/Mascot";

export default function EnglishPage() {
  const meta = PILOT_LESSONS.english;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Mascot mood="happy" />
        <div>
          <h1 className="font-display text-2xl font-bold text-violet-900">
            {meta.label}
          </h1>
          <p className="text-sm font-semibold text-fuchsia-600">
            {meta.examBoard} · {meta.lessonsPerWeek} lessons a week
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {meta.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/workbook/${lesson.id}`}
              className="cartoon-card flex items-center justify-between px-5 py-4 transition hover:scale-[1.01]"
            >
              <div>
                <p className="font-display font-bold text-violet-900">
                  {lesson.title}
                </p>
                <p className="text-sm text-violet-700">
                  Lesson {lesson.lessonUnits} · {lesson.blockTitle}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-display text-xs font-bold ${
                  lessonExists(lesson.id)
                    ? "bg-emerald-300 text-emerald-900"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {lessonExists(lesson.id) ? "▶ Start" : "Soon"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="font-display text-sm font-bold text-violet-700 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
