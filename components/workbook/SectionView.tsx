"use client";

import type { WorkbookSection } from "@/lib/schema";
import type { ItemResponse } from "@/lib/progress";
import { ItemView } from "./ItemView";

const SECTION_LABELS: Record<string, string> = {
  connect: "Connect",
  practice: "Practice",
  check: "Check",
  reflect: "Reflect",
  stretch: "Stretch",
};

const SECTION_COLORS: Record<string, string> = {
  connect: "border-purple-300 bg-purple-50",
  practice: "border-blue-200 bg-blue-50",
  check: "border-green-200 bg-green-50",
  reflect: "border-amber-200 bg-amber-50",
  stretch: "border-rose-200 bg-rose-50",
};

type Props = {
  section: WorkbookSection;
  responses: Record<string, ItemResponse>;
  onChange: (itemId: string, value: unknown) => void;
  onMark: (itemId: string, correct: boolean) => void;
  readOnly?: boolean;
  startIndex: number;
};

export function SectionView({
  section,
  responses,
  onChange,
  onMark,
  readOnly,
  startIndex,
}: Props) {
  let idx = startIndex;
  const color = SECTION_COLORS[section.type] ?? "border-gray-200 bg-gray-50";

  return (
    <section className={`rounded-xl border-2 p-5 ${color}`}>
      <h2 className="text-xl font-semibold text-gray-900">
        {section.title ?? SECTION_LABELS[section.type]}
      </h2>
      <div className="mt-4 space-y-4">
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
