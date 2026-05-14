import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import InvisibleClient from "./InvisibleClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Invisible Character — Blank Space Copy & Paste (Whatsapp, Instagram)",
  description: "One-click copy invisible characters and blank Unicode spaces. Send empty WhatsApp messages, blank Instagram bio lines, blank usernames. 7 invisible characters with platform compatibility matrix.",
  keywords: ["invisible character","blank space copy paste","invisible text","empty character","blank whatsapp message","invisible character copy paste","zero width space","blank space copy"],
  ...canonical("/invisible-character"),
};

const faqs = [
  {
    q: "What is an invisible character?",
    a: "An invisible character is a real Unicode codepoint that takes up text space but renders as nothing visible — no glyph, no width (or zero width). Common ones include U+200B (Zero-Width Space), U+200C (Zero-Width Non-Joiner), U+3164 (Hangul Filler — the most reliable for invisible text on chat apps), and U+2800 (Braille Pattern Blank — visually empty braille cell).",
  },
  {
    q: "How do I send a blank message on WhatsApp?",
    a: "Tap the Hangul Filler (U+3164) below, then paste it into WhatsApp's message field. WhatsApp recognises it as text content (not an empty message), so the send button activates. The recipient sees a blank message bubble. The same trick works on Telegram and Discord; it does not work on Instagram DMs (they strip leading whitespace including invisible chars).",
  },
  {
    q: "How do I make my Instagram bio have blank lines?",
    a: "Instagram strips actual whitespace and newlines, but accepts the Hangul Filler (U+3164) as a non-whitespace character. Edit your bio in a separate notepad: type a line, paste the invisible character, line break, next line. When you paste the whole thing into Instagram's bio field, the invisible characters preserve the spacing.",
  },
  {
    q: "Why doesn't my invisible character work everywhere?",
    a: "Modern apps strip purely-blank input as anti-spam. The Hangul Filler (U+3164) bypasses most filters because it's a real Korean character (technically). Zero-Width Space (U+200B) gets stripped on Twitter/X, Discord usernames, and some forms. Always test on the destination before relying on the trick.",
  },
  {
    q: "Is using invisible characters against the Terms of Service?",
    a: "Cosmetic use (blank lines in bios, message-bubble padding) is universally allowed. What's against ToS is using invisible characters to bypass moderation — for example, slipping a banned word past a filter by inserting U+200C between letters, or impersonating someone with a name that visually matches theirs. Stick to formatting use cases and you're fine.",
  },
  {
    q: "What's the difference between Zero-Width Space and Hangul Filler?",
    a: "Zero-Width Space (U+200B) has zero width — the cursor doesn't even move when you type it. It's most commonly used as a soft line-break hint in text rendering. Hangul Filler (U+3164) is a regular-width character that renders as blank. The Hangul Filler is more reliable for chat apps because it survives whitespace-stripping filters; ZWSP is more reliable for inline text where you don't want any visual gap.",
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

export default function InvisibleCharacterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <InvisibleClient faqs={faqs} />
    </>
  );
}
