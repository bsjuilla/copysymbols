"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface SymbolResult {
  type: "symbol";
  id: string;
  symbol: string;
  name: string;
  category: string;
  description?: string;
}

interface KaomojiResult {
  type: "kaomoji";
  id: string;
  face: string;
  name: string;
  mood: string;
}

type Result = SymbolResult | KaomojiResult;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// ─── SEARCH LOGIC ─────────────────────────────────────────────────────────────

function searchAll(query: string): Result[] {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();
  const results: Result[] = [];

  // Dynamic import of data at runtime to avoid huge bundle at load
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { symbols } = require("@/data/symbols");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { kaomoji } = require("@/data/kaomoji");

    // Search symbols
    for (const s of symbols) {
      const matches =
        s.symbol === query ||
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.keywords?.some((k: string) => k.toLowerCase().includes(q)) ||
        s.unicode?.toLowerCase().includes(q);
      if (matches) {
        results.push({ type: "symbol", id: s.id, symbol: s.symbol, name: s.name, category: s.category, description: s.description });
        if (results.length >= 60) break;
      }
    }

    // Search kaomoji
    const kaoResults: KaomojiResult[] = [];
    for (const k of kaomoji) {
      const matches =
        k.face.includes(query) ||
        k.name.toLowerCase().includes(q) ||
        k.mood.toLowerCase().includes(q) ||
        k.keywords?.some((kw: string) => kw.toLowerCase().includes(q));
      if (matches) {
        kaoResults.push({ type: "kaomoji", id: k.id, face: k.face, name: k.name, mood: k.mood });
        if (kaoResults.length >= 20) break;
      }
    }
    results.push(...kaoResults);
  } catch {
    // data not available yet
  }

  return results;
}

// ─── COPY HELPER ─────────────────────────────────────────────────────────────

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = text;
      toastMsg.textContent = `Copied ${label}`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  });
}

// ─── CATEGORY LABEL ──────────────────────────────────────────────────────────

const CAT_LABELS: Record<string, string> = {
  arrows: "Arrows", currency: "Currency", math: "Math", greek: "Greek Letters",
  legal: "Legal & Trade", shapes: "Shapes & Stars", punctuation: "Punctuation",
  music: "Music", chess: "Chess & Games", zodiac: "Zodiac", weather: "Weather",
  technical: "Technical", superscript: "Superscript", ui: "UI & Interface",
};

