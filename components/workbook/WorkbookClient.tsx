"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/schema";
import {
  computeCompletionPercent,
  loadProgress,
  saveProgress,
  type ItemResponse,
  type LessonProgress,
} from "@/lib/progress";
import { AddonBanner } from "@/components/layout/AddonBanner";
import { LessonMeta } from "@/components/layout/LessonMeta";
import { SectionView } from "./SectionView";

export function WorkbookClient({ lesson }: { lesson: Lesson }) {
  const [progress, setProgress] = useState<LessonProgress | null>(null);

  useEffect(() => {
    const stored =
      loadProgress(lesson.id) ??
      ({
        lessonId: lesson.id,
        responses: {},
        completedSections: [],
        updatedAt: new Date().toISOString(),
      } satisfies LessonProgress);
    setProgress(stored);
  }, [lesson.id]);

  const totalItems = useMemo(
    () =>
      lesson.sections.reduce(
        (acc, s) => acc + s.items.filter((i) => i.type !== "info").length,
        0,
      ),
    [lesson],
  );

  const percent = progress
    ? computeCompletionPercent(totalItems, progress.responses)
    : 0;

  const persist = useCallback(
    (next: LessonProgress) => {
      next.updatedAt = new Date().toISOString();
      saveProgress(next);
      setProgress(next);
    },
    [],
  );

  const handleChange = (itemId: string, value: unknown) => {
    if (!progress) return;
    persist({
      ...progress,
      responses: {
        ...progress.responses,
        [itemId]: {
          ...progress.responses[itemId],
          value,
          marked: false,
        },
      },
    });
  };

  const handleMark = (itemId: string, correct: boolean) => {
    if (!progress) return;
    persist({
      ...progress,
      responses: {
        ...progress.responses,
        [itemId]: {
          ...progress.responses[itemId],
          marked: true,
          correct,
        },
      },
    });
  };

  if (!progress) {
    return <p className="text-gray-600">Loading workbook…</p>;
  }

  let itemOffset = 0;

  return (
    <div className="space-y-6">
      <AddonBanner />
      <div>
        <h1 className="text-2xl font-bold text-purple-900">{lesson.title}</h1>
        <LessonMeta lesson={lesson} />
        <p className="mt-3 text-gray-700">{lesson.unitAim}</p>
        <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
          {lesson.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">Your progress</p>
          <div className="mt-1 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-purple-600 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">{percent}% answered</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/workbook/${lesson.id}/print`}
            className="rounded-md border border-purple-700 px-4 py-2 text-sm font-medium text-purple-800 hover:bg-purple-50"
          >
            Printable view
          </Link>
          <a
            href={`/api/pdf/${lesson.id}`}
            className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
          >
            Download PDF
          </a>
        </div>
      </div>

      {lesson.sections.map((section) => {
        const start = itemOffset;
        const countable = section.items.filter((i) => i.type !== "info").length;
        itemOffset += countable;
        return (
          <SectionView
            key={section.type}
            section={section}
            responses={progress.responses}
            onChange={handleChange}
            onMark={handleMark}
            startIndex={start}
          />
        );
      })}
    </div>
  );
}
