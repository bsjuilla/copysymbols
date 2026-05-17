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
    "/symbol/heart/in-instagram",                   // pass-2 cross matrix
  ];
  for (const url of mustHave) {
    if (!body.includes(url)) throw new Error(`sitemap missing url: ${url}`);
  }

  // Must NOT contain noindex'd / excluded routes
  for (const url of ["/community", "/search?"]) {
    if (body.includes(`${BASE}${url}`)) throw new Error(`sitemap should not contain: ${url}`);
  }

  console.log(`sitemap-flat smoke test passed (body ~${(body.length / 1024).toFixed(0)} KB)`);
}

check().catch(e => { console.error(e); process.exit(1); });
