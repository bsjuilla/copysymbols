"use client";
import { useState } from "react";
import Link from "next/link";
import { lennyFaces, lennyMoods, getLennyByMood } from "@/data/collections/lenny";

export default function LennyClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const copy = async (e: React.MouseEvent, s: string, n: string) => {
    e.preventDefault();
    e.stopPropagation();
    try { await navigator.clipboard.writeText(s); }
    catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "( ͡° ͜ʖ ͡°)"; toastMsg.textContent = `Copied ${n}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = q
    ? lennyFaces.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.face.includes(search) ||
        l.keywords.some(k => k.toLowerCase().includes(q))
      )
    : null;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text faces & dongers</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Lenny Face ( ͡° ͜ʖ ͡°) — 150 Variants
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
        Every Lenny Face variant in one place — smug, happy, angry, sad, suspicious, dancing, table-flipping, and shrugging. Click any face to copy it, or open its page for the back-story, variant tree, and platform notes. Works on Discord, Reddit, Twitter/X, Twitch and anywhere else you write text.
      </p>

      <div style={{ position: "relative", maxWidth: 400, marginBottom: 40 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
        <input className="search-input" type="text" placeholder="Search Lenny faces..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 44 }} />
      </div>

      {filtered ? (
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Search results ({filtered.length})</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {filtered.map(l => (
              <Link
                key={l.slug}
                href={`/lenny-face/${l.slug}`}
                className={`kaomoji-card ${copied === l.face ? "copied" : ""}`}
                style={{ textDecoration: "none", color: "inherit", display: "block", position: "relative" }}
                prefetch={false}
              >
                <button
                  onClick={(e) => copy(e, l.face, l.name)}
                  aria-label={`Copy ${l.name}`}
                  style={{ position: "absolute", top: 6, right: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontFamily: "var(--font-dm-mono), monospace", color: copied === l.face ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                >
                  {copied === l.face ? "✓ COPIED" : "COPY"}
                </button>
                <div className="kaomoji-face">{l.face}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{l.name}</div>
                <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>open →</div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        lennyMoods.map(mood => {
          const items = getLennyByMood(mood.id);
          if (items.length === 0) return null;
          return (
            <section key={mood.id} style={{ marginBottom: 48 }}>
              <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{mood.name}</h2>
              <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5, maxWidth: 700 }}>{mood.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {items.map(l => (
                  <Link
                    key={l.slug}
                    href={`/lenny-face/${l.slug}`}
                    className={`kaomoji-card ${copied === l.face ? "copied" : ""}`}
                    style={{ textDecoration: "none", color: "inherit", display: "block", position: "relative" }}
                    prefetch={false}
                  >
                    <button
                      onClick={(e) => copy(e, l.face, l.name)}
                      aria-label={`Copy ${l.name}`}
                      style={{ position: "absolute", top: 6, right: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontFamily: "var(--font-dm-mono), monospace", color: copied === l.face ? "var(--accent)" : "var(--text3)", cursor: "pointer", letterSpacing: "0.04em", zIndex: 2 }}
                    >
                      {copied === l.face ? "✓" : "COPY"}
                    </button>
                    <div className="kaomoji-face">{l.face}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>open →</div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
