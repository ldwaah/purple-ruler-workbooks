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
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="mb-1 font-medium text-gray-900">{item.prompt}</p>
        <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
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
    <fieldset className="rounded-lg border border-gray-200 p-4">
      <legend className="px-1 text-base font-medium text-gray-900">
        {index}. {item.prompt}
      </legend>
      {item.scaffold && (
        <p className="mt-2 text-sm italic text-purple-800">{item.scaffold}</p>
      )}

      <div className="mt-3">{renderInput(item, value, onChange, readOnly)}</div>

      {!readOnly && item.type !== "long_text" && (
        <button
          type="button"
          onClick={handleCheck}
          className="mt-3 rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
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
          className="mt-3 rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
          I&apos;ve finished — show checklist
        </button>
      )}

      {marked && revealed && (
        <p
          className={`mt-3 rounded-md px-3 py-2 text-sm ${
            correct
              ? "bg-green-50 text-green-900"
              : "bg-amber-50 text-amber-900"
          }`}
          role="status"
        >
          {correct ? "Well done." : "Review and try again."}
          {"exemplar" in item && item.exemplar && revealed && (
            <span className="mt-2 block">
              <strong>Model:</strong> {item.exemplar}
            </span>
          )}
          {item.type === "long_text" && (
            <ul className="mt-2 list-inside list-disc">
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

  switch (item.type) {
    case "mcq":
      return (
        <div className="space-y-2">
          {item.options.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name={item.id}
                value={opt}
                checked={value === opt}
                disabled={disabled}
                onChange={() => onChange(item.id, opt)}
                className="text-purple-700"
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
              <label key={opt} className="flex cursor-pointer items-center gap-2">
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
                  className="text-purple-700"
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
          className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2"
          placeholder={item.unit ? `Answer (${item.unit})` : "Your answer"}
        />
      );
    case "ordering": {
      const order = Array.isArray(value) ? (value as string[]) : [...item.options];
      return (
        <ol className="space-y-2">
          {order.map((opt, i) => (
            <li key={opt} className="flex items-center gap-2">
              <span className="w-6 text-gray-500">{i + 1}.</span>
              <span className="flex-1 rounded border border-gray-200 px-2 py-1">
                {opt}
              </span>
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
                    className="rounded border px-2 py-1 text-xs"
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
                    className="rounded border px-2 py-1 text-xs"
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
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      );
    case "long_text":
      return (
        <textarea
          rows={6}
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(item.id, e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      );
    default:
      return null;
  }
}
