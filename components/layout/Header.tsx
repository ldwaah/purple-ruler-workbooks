import Link from "next/link";

export function Header() {
  return (
    <header className="no-print border-b border-purple-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-700 text-lg font-bold text-white"
            aria-hidden
          >
            PR
          </span>
          <div>
            <p className="text-lg font-semibold text-purple-900">
              Purple Ruler Workbooks
            </p>
            <p className="text-sm text-purple-600">KS4 add-on practice</p>
          </div>
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            href="/english"
            className="text-purple-800 hover:text-purple-600"
          >
            English
          </Link>
          <Link href="/maths" className="text-purple-800 hover:text-purple-600">
            Maths
          </Link>
        </nav>
      </div>
    </header>
  );
}
