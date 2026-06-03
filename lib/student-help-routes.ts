/** Student pages where the floating help control is shown. */
export function isStudentHelpRoute(pathname: string): boolean {
  if (!pathname || pathname === "/") return false;
  if (pathname === "/need-link") return false;
  if (pathname.startsWith("/t/")) return false;

  return (
    pathname === "/hub" ||
    pathname === "/year" ||
    pathname === "/leaderboard" ||
    pathname.startsWith("/workbook/")
  );
}
