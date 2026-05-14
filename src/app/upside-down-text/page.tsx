import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import UpsideDownClient from "./UpsideDownClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Upside Down Text Generator — uʍop ǝpᴉsdn Copy & Paste",
  description: "Free upside down text generator. Type your text and instantly get the flipped uʍop ǝpᴉsdn version. Works on Instagram, TikTok, Discord, X, WhatsApp. One click to copy.",
  keywords: ["upside down text generator","flip text","uʍop ǝpᴉsdn","upside down letters","reverse text generator","flipped text copy paste","upside down text copy paste"],
  ...canonical("/upside-down-text"),
};

const faqs = [
  {
    q: "What is upside down text?",
    a: "Upside down text uses Unicode characters that look like flipped versions of regular letters — for example 'a' becomes 'ɐ' (Latin small letter turned A, U+0250) and 'F' becomes 'Ⅎ' (Roman numeral reversed one hundred, U+2132). Combined with reversed character order, the result reads as if rotated 180 degrees. Because they're real Unicode characters, they paste anywhere you can type.",
  },
  {
    q: "Where can I use upside down text?",
    a: "Anywhere that accepts plain text: Instagram bios and captions, TikTok captions, Discord usernames and messages, X (Twitter) posts, WhatsApp messages, Facebook posts, Tumblr, Reddit. Some platforms restrict @handles to ASCII (Instagram, TikTok), so the flipped text works in your bio but not your username.",
  },
  {
    q: "Why does the text look weird in some apps?",
    a: "A few older apps and feature phones don't ship the fonts that render the IPA and modifier-letter Unicode blocks the flipped letters come from. On modern iOS, Android, Mac, and Windows everything renders correctly. If your text shows boxes or question marks, the recipient's device is missing the font — the text itself is correct.",
  },
  {
    q: "How is upside down text typed?",
    a: "It can't be typed directly on a standard keyboard — the flipped letters live in different Unicode blocks (IPA Extensions, Spacing Modifier Letters, Latin Extended). Generators like this page combine a character-flip lookup with reversed string order in the browser, then you copy and paste the result.",
  },
  {
    q: "What's the difference between upside down text and mirror text?",
    a: "Upside down rotates text 180 degrees — flipped vertically and horizontally, reading right-to-left. Mirror text only flips horizontally, like text seen in a mirror. CopyChars has both: this page (upside down) and /mirror-text for the mirror variant. /mirror-text also offers same-order flipped (no reversal) and reversed-only variants.",
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

export default function UpsideDownTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <UpsideDownClient faqs={faqs} />
    </>
  );
}
