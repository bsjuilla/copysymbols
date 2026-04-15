"use client";
import { useState } from "react";

const lennyCategories = [
  { name: "Classic Lenny", faces: [
    { s: "( ͡° ͜ʖ ͡°)", n: "Original Lenny" },
    { s: "( ͡~ ͜ʖ ͡°)", n: "Winking Lenny" },
    { s: "( ͡° ͜ʖ ͡ °)", n: "Space Lenny" },
    { s: "ᕦ( ͡° ͜ʖ ͡°)ᕤ", n: "Flexing Lenny" },
    { s: "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)", n: "Nested Lenny" },
    { s: "( ∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ. *", n: "Magic Lenny" },
    { s: "◉_◉", n: "Big Eye Lenny" },
    { s: "ʕ•ᴥ•ʔ", n: "Bear Lenny" },
  ]},
  { name: "Shrug & Meh", faces: [
    { s: "¯\\_(ツ)_/¯", n: "Shrug" },
    { s: "¯\\_(⊙_ʖ⊙)_/¯", n: "Shrug Lenny" },
    { s: "¯\\_( ツ )_/¯", n: "Wide Shrug" },
    { s: "(ᵔᴥᵔ)", n: "Puppy" },
    { s: "ლ(ಠ益ಠლ)", n: "WHY" },
    { s: "ლ,ᔑ•ﺪ͟͠•ᔐ.ლ", n: "Lenny Hug" },
    { s: "( ._.) ( l: ) ( .-. ) ( :l ) ( _.)", n: "Walking" },
    { s: "乁( ◔ ౪◔)「", n: "Lenny Grab" },
  ]},
  { name: "Happy & Love", faces: [
    { s: "(づ｡◕‿‿◕｡)づ", n: "Hug Face" },
    { s: "(◕‿◕✿)", n: "Flower Happy" },
    { s: "(*^▽^*)", n: "Excited" },
    { s: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", n: "Magic Happy" },
    { s: "(◍•ᴗ•◍)❤", n: "Love" },
    { s: "(♡°▽°♡)", n: "Heart Eyes" },
    { s: "(*˘︶˘*).｡*♡", n: "Bliss" },
    { s: "( ˘ ³˘)♥", n: "Kiss" },
  ]},
  { name: "Angry & Evil", faces: [
    { s: "(ノಠ益ಠ)ノ彡┻━┻", n: "Table Flip" },
    { s: "┬─┬ノ( º _ ºノ)", n: "Table Put Back" },
    { s: "(╬ಠ益ಠ)", n: "Rage" },
    { s: "凸(ಠ_ಠ)凸", n: "Double Middle" },
    { s: "(ó‿ò｡)", n: "Evil Plan" },
    { s: "(¬‿¬)", n: "Sly" },
    { s: "ヽ(ಠ_ಠ)ノ", n: "Upset" },
    { s: "(>ω<)", n: "Angry Cute" },
  ]},
  { name: "Surprised & Scared", faces: [
    { s: "Σ(°△°|||)︴", n: "Shocked" },
    { s: "∑(O_O;)", n: "Gasping" },
    { s: "(⊙_⊙)", n: "Wide Eyes" },
    { s: "(⊙o⊙)", n: "Open Mouth" },
    { s: "Σ(っ °Д °;)っ", n: "Alarmed" },
    { s: "((((；゜Д゜)))", n: "Terror" },
    { s: "(×_×;）", n: "Dead" },
    { s: "(゜o゜;", n: "Oh No" },
  ]},
  { name: "Cool & Swag", faces: [
    { s: "(⌐■_■)", n: "Deal With It" },
    { s: "( •_•)>⌐■-■", n: "Putting On Shades" },
    { s: "ᕙ(⇀‸↼‶)ᕗ", n: "Flexing" },
    { s: "(ง'̀-'́)ง", n: "Fight Me" },
    { s: "ヽ(͡◕ ͜ʖ ͡◕)ノ", n: "Cool Lenny" },
    { s: "┌∩┐(◣_◢)┌∩┐", n: "Middle Fingers" },
    { s: "8====D", n: "Classic Donger" },
    { s: "⊙ω⊙", n: "Stare" },
  ]},
  { name: "Cute & Kawaii", faces: [
    { s: "(｡◕‿◕｡)", n: "Cute" },
    { s: "(≧◡≦)", n: "Happy Eyes" },
    { s: "(✿◠‿◠)", n: "Flower Cute" },
    { s: "ヽ(´▽`)/", n: "Excited Arms" },
    { s: "(〃▽〃)", n: "Blushing" },
    { s: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", n: "Very Shy" },
    { s: "ʕっ•ᴥ•ʔっ", n: "Bear Hug" },
    { s: "(=^･ω･^=)", n: "Cat" },
  ]},
];

export default function LennyClient() {
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const copy = async (s: string, n: string) => {
    try { await navigator.clipboard.writeText(s); } catch { const ta = document.createElement("textarea"); ta.value = s; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCopied(s);
    const toast = document.getElementById("global-toast"); const toastSym = document.getElementById("toast-symbol"); const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) { toastSym.textContent = "( ͡° ͜ʖ ͡°)"; toastMsg.textContent = `Copied ${n}`; toast.classList.add("show"); setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800); }
  };

  const allFaces = lennyCategories.flatMap(c => c.faces);
  const filtered = search ? allFaces.filter(f => f.n.toLowerCase().includes(search.toLowerCase()) || f.s.includes(search)) : null;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Text faces & dongers</div>
      <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Lenny Face ( ͡° ͜ʖ ͡°)
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
        Copy and paste Lenny faces, text faces and dongers. Click any face to copy it instantly. Works everywhere — Discord, Reddit, Twitter, WhatsApp.
      </p>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: 400, marginBottom: 40 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
        <input className="search-input" type="text" placeholder="Search faces..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 44 }} />
      </div>

      {filtered ? (
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Search results ({filtered.length})</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
            {filtered.map(({ s, n }) => (
              <div key={s + n} className={`kaomoji-card ${copied === s ? "copied" : ""}`} onClick={() => copy(s, n)}>
                <div className="kaomoji-face">{s}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{n}</div>
                <div style={{ fontSize: 11, color: copied === s ? "var(--accent)" : "var(--text3)" }}>{copied === s ? "✓ copied" : "click to copy"}</div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        lennyCategories.map(cat => (
          <section key={cat.name} style={{ marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{cat.name}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {cat.faces.map(({ s, n }) => (
                <div key={s + n} className={`kaomoji-card ${copied === s ? "copied" : ""}`} onClick={() => copy(s, n)}>
                  <div className="kaomoji-face">{s}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{n}</div>
                  <div style={{ fontSize: 11, color: copied === s ? "var(--accent)" : "var(--text3)" }}>{copied === s ? "✓ copied" : "click to copy"}</div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
