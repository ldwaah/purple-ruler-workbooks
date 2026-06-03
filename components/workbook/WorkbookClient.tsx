"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/schema";
import {
  computeCompletionPercent,
  loadProgress,
  saveProgress,
  type ItemResponse,
  type LessonProgress,
} from "@/lib/progress";
import {
  inferUnlockedIndex,
  isSectionComplete,
  SECTION_META,
} from "@/lib/section-progress";
import { AddonBanner } from "@/components/layout/AddonBanner";
import { LessonMeta } from "@/components/layout/LessonMeta";
import { Mascot } from "@/components/ui/Mascot";
import { SectionView } from "./SectionView";
import { SectionStepper } from "./SectionStepper";
import { LockedSectionCard } from "./LockedSectionCard";

export function WorkbookClient({ lesson }: { lesson: Lesson }) {
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const stored =
      loadProgress(lesson.id) ??
      ({
        lessonId: lesson.id,
        responses: {},
        completedSections: [],
        unlockedSectionIndex: 0,
        updatedAt: new Date().toISOString(),
      } satisfies LessonProgress);

    const unlocked = inferUnlockedIndex(
      lesson.sections,
      stored.responses,
      stored.unlockedSectionIndex,
    );
    setProgress({ ...stored, unlockedSectionIndex: unlocked });
    setUnlockedIndex(unlocked);
  }, [lesson.id, lesson.sections]);

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

  const unlockNext = () => {
    if (!progress) return;
    const section = lesson.sections[unlockedIndex];
    const nextIndex = Math.min(unlockedIndex + 1, lesson.sections.length - 1);
    const completed = progress.completedSections.includes(section.type)
      ? progress.completedSections
      : [...progress.completedSections, section.type];

    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1200);

    if (unlockedIndex < lesson.sections.length - 1) {
      setUnlockedIndex(nextIndex);
      persist({
        ...progress,
        completedSections: completed,
        unlockedSectionIndex: nextIndex,
      });
      requestAnimationFrame(() => {
        sectionRefs.current[nextIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      persist({
        ...progress,
        completedSections: completed,
        unlockedSectionIndex: unlockedIndex,
      });
    }
  };

  if (!progress) {
    return (
      <div className="flex items-center gap-4 py-12">
        <Mascot mood="think" />
        <p className="font-display text-lg text-violet-800">
          Getting your workbook ready…
        </p>
      </div>
    );
  }

  const allComplete = lesson.sections.every((s) =>
    isSectionComplete(s, progress.responses),
  );
  let itemOffset = 0;

  return (
    <div className="space-y-6">
      <AddonBanner />

      <div className="cartoon-card flex gap-4 p-5">
        <Mascot mood={celebrate ? "cheer" : "happy"} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-bold text-violet-900 sm:text-3xl">
            {lesson.title}
          </h1>
          <LessonMeta lesson={lesson} />
          <p className="mt-2 text-sm text-violet-800/90">
            One step at a time — finish each colourful section to unlock the
            next!
          </p>
        </div>
      </div>

      <SectionStepper
        sections={lesson.sections}
        unlockedIndex={unlockedIndex}
      />

      <div className="cartoon-card flex flex-wrap items-center gap-4 p-4">
        <div className="flex-1">
          <p className="font-display text-sm font-bold text-violet-900">
            Your adventure bar
          </p>
          <div className="mt-2 h-4 w-full max-w-xs overflow-hidden rounded-full border-2 border-violet-300 bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-500"
              style={{
                width: `${Math.round(((unlockedIndex + 1) / lesson.sections.length) * 100)}%`,
              }}
            />
          </div>
          <p className="mt-1 text-xs font-medium text-violet-600">
            Step {unlockedIndex + 1} of {lesson.sections.length} · {percent}%
            questions touched
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/workbook/${lesson.id}/print`}
            className="cartoon-btn-secondary text-sm"
          >
            🖨️ Print
          </Link>
          <a
            href={`/api/pdf/${lesson.id}`}
            className="cartoon-btn-secondary text-sm"
          >
            📄 PDF
          </a>
        </div>
      </div>

      {lesson.sections.map((section, sectionIndex) => {
        const start = itemOffset;
        const countable = section.items.filter((i) => i.type !== "info").length;
        itemOffset += countable;

        const visible = sectionIndex <= unlockedIndex;
        const isCurrent = sectionIndex === unlockedIndex;
        const infoOnly = section.items.every((i) => i.type === "info");
        const complete = infoOnly
          ? progress.completedSections.includes(section.type)
          : isSectionComplete(section, progress.responses);
        const meta = SECTION_META[section.type];
        const canUnlock =
          isCurrent &&
          complete &&
          sectionIndex < lesson.sections.length - 1;
        const needsAck = isCurrent && infoOnly && !complete;
        const isLastSection = sectionIndex === lesson.sections.length - 1;

        const acknowledgeAndContinue = () => {
          const completed = progress.completedSections.includes(section.type)
            ? progress.completedSections
            : [...progress.completedSections, section.type];
          if (sectionIndex >= lesson.sections.length - 1) {
            persist({ ...progress, completedSections: completed });
            return;
          }
          const nextIndex = sectionIndex + 1;
          setCelebrate(true);
          setTimeout(() => setCelebrate(false), 1200);
          setUnlockedIndex(nextIndex);
          persist({
            ...progress,
            completedSections: completed,
            unlockedSectionIndex: nextIndex,
          });
          requestAnimationFrame(() => {
            sectionRefs.current[nextIndex]?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        };

        if (!visible) {
          return (
            <LockedSectionCard
              key={section.type}
              section={section}
              index={sectionIndex}
            />
          );
        }

        return (
          <div
            key={section.type}
            ref={(el) => {
              sectionRefs.current[sectionIndex] = el;
            }}
            className="scroll-mt-24"
          >
            <SectionView
              section={section}
              sectionIndex={sectionIndex}
              responses={progress.responses}
              onChange={handleChange}
              onMark={handleMark}
              startIndex={start}
              isActive={isCurrent}
            />

            {needsAck && (
              <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-violet-300 bg-gradient-to-b from-violet-50 to-fuchsia-50 p-6 text-center">
                <p className="font-display text-lg font-bold text-violet-900">
                  Ready for the fun part?
                </p>
                <button
                  type="button"
                  onClick={acknowledgeAndContinue}
                  className="cartoon-btn-primary text-base"
                >
                  Let&apos;s go! →
                </button>
              </div>
            )}

            {canUnlock && (
              <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-violet-300 bg-gradient-to-b from-violet-50 to-fuchsia-50 p-6 text-center">
                <Mascot mood="cheer" size="sm" />
                <p className="font-display text-lg font-bold text-violet-900">
                  {meta?.cheer ?? "Section complete!"}
                </p>
                <button
                  type="button"
                  onClick={unlockNext}
                  className="cartoon-btn-primary text-base"
                >
                  Unlock the next bit →
                </button>
              </div>
            )}

            {isCurrent && complete && isLastSection && (
              <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6 text-center">
                <span className="text-4xl" aria-hidden>
                  🎉
                </span>
                <p className="font-display text-xl font-bold text-emerald-900">
                  Workbook complete — amazing!
                </p>
                <p className="text-sm text-emerald-800">
                  You smashed every section. See you at your next Purple Ruler
                  lesson!
                </p>
              </div>
            )}
          </div>
        );
      })}

      {allComplete && unlockedIndex === lesson.sections.length - 1 && (
        <p className="text-center text-sm text-violet-600">
          Tip: you can scroll back up to review any section anytime.
        </p>
      )}
    </div>
  );
}
