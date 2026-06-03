import Link from "next/link";
import { CURRICULUM, type LessonMeta } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";

function groupByBlock(lessons: LessonMeta[]) {
  const seen = new Map<string, LessonMeta[]>();
  for (const lesson of lessons) {
    const list = seen.get(lesson.blockTitle) ?? [];
    list.push(lesson);
    seen.set(lesson.blockTitle, list);
  }
  return [...seen.entries()].map(([blockTitle, blockLessons]) => ({
    blockTitle,
    lessons: blockLessons,
  }));
}

export default function MathsPage() {
  const meta = CURRICULUM.maths;
  const years = [10, 11] as const;

  return (
    <div className="space-y-10">
      <header className="pr-panel p-8">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-pink-500">
          {meta.examBoard}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          {meta.label}
        </h1>
        <p className="mt-2 text-violet-600">
          {meta.lessonsPerWeek} lessons per week · {meta.lessons.length} workbooks
        </p>
      </header>

      {years.map((year) => {
        const yearLessons = meta.lessons.filter((l) => l.year === year);
        const blocks = groupByBlock(yearLessons);
        return (
          <section key={year} className="space-y-6">
            <h2 className="font-display text-xl font-bold text-violet-900">
              Year {year}
            </h2>
            {blocks.map((block) => (
              <div key={block.blockTitle} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-500">
                  {block.blockTitle}
                </h3>
                <ul className="space-y-3">
                  {block.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/workbook/${lesson.id}`}
                        className="pr-panel group flex items-center justify-between gap-4 px-5 py-4 transition hover:-translate-y-0.5"
                      >
                        <div>
                          <p className="font-display font-bold text-violet-900">
                            {lesson.title}
                          </p>
                          <p className="mt-0.5 text-sm text-violet-600">
                            Lesson {lesson.lessonUnits}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-2xl px-3 py-1.5 font-display text-xs font-bold ${
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
              </div>
            ))}
          </section>
        );
      })}

      <Link href="/start" className="pr-btn-ghost inline-block text-sm">
        Back
      </Link>
    </div>
  );
}
