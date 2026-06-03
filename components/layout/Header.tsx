import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b-2 border-violet-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/start" className="flex items-center gap-3">
          <LogoMark size={40} priority />
          <div>
            <p className="font-display text-base font-bold text-violet-900">
              Purple Ruler
            </p>
            <p className="text-xs font-semibold text-pink-500">KS4 Workbooks</p>
          </div>
        </Link>
        <nav className="flex gap-2">
          <Link href="/english" className="pr-btn-ghost px-4 py-1.5 text-xs">
            English
          </Link>
          <Link href="/maths" className="pr-btn-ghost px-4 py-1.5 text-xs">
            Maths
          </Link>
        </nav>
      </div>
    </header>
  );
}
