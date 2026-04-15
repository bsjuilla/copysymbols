import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "™ vs ® vs © — What is the Difference? (Trade Mark, Registered, Copyright)",
  description: "Learn the difference between ™ (trade mark), ® (registered trademark) and © (copyright). When to use each symbol and what they legally mean.",
  keywords: ["trademark vs registered trademark","™ vs ®","copyright vs trademark","what does ™ mean","what does ® mean","difference tm and r"],
};

export default function BlogTrademark() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link> › <Link href="/symbols/legal" style={{ color: "var(--text3)", textDecoration: "none" }}>Legal Symbols</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        ™ vs ® vs © — What is the Difference?
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
        These three symbols look similar and often appear together — but they mean very different things legally. Here is a plain-English explanation of each.
      </p>

      {[
        { symbol: "™", name: "Trade Mark Sign", color: "#c8a96e",
          what: "The ™ symbol indicates that a word, phrase, logo or design is being claimed as a trademark by a business or individual.",
          when: "Use ™ when you have not yet registered your trademark, or when registration is pending. It signals that you consider the mark to be yours, but it has not been officially registered.",
          protection: "Using ™ provides limited common law protection in some countries, but is not as strong as a registered trademark.",
          example: "A new startup can write their brand name followed by ™ to claim it as their trademark before going through the registration process.",
        },
        { symbol: "®", name: "Registered Trade Mark", color: "#4ecdc4",
          what: "The ® symbol means the trademark has been officially registered with the relevant government trademark office (e.g., the USPTO in the USA, or the IPO in the UK).",
          when: "Use ® only after your trademark has been approved and registered. Using ® on an unregistered trademark is illegal in most countries.",
          protection: "Registered trademarks have much stronger legal protection. You can sue for infringement and claim damages.",
          example: "Major brands like Coca-Cola® and Nike® have registered their names and logos, allowing them to take legal action against counterfeit products.",
        },
        { symbol: "©", name: "Copyright Sign", color: "#a78bfa",
          what: "The © symbol indicates that a creative work is protected by copyright. This applies to written works, music, art, films, software, and other creative content.",
          when: "Copyright exists automatically when you create an original work — you do not need to register it. Adding © simply makes your claim explicit and visible.",
          protection: "Copyright protects the specific expression of an idea, not the idea itself. It prevents others from copying, distributing or adapting your work without permission.",
          example: "Authors put © [Year] [Name] at the start of their books. Websites put © 2024 [Company Name] in their footer.",
        },
      ].map(item => (
        <section key={item.symbol} style={{ marginBottom: 40, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span style={{ fontSize: "3rem", lineHeight: 1 }}>{item.symbol}</span>
            <div>
              <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", margin: 0 }}>{item.name}</h2>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["What it means", item.what], ["When to use it", item.when], ["Legal protection", item.protection], ["Example", item.example]].map(([label, content]) => (
              <div key={label as string}>
                <div style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{content}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginBottom: 40 }}>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Quick Reference Table</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Symbol","Name","Registration Required?","Protects"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: "var(--text3)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ["™","Trade Mark","No (claim only)","Brand names & logos (limited)"],
                ["®","Registered Trade Mark","Yes","Brand names & logos (strong)"],
                ["©","Copyright","No (automatic)","Creative works (art, writing, music)"],
              ].map(([sym, name, reg, prot]) => (
                <tr key={sym} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 14px", fontSize: "1.4rem" }}>{sym}</td>
                  <td style={{ padding: "12px 14px", color: "var(--text)", fontWeight: 500 }}>{name}</td>
                  <td style={{ padding: "12px 14px", color: "var(--text2)" }}>{reg}</td>
                  <td style={{ padding: "12px 14px", color: "var(--text2)" }}>{prot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/symbol/copyright" className="cat-pill">© Copyright Symbol</Link>
        <Link href="/symbol/trademark" className="cat-pill">™ Trade Mark Symbol</Link>
        <Link href="/symbol/registered" className="cat-pill">® Registered Symbol</Link>
        <Link href="/symbols/legal" className="cat-pill">All Legal Symbols</Link>
      </div>
    </div>
  );
}
