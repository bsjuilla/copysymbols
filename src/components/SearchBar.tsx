"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  }, [value, router]);

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
      <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem", pointerEvents: "none" }}>🔍</span>
      <input
        className="search-input"
        type="text"
        placeholder='Search symbols — try "theta", "copyright", "arrow"...'
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus={autoFocus}
        aria-label="Search symbols"
      />
      {value && (
        <button type="submit" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "var(--accent)", border: "none", color: "var(--bg)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Search
        </button>
      )}
    </form>
  );
}
