"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSplash = pathname === "/";

  if (isSplash) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
    </>
  );
}
