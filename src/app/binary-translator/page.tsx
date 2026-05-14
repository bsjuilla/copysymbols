import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import BinaryClient from "./BinaryClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Binary Translator — Text to Binary + Binary to Text Converter",
  description: "Free bidirectional binary translator. Text to binary (8-bit per char), binary to text. Full UTF-8 support — works with emojis and non-Latin characters. One click to copy.",
  keywords: ["binary translator","text to binary","binary to text","binary code converter","ascii to binary","utf-8 to binary","binary code translator"],
  ...canonical("/binary-translator"),
};

const faqs = [
  {
    q: "How is text converted to binary?",
    a: "Each character is encoded as UTF-8 bytes (the modern web standard) and each byte is represented as 8 binary digits. ASCII characters (A–Z, 0–9, basic punctuation) take 1 byte each (8 bits). Most accented Latin and Greek letters take 2 bytes (16 bits). Most CJK and emoji characters take 3–4 bytes. The translator separates bytes with single spaces and characters with no extra separator — paste the output back to decode it.",
  },
  {
    q: "Why does '€' or '👍' produce more bits than 'A'?",
    a: "UTF-8 is a variable-length encoding. The euro sign € is 0xE2 0x82 0xAC (3 bytes = 24 bits). The thumbs-up emoji 👍 is 0xF0 0x9F 0x91 0x8D (4 bytes = 32 bits). Plain ASCII like 'A' (0x41) is just 1 byte = 8 bits. UTF-8 was designed this way so ASCII text is unchanged from older systems but the full Unicode range (1.1+ million characters) is still encodable.",
  },
  {
    q: "What format does the decoder accept?",
    a: "Groups of 8 binary digits separated by whitespace. Decoder ignores any characters that aren't 0, 1, or whitespace, so you can paste binary with line breaks, tabs, or extra spaces. Multi-byte UTF-8 sequences (for accented letters and emoji) are auto-detected by the leading bits per the UTF-8 spec.",
  },
  {
    q: "Why does my decoded text show � (replacement character)?",
    a: "That's the Unicode replacement character (U+FFFD). It appears when the decoder finds a binary sequence that isn't valid UTF-8 — for example, a continuation byte without a start byte, or a truncated multi-byte sequence. Check your input has whole 8-bit groups and that multi-byte UTF-8 sequences are intact.",
  },
  {
    q: "Is binary the same as ASCII?",
    a: "Related but not the same. ASCII is a 7-bit (originally) character encoding — it maps the integers 0–127 to specific characters (A=65, space=32, etc.). 'Binary' is just base-2 numbers. Saying 'text in binary' usually means: represent each character as its ASCII or UTF-8 code, then write that number in binary. That's what this translator does, with the modern UTF-8 standard.",
  },
  {
    q: "Can I use this for hex or other bases?",
    a: "Not on this page — this tool focuses on binary. To convert text to hex, base64, or other bases, search for those tools specifically. The underlying byte sequence is the same regardless of base; only the visual representation differs (binary uses 0/1, hex uses 0–F, base64 uses A–Z+/0–9+/=).",
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

export default function BinaryTranslatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CopyToast />
      <BinaryClient faqs={faqs} />
    </>
  );
}
