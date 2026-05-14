import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import ZalgoClient from "./ZalgoClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Zalgo Text Generator — C̴u̴r̴s̴e̴d̴ Glitch Text Copy & Paste",
  description: "Free zalgo / cursed text generator with intensity slider and direction controls (above, below, middle). Type your text and get the glitched version. Pastes anywhere — Discord, X, Instagram.",
  keywords: ["zalgo text generator","cursed text","glitch text","zalgo copy paste","cursed text copy paste","creepy text generator","scary text generator","corrupted text"],
  ...canonical("/zalgo-text"),
};

const faqs = [
  {
    q: "What is zalgo text?",
    a: "Zalgo text — also called cursed text or glitch text — is plain text decorated with stacked Unicode combining marks. Each character gets random diacritics from the Combining Diacritical Marks block (U+0300–U+036F) attached above, below, or through it, creating the dripping, corrupted look. The original character stays underneath, so the text is still readable and copy-paste-friendly.",
  },
  {
    q: "Where does zalgo text come from?",
    a: "The 'zalgo' name comes from a Something Awful comics meme around 2004 (a fictional entity 'Zalgo' supposedly corrupting characters). The Unicode mechanism behind it — combining diacritical marks stacking on a base character — was designed for languages like Vietnamese and Sanskrit that need multiple accents per letter, then internet culture repurposed it for the eldritch effect.",
  },
  {
    q: "Where can I use zalgo text?",
    a: "Discord (renders fully), Tumblr, Reddit, Twitter/X, Telegram. Instagram and TikTok render zalgo in captions and bios but compress vertical spacing so the effect looks flatter. WhatsApp renders it correctly. Some forums and SMS clients strip combining marks for security reasons (anti-spam).",
  },
  {
    q: "Why are my Discord messages being collapsed?",
    a: "Discord auto-collapses messages with too many combining marks per character to prevent server lag. If your zalgo gets collapsed, lower the intensity slider to 2-3 instead of 5. Use the direction controls to put marks only above or only below — that reads as 'spooky' without triggering the collapse.",
  },
  {
    q: "What's the difference between zalgo and cursed text?",
    a: "They're often used interchangeably. Some communities use 'zalgo' for the maximum-intensity multi-line dripping look, and 'cursed' for lighter effects (1-2 marks per character). On this page the intensity slider covers both — set low for cursed, high for full zalgo.",
  },
  {
    q: "Will zalgo text show as boxes on iPhone or Android?",
    a: "No. Both iOS and Android ship the Combining Diacritical Marks block in their default fonts. The marks render correctly on every modern device. If yours shows boxes, you're on a very old version of the OS or a custom font that doesn't include the diacritical marks block.",
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

export default function ZalgoTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <ZalgoClient faqs={faqs} />
    </>
  );
}
