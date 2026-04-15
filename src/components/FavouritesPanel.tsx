"use client";
import { useState, useEffect } from "react";

interface FavItem { id: string; symbol: string; name: string; }

export default function FavouritesPanel() {
  const [favs, setFavs] = useState<FavItem[]>([]);
  const [recent, setRecent] = useState<FavItem[]>([]);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    try {
      setFavs(JSON.parse(localStorage.getItem("copychars-favs") || "[]"));
      setRecent(JSON.parse(localStorage.getItem("copychars-recent") || "[]"));
    } catch {}
  }, [open]);

  const copy = async (symbol: string, name: string) => {
    try { await navigator.clipboard.writeText(symbol); }
    catch { const ta = document.createElement("textarea"); ta.value = symbol; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(symbol);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = symbol; toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const removeFav = (id: string) => {
    const newFavs = favs.filter(f => f.id !== id);
    setFavs(newFavs);
    localStorage.setItem("copychars-favs", JSON.stringify(newFavs));
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", color: "var(--text2)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}
        title="Favourites & Recent"
      >
        ♥ Favourites {favs.length > 0 && <span style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: 100, padding: "0 6px", fontSize: 11, fontWeight: 600 }}>{favs.length}</span>}
      </button>

      {open && (
        <div style={{ position: "absolute", right: 0, top: "110%", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, minWidth: 320, zIndex: 300, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>Your Symbols</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          {/* Favourites */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>♥ Favourites</div>
            {favs.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--text3)" }}>Click ♡ on any symbol to save it here.</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {favs.map(f => (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "4px 8px" }}>
                    <span style={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={() => copy(f.symbol, f.name)} title={`Copy ${f.name}`}>{f.symbol}</span>
                    <button onClick={() => removeFav(f.id)} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 11, cursor: "pointer", padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently copied */}
          <div>
            <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>🕐 Recently Copied</div>
            {recent.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--text3)" }}>Your recently copied symbols will appear here.</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {recent.slice(0, 16).map(r => (
                  <span key={r.id + Math.random()} title={r.name} onClick={() => copy(r.symbol, r.name)}
                    style={{ fontSize: "1.2rem", cursor: "pointer", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "4px 8px", transition: "border-color 0.15s" }}>
                    {r.symbol}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
