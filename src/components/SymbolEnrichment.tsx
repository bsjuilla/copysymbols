import type { SymbolEnrichmentPack } from "@/data/symbol-enrichment";

/**
 * Deep-content block for symbol reference pages (checkmark, degree, copyright,
 * arrows…). Renders visible About/Meaning prose, a code reference table, a
 * full how-to-type grid, and a visible FAQ. Pure server component — the
 * copyable symbol grid lives separately above this on each page.
 *
 * The FAQ rendered here is the SAME array used for the page's FAQPage JSON-LD,
 * so the structured data always matches on-page content (Google requirement).
 */
export default function SymbolEnrichment({
  pack,
  what,
}: {
  pack: SymbolEnrichmentPack;
  /** human label, e.g. "check mark", "degree symbol" — used in headings */
  what: string;
}) {
  return (
    <>
      {/* About + meaning */}
      <section style={{ marginTop: 8, marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>
          About the {what}
        </h2>
        <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, marginBottom: 14 }}>{pack.about}</p>
        <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75, margin: 0 }}>{pack.meaning}</p>
      </section>

      {/* Reference table */}
      <section style={{ marginBottom: 44 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          {what.charAt(0).toUpperCase() + what.slice(1)} codes — Unicode, HTML &amp; CSS
        </h2>
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 520 }}>
            <thead>
              <tr style={{ background: "var(--bg3)", textAlign: "left" }}>
                <th style={{ padding: "10px 14px", color: "var(--text2)", fontWeight: 600 }}>Symbol</th>
                <th style={{ padding: "10px 14px", color: "var(--text2)", fontWeight: 600 }}>Name</th>
                <th style={{ padding: "10px 14px", color: "var(--text2)", fontWeight: 600 }}>Unicode</th>
                <th style={{ padding: "10px 14px", color: "var(--text2)", fontWeight: 600 }}>HTML</th>
                <th style={{ padding: "10px 14px", color: "var(--text2)", fontWeight: 600 }}>CSS</th>
              </tr>
            </thead>
            <tbody>
              {pack.table.map((r) => (
                <tr key={r.codepoint} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontSize: 20, color: "var(--text)" }}>{r.symbol}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text2)" }}>{r.name}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text3)", fontFamily: "var(--font-dm-mono), monospace" }}>{r.codepoint}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text3)", fontFamily: "var(--font-dm-mono), monospace" }}>{r.html}</td>
                  <td style={{ padding: "10px 14px", color: "var(--text3)", fontFamily: "var(--font-dm-mono), monospace" }}>{r.css}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to type */}
      <section style={{ marginBottom: 44 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
          How to type the {what}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {pack.howto.map((row) => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ (visible — matches FAQPage schema) */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 36, marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 22 }}>
          Frequently asked questions
        </h2>
        {pack.faqs.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{a}</p>
          </div>
        ))}
      </section>
    </>
  );
}
