import Link from "next/link";
import { notFound } from "next/navigation";
import { loadLesson } from "@/lib/lessons";
import { WorkbookClient } from "@/components/workbook/WorkbookClient";

type Props = { params: Promise<{ lessonId: string }> };

export default async function WorkbookPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = loadLesson(lessonId);
  if (!lesson) notFound();

  const subjectTab = lesson.subject === "english" ? "english" : "maths";
  const hubHref = `/hub?tab=${subjectTab}`;

  return (
    <div>
      <Link
        href={hubHref}
        className="no-print mb-6 inline-block pr-btn-ghost text-sm"
      >
        Back to {lesson.subject === "english" ? "English" : "Maths"}
      </Link>
      <WorkbookClient lesson={lesson} />
    </div>
  );
}
