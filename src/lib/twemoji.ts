// Twemoji image URLs (jdecked fork — the maintained successor to twitter/twemoji,
// covering Unicode 17.0). We render emoji as SVG images on a few pages so they
// display on EVERY OS — most importantly Windows, whose Segoe UI Emoji font ships
// no country-flag glyphs at all and lags new Unicode releases. The flag/emoji
// CHARACTER you copy is always the real Unicode glyph; these images are
// display-only previews.
//
// Pinned to an explicit version (never @latest) so the asset set is reproducible
// and immutably cacheable on the CDN.

const TWEMOJI_VERSION = "17.0.2";
const TWEMOJI_BASE = `https://cdn.jsdelivr.net/gh/jdecked/twemoji@${TWEMOJI_VERSION}/assets/svg`;

const ZWJ = "‍";
const VARIATION_SELECTOR_16 = /️/g;

/**
 * Twemoji's asset filenames are the emoji's code points in lowercase hex joined
 * by "-", with one quirk: the U+FE0F variation selector is stripped UNLESS the
 * sequence contains a U+200D zero-width joiner. This mirrors twemoji.js's own
 * `grabTheRightIcon` logic so we always hit a real file.
 */
export function twemojiCodePoints(glyph: string): string {
  const src = glyph.indexOf(ZWJ) < 0 ? glyph.replace(VARIATION_SELECTOR_16, "") : glyph;
  return Array.from(src)
    .map(ch => ch.codePointAt(0)!.toString(16))
    .join("-");
}

/** Full CDN URL of the Twemoji SVG for a given emoji glyph. */
export function twemojiSvgUrl(glyph: string): string {
  return `${TWEMOJI_BASE}/${twemojiCodePoints(glyph)}.svg`;
}
