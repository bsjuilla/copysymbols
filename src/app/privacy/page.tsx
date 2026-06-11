import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CopyChars handles your data: we collect nothing ourselves, your typed text stays on your device, and Google AdSense ads are governed by GDPR and CCPA.",
  ...canonical("/privacy"),
};

const LAST_UPDATED = "June 4, 2026";
// Set up via Cloudflare Email Routing (free) to forward to your real address.
const CONTACT_EMAIL = "contact@copychars.com";

export default function PrivacyPage() {
  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Legal</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 32 }}>Last updated: {LAST_UPDATED}</p>

      <div style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 28 }}>
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>The short version</h2>
          <p>CopyChars (copychars.com) is a free copy-and-paste tool for Unicode symbols, emoji, kaomoji, and fancy text. We do not require an account, and anything you type into a tool stays on your device — it is never sent to our servers. The site is free because it shows ads through Google AdSense, and Google (a third party) uses cookies and similar technologies to serve those ads. Sections 1, 3 and 4 below explain exactly what that means and how to control it.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>1. What we collect</h2>
          <p style={{ marginBottom: 10 }}>CopyChars itself does not ask you to create an account and does not collect personal information that you actively provide. Specifically:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>No accounts, logins, or contact forms exist.</li>
            <li>Text you enter into any generator (character counter, fancy text, username generator, etc.) is processed entirely in your browser and is never transmitted to our servers.</li>
            <li>We do not run our own analytics product, tracking pixels, or marketing database.</li>
          </ul>
          <p style={{ marginTop: 10 }}>However, the site is supported by advertising. Our advertising partner <strong>Google AdSense</strong>, and Google&apos;s own services, automatically collect certain information through cookies and similar technologies — such as your device&apos;s IP address, browser type, the pages you view, and identifiers used to measure and serve ads. This is described in section 3 (Cookies) and section 4 (Advertising &amp; third-party services).</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>2. Server logs</h2>
          <p>Our hosting provider (Vercel) automatically logs basic information about every request to the site for security and performance reasons. This typically includes IP address, user agent, request time, requested URL, and response status. These logs are retained by Vercel under their standard data-retention policy and are not used by us to identify or track individual users. See <a href="https://vercel.com/legal/privacy-policy" style={{ color: "var(--accent)" }}>Vercel&apos;s Privacy Policy</a> for details.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>3. Cookies</h2>
          <p style={{ marginBottom: 10 }}>CopyChars does not set its own first-party cookies for tracking. However, Google AdSense and Google&apos;s ad technologies set and read third-party cookies and similar identifiers in your browser to serve and measure ads — for example Google&apos;s advertising cookies (such as <code>__gads</code> and <code>__gpi</code>) and the DoubleClick cookie. Depending on your settings and consent, these can be used to show personalized ads based on your prior visits to this and other websites.</p>
          <p>You can manage or turn off personalized advertising through <a href="https://adssettings.google.com" style={{ color: "var(--accent)" }}>Google Ads Settings</a>, and opt out of third-party advertising cookies via <a href="https://www.aboutads.info/choices/" style={{ color: "var(--accent)" }}>aboutads.info/choices</a> (or <a href="https://www.youronlinechoices.eu/" style={{ color: "var(--accent)" }}>youronlinechoices.eu</a> in Europe). Most browsers also let you block or delete cookies in their settings. See our <a href="/cookies" style={{ color: "var(--accent)" }}>Cookie Policy</a> for the full list.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>4. Advertising &amp; third-party services</h2>
          <p style={{ marginBottom: 10 }}>This site shows ads through <strong>Google AdSense</strong>. Google and its advertising partners use cookies, web beacons, and device identifiers to serve ads and measure their performance. Google may use this data to show you personalized ads based on your visits to this and other sites across the web, unless you opt out. For details, see <a href="https://policies.google.com/technologies/partner-sites" style={{ color: "var(--accent)" }}>&ldquo;How Google uses information from sites or apps that use our services&rdquo;</a> and the <a href="https://policies.google.com/privacy" style={{ color: "var(--accent)" }}>Google Privacy Policy</a>.</p>
          <p style={{ marginBottom: 10 }}>For visitors in the European Economic Area, the United Kingdom and Switzerland, a consent message (provided through Google&apos;s certified consent management) asks for your choices on ad personalization and cookies before non-essential cookies are set. You can change those choices at any time.</p>
          <p>Other parties involved in delivering the site: our host <a href="https://vercel.com/legal/privacy-policy" style={{ color: "var(--accent)" }}>Vercel</a> (content delivery and server logs — see section 2), and <a href="https://policies.google.com/privacy" style={{ color: "var(--accent)" }}>Google Fonts</a>, which serves the site&apos;s web fonts and may receive your IP address as part of that request.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>5. Your rights (GDPR, CCPA)</h2>
          <p style={{ marginBottom: 10 }}>CopyChars itself holds no personal data about you, so there is typically nothing for us to delete, export, or correct on our side. Data collected for advertising is controlled by Google — you can exercise choices over it directly using the Google tools linked in sections 3 and 4. Depending on where you live, you have the following rights:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            <li><strong>Under the EU GDPR:</strong> right to access, rectify, erase, restrict processing, data portability, object, and not be subject to automated decision-making.</li>
            <li><strong>Under the California CCPA/CPRA:</strong> right to know, delete, correct, opt out of sale or sharing, and limit use of sensitive personal information.</li>
            <li><strong>Under the UK GDPR:</strong> rights mirroring the EU GDPR.</li>
          </ul>
          <p style={{ marginTop: 10 }}>To exercise any rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>6. Children&apos;s privacy</h2>
          <p>The site is not directed at children under 13 (or under 16 in the EU/UK). We do not knowingly collect personal data from children. If you believe a child has provided personal data through this site, contact us and we will take action where required.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>7. Changes to this policy</h2>
          <p>We may update this policy from time to time. The &quot;Last updated&quot; date above will reflect the most recent change. Continued use of the site after a change indicates acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>8. Contact</h2>
          <p>Questions about this Privacy Policy can be sent to <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </div>
    </article>
  );
}
