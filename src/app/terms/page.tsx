import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for CopyChars — a free copy-and-paste tool for symbols, emoji, kaomoji, and fancy text.",
  ...canonical("/terms"),
};

const LAST_UPDATED = "May 14, 2026";
const CONTACT_EMAIL = "business060407@gmail.com"; // change this if you set up a custom contact address

export default function TermsPage() {
  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Legal</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Terms of Service
      </h1>
      <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 32 }}>Last updated: {LAST_UPDATED}</p>

      <div style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 28 }}>
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>1. Acceptance of terms</h2>
          <p>By accessing or using copychars.com (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Site.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>2. The service</h2>
          <p>CopyChars is a free reference and utility website. It provides searchable lists and one-click copy buttons for Unicode characters (symbols, emoji, kaomoji), and a small set of text-transformation tools (fancy text generators, character counter, Morse code translator, and others). The Site is provided as-is, with no guarantee of availability, accuracy, or fitness for any particular purpose.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>3. Acceptable use</h2>
          <p style={{ marginBottom: 10 }}>You agree NOT to use the Site to:</p>
          <ul style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
            <li>Impersonate another person or entity using the styled text or Unicode tricks the Site provides.</li>
            <li>Send unsolicited bulk messages, spam, or harassment using the generated content.</li>
            <li>Bypass platform moderation systems by inserting invisible characters into prohibited content.</li>
            <li>Conduct denial-of-service attacks against the Site or its hosting infrastructure.</li>
            <li>Scrape the Site at high volume in a way that interferes with other users.</li>
            <li>Use the Site for any unlawful purpose under your local jurisdiction.</li>
          </ul>
          <p style={{ marginTop: 10 }}>How you use the characters and text you copy from the Site is your responsibility.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>4. Intellectual property</h2>
          <p style={{ marginBottom: 10 }}>The Unicode characters themselves are part of the Unicode Standard, published by the Unicode Consortium and are not owned by CopyChars or by any individual user. You may copy and use them freely.</p>
          <p style={{ marginBottom: 10 }}>The Site&apos;s code, design, copywriting, kaomoji curations, bio templates, and editorial content are © CopyChars and its contributors. You may not redistribute substantial portions of the Site&apos;s content as your own work without permission.</p>
          <p>Emoji glyph designs (the visual rendering of each emoji) are owned by the platform vendors that designed them (Apple, Google, Microsoft, Samsung, etc.). The Site does not redistribute proprietary emoji artwork — your operating system renders emoji using its own font.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>5. No warranty</h2>
          <p>THE SITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not guarantee the Site will be uninterrupted, error-free, secure, or free from viruses or other harmful components.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>6. Limitation of liability</h2>
          <p>To the fullest extent permitted by law, CopyChars and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, including loss of profits, data, business opportunities, or goodwill, even if advised of the possibility of such damages. Our total liability to you for any claim arising out of or relating to the Site shall not exceed five US dollars (USD 5.00).</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>7. Changes to the service</h2>
          <p>We may add, modify, or remove features at any time, with or without notice. We may discontinue the Site entirely at any time. We are not liable to you or any third party for any modification, suspension, or discontinuation.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>8. Governing law</h2>
          <p>These Terms are governed by the laws of <strong>[YOUR COUNTRY/JURISDICTION]</strong>, without regard to its conflict-of-law principles. Any dispute arising from these Terms shall be brought exclusively in the courts of <strong>[YOUR JURISDICTION]</strong>. <em>(Please update this section to reflect your actual country and state/province before publishing — leaving it as-is may cause this clause to be unenforceable.)</em></p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>9. Changes to these terms</h2>
          <p>We may revise these Terms from time to time. The &quot;Last updated&quot; date above reflects the most recent revision. Continued use of the Site after a revision indicates acceptance of the updated Terms.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>10. Contact</h2>
          <p>Questions about these Terms can be sent to <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </div>
    </article>
  );
}
