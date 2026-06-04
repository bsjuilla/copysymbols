"use client";
import { useState, useMemo } from "react";
import type { Kaomoji } from "@/data/kaomoji";
import KaomojiCard from "@/components/KaomojiCard";

interface Cat { id: string; name: string; icon: string; }

// Each kaomoji passed in carries an optional slug so the card can link to
// /kaomoji/<slug>. The slug is computed by src/data/all-kaomoji.ts.
type KaomojiWithMaybeSlug = Kaomoji & { slug?: string };

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

export default function KaomojiPageClient({
  allKaomoji, categories
}: { allKaomoji: KaomojiWithMaybeSlug[]; categories: Cat[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Search by name, mood, keywords, or the face glyphs themselves.
  const results = useMemo(() => {
    if (!searching) return [];
    const out: KaomojiWithMaybeSlug[] = [];
    for (const k of allKaomoji) {
      if (
        k.name.toLowerCase().includes(q) ||
        k.mood.toLowerCase().includes(q) ||
        k.face.includes(query) ||
        k.keywords.some((kw) => kw.toLowerCase().includes(q))
      ) {
        out.push(k);
        if (out.length >= 300) break;
      }
    }
    return out;
  }, [q, query, searching, allKaomoji]);

  // "Did you mean" — closest kaomoji by edit distance, only when nothing matched.
  const suggestions = useMemo(() => {
    if (!searching || results.length > 0 || q.length < 2) return [];
    const scored: { k: KaomojiWithMaybeSlug; d: number }[] = [];
    for (const k of allKaomoji) {
      let best = Infinity;
      for (const w of [k.name.toLowerCase(), k.mood.toLowerCase(), ...k.keywords.map((x) => x.toLowerCase())]) {
        const d = w.includes(q) ? 0 : lev(q, w);
        if (d < best) best = d;
        if (best === 0) break;
      }
      scored.push({ k, d: best });
    }
    const threshold = Math.max(2, Math.floor(q.length * 0.5));
    return scored.filter((s) => s.d <= threshold).sort((a, b) => a.d - b.d).slice(0, 18).map((s) => s.k);
  }, [q, searching, results.length, allKaomoji]);

  const filtered = active === "all" ? allKaomoji : allKaomoji.filter((k) => k.mood === active);
  const gridList = searching ? results : filtered;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <style>{`
        .kao-search { position: relative; max-width: 560px; margin: 0 0 28px; }
        .kao-search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 17px; opacity: 0.7; pointer-events: none; }
        .kao-search-input {
          width: 100%; padding: 15px 46px 15px 48px; font-size: 16px; color: var(--text);
          background: var(--surface); border: 1.5px solid var(--border); border-radius: 40px;
          outline: none; transition: border-color 0.18s, box-shadow 0.18s; font-family: inherit;
        }
        .kao-search-input::placeholder { color: var(--text3); }
        .kao-search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(200,169,110,0.14); }
        .kao-search-clear {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          width: 28px; height: 28px; border-radius: 50%; border: 0; cursor: pointer;
          background: var(--bg3, var(--border)); color: var(--text2); font-size: 13px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .kao-search-clear:hover { color: var(--text); }
      `}</style>

      <div className="section-label">Text emoticons</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Kaomoji (◕‿◕)
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 28, lineHeight: 1.6, maxWidth: 600 }}>
        Japanese text emoticons made from Unicode characters. Search or browse by mood, then click any kaomoji to copy it. They work in any app, on any platform.
      </p>

      {/* Search bar */}
      <div className="kao-search">
        <span className="kao-search-icon" aria-hidden>🔍</span>
        <input
          className="kao-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search kaomoji — try “happy”, “bear”, “shrug”, “love”…"
          aria-label="Search kaomoji"
          autoComplete="off"
        />
        {query && (
          <button type="button" className="kao-search-clear" onClick={() => setQuery("")} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Mood filter (hidden while searching) */}
      {!searching && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          <button className={`cat-pill ${active === "all" ? "active" : ""}`} onClick={() => setActive("all")}>
            ✦ All ({allKaomoji.length})
          </button>
          {categories.map((c) => {
            const count = allKaomoji.filter((k) => k.mood === c.id).length;
            return (
              <button key={c.id} className={`cat-pill ${active === c.id ? "active" : ""}`} onClick={() => setActive(c.id)}>
                {c.icon} {c.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Search results header */}
      {searching && (
        <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 16 }}>
          {results.length > 0
            ? `${results.length}${results.length >= 300 ? "+" : ""} result${results.length === 1 ? "" : "s"} for “${query}”`
            : `No kaomoji match “${query}”`}
        </p>
      )}

      {/* Grid OR no-results + suggestions */}
      {searching && results.length === 0 ? (
        <div style={{ padding: "8px 0 40px" }}>
          {suggestions.length > 0 ? (
            <>
              <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 16 }}>Did you mean — these are the closest matches:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
                {suggestions.map((k) => <KaomojiCard key={k.id} kaomoji={k} slug={k.slug} />)}
              </div>
            </>
          ) : (
            <p style={{ fontSize: 15, color: "var(--text3)" }}>
              Try a simpler word like “happy”, “sad”, “cute”, “bear” or “shrug”, or browse the moods above.
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
          {gridList.map((k) => <KaomojiCard key={k.id} kaomoji={k} slug={k.slug} />)}
        </div>
      )}

      {/* Info section (hidden while searching) */}
      {!searching && (
        <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>What are Kaomoji?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            <div>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
                Kaomoji (顔文字) are Japanese emoticons created from Unicode characters. Unlike Western emoticons like :) that you tilt your head to read, kaomoji are designed to be read straight — making them perfect for text messages, social media, and anywhere else you want to express emotion.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
                They&apos;re made by combining punctuation marks, letters, and symbols from Japanese, Korean, and other Unicode character sets. Popular examples: ¯\_(ツ)_/¯, (◕‿◕), ʕ•ᴥ•ʔ. Copy any of the faces above and paste them wherever you like.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
