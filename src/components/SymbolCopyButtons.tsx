"use client";
import { useEffect, useRef, useState } from "react";
import type { Symbol } from "@/data/symbols";
import { useCopyToast } from "@/lib/use-copy-toast";

export default function SymbolCopyButtons({ symbol: s }: { symbol: Symbol }) {
  const { copy } = useCopyToast();
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const labelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (labelTimerRef.current !== null) {
      clearTimeout(labelTimerRef.current);
      labelTimerRef.current = null;
    }
  }, []);

  const handleCopy = (text: string, label: string) => {
    copy(text, { symbol: s.symbol, label: `Copied ${label}` });
    setCopiedLabel(label);
    if (labelTimerRef.current !== null) clearTimeout(labelTimerRef.current);
    labelTimerRef.current = setTimeout(() => {
      setCopiedLabel(null);
      labelTimerRef.current = null;
    }, 1600);
  };

  const btns = [
    { label: "Symbol", value: s.symbol, hint: s.symbol },
    { label: "HTML", value: s.html, hint: s.html },
    { label: "Unicode", value: s.unicode, hint: s.unicode },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
      {btns.map(b => (
        <button
          key={b.label}
          className="detail-copy-btn"
          onClick={() => handleCopy(b.value, b.label)}
          style={{ justifyContent: "space-between", width: "100%", ...(copiedLabel === b.label ? { borderColor: "var(--accent)", color: "var(--accent)" } : {}) }}
        >
          <span style={{ color: "var(--text3)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 56 }}>{b.label}</span>
          <span style={{ flex: 1, textAlign: "center" }}>{b.hint}</span>
          <span style={{ fontSize: 12 }}>{copiedLabel === b.label ? "✓" : "copy"}</span>
        </button>
      ))}
    </div>
  );
}
