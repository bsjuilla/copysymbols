// EXTRA SYMBOLS — Add these to the symbols array in src/data/symbols.ts
// Copy everything inside the array below and paste it at the END of the
// existing symbols array in src/data/symbols.ts (before the closing bracket)

export const extraSymbols = [
  // ─── FRACTIONS ──────────────────────────────────────────────────────────────
  { id: "half", symbol: "½", name: "Vulgar Fraction One Half", keywords: ["half","fraction","1/2","one half"], category: "fractions", unicode: "U+00BD", html: "&frac12;", css: "\\00BD", description: "One half fraction." },
  { id: "quarter", symbol: "¼", name: "Vulgar Fraction One Quarter", keywords: ["quarter","fraction","1/4"], category: "fractions", unicode: "U+00BC", html: "&frac14;", css: "\\00BC", description: "One quarter fraction." },
  { id: "three-quarters", symbol: "¾", name: "Vulgar Fraction Three Quarters", keywords: ["three quarters","fraction","3/4"], category: "fractions", unicode: "U+00BE", html: "&frac34;", css: "\\00BE", description: "Three quarters fraction." },
  { id: "one-third", symbol: "⅓", name: "Vulgar Fraction One Third", keywords: ["third","fraction","1/3"], category: "fractions", unicode: "U+2153", html: "&#8531;", css: "\\2153", description: "One third fraction." },
  { id: "two-thirds", symbol: "⅔", name: "Vulgar Fraction Two Thirds", keywords: ["two thirds","fraction","2/3"], category: "fractions", unicode: "U+2154", html: "&#8532;", css: "\\2154", description: "Two thirds fraction." },
  { id: "one-fifth", symbol: "⅕", name: "Vulgar Fraction One Fifth", keywords: ["fifth","fraction","1/5"], category: "fractions", unicode: "U+2155", html: "&#8533;", css: "\\2155", description: "One fifth fraction." },
  { id: "one-sixth", symbol: "⅙", name: "Vulgar Fraction One Sixth", keywords: ["sixth","fraction","1/6"], category: "fractions", unicode: "U+2159", html: "&#8537;", css: "\\2159", description: "One sixth fraction." },
  { id: "one-eighth", symbol: "⅛", name: "Vulgar Fraction One Eighth", keywords: ["eighth","fraction","1/8"], category: "fractions", unicode: "U+215B", html: "&#8539;", css: "\\215B", description: "One eighth fraction." },
  { id: "three-eighths", symbol: "⅜", name: "Vulgar Fraction Three Eighths", keywords: ["three eighths","fraction","3/8"], category: "fractions", unicode: "U+215C", html: "&#8540;", css: "\\215C", description: "Three eighths fraction." },
  { id: "five-eighths", symbol: "⅝", name: "Vulgar Fraction Five Eighths", keywords: ["five eighths","fraction","5/8"], category: "fractions", unicode: "U+215D", html: "&#8541;", css: "\\215D", description: "Five eighths fraction." },
  { id: "seven-eighths", symbol: "⅞", name: "Vulgar Fraction Seven Eighths", keywords: ["seven eighths","fraction","7/8"], category: "fractions", unicode: "U+215E", html: "&#8542;", css: "\\215E", description: "Seven eighths fraction." },

  // ─── ENCLOSED NUMBERS ───────────────────────────────────────────────────────
  { id: "circled-1", symbol: "①", name: "Circled Digit One", keywords: ["circled","1","one","enclosed","number"], category: "enclosed", unicode: "U+2460", html: "&#9312;", css: "\\2460", description: "The number 1 in a circle." },
  { id: "circled-2", symbol: "②", name: "Circled Digit Two", keywords: ["circled","2","two","enclosed"], category: "enclosed", unicode: "U+2461", html: "&#9313;", css: "\\2461", description: "The number 2 in a circle." },
  { id: "circled-3", symbol: "③", name: "Circled Digit Three", keywords: ["circled","3","three","enclosed"], category: "enclosed", unicode: "U+2462", html: "&#9314;", css: "\\2462", description: "The number 3 in a circle." },
  { id: "circled-4", symbol: "④", name: "Circled Digit Four", keywords: ["circled","4","four","enclosed"], category: "enclosed", unicode: "U+2463", html: "&#9315;", css: "\\2463", description: "The number 4 in a circle." },
  { id: "circled-5", symbol: "⑤", name: "Circled Digit Five", keywords: ["circled","5","five","enclosed"], category: "enclosed", unicode: "U+2464", html: "&#9316;", css: "\\2464", description: "The number 5 in a circle." },
  { id: "circled-6", symbol: "⑥", name: "Circled Digit Six", keywords: ["circled","6","six","enclosed"], category: "enclosed", unicode: "U+2465", html: "&#9317;", css: "\\2465", description: "The number 6 in a circle." },
  { id: "circled-7", symbol: "⑦", name: "Circled Digit Seven", keywords: ["circled","7","seven","enclosed"], category: "enclosed", unicode: "U+2466", html: "&#9318;", css: "\\2466", description: "The number 7 in a circle." },
  { id: "circled-8", symbol: "⑧", name: "Circled Digit Eight", keywords: ["circled","8","eight","enclosed"], category: "enclosed", unicode: "U+2467", html: "&#9319;", css: "\\2467", description: "The number 8 in a circle." },
  { id: "circled-9", symbol: "⑨", name: "Circled Digit Nine", keywords: ["circled","9","nine","enclosed"], category: "enclosed", unicode: "U+2468", html: "&#9320;", css: "\\2468", description: "The number 9 in a circle." },
  { id: "circled-10", symbol: "⑩", name: "Circled Number Ten", keywords: ["circled","10","ten","enclosed"], category: "enclosed", unicode: "U+2469", html: "&#9321;", css: "\\2469", description: "The number 10 in a circle." },
  { id: "circled-A", symbol: "Ⓐ", name: "Circled Latin A", keywords: ["circled","A","letter","enclosed"], category: "enclosed", unicode: "U+24B6", html: "&#9398;", css: "\\24B6", description: "The letter A in a circle." },
  { id: "circled-B", symbol: "Ⓑ", name: "Circled Latin B", keywords: ["circled","B","letter","enclosed"], category: "enclosed", unicode: "U+24B7", html: "&#9399;", css: "\\24B7", description: "The letter B in a circle." },
  { id: "circled-C", symbol: "Ⓒ", name: "Circled Latin C", keywords: ["circled","C","letter","enclosed"], category: "enclosed", unicode: "U+24B8", html: "&#9400;", css: "\\24B8", description: "The letter C in a circle." },

  // ─── ROMAN NUMERALS ─────────────────────────────────────────────────────────
  { id: "roman-1", symbol: "Ⅰ", name: "Roman Numeral One", keywords: ["roman","numeral","1","one","I"], category: "roman", unicode: "U+2160", html: "&#8544;", css: "\\2160", description: "Roman numeral for 1." },
  { id: "roman-2", symbol: "Ⅱ", name: "Roman Numeral Two", keywords: ["roman","numeral","2","two","II"], category: "roman", unicode: "U+2161", html: "&#8545;", css: "\\2161", description: "Roman numeral for 2." },
  { id: "roman-3", symbol: "Ⅲ", name: "Roman Numeral Three", keywords: ["roman","numeral","3","three","III"], category: "roman", unicode: "U+2162", html: "&#8546;", css: "\\2162", description: "Roman numeral for 3." },
  { id: "roman-4", symbol: "Ⅳ", name: "Roman Numeral Four", keywords: ["roman","numeral","4","four","IV"], category: "roman", unicode: "U+2163", html: "&#8547;", css: "\\2163", description: "Roman numeral for 4." },
  { id: "roman-5", symbol: "Ⅴ", name: "Roman Numeral Five", keywords: ["roman","numeral","5","five","V"], category: "roman", unicode: "U+2164", html: "&#8548;", css: "\\2164", description: "Roman numeral for 5." },
  { id: "roman-6", symbol: "Ⅵ", name: "Roman Numeral Six", keywords: ["roman","numeral","6","six","VI"], category: "roman", unicode: "U+2165", html: "&#8549;", css: "\\2165", description: "Roman numeral for 6." },
  { id: "roman-7", symbol: "Ⅶ", name: "Roman Numeral Seven", keywords: ["roman","numeral","7","seven","VII"], category: "roman", unicode: "U+2166", html: "&#8550;", css: "\\2166", description: "Roman numeral for 7." },
  { id: "roman-8", symbol: "Ⅷ", name: "Roman Numeral Eight", keywords: ["roman","numeral","8","eight","VIII"], category: "roman", unicode: "U+2167", html: "&#8551;", css: "\\2167", description: "Roman numeral for 8." },
  { id: "roman-9", symbol: "Ⅸ", name: "Roman Numeral Nine", keywords: ["roman","numeral","9","nine","IX"], category: "roman", unicode: "U+2168", html: "&#8552;", css: "\\2168", description: "Roman numeral for 9." },
  { id: "roman-10", symbol: "Ⅹ", name: "Roman Numeral Ten", keywords: ["roman","numeral","10","ten","X"], category: "roman", unicode: "U+2169", html: "&#8553;", css: "\\2169", description: "Roman numeral for 10." },
  { id: "roman-50", symbol: "Ⅼ", name: "Roman Numeral Fifty", keywords: ["roman","numeral","50","fifty","L"], category: "roman", unicode: "U+216C", html: "&#8556;", css: "\\216C", description: "Roman numeral for 50." },
  { id: "roman-100", symbol: "Ⅽ", name: "Roman Numeral One Hundred", keywords: ["roman","numeral","100","hundred","C"], category: "roman", unicode: "U+216D", html: "&#8557;", css: "\\216D", description: "Roman numeral for 100." },
  { id: "roman-500", symbol: "Ⅾ", name: "Roman Numeral Five Hundred", keywords: ["roman","numeral","500","D"], category: "roman", unicode: "U+216E", html: "&#8558;", css: "\\216E", description: "Roman numeral for 500." },
  { id: "roman-1000", symbol: "Ⅿ", name: "Roman Numeral One Thousand", keywords: ["roman","numeral","1000","thousand","M"], category: "roman", unicode: "U+216F", html: "&#8559;", css: "\\216F", description: "Roman numeral for 1000." },

  // ─── MISCELLANEOUS SYMBOLS ──────────────────────────────────────────────────
  { id: "fleur-de-lis", symbol: "⚜", name: "Fleur-de-lis", keywords: ["fleur","lily","royal","french","heraldry"], category: "shapes", unicode: "U+269C", html: "&#9884;", css: "\\269C", description: "A stylised lily used in heraldry and decoration." },
  { id: "ankh", symbol: "☥", name: "Ankh", keywords: ["ankh","egyptian","cross","life"], category: "shapes", unicode: "U+2625", html: "&#9765;", css: "\\2625", description: "The Egyptian symbol for life." },
  { id: "om", symbol: "ॐ", name: "Om Symbol", keywords: ["om","aum","hindu","spiritual","yoga"], category: "shapes", unicode: "U+0950", html: "&#2384;", css: "\\0950", description: "The sacred syllable Om in Hinduism and Buddhism." },
  { id: "yin-yang", symbol: "☯", name: "Yin Yang", keywords: ["yin yang","taoist","balance","duality"], category: "shapes", unicode: "U+262F", html: "&#9775;", css: "\\262F", description: "Taoist symbol of duality and balance." },
  { id: "peace", symbol: "☮", name: "Peace Symbol", keywords: ["peace","cnd","anti war","symbol"], category: "shapes", unicode: "U+262E", html: "&#9774;", css: "\\262E", description: "The peace symbol, originally designed for nuclear disarmament." },
  { id: "biohazard", symbol: "☣", name: "Biohazard", keywords: ["biohazard","danger","toxic","biological"], category: "technical", unicode: "U+2623", html: "&#9763;", css: "\\2623", description: "Indicates biological hazard." },
  { id: "radioactive", symbol: "☢", name: "Radioactive", keywords: ["radioactive","nuclear","radiation","danger"], category: "technical", unicode: "U+2622", html: "&#9762;", css: "\\2622", description: "Indicates radioactive material." },
  { id: "caduceus", symbol: "⚕", name: "Medical Symbol", keywords: ["medical","caduceus","staff","health"], category: "technical", unicode: "U+2695", html: "&#9877;", css: "\\2695", description: "The medical caduceus symbol." },
  { id: "scales", symbol: "⚖", name: "Scales of Justice", keywords: ["scales","justice","law","balance"], category: "legal", unicode: "U+2696", html: "&#9878;", css: "\\2696", description: "Scales representing justice and law." },
  { id: "hammer-pick", symbol: "⚒", name: "Hammer and Pick", keywords: ["hammer","pick","mining","tools"], category: "technical", unicode: "U+2692", html: "&#9874;", css: "\\2692", description: "Crossed hammer and pick tools." },
  { id: "anchor", symbol: "⚓", name: "Anchor", keywords: ["anchor","ship","maritime","navy"], category: "technical", unicode: "U+2693", html: "&#9875;", css: "\\2693", description: "A ship's anchor symbol." },
  { id: "umbrella-rain", symbol: "☔", name: "Umbrella with Rain Drops", keywords: ["umbrella","rain","weather","wet"], category: "weather", unicode: "U+2614", html: "&#9748;", css: "\\2614", description: "An umbrella in the rain." },
  { id: "hot-springs", symbol: "♨", name: "Hot Springs", keywords: ["hot","spring","spa","steam","onsen"], category: "weather", unicode: "U+2668", html: "&#9832;", css: "\\2668", description: "Hot springs or steam symbol." },
  { id: "snowflake2", symbol: "❅", name: "Tight Trifoliate Snowflake", keywords: ["snowflake","snow","winter","cold"], category: "weather", unicode: "U+2745", html: "&#10053;", css: "\\2745", description: "A decorative snowflake variant." },
  { id: "sun-rays", symbol: "✦", name: "Black Four Pointed Star", keywords: ["star","sparkle","four points","decoration"], category: "shapes", unicode: "U+2726", html: "&#10022;", css: "\\2726", description: "A four-pointed star used for decoration." },
  { id: "sparkle", symbol: "✧", name: "White Four Pointed Star", keywords: ["star","sparkle","four points","white"], category: "shapes", unicode: "U+2727", html: "&#10023;", css: "\\2727", description: "A white four-pointed star." },
  { id: "scissors", symbol: "✂", name: "Scissors", keywords: ["scissors","cut","trim","snip"], category: "technical", unicode: "U+2702", html: "&#9986;", css: "\\2702", description: "A pair of scissors." },
  { id: "pencil", symbol: "✏", name: "Pencil", keywords: ["pencil","write","edit","draw"], category: "technical", unicode: "U+270F", html: "&#9999;", css: "\\270F", description: "A pencil for writing or drawing." },
  { id: "telephone-receiver", symbol: "✆", name: "Telephone Location Sign", keywords: ["phone","telephone","call","location"], category: "technical", unicode: "U+2706", html: "&#9990;", css: "\\2706", description: "A telephone with location indicator." },
];

// Also add these new categories to the categories array:
export const extraCategories = [
  { id: "fractions", name: "Fractions", description: "Common fraction symbols", icon: "½", color: "#f59e0b" },
  { id: "enclosed", name: "Enclosed Numbers", description: "Numbers and letters in circles", icon: "①", color: "#6366f1" },
  { id: "roman", name: "Roman Numerals", description: "Roman numeral symbols", icon: "Ⅳ", color: "#8b5cf6" },
];
