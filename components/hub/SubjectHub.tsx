"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useState } from "react";
import { SubjectWorkbookList } from "@/components/subject/SubjectWorkbookList";
import { getStoredYear, type StoredYear } from "@/lib/year-session";

type SubjectKey = "english" | "maths";

type SubjectHubProps = {
  readyLessonIds: Record<SubjectKey, string[]>;
};

function SubjectHubInner({ readyLessonIds }: SubjectHubProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const baseId = useId().replace(/:/g, "");
  const tabListId = `${baseId}-subject-tabs`;

  const tabParam = searchParams.get("tab");
  const activeTab: SubjectKey = tabParam === "english" ? "english" : "maths";

  const [year, setYear] = useState<StoredYear | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = getStoredYear();
    if (!stored) {
      router.replace("/year");
      return;
    }
    setYear(stored);
    setChecked(true);
  }, [router]);

  const setTab = useCallback(
    (tab: SubjectKey) => {
      router.push(`/hub?tab=${tab}`, { scroll: false });
    },
    [router],
  );

  const onTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const tabs: SubjectKey[] = ["maths", "english"];
      const index = tabs.indexOf(activeTab);
      let next: SubjectKey | null = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (event.key === "Home") {
        next = "maths";
      } else if (event.key === "End") {
        next = "english";
      }
      if (next !== null) {
        event.preventDefault();
        setTab(next);
        document.getElementById(`${tabListId}-tab-${next}`)?.focus();
      }
    },
    [activeTab, setTab, tabListId],
  );

  if (!checked || year === null) {
    return (
      <p className="text-center text-violet-600" aria-live="polite">
        Loading your workbooks
      </p>
    );
  }

  const subjects: { key: SubjectKey; label: string }[] = [
    { key: "maths", label: "Maths" },
    { key: "english", label: "English" },
  ];

  return (
    <div className="space-y-8">
      <header className="text-center sm:text-left">
        <p className="font-display text-sm font-bold text-pink-500">
          One step at a time
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-violet-900">
          Choose a subject
        </h1>
        <p className="mt-2 text-violet-600">
          Year {year} workbooks. Open one block at a time.
        </p>
        <p className="mt-3">
          <Link
            href="/leaderboard"
            className="text-sm font-semibold text-violet-600 underline-offset-2 hover:text-violet-900 hover:underline"
          >
            My points
          </Link>
        </p>
      </header>

      <div
        id={tabListId}
        role="tablist"
        aria-label="Subject"
        className="flex gap-2 rounded-2xl border-2 border-violet-100 bg-violet-50/60 p-1.5"
      >
        {subjects.map(({ key, label }) => {
          const selected = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${tabListId}-tab-${key}`}
              aria-selected={selected}
              aria-controls={`${tabListId}-panel-${key}`}
              tabIndex={selected ? 0 : -1}
              className={`flex-1 rounded-xl px-4 py-3 font-display text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                selected
                  ? "bg-white text-violet-900 shadow-sm"
                  : "text-violet-600 hover:bg-white/60 hover:text-violet-800"
              }`}
              onClick={() => setTab(key)}
              onKeyDown={onTabKeyDown}
            >
              {label}
            </button>
          );
        })}
      </div>

      {subjects.map(({ key }) => {
        const selected = activeTab === key;
        return (
          <div
            key={key}
            id={`${tabListId}-panel-${key}`}
            role="tabpanel"
            aria-labelledby={`${tabListId}-tab-${key}`}
            hidden={!selected}
            tabIndex={0}
            className="focus:outline-none"
          >
            {selected ? (
              <SubjectWorkbookList
                subject={key}
                year={year}
                readyLessonIds={readyLessonIds[key]}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function SubjectHub(props: SubjectHubProps) {
  return (
    <Suspense
      fallback={
        <p className="text-center text-violet-600" aria-live="polite">
          Loading your workbooks
        </p>
      }
    >
      <SubjectHubInner {...props} />
    </Suspense>
  );
}
