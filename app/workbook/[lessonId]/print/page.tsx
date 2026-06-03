import { notFound } from "next/navigation";
import { loadLesson } from "@/lib/lessons";
import { PrintWorkbook } from "@/components/workbook/PrintWorkbook";
import { PrintActions } from "@/components/workbook/PrintActions";

type Props = { params: Promise<{ lessonId: string }> };

export default async function PrintPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = loadLesson(lessonId);
  if (!lesson) notFound();

  return (
    <div>
      <PrintActions
        lessonId={lessonId}
        backHref={`/workbook/${lessonId}`}
      />
      <PrintWorkbook lesson={lesson} />
    </div>
  );
}
