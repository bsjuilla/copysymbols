export {}; // make this a module so top-level `BASE`/`check` don't collide with sibling smoke tests under tsc --noEmit

const BASE = process.env.BASE_URL || "http://localhost:3000";

async function check() {
  const res = await fetch(`${BASE}/translate`);
  if (res.status !== 200) throw new Error(`expected 200, got ${res.status}`);
  const body = await res.text();
  // index should mention all 3 translators by name
  for (const term of ["Wingdings", "Braille", "Pig Latin"]) {
    if (!body.includes(term)) throw new Error(`/translate body missing "${term}"`);
  }
  // canonical link to itself
  if (!body.includes('rel="canonical"') || !body.includes('/translate"')) {
    throw new Error("missing or wrong canonical");
  }
  console.log("/translate index smoke test passed");
}

check().catch(e => { console.error(e); process.exit(1); });
