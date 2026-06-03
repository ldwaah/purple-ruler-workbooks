export const YEAR_STORAGE_KEY = "purple-ruler:year";

export type StoredYear = 10 | 11;

export function getStoredYear(): StoredYear | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(YEAR_STORAGE_KEY);
  if (value === "10") return 10;
  if (value === "11") return 11;
  return null;
}

export function setStoredYear(year: StoredYear): void {
  sessionStorage.setItem(YEAR_STORAGE_KEY, String(year));
}

export function clearStoredYear(): void {
  sessionStorage.removeItem(YEAR_STORAGE_KEY);
}
