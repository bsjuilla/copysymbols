// SFW couple / love content. Strictly wholesome and AdSense-safe — romantic,
// not explicit. Google AdSense (the site's monetization goal) prohibits adult
// content, so this is deliberately the flirty/couple/matching-bio angle, which
// captures the search demand ("matching bios for couples", "couple bio symbols",
// "love symbols copy paste") with zero policy risk.
//
// GLYPH RULE "no broken glyphs": standard pre-2020 emoji + BMP decorative
// hearts only. Audited — zero high-risk supplementary-plane exotic glyphs.

export interface MatchingBio {
  /** Short label for the pair, e.g. "King & Queen". */
  label: string;
  /** Partner 1's bio (placeholders in {BRACES}). */
  partnerA: string;
  /** Partner 2's matching bio. */
  partnerB: string;
}

// Decorative love symbols + heart emoji to copy and paste.
export const loveSymbols: string[] = [
  "❤", "♡", "♥", "❥", "ღ", "∞", "❣", "💕", "💞", "💗",
  "💖", "💓", "💝", "💟", "ʚ♡ɞ", "꒰♡꒱",
];

// Wholesome couple / romance emoji combos (SFW).
export const coupleCombos: string[] = [
  "❤️‍🔥", "💑✨", "💏💕", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩",
  "🥰🫶", "💍✨", "🌹❤️", "😘💕", "💌💞", "💖🌟",
  "👩‍❤️‍💋‍👨", "🫶❤️", "💐🥰", "✨💑✨",
];

// Affectionate love kaomoji.
export const coupleKaomoji: string[] = [
  "(♡ω♡)", "(づ｡◕‿‿◕｡)づ", "(｡♥‿♥｡)", "ʚ♡ɞ",
  "(◕‿◕)♡", "(っ˘з(˘⌣˘ )", "(˶˃ ᵕ ˂˶)♡", "♡(˃͈ દ ˂͈ )",
];

// Matching bio templates for couples — copy one into each partner's bio.
export const matchingBios: MatchingBio[] = [
  {
    label: "Taken & Forever",
    partnerA: "❤️ taken by {PARTNER} ⋆˚｡⋆\n♡ since {DATE}",
    partnerB: "❤️ {PARTNER}'s forever ⋆˚｡⋆\n♡ since {DATE}",
  },
  {
    label: "King & Queen",
    partnerA: "♔ her king ♔\n❤️ {PARTNER} 💍",
    partnerB: "♛ his queen ♛\n❤️ {PARTNER} 💍",
  },
  {
    label: "Sun & Moon",
    partnerA: "☀️ {NAME}\nyour sunshine ❤️",
    partnerB: "🌙 {NAME}\nyour moonlight ❤️",
  },
  {
    label: "Player 1 & Player 2",
    partnerA: "🎮 Player 1\n❤️ {PARTNER}",
    partnerB: "🎮 Player 2\n❤️ {PARTNER}",
  },
  {
    label: "Lock & Key",
    partnerA: "🔐 my heart belongs to {PARTNER}",
    partnerB: "🗝️ keeper of {PARTNER}'s heart",
  },
  {
    label: "Two Halves",
    partnerA: "🌗 one half of {PARTNER} ❤️",
    partnerB: "🌓 the other half of {PARTNER} ❤️",
  },
];
