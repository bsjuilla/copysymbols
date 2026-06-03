"use client";
import { useState } from "react";
import SymbolCard from "./SymbolCard";

interface Sym { id: string; symbol: string; name: string; }

interface Props {
  symbols: Sym[];
  gridStyle?: React.CSSProperties;
}

export default function MultiSelectGrid({ symbols, gridStyle }: Props) {
  const [selected, setSelected] = useState<Map<string, string>>(new Map());
  const [selectMode, setSelectMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelect = (symbol: string, name: string) => {
    setSelected(prev => {
      const next = new Map(prev);
      const key = symbol + name;
      if (next.has(key)) next.delete(key);
      else next.set(key, symbol);
      return next;
    });
  };

  const copyAll = async () => {
    const text = Array.from(selected.values()).join(" ");
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "✓"; toastMsg.textContent = `Copied ${selected.size} symbols`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 2000);
    }
    setSelected(new Map());
    setSelectMode(false);
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <button
          onClick={() => { setSelectMode(s => !s); setSelected(new Map()); }}
          style={{ background: selectMode ? "var(--accent-glow)" : "var(--surface)", border: `1px solid ${selectMode ? "var(--accent)" : "var(--border)"}`, borderRadius: 8, padding: "6px 14px", color: selectMode ? "var(--accent)" : "var(--text2)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
        >
          {selectMode ? "✓ Selecting..." : "☐ Select multiple"}
        </button>
        {selectMode && selected.size > 0 && (
          <>
            <span style={{ fontSize: 13, color: "var(--text3)" }}>{selected.size} selected</span>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "var(--text2)", fontFamily: "var(--font-dm-mono), monospace" }}>
              {Array.from(selected.values()).join(" ")}
            </div>
            <button onClick={copyAll} style={{ background: "var(--accent)", border: "none", borderRadius: 8, padding: "6px 16px", color: "var(--bg)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {copied ? "✓ Copied!" : "Copy all"}
            </button>
            <button onClick={() => setSelected(new Map())} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "var(--text3)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Clear</button>
          </>
        )}
      </div>

      {/* Grid */}
      <div className="symbols-grid" style={gridStyle}>
        {symbols.map(s => (
          <SymbolCard
            key={s.id}
            symbol={s.symbol}
            name={s.name}
            id={s.id}
            selectable={selectMode}
            selected={selected.has(s.symbol + s.name)}
            onSelect={selectMode ? handleSelect : undefined}
          />
        ))}
      </div>
    </div>
  );
}
