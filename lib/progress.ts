export type ItemResponse = {
  value: unknown;
  marked?: boolean;
  correct?: boolean;
};

export type LessonProgress = {
  lessonId: string;
  responses: Record<string, ItemResponse>;
  completedSections: string[];
  /** Highest section index the student has unlocked (0-based) */
  unlockedSectionIndex?: number;
  updatedAt: string;
};

export function progressKey(lessonId: string): string {
  return `purple-ruler:progress:${lessonId}`;
}

export function loadProgress(lessonId: string): LessonProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(progressKey(lessonId));
    if (!raw) return null;
    return JSON.parse(raw) as LessonProgress;
  } catch {
    return null;
  }
}

export function saveProgress(progress: LessonProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(progressKey(progress.lessonId), JSON.stringify(progress));
}

export function computeCompletionPercent(
  totalItems: number,
  responses: Record<string, ItemResponse>,
): number {
  if (totalItems === 0) return 0;
  const answered = Object.values(responses).filter(
    (r) => r.value !== undefined && r.value !== "" && r.value !== null,
  ).length;
  return Math.round((answered / totalItems) * 100);
}
