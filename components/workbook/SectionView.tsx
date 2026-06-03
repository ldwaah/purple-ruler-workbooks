"use client";

import type { WorkbookSection } from "@/lib/schema";
import type { ItemResponse } from "@/lib/progress";
import { SECTION_META } from "@/lib/section-progress";
import { ItemView } from "./ItemView";

const SECTION_STYLES: Record<string, string> = {
  connect:
    "border-violet-400 bg-gradient-to-br from-violet-100 to-purple-50 shadow-[4px_4px_0_#7c3aed]",
  practice:
    "border-sky-400 bg-gradient-to-br from-sky-100 to-cyan-50 shadow-[4px_4px_0_#0284c7]",
  check:
    "border-emerald-400 bg-gradient-to-br from-emerald-100 to-green-50 shadow-[4px_4px_0_#059669]",
  reflect:
    "border-amber-400 bg-gradient-to-br from-amber-100 to-yellow-50 shadow-[4px_4px_0_#d97706]",
  stretch:
    "border-fuchsia-400 bg-gradient-to-br from-fuchsia-100 to-pink-50 shadow-[4px_4px_0_#c026d3]",
};

type Props = {
  section: WorkbookSection;
  sectionIndex: number;
  responses: Record<string, ItemResponse>;
  onChange: (itemId: string, value: unknown) => void;
  onMark: (itemId: string, correct: boolean) => void;
  readOnly?: boolean;
  startIndex: number;
  isActive?: boolean;
};

export function SectionView({
  section,
  sectionIndex,
  responses,
  onChange,
  onMark,
  readOnly,
  startIndex,
  isActive = true,
}: Props) {
  let idx = startIndex;
  const style = SECTION_STYLES[section.type] ?? SECTION_STYLES.connect;
  const meta = SECTION_META[section.type] ?? {
    emoji: "📘",
    label: section.type,
    cheer: "",
  };

  return (
    <section
      className={`rounded-3xl border-4 p-5 sm:p-6 ${style} ${
        isActive ? "ring-2 ring-violet-400 ring-offset-2" : ""
      }`}
    >
      <div className="mb-4 flex items-start gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-inner"
          aria-hidden
        >
          {meta.emoji}
        </span>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-wide text-violet-700/80">
            Step {sectionIndex + 1}
          </p>
          <h2 className="font-display text-xl font-bold text-gray-900 sm:text-2xl">
            {section.title ?? meta.label}
          </h2>
        </div>
      </div>
      <div className="space-y-4">
        {section.items.map((item) => {
          const n = item.type === "info" ? 0 : ++idx;
          return (
            <ItemView
              key={item.id}
              item={item}
              index={n}
              response={responses[item.id]}
              onChange={onChange}
              onMark={onMark}
              readOnly={readOnly}
            />
          );
        })}
      </div>
    </section>
  );
}
