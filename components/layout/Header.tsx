import Link from "next/link";
import { Mascot } from "@/components/ui/Mascot";

export function Header() {
  return (
    <header className="no-print border-b-4 border-violet-300 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Mascot size="sm" />
          <div>
            <p className="font-display text-lg font-bold text-violet-900">
              Purple Ruler Workbooks
            </p>
            <p className="text-sm font-semibold text-fuchsia-600">
              Your fun KS4 practice buddy 📚
            </p>
          </div>
        </Link>
        <nav className="flex gap-2 text-sm font-bold">
          <Link href="/english" className="cartoon-btn-secondary px-3 py-1.5">
            📖 English
          </Link>
          <Link href="/maths" className="cartoon-btn-secondary px-3 py-1.5">
            🔢 Maths
          </Link>
        </nav>
      </div>
    </header>
  );
}
