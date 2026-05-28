import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import MorseClient from "./MorseClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Morse Code Translator — Text to Morse + Audio Playback",
  description: "Free bidirectional Morse code translator. Text to Morse, Morse to text, plus audio playback with adjustable WPM (5–30). International Morse standard. One click to copy.",
  keywords: ["morse code translator","text to morse","morse to text","morse code converter","international morse code","morse code audio","sos morse","learn morse code"],
  ...canonical("/morse-code"),
};

const faqs = [
  {
    q: "What standard does this Morse translator use?",
    a: "International Morse code (ITU-R M.1677-1), which is the worldwide amateur radio and aviation standard. It covers A–Z, 0–9, and the most common punctuation (. , ? ' ! / ( ) & : ; = + - _ \" $ @). The American Morse code used by 19th-century railroad telegraphers has different timings and a few different letter codes — this tool uses International, not American.",
  },
  {
    q: "How does the audio playback work?",
    a: "The translator plays your Morse using the browser's Web Audio API at a 600 Hz tone (the standard amateur-radio pitch). Dot duration scales with the WPM slider — at 15 WPM (default) a dot is 80ms, a dash 240ms, with 80ms gaps between elements, 240ms between letters, and 560ms between words. Most learners start at 5 WPM and work up.",
  },
  {
    q: "What's the SOS code?",
    a: "SOS is three dots, three dashes, three dots — sent as one continuous symbol with no gaps between letters: ...---... It was adopted internationally in 1908 because it's distinctive, easy to send under stress, and unambiguous in noisy conditions. Despite urban legend, SOS does NOT stand for 'Save Our Souls' — the letters were chosen for their Morse pattern, not the meaning.",
  },
  {
    q: "Why does the decoder say 'invalid' for some characters?",
    a: "Decoding requires properly-spaced Morse: a single space between letters, a slash (/) or three spaces between words. If your input has malformed spacing or characters that aren't dots, dashes, spaces, or slashes, the decoder shows the malformed parts as `?`. Punctuation is supported per the International standard but is rarely used in casual practice.",
  },
  {
    q: "What's a good speed for learning Morse?",
    a: "Most learners start at 5–7 WPM with characters sent at higher speed (15–20 WPM) but with extended gaps between them — this is called Farnsworth timing and prevents you from learning to count dots, which is a hard habit to break. The translator on this page uses standard timing (no Farnsworth), so set the slider to 5 WPM as a true beginner and increase by 1 WPM per week of practice.",
  },
  {
    q: "Can I use Morse code in usernames or social media?",
    a: "Yes — the Morse output is plain ASCII (dots, dashes, spaces, slashes) so it pastes anywhere text is accepted. People often use short Morse phrases like 'SOS' (...---...) or '73' (best regards in ham radio: --... ...--) as Discord status messages or Twitter bios.",
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

const baseUrl = "https://www.copychars.com";
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Morse Code Translator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (web browser)",
  url: `${baseUrl}/morse-code`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MorseCodePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <CopyToast />
      <MorseClient faqs={faqs} />
    </>
  );
}
