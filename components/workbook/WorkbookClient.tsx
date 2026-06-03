"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
import { SectionView } from "./SectionView";
import { SectionStepper } from "./SectionStepper";
import { LockedSectionCard } from "./LockedSectionCard";
import { SubmitPanel } from "./SubmitPanel";

export function WorkbookClient({ lesson }: { lesson: Lesson }) {
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
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

  const sectorPercent = Math.round(
    ((unlockedIndex + 1) / lesson.sections.length) * 100,
  );

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
      <div className="flex items-center justify-center py-24">
        <p className="font-display text-lg text-violet-500 animate-pulse">
          Loading workbook…
        </p>
      </div>
    );
  }

  const allComplete = lesson.sections.every((s) =>
    isSectionComplete(s, progress.responses),
  );
  let itemOffset = 0;

  const activeSections: ReactNode[] = [];
  const lockedSections: ReactNode[] = [];

  lesson.sections.forEach((section, sectionIndex) => {
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
      isCurrent && complete && sectionIndex < lesson.sections.length - 1;
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
      lockedSections.push(
        <LockedSectionCard
          key={section.type}
          section={section}
          index={sectionIndex}
        />,
      );
      return;
    }

    activeSections.push(
      <div
        key={section.type}
        ref={(el) => {
          sectionRefs.current[sectionIndex] = el;
        }}
        className="scroll-mt-8 space-y-4"
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
          <div className="pr-panel flex flex-col items-center gap-4 p-8 text-center">
            <p className="font-display text-lg text-violet-800">
              Read the warm-up, then continue.
            </p>
            <button
              type="button"
              onClick={acknowledgeAndContinue}
              className="pr-btn-primary"
            >
              Start practice
            </button>
          </div>
        )}

        {canUnlock && (
          <div className="pr-panel flex flex-col items-center gap-4 p-8 text-center">
            <p className="max-w-md font-display text-lg text-violet-800">
              {meta?.cheer}
            </p>
            <button type="button" onClick={unlockNext} className="pr-btn-primary">
              Next step
            </button>
          </div>
        )}

        {isCurrent && complete && isLastSection && (
          <div className="space-y-4">
            <div className="pr-panel-active flex flex-col items-center gap-3 p-10 text-center">
              <p className="font-display text-2xl font-bold text-violet-900">
                Workbook complete
              </p>
              <p className="max-w-sm text-sm text-violet-700">
                You finished every step. Hand in when you are ready.
              </p>
            </div>
            <SubmitPanel lessonId={lesson.id} responses={progress.responses} />
          </div>
        )}
      </div>,
    );
  });

  return (
    <div className="pr-page-enter space-y-8">
      <div className="relative overflow-hidden rounded-3xl pr-panel-active px-6 py-10 sm:px-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-600/25 blur-3xl"
          aria-hidden
        />
        <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-pink-500">
          Your workbook
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900 sm:text-4xl pr-heading-outline">
          {lesson.title}
        </h1>
        <LessonMeta lesson={lesson} />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-violet-700">
          {lesson.unitAim}
        </p>
      </div>

      <AddonBanner />

      <div className="grid gap-8 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-10">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="pr-panel space-y-6 p-5">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-violet-500">
                Your steps
              </p>
              <SectionStepper
                sections={lesson.sections}
                unlockedIndex={unlockedIndex}
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-violet-600">
                <span>Progress</span>
                <span>{sectorPercent}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-violet-100 bg-violet-50">
                <div
                  className="pr-progress-fill h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                  style={{ width: `${sectorPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-violet-500">
                {percent}% of questions started
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t-2 border-violet-50 pt-4">
              <Link
                href={`/workbook/${lesson.id}/print`}
                className="pr-btn-ghost text-center text-xs"
              >
                Printable view
              </Link>
              <a
                href={`/api/pdf/${lesson.id}`}
                className="pr-btn-ghost text-center text-xs"
              >
                Download PDF
              </a>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <div className="space-y-6">{activeSections}</div>
          {lockedSections.length > 0 && (
            <div className="space-y-3 border-t-2 border-violet-100 pt-8">
              <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-violet-400">
                Coming up
              </p>
              {lockedSections}
            </div>
          )}
        </div>
      </div>

      {allComplete && unlockedIndex === lesson.sections.length - 1 && (
        <p className="text-center text-xs text-violet-500">
          Scroll up anytime to review completed steps.
        </p>
      )}
    </div>
  );
}
