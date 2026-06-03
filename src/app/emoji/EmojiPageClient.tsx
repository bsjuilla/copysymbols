"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { emoji, emojiCategories, type EmojiRecord } from "@/data/emoji";

// Curated most-used / trending emoji for the "Popular" tab (researched 2026).
// Referenced by glyph and resolved to real data records, so there's a single
// source of truth and every name still deep-links to /emoji/<slug>.
const POPULAR_GLYPHS = [
  "😂","❤️","🤣","👍","😭","🙏","🔥","✨","💀","😍","🥰","😊","😘","🥺","😅","🫶",
  "👀","💅","🗿","🥲","💕","🙌","👏","😩","🎉","💯","😎","🥹","😏","😉","🤔","🫡",
  "💔","💖","😡","🥳","😴","🤗","🤩","😢","🙄","😬","🤦","🤷","💪","🫠","🤤","🧢",
];

const stripVs = (s: string) => s.split("️").join(""); // drop variation selectors for glyph matching

// Levenshtein distance — powers the "did you mean" suggestions when a search
// returns nothing (typos / words we don't index).
function lev(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let cur = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}

// Module-scope so React reconciles the grid across renders (no remount-per-keystroke).
function EmojiCard({ rec, copied, onCopy }: { rec: EmojiRecord; copied: string | null; onCopy: (e: string, name: string) => void }) {
  const { id, emoji: e, name } = rec;
  return (
    <div className={`symbol-card ${copied === e ? "copied" : ""}`} title={name} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => onCopy(e, name)}
        aria-label={`Copy ${name}`}
        style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer", font: "inherit", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%" }}
      >
        <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{e}</span>
      </button>
      <Link href={`/emoji/${id}`} className="symbol-name" style={{ textDecoration: "none", color: "inherit" }} prefetch={false}>
        {name}
      </Link>
    </div>
  );
}

