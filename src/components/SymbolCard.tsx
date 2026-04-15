"use client";
import { useState, useCallback, useEffect } from "react";

interface Props {
  symbol: string;
  name: string;
  id: string;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (symbol: string, name: string) => void;
}

let toastTimeout: ReturnType<typeof setTimeout>;

export default function SymbolCard({ symbol, name, id, selectable = false, selected = false, onSelect }: Props) {
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("copychars-favs") || "[]");
      setIsFav(favs.some((f: { id: string }) => f.id === id));
    } catch {}
  }, [id]);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectable && onSelect) {
      onSelect(symbol, name);
      return;
    }
    try { await navigator.clipboard.writeText(symbol); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = symbol; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true);
    // Save to recently copied
    try {
      const recent = JSON.parse(localStorage.getItem("copychars-recent") || "[]");
      const filtered = recent.filter((r: { id: string }) => r.id !== id);
      filtered.unshift({ id, symbol, name });
      localStorage.setItem("copychars-recent", JSON.stringify(filtered.slice(0, 20)));
    } catch {}
    clearTimeout(toastTimeout);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = symbol;
      toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      toastTimeout = setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
    } else {
      toastTimeout = setTimeout(() => setCopied(false), 1800);
    }
  }, [symbol, name, id, selectable, onSelect]);

  const toggleFav = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem("copychars-favs") || "[]");
      const exists = favs.some((f: { id: string }) => f.id === id);
      const newFavs = exists ? favs.filter((f: { id: string }) => f.id !== id) : [...favs, { id, symbol, name }];
      localStorage.setItem("copychars-favs", JSON.stringify(newFavs.slice(0, 50)));
      setIsFav(!exists);
    } catch {}
  }, [id, symbol, name]);

  return (
    <div
      className={`symbol-card ${copied ? "copied" : ""} ${selected ? "copied" : ""}`}
      onClick={handleCopy}
      title={`${selectable ? "Select" : "Copy"} ${name}`}
      style={{ position: "relative" }}
    >
      {selectable && selected && (
        <div style={{ position: "absolute", top: 6, right: 6, width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "var(--bg)" }}>✓</div>
      )}
      {!selectable && (
        <button
          onClick={toggleFav}
          title={isFav ? "Remove from favourites" : "Add to favourites"}
          style={{ position: "absolute", top: 4, right: 4, background: "none", border: "none", cursor: "pointer", fontSize: 10, color: isFav ? "var(--accent)" : "var(--text3)", padding: 2, lineHeight: 1, opacity: 0.7, zIndex: 2 }}
        >
          {isFav ? "♥" : "♡"}
        </button>
      )}
      <span className="symbol-char" aria-hidden="true">{symbol}</span>
      <span className="symbol-name">{name}</span>
    </div>
  );
}
