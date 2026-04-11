"use client";
import { useState } from "react";

const artPieces = [
  {
    category: "Animals",
    pieces: [
      { name: "Cat", art: "  /\\_/\\\n ( o.o )\n  > ^ <" },
      { name: "Bunny", art: "(\\ /)\n( . .)\nC(\")(\") " },
      { name: "Bear", art: "ʕ•ᴥ•ʔ" },
      { name: "Fish", art: "><(((°>" },
      { name: "Dog", art: "U・ᴥ・U" },
      { name: "Owl", art: "(°‿°)\n{     }\n |   |\n |   |" },
      { name: "Penguin", art: "  _\n (_)\n<| |>\n  |" },
    ]
  },
  {
    category: "Symbols & Shapes",
    pieces: [
      { name: "Star", art: "  ★\n★ ★ ★\n ★ ★" },
      { name: "Arrow Right", art: "──────►" },
      { name: "Arrow Left", art: "◄──────" },
      { name: "Double Arrow", art: "◄──────►" },
      { name: "Diamond", art: "  ◆\n◆ ◆\n  ◆" },
      { name: "Crown", art: "▲ ▲ ▲\n██████\n██████" },
      { name: "Trophy", art: "┌─────┐\n│     │\n└──┬──┘\n   │\n ──┴──" },
    ]
  },
  {
    category: "Faces & Expressions",
    pieces: [
      { name: "Shrug", art: "¯\\_(ツ)_/¯" },
      { name: "Table Flip", art: "(╯°□°）╯︵ ┻━┻" },
      { name: "Table Put Back", art: "┬─┬ ノ( ゜-゜ノ)" },
      { name: "Lenny Face", art: "( ͡° ͜ʖ ͡°)" },
      { name: "Disapproval", art: "ಠ_ಠ" },
      { name: "Stare", art: "( ._.) (> >\n        ^\n    TAKE IT" },
      { name: "Surprised", art: "( ⊙_⊙)" },
    ]
  },
  {
    category: "Borders & Dividers",
    pieces: [
      { name: "Simple Line", art: "────────────────────" },
      { name: "Double Line", art: "════════════════════" },
      { name: "Star Border", art: "★━━━━━━━━━━━━━━━━━━━★" },
      { name: "Wave Line", art: "〰〰〰〰〰〰〰〰〰〰" },
      { name: "Box Frame", art: "┌────────────────────┐\n│                    │\n└────────────────────┘" },
      { name: "Double Box", art: "╔════════════════════╗\n║                    ║\n╚════════════════════╝" },
      { name: "Dotted Line", art: "· · · · · · · · · · · · ·" },
    ]
  },
  {
    category: "Objects",
    pieces: [
      { name: "Cup of Tea", art: "   ( (\n    ) )\n  ........\n  |      |\n  |  :)  |\n  \\      /\n   '----'" },
      { name: "Robot", art: "[^_^]\n[| |]\n[| |]\n[___]" },
      { name: "House", art: "  /\\\n / \\\n/____\\\n|    |\n|    |\n|____|" },
      { name: "Rocket", art: "   /|\\\n  / | \\\n /  |  \\\n|===|===|\n |  |  |\n  \\ | /\n   \\|/" },
      { name: "Computer", art: ".--------.\n|        |\n|        |\n'--------'\n  ======\n  ------" },
    ]
  },
  {
    category: "Text Decorators",
    pieces: [
      { name: "Sparkle Text", art: "✨ Your Text Here ✨" },
      { name: "Star Wrap", art: "★彡 Your Text Here 彡★" },
      { name: "Flower Wrap", art: "❀ Your Text ❀" },
      { name: "Arrow Wrap", art: "→ Your Text ←" },
      { name: "Double Bracket", art: "「 Your Text 」" },
      { name: "Quote Bracket", art: "『 Your Text 』" },
      { name: "Wave Wrap", art: "〜〜〜 Your Text 〜〜〜" },
    ]
  },
];

export default function TextArtClient() {
  const [activeCategory, setActiveCategory] = useState("Animals");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (art: string, name: string) => {
    try { await navigator.clipboard.writeText(art); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = art; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(name);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "🎨";
      toastMsg.textContent = "Copied " + name;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const active = artPieces.find(a => a.category === activeCategory)!;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Unicode art</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Copy & Paste Text Art
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        ASCII art and Unicode text illustrations — click any piece to copy it instantly.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {artPieces.map(c => (
          <button
            key={c.category}
            className={"cat-pill" + (activeCategory === c.category ? " active" : "")}
            onClick={() => setActiveCategory(c.category)}
          >
            {c.category}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {active.pieces.map(piece => (
          <div
            key={piece.name}
            onClick={() => handleCopy(piece.art, piece.name)}
            style={{
              background: "var(--surface)",
              border: "1px solid " + (copied === piece.name ? "var(--accent)" : "var(--border)"),
              borderRadius: 12,
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border2)"; el.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (copied !== piece.name) el.style.borderColor = "var(--border)"; el.style.transform = ""; }}
          >
            <pre style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "var(--text)", lineHeight: 1.6, margin: "0 0 12px", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
              {piece.art}
            </pre>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text3)" }}>{piece.name}</span>
              <span style={{ fontSize: 11, color: copied === piece.name ? "var(--accent)" : "var(--text3)" }}>
                {copied === piece.name ? "✓ copied" : "click to copy"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
