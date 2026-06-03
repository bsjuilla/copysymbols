"use client";

import { useState } from "react";
import { toRoman, fromRoman, dateToRoman, ROMAN_MIN, ROMAN_MAX } from "@/lib/roman";

function flashToast(text: string) {
  const toast = document.getElementById("global-toast");
  const sym = document.getElementById("toast-symbol");
  const msg = document.getElementById("toast-message");
  if (toast && sym && msg) {
    sym.textContent = text.length <= 6 ? text : "✓";
    msg.textContent = `Copied ${text}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1500);
  }
}

function copy(text: string) {
  if (!text) return;
  try {
    navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  flashToast(text);
}

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: "22px 24px",
};
const labelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontFamily: "var(--font-dm-mono), monospace",
  color: "var(--text3)",
  marginBottom: 8,
  display: "block",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg3)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 16,
  color: "var(--text)",
  fontFamily: "inherit",
};
const resultRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 14,
  minHeight: 44,
};

function CopyResult({ value, invalid }: { value: string; invalid?: boolean }) {
  if (invalid) {
    return <span style={{ fontSize: 14, color: "var(--text3)" }}>Enter a valid value…</span>;
  }
  return (
    <>
      <span style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--text)", letterSpacing: "0.04em", wordBreak: "break-all" }}>
        {value || "—"}
      </span>
      {value && (
        <button
          type="button"
          onClick={() => copy(value)}
          style={{ marginLeft: "auto", background: "var(--accent)", color: "#0a0a0f", border: 0, borderRadius: 100, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
        >
          Copy
        </button>
      )}
    </>
  );
}

export default function RomanConverter() {
  const [num, setNum] = useState("2026");
  const [roman, setRoman] = useState("MMXXVI");
  const [date, setDate] = useState("");

  const numParsed = num.trim() === "" ? null : Number(num);
  const numValid = numParsed !== null && Number.isInteger(numParsed) && numParsed >= ROMAN_MIN && numParsed <= ROMAN_MAX;
  const numResult = numValid ? toRoman(numParsed!) : "";

  const romanResult = fromRoman(roman);

  let dateResult = "";
  if (date) {
    const [y, m, d] = date.split("-").map(Number);
    if (y && m && d) dateResult = dateToRoman(y, m, d);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
      {/* Number → Roman */}
      <div style={cardStyle}>
        <label htmlFor="rc-num" style={labelStyle}>Number → Roman</label>
        <input
          id="rc-num"
          type="number"
          inputMode="numeric"
          min={ROMAN_MIN}
          max={ROMAN_MAX}
          value={num}
          onChange={e => setNum(e.target.value)}
          placeholder={`${ROMAN_MIN}–${ROMAN_MAX}`}
          style={inputStyle}
        />
        <div style={resultRow}>
          <CopyResult value={numResult} invalid={num.trim() !== "" && !numValid} />
        </div>
        {num.trim() !== "" && !numValid && (
          <p style={{ fontSize: 12, color: "var(--text3)", margin: "4px 0 0" }}>Enter a whole number from {ROMAN_MIN} to {ROMAN_MAX}.</p>
        )}
      </div>

      {/* Roman → Number */}
      <div style={cardStyle}>
        <label htmlFor="rc-roman" style={labelStyle}>Roman → Number</label>
        <input
          id="rc-roman"
          type="text"
          value={roman}
          onChange={e => setRoman(e.target.value)}
          placeholder="e.g. MMXXVI"
          autoCapitalize="characters"
          spellCheck={false}
          style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: "0.08em" }}
        />
        <div style={resultRow}>
          <CopyResult value={romanResult !== null ? String(romanResult) : ""} invalid={roman.trim() !== "" && romanResult === null} />
        </div>
        {roman.trim() !== "" && romanResult === null && (
          <p style={{ fontSize: 12, color: "var(--text3)", margin: "4px 0 0" }}>Not a valid Roman numeral (1–{ROMAN_MAX}).</p>
        )}
      </div>

      {/* Date → Roman */}
      <div style={cardStyle}>
        <label htmlFor="rc-date" style={labelStyle}>Date → Roman</label>
        <input
          id="rc-date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={inputStyle}
        />
        <div style={resultRow}>
          <CopyResult value={dateResult} invalid={date !== "" && !dateResult} />
        </div>
        <p style={{ fontSize: 12, color: "var(--text3)", margin: "4px 0 0" }}>Day · Month · Year — popular for tattoos &amp; anniversaries.</p>
      </div>
    </div>
  );
}
