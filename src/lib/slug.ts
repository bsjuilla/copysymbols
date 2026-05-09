// Single source of truth for url-safe slug generation across emoji, kaomoji,
// symbols, and the audit/cleanup scripts. Lowercase, alphanumerics + hyphens
// only, no leading/trailing hyphens.
export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
