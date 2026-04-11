"use client";
import Link from "next/link";

interface Props {
  id: string;
  icon: string;
  name: string;
  description: string;
  count: number;
  preview: { id: string; symbol: string }[];
}

export default function CategoryCard({ id, icon, name, description, count, preview }: Props) {
  return (
    <Link href={`/symbols/${id}`} style={{ textDecoration: "none" }}>
      <div
        className="cat-card"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px", cursor: "pointer", height: "100%", transition: "all 0.18s" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = ""; el.style.boxShadow = ""; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: "1.8rem" }}>{icon}</span>
          <div>
            <div className="font-display" style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>{name}</div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>{count} symbols</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 14, lineHeight: 1.5 }}>{description}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {preview.map(s => (
            <span key={s.id} style={{ fontSize: "1.3rem", background: "var(--bg3)", borderRadius: 8, padding: "4px 8px", border: "1px solid var(--border)" }}>{s.symbol}</span>
          ))}
          {count > 6 && <span style={{ fontSize: 12, color: "var(--text3)", padding: "4px 8px", alignSelf: "center" }}>+{count - 6} more</span>}
        </div>
      </div>
    </Link>
  );
}
