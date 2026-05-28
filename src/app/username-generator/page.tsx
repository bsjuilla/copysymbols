import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import UsernameGeneratorClient from "./UsernameGeneratorClient";
import { canonical } from "@/lib/canonical";
import { STYLES } from "@/lib/fancy-text-styles";
import { ORNAMENTS } from "@/lib/username-ornaments";

const COMBINATIONS = STYLES.length * ORNAMENTS.length;

export const metadata: Metadata = {
  title: "Username Generator — Fancy Names for Discord, Instagram, Roblox, TikTok",
  description: `Free username generator with ${COMBINATIONS}+ combinations. Type your name and get fancy, aesthetic, cute, edgy, soft, Y2K-style usernames. One click to copy. Works on Discord, Instagram bios, Roblox, TikTok, X.`,
  keywords: ["username generator","fancy username","aesthetic username generator","discord username generator","cute usernames","instagram username ideas","nickname generator","roblox username generator","gamer name generator","tiktok username generator"],
  ...canonical("/username-generator"),
};

const faqs = [
  {
    q: "How does this username generator work?",
    a: `It combines ${STYLES.length} Unicode font styles (bold, italic, script, old english, double-struck, and more) with ${ORNAMENTS.length} decorative ornament packs (hearts, stars, sparkles, brackets, kawaii, edgy daggers) to produce ${COMBINATIONS}+ unique combinations. You type a name, choose a vibe, and the generator picks random style+ornament pairs from the matching pool.`,
  },
  {
    q: "Where can I use these usernames?",
    a: "Discord display names, X (Twitter) display names, WhatsApp display names, Tumblr, YouTube channel names, Roblox display names (nickname, not @handle), TikTok display name, Telegram, Spotify display name, gaming profiles. The text is real Unicode, so it pastes anywhere a display name field accepts UTF-8.",
  },
  {
    q: "Why doesn't this work for my Instagram or TikTok @handle?",
    a: "Instagram and TikTok restrict @handles to ASCII letters, numbers, periods, and underscores. Fancy Unicode characters work in your display name and bio but not your @handle. The same restriction applies to Twitch usernames and most email addresses. Reddit allows underscores and hyphens but not Unicode.",
  },
  {
    q: "Will my fancy username get me banned?",
    a: "Generally no. Cosmetic Unicode in display names is universally allowed on Discord, X, Tumblr, Telegram, and Roblox. What gets you banned is impersonation (using fancy Unicode to copy someone else's name visually), homoglyph attacks (using Cyrillic 'а' to look like Latin 'a' in a known brand name), or violating a platform's specific name policy. Stick to original names and you're fine.",
  },
  {
    q: "How long can a fancy username be?",
    a: "Each platform counts characters differently. Discord display names: 32 characters. X display names: 50 characters. WhatsApp display names: 25 characters. Roblox display names: 20 characters. Note that some Unicode glyphs (especially emoji and combining marks) count as 2-4 characters even though they look like one. Use our /character-counter tool to check before saving.",
  },
  {
    q: "Why does the same name look different on iPhone and Android?",
    a: "Each platform ships its own font set. Apple's system font renders Mathematical Bold Italic differently than Android's Roboto. Most styles look identical across modern devices, but Old English and Faux Cyrillic can look thinner or thicker depending on the OS. The underlying characters are the same — only the rendering differs.",
  },
  {
    q: "Can I save my favorite usernames?",
    a: "Not yet — the generator is stateless on this version. To save favorites, copy the ones you like and paste them into a notes app. A future update may add a localStorage favorites stack. For now, you can re-roll with the same vibe filter to get fresh combinations any time.",
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
  name: "Username Generator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (web browser)",
  url: `${baseUrl}/username-generator`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function UsernameGeneratorPage() {
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
      <UsernameGeneratorClient faqs={faqs} />
    </>
  );
}
