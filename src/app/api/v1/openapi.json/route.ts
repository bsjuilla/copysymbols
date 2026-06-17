import { STYLES } from "@/lib/fancy-text-styles";
import { allKaomoji } from "@/data/all-kaomoji";
import { emoji } from "@/data/emoji";
import { apiJson, preflight } from "@/lib/api/respond";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

// Machine-readable OpenAPI 3.1 spec — import this URL into RapidAPI to publish
// the listing, or into Postman/Swagger. Counts are live (auto-updated per deploy).
export async function GET() {
  const kaomojiCount = allKaomoji.filter((k) => !k.isDuplicate).length;

  const textParam = { name: "text", in: "query", required: true, schema: { type: "string", maxLength: 200 } };
  const limit = (def: number, max: number) => ({ name: "limit", in: "query", schema: { type: "integer", default: def, maximum: max } });
  const q = { name: "q", in: "query", schema: { type: "string" }, description: "Free-text search over name + keywords" };

  const spec = {
    openapi: "3.1.0",
    info: {
      title: "CopyChars API",
      version: "1.0.0",
      description:
        `Unicode toolbox: ${STYLES.length} fancy-text fonts, a username generator, ${kaomojiCount} kaomoji, ` +
        `${emoji.length} emoji with official metadata, symbols, and a render-safety checker. ` +
        "Plain JSON, no Unicode tables to maintain yourself.",
      contact: { name: "CopyChars", url: "https://www.copychars.com/developers" },
    },
    servers: [{ url: "https://www.copychars.com/api/v1" }],
    paths: {
      "/fancy-text": {
        get: {
          summary: "Convert text to fancy Unicode fonts",
          parameters: [textParam, { name: "style", in: "query", schema: { type: "string", default: "all" }, description: "A style slug, or 'all'" }],
          responses: { "200": { description: "Styled output" } },
        },
      },
      "/username": {
        get: {
          summary: "Generate fancy usernames",
          parameters: [
            { name: "name", in: "query", required: true, schema: { type: "string", maxLength: 40 } },
            { name: "vibe", in: "query", schema: { type: "string", default: "all" } },
            { name: "count", in: "query", schema: { type: "integer", default: 24, maximum: 50 } },
          ],
          responses: { "200": { description: "Generated usernames" } },
        },
      },
      "/kaomoji": {
        get: {
          summary: "Japanese text emoticons by mood",
          parameters: [{ name: "mood", in: "query", schema: { type: "string" } }, q, limit(30, 100), { name: "random", in: "query", schema: { type: "boolean" } }],
          responses: { "200": { description: "Kaomoji faces" } },
        },
      },
      "/emoji": {
        get: {
          summary: "Search emoji with Unicode metadata",
          parameters: [q, { name: "category", in: "query", schema: { type: "string" } }, limit(30, 100)],
          responses: { "200": { description: "Emoji with version, year, keywords, codepoints" } },
        },
      },
      "/symbols": {
        get: {
          summary: "Special characters by category",
          parameters: [{ name: "category", in: "query", schema: { type: "string" } }, q, limit(50, 200)],
          responses: { "200": { description: "Symbols with Unicode/HTML/CSS codes" } },
        },
      },
      "/render-check": {
        get: {
          summary: "Will this text render? Per-platform verdict",
          parameters: [textParam],
          responses: { "200": { description: "Per-character render-safety verdict (iOS/Android/Windows/Discord)" } },
        },
      },
      "/meta": { get: { summary: "Live dataset counts + valid filter values", responses: { "200": { description: "Catalogue" } } } },
    },
  };

  return apiJson(spec);
}
