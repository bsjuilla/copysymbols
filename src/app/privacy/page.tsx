import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CopyChars handles user data — what we collect, what we don't, and your rights under GDPR and CCPA.",
  ...canonical("/privacy"),
};

const LAST_UPDATED = "May 14, 2026";
const CONTACT_EMAIL = "business060407@gmail.com"; // change this if you set up a custom contact address

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
          <p>CopyChars (copychars.com) is a free copy-and-paste tool for Unicode symbols, emoji, kaomoji, and fancy text. We do not require an account, and we do not collect personally identifiable information. Everything you type into a tool stays on your device — it is never sent to our servers.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>1. What we collect</h2>
          <p style={{ marginBottom: 10 }}>As of the date above, CopyChars does not collect, store, or process any personal data. Specifically:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>No analytics scripts (Google Analytics, Plausible, etc.) are installed.</li>
            <li>No advertising scripts are installed.</li>
            <li>No tracking pixels are installed.</li>
            <li>No accounts, logins, or contact forms exist.</li>
            <li>No cookies are set by this site itself.</li>
            <li>Text you enter into any generator (character counter, fancy text, username generator, etc.) is processed entirely in your browser and is never transmitted to our servers.</li>
          </ul>
          <p style={{ marginTop: 10 }}>This may change in the future as the site grows. If we add analytics, advertising, or any feature that collects data, this page will be updated and the &quot;Last updated&quot; date above will change.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>2. Server logs</h2>
          <p>Our hosting provider (Vercel) automatically logs basic information about every request to the site for security and performance reasons. This typically includes IP address, user agent, request time, requested URL, and response status. These logs are retained by Vercel under their standard data-retention policy and are not used by us to identify or track individual users. See <a href="https://vercel.com/legal/privacy-policy" style={{ color: "var(--accent)" }}>Vercel&apos;s Privacy Policy</a> for details.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>3. Cookies</h2>
          <p>CopyChars sets no cookies of its own. If we add features that require cookies (for example, advertising via Google AdSense), we will display a consent notice and update our <a href="/cookies" style={{ color: "var(--accent)" }}>Cookie Policy</a>.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>4. Third-party services</h2>
          <p>The site is delivered via Vercel&apos;s content delivery network. Outside of that hosting layer, the site loads no third-party scripts, fonts, or content from external services. If we add third-party services (analytics, advertising), they will be listed here with a link to each provider&apos;s privacy policy.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>5. Your rights (GDPR, CCPA)</h2>
          <p style={{ marginBottom: 10 }}>Because we don&apos;t collect personal data, there&apos;s nothing for us to delete, export, or correct on request. If that changes in the future, you will have the following rights, depending on where you live:</p>
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
