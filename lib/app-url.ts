/** Canonical production host for teacher magic links and seed scripts. */
export const PRODUCTION_APP_URL = "https://purpleruler.vercel.app";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** Base URL from env only (safe for scripts and build time). */
export function getAppUrlFromEnv(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return trimTrailingSlash(explicit);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${trimTrailingSlash(vercel)}`;

  return undefined;
}

/**
 * Base URL for magic links shown to teachers.
 * Prefers NEXT_PUBLIC_APP_URL, then VERCEL_URL, then request host (local dev), then production fallback.
 */
export async function getBaseUrl(): Promise<string> {
  const fromEnv = getAppUrlFromEnv();
  if (fromEnv) return fromEnv;

  const { headers } = await import("next/headers");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) {
    const proto =
      h.get("x-forwarded-proto") ??
      (host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https");
    return `${proto}://${host}`;
  }

  return PRODUCTION_APP_URL;
}

export function buildAppPath(baseUrl: string, path: string): string {
  const base = trimTrailingSlash(baseUrl);
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
