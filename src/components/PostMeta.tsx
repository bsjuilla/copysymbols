import Link from "next/link";

// Visible byline + dates for blog posts (E-E-A-T). The BlogPosting JSON-LD has
// always carried author/datePublished — this surfaces them to human readers
// (and AdSense/quality reviewers). Dates are formatted from the ISO string
// directly (no Date object) so SSG output is timezone-stable.
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function fmt(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[(m - 1 + 12) % 12]} ${d}, ${y}`;
}

export default function PostMeta({ published, modified }: { published: string; modified: string }) {
  const showUpdated = modified.slice(0, 10) !== published.slice(0, 10);
  return (
    <p style={{ fontSize: 13, color: "var(--text3)", margin: "-4px 0 28px", lineHeight: 1.6 }}>
      By the{" "}
      <Link href="/about" style={{ color: "var(--accent)", textDecoration: "none" }}>
        CopyChars team
      </Link>
      {" · "}
      <time dateTime={published.slice(0, 10)}>{fmt(published)}</time>
      {showUpdated && (
        <>
          {" · Updated "}
          <time dateTime={modified.slice(0, 10)}>{fmt(modified)}</time>
        </>
      )}
    </p>
  );
}
