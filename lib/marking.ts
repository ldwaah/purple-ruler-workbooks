import type { WorkbookItem } from "./schema";

export type MarkResult = {
  correct: boolean;
  feedback: string;
};

export function markItem(
  item: WorkbookItem,
  response: unknown,
): MarkResult | null {
  if (item.type === "info") return null;

  switch (item.type) {
    case "mcq": {
      const answer = String(response ?? "").trim();
      const correct = answer === item.answer;
      return {
        correct,
        feedback: correct
          ? item.explanation ?? "Correct."
          : item.explanation ?? `Expected: ${item.answer}`,
      };
    }
    case "multi_select": {
      const selected = Array.isArray(response)
        ? response.map(String).sort()
        : [];
      const expected = [...item.answer].sort();
      const correct =
        selected.length === expected.length &&
        selected.every((v, i) => v === expected[i]);
      return {
        correct,
        feedback: correct
          ? item.explanation ?? "Correct."
          : item.explanation ??
            `Select: ${item.answer.join(", ")}`,
      };
    }
    case "numeric": {
      const raw = String(response ?? "").trim();
      const expectedStr = String(item.answer).trim();
      if (Number.isNaN(Number(expectedStr))) {
        const correct =
          raw.toLowerCase() === expectedStr.toLowerCase();
        return {
          correct,
          feedback: correct
            ? item.explanation ?? "Correct."
            : item.explanation ?? `Expected: ${item.answer}`,
        };
      }
      const num = parseNumeric(raw);
      const expected = parseNumeric(expectedStr);
      if (num === null || expected === null) {
        return { correct: false, feedback: "Enter a valid number." };
      }
      const tolerance = item.tolerance ?? 0.001;
      const correct = Math.abs(num - expected) <= tolerance;
      return {
        correct,
        feedback: correct
          ? item.explanation ?? "Correct."
          : item.explanation ??
            `Expected: ${item.answer}${item.unit ? ` ${item.unit}` : ""}`,
      };
    }
    case "ordering": {
      const order = Array.isArray(response) ? response.map(String) : [];
      const correct =
        order.length === item.answer.length &&
        order.every((v, i) => v === item.answer[i]);
      return {
        correct,
        feedback: correct
          ? item.explanation ?? "Correct order."
          : item.explanation ?? "Check the correct sequence.",
      };
    }
    case "short_text": {
      const text = String(response ?? "").toLowerCase();
      const matched = item.keywords.filter((kw) =>
        text.includes(kw.toLowerCase()),
      );
      const correct = matched.length >= Math.min(2, item.keywords.length);
      return {
        correct,
        feedback: correct
          ? item.explanation ?? "Good — key ideas included."
          : `Try to include ideas such as: ${item.keywords.slice(0, 3).join(", ")}`,
      };
    }
    case "long_text": {
      const text = String(response ?? "").trim();
      const wordCount = text ? text.split(/\s+/).length : 0;
      const min = item.minWords ?? 30;
      const correct = wordCount >= min;
      return {
        correct,
        feedback: correct
          ? "Use the checklist to review your paragraph."
          : `Write at least ${min} words, then check against the list.`,
      };
    }
    default:
      return null;
  }
}

function parseNumeric(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}
