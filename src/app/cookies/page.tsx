import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How CopyChars uses cookies — we set none of our own, but Google AdSense uses advertising cookies to serve ads. How to control or opt out of them.",
  ...canonical("/cookies"),
};

const LAST_UPDATED = "June 4, 2026";
// Set up via Cloudflare Email Routing (free) to forward to your real address.
const CONTACT_EMAIL = "contact@copychars.com";

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
          <p>CopyChars sets no cookies of its own and runs no analytics. The site is free because it shows ads through <strong>Google AdSense</strong>, and Google uses third-party advertising cookies to serve and measure those ads. You can control or opt out of them — see sections 3 and 4 below.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>1. What is a cookie?</h2>
          <p>A cookie is a small piece of data that a website asks your browser to store. Cookies are commonly used to remember settings between visits, keep you signed in, count unique visitors for analytics, or display personalised advertising.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>2. What cookies are used today</h2>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            <li>First-party cookies set by copychars.com — <strong>none</strong>.</li>
            <li>Analytics cookies (Google Analytics, Plausible, Fathom, etc.) — <strong>none</strong>.</li>
            <li>Social-media tracking pixels (Facebook Pixel, X Pixel) — <strong>none</strong>.</li>
            <li>Advertising cookies (Google AdSense and Google ad partners) — <strong>yes, present</strong>. These third-party cookies are set by Google to serve and measure ads (see section 3).</li>
            <li>Session storage or local storage — none, except where explicitly noted on a tool page.</li>
          </ul>
          <p style={{ marginTop: 10 }}>You can inspect every cookie in your browser&apos;s developer tools (Application → Storage → Cookies).</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>3. Advertising cookies (Google AdSense)</h2>
          <p style={{ marginBottom: 10 }}>We use Google AdSense to display ads, which keeps the site free. Google and its partners place third-party cookies and similar identifiers — for example Google&apos;s advertising cookies (such as <code>__gads</code> and <code>__gpi</code>) and the DoubleClick cookie — to:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            <li>serve ads and measure their performance and reach;</li>
            <li>limit how many times you see the same ad and detect invalid clicks/fraud;</li>
            <li>where permitted, show personalised ads based on your prior visits to this and other websites.</li>
          </ul>
          <p style={{ marginTop: 10 }}>For visitors in the EEA, UK and Switzerland, a consent message (via Google&apos;s certified consent management) asks for your choices before non-essential cookies are set. You can opt out of personalised ads at <a href="https://adssettings.google.com" style={{ color: "var(--accent)" }}>Google Ads Settings</a>, manage third-party ad cookies at <a href="https://www.aboutads.info/choices/" style={{ color: "var(--accent)" }}>aboutads.info/choices</a> / <a href="https://www.youronlinechoices.eu/" style={{ color: "var(--accent)" }}>youronlinechoices.eu</a>, and read how Google uses this data in <a href="https://policies.google.com/technologies/partner-sites" style={{ color: "var(--accent)" }}>Google&apos;s partner-sites policy</a>. See also our <a href="/privacy" style={{ color: "var(--accent)" }}>Privacy Policy</a>.</p>
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
