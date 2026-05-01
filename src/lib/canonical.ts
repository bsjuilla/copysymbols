const BASE = "https://www.copychars.com";

export function canonical(path: string) {
  return { alternates: { canonical: `${BASE}${path}` } };
}
