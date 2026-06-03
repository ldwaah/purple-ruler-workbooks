"use client";

import type { WorkbookSection } from "@/lib/schema";
import type { ItemResponse } from "@/lib/progress";
import { SECTION_META } from "@/lib/section-progress";
import { ItemView } from "./ItemView";

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
  const meta = SECTION_META[section.type] ?? {
    label: section.type,
    short: String(sectionIndex + 1).padStart(2, "0"),
    cheer: "",
    accent: "from-violet-500 to-purple-600",
  };

  return (
    <section
      className={isActive ? "pr-panel-active p-6 sm:p-8" : "pr-panel p-6 sm:p-8"}
    >
      <header className="mb-6 flex items-start gap-4 border-b-2 border-violet-50 pb-5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} font-display text-sm font-bold text-white`}
          style={{ boxShadow: "var(--shadow-bubble)" }}
        >
          {meta.short}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-pink-500">
            Step {sectionIndex + 1}
          </p>
          <h2 className="font-display text-xl font-bold text-violet-900 sm:text-2xl">
            {section.title ?? meta.label}
          </h2>
        </div>
      </header>
      <div className="space-y-5">
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
