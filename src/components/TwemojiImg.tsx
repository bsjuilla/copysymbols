import type { CSSProperties } from "react";
import { twemojiSvgUrl } from "@/lib/twemoji";

/**
 * Display-only emoji image (Twemoji SVG). Used so emoji render on EVERY OS —
 * notably Windows, whose font has no flag glyphs and lags new Unicode releases.
 *
 * This is NOT a copy control: the surrounding card/link/button is responsible
 * for copying, and it always copies the real Unicode glyph (never this image).
 *
 * `alt={glyph}` is the Twemoji convention AND a zero-JS graceful fallback: if the
 * CDN image ever fails to load, the browser renders the alt text, which is the
 * native emoji character — i.e. it degrades to exactly today's behaviour.
 */
export default function TwemojiImg({
  glyph,
  size = 29,
  style,
}: {
  glyph: string;
  /** Rendered width/height. Number = px; string = used verbatim (e.g. a clamp()). */
  size?: number | string;
  style?: CSSProperties;
}) {
  const dim = typeof size === "number" ? `${size}px` : size;
  return (
    // plain <img> is correct for tiny third-party CDN SVG icons; next/image would
    // force the optimizer pipeline + remotePatterns config for no benefit here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={twemojiSvgUrl(glyph)}
      alt={glyph}
      width={typeof size === "number" ? size : undefined}
      height={typeof size === "number" ? size : undefined}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{ width: dim, height: dim, objectFit: "contain", display: "inline-block", verticalAlign: "middle", ...style }}
    />
  );
}
