"use client";
import { useState } from "react";
import Link from "next/link";

const collections: Record<string, { category: string; symbols: { s: string; n: string }[] }[]> = {
  instagram: [
    { category: "Bio Decorations", symbols: [
      {s:"✨",n:"Sparkles"},{s:"🌙",n:"Moon"},{s:"⭐",n:"Star"},{s:"💫",n:"Dizzy"},{s:"🔥",n:"Fire"},{s:"💎",n:"Diamond"},{s:"👑",n:"Crown"},{s:"🦋",n:"Butterfly"},{s:"🌸",n:"Blossom"},{s:"✿",n:"Flower"},{s:"❀",n:"Florette"},{s:"♡",n:"Heart"},{s:"❤",n:"Red Heart"},{s:"💕",n:"Two Hearts"},{s:"🖤",n:"Black Heart"},{s:"💜",n:"Purple Heart"},
    ]},
    { category: "Arrows & Separators", symbols: [
      {s:"→",n:"Right Arrow"},{s:"←",n:"Left Arrow"},{s:"↠",n:"Two Head Right"},{s:"»",n:"Double Angle"},{s:"«",n:"Double Angle Left"},{s:"•",n:"Bullet"},{s:"·",n:"Middle Dot"},{s:"｜",n:"Vertical Line"},{s:"─",n:"Horizontal Line"},{s:"★",n:"Star"},{s:"☆",n:"Empty Star"},{s:"▸",n:"Play"},{s:"◦",n:"White Bullet"},{s:"‣",n:"Triangle Bullet"},{s:"⁕",n:"Five Spoke"},{s:"※",n:"Reference Mark"},
    ]},
    { category: "Aesthetic Symbols", symbols: [
      {s:"ꕤ",n:"Sakura"},{s:"𖡼",n:"Leaf"},{s:"𖥔",n:"Fleur"},{s:"ᥫ᭡",n:"Khmer"},{s:"༄",n:"Tibetan Wind"},{s:"꩜",n:"Cham Spiral"},{s:"ྀི",n:"Tibetan"},{s:"᯼",n:"Batak"},{s:"웃",n:"Korean"},{s:"유",n:"Korean"},{s:"⌗",n:"Viewdata"},{s:"⊹",n:"Cross"},{s:"₊",n:"Superscript Plus"},{s:"˚",n:"Ring Above"},{s:"ˀ",n:"Modifier"},{s:"ᵎ",n:"Modifier"},
    ]},
    { category: "Status & Mood", symbols: [
      {s:"✓",n:"Check"},{s:"✗",n:"Cross"},{s:"⚠",n:"Warning"},{s:"♻",n:"Recycle"},{s:"☮",n:"Peace"},{s:"☯",n:"Yin Yang"},{s:"🕊",n:"Dove"},{s:"🌿",n:"Herb"},{s:"🍃",n:"Leaf Wind"},{s:"🌊",n:"Wave"},{s:"⚡",n:"Lightning"},{s:"🔮",n:"Crystal Ball"},{s:"🧿",n:"Nazar"},{s:"🪬",n:"Hamsa"},{s:"∞",n:"Infinity"},{s:"☁",n:"Cloud"},
    ]},
  ],
  discord: [
    { category: "Username Decorators", symbols: [
      {s:"꧁",n:"Open Ornament"},{s:"꧂",n:"Close Ornament"},{s:"༒",n:"Tibetan"},{s:"ꀰ",n:"Yi"},{s:"彡",n:"Japanese"},{s:"★",n:"Star"},{s:"☆",n:"Empty Star"},{s:"⚡",n:"Lightning"},{s:"♛",n:"Black Queen"},{s:"♜",n:"Black Rook"},{s:"☠",n:"Skull"},{s:"⚔",n:"Swords"},{s:"🔱",n:"Trident"},{s:"⚜",n:"Fleur de Lis"},{s:"🏆",n:"Trophy"},{s:"👁",n:"Eye"},
    ]},
    { category: "Server Decorations", symbols: [
      {s:"▰",n:"Black Rectangle"},{s:"▱",n:"White Rectangle"},{s:"◈",n:"Square Target"},{s:"◉",n:"Bulls Eye"},{s:"◎",n:"Double Circle"},{s:"⦿",n:"Target"},{s:"⊛",n:"Asterisk Circle"},{s:"⊕",n:"Plus Circle"},{s:"⊗",n:"Times Circle"},{s:"⊘",n:"Slash Circle"},{s:"⊙",n:"Dot Circle"},{s:"║",n:"Double Vertical"},{s:"═",n:"Double Horizontal"},{s:"╔",n:"Top Left"},{s:"╗",n:"Top Right"},{s:"╚",n:"Bottom Left"},
    ]},
    { category: "Reaction Symbols", symbols: [
      {s:"✅",n:"Check Mark"},{s:"❌",n:"Cross Mark"},{s:"⭐",n:"Star"},{s:"🔥",n:"Fire"},{s:"💯",n:"100"},{s:"👀",n:"Eyes"},{s:"💀",n:"Skull"},{s:"🤝",n:"Handshake"},{s:"❤",n:"Heart"},{s:"😭",n:"Crying"},{s:"💀",n:"Dead"},{s:"🗿",n:"Moai"},{s:"🤡",n:"Clown"},{s:"📌",n:"Pushpin"},{s:"🔔",n:"Bell"},{s:"🎯",n:"Target"},
    ]},
    { category: "Channel Symbols", symbols: [
      {s:"📢",n:"Loudspeaker"},{s:"📣",n:"Megaphone"},{s:"📝",n:"Memo"},{s:"💬",n:"Chat"},{s:"🎮",n:"Controller"},{s:"🎵",n:"Music"},{s:"🖼",n:"Picture"},{s:"📸",n:"Camera"},{s:"🛠",n:"Tools"},{s:"⚙",n:"Gear"},{s:"📊",n:"Chart"},{s:"🏅",n:"Medal"},{s:"🎉",n:"Party"},{s:"🤖",n:"Robot"},{s:"📡",n:"Antenna"},{s:"🔒",n:"Lock"},
    ]},
  ],
  whatsapp: [
    { category: "Message Decorations", symbols: [
      {s:"✨",n:"Sparkles"},{s:"💫",n:"Dizzy"},{s:"⭐",n:"Star"},{s:"🌟",n:"Glowing Star"},{s:"✅",n:"Check"},{s:"❌",n:"Cross"},{s:"➡",n:"Arrow"},{s:"⬅",n:"Left Arrow"},{s:"⬆",n:"Up Arrow"},{s:"⬇",n:"Down Arrow"},{s:"🔴",n:"Red Circle"},{s:"🟢",n:"Green Circle"},{s:"🟡",n:"Yellow Circle"},{s:"🔵",n:"Blue Circle"},{s:"⚫",n:"Black Circle"},{s:"⚪",n:"White Circle"},
    ]},
    { category: "Status Symbols", symbols: [
      {s:"💪",n:"Muscle"},{s:"🙏",n:"Pray"},{s:"👍",n:"Thumbs Up"},{s:"👎",n:"Thumbs Down"},{s:"🤞",n:"Crossed Fingers"},{s:"✌",n:"Victory"},{s:"🤙",n:"Call Me"},{s:"👏",n:"Clap"},{s:"🫶",n:"Heart Hands"},{s:"💯",n:"100"},{s:"🔥",n:"Fire"},{s:"❤",n:"Heart"},{s:"💔",n:"Broken Heart"},{s:"😍",n:"Heart Eyes"},{s:"🥰",n:"Smiling Hearts"},{s:"😊",n:"Smiling"},
    ]},
    { category: "List & Points", symbols: [
      {s:"•",n:"Bullet"},{s:"▪",n:"Small Square"},{s:"▸",n:"Triangle"},{s:"→",n:"Arrow"},{s:"✓",n:"Check"},{s:"✗",n:"Cross"},{s:"①",n:"Circled 1"},{s:"②",n:"Circled 2"},{s:"③",n:"Circled 3"},{s:"④",n:"Circled 4"},{s:"⑤",n:"Circled 5"},{s:"⑥",n:"Circled 6"},{s:"⑦",n:"Circled 7"},{s:"⑧",n:"Circled 8"},{s:"⑨",n:"Circled 9"},{s:"⑩",n:"Circled 10"},
    ]},
  ],
  twitter: [
    { category: "Bio Symbols", symbols: [
      {s:"★",n:"Star"},{s:"•",n:"Bullet"},{s:"·",n:"Middle Dot"},{s:"│",n:"Vertical"},{s:"▪",n:"Square"},{s:"→",n:"Arrow"},{s:"✦",n:"Four Star"},{s:"✧",n:"White Star"},{s:"⋆",n:"Tiny Star"},{s:"∘",n:"Ring"},{s:"◦",n:"Bullet"},{s:"☾",n:"Crescent"},{s:"⚡",n:"Lightning"},{s:"✿",n:"Flower"},{s:"❀",n:"Florette"},{s:"♡",n:"Heart"},
    ]},
    { category: "Tweet Accents", symbols: [
      {s:"🧵",n:"Thread"},{s:"👇",n:"Point Down"},{s:"👆",n:"Point Up"},{s:"🔁",n:"Retweet"},{s:"❤",n:"Like"},{s:"💬",n:"Reply"},{s:"🔗",n:"Link"},{s:"📌",n:"Pin"},{s:"⚠",n:"Warning"},{s:"💡",n:"Idea"},{s:"📣",n:"Announce"},{s:"🎯",n:"Target"},{s:"🚀",n:"Rocket"},{s:"💎",n:"Diamond"},{s:"🔥",n:"Fire"},{s:"✅",n:"Check"},
    ]},
  ],
  tiktok: [
    { category: "Bio Decorations", symbols: [
      {s:"✨",n:"Sparkles"},{s:"💫",n:"Dizzy"},{s:"🔥",n:"Fire"},{s:"🎵",n:"Music"},{s:"🎶",n:"Notes"},{s:"💃",n:"Dancer"},{s:"🕺",n:"Man Dance"},{s:"👑",n:"Crown"},{s:"💎",n:"Diamond"},{s:"⭐",n:"Star"},{s:"🌟",n:"Glow Star"},{s:"💯",n:"100"},{s:"🤍",n:"White Heart"},{s:"🖤",n:"Black Heart"},{s:"💜",n:"Purple Heart"},{s:"🌙",n:"Moon"},
    ]},
    { category: "Trending Symbols", symbols: [
      {s:"꧁",n:"Ornament"},{s:"꧂",n:"Ornament"},{s:"彡",n:"Japanese"},{s:"ꔪ",n:"Vai"},{s:"ꗃ",n:"Vai"},{s:"𝓛",n:"Script L"},{s:"𝓞",n:"Script O"},{s:"𝓥",n:"Script V"},{s:"𝓔",n:"Script E"},{s:"♡",n:"Heart"},{s:"ᵕ̈",n:"Cute Eyes"},{s:"˘◡˘",n:"Happy"},{s:"₍ᐢ",n:"Bear"},{s:"ᵕ꒳ᵕ",n:"Bunny"},{s:"(ˆ ﻌ ˆ)♡",n:"Cat"},{s:"ʕ•ᴥ•ʔ",n:"Bear Face"},
    ]},
  ],
  facebook: [
    { category: "Post Decorations", symbols: [
      {s:"✅",n:"Check"},{s:"❌",n:"Cross"},{s:"➡",n:"Arrow"},{s:"⭐",n:"Star"},{s:"🔥",n:"Fire"},{s:"💯",n:"100"},{s:"👍",n:"Like"},{s:"❤",n:"Heart"},{s:"😊",n:"Smile"},{s:"🎉",n:"Party"},{s:"📢",n:"Announce"},{s:"💡",n:"Idea"},{s:"⚠",n:"Warning"},{s:"🔴",n:"Red"},{s:"🟢",n:"Green"},{s:"🔵",n:"Blue"},
    ]},
    { category: "Profile Symbols", symbols: [
      {s:"★",n:"Star"},{s:"•",n:"Bullet"},{s:"→",n:"Arrow"},{s:"♡",n:"Heart"},{s:"✿",n:"Flower"},{s:"♻",n:"Recycle"},{s:"☮",n:"Peace"},{s:"☯",n:"Yin Yang"},{s:"∞",n:"Infinity"},{s:"☀",n:"Sun"},{s:"☁",n:"Cloud"},{s:"☂",n:"Umbrella"},{s:"⚡",n:"Lightning"},{s:"❄",n:"Snowflake"},{s:"🌈",n:"Rainbow"},{s:"🕊",n:"Dove"},
    ]},
  ],
};

