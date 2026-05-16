"use client";
import { useState, useMemo, useRef, useCallback } from "react";
import { useCopyToast } from "@/lib/use-copy-toast";

// International Morse code (ITU-R M.1677-1).
const MORSE: Record<string, string> = {
  "A":".-","B":"-...","C":"-.-.","D":"-..","E":".","F":"..-.","G":"--.","H":"....","I":"..","J":".---","K":"-.-","L":".-..","M":"--","N":"-.","O":"---","P":".--.","Q":"--.-","R":".-.","S":"...","T":"-","U":"..-","V":"...-","W":".--","X":"-..-","Y":"-.--","Z":"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",
  ".":".-.-.-",",":"--..--","?":"..--..","'":".----.","!":"-.-.--","/":"-..-.","(":"-.--.",")":"-.--.-","&":".-...",":":"---...",";":"-.-.-.","=":"-...-","+":".-.-.","-":"-....-","_":"..--.-","\"":".-..-.","$":"...-..-","@":".--.-.",
};
const REVERSE: Record<string, string> = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

function encode(text: string): string {
  return text.toUpperCase().split("").map(c => {
    if (c === " ") return "/";
    return MORSE[c] ?? "";
  }).filter(Boolean).join(" ").replace(/ \/ /g, " / ");
}

function decode(morse: string): string {
  // Words separated by " / " (or "/"), letters separated by " ".
  const trimmed = morse.trim();
  if (!trimmed) return "";
  const words = trimmed.split(/\s*\/\s*/);
  return words.map(word =>
    word.trim().split(/\s+/).map(token => REVERSE[token] ?? (token ? "?" : "")).join("")
  ).join(" ");
}

type Mode = "encode" | "decode";

export default function MorseClient({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(15);
  const [playing, setPlaying] = useState(false);
  const { copy: copyToast, copied } = useCopyToast();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopFlagRef = useRef(false);

  const output = useMemo(
    () => mode === "encode" ? encode(input) : decode(input),
    [input, mode]
  );

  const swap = () => {
    setInput(output);
    setMode(m => m === "encode" ? "decode" : "encode");
  };

  const copy = () => copyToast(output, {
    symbol: "·",
    label: mode === "encode" ? "Copied morse code" : "Copied text",
  });

  // Audio playback at 600 Hz. Dot duration = 1.2 / WPM seconds (PARIS standard).
  const playMorse = useCallback(async () => {
    const morse = mode === "encode" ? output : input;
    if (!morse) return;
    if (typeof window === "undefined") return;

    if (!audioCtxRef.current) {
      const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      audioCtxRef.current = new Ctx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    const dotMs = 1200 / wpm;
    setPlaying(true);
    stopFlagRef.current = false;

    const tone = (durationMs: number) => new Promise<void>(resolve => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 600;
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.005);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationMs / 1000);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
      setTimeout(resolve, durationMs);
    });
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const tokens = morse.split(/(\s+|\/)/).filter(t => t.trim() || t === " " || t === "/");

    for (const token of tokens) {
      if (stopFlagRef.current) break;
      if (token === "/") { await wait(dotMs * 7); continue; }
      if (/^\s+$/.test(token)) { await wait(dotMs * 3); continue; }
      // Letter — play each . / -
      for (let i = 0; i < token.length; i++) {
        if (stopFlagRef.current) break;
        const c = token[i];
        if (c === ".") await tone(dotMs);
        else if (c === "-") await tone(dotMs * 3);
        if (i < token.length - 1) await wait(dotMs); // intra-letter gap
      }
    }
    setPlaying(false);
  }, [mode, output, input, wpm]);

  const stopPlay = () => { stopFlagRef.current = true; setPlaying(false); };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">International Morse code</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Morse Code Translator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Translate text to Morse and back. Adjustable audio playback at 5–30 WPM with 600 Hz tone — the standard amateur-radio pitch.
      </p>

      {/* ── MODE TOGGLE ─────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 4, marginBottom: 16, gap: 4 }}>
        <button
          onClick={() => setMode("encode")}
          style={{ flex: 1, background: mode === "encode" ? "var(--accent)" : "transparent", color: mode === "encode" ? "white" : "var(--text2)", border: "none", borderRadius: 6, padding: "10px 14px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
        >
          Text → Morse
        </button>
        <button
          onClick={() => setMode("decode")}
          style={{ flex: 1, background: mode === "decode" ? "var(--accent)" : "transparent", color: mode === "decode" ? "white" : "var(--text2)", border: "none", borderRadius: 6, padding: "10px 14px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
        >
          Morse → Text
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="morse-input" style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
          {mode === "encode" ? "Plain text" : "Morse code (use spaces between letters, / between words)"}
        </label>
        <textarea
          id="morse-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "encode" ? "hello world" : ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."}
          rows={3}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: mode === "decode" ? "ui-monospace, monospace" : "inherit", resize: "vertical", outline: "none", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <button
          onClick={swap}
          style={{ background: "transparent", color: "var(--text2)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}
          aria-label="Swap input and output"
        >
          ⇅ Swap
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
          {mode === "encode" ? "Morse code" : "Plain text"}
        </label>
        <div
          onClick={copy}
          style={{ background: "var(--surface)", border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "20px 22px", cursor: output ? "pointer" : "default", transition: "all 0.18s", minHeight: 80 }}
        >
          <div style={{ fontSize: "1.2rem", color: "var(--text)", lineHeight: 1.7, wordBreak: "break-word", fontFamily: mode === "encode" ? "ui-monospace, monospace" : "inherit", marginBottom: output ? 12 : 0 }}>
            {output || <span style={{ color: "var(--text3)", fontSize: 14, fontFamily: "inherit" }}>(translation appears here)</span>}
          </div>
          {output && (
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }} onClick={e => e.stopPropagation()}>
              <button onClick={copy} style={{ background: copied ? "var(--accent)" : "var(--bg)", color: copied ? "white" : "var(--text)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
              {playing ? (
                <button onClick={stopPlay} style={{ background: "#ef4444", color: "white", border: "1px solid #ef4444", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  ■ Stop
                </button>
              ) : (
                <button onClick={playMorse} style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  ▶ Play audio
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── WPM SLIDER ─────────────────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 18px", marginBottom: 36, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <label htmlFor="wpm" style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Speed: <span style={{ color: "var(--text)", fontWeight: 600, marginLeft: 4 }}>{wpm} WPM</span>
        </label>
        <input
          id="wpm"
          type="range"
          min={5}
          max={30}
          value={wpm}
          onChange={e => setWpm(Number(e.target.value))}
          style={{ flex: 1, minWidth: 200 }}
        />
      </div>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {faqs.map(f => (
            <div key={f.q}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATED ─────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40 }}>
        <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Related text tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { href: "/binary-translator", label: "01 Binary Translator", desc: "Text ⇄ binary" },
            { href: "/character-counter", label: "# Character Counter", desc: "Live counts" },
            { href: "/fancy-text", label: "✦ Fancy Text", desc: "31 styles" },
            { href: "/upside-down-text", label: "uʍop Upside Down", desc: "Flipped text" },
            { href: "/zalgo-text", label: "z̴ Zalgo Text", desc: "Cursed glitch" },
            { href: "/invisible-character", label: "• Invisible Character", desc: "Blank spaces" },
          ].map(t => (
            <a key={t.href} href={t.href} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", textDecoration: "none", color: "var(--text)", fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{t.desc}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
