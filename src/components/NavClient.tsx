"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavChild = { href: string; label: string };
type NavLink = { href?: string; label: string; children?: NavChild[] };

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/symbols", label: "Symbols" },
  { href: "/emoji", label: "Emoji" },
  { href: "/kaomoji", label: "Kaomoji" },
  { href: "/fancy-text", label: "Fancy Text" },
  {
    label: "Tools",
    children: [
      { href: "/text-repeater", label: "🔁 Text Repeater" },
      { href: "/small-text", label: "ˢ Small Text" },
      { href: "/strikethrough-text", label: "S̶ Strikethrough" },
      { href: "/aesthetic-text", label: "ａ Aesthetic Text" },
      { href: "/mirror-text", label: "↕ Mirror Text" },
      { href: "/symbol-builder", label: "✦ Symbol Builder" },
    ],
  },
  {
    label: "Collections",
    children: [
      { href: "/hearts", label: "❤ Heart Symbols" },
      { href: "/stars", label: "★ Star Symbols" },
      { href: "/bio-builder", label: "🛠️ Bio Builder" },
      { href: "/borders", label: "─ Borders & Lines" },
      { href: "/lenny-face", label: "( ͡° ͜ʖ ͡°) Lenny Faces" },
      { href: "/bullet-points", label: "• Bullet Points" },
      { href: "/bio-templates", label: "📝 Bio Templates" },
      { href: "/emoji-combos", label: "🌙✨ Emoji Combos" },
      { href: "/text-art", label: "🎨 Text Art" },
    ],
  },
  {
    label: "Platforms",
    children: [
      { href: "/symbols-for/instagram", label: "📸 Instagram" },
      { href: "/symbols-for/discord", label: "🎮 Discord" },
      { href: "/symbols-for/whatsapp", label: "💬 WhatsApp" },
      { href: "/symbols-for/twitter", label: "🐦 Twitter" },
      { href: "/symbols-for/tiktok", label: "🎵 TikTok" },
      { href: "/symbols-for/facebook", label: "👤 Facebook" },
    ],
  },
];

export default function NavClient() {
  const path = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggle = (label: string) => setOpenMenu(prev => prev === label ? null : label);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
      {links.map(l => {
        if (l.children) {
          const children = l.children;
          const isOpen = openMenu === l.label;
          return (
            <div key={l.label} style={{ position: "relative" }}>
              <button
                onClick={() => toggle(l.label)}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}
              >
                {l.label}
                <span style={{ fontSize: 9, opacity: 0.6, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
              </button>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setOpenMenu(null)} />
                  <div style={{ position: "absolute", top: "100%", left: 0, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, minWidth: 200, zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", marginTop: 4 }}>
                    {children.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpenMenu(null)}
                        style={{ display: "block", padding: "8px 12px", fontSize: 13, color: path === c.href ? "var(--accent)" : "var(--text2)", textDecoration: "none", borderRadius: 6, transition: "all 0.12s", whiteSpace: "nowrap" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = path === c.href ? "var(--accent)" : "var(--text2)"; }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        }
        return (
          <Link
            key={l.href}
            href={l.href!}
            className={`nav-link ${path.startsWith(l.href!) ? "active" : ""}`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
