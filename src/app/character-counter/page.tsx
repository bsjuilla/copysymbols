import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import CharacterCounterClient from "./CharacterCounterClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Character Counter — Live Count for Twitter, Instagram, TikTok, SMS",
  description: "Free character counter with live counts as you type. Instagram bio (150), Twitter (280), TikTok caption (2,200), SMS (160), YouTube, LinkedIn, Discord. Word count, sentence count, reading time.",
  keywords: ["character counter","word counter","letter count","instagram bio character limit","twitter character count","tiktok caption length","sms character counter","youtube character limit"],
  ...canonical("/character-counter"),
};

const faqs = [
  {
    q: "How is the character count calculated?",
    a: "Counts use grapheme clusters — what you actually see as one character. So a single emoji like ❤️ counts as 1, even though it's stored as multiple bytes internally. This matches what Instagram, Twitter, and TikTok display in their own counters.",
  },
  {
    q: "Does Twitter / X count emojis as 1 character?",
    a: "X (Twitter) counts most emojis as 2 weighted characters because of how its API encodes them. Plain ASCII counts as 1, CJK characters (Chinese, Japanese, Korean) count as 2, and most URLs are shortened to a fixed 23 characters regardless of length. The counter on this page shows grapheme count; for X-specific weighted count, expect 1.5–2× more.",
  },
  {
    q: "What is the Instagram bio character limit?",
    a: "150 characters. The counter on this page enforces that limit with a live progress bar — if it goes red, your bio will be truncated when posted.",
  },
  {
    q: "What is the TikTok caption character limit?",
    a: "2,200 characters for video captions, 80 characters for the profile bio. Both are tracked live below.",
  },
  {
    q: "How is the SMS limit calculated?",
    a: "Plain text SMS allows 160 characters per message (GSM-7 encoding). Adding any non-Latin character or emoji switches the message to UCS-2 encoding, which drops the limit to 70 characters per part. Long messages get split and reassembled on delivery.",
  },
  {
    q: "What counts as a word?",
    a: "Anything separated by whitespace (spaces, tabs, line breaks). The reading-time estimate uses the standard 200 words per minute; speaking time uses 130 words per minute, which matches an average podcast or audiobook narration pace.",
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

export default function CharacterCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <CharacterCounterClient faqs={faqs} />
    </>
  );
}
