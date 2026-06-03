/** Turn a display name into a URL-safe student token slug (e.g. Michael -> michael). */
export function slugifyName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "student";
}

export function isValidStudentTokenSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{0,47}$/.test(slug);
}
