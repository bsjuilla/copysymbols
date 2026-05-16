import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import TextDecoratorClient from "./TextDecoratorClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Text Decorator — Wrap Any Text in 30 Aesthetic Frames",
  description: "Type any word or phrase and instantly wrap it in 30 decorative frames — sparkles, hearts, brackets, kaomoji and more. Free, no signup, one-click copy.",
  keywords: ["text decorator","decorate text","aesthetic text wrapper","fancy text frames","sparkle text","cute text wrapper","instagram bio decoration","tiktok caption frames","symbol text wrapper"],
  ...canonical("/text-decorator"),
};

const faqs = [
  {
    q: "What is a text decorator?",
    a: "A text decorator wraps your text in decorative Unicode characters (sparkles, hearts, brackets) so it stands out in bios, captions, and chat messages.",
  },
  {
    q: "Can I use decorated text on Instagram?",
    a: "Yes. The decorations are real Unicode characters that render on Instagram, TikTok, Discord, Twitter, and most other platforms. They're text — not images.",
  },
  {
    q: "Does decorated text break search?",
    a: "Hashtags and @mentions still work, but the decorated words themselves aren't searchable. Use decorations around — not inside — words you want to remain searchable.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
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
