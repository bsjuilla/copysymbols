"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/symbols", label: "Symbols" },
  { href: "/emoji", label: "Emoji" },
  { href: "/kaomoji", label: "Kaomoji" },
  { href: "/text-art", label: "Text Art" },
];

export default function NavClient() {
  const path = usePathname();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {links.map(l => (
        <Link
          key={l.href}
          href={l.href}
          className={`nav-link ${path.startsWith(l.href) ? "active" : ""}`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
