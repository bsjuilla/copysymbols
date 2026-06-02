// /llms.txt — an LLM-readable index of the site (llmstxt.org convention).
// AEO/GEO (P4): gives ChatGPT, Perplexity, Claude, Gemini and Google AI
// Overviews a clean, structured map of what CopyChars offers and where, so
// they can understand and cite the right pages. Generated from live data so
// it stays in sync as categories / aesthetics / kaomoji moods change.
//
// Served static at /llms.txt as text/plain. Fully additive — no existing
// route or page is touched.

import { categories } from "@/data/symbols";
import { AESTHETICS } from "@/data/aesthetics";
import { kaomojiCategories } from "@/data/kaomoji";
import { EMOJI_MEANINGS } from "@/data/emoji-meanings";

export const dynamic = "force-static";

const BASE = "https://www.copychars.com";

const TOOLS: { path: string; label: string; desc: string }[] = [
  { path: "/fancy-text", label: "Fancy Text Generator", desc: "Convert text into 30+ Unicode font styles." },
  { path: "/username-generator", label: "Username Generator", desc: "Aesthetic usernames for Discord, Instagram, Roblox." },
  { path: "/small-text", label: "Small Text Generator", desc: "Tiny superscript / subscript / small-caps text." },
  { path: "/morse-code", label: "Morse Code Translator", desc: "Text to Morse and back, with audio." },
  { path: "/binary-translator", label: "Binary Translator", desc: "Text to binary and binary to text (UTF-8)." },
  { path: "/character-counter", label: "Character Counter", desc: "Count characters, words and bytes." },
  { path: "/invisible-character", label: "Invisible Character", desc: "Copy blank / invisible Unicode characters." },
  { path: "/upside-down-text", label: "Upside Down Text", desc: "Flip text upside down." },
  { path: "/zalgo-text", label: "Zalgo Text Generator", desc: "Glitchy distorted text." },
  { path: "/symbol-builder", label: "Symbol Builder", desc: "Combine symbols into custom bio decorations." },
  { path: "/text-decorator", label: "Text Decorator", desc: "Wrap text in aesthetic frames." },
  { path: "/translate", label: "Translators", desc: "Wingdings, Braille and Pig Latin translators." },
];

const GUIDES: { path: string; label: string; desc: string }[] = [
  { path: "/how-to-copy-paste", label: "How to Copy & Paste Symbols", desc: "Step-by-step on iPhone, Android, Windows and Mac." },
  { path: "/blog/how-to-type-copyright", label: "How to Type the Copyright Symbol", desc: "© shortcuts for every platform." },
  { path: "/blog/heart-symbols", label: "Heart Symbols Guide", desc: "Every heart symbol explained." },
  { path: "/blog/star-symbols", label: "Star Symbols Guide", desc: "Every star symbol and its uses." },
  { path: "/blog/currency-symbols-list", label: "All Currency Symbols", desc: "World currency signs with codes." },
  { path: "/blog/greek-alphabet-list", label: "Greek Alphabet List", desc: "All 24 Greek letters." },
];

function line(path: string, label: string, desc: string): string {
  return `- [${label}](${BASE}${path}): ${desc}`;
}

export async function GET(): Promise<Response> {
  const sections: string[] = [];

  sections.push(
    "# CopyChars",
    "",
    "> CopyChars is a free website to copy and paste 3,000+ Unicode symbols, emoji, kaomoji and special characters. Click any character to copy it instantly — no app and no sign-up. The characters are real Unicode, so they paste anywhere text works: Instagram and TikTok bios, Discord, documents and chats.",
    "",
  );

  // Symbols
  sections.push("## Symbols");
  sections.push(line("/symbols", "All symbols by category", "Browse 3,000+ copy-and-paste symbols."));
  for (const c of categories) {
    sections.push(line(`/symbols/${c.id}`, `${c.name} Symbols`, c.description));
  }
  sections.push("");

  // Emoji
  sections.push("## Emoji");
  sections.push(line("/emoji", "Emoji", "1,000+ emoji to copy and paste, by category."));
  sections.push(line("/new-emoji-2026", "New Emoji 2026 (Unicode 17.0)", "The newest emoji, shipped to iOS 26.4 in March 2026."));
  sections.push(line("/emoji-combos", "Emoji Combos", "Aesthetic emoji combinations for bios."));
  sections.push(line("/emoji-meanings", "Emoji Meanings", "A dictionary of what each emoji and combo means, with tone + examples."));
  sections.push("");

  // Emoji meanings — per-entry "what does X mean" pages (strong AI-search intent).
  sections.push("## Emoji meanings (what each emoji/combo means)");
  for (const e of EMOJI_MEANINGS) {
    sections.push(line(`/emoji-meanings/${e.slug}`, `What does ${e.emoji} (${e.name}) mean`, e.short));
  }
  sections.push("");

  // Kaomoji
  sections.push("## Kaomoji");
  sections.push(line("/kaomoji", "Kaomoji", "600+ Japanese text faces to copy and paste."));
  for (const c of kaomojiCategories) {
    sections.push(line(`/kaomoji/mood/${c.id}`, `${c.name} Kaomoji`, `Kaomoji for the ${c.name.toLowerCase()} mood.`));
  }
  sections.push("");

  // Aesthetic
  sections.push("## Aesthetic symbols");
  sections.push(line("/aesthetic", "Aesthetic Symbols", "Trend-based symbol sets for social bios."));
  for (const a of AESTHETICS) {
    sections.push(line(`/aesthetic/${a.slug}`, `${a.name} Symbols`, a.tagline));
  }
  sections.push("");

  // Tools
  sections.push("## Tools");
  for (const t of TOOLS) sections.push(line(t.path, t.label, t.desc));
  sections.push("");

  // Guides
  sections.push("## Guides");
  for (const g of GUIDES) sections.push(line(g.path, g.label, g.desc));
  sections.push("");

  const body = sections.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
