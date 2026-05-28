const BASE = "https://www.copychars.com";

export function canonical(path: string) {
  // Homepage canonical must be the bare origin (no trailing slash) to match
  // what Google has already indexed and what src/app/page.tsx:12 emits
  // manually. Without this guard, canonical("/") would mint a divergent
  // `https://www.copychars.com/` and the two pages would compete.
  const suffix = path === "/" ? "" : path;
  return { alternates: { canonical: `${BASE}${suffix}` } };
}
