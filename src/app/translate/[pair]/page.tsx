import { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonical } from "@/lib/canonical";
import { translators, translatorById } from "@/lib/translators";
import { TranslateClient } from "./TranslateClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return translators.map(t => ({ pair: t.id }));
}

interface Props { params: Promise<{ pair: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const t = translatorById.get(pair);
  if (!t) return { title: "Translator not found" };
  const title = `${t.pair.from} to ${t.pair.to} Translator — Free Online`;
  const description = t.description;
  return {
    title,
    description,
    ...canonical(`/translate/${t.id}`),
    openGraph: { title, description, url: `https://www.copychars.com/translate/${t.id}`, type: "website" },
  };
}

export default async function TranslatePage({ params }: Props) {
  const { pair } = await params;
  const t = translatorById.get(pair);
  if (!t) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.copychars.com" },
          { "@type": "ListItem", position: 2, name: "Translators", item: "https://www.copychars.com/translate" },
          { "@type": "ListItem", position: 3, name: `${t.pair.from} to ${t.pair.to}`, item: `https://www.copychars.com/translate/${t.id}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TranslateClient translatorId={t.id} />
    </>
  );
}
