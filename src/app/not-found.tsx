import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "120px 24px" }}>
      <div style={{ fontSize: "4rem", marginBottom: 16 }}>∅</div>
      <h1 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>Page not found</h1>
      <p style={{ color: "var(--text2)", marginBottom: 32 }}>The symbol or page you're looking for doesn't exist.</p>
      <Link href="/" style={{ background: "var(--accent)", color: "var(--bg)", padding: "10px 24px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
        Back to home
      </Link>
    </div>
  );
}
