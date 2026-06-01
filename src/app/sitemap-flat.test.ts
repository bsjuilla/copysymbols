const BASE = process.env.BASE_URL || "http://localhost:3000";

async function check() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("xml")) throw new Error(`expected xml content-type, got "${ct}"`);
  const body = await res.text();
  if (!body.includes("<urlset")) throw new Error("body missing <urlset>");

  const mustHave = [
    "/text-decorator",                              // pass-2 new
    "/translate/text-to-wingdings",                 // pass-2 translator
    "/translate/text-to-braille",
    "/translate/english-to-pig-latin",
    "/symbols-for/instagram",                       // pass-1
    "/flag/france",                                 // flags set
  ];
  for (const url of mustHave) {
    if (!body.includes(url)) throw new Error(`sitemap missing url: ${url}`);
  }

  // Must NOT contain noindex'd / excluded routes
  for (const url of ["/community", "/search?"]) {
    if (body.includes(`${BASE}${url}`)) throw new Error(`sitemap should not contain: ${url}`);
  }

  // Must NOT contain the /symbol/<slug>/in-<platform> cross matrix — those ~1,680
  // pages are noindex'd (near-duplicate thin content) and were removed from the
  // sitemap so it advertises only indexable URLs.
  if (body.includes("/in-instagram") || body.includes("/in-discord")) {
    throw new Error("sitemap should not contain the in-<platform> cross matrix (noindex'd)");
  }

  // Must NOT contain any gen-* slugs — they're noindex'd at the page level
  // and submitting them trains Google to discount the whole sitemap.
  // (B2 fix, GSC 2026-05-28 "Excluded by 'noindex' tag" report.)
  if (body.includes("/symbol/gen-")) {
    throw new Error("sitemap should not contain gen-* slugs (B2 regression)");
  }

  // robots.txt smoke check — must 200, must disallow /search, and must NOT
  // block /_next/ (Googlebot needs /_next/static/*.css + *.js to render the
  // page; blocking it caused unstyled renders → "Crawled - currently not indexed").
  const robotsRes = await fetch(`${BASE}/robots.txt`);
  if (robotsRes.status !== 200) throw new Error(`expected robots 200, got ${robotsRes.status}`);
  const robots = await robotsRes.text();
  if (!robots.includes("Disallow: /search")) {
    throw new Error("robots.txt should disallow /search");
  }
  if (robots.includes("/_next/")) {
    throw new Error("robots.txt should NOT block /_next/ (Google needs CSS/JS to render)");
  }

  console.log(`sitemap-flat smoke test passed (body ~${(body.length / 1024).toFixed(0)} KB)`);
}

check().catch(e => { console.error(e); process.exit(1); });
