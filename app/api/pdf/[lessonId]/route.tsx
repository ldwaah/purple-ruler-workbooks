import { notFound } from "next/navigation";
import { renderToBuffer } from "@react-pdf/renderer";
import { loadLesson } from "@/lib/lessons";
import { LessonPdfDocument } from "@/components/pdf/LessonPdfDocument";

type Props = { params: Promise<{ lessonId: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { lessonId } = await params;
  const lesson = loadLesson(lessonId);
  if (!lesson) notFound();

  const buffer = await renderToBuffer(
    <LessonPdfDocument lesson={lesson} />,
  );

  const filename = `${lesson.id.replace(/\./g, "-")}-workbook.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
