import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Copyright Symbol © Copy & Paste — ™ ® © All IP Symbols",
  description: "Copy the copyright symbol © instantly. Includes trademark ™, registered ® and all intellectual property symbols. Shortcuts for Windows, Mac, iPhone.",
};

const ipSymbols = [
  { symbol: "©", name: "Copyright Sign", unicode: "U+00A9", html: "&copy;", use: "Copyright protection" },
  { symbol: "™", name: "Trade Mark Sign", unicode: "U+2122", html: "&trade;", use: "Unregistered trademark" },
  { symbol: "®", name: "Registered Trade Mark", unicode: "U+00AE", html: "&reg;", use: "Registered trademark" },
  { symbol: "℠", name: "Service Mark", unicode: "U+2120", html: "&#8480;", use: "Service mark" },
  { symbol: "℗", name: "Sound Recording Copyright", unicode: "U+2117", html: "&#8471;", use: "Phonogram copyright" },
  { symbol: "§", name: "Section Sign", unicode: "U+00A7", html: "&sect;", use: "Legal section" },
  { symbol: "¶", name: "Pilcrow / Paragraph Sign", unicode: "U+00B6", html: "&para;", use: "Paragraph mark" },
  { symbol: "†", name: "Dagger", unicode: "U+2020", html: "&dagger;", use: "Footnote reference" },
  { symbol: "‡", name: "Double Dagger", unicode: "U+2021", html: "&Dagger;", use: "Second footnote" },
  { symbol: "⚖", name: "Scales of Justice", unicode: "U+2696", html: "&#9878;", use: "Law and justice" },
];

export default function CopyrightSymbolPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Copy & Paste</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Copyright Symbol ©
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6 }}>
        Click any symbol to copy it instantly. Used in legal notices, documents, and content attribution worldwide.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 56 }}>
        {ipSymbols.map(s => (
          <button key={s.symbol} onClick={() => navigator.clipboard.writeText(s.symbol)}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8, lineHeight: 1 }}>{s.symbol}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.unicode}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.use}</div>
          </button>
        ))}
      </div>
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Keyboard Shortcuts for ©</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { platform: "Windows", method: "Alt + 0169" },
            { platform: "Mac", method: "Option + G" },
            { platform: "iPhone", method: "Hold C key — © appears" },
            { platform: "Android", method: "Hold C key on most keyboards" },
            { platform: "HTML", method: "&copy; or &#169;" },
            { platform: "Word", method: "(c) autocorrects to ©" },
          ].map(row => (
            <div key={row.platform} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{row.platform}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{row.method}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>© vs ™ vs ® — Quick Guide</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { sym: "©", title: "Copyright ©", desc: "Protects creative works — books, music, art, code. Automatic upon creation, no registration required." },
            { sym: "™", title: "Trademark ™", desc: "Claims trademark rights without registration. Anyone can use ™ — it just signals you consider it your brand." },
            { sym: "®", title: "Registered ®", desc: "Only used after official trademark registration with a government body. Using ® without registration is illegal in most countries." },
          ].map(item => (
            <div key={item.sym} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 16 }}>
              <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>{item.sym}</div>
              <div><div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{item.desc}</div></div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{href:"/symbols/legal",label:"All Legal Symbols"},{href:"/blog/trademark-vs-registered",label:"™ vs ® Explained"},{href:"/blog/how-to-type-copyright",label:"Type © Guide"}].map(l => (
          <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--text2)", textDecoration: "none" }}>{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
