import { SubjectWorkbookList } from "@/components/subject/SubjectWorkbookList";
import { CURRICULUM } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";

export default function EnglishPage() {
  const meta = CURRICULUM.english;
  const readyLessonIds = meta.lessons
    .filter((l) => lessonExists(l.id))
    .map((l) => l.id);

  return (
    <SubjectWorkbookList subject="english" readyLessonIds={readyLessonIds} />
  );
}
