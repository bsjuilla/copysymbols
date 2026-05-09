"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface SymbolItem { id: string; symbol: string; name: string; }
interface CategoryItem {
  id: string; name: string; icon: string; description: string;
  count: number; preview: { id: string; symbol: string }[];
}
interface Props {
  popular: SymbolItem[];
  categories: CategoryItem[];
  arrowSymbols: SymbolItem[];
  currencySymbols: SymbolItem[];
  mathSymbols: SymbolItem[];
  totalSymbols: number;
}

// ─── TICKER SYMBOLS ──────────────────────────────────────────────────────────

const TICKER_SYMBOLS = [
  "→","←","↑","↓","↔","⇒","★","☆","♥","♡","✓","✔","©","™","®","∞","π","√",
  "≠","≤","≥","∑","∆","Ω","α","β","γ","θ","€","£","¥","₹","₿","¢","§","¶",
  "♠","♣","♦","♪","♫","☀","☁","☂","☃","⚡","❄","✿","❀","✦","✧","❋","⊕",
  "⊗","∅","∈","⊂","∪","∩","∂","∫","∇","✈","⚓","⚔","⚖","⚙","⛏","⚜",
  "「","」","【","】","《","》","꧁","꧂","彡","ツ","シ","ω","ᴥ","•","◦","▸",
];

// ─── FLOATING BACKGROUND SYMBOLS ─────────────────────────────────────────────

const FLOAT_SYMBOLS = ["✦","★","♡","∞","π","→","©","✿","Ω","≠","∑","⚡","♪","◈","❋"];

// ─── TESTIMONIALS DATA ────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    text: "I use CopyChars every single day for my Instagram bio and captions. The aesthetic borders alone are worth bookmarking it.",
    handle: "@sofiacreatess",
    platform: "📸 Instagram creator",
    symbol: "✦",
  },
  {
    text: "Finally a symbol site that doesn't look like it was built in 2003. The search is instant and it actually has everything I need.",
    handle: "@devwithmark",
    platform: "💻 Web developer",
    symbol: "→",
  },
  {
    text: "My Discord server name looks so much better now. Spent 10 minutes here and completely transformed my whole server aesthetic.",
    handle: "@noxgaming_",
    platform: "🎮 Discord server owner",
    symbol: "⚔",
  },
  {
    text: "The kaomoji collection is huge and actually organised by mood. This is the only copy-paste site I send to my followers.",
    handle: "@kawaii.txt",
    platform: "🎵 TikTok creator",
    symbol: "( ◕‿◕)",
  },
  {
    text: "As a maths teacher I need Greek letters and operators constantly. CopyChars saves me going into Word's symbol picker every time.",
    handle: "@mathswithpriya",
    platform: "🧮 Educator",
    symbol: "∑",
  },
  {
    text: "The fancy text generator is legit — my Twitter bio finally looks the way I wanted it to for years.",
    handle: "@lana.writes",
    platform: "🐦 Twitter / X",
    symbol: "𝓛",
  },
];

// ─── INLINE MINI SYMBOL CARD ─────────────────────────────────────────────────

