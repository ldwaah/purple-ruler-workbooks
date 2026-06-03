import type { Lesson } from "@/lib/schema";

export function LessonMeta({ lesson }: { lesson: Lesson }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2 text-sm">
      <span className="rounded-full bg-violet-200 px-3 py-0.5 font-bold text-violet-900">
        {lesson.subject === "english" ? "📖 English" : "🔢 Maths"}
      </span>
      <span className="rounded-full bg-fuchsia-200 px-3 py-0.5 font-bold text-fuchsia-900">
        Year {lesson.year}
      </span>
      <span className="rounded-full bg-amber-200 px-3 py-0.5 font-bold text-amber-900">
        Lesson {lesson.lessonUnits}
      </span>
      <span className="rounded-full bg-sky-200 px-3 py-0.5 font-bold text-sky-900">
        {lesson.examBoard}
      </span>
    </div>
  );
}
