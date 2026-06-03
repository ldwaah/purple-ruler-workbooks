import type { Lesson } from "@/lib/schema";

export function LessonMeta({ lesson }: { lesson: Lesson }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="pr-badge">
        {lesson.subject === "english" ? "English" : "Mathematics"}
      </span>
      <span className="pr-badge">Year {lesson.year}</span>
      <span className="pr-badge">Lesson {lesson.lessonUnits}</span>
      <span className="pr-badge">{lesson.examBoard}</span>
    </div>
  );
}
