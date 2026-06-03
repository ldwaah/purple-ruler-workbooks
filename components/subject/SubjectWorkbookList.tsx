"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import {
  CURRICULUM,
  getLessonsForYear,
  type YearBlock,
} from "@/lib/curriculum";

type SubjectKey = "english" | "maths";
type YearTab = 10 | 11;

type SubjectWorkbookListProps = {
  subject: SubjectKey;
  readyLessonIds: string[];
};

function blockKey(year: YearTab, block: string) {
  return `${year}-${block}`;
}

function YearPanel({
  subject,
  year,
  blocks,
  readySet,
  openBlocks,
  onToggleBlock,
  panelIdPrefix,
}: {
  subject: SubjectKey;
  year: YearTab;
  blocks: YearBlock[];
  readySet: Set<string>;
  openBlocks: Record<string, boolean>;
  onToggleBlock: (key: string) => void;
  panelIdPrefix: string;
}) {
  const lessons = getLessonsForYear(subject, year);
  const ready = lessons.filter((l) => readySet.has(l.id)).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-violet-600">
        {ready} of {lessons.length} workbooks ready
      </p>
      <div className="space-y-3">
        {blocks.map((block) => {
          const key = blockKey(year, block.block);
          const isOpen = Boolean(openBlocks[key]);
          const panelId = `${panelIdPrefix}-${key}`;
          const readyInBlock = block.lessons.filter((l) =>
            readySet.has(l.id),
          ).length;

          return (
            <div key={key} className="pr-panel overflow-hidden">
              <h3>
                <button
                  type="button"
                  id={`${panelId}-trigger`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-violet-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onToggleBlock(key)}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-bold text-violet-900 sm:text-lg">
                      {block.blockTitle}
                    </span>
                    <span className="mt-1 block text-sm text-violet-600">
                      {block.lessons.length} workbook
                      {block.lessons.length !== 1 ? "s" : ""}
                      {readyInBlock > 0
                        ? ` · ${readyInBlock} ready`
                        : ""}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 font-display text-2xl font-bold text-violet-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={`${panelId}-trigger`}
                hidden={!isOpen}
                className={isOpen ? "border-t-2 border-violet-100" : undefined}
              >
                {isOpen ? (
                  <ul className="space-y-3 p-4 pt-3">
                    {block.lessons.map((lesson, i) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/workbook/${lesson.id}`}
                          className="pr-panel group flex items-center justify-between gap-4 px-5 py-4 transition hover:-translate-y-0.5"
                        >
                          <div className="flex min-w-0 items-start gap-4">
                            <span className="font-display text-xl font-bold text-violet-300">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <p className="font-display font-bold text-violet-900">
                                {lesson.title}
                              </p>
                              <p className="mt-1 text-sm text-violet-600">
                                Lesson {lesson.lessonUnits}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`shrink-0 rounded-2xl px-4 py-2 font-display text-xs font-bold ${
                              readySet.has(lesson.id)
                                ? "pr-btn-primary"
                                : "border-2 border-violet-100 text-violet-400"
                            }`}
                          >
                            {readySet.has(lesson.id) ? "Open" : "Soon"}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SubjectWorkbookList({
  subject,
  readyLessonIds,
}: SubjectWorkbookListProps) {
  const meta = CURRICULUM[subject];
  const readySet = new Set(readyLessonIds);
  const baseId = useId().replace(/:/g, "");
  const tabListId = `${baseId}-tabs`;
  const [activeYear, setActiveYear] = useState<YearTab>(10);
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({});

  const year10Blocks = meta.byYear.year10;
  const year11Blocks = meta.byYear.year11;

  const onToggleBlock = useCallback((key: string) => {
    setOpenBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const onTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const tabs: YearTab[] = [10, 11];
      const index = tabs.indexOf(activeYear);
      let next: YearTab | null = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (event.key === "Home") {
        next = 10;
      } else if (event.key === "End") {
        next = 11;
      }
      if (next !== null) {
        event.preventDefault();
        setActiveYear(next);
        document
          .getElementById(`${tabListId}-tab-${next}`)
          ?.focus();
      }
    },
    [activeYear, tabListId],
  );

  const blocksByYear: Record<YearTab, YearBlock[]> = {
    10: year10Blocks,
    11: year11Blocks,
  };

  return (
    <div className="space-y-8">
      <header className="pr-panel p-8">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-pink-500">
          {meta.examBoard}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          {meta.label}
        </h1>
        <p className="mt-2 text-violet-600">
          {meta.lessonsPerWeek} lessons per week · {meta.lessons.length}{" "}
          workbooks
        </p>
      </header>

      <div>
        <div
          id={tabListId}
          role="tablist"
          aria-label="Year group"
          className="flex gap-2 rounded-2xl border-2 border-violet-100 bg-violet-50/60 p-1.5"
        >
          {([10, 11] as const).map((year) => {
            const selected = activeYear === year;
            return (
              <button
                key={year}
                type="button"
                role="tab"
                id={`${tabListId}-tab-${year}`}
                aria-selected={selected}
                aria-controls={`${tabListId}-panel-${year}`}
                tabIndex={selected ? 0 : -1}
                className={`flex-1 rounded-xl px-4 py-2.5 font-display text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                  selected
                    ? "bg-white text-violet-900 shadow-sm"
                    : "text-violet-600 hover:bg-white/60 hover:text-violet-800"
                }`}
                onClick={() => setActiveYear(year)}
                onKeyDown={onTabKeyDown}
              >
                Year {year}
              </button>
            );
          })}
        </div>

        {([10, 11] as const).map((year) => {
          const selected = activeYear === year;
          return (
            <div
              key={year}
              id={`${tabListId}-panel-${year}`}
              role="tabpanel"
              aria-labelledby={`${tabListId}-tab-${year}`}
              hidden={!selected}
              tabIndex={0}
              className="mt-6 focus:outline-none"
            >
              {selected ? (
                <YearPanel
                  subject={subject}
                  year={year}
                  blocks={blocksByYear[year]}
                  readySet={readySet}
                  openBlocks={openBlocks}
                  onToggleBlock={onToggleBlock}
                  panelIdPrefix={`${baseId}-y${year}`}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <Link href="/start" className="pr-btn-ghost inline-block text-sm">
        Back
      </Link>
    </div>
  );
}
