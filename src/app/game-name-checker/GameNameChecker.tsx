"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GAME_NAME_RULES, getGameRule, invisibleGlyph } from "@/data/game-name-rules";
import { validateName, type NameVerdict } from "@/lib/game-name-validator";
import { useCopyToast } from "@/lib/use-copy-toast";

const VERDICT_STYLE: Record<NameVerdict, { color: string; label: string }> = {
  ok: { color: "#3fb950", label: "Looks good" },
  warn: { color: "#d29922", label: "Will work, with changes" },
  reject: { color: "#f85149", label: "Likely rejected" },
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: "var(--text3)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export default function GameNameChecker({ lockedGame }: { lockedGame?: string }) {
  const [slug, setSlug] = useState(lockedGame ?? GAME_NAME_RULES[0].slug);
  const [name, setName] = useState("");
  const { copy } = useCopyToast();

  const rule = useMemo(() => getGameRule(slug)!, [slug]);
  const check = useMemo(() => validateName(rule, name), [rule, name]);

  const limitColor = check.tooLong ? "#f85149" : check.charCount > rule.maxLen - 3 ? "#d29922" : "var(--text3)";
  const v = VERDICT_STYLE[check.verdict];

  return (
    <div style={{ marginBottom: 8 }}>
      {/* Game selector — hidden when the page is locked to one game. */}
      {!lockedGame && (
        <>
          <div style={{ ...labelStyle, marginBottom: 8 }}>Choose your game</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {GAME_NAME_RULES.map((g) => {
              const active = g.slug === slug;
              return (
                <button
                  key={g.slug}
                  type="button"
                  onClick={() => setSlug(g.slug)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 100, cursor: "pointer",
                    fontSize: 13.5, fontWeight: 600,
                    color: active ? "var(--bg)" : "var(--text2)",
                    background: active ? "var(--accent)" : "var(--surface)",
                    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  }}
                >
                  <span aria-hidden>{g.icon}</span>
                  {g.name}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Name input */}
      <label htmlFor="game-name" style={{ ...labelStyle, display: "block", marginBottom: 6 }}>
        Type the name you want ({rule.field})
      </label>
      <input
        id="game-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. ꧁༒Nova༒꧂"
        style={{
          width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
          padding: "14px 18px", color: "var(--text)", fontSize: 20, fontFamily: "inherit", outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />

      {/* Char count + verdict */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "12px 2px 20px", flexWrap: "wrap" }}>
        <span style={{ fontSize: 14, color: limitColor, fontWeight: 600 }}>
          {check.charCount} / {rule.maxLen} characters{rule.minLen ? ` (min ${rule.minLen})` : ""}
        </span>
        {name.trim().length > 0 && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: v.color, background: `${v.color}1a`, border: `1px solid ${v.color}40`, padding: "5px 12px", borderRadius: 100 }}>
            <span aria-hidden>{check.verdict === "ok" ? "✓" : check.verdict === "warn" ? "!" : "✕"}</span>
            {v.label}
          </span>
        )}
      </div>

      {/* Issues */}
      {name.trim().length > 0 && check.issues.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {check.issues.map((iss, i) => {
            const c = iss.level === "reject" ? "#f85149" : "#d29922";
            return (
              <div key={i} style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.55, background: `${c}12`, border: `1px solid ${c}33`, borderRadius: 10, padding: "10px 13px" }}>
                <span aria-hidden style={{ color: c, fontWeight: 700, marginRight: 6 }}>{iss.level === "reject" ? "✕" : "!"}</span>
                {iss.message}
              </div>
            );
          })}
        </div>
      )}

      {/* Invisible name */}
      {rule.invisible && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px", marginBottom: 24 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Want an invisible / blank {rule.name} name?</div>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, margin: "0 0 12px" }}>
            Copy this invisible character into the name field. If it gets rejected after a game update, try the fallback.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button
              type="button"
              onClick={() => copy(invisibleGlyph(rule.invisible!.primaryCp), { symbol: "•", label: "Copied invisible name" })}
              style={invBtn}
            >
              <span style={{ fontWeight: 700 }}>Copy invisible name</span>
              <span style={{ fontSize: 11, color: "var(--text3)" }}>{rule.invisible.primaryName}</span>
            </button>
            {rule.invisible.fallbackCp !== undefined && (
              <button
                type="button"
                onClick={() => copy(invisibleGlyph(rule.invisible!.fallbackCp!), { symbol: "•", label: "Copied fallback" })}
                style={{ ...invBtn, background: "var(--bg)" }}
              >
                <span style={{ fontWeight: 700 }}>Fallback</span>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>{rule.invisible.fallbackName}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Rules box */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>
            {rule.icon} {rule.name} name rules
          </h2>
          <span style={{ fontSize: 11.5, color: "var(--text3)" }}>verified {rule.verifiedAs}</span>
        </div>
        <ul style={{ margin: "0 0 10px", paddingLeft: 20, color: "var(--text2)", fontSize: 14, lineHeight: 1.75 }}>
          {rule.notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
        <div style={{ fontSize: 13, color: "var(--text3)" }}>Rename cost: {rule.renameCost}.</div>
      </div>

      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, marginTop: 16 }}>
        These rules change with game updates, so treat this as a guide, not a guarantee — and check that your symbols actually show up with the{" "}
        <Link href="/render-test" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Render Test</Link>{" "}
        before you spend a rename. Grab decorative symbols from{" "}
        <Link href="/gaming-symbols" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Gaming Symbols</Link>.
      </p>
    </div>
  );
}

const invBtn: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: 3, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
  background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", textAlign: "left",
};
