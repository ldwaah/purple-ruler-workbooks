"use client";

import { usePathname } from "next/navigation";
import { HelpButton } from "@/components/help/HelpButton";
import { isStudentHelpRoute } from "@/lib/student-help-routes";
import { Header } from "./Header";

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSplash = pathname === "/";
  const isNeedLink = pathname === "/need-link";
  const showHelp = isStudentHelpRoute(pathname);

  if (isSplash || isNeedLink) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main
        key={pathname}
        className="pr-page-enter relative mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6"
      >
        {children}
      </main>
      {showHelp && <HelpButton />}
    </>
  );
}