function MiniCard({ symbol, name, id }: SymbolItem) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(symbol).then(() => {
      setCopied(true);
      const toast = document.getElementById("global-toast");
      const toastSym = document.getElementById("toast-symbol");
      const toastMsg = document.getElementById("toast-message");
      if (toast && toastSym && toastMsg) {
        toastSym.textContent = symbol;
        toastMsg.textContent = `Copied ${name}`;
        toast.classList.add("show");
        setTimeout(() => { toast.classList.remove("show"); setCopied(false); }, 1800);
      }
    });
  }, [symbol, name]);

  return (
    <div
      onClick={copy}
      className={`symbol-card ${copied ? "copied" : ""}`}
      title={name}
      style={{ minHeight: 80 }}
    >
      <span className="symbol-char">{symbol}</span>
      <span className="symbol-name">{name}</span>
    </div>
  );
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function HomeClient({
  popular, categories, arrowSymbols, currencySymbols, mathSymbols, totalSymbols
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [randomSym, setRandomSym] = useState<SymbolItem | null>(null);
  const [randomCopied, setRandomCopied] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // All symbols for random picker
  const allForRandom = [...popular, ...arrowSymbols, ...currencySymbols, ...mathSymbols];

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const pickRandom = () => {
    const sym = allForRandom[Math.floor(Math.random() * allForRandom.length)];
    setRandomSym(sym);
    setRandomCopied(false);
  };

  const copyRandom = () => {
    if (!randomSym) return;
    navigator.clipboard.writeText(randomSym.symbol).then(() => {
      setRandomCopied(true);
      setTimeout(() => setRandomCopied(false), 2000);
    });
  };

  // Double the ticker for seamless loop
  const tickerItems = [...TICKER_SYMBOLS, ...TICKER_SYMBOLS];

  const quickSearches = ["copyright symbol","heart symbol","arrow right","degree sign","pi symbol","infinity symbol","star symbol","check mark"];

  return (
    <div>
      {/* ── FLOATING BACKGROUND ────────────────────────────────────────────── */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.08; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(200,169,110,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(200,169,110,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,169,110,0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes trust-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-float-sym {
          position: absolute;
          font-size: 1.4rem;
          color: var(--accent);
          animation: float-up linear infinite;
          pointer-events: none;
          user-select: none;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 40s linear infinite;
        }
        .ticker-track.paused { animation-play-state: paused; }
        .ticker-item {
          font-size: 1.5rem;
          padding: 0 18px;
          cursor: pointer;
          color: var(--text2);
          transition: color 0.15s, transform 0.15s;
          line-height: 1;
          display: flex;
          align-items: center;
        }
        .ticker-item:hover { color: var(--accent); transform: scale(1.3); }
        .random-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text2);
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .random-btn:hover { border-color: var(--accent); color: var(--accent); background: rgba(200,169,110,0.08); }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 24px;
          text-align: center;
          flex: 1;
          min-width: 120px;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: var(--border2); }
        .cat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 18px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: block;
          overflow: hidden;
          position: relative;
        }
        .cat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top left, rgba(200,169,110,0.08), transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cat-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .cat-card:hover::before { opacity: 1; }
        .search-wrap {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-kbd {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--text3);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 6px;
          pointer-events: none;
        }
        .feature-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .feature-card:hover { border-color: var(--border2); transform: translateY(-2px); }
        .section-preview-sym {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px;
          cursor: pointer;
          font-size: 1.3rem;
          text-align: center;
          transition: all 0.15s;
          line-height: 1;
        }
        .section-preview-sym:hover { border-color: var(--accent); background: rgba(200,169,110,0.08); transform: scale(1.1); }
        .animate-in { animation: fade-in-up 0.6s ease both; }

        /* ── SOCIAL PROOF STYLES ── */
        .trust-strip {
          display: flex;
          width: max-content;
          animation: trust-scroll 30s linear infinite;
          gap: 0;
        }
        .trust-strip-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          white-space: nowrap;
          font-size: 13px;
          color: var(--text3);
          border-right: 1px solid var(--border);
        }
        .trust-strip-item span:first-child { font-size: 1.1rem; }
        .trust-strip-item strong { color: var(--text2); font-weight: 500; }
        .testimonial-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .testimonial-card:hover { border-color: var(--border2); transform: translateY(-2px); }
        .testimonial-quote {
          font-size: 14px;
          color: var(--text2);
          line-height: 1.75;
          flex: 1;
        }
        .testimonial-symbol {
          font-size: 1.6rem;
          line-height: 1;
          opacity: 0.6;
        }
        .testimonial-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          border-top: 1px solid var(--border);
          padding-top: 12px;
        }
        .testimonial-handle {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
          font-family: 'DM Mono', monospace;
        }
        .testimonial-platform {
          font-size: 11px;
          color: var(--text3);
        }
        .star-rating {
          display: flex;
          gap: 2px;
          margin-left: auto;
        }
        .star-rating span {
          color: var(--accent);
          font-size: 12px;
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "88px 24px 56px", textAlign: "center" }}>

        {/* Floating background symbols */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {FLOAT_SYMBOLS.map((sym, i) => (
            <div
              key={i}
              className="hero-float-sym"
              style={{
                left: `${5 + (i * 6.5) % 92}%`,
                bottom: `-40px`,
                animationDuration: `${12 + (i * 3.7) % 14}s`,
                animationDelay: `${(i * 1.9) % 10}s`,
                fontSize: `${1 + (i % 3) * 0.5}rem`,
                opacity: 0,
              }}
            >
              {sym}
            </div>
          ))}
        </div>

        {/* Radial glow */}
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(200,169,110,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div className="section-label animate-in" style={{ marginBottom: 18, animationDelay: "0.1s" }}>
            {totalSymbols.toLocaleString()}+ symbols · one click to copy
          </div>

          <h1
            className="font-display animate-in"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.04em", color: "var(--text)", animationDelay: "0.2s" }}
          >
            Copy any symbol,{" "}
            <span className="gradient-text">instantly.</span>
          </h1>

          <p className="animate-in" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text2)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px", animationDelay: "0.3s" }}>
            Every special character you&apos;ll ever need — arrows, hearts, stars, Greek letters, kaomoji and more. Tap to copy.
          </p>

          {/* Search bar */}
          <div className="search-wrap animate-in" style={{ animationDelay: "0.4s" }}>
            <form onSubmit={handleSearch}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", width: 18, height: 18, flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  ref={inputRef}
                  className="search-input"
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search symbols, kaomoji, emoji..."
                  style={{ paddingRight: 60 }}
                />
                <span className="search-kbd">/</span>
              </div>
            </form>
          </div>

          {/* Quick search tags */}
          <div className="animate-in" style={{ marginTop: 14, display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", animationDelay: "0.5s" }}>
            {quickSearches.map(q => (
              <Link
                key={q}
                href={`/search?q=${encodeURIComponent(q)}`}
                style={{ fontSize: 12, color: "var(--text3)", textDecoration: "none", padding: "3px 11px", borderRadius: 100, border: "1px solid var(--border)", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ───────────────────────────────────────────────────── */}
      <div
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)", overflow: "hidden", height: 56, display: "flex", alignItems: "center" }}
        onMouseEnter={() => setTickerPaused(true)}
        onMouseLeave={() => setTickerPaused(false)}
      >
        <div className={`ticker-track ${tickerPaused ? "paused" : ""}`}>
          {tickerItems.map((sym, i) => (
            <div
              key={i}
              className="ticker-item"
              onClick={() => {
                navigator.clipboard.writeText(sym);
                const toast = document.getElementById("global-toast");
                const toastSym = document.getElementById("toast-symbol");
                const toastMsg = document.getElementById("toast-message");
                if (toast && toastSym && toastMsg) {
                  toastSym.textContent = sym;
                  toastMsg.textContent = "Copied!";
                  toast.classList.add("show");
                  setTimeout(() => toast.classList.remove("show"), 1800);
                }
              }}
              title="Click to copy"
            >
              {sym}
            </div>
          ))}
        </div>
      </div>

      {/* ── SOCIAL PROOF TRUST STRIP ──────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)", overflow: "hidden", height: 44, display: "flex", alignItems: "center" }}>
        <div className="trust-strip">
          {[...Array(2)].flatMap(() => [
            { icon: "📸", text: <><strong>Instagram</strong> bios & captions</> },
            { icon: "🎮", text: <><strong>Discord</strong> usernames & servers</> },
            { icon: "🎵", text: <><strong>TikTok</strong> bios & comments</> },
            { icon: "🐦", text: <><strong>Twitter / X</strong> profiles</> },
            { icon: "💬", text: <><strong>WhatsApp</strong> messages & statuses</> },
            { icon: "📝", text: <><strong>Google Docs</strong> & Word documents</> },
            { icon: "💻", text: <><strong>Developers</strong> — HTML, CSS, Unicode</> },
            { icon: "🎓", text: <><strong>Students</strong> — math & science symbols</> },
          ]).map((item, i) => (
            <div key={i} className="trust-strip-item">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── STATS BAR ───────────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "40px 0 56px" }}>
          {[
            { label: "Symbols", value: totalSymbols, suffix: "+" },
            { label: "Categories", value: 14, suffix: "" },
            { label: "Kaomoji", value: 71, suffix: "+" },
            { label: "Emoji", value: 1800, suffix: "+" },
          ].map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "DM Mono, monospace" }}>
                {stat.label}
              </div>
            </div>
          ))}

          {/* Random symbol button */}
          <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <button className="random-btn" onClick={pickRandom} style={{ animation: "pulse-ring 2.5s ease-out infinite" }}>
              <span style={{ fontSize: "1.1rem" }}>🎲</span>
              Random symbol
            </button>
            {randomSym && (
              <div
                onClick={copyRandom}
                style={{ display: "flex", alignItems: "center", gap: 10, background: randomCopied ? "rgba(200,169,110,0.12)" : "var(--bg3)", border: `1px solid ${randomCopied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "8px 16px", cursor: "pointer", transition: "all 0.2s" }}
              >
                <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{randomSym.symbol}</span>
                <div>
                  <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{randomSym.name}</div>
                  <div style={{ fontSize: 11, color: randomCopied ? "var(--accent)" : "var(--text3)" }}>{randomCopied ? "✓ copied!" : "click to copy"}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── POPULAR SYMBOLS ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <div>
              <div className="section-label">Most copied</div>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Popular Symbols</h2>
            </div>
            <Link href="/symbols" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
          </div>
          <div className="symbols-grid">
            {popular.map(s => <MiniCard key={s.id} {...s} />)}
          </div>
        </section>

        {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <div className="section-label">Browse by type</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>All Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
            {categories.map(cat => (
              <Link key={cat.id} href={`/symbols/${cat.id}`} className="cat-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{cat.icon}</span>
                  <span className="font-display" style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{cat.name}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>{cat.count} symbols</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {cat.preview.map(p => (
                    <span key={p.id} style={{ fontSize: "1.1rem", color: "var(--text2)", lineHeight: 1 }}>{p.symbol}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SYMBOL PREVIEW STRIPS ───────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {[
              { title: "Arrow Symbols", href: "/symbols/arrows", items: arrowSymbols },
              { title: "Currency Signs", href: "/symbols/currency", items: currencySymbols },
              { title: "Math Symbols", href: "/symbols/math", items: mathSymbols },
            ].map(section => (
              <div key={section.title}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "var(--text)" }}>{section.title}</h3>
                  <Link href={section.href} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>All →</Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))", gap: 7 }}>
                  {section.items.map(s => (
                    <div
                      key={s.id}
                      className="section-preview-sym"
                      onClick={() => {
                        navigator.clipboard.writeText(s.symbol);
                        const toast = document.getElementById("global-toast");
                        const toastSym = document.getElementById("toast-symbol");
                        const toastMsg = document.getElementById("toast-message");
                        if (toast && toastSym && toastMsg) {
                          toastSym.textContent = s.symbol;
                          toastMsg.textContent = `Copied ${s.name}`;
                          toast.classList.add("show");
                          setTimeout(() => toast.classList.remove("show"), 1800);
                        }
                      }}
                      title={s.name}
                    >
                      {s.symbol}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURE STRIP ───────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[
              { icon: "⚡", title: "Instant copy", desc: "Click any symbol to copy it immediately. Works on mobile and desktop without any sign-up.", href: "/symbols" },
              { icon: "🔍", title: "Smart search", desc: "Search by name, keyword, or the symbol itself. Press / anywhere to open search.", href: "/search?q=arrow" },
              { icon: "💾", title: "Full Unicode details", desc: "Every symbol shows its Unicode code, HTML entity, CSS value, and keyboard shortcuts.", href: "/symbols/arrows" },
              { icon: "🤖", title: "Growing daily", desc: "New symbols, kaomoji, emoji combos and borders are added automatically every day.", href: "/kaomoji" },
            ].map(f => (
              <Link key={f.title} href={f.href} className="feature-card" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 14 }}>{f.icon}</div>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>Loved by creators</div>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              What People Are Saying
            </h2>
            <p style={{ fontSize: 14, color: "var(--text3)", maxWidth: 480, margin: "0 auto" }}>
              Used daily by content creators, developers, students and professionals worldwide.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-symbol">{t.symbol}</div>
                <p className="testimonial-quote">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-footer">
                  <div>
                    <div className="testimonial-handle">{t.handle}</div>
                    <div className="testimonial-platform">{t.platform}</div>
                  </div>
                  <div className="star-rating">
                    {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLATFORM QUICK LINKS ────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <div className="section-label">By platform</div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Symbols for Every App</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { href: "/symbols-for/instagram", label: "📸 Instagram" },
              { href: "/symbols-for/discord", label: "🎮 Discord" },
              { href: "/symbols-for/whatsapp", label: "💬 WhatsApp" },
              { href: "/symbols-for/twitter", label: "🐦 Twitter / X" },
              { href: "/symbols-for/tiktok", label: "🎵 TikTok" },
              { href: "/symbols-for/facebook", label: "👤 Facebook" },
              { href: "/bio-templates", label: "📝 Bio Templates" },
              { href: "/emoji-combos", label: "🌙 Emoji Combos" },
              { href: "/borders", label: "─ Aesthetic Borders" },
              { href: "/lenny-face", label: "( ͡° ͜ʖ ͡°) Lenny Faces" },
            ].map(p => (
              <Link key={p.href} href={p.href} className="cat-pill">
                {p.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── BOTTOM SEO BAND ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64, padding: "32px", background: "var(--surface)", borderRadius: 20, border: "1px solid var(--border)", textAlign: "center" }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
            The fastest way to copy special characters
          </h2>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 20px" }}>
            CopyChars has every Unicode symbol organised and ready to copy. Whether you need a ✓ checkmark, ∞ infinity sign, © copyright symbol, → arrow, or ♥ heart — just click and it&apos;s in your clipboard.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["✓ check mark","∞ infinity","© copyright","→ arrow","♥ heart","★ star","° degree","π pi symbol"].map(tag => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag.split(" ").slice(1).join(" "))}`}
                style={{ fontSize: 13, color: "var(--text2)", textDecoration: "none", padding: "4px 12px", borderRadius: 100, border: "1px solid var(--border)", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text2)"; }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