export default function EmojiPageClient() {
  const [active, setActive] = useState("popular");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const byCategory = useMemo(() => {
    const map = new Map<string, EmojiRecord[]>();
    for (const e of emoji) {
      const arr = map.get(e.category) ?? [];
      arr.push(e);
      map.set(e.category, arr);
    }
    return map;
  }, []);

  // glyph -> record (exact + variation-selector-stripped) for the Popular tab.
  const byGlyph = useMemo(() => {
    const m = new Map<string, EmojiRecord>();
    for (const e of emoji) {
      m.set(e.emoji, e);
      const s = stripVs(e.emoji);
      if (!m.has(s)) m.set(s, e);
    }
    return m;
  }, []);

  const popularList = useMemo(() => {
    const seen = new Set<string>();
    const out: EmojiRecord[] = [];
    for (const g of POPULAR_GLYPHS) {
      const r = byGlyph.get(g) ?? byGlyph.get(stripVs(g));
      if (r && !seen.has(r.id)) { seen.add(r.id); out.push(r); }
    }
    return out;
  }, [byGlyph]);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const results = useMemo(() => {
    if (!searching) return [];
    const out: EmojiRecord[] = [];
    for (const e of emoji) {
      if (e.name.toLowerCase().includes(q) || e.keywords.some((k) => k.toLowerCase().includes(q))) {
        out.push(e);
        if (out.length >= 240) break;
      }
    }
    return out;
  }, [q, searching]);

  // "Did you mean" — closest emoji by edit distance, only when nothing matched.
  const suggestions = useMemo(() => {
    if (!searching || results.length > 0 || q.length < 2) return [];
    const scored: { e: EmojiRecord; d: number }[] = [];
    for (const e of emoji) {
      let best = Infinity;
      for (const w of [e.name.toLowerCase(), ...e.keywords]) {
        const d = w.includes(q) ? 0 : lev(q, w);
        if (d < best) best = d;
        if (best === 0) break;
      }
      scored.push({ e, d: best });
    }
    const threshold = Math.max(2, Math.floor(q.length * 0.5));
    return scored
      .filter((s) => s.d <= threshold)
      .sort((a, b) => a.d - b.d)
      .slice(0, 18)
      .map((s) => s.e);
  }, [q, searching, results.length]);

  const handleCopy = async (e: string, name: string) => {
    try { await navigator.clipboard.writeText(e); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = e; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(e);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = e;
      toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const gridList = searching ? results : active === "popular" ? popularList : byCategory.get(active) ?? [];
  const activeMeta = emojiCategories.find((c) => c.id === active);


  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <style>{`
        .emoji-search { position: relative; max-width: 560px; margin: 0 0 28px; }
        .emoji-search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 17px; opacity: 0.7; pointer-events: none; }
        .emoji-search-input {
          width: 100%; padding: 15px 46px 15px 48px; font-size: 16px; color: var(--text);
          background: var(--surface); border: 1.5px solid var(--border); border-radius: 40px;
          outline: none; transition: border-color 0.18s, box-shadow 0.18s; font-family: inherit;
        }
        .emoji-search-input::placeholder { color: var(--text3); }
        .emoji-search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(200,169,110,0.14); }
        .emoji-search-clear {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          width: 28px; height: 28px; border-radius: 50%; border: 0; cursor: pointer;
          background: var(--bg3, var(--border)); color: var(--text2); font-size: 13px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .emoji-search-clear:hover { color: var(--text); }
        .emoji-cat-link {
          display: inline-flex; align-items: center; gap: 4px;
        }
      `}</style>

      <div className="section-label">Unicode emoji</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Copy &amp; Paste Emoji 😀
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 28, lineHeight: 1.6 }}>
        Search or browse {emoji.length}+ emoji. Click any one to copy it instantly — works in any app, website, or document. Tap a name to open its dedicated page.
      </p>

      {/* Search bar */}
      <div className="emoji-search">
        <span className="emoji-search-icon" aria-hidden>🔍</span>
        <input
          className="emoji-search-input"
          type="text"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Search emoji — try “heart”, “fire”, “cat”, “party”…"
          aria-label="Search emoji"
          autoComplete="off"
        />
        {query && (
          <button type="button" className="emoji-search-clear" onClick={() => setQuery("")} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Category tabs (hidden while searching) */}
      {!searching && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          <button className={`cat-pill ${active === "popular" ? "active" : ""}`} onClick={() => setActive("popular")}>🔥 Popular</button>
          {emojiCategories.map((c) => (
            <button key={c.id} className={`cat-pill ${active === c.id ? "active" : ""}`} onClick={() => setActive(c.id)}>
              {c.icon} {c.name}
            </button>
          ))}
          <Link href="/flags" className="cat-pill emoji-cat-link">🏳️ Flags <span aria-hidden>→</span></Link>
        </div>
      )}

      {/* Search results header */}
      {searching && (
        <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 16 }}>
          {results.length > 0
            ? `${results.length}${results.length >= 240 ? "+" : ""} result${results.length === 1 ? "" : "s"} for “${query}”`
            : `No emoji match “${query}”`}
        </p>
      )}

      {/* Grid OR no-results + suggestions */}
      {searching && results.length === 0 ? (
        <div style={{ padding: "8px 0 40px" }}>
          {suggestions.length > 0 ? (
            <>
              <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 16 }}>Did you mean — these are the closest matches:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))", gap: 8 }}>
                {suggestions.map((e) => <EmojiCard key={e.id} rec={e} copied={copied} onCopy={handleCopy} />)}
              </div>
            </>
          ) : (
            <p style={{ fontSize: 15, color: "var(--text3)" }}>
              Try a simpler word like “heart”, “smile”, “food” or “flag”, or browse the categories above.
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))", gap: 8 }}>
          {gridList.map((e) => <EmojiCard key={e.id} rec={e} copied={copied} onCopy={handleCopy} />)}
        </div>
      )}

      <p style={{ marginTop: 48, fontSize: 14, color: "var(--text3)", lineHeight: 1.7, textAlign: "center" }}>
        All emoji shown are standard Unicode emoji supported by major platforms including iOS, Android, Windows, and macOS.
        {!searching && active === "popular" && " Currently viewing the most popular emoji."}
        {!searching && activeMeta && ` Currently viewing the ${activeMeta.name} category.`}
      </p>
    </div>
  );
}
