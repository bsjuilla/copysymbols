import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "CopyChars currently sets no cookies. This page explains what would change if cookies are added in the future.",
  ...canonical("/cookies"),
};

const LAST_UPDATED = "May 14, 2026";
const CONTACT_EMAIL = "business060407@gmail.com"; // change this if you set up a custom contact address

export default function CookiesPage() {
  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Legal</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Cookie Policy
      </h1>
      <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 32 }}>Last updated: {LAST_UPDATED}</p>

      <div style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 28 }}>
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>The short version</h2>
          <p>As of the date above, CopyChars sets no cookies of its own. The site does not include any analytics, advertising, or tracking pixels. There is therefore nothing to consent to or opt out of right now.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>1. What is a cookie?</h2>
          <p>A cookie is a small piece of data that a website asks your browser to store. Cookies are commonly used to remember settings between visits, keep you signed in, count unique visitors for analytics, or display personalised advertising.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>2. What CopyChars uses today</h2>
          <p style={{ marginBottom: 10 }}>None of the following are present on copychars.com as of the &quot;Last updated&quot; date:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            <li>First-party cookies set by copychars.com — none.</li>
            <li>Analytics cookies (Google Analytics, Plausible, Fathom, etc.) — none.</li>
            <li>Advertising cookies (Google AdSense, ad networks) — none.</li>
            <li>Social-media tracking pixels (Facebook Pixel, Twitter Pixel) — none.</li>
            <li>Session storage or local storage — none, except where explicitly noted on a tool page.</li>
          </ul>
          <p style={{ marginTop: 10 }}>You can verify this in your browser&apos;s developer tools (Application → Storage → Cookies).</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>3. What may change</h2>
          <p style={{ marginBottom: 10 }}>The site is in active development. Cookies are likely to be added in the future for one or more of the following reasons:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            <li><strong>Analytics</strong> — to understand which pages and tools are most useful so we can improve them.</li>
            <li><strong>Advertising</strong> — Google AdSense or a similar network, to support the site financially.</li>
            <li><strong>Personalisation</strong> — to remember your favourite styles, recently-copied items, or display preferences across visits.</li>
          </ul>
          <p style={{ marginTop: 10 }}>If any of these are added, we will display a clear consent notice on first visit (for users in the EU, EEA, UK, and other jurisdictions that require opt-in consent), update this Cookie Policy with the specific cookies in use, and update our <a href="/privacy" style={{ color: "var(--accent)" }}>Privacy Policy</a>.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>4. How to control cookies</h2>
          <p>Most browsers allow you to view, manage, block, and delete cookies through their settings. Useful links:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
            <li><a href="https://support.google.com/chrome/answer/95647" style={{ color: "var(--accent)" }}>Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" style={{ color: "var(--accent)" }}>Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" style={{ color: "var(--accent)" }}>Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" style={{ color: "var(--accent)" }}>Microsoft Edge</a></li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>5. Contact</h2>
          <p>Questions about this Cookie Policy can be sent to <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </div>
    </article>
  );
}
