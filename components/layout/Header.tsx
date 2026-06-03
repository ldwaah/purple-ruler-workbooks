import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export function Header() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-white/10 bg-[#070612]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="font-display text-base font-bold tracking-tight text-white">
              Purple Ruler
            </p>
            <p className="text-xs text-violet-400">KS4 Workbooks</p>
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
