"use client";
import { useState } from "react";

const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const fontMaps: Record<string, string> = {
  bold: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  italic: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789",
  boldItalic: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789",
  cursive: "𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789",
  cursiveBold: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789",
  fraktur: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789",
  doubleStruck: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  monospace: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
  fullwidth: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９",
  smallCaps: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢabcdefghijklmnopqrstuvwxyz0123456789",
};

const specialStyles: Record<string, (text: string) => string> = {
  bubble: (t) => t.split("").map(c => {
    const u = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const l = "abcdefghijklmnopqrstuvwxyz";
    const ub = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ";
    const lb = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
    const ui = u.indexOf(c); if (ui >= 0) return ub[ui];
    const li = l.indexOf(c); if (li >= 0) return lb[li];
    return c;
  }).join(""),
  bubbleFilled: (t) => t.split("").map(c => {
    const u = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const ub = "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩";
    const ui = u.indexOf(c.toUpperCase()); if (ui >= 0) return ub[ui];
    return c;
  }).join(""),
  strikethrough: (t) => t.split("").map(c => c + "\u0336").join(""),
  underline: (t) => t.split("").map(c => c + "\u0332").join(""),
  overline: (t) => t.split("").map(c => c + "\u0305").join(""),
  upsideDown: (t) => {
    const map: Record<string, string> = { a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ɓ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",A:"∀",B:"ᗺ",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"פ",H:"H",I:"I",J:"ɾ",K:"ʞ",L:"⅂",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Q",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6","0":"0","!":"¡","?":"¿",".":"˙",",":"'","'":","," ":" " };
    return t.split("").reverse().map(c => map[c] || c).join("");
  },
  morse: (t) => {
    const map: Record<string, string> = { A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--.."," ":" / " };
    return t.toUpperCase().split("").map(c => map[c] || c).join(" ");
  },
  zalgo: (t) => t.split("").map(c => {
    if (c === " ") return c;
    const above = ["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͅ","͛","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ"];
    const below = ["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚"];
    let result = c;
    for (let i = 0; i < 3; i++) result += above[Math.floor(Math.random() * above.length)];
    for (let i = 0; i < 2; i++) result += below[Math.floor(Math.random() * below.length)];
    return result;
  }).join(""),
  vaporwave: (t) => t.split("").map(c => {
    const code = c.charCodeAt(0);
    if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248);
    return c;
  }).join(""),
};

const fontStyles = [
  { key: "bold", label: "Bold", example: "𝐁𝐨𝐥𝐝", description: "Great for emphasis" },
  { key: "italic", label: "Italic", example: "𝘐𝘵𝘢𝘭𝘪𝘤", description: "For captions" },
  { key: "boldItalic", label: "Bold Italic", example: "𝑩𝒐𝒍𝒅", description: "Extra emphasis" },
  { key: "cursive", label: "Cursive", example: "𝒞𝓊𝓇𝓈𝒾𝓋𝑒", description: "Elegant style" },
  { key: "cursiveBold", label: "Cursive Bold", example: "𝓒𝓾𝓻𝓼𝓲𝓿𝓮", description: "Bold cursive" },
  { key: "fraktur", label: "Fraktur", example: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯", description: "Gothic style" },
  { key: "doubleStruck", label: "Double Struck", example: "𝔻𝕠𝕦𝕓𝕝𝕖", description: "Math style" },
  { key: "monospace", label: "Monospace", example: "𝙼𝚘𝚗𝚘", description: "Code style" },
  { key: "fullwidth", label: "Full Width", example: "Ｆｕｌｌ", description: "Wide aesthetic" },
  { key: "smallCaps", label: "Small Caps", example: "Sᴍᴀʟʟ", description: "Professional" },
  { key: "bubble", label: "Bubble", example: "ⓑⓤⓑⓑⓛⓔ", description: "Playful circles" },
  { key: "bubbleFilled", label: "Filled Bubble", example: "🅕🅘🅛🅛🅔🅓", description: "Bold circles" },
  { key: "strikethrough", label: "Strikethrough", example: "s̶t̶r̶i̶k̶e̶", description: "Crossed out" },
  { key: "underline", label: "Underline", example: "u̲n̲d̲e̲r̲", description: "Underlined" },
  { key: "upsideDown", label: "Upside Down", example: "uʍop", description: "Flipped text" },
  { key: "morse", label: "Morse Code", example: "-- --- .-. ..", description: "Dots & dashes" },
  { key: "vaporwave", label: "Vaporwave", example: "ｖａｐｏｒ", description: "Aesthetic" },
  { key: "zalgo", label: "Zalgo", example: "z̴a̴l̴g̴o̴", description: "Cursed text" },
];

function convertText(text: string, style: string): string {
  if (specialStyles[style]) return specialStyles[style](text);
  const map = fontMaps[style];
  if (!map) return text;
  return text.split("").map(c => {
    const i = normal.indexOf(c);
    return i >= 0 ? [...map][i] : c;
  }).join("");
}

export default function FancyTextClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(label);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = "✦";
      toastMsg.textContent = "Copied " + label;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Unicode font styles</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Fancy Text Generator
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Type your text below and instantly get 18 stylish Unicode versions. Works on Instagram, TikTok, Twitter, Discord, WhatsApp — anywhere.
      </p>

      {/* Input */}
      <div style={{ position: "relative", marginBottom: 40 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your text here..."
          rows={3}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", color: "var(--text)", fontSize: 18, fontFamily: "inherit", resize: "vertical", outline: "none", transition: "border-color 0.2s", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
        {input && (
          <button onClick={() => setInput("")} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "var(--text3)", fontSize: 20, cursor: "pointer" }}>×</button>
        )}
      </div>

      {/* Results */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 10 }}>
        {fontStyles.map(style => {
          const converted = input ? convertText(input, style.key) : style.example;
          const isCopied = copied === style.label;
          return (
            <div
              key={style.key}
              onClick={() => input && handleCopy(converted, style.label)}
              style={{ background: "var(--surface)", border: `1px solid ${isCopied ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "16px 18px", cursor: input ? "pointer" : "default", transition: "all 0.18s", opacity: input ? 1 : 0.7 }}
              onMouseEnter={e => { if (input) (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
              onMouseLeave={e => { if (!isCopied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text2)" }}>{style.label}</span>
                  <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 8 }}>{style.description}</span>
                </div>
                <span style={{ fontSize: 11, color: isCopied ? "var(--accent)" : "var(--text3)" }}>
                  {isCopied ? "✓ copied" : input ? "click to copy" : ""}
                </span>
              </div>
              <div style={{ fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.5, wordBreak: "break-all", fontFamily: "serif" }}>
                {converted}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info section */}
      <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How does fancy text work?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
            Fancy text uses special Unicode characters that look like styled letters but are actually completely different characters. That&apos;s why they work everywhere — Instagram, TikTok, Twitter, Discord — because they&apos;re just regular text, not images or special formatting.
          </p>
          <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
            For example, the &quot;bold&quot; style uses characters from the Mathematical Alphanumeric Symbols block (U+1D400 and onwards). The cursive style uses Script letters. They all copy and paste like normal text, so you can use them in bios, captions, usernames, and messages.
          </p>
        </div>
      </section>
    </div>
  );
}
