import Link from "next/link";
import type { Metadata } from "next";
import { canonical } from "@/lib/canonical";
import { relatedForEmoji } from "@/lib/related";
import { getSupabase, isSupabaseConfigured, type ComboRow } from "@/lib/supabase";
import CopyToast from "@/components/CopyToast";
import CopySymbolGrid from "@/components/CopySymbolGrid";
import RelatedLinks from "@/components/RelatedLinks";
import ComboSubmitForm from "./ComboSubmitForm";

// ISR: approved combos are user-generated, so refresh the prerendered page at
// most once a minute rather than only at build time.
export const revalidate = 60;

const title = "Community Combos — Submit & Copy User Emoji Combos";
const description =
  "Browse and submit copy-paste emoji & symbol combos shared by the community. Tap any approved combo to copy it instantly.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "emoji combos",
    "community combos",
    "submit emoji combo",
    "aesthetic combos copy paste",
  ],
  openGraph: { title, description, url: "https://www.copychars.com/community-combos", type: "website", siteName: "CopyChars" },
  twitter: { card: "summary", title, description },
  ...canonical("/community-combos"),
};

const faqs = [
  {
    q: "How do I submit a combo?",
    a: "Type or paste your emoji or symbol combo into the form below, optionally add a category and your name or handle, then tap Submit combo. Submissions are free and no account is required.",
  },
  {
    q: "When will my combo appear?",
    a: "Your combo appears here after it's reviewed and approved. Every submission starts as pending and a moderator approves it before it becomes public, usually within a day or two.",
  },
  {
    q: "What combos get approved?",
    a: "Original, tasteful, family-friendly combos — no spam or offensive content. Duplicates and anything unsafe for a general audience are declined.",
  },
];

// Escaped (JSX-safe) FAQ answers for the visible accordion, paired 1:1 with the
// `faqs` array above so the FAQPage schema and on-page text never diverge.
const faqAnswersJsx: string[] = [
  "Type or paste your emoji or symbol combo into the form below, optionally add a category and your name or handle, then tap Submit combo. Submissions are free and no account is required.",
  "Your combo appears here after it’s reviewed and approved. Every submission starts as pending and a moderator approves it before it becomes public, usually within a day or two.",
  "Original, tasteful, family-friendly combos — no spam or offensive content. Duplicates and anything unsafe for a general audience are declined.",
];

const baseUrl = "https://www.copychars.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Community Combos", item: `${baseUrl}/community-combos` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const h2Style = { fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 } as const;

async function getApprovedCombos(): Promise<ComboRow[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("combo_submissions")
      .select("combo,category,submitter")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error || !data) return [];
    return data as ComboRow[];
  } catch {
    // Build must stay green even if Supabase is unreachable at build time.
    return [];
  }
}

export default async function CommunityCombosPage() {
  const approvedCombos = await getApprovedCombos();

  return (
    <>
      <CopyToast />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32, fontSize: 13, color: "var(--text3)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--text2)" }}>Community Combos</span>
        </div>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: 12 }}>🫶✨</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 8 }}>
            Community Combos
          </h1>
        </div>

        {/* ── LEAD (answer-first) ─────────────────────────────────────── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 28px", marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, margin: 0 }}>
            Browse emoji and symbol combos submitted by the community, or share your own.
            Approved combos appear here, and you can tap any of them to copy instantly.
          </p>
        </div>

        {/* ── COMMUNITY COMBOS ────────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="font-display" style={h2Style}>Community combos</h2>
          {approvedCombos.length > 0 ? (
            <CopySymbolGrid
              items={approvedCombos.map((c) => ({ symbol: c.combo, name: c.category || "combo" }))}
              columns="repeat(auto-fill, minmax(150px, 1fr))"
            />
          ) : (
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>
              Be the first to submit a combo!
            </p>
          )}
        </section>

        {/* ── SUBMIT ──────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="font-display" style={h2Style}>Submit your combo</h2>
          {isSupabaseConfigured ? (
            <ComboSubmitForm />
          ) : (
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>
              Submissions opening soon — check back shortly.
            </p>
          )}
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Frequently asked questions</h2>
          {faqs.map(({ q }, i) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>{faqAnswersJsx[i]}</p>
            </div>
          ))}
        </section>

        <RelatedLinks links={relatedForEmoji()} heading="Related — emoji combos, symbols & tools" />

      </div>
    </>
  );
}
