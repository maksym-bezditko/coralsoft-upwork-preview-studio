/**
 * Base path the app is served under. Empty for local dev / root deploys; set to
 * "/<repo>" for GitHub Pages project sites via NEXT_PUBLIC_BASE_PATH at build time.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative public asset (e.g. "/assets/logo.svg") with the base
 * path. Needed for plain <img>/favicon references, which Next does NOT rewrite
 * automatically (unlike <Image> / <Link>).
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
