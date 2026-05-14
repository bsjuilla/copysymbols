"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type NavChild = { href: string; label: string };
type NavLink = { href?: string; label: string; children?: NavChild[] };

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/symbols", label: "Symbols" },
  { href: "/emoji", label: "Emoji" },
  { href: "/kaomoji", label: "Kaomoji" },
  { href: "/fancy-text", label: "Fancy Text" },
  { href: "/blog", label: "Blog" },
  {
    label: "Tools",
    children: [
      { href: "/text-repeater", label: "🔁 Text Repeater" },
      { href: "/small-text", label: "ˢ Small Text" },
      { href: "/superscript-generator", label: "ˣ² Super & Subscript" },
      { href: "/strikethrough-text", label: "S̶ Strikethrough" },
      { href: "/aesthetic-text", label: "ａ Aesthetic Text" },
      { href: "/mirror-text", label: "↕ Mirror Text" },
      { href: "/symbol-builder", label: "✦ Symbol Builder" },
      { href: "/character-counter", label: "# Character Counter" },
      { href: "/upside-down-text", label: "ǝ Upside Down" },
      { href: "/zalgo-text", label: "z̴ Zalgo Text" },
      { href: "/invisible-character", label: "• Invisible Character" },
      { href: "/username-generator", label: "👤 Username Generator" },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  // Track animation state separately so we can play close animation before unmounting
  const [drawerVisible, setDrawerVisible] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [path]);

  // Animate in when opened, animate out before unmounting
  useEffect(() => {
    if (mobileOpen) {
      setDrawerVisible(true);
    } else {
      setDrawerVisible(false);
    }
  }, [mobileOpen]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const toggleDesktop = (label: string) =>
    setOpenMenu(prev => (prev === label ? null : label));
  const toggleMobileSection = (label: string) =>
    setMobileExpanded(prev => (prev === label ? null : label));
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <>
      {/* ── Desktop nav (hidden on mobile via CSS) ── */}
      <div className="nav-desktop">
        {links.map(l => {
          if (l.children) {
            const isOpen = openMenu === l.label;
            return (
              <div key={l.label} style={{ position: "relative" }}>
                <button
                  onClick={() => toggleDesktop(l.label)}
                  className="nav-link"
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}
                >
                  {l.label}
                  <span style={{ fontSize: 9, opacity: 0.6, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                </button>
                {isOpen && (
                  <>
                    <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setOpenMenu(null)} />
                    <div style={{ position: "absolute", top: "100%", left: 0, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, minWidth: 200, zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", marginTop: 4 }}>
                      {l.children.map(c => (
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
              className={`nav-link ${path === l.href ? "active" : ""}`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      {/* ── Hamburger button (visible only on mobile via CSS) ── */}
      <button
        className="nav-hamburger"
        onClick={() => setMobileOpen(o => !o)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen
          ? <span style={{ fontSize: 20, lineHeight: 1 }}>✕</span>
          : <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", width: 20, height: 2, background: "var(--text2)", borderRadius: 2 }} />
              <span style={{ display: "block", width: 20, height: 2, background: "var(--text2)", borderRadius: 2 }} />
              <span style={{ display: "block", width: 14, height: 2, background: "var(--text2)", borderRadius: 2 }} />
            </span>
        }
      </button>

      {/* ── Mobile drawer — rendered via portal so header's backdrop-filter
           stacking context cannot trap position:fixed children ── */}
      {mounted && mobileOpen && createPortal(
        <>
          {/* Backdrop */}
          <div
            onClick={closeMobile}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              opacity: drawerVisible ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          />
          {/* Drawer panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(300px, 100vw)",
              zIndex: 9999,
              background: "var(--bg2)",
              borderLeft: "1px solid var(--border)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              transform: drawerVisible ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Drawer header row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              height: 56,
              borderBottom: "1px solid var(--border)",
              flexShrink: 0,
            }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--accent)", fontFamily: "var(--font-display, inherit)", letterSpacing: "-0.02em" }}>
                ✦ CopyChars
              </span>
              <button
                onClick={closeMobile}
                aria-label="Close menu"
                style={{
                  width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text2)",
                  cursor: "pointer",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0 32px" }}>
              {links.map(l => {
                if (l.children) {
                  const expanded = mobileExpanded === l.label;
                  return (
                    <div key={l.label}>
                      <button
                        onClick={() => toggleMobileSection(l.label)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "13px 20px",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid var(--border)",
                          color: "var(--text2)",
                          fontSize: 15,
                          fontFamily: "inherit",
                          fontWeight: 500,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        {l.label}
                        <span style={{
                          fontSize: 10, opacity: 0.5,
                          transition: "transform 0.2s",
                          transform: expanded ? "rotate(180deg)" : "rotate(0)",
                        }}>▼</span>
                      </button>
                      {expanded && (
                        <div style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)" }}>
                          {l.children.map(c => (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={closeMobile}
                              style={{
                                display: "block",
                                padding: "10px 20px 10px 32px",
                                fontSize: 14,
                                color: path === c.href ? "var(--accent)" : "var(--text3)",
                                textDecoration: "none",
                              }}
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
                    onClick={closeMobile}
                    style={{
                      display: "block",
                      padding: "13px 20px",
                      fontSize: 15,
                      fontWeight: 500,
                      color: path === l.href ? "var(--accent)" : "var(--text2)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
