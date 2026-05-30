"use client";

// Community-combos submission form (UGC).
//
// Security model: this writes to `combo_submissions` via the public anon key.
// Row-Level Security is the real gate — anon may INSERT only status='pending'
// (the column defaults to 'pending') and may never self-approve. We therefore:
//   • never chain .select() after insert (return=minimal); selecting a freshly
//     inserted pending row trips the SELECT-only-approved RLS policy.
//   • render every value as plain text — no dangerouslySetInnerHTML, ever.
//   • trap bots with a hidden "website" honeypot field.
//
// No useEffect: all state is driven by user events (avoids the
// react-hooks/set-state-in-effect lint rule).

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

const MAX_COMBO = 200;
const MAX_META = 40;

type Status = "idle" | "submitting" | "success" | "error";

const labelStyle = {
  display: "block",
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  fontFamily: "DM Mono, monospace",
  color: "var(--text3)",
  marginBottom: 8,
};

const fieldStyle = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  color: "var(--text)",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function ComboSubmitForm() {
  const [combo, setCombo] = useState("");
  const [category, setCategory] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never fill this
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function clearFields() {
    setCombo("");
    setCategory("");
    setSubmitter("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmedCombo = combo.trim();
    if (trimmedCombo.length < 1 || trimmedCombo.length > MAX_COMBO) {
      setStatus("error");
      setMessage(`Please enter a combo between 1 and ${MAX_COMBO} characters.`);
      return;
    }

    // Honeypot tripped → silently pretend success, never touch the database.
    if (website.trim() !== "") {
      clearFields();
      setStatus("success");
      setMessage("Thanks! Your combo is pending review and will appear once approved.");
      return;
    }

    const trimmedCategory = category.trim().slice(0, MAX_META);
    const trimmedSubmitter = submitter.trim().slice(0, MAX_META);

    const sb = getSupabase();
    if (!sb) {
      setStatus("error");
      setMessage("Submissions are not available right now.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    // No .select() — return=minimal keeps us within the INSERT-only RLS policy.
    const { error } = await sb.from("combo_submissions").insert({
      combo: trimmedCombo,
      category: trimmedCategory || null,
      submitter: trimmedSubmitter || null,
    });

    if (error) {
      setStatus("error");
      setMessage("Could not submit — please try again.");
      return;
    }

    clearFields();
    setStatus("success");
    setMessage("Thanks! Your combo is pending review and will appear once approved.");
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "24px 24px 28px",
        display: "grid",
        gap: 18,
      }}
    >
      <div>
        <label htmlFor="combo-field" style={labelStyle}>
          Combo <span style={{ color: "var(--text3)" }}>(required)</span>
        </label>
        <textarea
          id="combo-field"
          value={combo}
          onChange={(e) => setCombo(e.target.value)}
          maxLength={MAX_COMBO}
          rows={3}
          required
          placeholder="🌙✨ ⋆｡˚ paste your combo here ˚｡⋆ ✨🌙"
          style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6 }}
        />
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6, textAlign: "right" }}>
          {combo.length}/{MAX_COMBO}
        </div>
      </div>

      <div>
        <label htmlFor="category-field" style={labelStyle}>
          Category <span style={{ color: "var(--text3)" }}>(optional)</span>
        </label>
        <input
          id="category-field"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          maxLength={MAX_META}
          placeholder="e.g. aesthetic, cozy, witchy"
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="submitter-field" style={labelStyle}>
          Your name / handle <span style={{ color: "var(--text3)" }}>(optional)</span>
        </label>
        <input
          id="submitter-field"
          type="text"
          value={submitter}
          onChange={(e) => setSubmitter(e.target.value)}
          maxLength={MAX_META}
          placeholder="@yourhandle"
          style={fieldStyle}
        />
      </div>

      {/* Honeypot: hidden from humans, irresistible to bots. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: submitting ? "var(--bg3)" : "var(--accent)",
            color: submitting ? "var(--text3)" : "var(--bg)",
            border: "none",
            borderRadius: 100,
            padding: "12px 28px",
            fontSize: 15,
            fontWeight: 600,
            cursor: submitting ? "default" : "pointer",
            transition: "opacity 0.15s",
          }}
        >
          {submitting ? "Submitting…" : "Submit combo"}
        </button>

        {message && (
          <p
            role="status"
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.5,
              color: status === "error" ? "var(--text2)" : "var(--accent)",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
