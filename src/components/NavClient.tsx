"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavChild = { href: string; label: string };
type NavLink = { href?: string; label: string; children?: NavChild[] };

const links: NavLink[] = [
  { href: "/symbols", label: "Symbols" },
  { href: "/emoji", label: "Emoji" },
  { href: "/kaomoji", label: "Kaomoji" },
  { href: "/fancy-text", label: "Fancy Text" },
  { href: "/text-repeater", label: "Repeater" },
  {
    label: "More",
    children: [
      { href: "/symbols-for/instagram", label: "Instagram Symbols" },
      { href: "/symbols-for/discord", label: "Discord Symbols" },
      { href: "/symbols-for/whatsapp", label: "WhatsApp Symbols" },
      { href: "/symbols-for/twitter", label: "Twitter Symbols" },
      { href: "/symbols-for/tiktok", label: "TikTok Symbols" },
      { href: "/text-art", label: "Text Art" },
    ],
  },
];

export default function NavClient() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
      {links.map(l => {
        if (l.children) {
          const children = l.children;
          return (
            <div key={l.label} style={{ position: "relative" }}>
              <button
                onClick={() => setOpen(o => !o)}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              >
                {l.label} ▾
              </button>
              {open && (
                <div style={{ position: "absolute", right: 0, top: "100%", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: 8, minWidth: 180, zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  {children.map(c => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      style={{ display: "block", padding: "8px 12px", fontSize: 13, color: "var(--text2)", textDecoration: "none", borderRadius: 6 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "var(--text2)"; }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
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