// Pure (no-React) username generator — the same algorithm the /username-generator
// UI uses, factored out so the public API (/api/v1/username) produces identical
// results. Both this and the UI import STYLES + ORNAMENTS from the same data
// modules, so adding fonts or ornament packs to the site updates both at once.
import { STYLES } from "./fancy-text-styles";
import { ORNAMENTS, type Vibe } from "./username-ornaments";

export type VibeFilter = Vibe | "all";
export interface UsernameResult { text: string; style: string; ornament: string; }

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUsernames(name: string, vibe: VibeFilter, count: number): UsernameResult[] {
  if (!name.trim()) return [];
  const pool = vibe === "all" ? ORNAMENTS : ORNAMENTS.filter((o) => o.vibe === vibe || o.vibe === "none");
  if (pool.length === 0) return [];

  const out: UsernameResult[] = [];
  const seen = new Set<string>();
  for (let attempt = 0; attempt < count * 4 && out.length < count; attempt++) {
    const style = pick(STYLES);
    const ornament = pick(pool);
    const text = ornament.wrap(style.transform(name));
    if (seen.has(text)) continue;
    seen.add(text);
    out.push({ text, style: style.label, ornament: ornament.label });
  }
  return out;
}

export const ALL_VIBES: VibeFilter[] = ["all", "aesthetic", "cute", "edgy", "soft", "y2k", "brackets"];
