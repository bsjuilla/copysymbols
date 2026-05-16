import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import TextDecoratorClient from "./TextDecoratorClient";
import { canonical } from "@/lib/canonical";
import { decorators } from "@/data/text-decorators";

export const metadata: Metadata = {
  title: "Text Decorator — Wrap Text in 30+ Aesthetic Frames",
  description: `Type one word and get ${decorators.length} decoratively-wrapped variants — sparkle frames, lace brackets, hearts, stars, kaomoji and more. Click any card to copy. Works in Instagram bios, TikTok captions, Discord nicknames.`,
  keywords: ["text decorator","decorate text","aesthetic text wrapper","fancy text frames","sparkle text","cute text wrapper","instagram bio decoration","tiktok caption frames","symbol text wrapper"],
  ...canonical("/text-decorator"),
};

const faqs = [
  {
    q: "What does the text decorator do?",
    a: `It wraps any text you type with decorative Unicode characters — sparkles, brackets, stars, hearts, kaomoji and more. You get ${decorators.length} pre-made frame styles, one click copies the wrapped version to your clipboard. The decorations are plain Unicode characters, so they paste anywhere.`,
  },
  {
    q: "Where can I use these decorated text styles?",
    a: "Instagram bios and captions, TikTok captions and usernames, Discord nicknames, Twitter/X display names, Tumblr posts, Reddit titles, WhatsApp status — anywhere that accepts plain text. A few platforms (LinkedIn, some forums) strip uncommon symbols, but most modern apps render them fine.",
  },
  {
    q: "Why does the frame look broken on some devices?",
    a: "Each decorator uses Unicode characters from different blocks — some sparkles and kaomoji glyphs are missing on older devices (Android 6 and below, older Windows fonts). On modern iOS, Android 10+, Windows 11 and macOS the frames render correctly. If a card looks like a row of tofu boxes, that style isn't supported on your current device.",
  },
  {
    q: "Are the decorations counted as characters in Instagram or TikTok?",
    a: "Yes. Every decoration character counts toward bio and caption character limits. Sparkle frames add about 8–10 characters; simple wrappers like stars or hearts add about 4. If you're tight on the limit, use a single-character wrapper (Stars, Hearts, Diamond) rather than a multi-glyph one (Sparkle Frame, Lenny Frame).",
  },
  {
    q: "Can I make my own custom decorator?",
    a: "Not in this tool — these are pre-built frames you click to copy. If you need a custom symbol combination, try the Symbol Builder tool which lets you assemble your own prefix and suffix from any of our symbols.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function TextDecoratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <TextDecoratorClient faqs={faqs} />
    </>
  );
}
