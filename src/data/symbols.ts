import { generatedSymbols } from './generated-symbols';
export interface Symbol {
  id: string;
  symbol: string;
  name: string;
  keywords: string[];
  category: string;
  unicode: string;
  html: string;
  css: string;
  description: string;
  shortcut?: { mac?: string; windows?: string };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: "arrows", name: "Arrows", description: "Direction and flow arrows", icon: "â†’", color: "#6366f1" },
  { id: "currency", name: "Currency", description: "Money and financial symbols", icon: "â‚¬", color: "#10b981" },
  { id: "math", name: "Math", description: "Mathematical operators and symbols", icon: "âˆ‘", color: "#f59e0b" },
  { id: "greek", name: "Greek Letters", description: "Greek alphabet symbols", icon: "Î±", color: "#8b5cf6" },
  { id: "legal", name: "Legal & Trade", description: "Copyright, trademark and legal marks", icon: "Â©", color: "#ef4444" },
  { id: "shapes", name: "Shapes & Stars", description: "Geometric shapes and star symbols", icon: "â˜…", color: "#ec4899" },
  { id: "punctuation", name: "Punctuation", description: "Special punctuation marks", icon: "Â«", color: "#14b8a6" },
  { id: "music", name: "Music", description: "Musical notes and symbols", icon: "â™ª", color: "#f97316" },
  { id: "chess", name: "Chess & Games", description: "Chess pieces and game symbols", icon: "â™Ÿ", color: "#64748b" },
  { id: "zodiac", name: "Zodiac & Astrology", description: "Zodiac and astrological signs", icon: "â™ˆ", color: "#a855f7" },
  { id: "weather", name: "Weather & Nature", description: "Weather and nature symbols", icon: "â˜€", color: "#0ea5e9" },
  { id: "technical", name: "Technical", description: "Technical and computer symbols", icon: "âŒ˜", color: "#22c55e" },
  { id: "superscript", name: "Superscript & Subscript", description: "Raised and lowered characters", icon: "Â²", color: "#fb923c" },
  { id: "ui", name: "UI & Interface", description: "Icons used in interfaces", icon: "âš™", color: "#94a3b8" },
];

