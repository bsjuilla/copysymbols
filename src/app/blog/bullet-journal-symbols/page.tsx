import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/canonical";
import PostMeta from "@/components/PostMeta";

const TITLE = "Bullet Journal Symbols — The Complete Key & Copy Guide";
const DESCRIPTION = "Bullet journal symbols explained: Ryder Carroll's official key, popular custom signifiers, and the exact Unicode characters to copy for digital journaling.";
const SLUG = "bullet-journal-symbols";
const PUBLISHED = "2026-06-10T00:00:00Z";
const MODIFIED = "2026-06-10T00:00:00Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["bullet journal symbols","bullet journal key","bujo symbols","bullet journal symbols meaning","bullet journal signifiers","digital bullet journal symbols","bullet journal key ideas","ryder carroll bullet journal key"],
  ...canonical(`/blog/${SLUG}`),
  openGraph: { type: "article", publishedTime: PUBLISHED, modifiedTime: MODIFIED, authors: ["https://www.copychars.com/about"] },
};

const INTRO = "Open any well-used bullet journal and the first page you will probably find is a key: a small legend explaining that a dot means task, a circle means event, and a dash means note. That key is not decoration — it is the engine of the entire method. Bullet journaling works because tiny symbols let you log your life faster than sentences ever could, and the key keeps those symbols consistent from January to December. This guide covers the official symbols as Ryder Carroll designed them, the custom signifiers the community has added over a decade of experimenting, and the exact Unicode characters to copy if your journal lives in Notion, Obsidian, or Google Docs instead of a notebook.";
const SECTIONS: { h2: string; paras: string[] }[] = [{"h2":"What a Bullet Journal Key Actually Is","paras":["A bullet journal key is the legend that maps each symbol in your journal to its meaning. It exists because the bullet journal method is built on a practice called rapid logging: instead of writing diary-style paragraphs, you capture each task, event, and thought as a single short line, marked with a symbol that tells you what kind of entry it is. A dot is a task. A circle is an event. A dash is a note. Because the symbol carries the category, the words after it can be ruthlessly brief — and a full day often fits in six or eight lines.","The key matters because rapid logging only pays off if the symbols are instant to read back. When you scan last Tuesday and see three dots, an x, and a circle, you should know at a glance — without reading a word — that there were four tasks, one finished, and one appointment. That recognition speed is the whole point, and it only develops if your symbols stay consistent. The key page is a contract with your future self: write the legend once, put it somewhere you can always find it, and resist the urge to redesign it every month."]},{"h2":"The Official Symbols, as Ryder Carroll Designed Them","paras":["The bullet journal method was created by Ryder Carroll, a digital product designer in New York who developed it over years of managing his own attention difficulties and shared it publicly in 2013. His official key is deliberately tiny. A dot ( • ) marks a task — chosen over a checkbox because it is faster to write and easy to transform. An x drawn over the dot marks the task complete. A right angle ( > ) means the task was migrated: moved forward into the next monthly log or into a collection. A left angle ( < ) means it was scheduled: sent to the future log to wait for its month. A task that no longer matters is simply struck through.","Events get an open circle ( ○ ) and notes get a dash ( – ). On top of those bullets sit signifiers, small marks placed to the left of a line to add emphasis. An asterisk ( * ) flags priority — the thing that genuinely must happen today. An exclamation point ( ! ) marks inspiration: an idea, insight, or thought worth keeping. Earlier versions of the system also included an eye symbol for entries that needed exploration or research, and although it has dropped out of the official key, plenty of longtime journalers still use a variant of it. That is the entire system — eight or so marks you can learn in a minute."]},{"h2":"How the Method Around the Symbols Works","paras":["The symbols only make sense inside the method's structure. A bullet journal is organized into a few standard sections: an index at the front so you can find anything later, a future log for items months away, a monthly log for the current month, and daily logs where rapid logging actually happens. Each day, you write the date and log tasks, events, and notes as they come, each with its bullet. There is no preprinted layout and no minimum — a daily log can be two lines.","The distinctive move is migration. When a new month starts, you set up its monthly log and review every unfinished task from the old one, one by one. Each gets a decision: rewrite it into the new month and mark the old entry with >, push it into the future log and mark it with <, or admit it does not matter and strike it out. Rewriting tasks by hand sounds inefficient, and that is precisely the point — Carroll designed migration as deliberate friction. If a task is not worth the few seconds it takes to rewrite, it was probably never worth doing, and migration is the moment you find that out. The symbols make this monthly audit fast enough that you will actually do it."]},{"h2":"Popular Custom Symbols From the Community","paras":["A decade of bullet journalers on Pinterest and Instagram has produced a thriving ecosystem of custom keys. The most widely adopted addition is the half-filled circle or dot ( ◐ ) for a task in progress — useful for multi-day work that the official system would leave looking untouched. A tilde ( ~ ) commonly marks a cancelled task, distinct from one that simply became irrelevant. A question mark ( ? ) marks something waiting on another person or an answer, which earns its place quickly if your work involves a lot of follow-ups.","Beyond task states, people add symbols for the things they want to track. A heart ( ♥ ) often marks gratitude entries or memories worth keeping. A dollar sign ( $ ) tags purchases and spending notes for an easy month-end money review. Some journalers swap the dot system entirely for checkboxes ( ☐ ), accepting slower writing in exchange for the satisfaction of filling a box. All of this is fair game — the method is explicitly designed to be customized — with one caveat: every symbol you add makes the key harder to remember. The community's hard-won advice is to add a symbol only after you notice the same need recurring for weeks, not because it looks nice in someone else's key."]},{"h2":"Digital Bullet Journaling: Copy the Exact Symbols","paras":["Carroll designed the method for paper on purpose — the handwriting is part of the thinking — but the symbol system ports beautifully to digital tools, and plenty of people now run their journal in Notion, Obsidian, Google Docs, or OneNote, where templates remove the setup work and search replaces the index. The catch is the symbols themselves: keyboards have no • or ○ key, and a digital key built from hyphens and the letter o never quite looks like the real thing.","That is exactly what a copy-paste site is for. The bullet points collection on this site has every character a digital key needs — • ○ ─ ✕ > < ✦ ! ☐ ◐ and dozens of alternates — each one click to copy. They are plain Unicode, so they paste cleanly into a Notion page, an Obsidian markdown file, a Google Doc, or a OneNote note, and they survive export, sync, and copying between apps. A pattern that works well in Notion and Obsidian: paste your chosen symbols into a pinned key note once, then copy from there forever — the exact same legend a paper journal would have, drawn in characters instead of ink."]},{"h2":"Designing a Key Page That Works","paras":["Whether your journal is paper or pixels, the same design rules apply. Keep the key under about ten symbols — every entry past that point is a memory tax, and most people genuinely need six. Consistency beats cleverness: a plain dot you use for a year outperforms a beautiful icon you abandon by March. And put the key where you will actually look. The inside front cover is the traditional spot, and some journalers draw it on a bookmark or fold-out tab so it travels with the current page.","It is worth saying plainly why symbols beat words for logging. They scan faster — a column of bullets reveals the shape of a week in seconds, where sentences would take minutes. They are language-independent, which sounds abstract until you notice that • means task to anyone you ever show your system to. And they are satisfying in a way prose is not: drawing the x over a finished task is a tiny physical reward, and a long row of x marks at the end of a productive week is its own motivation. The key is one page of your journal, but it is the page that makes every other page legible."]}];
const FAQS: { q: string; a: string }[] = [{"q":"What are the official bullet journal symbols?","a":"The official key from Ryder Carroll uses a dot ( • ) for a task, an x drawn over the dot for a completed task, a right angle ( > ) for a migrated task, a left angle ( < ) for a scheduled task, an open circle ( ○ ) for an event, and a dash ( – ) for a note. Two signifiers sit to the left of entries: an asterisk ( * ) for priority and an exclamation point ( ! ) for ideas and inspiration. Tasks that no longer matter are simply struck through rather than given a symbol of their own."},{"q":"What does migration mean in a bullet journal?","a":"Migration is the monthly review at the heart of the method. When a new month begins, you go through every unfinished task from the previous month and decide its fate: rewrite it into the new monthly log and mark the old entry with >, move it to the future log for a later month and mark it with <, or strike it out because it no longer matters. The rewriting is intentional friction — if a task is not worth the seconds it takes to copy forward, that is your signal to drop it."},{"q":"Can I bullet journal digitally?","a":"Yes. The method was designed for paper, and Ryder Carroll argues that handwriting is part of its value, but the system itself — rapid logging, the symbol key, monthly migration — works in any tool that holds text. Notion, Obsidian, Google Docs, and OneNote are the most popular homes for digital bullet journals. Copy the Unicode symbols ( • ○ > < ✕ ◐ ) into a key note once, and your digital journal can use the exact same legend as a paper one."},{"q":"How many symbols should my bullet journal key have?","a":"Start with the six core symbols and add slowly. Most experienced journalers settle between six and ten; beyond that, you start forgetting what your own marks mean, which defeats the purpose of a key. A good rule is to add a new symbol only after the same need has come up repeatedly for a few weeks — a real recurring category earns its place, while a symbol added because it looked pretty in someone else's key usually goes unused."},{"q":"What is the difference between a bullet and a signifier?","a":"A bullet is the symbol that starts an entry and tells you what kind of entry it is: task ( • ), event ( ○ ), or note ( – ). A signifier is an extra mark placed to the left of the bullet to add emphasis without changing the entry's type — an asterisk ( * ) turns a task into a priority, and an exclamation point ( ! ) marks an entry as an idea worth revisiting. Every line gets exactly one bullet, while a signifier is optional and sits outside it."}];
const RELATED: { href: string; label: string }[] = [{"href":"/bullet-points","label":"Bullet Point Symbols"},{"href":"/blog/bullet-point-copy-paste","label":"Bullet Point Copy Paste"},{"href":"/symbols","label":"All Symbols"},{"href":"/stars","label":"Star Symbols"},{"href":"/hearts","label":"Heart Symbols"},{"href":"/borders","label":"Borders & Dividers"}];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED.slice(0, 10),
  dateModified: MODIFIED.slice(0, 10),
  author: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  publisher: { "@type": "Organization", name: "CopyChars", url: "https://www.copychars.com" },
  mainEntityOfPage: `https://www.copychars.com/blog/${SLUG}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none", fontSize: 13 }}>&larr; Blog</Link>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", margin: "16px 0", letterSpacing: "-0.02em" }}>
          {TITLE}
        </h1>
        <PostMeta published={PUBLISHED} modified={MODIFIED} />
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 36, lineHeight: 1.7 }}>{INTRO}</p>

        {SECTIONS.map((s, i) => (
          <section key={i}>
            <h2 style={sectionH2}>{s.h2}</h2>
            {s.paras.map((p, j) => (
              <p key={j} style={para}>{p}</p>
            ))}
          </section>
        ))}

        <h2 style={sectionH2}>Frequently asked questions</h2>
        <div style={{ marginBottom: 24 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <h3 style={faqQ}>{f.q}</h3>
              <p style={{ ...para, marginBottom: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          {RELATED.map((r) => (
            <Link key={r.href} href={r.href} className="cat-pill">{r.label}</Link>
          ))}
          <Link href="/blog" className="cat-pill">More Guides</Link>
        </div>
      </div>
    </>
  );
}

const sectionH2: React.CSSProperties = { fontSize: 21, fontWeight: 700, color: "var(--text)", margin: "32px 0 12px", letterSpacing: "-0.01em" };
const para: React.CSSProperties = { fontSize: 15.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 16 };
const faqQ: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 6px" };
