import type { Lesson } from "@/lib/schema";

export function LessonMeta({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-2 text-sm text-gray-700">
      <p>
        <span className="font-medium text-purple-900">Subject:</span>{" "}
        {lesson.subject === "english" ? "English" : "Mathematics"} · Year{" "}
        {lesson.year} · {lesson.examBoard}
      </p>
      <p>
        <span className="font-medium text-purple-900">Lesson unit(s):</span>{" "}
        {lesson.lessonUnits}
      </p>
      <p>
        <span className="font-medium text-purple-900">Block:</span>{" "}
        {lesson.blockTitle}
      </p>
    </div>
  );
}
