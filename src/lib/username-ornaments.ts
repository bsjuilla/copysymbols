// Ornament packs for /username-generator. Each pack wraps a styled name with
// decorative characters. Combined with the 31 styles in fancy-text-styles.ts,
// this gives 31 * 31 = 961 unique style+wrap combinations — plenty for the
// random-shuffle generator UX without any duplicate output.

export type Vibe = "aesthetic" | "cute" | "edgy" | "soft" | "y2k" | "brackets" | "none";

export interface Ornament {
  slug: string;
  label: string;
  vibe: Vibe;
  /** Wrap a styled name. The input has already been transformed by a fancy style. */
  wrap: (name: string) => string;
}

const w = (left: string, right: string) => (name: string) => `${left}${name}${right}`;

export const ORNAMENTS: Ornament[] = [
  // ── No wrap (style-only) ───────────────────────────────────────────────────
  { slug: "plain", label: "Plain", vibe: "none", wrap: (n) => n },

  // ── Aesthetic ──────────────────────────────────────────────────────────────
  { slug: "stars-bullets", label: "Stars & Bullets", vibe: "aesthetic", wrap: w("˚｡⋆ ", " ⋆｡˚") },
  { slug: "sparkles-trail", label: "Sparkles Trail", vibe: "aesthetic", wrap: w("‧₊˚ ", " ˚₊‧") },
  { slug: "moon-flowers", label: "Moon Flowers", vibe: "aesthetic", wrap: w("୨୧ ", " ୨୧") },
  { slug: "dot-cross", label: "Dot Cross", vibe: "aesthetic", wrap: w("⊹ ࣪ ", " ࣪ ⊹") },
  { slug: "diamond-trail", label: "Diamond Trail", vibe: "aesthetic", wrap: w("⋆˙⟡ ", " ⟡˙⋆") },
  { slug: "compass-stars", label: "Compass Stars", vibe: "aesthetic", wrap: w("✦ ", " ✦") },
  { slug: "celestial", label: "Celestial", vibe: "aesthetic", wrap: w("✧˚₊‧ ", " ‧₊˚✧") },

  // ── Cute ───────────────────────────────────────────────────────────────────
  { slug: "hearts-simple", label: "Hearts", vibe: "cute", wrap: w("♡ ", " ♡") },
  { slug: "hearts-uwu", label: "Hearts UwU", vibe: "cute", wrap: w("(♡ω♡) ", "") },
  { slug: "tulip", label: "Tulip", vibe: "cute", wrap: w("˚˖ 🌷 ", " 🌷 ˖˚") },
  { slug: "kawaii-bracket", label: "Kawaii Bracket", vibe: "cute", wrap: w("꒰♡ ", " ♡꒱") },
  { slug: "strawberry", label: "Strawberry", vibe: "cute", wrap: w("🍓 ", " 🍓") },
  { slug: "bunny-ears", label: "Bunny Ears", vibe: "cute", wrap: w("ദ്ദി ", " ദ്ദി") },
  { slug: "smol-flower", label: "Smol Flower", vibe: "cute", wrap: w("✿ ", " ✿") },

  // ── Edgy ───────────────────────────────────────────────────────────────────
  { slug: "dagger", label: "Dagger", vibe: "edgy", wrap: w("† ", " †") },
  { slug: "lightning", label: "Lightning", vibe: "edgy", wrap: w("⌁ ", " ⌁") },
  { slug: "japan-bracket", label: "Japan Bracket", vibe: "edgy", wrap: w("『 ", " 』") },
  { slug: "skull", label: "Skull", vibe: "edgy", wrap: w("☠ ", " ☠") },
  { slug: "infinity", label: "Infinity", vibe: "edgy", wrap: w("∞ ", " ∞") },

  // ── Soft ───────────────────────────────────────────────────────────────────
  { slug: "petal-trail", label: "Petal Trail", vibe: "soft", wrap: w("˚ ༘♡ ⋆｡˚ ", "") },
  { slug: "swan", label: "Swan", vibe: "soft", wrap: w("🦢 ", " 🦢") },
  { slug: "planet", label: "Planet", vibe: "soft", wrap: w("🪐 ", " 🪐") },
  { slug: "wishing-stars", label: "Wishing Stars", vibe: "soft", wrap: w("*ੈ✩‧₊˚ ", " *ੈ✩‧₊˚") },
  { slug: "soft-flower", label: "Soft Flower", vibe: "soft", wrap: w("❀ ", " ❀") },

  // ── Y2K ────────────────────────────────────────────────────────────────────
  { slug: "shooting-star", label: "Shooting Star", vibe: "y2k", wrap: w("★彡 ", " 彡★") },
  { slug: "y2k-face", label: "Y2K Face", vibe: "y2k", wrap: w("≧◡≦ ", " ≧◡≦") },
  { slug: "anime-sparkle", label: "Anime Sparkle", vibe: "y2k", wrap: w("゚:✧ ", " ✧:゚") },
  { slug: "star-burst", label: "Star Burst", vibe: "y2k", wrap: w("★ ", " ★") },
  { slug: "checker", label: "Checker", vibe: "y2k", wrap: w("◤ ", " ◥") },

  // ── Brackets ───────────────────────────────────────────────────────────────
  { slug: "lotus-bracket", label: "Lotus Bracket", vibe: "brackets", wrap: w("༺ ", " ༻") },
  { slug: "curl-bracket", label: "Curl Bracket", vibe: "brackets", wrap: w("◜ ", " ◝") },
  { slug: "vine", label: "Vine", vibe: "brackets", wrap: w("╰ ", " ╯") },
  { slug: "corner-bracket", label: "Corner Bracket", vibe: "brackets", wrap: w("「 ", " 」") },
  { slug: "tortoise", label: "Tortoise Shell", vibe: "brackets", wrap: w("〔 ", " 〕") },
];

export const VIBES: Array<{ id: Vibe | "all"; label: string }> = [
  { id: "all", label: "All vibes" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "cute", label: "Cute" },
  { id: "edgy", label: "Edgy" },
  { id: "soft", label: "Soft" },
  { id: "y2k", label: "Y2K" },
  { id: "brackets", label: "Brackets" },
];
