"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugifyName } from "@/lib/slugify";

type AddStudentFormProps = {
  teacherToken: string;
};

export function AddStudentForm({ teacherToken }: AddStudentFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(slugifyName(value));
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a student name.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherToken,
          name: trimmed,
          slug: slug.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not add student.");
        return;
      }
      setName("");
      setSlug("");
      setSlugTouched(false);
      router.refresh();
    } catch {
      setError("Could not add student. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="pr-panel space-y-4 p-5">
      <h3 className="font-display text-sm font-bold text-violet-900">
        Add student
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm text-violet-700">
          <span className="font-semibold">Name</span>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border-2 border-violet-100 px-3 py-2 text-violet-900"
            placeholder="Michael"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            disabled={busy}
          />
        </label>
        <label className="block text-sm text-violet-700">
          <span className="font-semibold">Link slug (optional)</span>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border-2 border-violet-100 px-3 py-2 text-violet-900"
            placeholder="michael"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            disabled={busy}
          />
        </label>
      </div>
      <p className="text-xs text-violet-500">
        Leave slug blank to use the name (Michael becomes michael). The magic link
        will be /s/your-slug.
      </p>
      {error ? (
        <p className="text-sm font-semibold text-pink-600" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="pr-btn-primary text-sm" disabled={busy}>
        {busy ? "Adding…" : "Add student"}
      </button>
    </form>
  );
}
