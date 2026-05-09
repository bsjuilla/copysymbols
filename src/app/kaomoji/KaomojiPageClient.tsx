"use client";
import { useState } from "react";
import type { Kaomoji } from "@/data/kaomoji";
import KaomojiCard from "@/components/KaomojiCard";

interface Cat { id: string; name: string; icon: string; }

export default function KaomojiPageClient({
  allKaomoji, categories
}: { allKaomoji: Kaomoji[]; categories: Cat[] }) {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? allKaomoji : allKaomoji.filter(k => k.mood === active);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text emoticons</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Kaomoji (◕‿◕)
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
        Japanese text emoticons made from Unicode characters. Click any kaomoji to copy it. They work in any app, on any platform.
      </p>

      {/* Mood filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        <button
          className={`cat-pill ${active === "all" ? "active" : ""}`}
          onClick={() => setActive("all")}
        >
          ✦ All ({allKaomoji.length})
        </button>
        {categories.map(c => {
          const count = allKaomoji.filter(k => k.mood === c.id).length;
          return (
            <button
              key={c.id}
              className={`cat-pill ${active === c.id ? "active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              {c.icon} {c.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
        {filtered.map(k => <KaomojiCard key={k.id} kaomoji={k} />)}
      </div>

      {/* Info section */}
      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>What are Kaomoji?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <div>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
              Kaomoji (顔文字) are Japanese emoticons created from Unicode characters. Unlike Western emoticons like :) that you tilt your head to read, kaomoji are designed to be read straight — making them perfect for text messages, social media, and anywhere else you want to express emotion.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
              They&apos;re made by combining punctuation marks, letters, and symbols from Japanese, Korean, and other Unicode character sets. Popular examples: ¯\_(ツ)_/¯, (◕‿◕), ʕ•ᴥ•ʔ. Copy any of the faces above and paste them wherever you like.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
