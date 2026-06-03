import Link from "next/link";
import { PILOT_LESSONS } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";

export default function EnglishPage() {
  const meta = PILOT_LESSONS.english;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-900">{meta.label}</h1>
        <p className="text-sm text-purple-700">
          {meta.examBoard} · {meta.lessonsPerWeek} lessons per week
        </p>
      </div>

      <ul className="space-y-3">
        {meta.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/workbook/${lesson.id}`}
              className="flex items-center justify-between rounded-lg border border-purple-200 bg-white px-4 py-4 hover:border-purple-500"
            >
              <div>
                <p className="font-medium text-gray-900">{lesson.title}</p>
                <p className="text-sm text-gray-600">
                  Lesson units {lesson.lessonUnits} · {lesson.blockTitle}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  lessonExists(lesson.id)
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {lessonExists(lesson.id) ? "Available" : "Coming soon"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" className="text-sm text-purple-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
