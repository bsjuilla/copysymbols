"use client";

import { useCallback, useState } from "react";

/**
 * Copies text to clipboard and shows the global toast (#global-toast,
 * #toast-symbol, #toast-message — rendered by the shared CopyToast
 * component). Returns a stable callback + a transient `copied` flag for
 * button UI feedback ("✓ Copied" state, accent border, etc.).
 *
 * Behaviour matches the per-tool implementations this hook replaces:
 *  - Uses navigator.clipboard.writeText with a textarea fallback for
 *    legacy / non-secure-context browsers.
 *  - Toast stays visible for 1800ms (the established UX duration across
 *    every tool client), then both the .show class and the `copied`
 *    flag clear together.
 *  - Custom toast symbol per tool (default "✓") and a custom label
 *    (default "Copied!").
 */
export interface CopyOptions {
  /** Short glyph shown in the toast (e.g. "·", "01", "z̴"). Defaults to "✓". */
  symbol?: string;
  /** Toast message body (e.g. "Copied morse code"). Defaults to "Copied!". */
  label?: string;
}

export function useCopyToast(): {
  copy: (text: string, opts?: CopyOptions) => Promise<void>;
  copied: boolean;
} {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string, opts: CopyOptions = {}) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const sym = document.getElementById("toast-symbol");
    const msg = document.getElementById("toast-message");
    if (toast && sym && msg) {
      sym.textContent = opts.symbol ?? "✓";
      msg.textContent = opts.label ?? "Copied!";
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setCopied(false);
      }, 1800);
    } else {
      // Toast DOM not mounted — still clear the local flag.
      setTimeout(() => setCopied(false), 1800);
    }
  }, []);

  return { copy, copied };
}
