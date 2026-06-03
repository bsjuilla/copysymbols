"use client";

import Link from "next/link";

const posts = [
  // Original 5
  { href: "/blog/how-to-type-copyright", title: "How to Type the Copyright Symbol © on Any Device", desc: "Mac, Windows, iPhone, Android and HTML shortcuts for the © copyright sign.", icon: "©", category: "How-To" },
  { href: "/blog/trademark-vs-registered", title: "™ vs ® vs © — What is the Difference?", desc: "Plain-English explanation of trademark, registered trademark and copyright. When to use each.", icon: "™", category: "Explained" },
  { href: "/blog/currency-symbols-list", title: "All Currency Symbols — Complete List $ € £ ¥ ₹", desc: "Every world currency symbol with country, name and Unicode. Copy any with one click.", icon: "€", category: "Reference" },
  { href: "/blog/greek-alphabet-list", title: "Complete Greek Alphabet — α β γ Copy & Paste", desc: "All 24 Greek letters with uppercase, lowercase, names and their uses in math and science.", icon: "Ω", category: "Reference" },
  { href: "/blog/instagram-bio-lines", title: "How to Make a Line in Your Instagram Bio", desc: "Copy and paste aesthetic dividers and separators that work in Instagram bios.", icon: "─", category: "How-To" },
  // New 10
  { href: "/blog/check-mark-symbol", title: "Check Mark Symbol ✓ — Complete Guide to Tick Marks", desc: "Unicode values, keyboard shortcuts for every device, and when to use each check mark variant.", icon: "✓", category: "How-To" },
  { href: "/blog/degree-symbol-copy-paste", title: "Degree Symbol ° — How to Type It on Any Device", desc: "Windows Alt+0176, Mac Option+Shift+8, iPhone hold-0, Android, HTML &deg; — all shortcuts.", icon: "°", category: "How-To" },
  { href: "/blog/infinity-symbol", title: "Infinity Symbol ∞ — Meaning, History and How to Type It", desc: "The mathematical meaning, historical origin, and keyboard shortcuts for the infinity symbol.", icon: "∞", category: "Explained" },
  { href: "/blog/arrow-symbols-list", title: "Arrow Symbols → Complete List of 200+ Copy Paste Arrows", desc: "Every Unicode arrow: right, left, up, down, double, curved, bold, decorative and more.", icon: "→", category: "Reference" },
  { href: "/blog/star-symbols", title: "Star Symbols ★ ☆ Copy & Paste — Every Star Character", desc: "Filled stars, outline stars, sparkle stars, and emoji stars — complete guide with Unicode values.", icon: "★", category: "Reference" },
  { href: "/blog/heart-symbols", title: "Heart Symbols ♥ ♡ Copy & Paste — Every Heart Character", desc: "Red hearts, outline hearts, coloured hearts, and text hearts. Meanings and keyboard shortcuts.", icon: "♥", category: "Reference" },
  { href: "/blog/discord-symbols", title: "Discord Symbols — Special Characters That Work in Discord", desc: "All Unicode symbols for Discord usernames, bios, and messages. Stars, brackets, arrows and more.", icon: "⚔", category: "How-To" },
  { href: "/blog/instagram-symbols", title: "Instagram Symbols — Copy & Paste for Bios and Captions", desc: "Best symbols for Instagram bios and captions. Stars, hearts, arrows, flowers, and dividers.", icon: "✦", category: "How-To" },
  { href: "/blog/math-symbols-list", title: "Math Symbols — Complete Unicode Mathematics Reference", desc: "Every math symbol: operators, comparison, calculus, set theory, and logic with Unicode codes.", icon: "∑", category: "Reference" },
  { href: "/blog/bullet-point-copy-paste", title: "Bullet Point Symbols • — All Bullet Characters Copy & Paste", desc: "Round, square, arrow, hollow bullets for lists, bios, and documents. Keyboard shortcuts included.", icon: "•", category: "How-To" },
  // New 3 (2026-06 content push)
  { href: "/blog/aesthetic-instagram-bio", title: "How to Make an Aesthetic Instagram Bio", desc: "Style your name with Unicode fonts, add copy-paste dividers and symbols, and lay it out so it looks clean on a phone.", icon: "✿", category: "How-To" },
  { href: "/blog/zodiac-signs-symbols", title: "Zodiac Signs ♈ — Every Symbol, Date and Meaning", desc: "All 12 zodiac glyphs to copy, with dates, element, ruling planet, and the meaning behind each sign.", icon: "♎", category: "Reference" },
  { href: "/blog/discord-fonts", title: "How to Get Fancy Fonts in Your Discord Name", desc: "Discord has no font setting — here's the Unicode trick people use to style names and messages, with styles to copy.", icon: "𝓓", category: "How-To" },
  { href: "/blog/tiktok-username-symbols", title: "Best Symbols for TikTok Usernames and Bios", desc: "Which symbols work in a TikTok @handle vs nickname, fonts and dividers to copy, and what TikTok quietly strips out.", icon: "✦", category: "How-To" },
  { href: "/blog/heart-emoji-meanings", title: "Heart Emoji Meanings — Every Colour Explained", desc: "What each heart means: ❤️ red, 🧡 orange, 💛 yellow, 💚 green, 💙 blue, 💜 purple, 🖤 black, 🤍 white and the special hearts.", icon: "💜", category: "Reference" },
  { href: "/blog/em-dash", title: "Em Dash — How to Type It & the 'AI' Meme", desc: "Type an em dash (—) on Windows, Mac, iPhone, Android and in HTML, how it differs from the en dash and hyphen, and the truth about the 'em dash means AI' debate.", icon: "—", category: "How-To" },
  // New (2026-06 content push — aesthetic/combo + kaomoji guides)
  { href: "/blog/aesthetic-emoji-combos", title: "Aesthetic Emoji Combos for Your Bio — Copy & Paste", desc: "The best aesthetic emoji combos by vibe (soft, coquette, y2k, cottagecore and more) and exactly how to add them to your Instagram, TikTok or Discord bio.", icon: "✨", category: "How-To" },
  { href: "/blog/cool-username-ideas", title: "Cool Username Ideas — Symbols, Fonts & Aesthetic Names", desc: "Style a username with fancy fonts and decorative symbols, plus honest tips on what works in @handles vs display names on Instagram, TikTok, Discord and games.", icon: "✦", category: "How-To" },
  { href: "/blog/what-is-kaomoji", title: "Kaomoji — What They Are and How to Use Them", desc: "What kaomoji (Japanese text faces) are, how they differ from Western emoticons, where they came from, and how to copy-paste them anywhere you type.", icon: "ツ", category: "Explained" },
];

const categoryColors: Record<string, string> = {
  "How-To": "#c8a96e",
  "Explained": "#a78bfa",
  "Reference": "#4ecdc4",
};

export default function BlogList() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Guides & articles</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Symbol Guides
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 48, lineHeight: 1.6 }}>
        How-to guides, explanations and reference articles about special characters and symbols.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {posts.map(post => (
          <Link key={post.href} href={post.href} style={{ textDecoration: "none" }}>
            <div
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start", transition: "all 0.18s", cursor: "pointer" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = ""; el.style.boxShadow = ""; }}
            >
              <div style={{ fontSize: "2.5rem", lineHeight: 1, flexShrink: 0, width: 48, textAlign: "center" }}>{post.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: `${categoryColors[post.category]}22`, color: categoryColors[post.category] }}>
                    {post.category}
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{post.desc}</p>
              </div>
              <span style={{ color: "var(--accent)", fontSize: 18, flexShrink: 0, paddingTop: 4 }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
