"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import { searchSymbols } from "@/data/symbols";
import { kaomoji } from "@/data/kaomoji";
import SymbolCard from "@/components/SymbolCard";
import CopyToast from "@/components/CopyToast";
import KaomojiCard from "@/components/KaomojiCard";

function SearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState(() => initialQ ? searchSymbols(initialQ) : []);
  const [kResults, setKResults] = useState(() =>
    initialQ ? kaomoji.filter(k => k.name.toLowerCase().includes(initialQ.toLowerCase()) || k.keywords.some(w => w.includes(initialQ.toLowerCase()))) : []
  );

  const handleChange = useCallback((val: string) => {
    setQuery(val);
    const newResults = val.trim() ? searchSymbols(val) : [];
    const newK = val.trim() ? kaomoji.filter(k =>
      k.name.toLowerCase().includes(val.toLowerCase()) ||
      k.mood.includes(val.toLowerCase()) ||
      k.keywords.some(w => w.includes(val.toLowerCase()))
    ) : [];
    setResults(newResults);
    setKResults(newK);
    if (val.trim()) {
      router.replace(`/search?q=${encodeURIComponent(val.trim())}`, { scroll: false });
    }
  }, [router]);

  const totalResults = results.length + kResults.length;

  return (
    <>
      <CopyToast />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <div className="section-label">Search</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 24, letterSpacing: "-0.03em" }}>
          Find any symbol
        </h1>

        {/* Live search input */}
        <div style={{ position: "relative", maxWidth: 640, marginBottom: 40 }}>
          <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem", pointerEvents: "none" }}>🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder='Try "copyright", "theta", "arrow", "sad kaomoji"...'
            value={query}
            onChange={e => handleChange(e.target.value)}
            autoFocus
            aria-label="Search symbols"
          />
          {query && (
            <button onClick={() => handleChange("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text3)", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
          )}
        </div>

        {/* Results */}
        {query ? (
          totalResults === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 24px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
              <div className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>No results for "{query}"</div>
              <p style={{ color: "var(--text2)", fontSize: 14 }}>Try searching by description — "raised dot", "double arrow", "european currency"</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 28 }}>
                {totalResults} result{totalResults !== 1 ? "s" : ""} for <span style={{ color: "var(--accent)" }}>"{query}"</span>
              </div>

              {results.length > 0 && (
                <section style={{ marginBottom: 48 }}>
                  <h2 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 16 }}>
                    Symbols <span style={{ color: "var(--text3)", fontSize: 14, fontWeight: 400 }}>({results.length})</span>
                  </h2>
                  <div className="symbols-grid">
                    {results.map(s => <SymbolCard key={s.id} symbol={s.symbol} name={s.name} id={s.id} />)}
                  </div>
                </section>
              )}

              {kResults.length > 0 && (
                <section>
                  <h2 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 16 }}>
                    Kaomoji <span style={{ color: "var(--text3)", fontSize: 14, fontWeight: 400 }}>({kResults.length})</span>
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                    {kResults.map(k => <KaomojiCard key={k.id} kaomoji={k} />)}
                  </div>
                </section>
              )}
            </div>
          )
        ) : (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text3)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✦</div>
            <p>Start typing to search symbols, kaomoji, and more</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPageClient() {
  return (
    <Suspense fallback={<div style={{ padding: 48, color: "var(--text2)" }}>Loading...</div>}>
      <SearchInner />
    </Suspense>
  );
}
