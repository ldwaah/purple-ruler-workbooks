import { SubjectHub } from "@/components/hub/SubjectHub";
import { CURRICULUM } from "@/lib/curriculum";
import { lessonExists } from "@/lib/lessons";

function readyIdsFor(subject: "english" | "maths") {
  return CURRICULUM[subject].lessons
    .filter((l) => lessonExists(l.id))
    .map((l) => l.id);
}

export default function HubPage() {
  return (
    <SubjectHub
      readyLessonIds={{
        english: readyIdsFor("english"),
        maths: readyIdsFor("maths"),
      }}
    />
  );
}
