import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { lessonSchema, type Lesson } from "./schema";
import { PILOT_LESSONS } from "./curriculum";

const CONTENT_DIR = path.join(process.cwd(), "content", "lessons");

function getAllYamlPaths(): string[] {
  const subjects = ["english", "maths"];
  const paths: string[] = [];
  for (const subject of subjects) {
    const dir = path.join(CONTENT_DIR, subject);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".yaml") || file.endsWith(".yml")) {
        paths.push(path.join(dir, file));
      }
    }
  }
  return paths;
}

export function loadLesson(id: string): Lesson | null {
  for (const filePath of getAllYamlPaths()) {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(raw);
    const parsed = lessonSchema.safeParse(data);
    if (parsed.success && parsed.data.id === id) {
      return parsed.data;
    }
  }
  return null;
}

export function loadAllLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  for (const filePath of getAllYamlPaths()) {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(raw);
    const parsed = lessonSchema.safeParse(data);
    if (parsed.success) {
      lessons.push(parsed.data);
    }
  }
  return lessons.sort((a, b) => a.id.localeCompare(b.id));
}

export function getLessonIdsForSubject(
  subject: "english" | "maths",
): string[] {
  return PILOT_LESSONS[subject].lessons.map((l) => l.id);
}

export function lessonExists(id: string): boolean {
  return loadLesson(id) !== null;
}
