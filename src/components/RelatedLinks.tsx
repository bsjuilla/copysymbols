// Presentational server component for the cross-silo related-links cloud (P0).
//
// Renders a deduped set of descriptive-anchor pills produced by
// src/lib/related.ts. Pure + self-contained: all styling is inline so it can
// be dropped into the symbol / emoji / kaomoji detail templates without
// depending on any global CSS class. No "use client", no hooks, no event
// handlers — this is a server component.
import Link from "next/link";
import type { RelatedLink } from "@/lib/related";

interface Props {
  links: RelatedLink[];
  heading?: string;
}

export default function RelatedLinks({ links, heading = "Related pages" }: Props) {
  if (links.length === 0) return null;
  return (
    <section style={{ borderTop: "1px solid var(--border)", paddingTop: 32, marginTop: 32 }}>
      <h2 className="font-display" style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 16 }}>
        {heading}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: "inline-block",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              padding: "6px 14px",
              fontSize: 13,
              color: "var(--text2)",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
