export interface Decorator {
  id: string;
  name: string;
  wrap: (input: string) => string;
}

const w = (prefix: string, suffix: string): Decorator["wrap"] =>
  (input) => `${prefix}${input}${suffix}`;

export const decorators: Decorator[] = [
  { id: "sparkle-frame", name: "Sparkle Frame", wrap: w("˚୨୧⋆｡˚ ", " ˚｡⋆୨୧˚") },
  { id: "lace", name: "Lace", wrap: w("꒰ ", " ꒱") },
  { id: "rails", name: "Rails", wrap: w("┊", "┊") },
  { id: "stars", name: "Stars", wrap: w("✦ ", " ✦") },
  { id: "hearts", name: "Hearts", wrap: w("♡ ", " ♡") },
  { id: "arrows", name: "Arrows", wrap: w("→ ", " ←") },
  { id: "tilde", name: "Tilde Wave", wrap: w("~*~ ", " ~*~") },
  { id: "katakana-brackets", name: "Katakana Brackets", wrap: w("「", "」") },
  { id: "double-katakana-brackets", name: "Double Brackets", wrap: w("『", "』") },
  { id: "lenny-frame", name: "Lenny Frame", wrap: w("( ͡° ͜ʖ ͡°) ", " ( ͡° ͜ʖ ͡°)") },
  { id: "double-chevrons", name: "Double Chevrons", wrap: w("≪", "≫") },
  { id: "diamond", name: "Diamond", wrap: w("◆ ", " ◆") },
  { id: "flower", name: "Flower", wrap: w("✿ ", " ✿") },
  { id: "snow", name: "Snow", wrap: w("❅ ", " ❅") },
  { id: "fire", name: "Fire", wrap: w("🔥 ", " 🔥") },
  { id: "dots", name: "Dots", wrap: w("• ", " •") },
  { id: "dashes", name: "Dashes", wrap: w("— ", " —") },
  { id: "stars-multi", name: "Multi-Stars", wrap: w("✦✧ ", " ✧✦") },
  { id: "kaomoji-hug", name: "Kaomoji Hug", wrap: w("(づ｡◕‿‿◕｡)づ ", "") },
  { id: "wand", name: "Magic Wand", wrap: w("✨ ", " ✨") },
  { id: "music", name: "Music", wrap: w("♪ ", " ♬") },
  { id: "double-quote-fancy", name: "Fancy Quotes", wrap: w("“", "”") },
  { id: "angle-brackets", name: "Angle Brackets", wrap: w("⟪ ", " ⟫") },
  { id: "corner-brackets", name: "Corner Brackets", wrap: w("⌜ ", " ⌟") },
  { id: "stars-anchor", name: "Star Anchors", wrap: w("⋆ ", " ⋆") },
  { id: "moons", name: "Moons", wrap: w("☾ ", " ☽") },
  { id: "hex-ring", name: "Hex Ring", wrap: w("⌬ ", " ⌬") },
  { id: "triple-chevrons", name: "Triple Chevrons", wrap: w("⋙ ", " ⋘") },
  { id: "spades", name: "Spades", wrap: w("♤ ", " ♤") },
  { id: "broken-heart", name: "Broken Heart", wrap: w("💔 ", " 💔") },
];