// ─── MAIN OVERLAY ─────────────────────────────────────────────────────────────

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Run search whenever query changes
  useEffect(() => {
    if (!query.trim()) { setResults([]); setActiveIndex(0); return; }
    const r = searchAll(query);
    setResults(r);
    setActiveIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        const r = results[activeIndex];
        const text = r.type === "symbol" ? r.symbol : r.face;
        const label = r.name;
        handleCopy(r.id, text, label);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleCopy is a stable useCallback declared below; adding it to deps triggers a TS used-before-declaration error, and its identity is stable so omitting it is safe.
  }, [isOpen, results, activeIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleCopy = useCallback((id: string, text: string, label: string) => {
    copyToClipboard(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  if (!isOpen) return null;

  // Group symbol results by category, kaomoji separate
  const symbolResults = results.filter(r => r.type === "symbol") as SymbolResult[];
  const kaoResults = results.filter(r => r.type === "kaomoji") as KaomojiResult[];

  const grouped: { label: string; items: Result[] }[] = [];
  if (symbolResults.length > 0) {
    const byCat: Record<string, SymbolResult[]> = {};
    for (const s of symbolResults) {
      if (!byCat[s.category]) byCat[s.category] = [];
      byCat[s.category].push(s);
    }
    for (const [cat, items] of Object.entries(byCat)) {
      grouped.push({ label: CAT_LABELS[cat] || cat, items });
    }
  }
  if (kaoResults.length > 0) {
    grouped.push({ label: "Kaomoji", items: kaoResults });
  }

  let flatIndex = 0;

  const emptyState = query.trim() && results.length === 0;

  return (
    <>
      <style>{`
        .search-overlay-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          z-index: 9000;
          animation: overlay-fade-in 0.15s ease;
        }
        @keyframes overlay-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .search-overlay-panel {
          position: fixed;
          top: 15vh;
          left: 50%;
          transform: translateX(-50%);
          width: min(680px, calc(100vw - 32px));
          background: var(--bg2);
          border: 1px solid var(--border2);
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,169,110,0.08);
          z-index: 9001;
          overflow: hidden;
          animation: panel-slide-in 0.18s cubic-bezier(0.34,1.3,0.64,1);
          max-height: 70vh;
          display: flex;
          flex-direction: column;
        }
        @keyframes panel-slide-in {
          from { opacity: 0; transform: translateX(-50%) scale(0.96) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
        }
        .overlay-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .overlay-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: 18px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          caret-color: var(--accent);
        }
        .overlay-input::placeholder { color: var(--text3); }
        .overlay-results {
          overflow-y: auto;
          flex: 1;
        }
        .overlay-results::-webkit-scrollbar { width: 4px; }
        .overlay-results::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
        .overlay-group-label {
          padding: 10px 20px 6px;
          font-size: 10px;
          font-weight: 500;
          color: var(--text3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          position: sticky;
          top: 0;
          background: var(--bg2);
          z-index: 1;
        }
        .overlay-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
          gap: 6px;
          padding: 4px 16px 12px;
        }
        .overlay-sym-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 10px 6px 8px;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.12s;
          min-height: 68px;
          background: var(--surface);
          border-color: var(--border);
        }
        .overlay-sym-card:hover, .overlay-sym-card.active {
          border-color: var(--accent);
          background: rgba(200,169,110,0.08);
          transform: translateY(-1px);
        }
        .overlay-sym-card.copied {
          border-color: var(--accent);
          background: rgba(200,169,110,0.15);
        }
        .overlay-sym-char { font-size: 1.5rem; line-height: 1; }
        .overlay-sym-name { font-size: 9px; color: var(--text3); text-align: center; line-height: 1.3; }
        .overlay-kao-list {
          display: flex;
          flex-direction: column;
          padding: 4px 16px 12px;
          gap: 4px;
        }
        .overlay-kao-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid var(--border);
          background: var(--surface);
          transition: all 0.12s;
        }
        .overlay-kao-row:hover, .overlay-kao-row.active {
          border-color: var(--accent);
          background: rgba(200,169,110,0.08);
        }
        .overlay-kao-row.copied { border-color: var(--accent); background: rgba(200,169,110,0.15); }
        .overlay-kao-face { font-size: 1rem; color: var(--text); flex-shrink: 0; min-width: 120px; font-family: serif; }
        .overlay-kao-name { font-size: 12px; color: var(--text3); }
        .overlay-kao-badge { font-size: 10px; padding: 2px 8px; border-radius: 100px; background: var(--bg3); color: var(--text3); border: 1px solid var(--border); margin-left: auto; flex-shrink: 0; }
        .overlay-footer {
          border-top: 1px solid var(--border);
          padding: 10px 20px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-shrink: 0;
          background: var(--bg2);
        }
        .overlay-kbd {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text3);
        }
        .kbd {
          background: var(--bg3);
          border: 1px solid var(--border2);
          color: var(--text3);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 5px;
        }
        .overlay-count {
          margin-left: auto;
          font-size: 11px;
          color: var(--text3);
          font-family: 'DM Mono', monospace;
        }
      `}</style>

      {/* Backdrop */}
      <div className="search-overlay-backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="search-overlay-panel" role="dialog" aria-modal="true" aria-label="Symbol search">

        {/* Input row */}
        <div className="overlay-input-wrap">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: query ? "var(--accent)" : "var(--text3)", flexShrink: 0, transition: "color 0.2s" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            className="overlay-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search — try "theta", "arrow", "happy", "copyright"...'
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 18, padding: "0 4px", lineHeight: 1, flexShrink: 0 }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Results */}
        <div className="overlay-results" ref={listRef}>
          {!query.trim() && (
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>✦</div>
              <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 6 }}>Search 3,000+ symbols instantly</div>
              <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.8 }}>
                Try: <span style={{ color: "var(--accent)" }}>arrow</span> · <span style={{ color: "var(--accent)" }}>heart</span> · <span style={{ color: "var(--accent)" }}>theta</span> · <span style={{ color: "var(--accent)" }}>copyright</span> · <span style={{ color: "var(--accent)" }}>happy</span> · <span style={{ color: "var(--accent)" }}>star</span>
              </div>
            </div>
          )}

          {emptyState && (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12, opacity: 0.4 }}>¯\_(ツ)_/¯</div>
              <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 8 }}>No symbols found for &ldquo;{query}&rdquo;</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>Try a different keyword or browse categories below</div>
              <Link href="/symbols" onClick={onClose} style={{ display: "inline-block", marginTop: 16, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                Browse all symbols →
              </Link>
            </div>
          )}

          {grouped.map(group => (
            <div key={group.label}>
              <div className="overlay-group-label">{group.label}</div>

              {group.label === "Kaomoji" ? (
                <div className="overlay-kao-list">
                  {group.items.map(item => {
                    const k = item as KaomojiResult;
                    const idx = flatIndex++;
                    const isCopied = copiedId === k.id;
                    const isActive = activeIndex === idx;
                    return (
                      <div
                        key={k.id}
                        data-index={idx}
                        className={`overlay-kao-row ${isActive ? "active" : ""} ${isCopied ? "copied" : ""}`}
                        onClick={() => handleCopy(k.id, k.face, k.name)}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <span className="overlay-kao-face">{k.face}</span>
                        <span className="overlay-kao-name">{k.name}</span>
                        <span className="overlay-kao-badge">{k.mood}</span>
                        {isCopied && <span style={{ fontSize: 11, color: "var(--accent)", flexShrink: 0 }}>✓ copied</span>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overlay-grid">
                  {group.items.map(item => {
                    const s = item as SymbolResult;
                    const idx = flatIndex++;
                    const isCopied = copiedId === s.id;
                    const isActive = activeIndex === idx;
                    return (
                      <div
                        key={s.id}
                        data-index={idx}
                        className={`overlay-sym-card ${isActive ? "active" : ""} ${isCopied ? "copied" : ""}`}
                        onClick={() => handleCopy(s.id, s.symbol, s.name)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        title={s.description || s.name}
                      >
                        <span className="overlay-sym-char">{s.symbol}</span>
                        <span className="overlay-sym-name">{isCopied ? "✓" : s.name.slice(0, 12)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="overlay-footer">
          <span className="overlay-kbd"><kbd className="kbd">↑↓</kbd> navigate</span>
          <span className="overlay-kbd"><kbd className="kbd">↵</kbd> copy</span>
          <span className="overlay-kbd"><kbd className="kbd">Esc</kbd> close</span>
          {results.length > 0 && (
            <span className="overlay-count">{results.length} result{results.length !== 1 ? "s" : ""}</span>
          )}
          {query.trim() && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              rel="nofollow"
              style={{ marginLeft: "auto", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}
            >
              Full search page →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
