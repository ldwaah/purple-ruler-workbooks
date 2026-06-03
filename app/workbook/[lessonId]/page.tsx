import Link from "next/link";
import { notFound } from "next/navigation";
import { loadLesson } from "@/lib/lessons";
import { WorkbookClient } from "@/components/workbook/WorkbookClient";

type Props = { params: Promise<{ lessonId: string }> };

export default async function WorkbookPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = loadLesson(lessonId);
  if (!lesson) notFound();

  const subjectHref = lesson.subject === "english" ? "/english" : "/maths";

  return (
    <div>
      <Link
        href={subjectHref}
        className="no-print mb-4 inline-block text-sm text-purple-700 hover:underline"
      >
        ← Back to {lesson.subject === "english" ? "English" : "Maths"}
      </Link>
      <WorkbookClient lesson={lesson} />
    </div>
  );
}
