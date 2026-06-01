import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import CopyToast from "@/components/CopyToast";
import DiscordTimestampTool from "./DiscordTimestampTool";

const TITLE = "Discord Timestamp Generator — Copy <t:…> Time Codes";
const DESCRIPTION = "Pick a date and time and copy the Discord timestamp code. Discord shows it in every member's own timezone, including a live relative countdown. All 7 formats with a live preview.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "discord timestamp",
    "discord timestamp generator",
    "discord time format",
    "discord countdown timer",
    "discord relative time",
    "discord time code",
  ],
  ...canonical("/discord-timestamp"),
};

const baseUrl = "https://www.copychars.com";

const faqs = [
  { q: "What is a Discord timestamp?", a: "A Discord timestamp is a small code in the form <t:1718000000:F> that Discord turns into a formatted date and time when you send it. The number is a Unix timestamp (seconds since 1 January 1970) and the letter is the display style. The clever part is that Discord shows it in each viewer's own timezone, so everyone sees the correct local time without you doing any conversion." },
  { q: "How do I use the code in Discord?", a: "Pick your date and time above, tap Copy on the style you want, and paste the code straight into any Discord message, channel topic, or event description. Send the message and Discord replaces the code with the formatted time automatically. It works in the desktop app, browser, and mobile." },
  { q: "What does the :R style do?", a: "The :R (relative) style shows a live, self-updating phrase like 'in 3 hours' or '2 days ago', counted from each viewer's current time. It is the best choice for countdowns to an event, because it keeps ticking down on its own without you editing the message." },
  { q: "Why does my timestamp show the wrong time?", a: "The code is built from your local timezone as set on your device. If it looks off, check that your computer or phone clock and timezone are correct. Remember that other members will see the time converted to their own timezone, which is the intended behaviour, not an error." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Discord Timestamp Generator", item: `${baseUrl}/discord-timestamp` },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Discord Timestamp Generator",
      url: `${baseUrl}/discord-timestamp`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function DiscordTimestampPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-label">Discord tool</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Discord Timestamp Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.7 }}>
        Pick a moment in time and copy a Discord timestamp code. When you paste it into a message, Discord shows it as a formatted date and time in <strong>every member&apos;s own timezone</strong> — perfect for scheduling events, raids, streams, and meetups across regions. The relative style even counts down on its own.
      </p>

      <DiscordTimestampTool />
      <CopyToast />

      <section style={{ marginTop: 48 }}>
        <h2 className="font-display" style={subH2}>Why timestamps beat typing the time</h2>
        <p style={proseP}>
          If you write &ldquo;event at 8pm&rdquo; in a server with members across the world, half of them have to do timezone maths and the other half get it wrong. A timestamp removes that entirely: you set one moment, and Discord renders it correctly for each person reading it. For a recurring event it saves you from re-explaining the time in every region&apos;s terms, and the relative format gives a live countdown that never goes stale.
        </p>
        <h2 className="font-display" style={subH2}>The seven formats</h2>
        <p style={proseP}>
          Each code ends in a letter that picks the display style: <strong>t</strong> short time, <strong>T</strong> long time with seconds, <strong>d</strong> short date, <strong>D</strong> long date, <strong>f</strong> short date and time, <strong>F</strong> full date and time with the weekday, and <strong>R</strong> a relative phrase like &ldquo;in 3 hours&rdquo;. The preview above shows each one using your own locale, which is exactly how a viewer in your timezone will see it.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 className="font-display" style={{ ...subH2, marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 }}>
        <Link href="/blog/discord-fonts" className="cat-pill">Discord Fonts Guide</Link>
        <Link href="/blog/discord-symbols" className="cat-pill">Discord Symbols</Link>
        <Link href="/gaming-symbols" className="cat-pill">Gaming Symbols</Link>
        <Link href="/fancy-text" className="cat-pill">Fancy Text</Link>
      </div>
    </div>
  );
}

const subH2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.01em" };
const proseP: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 24 };
