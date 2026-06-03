"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { getStoredYear, type StoredYear } from "@/lib/year-session";

export function Header() {
  const pathname = usePathname();
  const [year, setYear] = useState<StoredYear | null>(null);

  useEffect(() => {
    setYear(getStoredYear());
  }, [pathname]);

  const homeHref = year ? "/hub" : "/year";
  const showYearChrome =
    year !== null && pathname !== "/year" && pathname !== "/";

  return (
    <header className="no-print sticky top-0 z-40 border-b-2 border-violet-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={homeHref} className="flex shrink-0 items-center gap-3">
          <LogoMark size={40} priority />
          <div>
            <p className="font-display text-base font-bold text-violet-900">
              Purple Ruler
            </p>
            <p className="text-xs font-semibold text-pink-500">KS4 Workbooks</p>
          </div>
        </Link>

        {showYearChrome ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className="rounded-full border-2 border-violet-100 bg-violet-50 px-3 py-1 font-display text-xs font-bold text-violet-800"
              aria-label={`Year ${year} selected`}
            >
              Year {year}
            </span>
            <Link
              href="/year"
              className="pr-btn-ghost whitespace-nowrap px-3 py-1.5 text-xs"
            >
              Change year
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
