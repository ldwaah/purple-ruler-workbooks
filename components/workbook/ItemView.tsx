"use client";

import { useState } from "react";
import type { WorkbookItem } from "@/lib/schema";
import { markItem } from "@/lib/marking";
import type { ItemResponse } from "@/lib/progress";

type Props = {
  item: WorkbookItem;
  index: number;
  response?: ItemResponse;
  onChange: (itemId: string, value: unknown) => void;
  onMark: (itemId: string, correct: boolean) => void;
  readOnly?: boolean;
};

export function ItemView({
  item,
  index,
  response,
  onChange,
  onMark,
  readOnly = false,
}: Props) {
  const [revealed, setRevealed] = useState(false);
  const value = response?.value;
  const marked = response?.marked;
  const correct = response?.correct;

  if (item.type === "info") {
    return (
      <div className="rounded-2xl border-2 border-violet-100 bg-violet-50/80 p-5">
        <p className="font-display font-bold text-violet-900">{item.prompt}</p>
        <p className="mt-2 text-violet-800 whitespace-pre-wrap">{item.content}</p>
      </div>
    );
  }

  const handleCheck = () => {
    const result = markItem(item, value);
    if (result) {
      onMark(item.id, result.correct);
      setRevealed(true);
    }
  };

  return (
    <fieldset className="rounded-2xl border-2 border-violet-100 bg-white p-5 shadow-sm">
      <legend className="font-display px-1 text-base font-bold text-violet-900">
        <span className="text-pink-500">Q{index}.</span> {item.prompt}
      </legend>
      {item.scaffold && (
        <p className="mt-3 rounded-xl border-2 border-pink-100 bg-pink-50 px-3 py-2 text-sm text-violet-800">
          {item.scaffold}
        </p>
      )}

      <div className="mt-4">{renderInput(item, value, onChange, readOnly)}</div>

      {!readOnly && item.type !== "long_text" && (
        <button type="button" onClick={handleCheck} className="pr-btn-primary mt-4">
          Check answer
        </button>
      )}

      {!readOnly && item.type === "long_text" && (
        <button
          type="button"
          onClick={() => {
            const result = markItem(item, value);
            if (result) {
              onMark(item.id, result.correct);
              setRevealed(true);
            }
          }}
          className="pr-btn-primary mt-4"
        >
          Show checklist
        </button>
      )}

      {marked && revealed && (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            correct
              ? "border-2 border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-2 border-amber-200 bg-amber-50 text-amber-900"
          }`}
          role="status"
        >
          {correct ? "Correct, well done!" : "Not quite. Try again."}
          {"exemplar" in item && item.exemplar && revealed && (
            <span className="mt-2 block font-normal text-violet-700">
              <strong>Model answer:</strong> {item.exemplar}
            </span>
          )}
          {item.type === "long_text" && (
            <ul className="mt-2 list-inside list-disc font-normal">
              {item.checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
        </p>
      )}
    </fieldset>
  );
}

function renderInput(
  item: WorkbookItem,
  value: unknown,
  onChange: (id: string, v: unknown) => void,
  readOnly: boolean,
) {
  const disabled = readOnly;
  const optionClass =
    "flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-violet-100 bg-violet-50/60 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50 has-checked:border-violet-400 has-checked:bg-violet-100";

  switch (item.type) {
    case "mcq":
      return (
        <div className="space-y-2">
          {item.options.map((opt) => (
            <label key={opt} className={optionClass}>
              <input
                type="radio"
                name={item.id}
                value={opt}
                checked={value === opt}
                disabled={disabled}
                onChange={() => onChange(item.id, opt)}
                className="h-4 w-4 text-violet-600"
              />
              <span className="text-sm text-violet-900">{opt}</span>
            </label>
          ))}
        </div>
      );
    case "multi_select":
      return (
        <div className="space-y-2">
          {item.options.map((opt) => {
            const selected = Array.isArray(value) ? value : [];
            const checked = selected.includes(opt);
            return (
              <label key={opt} className={optionClass}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => {
                    const next = checked
                      ? selected.filter((s) => s !== opt)
                      : [...selected, opt];
                    onChange(item.id, next);
                  }}
                  className="h-4 w-4 rounded text-violet-600"
                />
                <span className="text-sm text-violet-900">{opt}</span>
              </label>
            );
          })}
        </div>
      );
    case "numeric":
      return (
        <input
          type="text"
          inputMode="decimal"
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(item.id, e.target.value)}
          className="pr-input max-w-xs"
          placeholder={item.unit ? `Answer (${item.unit})` : "Your answer"}
        />
      );
    case "ordering": {
      const order = Array.isArray(value) ? (value as string[]) : [...item.options];
      return (
        <ol className="space-y-2">
          {order.map((opt, i) => (
            <li
              key={opt}
              className="flex items-center gap-3 rounded-2xl border-2 border-violet-100 bg-violet-50/80 px-3 py-2"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 font-display text-xs font-bold text-white"
                style={{ boxShadow: "0 2px 0 rgba(91,33,182,0.3)" }}
              >
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-violet-900">{opt}</span>
              {!disabled && (
                <span className="flex gap-1">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => {
                      const next = [...order];
                      [next[i - 1], next[i]] = [next[i], next[i - 1]];
                      onChange(item.id, next);
                    }}
                    className="pr-btn-ghost px-2 py-1 text-xs"
                    aria-label="Move up"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    disabled={i === order.length - 1}
                    onClick={() => {
                      const next = [...order];
                      [next[i], next[i + 1]] = [next[i + 1], next[i]];
                      onChange(item.id, next);
                    }}
                    className="pr-btn-ghost px-2 py-1 text-xs"
                    aria-label="Move down"
                  >
                    Down
                  </button>
                </span>
              )}
            </li>
          ))}
        </ol>
      );
    }
    case "short_text":
      return (
        <textarea
          rows={3}
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(item.id, e.target.value)}
          className="pr-input"
          placeholder="Write your answer…"
        />
      );
    case "long_text":
      return (
        <textarea
          rows={6}
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(item.id, e.target.value)}
          className="pr-input"
          placeholder="Write your response…"
        />
      );
    default:
      return null;
  }
}