interface Props {
  platform: string;
  platformData: { name: string; description: string; emoji: string; color: string };
}

const allPlatforms = ["instagram","discord","whatsapp","twitter","tiktok","facebook"];

export default function PlatformPageClient({ platform, platformData }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const data = collections[platform] || collections.instagram;

  const handleCopy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = s; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(s);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = s;
      toastMsg.textContent = "Copied " + n;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)" }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
        <span>›</span>
        <span style={{ color: "var(--text2)" }}>Symbols for {platformData.name}</span>
      </div>

      <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{platformData.emoji}</div>
      <div className="section-label">Platform collection</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Symbols for {platformData.name}
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.6, maxWidth: 600 }}>
        {platformData.description} Click any symbol to copy it instantly.
      </p>

      {/* Other platforms nav */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
        {allPlatforms.filter(p => p !== platform).map(p => (
          <Link key={p} href={`/symbols-for/${p}`} className="cat-pill" style={{ fontSize: 12, textTransform: "capitalize" }}>
            {p === "twitter" ? "Twitter / X" : p.charAt(0).toUpperCase() + p.slice(1)}
          </Link>
        ))}
      </div>

      {/* Symbol collections */}
      {data.map(section => (
        <section key={section.category} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{section.category}</h2>
          <div className="symbols-grid">
            {section.symbols.map(({ s, n }) => (
              <div
                key={s + n}
                className={"symbol-card" + (copied === s ? " copied" : "")}
                onClick={() => handleCopy(s, n)}
                title={"Copy " + n}
              >
                <span className="symbol-char">{s}</span>
                <span className="symbol-name">{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Related links */}
      <section style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>More tools</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/fancy-text" className="cat-pill">✦ Fancy Text Generator</Link>
          <Link href="/text-repeater" className="cat-pill">🔁 Text Repeater</Link>
          <Link href="/symbols/arrows" className="cat-pill">→ Arrow Symbols</Link>
          <Link href="/symbols/shapes" className="cat-pill">★ Shapes & Stars</Link>
          <Link href="/kaomoji" className="cat-pill">(◕‿◕) Kaomoji</Link>
        </div>
      </section>
    </div>
  );
}
