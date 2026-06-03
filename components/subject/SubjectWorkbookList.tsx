"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { CURRICULUM, type YearBlock } from "@/lib/curriculum";

type SubjectKey = "english" | "maths";
type YearTab = 10 | 11;

type SubjectWorkbookListProps = {
  subject: SubjectKey;
  year: YearTab;
  readyLessonIds: string[];
};

function blockKey(year: YearTab, block: string) {
  return `${year}-${block}`;
}

export function SubjectWorkbookList({
  subject,
  year,
  readyLessonIds,
}: SubjectWorkbookListProps) {
  const meta = CURRICULUM[subject];
  const readySet = new Set(readyLessonIds);
  const baseId = useId().replace(/:/g, "");
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({});

  const blocks: YearBlock[] =
    year === 10 ? meta.byYear.year10 : meta.byYear.year11;

  const onToggleBlock = useCallback((key: string) => {
    setOpenBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {blocks.map((block) => {
          const key = blockKey(year, block.block);
          const isOpen = Boolean(openBlocks[key]);
          const panelId = `${baseId}-${key}`;

          return (
            <div key={key} className="pr-panel overflow-hidden">
              <h2>
                <button
                  type="button"
                  id={`${panelId}-trigger`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-violet-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onToggleBlock(key)}
                >
                  <span className="min-w-0 flex-1 font-display text-base font-bold text-violet-900 sm:text-lg">
                    {block.blockTitle}
                  </span>
                  <span
                    className={`shrink-0 font-display text-2xl font-bold text-violet-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
              </h2>
              <div
                id={panelId}
                role="region"
                aria-labelledby={`${panelId}-trigger`}
                hidden={!isOpen}
                className={isOpen ? "border-t-2 border-violet-100" : undefined}
              >
                {isOpen ? (
                  <ul className="space-y-2 p-4 pt-3">
                    {block.lessons.map((lesson) => {
                      const isReady = readySet.has(lesson.id);
                      return (
                        <li key={lesson.id}>
                          {isReady ? (
                            <Link
                              href={`/workbook/${lesson.id}`}
                              className="pr-panel group flex items-center justify-between gap-4 px-5 py-4 transition hover:-translate-y-0.5"
                            >
                              <p className="min-w-0 font-display font-bold text-violet-900">
                                {lesson.title}
                              </p>
                              <span className="shrink-0 pr-btn-primary px-4 py-2 font-display text-xs font-bold">
                                Open
                              </span>
                            </Link>
                          ) : (
                            <div className="pr-panel flex items-center px-5 py-4 opacity-70">
                              <p className="font-display font-bold text-violet-700">
                                {lesson.title}
                              </p>
                            </div>
                          )}
                        </li>
                      );
                    })}
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
