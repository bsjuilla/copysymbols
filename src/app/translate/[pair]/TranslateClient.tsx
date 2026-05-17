"use client";
import { useMemo, useState } from "react";
import { translatorById } from "@/lib/translators";
import { useCopyToast } from "@/lib/use-copy-toast";

export function TranslateClient({ translatorId }: { translatorId: string }) {
  const t = translatorById.get(translatorId);
  const [input, setInput] = useState(t?.id === "english-to-pig-latin" ? "hello world" : "hello");
  const output = useMemo(() => t ? t.encode(input) : "", [input, t]);
  const { copy } = useCopyToast();
  if (!t) return null;
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h1 className="font-display" style={{ fontSize: 36, color: "var(--accent)", marginBottom: 8 }}>
        {t.pair.from} to {t.pair.to} Translator
      </h1>
      <p style={{ color: "var(--text2)", marginBottom: 24 }}>{t.description}</p>
      <label style={{ display: "block", marginBottom: 8, color: "var(--text2)", fontSize: 13 }}>{t.pair.from}</label>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{
          width: "100%", padding: 12, marginBottom: 16, background: "var(--bg2)",
          color: "var(--text)", border: "1px solid var(--border)", borderRadius: 8,
          fontFamily: "inherit", fontSize: 16, resize: "vertical",
        }}
      />
      <label style={{ display: "block", marginBottom: 8, color: "var(--text2)", fontSize: 13 }}>{t.pair.to}</label>
      <div
        onClick={() => copy(output, { label: `Copied ${t.pair.to}!` })}
        style={{
          width: "100%", padding: 12, marginBottom: 24, background: "var(--bg3)",
          color: "var(--text)", border: "1px solid var(--border)", borderRadius: 8,
          minHeight: 80, cursor: "pointer", wordBreak: "break-all",
        }}
      >
        {output || <span style={{ color: "var(--text3)" }}>(type above to translate)</span>}
      </div>
      <h2 style={{ fontSize: 20, marginBottom: 16, color: "var(--text)" }}>Common questions</h2>
      <dl>
        {t.faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <dt style={{ fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{f.q}</dt>
            <dd style={{ color: "var(--text2)", margin: 0 }}>{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
