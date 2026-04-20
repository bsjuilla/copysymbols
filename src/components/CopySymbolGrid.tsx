"use client";

interface SymbolItem {
  symbol: string;
  name: string;
  unicode?: string;
  html?: string;
  use?: string;
}

interface CopySymbolGridProps {
  items: SymbolItem[];
  columns?: string;
}

export default function CopySymbolGrid({ items, columns = "repeat(auto-fill, minmax(180px, 1fr))" }: CopySymbolGridProps) {
  function handleCopy(symbol: string) {
    navigator.clipboard.writeText(symbol);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: columns, gap: 12, marginBottom: 56 }}>
      {items.map((s, i) => (
        <button
          key={i}
          onClick={() => handleCopy(s.symbol)}
          style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
        >
          <div style={{ fontSize: "2.2rem", marginBottom: 8, lineHeight: 1 }}>{s.symbol}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.name}</div>
          {s.unicode && <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.unicode}</div>}
          {s.use && <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{s.use}</div>}
        </button>
      ))}
    </div>
  );
}
