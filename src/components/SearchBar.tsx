"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Lazy load the overlay so it doesn't bloat the initial bundle
const SearchOverlay = dynamic(() => import("./SearchOverlay"), { ssr: false });

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  // Global keyboard shortcut: press / to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const openOverlay = useCallback(() => setOpen(true), []);
  const closeOverlay = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Trigger button — looks like the old search bar but opens overlay */}
      <button
        onClick={openOverlay}
        aria-label="Search symbols"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "14px 20px 14px 52px",
          cursor: "text",
          transition: "border-color 0.2s, box-shadow 0.2s",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 16,
          color: "var(--text3)",
          textAlign: "left",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
        }}
      >
        {/* Search icon */}
        <svg
          style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", width: 18, height: 18, flexShrink: 0 }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>

        <span style={{ flex: 1 }}>
          Search symbols — try &ldquo;theta&rdquo;, &ldquo;copyright&rdquo;, &ldquo;arrow&rdquo;...
        </span>

        {/* Keyboard shortcut hint */}
        <span style={{
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          color: "var(--text3)",
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 11,
          padding: "3px 8px",
          borderRadius: 6,
          flexShrink: 0,
        }}>
          /
        </span>
      </button>

      {/* The overlay */}
      <SearchOverlay isOpen={open} onClose={closeOverlay} />
    </>
  );
}