export const symbols: Symbol[] = [
  // â”€â”€â”€ ARROWS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "right-arrow", symbol: "â†’", name: "Right Arrow", keywords: ["right","arrow","next","forward"], category: "arrows", unicode: "U+2192", html: "&rarr;", css: "\\2192", description: "Points right, used for navigation, next steps, and logical implication.", shortcut: { windows: "Alt+26" } },
  { id: "left-arrow", symbol: "â†", name: "Left Arrow", keywords: ["left","arrow","back","previous"], category: "arrows", unicode: "U+2190", html: "&larr;", css: "\\2190", description: "Points left, used for back navigation and previous steps.", shortcut: { windows: "Alt+27" } },
  { id: "up-arrow", symbol: "â†‘", name: "Up Arrow", keywords: ["up","arrow","increase","rise"], category: "arrows", unicode: "U+2191", html: "&uarr;", css: "\\2191", description: "Points upward, used to indicate increase or upward direction." },
  { id: "down-arrow", symbol: "â†“", name: "Down Arrow", keywords: ["down","arrow","decrease","fall"], category: "arrows", unicode: "U+2193", html: "&darr;", css: "\\2193", description: "Points downward, used to indicate decrease or downward direction." },
  { id: "left-right-arrow", symbol: "â†”", name: "Left Right Arrow", keywords: ["both","horizontal","bidirectional"], category: "arrows", unicode: "U+2194", html: "&harr;", css: "\\2194", description: "Points both left and right, indicating bidirectional flow." },
  { id: "up-down-arrow", symbol: "â†•", name: "Up Down Arrow", keywords: ["both","vertical","bidirectional"], category: "arrows", unicode: "U+2195", html: "&varr;", css: "\\2195", description: "Points both up and down, indicating vertical bidirectional movement." },
  { id: "ne-arrow", symbol: "â†—", name: "North East Arrow", keywords: ["diagonal","northeast","upper right"], category: "arrows", unicode: "U+2197", html: "&#8599;", css: "\\2197", description: "Points upper-right, used for external links and upward trends." },
  { id: "se-arrow", symbol: "â†˜", name: "South East Arrow", keywords: ["diagonal","southeast","lower right"], category: "arrows", unicode: "U+2198", html: "&#8600;", css: "\\2198", description: "Points lower-right, used for downward-right direction." },
  { id: "sw-arrow", symbol: "â†™", name: "South West Arrow", keywords: ["diagonal","southwest","lower left"], category: "arrows", unicode: "U+2199", html: "&#8601;", css: "\\2199", description: "Points lower-left." },
  { id: "nw-arrow", symbol: "â†–", name: "North West Arrow", keywords: ["diagonal","northwest","upper left"], category: "arrows", unicode: "U+2196", html: "&#8598;", css: "\\2196", description: "Points upper-left." },
  { id: "double-right-arrow", symbol: "â‡’", name: "Double Right Arrow", keywords: ["implies","therefore","double","right"], category: "arrows", unicode: "U+21D2", html: "&rArr;", css: "\\21D2", description: "Used in logic to represent implication." },
  { id: "double-left-arrow", symbol: "â‡", name: "Double Left Arrow", keywords: ["double","left","implies"], category: "arrows", unicode: "U+21D0", html: "&lArr;", css: "\\21D0", description: "Left-pointing double arrow for reverse implication." },
  { id: "double-lr-arrow", symbol: "â‡”", name: "Double Left Right Arrow", keywords: ["iff","equivalent","biconditional"], category: "arrows", unicode: "U+21D4", html: "&hArr;", css: "\\21D4", description: "If and only if; logical equivalence." },
  { id: "fat-right-arrow", symbol: "âž”", name: "Heavy Right Arrow", keywords: ["bold","heavy","right","thick"], category: "arrows", unicode: "U+2794", html: "&#10132;", css: "\\2794", description: "A bolder right-pointing arrow for emphasis." },
  { id: "curved-right", symbol: "â†·", name: "Curved Right Arrow", keywords: ["curved","right","rotate","redo"], category: "arrows", unicode: "U+21B7", html: "&#8631;", css: "\\21B7", description: "Curved arrow pointing right, often used for redo." },
  { id: "curved-left", symbol: "â†¶", name: "Curved Left Arrow", keywords: ["curved","left","rotate","undo"], category: "arrows", unicode: "U+21B6", html: "&#8630;", css: "\\21B6", description: "Curved arrow pointing left, often used for undo." },
  { id: "return-arrow", symbol: "â†µ", name: "Return Arrow", keywords: ["return","enter","newline","carriage"], category: "arrows", unicode: "U+21B5", html: "&#8629;", css: "\\21B5", description: "Represents carriage return or the Enter key." },
  { id: "thin-right", symbol: "â€º", name: "Single Right Angle Quote", keywords: ["chevron","right","breadcrumb","angle"], category: "arrows", unicode: "U+203A", html: "&rsaquo;", css: "\\203A", description: "Used as a breadcrumb separator or single chevron." },
  { id: "thin-left", symbol: "â€¹", name: "Single Left Angle Quote", keywords: ["chevron","left","angle"], category: "arrows", unicode: "U+2039", html: "&lsaquo;", css: "\\2039", description: "Left-pointing single angle quotation mark." },
  { id: "arrow-right-bold", symbol: "âž¡", name: "Black Right Arrow", keywords: ["black","filled","right"], category: "arrows", unicode: "U+27A1", html: "&#10145;", css: "\\27A1", description: "Solid filled right-pointing arrow." },
  { id: "arrow-left-bold", symbol: "â¬…", name: "Black Left Arrow", keywords: ["black","filled","left"], category: "arrows", unicode: "U+2B05", html: "&#11013;", css: "\\2B05", description: "Solid filled left-pointing arrow." },
  { id: "arrow-up-bold", symbol: "â¬†", name: "Black Up Arrow", keywords: ["black","filled","up"], category: "arrows", unicode: "U+2B06", html: "&#11014;", css: "\\2B06", description: "Solid filled upward arrow." },
  { id: "arrow-down-bold", symbol: "â¬‡", name: "Black Down Arrow", keywords: ["black","filled","down"], category: "arrows", unicode: "U+2B07", html: "&#11015;", css: "\\2B07", description: "Solid filled downward arrow." },

  // â”€â”€â”€ CURRENCY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "dollar", symbol: "$", name: "Dollar Sign", keywords: ["dollar","usd","money","currency","american"], category: "currency", unicode: "U+0024", html: "&#36;", css: "\\0024", description: "US dollar sign, also used for other dollar-denominated currencies.", shortcut: { mac: "Shift+4", windows: "Shift+4" } },
  { id: "euro", symbol: "â‚¬", name: "Euro Sign", keywords: ["euro","eur","european","money"], category: "currency", unicode: "U+20AC", html: "&euro;", css: "\\20AC", description: "The currency sign for the Euro, used in the Eurozone.", shortcut: { mac: "Option+Shift+2", windows: "Alt+0128" } },
  { id: "pound", symbol: "Â£", name: "Pound Sign", keywords: ["pound","gbp","british","sterling"], category: "currency", unicode: "U+00A3", html: "&pound;", css: "\\00A3", description: "The pound sterling sign, used in the United Kingdom.", shortcut: { mac: "Option+3", windows: "Alt+0163" } },
  { id: "yen", symbol: "Â¥", name: "Yen Sign", keywords: ["yen","jpy","yuan","cny","japanese","chinese"], category: "currency", unicode: "U+00A5", html: "&yen;", css: "\\00A5", description: "Used for both the Japanese Yen and Chinese Yuan.", shortcut: { mac: "Option+Y", windows: "Alt+0165" } },
  { id: "rupee", symbol: "â‚¹", name: "Indian Rupee Sign", keywords: ["rupee","inr","india","indian"], category: "currency", unicode: "U+20B9", html: "&#8377;", css: "\\20B9", description: "The official symbol for the Indian Rupee, adopted in 2010." },
  { id: "cent", symbol: "Â¢", name: "Cent Sign", keywords: ["cent","cents","penny","dollar"], category: "currency", unicode: "U+00A2", html: "&cent;", css: "\\00A2", description: "Represents one hundredth of a US dollar.", shortcut: { mac: "Option+4", windows: "Alt+0162" } },
  { id: "bitcoin", symbol: "â‚¿", name: "Bitcoin Sign", keywords: ["bitcoin","btc","crypto","cryptocurrency"], category: "currency", unicode: "U+20BF", html: "&#8383;", css: "\\20BF", description: "Official Unicode symbol for Bitcoin cryptocurrency." },
  { id: "ruble", symbol: "â‚½", name: "Ruble Sign", keywords: ["ruble","rub","russian"], category: "currency", unicode: "U+20BD", html: "&#8381;", css: "\\20BD", description: "The currency sign for the Russian Ruble." },
  { id: "won", symbol: "â‚©", name: "Won Sign", keywords: ["won","krw","korean"], category: "currency", unicode: "U+20A9", html: "&#8361;", css: "\\20A9", description: "The currency sign for the South Korean Won." },
  { id: "franc", symbol: "â‚£", name: "French Franc Sign", keywords: ["franc","french","chf","swiss"], category: "currency", unicode: "U+20A3", html: "&#8355;", css: "\\20A3", description: "Historical symbol for the French Franc." },
  { id: "lira", symbol: "â‚º", name: "Turkish Lira Sign", keywords: ["lira","try","turkish"], category: "currency", unicode: "U+20BA", html: "&#8378;", css: "\\20BA", description: "The currency sign for the Turkish Lira." },
  { id: "peso", symbol: "â‚±", name: "Philippine Peso Sign", keywords: ["peso","php","philippine"], category: "currency", unicode: "U+20B1", html: "&#8369;", css: "\\20B1", description: "The currency sign for the Philippine Peso." },
  { id: "dong", symbol: "â‚«", name: "Vietnamese Dong Sign", keywords: ["dong","vnd","vietnamese"], category: "currency", unicode: "U+20AB", html: "&#8363;", css: "\\20AB", description: "The currency sign for the Vietnamese Dong." },
  { id: "hryvnia", symbol: "â‚´", name: "Hryvnia Sign", keywords: ["hryvnia","uah","ukrainian"], category: "currency", unicode: "U+20B4", html: "&#8372;", css: "\\20B4", description: "The currency sign for the Ukrainian Hryvnia." },
  { id: "naira", symbol: "â‚¦", name: "Naira Sign", keywords: ["naira","ngn","nigerian"], category: "currency", unicode: "U+20A6", html: "&#8358;", css: "\\20A6", description: "The currency sign for the Nigerian Naira." },
  { id: "baht", symbol: "à¸¿", name: "Thai Baht Sign", keywords: ["baht","thb","thai"], category: "currency", unicode: "U+0E3F", html: "&#3647;", css: "\\0E3F", description: "The currency sign for the Thai Baht." },

  // â”€â”€â”€ MATH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "sigma", symbol: "âˆ‘", name: "Summation Sign", keywords: ["sigma","sum","math","series"], category: "math", unicode: "U+2211", html: "&sum;", css: "\\2211", description: "Represents summation in mathematics." },
  { id: "pi", symbol: "Ï€", name: "Pi", keywords: ["pi","circle","ratio","3.14"], category: "math", unicode: "U+03C0", html: "&pi;", css: "\\03C0", description: "The ratio of a circle's circumference to its diameter, approximately 3.14159." },
  { id: "infinity", symbol: "âˆž", name: "Infinity", keywords: ["infinity","infinite","endless","lemniscate"], category: "math", unicode: "U+221E", html: "&infin;", css: "\\221E", description: "Represents the concept of infinity â€” no bounds or limits.", shortcut: { mac: "Option+5" } },
  { id: "sqrt", symbol: "âˆš", name: "Square Root", keywords: ["square root","radical","sqrt"], category: "math", unicode: "U+221A", html: "&radic;", css: "\\221A", description: "The square root radical symbol." },
  { id: "not-equal", symbol: "â‰ ", name: "Not Equal To", keywords: ["not equal","inequality","different"], category: "math", unicode: "U+2260", html: "&ne;", css: "\\2260", description: "Indicates two values are not equal.", shortcut: { mac: "Option+=" } },
  { id: "less-equal", symbol: "â‰¤", name: "Less Than or Equal To", keywords: ["less","equal","lte","leq"], category: "math", unicode: "U+2264", html: "&le;", css: "\\2264", description: "Less than or equal to comparison operator." },
  { id: "greater-equal", symbol: "â‰¥", name: "Greater Than or Equal To", keywords: ["greater","equal","gte","geq"], category: "math", unicode: "U+2265", html: "&ge;", css: "\\2265", description: "Greater than or equal to comparison operator." },
  { id: "approximately", symbol: "â‰ˆ", name: "Almost Equal To", keywords: ["approximate","about","roughly","tilde"], category: "math", unicode: "U+2248", html: "&asymp;", css: "\\2248", description: "Indicates approximate equality.", shortcut: { mac: "Option+X" } },
  { id: "integral", symbol: "âˆ«", name: "Integral", keywords: ["integral","calculus","antiderivative"], category: "math", unicode: "U+222B", html: "&int;", css: "\\222B", description: "The integral sign used in calculus." },
  { id: "partial", symbol: "âˆ‚", name: "Partial Differential", keywords: ["partial","derivative","calculus"], category: "math", unicode: "U+2202", html: "&part;", css: "\\2202", description: "Used for partial derivatives in multivariable calculus." },
  { id: "delta", symbol: "Î”", name: "Delta", keywords: ["delta","change","difference","triangle"], category: "math", unicode: "U+0394", html: "&Delta;", css: "\\0394", description: "Represents change or difference in mathematics." },
  { id: "nabla", symbol: "âˆ‡", name: "Nabla", keywords: ["nabla","gradient","del","vector"], category: "math", unicode: "U+2207", html: "&nabla;", css: "\\2207", description: "The del or nabla operator representing gradient." },
  { id: "times", symbol: "Ã—", name: "Multiplication Sign", keywords: ["times","multiply","cross","product"], category: "math", unicode: "U+00D7", html: "&times;", css: "\\00D7", description: "Multiplication operator, also used for cross product.", shortcut: { windows: "Alt+0215" } },
  { id: "division", symbol: "Ã·", name: "Division Sign", keywords: ["divide","division","obelus"], category: "math", unicode: "U+00F7", html: "&divide;", css: "\\00F7", description: "Division operator.", shortcut: { windows: "Alt+0247" } },
  { id: "plus-minus", symbol: "Â±", name: "Plus Minus Sign", keywords: ["plus minus","uncertainty","tolerance"], category: "math", unicode: "U+00B1", html: "&plusmn;", css: "\\00B1", description: "Indicates both addition and subtraction possibilities.", shortcut: { mac: "Option+Shift+=", windows: "Alt+0177" } },
  { id: "degree", symbol: "Â°", name: "Degree Sign", keywords: ["degree","angle","temperature","circle"], category: "math", unicode: "U+00B0", html: "&deg;", css: "\\00B0", description: "Represents degrees of angle or temperature.", shortcut: { mac: "Option+Shift+8", windows: "Alt+0176" } },
  { id: "therefore", symbol: "âˆ´", name: "Therefore", keywords: ["therefore","thus","hence","logic"], category: "math", unicode: "U+2234", html: "&there4;", css: "\\2234", description: "Logical symbol meaning 'therefore'." },
  { id: "because", symbol: "âˆµ", name: "Because", keywords: ["because","since","reason","logic"], category: "math", unicode: "U+2235", html: "&#8757;", css: "\\2235", description: "Logical symbol meaning 'because'." },
  { id: "empty-set", symbol: "âˆ…", name: "Empty Set", keywords: ["empty set","null","void","nothing"], category: "math", unicode: "U+2205", html: "&empty;", css: "\\2205", description: "Represents the empty set in set theory." },
  { id: "element-of", symbol: "âˆˆ", name: "Element Of", keywords: ["element","member","belongs","in"], category: "math", unicode: "U+2208", html: "&isin;", css: "\\2208", description: "Indicates membership in a set." },
  { id: "not-element", symbol: "âˆ‰", name: "Not an Element Of", keywords: ["not element","not member","not in"], category: "math", unicode: "U+2209", html: "&notin;", css: "\\2209", description: "Indicates non-membership in a set." },
  { id: "intersection", symbol: "âˆ©", name: "Intersection", keywords: ["intersection","and","cap","set"], category: "math", unicode: "U+2229", html: "&cap;", css: "\\2229", description: "Set intersection operator." },
  { id: "union", symbol: "âˆª", name: "Union", keywords: ["union","or","cup","set"], category: "math", unicode: "U+222A", html: "&cup;", css: "\\222A", description: "Set union operator." },
  { id: "perpendicular", symbol: "âŠ¥", name: "Perpendicular", keywords: ["perpendicular","orthogonal","bottom"], category: "math", unicode: "U+22A5", html: "&perp;", css: "\\22A5", description: "Indicates two lines are perpendicular." },
  { id: "proportional", symbol: "âˆ", name: "Proportional To", keywords: ["proportional","varies","scales"], category: "math", unicode: "U+221D", html: "&prop;", css: "\\221D", description: "Indicates proportionality between quantities." },

  // â”€â”€â”€ GREEK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "alpha", symbol: "Î±", name: "Alpha (lowercase)", keywords: ["alpha","greek","first","letter"], category: "greek", unicode: "U+03B1", html: "&alpha;", css: "\\03B1", description: "First letter of the Greek alphabet. Used in physics, maths and as a prefix." },
  { id: "beta", symbol: "Î²", name: "Beta (lowercase)", keywords: ["beta","greek","second","letter"], category: "greek", unicode: "U+03B2", html: "&beta;", css: "\\03B2", description: "Second Greek letter. Used in statistics and finance." },
  { id: "gamma", symbol: "Î³", name: "Gamma (lowercase)", keywords: ["gamma","greek","radiation"], category: "greek", unicode: "U+03B3", html: "&gamma;", css: "\\03B3", description: "Third Greek letter. Represents gamma radiation and many physical constants." },
  { id: "gamma-upper", symbol: "Î“", name: "Gamma (uppercase)", keywords: ["gamma","greek","uppercase"], category: "greek", unicode: "U+0393", html: "&Gamma;", css: "\\0393", description: "Uppercase gamma, used in the gamma function and combinatorics." },
  { id: "delta-lower", symbol: "Î´", name: "Delta (lowercase)", keywords: ["delta","greek","change","small"], category: "greek", unicode: "U+03B4", html: "&delta;", css: "\\03B4", description: "Lowercase delta, represents small change or Dirac delta." },
  { id: "epsilon", symbol: "Îµ", name: "Epsilon (lowercase)", keywords: ["epsilon","greek","small","error"], category: "greek", unicode: "U+03B5", html: "&epsilon;", css: "\\03B5", description: "Used in calculus for arbitrarily small quantities." },
  { id: "zeta", symbol: "Î¶", name: "Zeta (lowercase)", keywords: ["zeta","greek","riemann"], category: "greek", unicode: "U+03B6", html: "&zeta;", css: "\\03B6", description: "Sixth Greek letter. Famous for the Riemann zeta function." },
  { id: "eta", symbol: "Î·", name: "Eta (lowercase)", keywords: ["eta","greek","efficiency","viscosity"], category: "greek", unicode: "U+03B7", html: "&eta;", css: "\\03B7", description: "Used to represent efficiency and viscosity in physics." },
  { id: "theta", symbol: "Î¸", name: "Theta (lowercase)", keywords: ["theta","greek","angle","temperature"], category: "greek", unicode: "U+03B8", html: "&theta;", css: "\\03B8", description: "Commonly used to represent angles in geometry and trigonometry." },
  { id: "iota", symbol: "Î¹", name: "Iota (lowercase)", keywords: ["iota","greek","small","bit"], category: "greek", unicode: "U+03B9", html: "&iota;", css: "\\03B9", description: "Ninth Greek letter. 'Not one iota' means not even the smallest amount." },
  { id: "kappa", symbol: "Îº", name: "Kappa (lowercase)", keywords: ["kappa","greek","curvature"], category: "greek", unicode: "U+03BA", html: "&kappa;", css: "\\03BA", description: "Represents curvature, thermal conductivity, and spring constants." },
  { id: "lambda", symbol: "Î»", name: "Lambda (lowercase)", keywords: ["lambda","greek","wavelength","function"], category: "greek", unicode: "U+03BB", html: "&lambda;", css: "\\03BB", description: "Represents wavelength and lambda functions in programming." },
  { id: "mu", symbol: "Î¼", name: "Mu (lowercase)", keywords: ["mu","greek","micro","mean"], category: "greek", unicode: "U+03BC", html: "&mu;", css: "\\03BC", description: "Represents micro- prefix (10â»â¶), population mean, and friction coefficient." },
  { id: "nu", symbol: "Î½", name: "Nu (lowercase)", keywords: ["nu","greek","frequency"], category: "greek", unicode: "U+03BD", html: "&nu;", css: "\\03BD", description: "Represents frequency in physics." },
  { id: "xi", symbol: "Î¾", name: "Xi (lowercase)", keywords: ["xi","greek","random"], category: "greek", unicode: "U+03BE", html: "&xi;", css: "\\03BE", description: "Used in mathematics and physics." },
  { id: "omicron", symbol: "Î¿", name: "Omicron (lowercase)", keywords: ["omicron","greek","o"], category: "greek", unicode: "U+03BF", html: "&#959;", css: "\\03BF", description: "Fifteenth letter of the Greek alphabet." },
  { id: "pi-lower", symbol: "Ï€", name: "Pi (lowercase)", keywords: ["pi","greek","circle","ratio"], category: "greek", unicode: "U+03C0", html: "&pi;", css: "\\03C0", description: "The mathematical constant Ï€ â‰ˆ 3.14159..." },
  { id: "rho", symbol: "Ï", name: "Rho (lowercase)", keywords: ["rho","greek","density","correlation"], category: "greek", unicode: "U+03C1", html: "&rho;", css: "\\03C1", description: "Represents density, resistivity, and correlation coefficient." },
  { id: "sigma-lower", symbol: "Ïƒ", name: "Sigma (lowercase)", keywords: ["sigma","greek","standard deviation","stress"], category: "greek", unicode: "U+03C3", html: "&sigma;", css: "\\03C3", description: "Represents standard deviation and stress in mechanics." },
  { id: "tau", symbol: "Ï„", name: "Tau (lowercase)", keywords: ["tau","greek","time","torque"], category: "greek", unicode: "U+03C4", html: "&tau;", css: "\\03C4", description: "Represents torque, shear stress, and 2Ï€." },
  { id: "phi", symbol: "Ï†", name: "Phi (lowercase)", keywords: ["phi","greek","golden ratio","flux"], category: "greek", unicode: "U+03C6", html: "&phi;", css: "\\03C6", description: "Represents the golden ratio (1.618) and magnetic flux." },
  { id: "chi", symbol: "Ï‡", name: "Chi (lowercase)", keywords: ["chi","greek","statistics","chi-squared"], category: "greek", unicode: "U+03C7", html: "&chi;", css: "\\03C7", description: "Used in chi-squared test and electric susceptibility." },
  { id: "psi", symbol: "Ïˆ", name: "Psi (lowercase)", keywords: ["psi","greek","wave function","psychology"], category: "greek", unicode: "U+03C8", html: "&psi;", css: "\\03C8", description: "Represents the quantum wave function." },
  { id: "omega", symbol: "Ï‰", name: "Omega (lowercase)", keywords: ["omega","greek","angular","frequency"], category: "greek", unicode: "U+03C9", html: "&omega;", css: "\\03C9", description: "Represents angular frequency and the last or final element." },
  { id: "omega-upper", symbol: "Î©", name: "Omega (uppercase)", keywords: ["omega","greek","ohm","resistance"], category: "greek", unicode: "U+03A9", html: "&Omega;", css: "\\03A9", description: "Uppercase omega, used for electrical resistance (ohms)." },

  // â”€â”€â”€ LEGAL & TRADE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "copyright", symbol: "Â©", name: "Copyright Sign", keywords: ["copyright","legal","intellectual property","circle c"], category: "legal", unicode: "U+00A9", html: "&copy;", css: "\\00A9", description: "Indicates copyright ownership of creative works.", shortcut: { mac: "Option+G", windows: "Alt+0169" } },
  { id: "registered", symbol: "Â®", name: "Registered Trademark", keywords: ["registered","trademark","brand","circle r"], category: "legal", unicode: "U+00AE", html: "&reg;", css: "\\00AE", description: "Indicates a registered trademark with a government body.", shortcut: { mac: "Option+R", windows: "Alt+0174" } },
  { id: "trademark", symbol: "â„¢", name: "Trade Mark Sign", keywords: ["trademark","brand","tm","trade mark"], category: "legal", unicode: "U+2122", html: "&trade;", css: "\\2122", description: "Indicates an unregistered trademark.", shortcut: { mac: "Option+2", windows: "Alt+0153" } },
  { id: "service-mark", symbol: "â„ ", name: "Service Mark", keywords: ["service mark","sm","brand"], category: "legal", unicode: "U+2120", html: "&#8480;", css: "\\2120", description: "Similar to trademark but for services rather than goods." },
  { id: "sound-recording", symbol: "â„—", name: "Sound Recording Copyright", keywords: ["phonogram","sound","recording","copyright"], category: "legal", unicode: "U+2117", html: "&#8471;", css: "\\2117", description: "Copyright symbol specifically for sound recordings." },
  { id: "section", symbol: "Â§", name: "Section Sign", keywords: ["section","paragraph","law","legal"], category: "legal", unicode: "U+00A7", html: "&sect;", css: "\\00A7", description: "Used in legal and legislative documents to refer to sections.", shortcut: { mac: "Option+6", windows: "Alt+0167" } },
  { id: "paragraph", symbol: "Â¶", name: "Pilcrow", keywords: ["paragraph","pilcrow","mark","proofreading"], category: "legal", unicode: "U+00B6", html: "&para;", css: "\\00B6", description: "The paragraph mark, also called a pilcrow.", shortcut: { mac: "Option+7", windows: "Alt+0182" } },
  { id: "dagger", symbol: "â€ ", name: "Dagger", keywords: ["dagger","footnote","deceased","cross"], category: "legal", unicode: "U+2020", html: "&dagger;", css: "\\2020", description: "Used as a footnote marker and to indicate a deceased person.", shortcut: { windows: "Alt+0134" } },
  { id: "double-dagger", symbol: "â€¡", name: "Double Dagger", keywords: ["double dagger","footnote","diesis"], category: "legal", unicode: "U+2021", html: "&Dagger;", css: "\\2021", description: "A second-level footnote marker.", shortcut: { windows: "Alt+0135" } },

  // â”€â”€â”€ SHAPES & STARS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "star-filled", symbol: "â˜…", name: "Black Star", keywords: ["star","filled","rating","favorite"], category: "shapes", unicode: "U+2605", html: "&#9733;", css: "\\2605", description: "A solid filled star, used for ratings and favorites." },
  { id: "star-outline", symbol: "â˜†", name: "White Star", keywords: ["star","outline","empty","rating"], category: "shapes", unicode: "U+2606", html: "&#9734;", css: "\\2606", description: "An outline star, used for empty ratings." },
  { id: "heart-filled", symbol: "â™¥", name: "Black Heart Suit", keywords: ["heart","love","suit","cards"], category: "shapes", unicode: "U+2665", html: "&#9829;", css: "\\2665", description: "A solid heart, used for love and the card suit." },
  { id: "heart-outline", symbol: "â™¡", name: "White Heart Suit", keywords: ["heart","outline","love","empty"], category: "shapes", unicode: "U+2661", html: "&#9825;", css: "\\2661", description: "An outline heart." },
  { id: "diamond-filled", symbol: "â™¦", name: "Black Diamond Suit", keywords: ["diamond","card","suit","rhombus"], category: "shapes", unicode: "U+2666", html: "&#9830;", css: "\\2666", description: "A solid diamond, representing the card suit." },
  { id: "diamond-outline", symbol: "â—‡", name: "White Diamond", keywords: ["diamond","outline","rhombus"], category: "shapes", unicode: "U+25C7", html: "&#9671;", css: "\\25C7", description: "An outline diamond shape." },
  { id: "club-filled", symbol: "â™£", name: "Black Club Suit", keywords: ["club","card","suit","trefoil"], category: "shapes", unicode: "U+2663", html: "&#9827;", css: "\\2663", description: "The solid club card suit." },
  { id: "spade-filled", symbol: "â™ ", name: "Black Spade Suit", keywords: ["spade","card","suit"], category: "shapes", unicode: "U+2660", html: "&#9824;", css: "\\2660", description: "The solid spade card suit." },
  { id: "circle-filled", symbol: "â—", name: "Black Circle", keywords: ["circle","dot","bullet","filled"], category: "shapes", unicode: "U+25CF", html: "&#9679;", css: "\\25CF", description: "A solid filled circle." },
  { id: "circle-outline", symbol: "â—‹", name: "White Circle", keywords: ["circle","outline","empty","ring"], category: "shapes", unicode: "U+25CB", html: "&#9675;", css: "\\25CB", description: "An outline circle." },
  { id: "square-filled", symbol: "â– ", name: "Black Square", keywords: ["square","filled","block"], category: "shapes", unicode: "U+25A0", html: "&#9632;", css: "\\25A0", description: "A solid filled square." },
  { id: "square-outline", symbol: "â–¡", name: "White Square", keywords: ["square","outline","empty","checkbox"], category: "shapes", unicode: "U+25A1", html: "&#9633;", css: "\\25A1", description: "An outline square, often used as a checkbox." },
  { id: "triangle-up", symbol: "â–²", name: "Black Up-Pointing Triangle", keywords: ["triangle","up","arrow","increase"], category: "shapes", unicode: "U+25B2", html: "&#9650;", css: "\\25B2", description: "Solid upward-pointing triangle." },
  { id: "triangle-down", symbol: "â–¼", name: "Black Down-Pointing Triangle", keywords: ["triangle","down","arrow","decrease"], category: "shapes", unicode: "U+25BC", html: "&#9660;", css: "\\25BC", description: "Solid downward-pointing triangle." },
  { id: "snowflake", symbol: "â„", name: "Snowflake", keywords: ["snowflake","snow","winter","cold"], category: "shapes", unicode: "U+2744", html: "&#10052;", css: "\\2744", description: "Represents snow, winter, or coolness." },
  { id: "flower", symbol: "âœ¿", name: "Black Florette", keywords: ["flower","floral","petal","decorative"], category: "shapes", unicode: "U+273F", html: "&#10047;", css: "\\273F", description: "A decorative flower shape." },
  { id: "cross", symbol: "âœ", name: "Latin Cross", keywords: ["cross","christian","religion","plus"], category: "shapes", unicode: "U+271D", html: "&#10013;", css: "\\271D", description: "The Latin cross, a Christian religious symbol." },
  { id: "checkmark", symbol: "âœ“", name: "Check Mark", keywords: ["check","tick","correct","yes","done"], category: "shapes", unicode: "U+2713", html: "&#10003;", css: "\\2713", description: "A tick or check mark indicating correctness or completion." },
  { id: "heavy-check", symbol: "âœ”", name: "Heavy Check Mark", keywords: ["check","tick","bold","heavy","done"], category: "shapes", unicode: "U+2714", html: "&#10004;", css: "\\2714", description: "A heavier, bolder check mark." },
  { id: "x-mark", symbol: "âœ—", name: "Ballot X", keywords: ["x","cross","wrong","no","incorrect"], category: "shapes", unicode: "U+2717", html: "&#10007;", css: "\\2717", description: "An X mark indicating incorrectness or deletion." },
  { id: "heavy-x", symbol: "âœ˜", name: "Heavy Ballot X", keywords: ["x","cross","bold","heavy","no"], category: "shapes", unicode: "U+2718", html: "&#10008;", css: "\\2718", description: "A heavier X mark." },

  // â”€â”€â”€ PUNCTUATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "left-double-quote", symbol: "\u201C", name: "Left Double Quotation Mark", keywords: ["quote","open","typographic","curly"], category: "punctuation", unicode: "U+201C", html: "&ldquo;", css: "\\201C", description: "Typographic opening double quotation mark.", shortcut: { mac: "Option+[" } },
  { id: "right-double-quote", symbol: "\u201D", name: "Right Double Quotation Mark", keywords: ["quote","close","typographic","curly"], category: "punctuation", unicode: "U+201D", html: "&rdquo;", css: "\\201D", description: "Typographic closing double quotation mark.", shortcut: { mac: "Option+Shift+[" } },
  { id: "left-single-quote", symbol: "\u2018", name: "Left Single Quotation Mark", keywords: ["apostrophe","open","single","curly"], category: "punctuation", unicode: "U+2018", html: "&lsquo;", css: "\\2018", description: "Typographic opening single quotation mark.", shortcut: { mac: "Option+]" } },
  { id: "right-single-quote", symbol: "\u2019", name: "Right Single Quotation Mark", keywords: ["apostrophe","close","single","curly"], category: "punctuation", unicode: "U+2019", html: "&rsquo;", css: "\\2019", description: "Typographic closing single quotation mark and apostrophe.", shortcut: { mac: "Option+Shift+]" } },
  { id: "double-angle-left", symbol: "Â«", name: "Left Double Angle Quotes", keywords: ["guillemet","french","angle","quote"], category: "punctuation", unicode: "U+00AB", html: "&laquo;", css: "\\00AB", description: "French-style double angle quotation marks (guillemets).", shortcut: { mac: "Option+\\", windows: "Alt+0171" } },
  { id: "double-angle-right", symbol: "Â»", name: "Right Double Angle Quotes", keywords: ["guillemet","french","angle","quote"], category: "punctuation", unicode: "U+00BB", html: "&raquo;", css: "\\00BB", description: "French-style closing double angle quotation marks.", shortcut: { mac: "Option+Shift+\\", windows: "Alt+0187" } },
  { id: "em-dash", symbol: "â€”", name: "Em Dash", keywords: ["em dash","dash","long dash","punctuation"], category: "punctuation", unicode: "U+2014", html: "&mdash;", css: "\\2014", description: "The longest dash â€” used for parenthetical statements and breaks.", shortcut: { mac: "Option+Shift+-", windows: "Alt+0151" } },
  { id: "en-dash", symbol: "â€“", name: "En Dash", keywords: ["en dash","dash","range","to"], category: "punctuation", unicode: "U+2013", html: "&ndash;", css: "\\2013", description: "Used for ranges (1â€“10) and compound adjectives.", shortcut: { mac: "Option+-", windows: "Alt+0150" } },
  { id: "ellipsis", symbol: "â€¦", name: "Ellipsis", keywords: ["ellipsis","dots","three dots","omission"], category: "punctuation", unicode: "U+2026", html: "&hellip;", css: "\\2026", description: "Three dots indicating omitted text or trailing off.", shortcut: { mac: "Option+;" } },
  { id: "bullet", symbol: "â€¢", name: "Bullet", keywords: ["bullet","point","list","dot"], category: "punctuation", unicode: "U+2022", html: "&bull;", css: "\\2022", description: "A bullet point for list items.", shortcut: { mac: "Option+8", windows: "Alt+0149" } },
  { id: "middle-dot", symbol: "Â·", name: "Middle Dot", keywords: ["middle dot","interpunct","separator"], category: "punctuation", unicode: "U+00B7", html: "&middot;", css: "\\00B7", description: "An interpunct used as a separator in some languages.", shortcut: { mac: "Option+Shift+9" } },
  { id: "soft-hyphen", symbol: "Â­", name: "Non-breaking Hyphen", keywords: ["hyphen","non breaking","dash"], category: "punctuation", unicode: "U+2011", html: "&#8209;", css: "\\2011", description: "A hyphen that prevents line breaks." },
  { id: "zero-width", symbol: "â€", name: "Zero Width Joiner", keywords: ["zwj","zero width","joiner","invisible"], category: "punctuation", unicode: "U+200D", html: "&#8205;", css: "\\200D", description: "An invisible character used to join emoji sequences." },
  { id: "interrobang", symbol: "â€½", name: "Interrobang", keywords: ["interrobang","?!","question exclamation"], category: "punctuation", unicode: "U+203D", html: "&#8253;", css: "\\203D", description: "A combination of ? and ! for rhetorical questions." },

  // â”€â”€â”€ MUSIC â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "music-note", symbol: "â™©", name: "Quarter Note", keywords: ["note","music","quarter","crotchet"], category: "music", unicode: "U+2669", html: "&#9833;", css: "\\2669", description: "Represents a quarter note (crotchet) in music." },
  { id: "eighth-note", symbol: "â™ª", name: "Eighth Note", keywords: ["note","music","eighth","quaver"], category: "music", unicode: "U+266A", html: "&#9834;", css: "\\266A", description: "Represents an eighth note (quaver)." },
  { id: "beamed-notes", symbol: "â™«", name: "Beamed Eighth Notes", keywords: ["note","music","double","beamed"], category: "music", unicode: "U+266B", html: "&#9835;", css: "\\266B", description: "Two beamed eighth notes." },
  { id: "beamed-two", symbol: "â™¬", name: "Beamed Sixteenth Notes", keywords: ["note","music","sixteenth","semiquaver"], category: "music", unicode: "U+266C", html: "&#9836;", css: "\\266C", description: "Two beamed sixteenth notes." },
  { id: "treble-clef", symbol: "ð„ž", name: "Musical Symbol G Clef", keywords: ["treble","clef","staff","music"], category: "music", unicode: "U+1D11E", html: "&#119070;", css: "\\1D11E", description: "The treble clef (G clef) used in musical notation." },
  { id: "flat", symbol: "â™­", name: "Music Flat Sign", keywords: ["flat","music","note","key"], category: "music", unicode: "U+266D", html: "&#9837;", css: "\\266D", description: "Lowers a pitch by a semitone." },
  { id: "natural", symbol: "â™®", name: "Music Natural Sign", keywords: ["natural","music","note","key"], category: "music", unicode: "U+266E", html: "&#9838;", css: "\\266E", description: "Cancels a previous sharp or flat." },
  { id: "sharp", symbol: "â™¯", name: "Music Sharp Sign", keywords: ["sharp","music","note","key","hashtag"], category: "music", unicode: "U+266F", html: "&#9839;", css: "\\266F", description: "Raises a pitch by a semitone. Not the same as #!" },

  // â”€â”€â”€ CHESS & GAMES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "white-king", symbol: "â™”", name: "White Chess King", keywords: ["chess","king","white","piece"], category: "chess", unicode: "U+2654", html: "&#9812;", css: "\\2654", description: "The white king chess piece." },
  { id: "white-queen", symbol: "â™•", name: "White Chess Queen", keywords: ["chess","queen","white","piece"], category: "chess", unicode: "U+2655", html: "&#9813;", css: "\\2655", description: "The white queen chess piece." },
  { id: "white-rook", symbol: "â™–", name: "White Chess Rook", keywords: ["chess","rook","castle","white"], category: "chess", unicode: "U+2656", html: "&#9814;", css: "\\2656", description: "The white rook (castle) chess piece." },
  { id: "white-bishop", symbol: "â™—", name: "White Chess Bishop", keywords: ["chess","bishop","white","piece"], category: "chess", unicode: "U+2657", html: "&#9815;", css: "\\2657", description: "The white bishop chess piece." },
  { id: "white-knight", symbol: "â™˜", name: "White Chess Knight", keywords: ["chess","knight","horse","white"], category: "chess", unicode: "U+2658", html: "&#9816;", css: "\\2658", description: "The white knight chess piece." },
  { id: "white-pawn", symbol: "â™™", name: "White Chess Pawn", keywords: ["chess","pawn","white","piece"], category: "chess", unicode: "U+2659", html: "&#9817;", css: "\\2659", description: "The white pawn chess piece." },
  { id: "black-king", symbol: "â™š", name: "Black Chess King", keywords: ["chess","king","black","piece"], category: "chess", unicode: "U+265A", html: "&#9818;", css: "\\265A", description: "The black king chess piece." },
  { id: "black-queen", symbol: "â™›", name: "Black Chess Queen", keywords: ["chess","queen","black","piece"], category: "chess", unicode: "U+265B", html: "&#9819;", css: "\\265B", description: "The black queen chess piece." },
  { id: "black-rook", symbol: "â™œ", name: "Black Chess Rook", keywords: ["chess","rook","castle","black"], category: "chess", unicode: "U+265C", html: "&#9820;", css: "\\265C", description: "The black rook chess piece." },
  { id: "black-bishop", symbol: "â™", name: "Black Chess Bishop", keywords: ["chess","bishop","black","piece"], category: "chess", unicode: "U+265D", html: "&#9821;", css: "\\265D", description: "The black bishop chess piece." },
  { id: "black-knight", symbol: "â™ž", name: "Black Chess Knight", keywords: ["chess","knight","horse","black"], category: "chess", unicode: "U+265E", html: "&#9822;", css: "\\265E", description: "The black knight chess piece." },
  { id: "black-pawn", symbol: "â™Ÿ", name: "Black Chess Pawn", keywords: ["chess","pawn","black","piece"], category: "chess", unicode: "U+265F", html: "&#9823;", css: "\\265F", description: "The black pawn chess piece." },
  { id: "die-1", symbol: "âš€", name: "Die Face-1", keywords: ["dice","one","game","roll"], category: "chess", unicode: "U+2680", html: "&#9728;", css: "\\2680", description: "A die showing one pip." },
  { id: "die-6", symbol: "âš…", name: "Die Face-6", keywords: ["dice","six","game","roll"], category: "chess", unicode: "U+2685", html: "&#9733;", css: "\\2685", description: "A die showing six pips." },

  // â”€â”€â”€ ZODIAC â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "aries", symbol: "â™ˆ", name: "Aries", keywords: ["aries","zodiac","ram","march april"], category: "zodiac", unicode: "U+2648", html: "&#9800;", css: "\\2648", description: "The zodiac sign Aries (The Ram), Mar 21 â€“ Apr 19." },
  { id: "taurus", symbol: "â™‰", name: "Taurus", keywords: ["taurus","zodiac","bull","april may"], category: "zodiac", unicode: "U+2649", html: "&#9801;", css: "\\2649", description: "The zodiac sign Taurus (The Bull), Apr 20 â€“ May 20." },
  { id: "gemini", symbol: "â™Š", name: "Gemini", keywords: ["gemini","zodiac","twins","may june"], category: "zodiac", unicode: "U+264A", html: "&#9802;", css: "\\264A", description: "The zodiac sign Gemini (The Twins), May 21 â€“ Jun 20." },
  { id: "cancer", symbol: "â™‹", name: "Cancer", keywords: ["cancer","zodiac","crab","june july"], category: "zodiac", unicode: "U+264B", html: "&#9803;", css: "\\264B", description: "The zodiac sign Cancer (The Crab), Jun 21 â€“ Jul 22." },
  { id: "leo", symbol: "â™Œ", name: "Leo", keywords: ["leo","zodiac","lion","july august"], category: "zodiac", unicode: "U+264C", html: "&#9804;", css: "\\264C", description: "The zodiac sign Leo (The Lion), Jul 23 â€“ Aug 22." },
  { id: "virgo", symbol: "â™", name: "Virgo", keywords: ["virgo","zodiac","maiden","august september"], category: "zodiac", unicode: "U+264D", html: "&#9805;", css: "\\264D", description: "The zodiac sign Virgo (The Maiden), Aug 23 â€“ Sep 22." },
  { id: "libra", symbol: "â™Ž", name: "Libra", keywords: ["libra","zodiac","scales","september october"], category: "zodiac", unicode: "U+264E", html: "&#9806;", css: "\\264E", description: "The zodiac sign Libra (The Scales), Sep 23 â€“ Oct 22." },
  { id: "scorpio", symbol: "â™", name: "Scorpio", keywords: ["scorpio","zodiac","scorpion","october november"], category: "zodiac", unicode: "U+264F", html: "&#9807;", css: "\\264F", description: "The zodiac sign Scorpio (The Scorpion), Oct 23 â€“ Nov 21." },
  { id: "sagittarius", symbol: "â™", name: "Sagittarius", keywords: ["sagittarius","zodiac","archer","november december"], category: "zodiac", unicode: "U+2650", html: "&#9808;", css: "\\2650", description: "The zodiac sign Sagittarius (The Archer), Nov 22 â€“ Dec 21." },
  { id: "capricorn", symbol: "â™‘", name: "Capricorn", keywords: ["capricorn","zodiac","goat","december january"], category: "zodiac", unicode: "U+2651", html: "&#9809;", css: "\\2651", description: "The zodiac sign Capricorn (The Goat), Dec 22 â€“ Jan 19." },
  { id: "aquarius", symbol: "â™’", name: "Aquarius", keywords: ["aquarius","zodiac","water bearer","january february"], category: "zodiac", unicode: "U+2652", html: "&#9810;", css: "\\2652", description: "The zodiac sign Aquarius (The Water Bearer), Jan 20 â€“ Feb 18." },
  { id: "pisces", symbol: "â™“", name: "Pisces", keywords: ["pisces","zodiac","fish","february march"], category: "zodiac", unicode: "U+2653", html: "&#9811;", css: "\\2653", description: "The zodiac sign Pisces (The Fish), Feb 19 â€“ Mar 20." },

  // â”€â”€â”€ WEATHER & NATURE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "sun", symbol: "â˜€", name: "Black Sun with Rays", keywords: ["sun","solar","sunny","bright","weather"], category: "weather", unicode: "U+2600", html: "&#9728;", css: "\\2600", description: "Represents sunshine and clear weather." },
  { id: "cloud", symbol: "â˜", name: "Cloud", keywords: ["cloud","cloudy","overcast","weather"], category: "weather", unicode: "U+2601", html: "&#9729;", css: "\\2601", description: "Represents cloudy weather." },
  { id: "umbrella", symbol: "â˜‚", name: "Umbrella", keywords: ["umbrella","rain","weather","protection"], category: "weather", unicode: "U+2602", html: "&#9730;", css: "\\2602", description: "Represents rainy weather or protection from rain." },
  { id: "snowman", symbol: "â˜ƒ", name: "Snowman", keywords: ["snowman","snow","winter","cold"], category: "weather", unicode: "U+2603", html: "&#9731;", css: "\\2603", description: "Represents winter and snowfall." },
  { id: "lightning", symbol: "âš¡", name: "High Voltage", keywords: ["lightning","electricity","thunder","fast"], category: "weather", unicode: "U+26A1", html: "&#9889;", css: "\\26A1", description: "Represents electricity, lightning, or high speed." },
  { id: "wind", symbol: "ðŸ’¨", name: "Dashing Away", keywords: ["wind","fast","blow","air"], category: "weather", unicode: "U+1F4A8", html: "&#128168;", css: "\\1F4A8", description: "Represents wind, speed, or air." },
  { id: "droplet", symbol: "ðŸ’§", name: "Droplet", keywords: ["water","drop","rain","liquid"], category: "weather", unicode: "U+1F4A7", html: "&#128167;", css: "\\1F4A7", description: "Represents water, rain, or humidity." },
  { id: "fire", symbol: "ðŸ”¥", name: "Fire", keywords: ["fire","flame","hot","lit","trending"], category: "weather", unicode: "U+1F525", html: "&#128293;", css: "\\1F525", description: "Represents fire, heat, or trending topics." },
  { id: "leaf", symbol: "ðŸƒ", name: "Leaf Fluttering in Wind", keywords: ["leaf","nature","green","wind"], category: "weather", unicode: "U+1F343", html: "&#127811;", css: "\\1F343", description: "Represents nature, leaves, and wind." },
  { id: "crescent-moon", symbol: "â˜½", name: "Crescent Moon", keywords: ["moon","crescent","night","lunar"], category: "weather", unicode: "U+263D", html: "&#9789;", css: "\\263D", description: "Represents the crescent moon and night." },

  // â”€â”€â”€ TECHNICAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "command", symbol: "âŒ˜", name: "Command Key", keywords: ["command","cmd","mac","keyboard","apple"], category: "technical", unicode: "U+2318", html: "&#8984;", css: "\\2318", description: "The Command key symbol on Apple keyboards." },
  { id: "option-key", symbol: "âŒ¥", name: "Option Key", keywords: ["option","alt","mac","keyboard"], category: "technical", unicode: "U+2325", html: "&#8997;", css: "\\2325", description: "The Option/Alt key symbol on Apple keyboards." },
  { id: "shift-key", symbol: "â‡§", name: "Shift Key", keywords: ["shift","keyboard","uppercase","mac"], category: "technical", unicode: "U+21E7", html: "&#8679;", css: "\\21E7", description: "The Shift key symbol on keyboards." },
  { id: "capslock", symbol: "â‡ª", name: "Caps Lock", keywords: ["caps lock","keyboard","uppercase"], category: "technical", unicode: "U+21EA", html: "&#8682;", css: "\\21EA", description: "The Caps Lock key symbol." },
  { id: "delete-key", symbol: "âŒ«", name: "Delete/Backspace", keywords: ["delete","backspace","keyboard","erase"], category: "technical", unicode: "U+232B", html: "&#9003;", css: "\\232B", description: "The Delete (Backspace) key symbol." },
  { id: "escape", symbol: "âŽ‹", name: "Escape Key", keywords: ["escape","esc","keyboard"], category: "technical", unicode: "U+238B", html: "&#9099;", css: "\\238B", description: "The Escape key symbol." },
  { id: "enter-key", symbol: "â†©", name: "Return/Enter", keywords: ["return","enter","keyboard","newline"], category: "technical", unicode: "U+21A9", html: "&#8617;", css: "\\21A9", description: "The Return/Enter key symbol." },
  { id: "tab-key", symbol: "â‡¥", name: "Tab Key", keywords: ["tab","keyboard","indent"], category: "technical", unicode: "U+21E5", html: "&#8677;", css: "\\21E5", description: "The Tab key symbol." },
  { id: "power", symbol: "â»", name: "Power Symbol", keywords: ["power","on off","standby","switch"], category: "technical", unicode: "U+23FB", html: "&#9211;", css: "\\23FB", description: "The universal power on/off symbol." },
  { id: "wifi", symbol: "âŠ›", name: "Circled Asterisk", keywords: ["wifi","network","wireless"], category: "technical", unicode: "U+229B", html: "&#8859;", css: "\\229B", description: "A circled asterisk used in various technical contexts." },
  { id: "gear", symbol: "âš™", name: "Gear", keywords: ["gear","settings","config","cog"], category: "technical", unicode: "U+2699", html: "&#9881;", css: "\\2699", description: "Represents settings, configuration, or mechanical systems." },
  { id: "warning", symbol: "âš ", name: "Warning Sign", keywords: ["warning","caution","alert","danger"], category: "technical", unicode: "U+26A0", html: "&#9888;", css: "\\26A0", description: "Standard warning or caution symbol." },
  { id: "prohibited", symbol: "â›”", name: "No Entry", keywords: ["prohibited","no entry","ban","stop"], category: "technical", unicode: "U+26D4", html: "&#9940;", css: "\\26D4", description: "Means prohibited or no entry." },
  { id: "recycling", symbol: "â™»", name: "Recycling Symbol", keywords: ["recycle","green","eco","environment"], category: "technical", unicode: "U+267B", html: "&#9851;", css: "\\267B", description: "The universal recycling symbol." },
  { id: "at-sign", symbol: "@", name: "At Sign", keywords: ["at","email","mention","address"], category: "technical", unicode: "U+0040", html: "&#64;", css: "\\0040", description: "Used in email addresses and social media mentions." },
  { id: "hash", symbol: "#", name: "Hash / Number Sign", keywords: ["hash","hashtag","number","pound"], category: "technical", unicode: "U+0023", html: "&#35;", css: "\\0023", description: "Used as a number sign and for social media hashtags." },

  // â”€â”€â”€ SUPERSCRIPT & SUBSCRIPT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "super-0", symbol: "â°", name: "Superscript Zero", keywords: ["superscript","zero","exponent","raised"], category: "superscript", unicode: "U+2070", html: "&#8304;", css: "\\2070", description: "Raised zero for exponents and footnotes." },
  { id: "super-1", symbol: "Â¹", name: "Superscript One", keywords: ["superscript","one","exponent","first"], category: "superscript", unicode: "U+00B9", html: "&sup1;", css: "\\00B9", description: "Raised one.", shortcut: { windows: "Alt+0185" } },
  { id: "super-2", symbol: "Â²", name: "Superscript Two", keywords: ["superscript","two","squared","exponent"], category: "superscript", unicode: "U+00B2", html: "&sup2;", css: "\\00B2", description: "Squared â€” raised to the power of 2.", shortcut: { windows: "Alt+0178" } },
  { id: "super-3", symbol: "Â³", name: "Superscript Three", keywords: ["superscript","three","cubed","exponent"], category: "superscript", unicode: "U+00B3", html: "&sup3;", css: "\\00B3", description: "Cubed â€” raised to the power of 3.", shortcut: { windows: "Alt+0179" } },
  { id: "super-4", symbol: "â´", name: "Superscript Four", keywords: ["superscript","four","exponent"], category: "superscript", unicode: "U+2074", html: "&#8308;", css: "\\2074", description: "Raised four." },
  { id: "super-n", symbol: "â¿", name: "Superscript N", keywords: ["superscript","n","variable","exponent"], category: "superscript", unicode: "U+207F", html: "&#8319;", css: "\\207F", description: "Superscript n for variable exponents." },
  { id: "super-plus", symbol: "âº", name: "Superscript Plus", keywords: ["superscript","plus","positive","raised"], category: "superscript", unicode: "U+207A", html: "&#8314;", css: "\\207A", description: "Raised plus sign." },
  { id: "super-minus", symbol: "â»", name: "Superscript Minus", keywords: ["superscript","minus","negative","raised"], category: "superscript", unicode: "U+207B", html: "&#8315;", css: "\\207B", description: "Raised minus sign for negative exponents." },
  { id: "sub-0", symbol: "â‚€", name: "Subscript Zero", keywords: ["subscript","zero","chemical","lowered"], category: "superscript", unicode: "U+2080", html: "&#8320;", css: "\\2080", description: "Lowered zero for chemical formulas and math." },
  { id: "sub-1", symbol: "â‚", name: "Subscript One", keywords: ["subscript","one","chemical","lowered"], category: "superscript", unicode: "U+2081", html: "&#8321;", css: "\\2081", description: "Lowered one." },
  { id: "sub-2", symbol: "â‚‚", name: "Subscript Two", keywords: ["subscript","two","chemical","lowered"], category: "superscript", unicode: "U+2082", html: "&#8322;", css: "\\2082", description: "Lowered two, used in Hâ‚‚O and COâ‚‚." },
  { id: "sub-n", symbol: "â‚™", name: "Subscript N", keywords: ["subscript","n","variable","chemical"], category: "superscript", unicode: "U+2099", html: "&#8345;", css: "\\2099", description: "Subscript n for sequences and formulas." },

  // â”€â”€â”€ UI & INTERFACE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { id: "info", symbol: "â„¹", name: "Information", keywords: ["info","information","help","i"], category: "ui", unicode: "U+2139", html: "&#8505;", css: "\\2139", description: "Information symbol, used in tooltips and help sections." },
  { id: "checkmark-ui", symbol: "âœ…", name: "White Heavy Check Mark", keywords: ["check","done","complete","yes","success"], category: "ui", unicode: "U+2705", html: "&#9989;", css: "\\2705", description: "Green check mark emoji for success states." },
  { id: "cross-ui", symbol: "âŒ", name: "Cross Mark", keywords: ["cross","x","error","no","delete"], category: "ui", unicode: "U+274C", html: "&#10060;", css: "\\274C", description: "Red cross mark for errors and deletion." },
  { id: "star-ui", symbol: "â­", name: "Star", keywords: ["star","rating","favorite","yellow"], category: "ui", unicode: "U+2B50", html: "&#11088;", css: "\\2B50", description: "Yellow star for ratings." },
  { id: "heart-ui", symbol: "â¤", name: "Heavy Black Heart", keywords: ["heart","love","like","favorite"], category: "ui", unicode: "U+2764", html: "&#10084;", css: "\\2764", description: "Heart for love and favorites." },
  { id: "search", symbol: "ðŸ”", name: "Magnifying Glass Left", keywords: ["search","find","magnify","look"], category: "ui", unicode: "U+1F50D", html: "&#128269;", css: "\\1F50D", description: "Magnifying glass pointing left, for search functions." },
  { id: "lock", symbol: "ðŸ”’", name: "Locked", keywords: ["lock","secure","private","closed"], category: "ui", unicode: "U+1F512", html: "&#128274;", css: "\\1F512", description: "A locked padlock for security and privacy." },
  { id: "unlock", symbol: "ðŸ”“", name: "Unlocked", keywords: ["unlock","open","public","access"], category: "ui", unicode: "U+1F513", html: "&#128275;", css: "\\1F513", description: "An unlocked padlock." },
  { id: "bell", symbol: "ðŸ””", name: "Bell", keywords: ["bell","notification","alert","ring"], category: "ui", unicode: "U+1F514", html: "&#128276;", css: "\\1F514", description: "A bell for notifications and alerts." },
  { id: "envelope", symbol: "âœ‰", name: "Envelope", keywords: ["envelope","email","mail","letter","message"], category: "ui", unicode: "U+2709", html: "&#9993;", css: "\\2709", description: "An envelope representing email or mail." },
  { id: "phone", symbol: "â˜Ž", name: "Telephone", keywords: ["phone","call","telephone","contact"], category: "ui", unicode: "U+260E", html: "&#9742;", css: "\\260E", description: "Old-style telephone handset." },
  { id: "home", symbol: "âŒ‚", name: "House", keywords: ["home","house","building","shelter"], category: "ui", unicode: "U+2302", html: "&#8962;", css: "\\2302", description: "A house symbol for home buttons." },
  { id: "play", symbol: "â–¶", name: "Black Right-Pointing Triangle", keywords: ["play","start","begin","video"], category: "ui", unicode: "U+25B6", html: "&#9654;", css: "\\25B6", description: "Play button symbol." },
  { id: "pause", symbol: "â¸", name: "Double Vertical Bar", keywords: ["pause","stop","break","hold"], category: "ui", unicode: "U+23F8", html: "&#9208;", css: "\\23F8", description: "Pause button symbol." },
];

export function getSymbolsByCategory(categoryId: string): Symbol[] {
  return symbols.filter(s => s.category === categoryId);
}

export function getSymbolBySlug(slug: string): Symbol | undefined {
  return symbols.find(s => s.id === slug);
}

export function searchSymbols(query: string): Symbol[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return symbols.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.symbol.includes(q) ||
    s.keywords.some(k => k.includes(q)) ||
    s.description.toLowerCase().includes(q)
  );
}

export function getPopularSymbols(): Symbol[] {
  const popularIds = [
    "copyright","trademark","registered","right-arrow","heart-filled",
    "star-filled","checkmark","em-dash","ellipsis","degree","infinity",
    "pi","not-equal","approximately","euro","pound","bullet","theta",
    "alpha","omega","command","heavy-check","x-mark","snowflake"
  ];
  return popularIds.map(id => symbols.find(s => s.id === id)!).filter(Boolean);
}
// Merged by content bot — do not edit this block
const _existingSymIds = new Set(symbols.map(s => s.id));
symbols.push(...generatedSymbols.filter(s => !_existingSymIds.has(s.id)));
