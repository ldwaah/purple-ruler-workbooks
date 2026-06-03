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
      <div className="rounded-2xl border-2 border-white/80 bg-white/90 p-4 shadow-sm">
        <p className="font-display font-bold text-violet-900">{item.prompt}</p>
        <p className="mt-2 text-gray-800 whitespace-pre-wrap">{item.content}</p>
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
    <fieldset className="rounded-2xl border-2 border-white bg-white/95 p-4 shadow-sm">
      <legend className="font-display px-1 text-base font-bold text-gray-900">
        {index}. {item.prompt}
      </legend>
      {item.scaffold && (
        <p className="mt-2 rounded-xl bg-violet-100 px-3 py-2 text-sm text-violet-900">
          💡 {item.scaffold}
        </p>
      )}

      <div className="mt-3">{renderInput(item, value, onChange, readOnly)}</div>

      {!readOnly && item.type !== "long_text" && (
        <button type="button" onClick={handleCheck} className="cartoon-btn-primary mt-3">
          Check my answer ✓
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
          className="cartoon-btn-primary mt-3"
        >
          I&apos;m done — show my checklist 📋
        </button>
      )}

      {marked && revealed && (
        <p
          className={`mt-3 rounded-2xl px-4 py-3 text-sm font-medium ${
            correct
              ? "bg-emerald-100 text-emerald-900 border-2 border-emerald-300"
              : "bg-amber-100 text-amber-900 border-2 border-amber-300"
          }`}
          role="status"
        >
          {correct ? "🌟 Yes! Great job!" : "🔄 Nearly — have another go!"}
          {"exemplar" in item && item.exemplar && revealed && (
            <span className="mt-2 block font-normal">
              <strong>Here's a model answer:</strong> {item.exemplar}
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
    "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-violet-100 bg-violet-50/50 px-3 py-2 transition hover:border-violet-300 hover:bg-violet-100 has-checked:border-violet-500 has-checked:bg-violet-100";

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
              <span>{opt}</span>
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
                <span>{opt}</span>
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
          className="cartoon-input w-full max-w-xs"
          placeholder={item.unit ? `Type here (${item.unit})` : "Type your answer…"}
        />
      );
    case "ordering": {
      const order = Array.isArray(value) ? (value as string[]) : [...item.options];
      return (
        <ol className="space-y-2">
          {order.map((opt, i) => (
            <li
              key={opt}
              className="flex items-center gap-2 rounded-xl border-2 border-violet-100 bg-violet-50/80 px-2 py-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="flex-1 text-sm">{opt}</span>
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
                    className="cartoon-btn-secondary px-2 py-1 text-xs"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === order.length - 1}
                    onClick={() => {
                      const next = [...order];
                      [next[i], next[i + 1]] = [next[i + 1], next[i]];
                      onChange(item.id, next);
                    }}
                    className="cartoon-btn-secondary px-2 py-1 text-xs"
                    aria-label="Move down"
                  >
                    ↓
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
          className="cartoon-input w-full"
          placeholder="Write your ideas here…"
        />
      );
    case "long_text":
      return (
        <textarea
          rows={6}
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(item.id, e.target.value)}
          className="cartoon-input w-full"
          placeholder="Take your time — a few sentences is perfect…"
        />
      );
    default:
      return null;
  }
}
