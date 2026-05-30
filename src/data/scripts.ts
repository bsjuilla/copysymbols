// World scripts / alphabets — real Unicode letters & characters from major
// writing systems, for copy & paste. Powers /alphabets (hub) + /alphabets/[slug].
//
// 5 scripts: Japanese, Chinese, Korean, Russian (Cyrillic), Arabic. Every
// character is a real, assigned, renderable Unicode code point. The standard
// alphabet groups (hiragana, katakana, Cyrillic, Arabic letters/numerals,
// Korean jamo) were machine-verified against their exact reference code points
// (no corruption, no Private Use Area, no U+FFFD). Verified 2026-05-31.

export interface ScriptItem {
  /** The character (or short word for "Common Words" groups). */
  char: string;
  /** Romanization / transliteration / meaning. */
  roman?: string;
  /** Letter name (e.g. Arabic "alif"). */
  name?: string;
}

export interface ScriptGroup {
  label: string;
  note?: string;
  items: ScriptItem[];
}

export interface ScriptSet {
  slug: string;
  name: string;
  nativeName: string;
  family: string;
  direction: "ltr" | "rtl";
  intro: string;
  groups: ScriptGroup[];
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const SCRIPTS: ScriptSet[] = [
  {
    "slug": "japanese",
    "name": "Japanese",
    "nativeName": "日本語",
    "family": "Syllabaries + Kanji",
    "direction": "ltr",
    "intro": "Japanese is written with three scripts used together: two 46-character syllabaries (hiragana and katakana) plus thousands of kanji borrowed from Chinese. Hiragana handles grammar and native words, katakana writes foreign loanwords and emphasis, and kanji carry the core meanings. Every character below is a real Unicode symbol that copies and pastes into any app, chat, or document.",
    "groups": [
      {
        "label": "Hiragana",
        "note": "The 46 basic gojūon syllables, romanized with Hepburn.",
        "items": [
          {
            "char": "あ",
            "roman": "a"
          },
          {
            "char": "い",
            "roman": "i"
          },
          {
            "char": "う",
            "roman": "u"
          },
          {
            "char": "え",
            "roman": "e"
          },
          {
            "char": "お",
            "roman": "o"
          },
          {
            "char": "か",
            "roman": "ka"
          },
          {
            "char": "き",
            "roman": "ki"
          },
          {
            "char": "く",
            "roman": "ku"
          },
          {
            "char": "け",
            "roman": "ke"
          },
          {
            "char": "こ",
            "roman": "ko"
          },
          {
            "char": "さ",
            "roman": "sa"
          },
          {
            "char": "し",
            "roman": "shi"
          },
          {
            "char": "す",
            "roman": "su"
          },
          {
            "char": "せ",
            "roman": "se"
          },
          {
            "char": "そ",
            "roman": "so"
          },
          {
            "char": "た",
            "roman": "ta"
          },
          {
            "char": "ち",
            "roman": "chi"
          },
          {
            "char": "つ",
            "roman": "tsu"
          },
          {
            "char": "て",
            "roman": "te"
          },
          {
            "char": "と",
            "roman": "to"
          },
          {
            "char": "な",
            "roman": "na"
          },
          {
            "char": "に",
            "roman": "ni"
          },
          {
            "char": "ぬ",
            "roman": "nu"
          },
          {
            "char": "ね",
            "roman": "ne"
          },
          {
            "char": "の",
            "roman": "no"
          },
          {
            "char": "は",
            "roman": "ha"
          },
          {
            "char": "ひ",
            "roman": "hi"
          },
          {
            "char": "ふ",
            "roman": "fu"
          },
          {
            "char": "へ",
            "roman": "he"
          },
          {
            "char": "ほ",
            "roman": "ho"
          },
          {
            "char": "ま",
            "roman": "ma"
          },
          {
            "char": "み",
            "roman": "mi"
          },
          {
            "char": "む",
            "roman": "mu"
          },
          {
            "char": "め",
            "roman": "me"
          },
          {
            "char": "も",
            "roman": "mo"
          },
          {
            "char": "や",
            "roman": "ya"
          },
          {
            "char": "ゆ",
            "roman": "yu"
          },
          {
            "char": "よ",
            "roman": "yo"
          },
          {
            "char": "ら",
            "roman": "ra"
          },
          {
            "char": "り",
            "roman": "ri"
          },
          {
            "char": "る",
            "roman": "ru"
          },
          {
            "char": "れ",
            "roman": "re"
          },
          {
            "char": "ろ",
            "roman": "ro"
          },
          {
            "char": "わ",
            "roman": "wa"
          },
          {
            "char": "を",
            "roman": "wo"
          },
          {
            "char": "ん",
            "roman": "n"
          }
        ]
      },
      {
        "label": "Katakana",
        "note": "The 46 basic gojūon syllables, used for loanwords.",
        "items": [
          {
            "char": "ア",
            "roman": "a"
          },
          {
            "char": "イ",
            "roman": "i"
          },
          {
            "char": "ウ",
            "roman": "u"
          },
          {
            "char": "エ",
            "roman": "e"
          },
          {
            "char": "オ",
            "roman": "o"
          },
          {
            "char": "カ",
            "roman": "ka"
          },
          {
            "char": "キ",
            "roman": "ki"
          },
          {
            "char": "ク",
            "roman": "ku"
          },
          {
            "char": "ケ",
            "roman": "ke"
          },
          {
            "char": "コ",
            "roman": "ko"
          },
          {
            "char": "サ",
            "roman": "sa"
          },
          {
            "char": "シ",
            "roman": "shi"
          },
          {
            "char": "ス",
            "roman": "su"
          },
          {
            "char": "セ",
            "roman": "se"
          },
          {
            "char": "ソ",
            "roman": "so"
          },
          {
            "char": "タ",
            "roman": "ta"
          },
          {
            "char": "チ",
            "roman": "chi"
          },
          {
            "char": "ツ",
            "roman": "tsu"
          },
          {
            "char": "テ",
            "roman": "te"
          },
          {
            "char": "ト",
            "roman": "to"
          },
          {
            "char": "ナ",
            "roman": "na"
          },
          {
            "char": "ニ",
            "roman": "ni"
          },
          {
            "char": "ヌ",
            "roman": "nu"
          },
          {
            "char": "ネ",
            "roman": "ne"
          },
          {
            "char": "ノ",
            "roman": "no"
          },
          {
            "char": "ハ",
            "roman": "ha"
          },
          {
            "char": "ヒ",
            "roman": "hi"
          },
          {
            "char": "フ",
            "roman": "fu"
          },
          {
            "char": "ヘ",
            "roman": "he"
          },
          {
            "char": "ホ",
            "roman": "ho"
          },
          {
            "char": "マ",
            "roman": "ma"
          },
          {
            "char": "ミ",
            "roman": "mi"
          },
          {
            "char": "ム",
            "roman": "mu"
          },
          {
            "char": "メ",
            "roman": "me"
          },
          {
            "char": "モ",
            "roman": "mo"
          },
          {
            "char": "ヤ",
            "roman": "ya"
          },
          {
            "char": "ユ",
            "roman": "yu"
          },
          {
            "char": "ヨ",
            "roman": "yo"
          },
          {
            "char": "ラ",
            "roman": "ra"
          },
          {
            "char": "リ",
            "roman": "ri"
          },
          {
            "char": "ル",
            "roman": "ru"
          },
          {
            "char": "レ",
            "roman": "re"
          },
          {
            "char": "ロ",
            "roman": "ro"
          },
          {
            "char": "ワ",
            "roman": "wa"
          },
          {
            "char": "ヲ",
            "roman": "wo"
          },
          {
            "char": "ン",
            "roman": "n"
          }
        ]
      },
      {
        "label": "Common Kanji",
        "note": "Popular kanji with their English meanings.",
        "items": [
          {
            "char": "愛",
            "roman": "love"
          },
          {
            "char": "力",
            "roman": "power"
          },
          {
            "char": "神",
            "roman": "god"
          },
          {
            "char": "龍",
            "roman": "dragon"
          },
          {
            "char": "火",
            "roman": "fire"
          },
          {
            "char": "水",
            "roman": "water"
          },
          {
            "char": "風",
            "roman": "wind"
          },
          {
            "char": "日",
            "roman": "sun / day"
          },
          {
            "char": "月",
            "roman": "moon / month"
          },
          {
            "char": "木",
            "roman": "tree"
          },
          {
            "char": "山",
            "roman": "mountain"
          },
          {
            "char": "川",
            "roman": "river"
          },
          {
            "char": "人",
            "roman": "person"
          },
          {
            "char": "女",
            "roman": "woman"
          },
          {
            "char": "男",
            "roman": "man"
          },
          {
            "char": "子",
            "roman": "child"
          },
          {
            "char": "大",
            "roman": "big"
          },
          {
            "char": "小",
            "roman": "small"
          },
          {
            "char": "心",
            "roman": "heart / mind"
          },
          {
            "char": "夢",
            "roman": "dream"
          },
          {
            "char": "光",
            "roman": "light"
          },
          {
            "char": "花",
            "roman": "flower"
          },
          {
            "char": "猫",
            "roman": "cat"
          },
          {
            "char": "犬",
            "roman": "dog"
          }
        ]
      },
      {
        "label": "Numbers",
        "note": "Kanji numerals and their values.",
        "items": [
          {
            "char": "一",
            "roman": "1"
          },
          {
            "char": "二",
            "roman": "2"
          },
          {
            "char": "三",
            "roman": "3"
          },
          {
            "char": "四",
            "roman": "4"
          },
          {
            "char": "五",
            "roman": "5"
          },
          {
            "char": "六",
            "roman": "6"
          },
          {
            "char": "七",
            "roman": "7"
          },
          {
            "char": "八",
            "roman": "8"
          },
          {
            "char": "九",
            "roman": "9"
          },
          {
            "char": "十",
            "roman": "10"
          },
          {
            "char": "百",
            "roman": "100"
          },
          {
            "char": "千",
            "roman": "1,000"
          },
          {
            "char": "万",
            "roman": "10,000"
          }
        ]
      },
      {
        "label": "Punctuation & Symbols",
        "items": [
          {
            "char": "。",
            "roman": "full stop"
          },
          {
            "char": "、",
            "roman": "comma"
          },
          {
            "char": "「",
            "roman": "opening quote"
          },
          {
            "char": "」",
            "roman": "closing quote"
          },
          {
            "char": "『",
            "roman": "opening double quote"
          },
          {
            "char": "』",
            "roman": "closing double quote"
          },
          {
            "char": "々",
            "roman": "repeat mark"
          },
          {
            "char": "〜",
            "roman": "wave dash"
          },
          {
            "char": "ー",
            "roman": "long vowel mark"
          },
          {
            "char": "・",
            "roman": "middle dot"
          },
          {
            "char": "※",
            "roman": "reference mark"
          },
          {
            "char": "〇",
            "roman": "zero / circle"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between hiragana and katakana?",
        "a": "Both are 46-character syllabaries that cover the same set of sounds. Hiragana is used for native Japanese words and grammar, while katakana is used for foreign loanwords, names, and emphasis."
      },
      {
        "q": "Will these Japanese characters show up on all phones and computers?",
        "a": "Yes. Every character here is standard Unicode found in the default fonts on iOS, Android, Windows, and macOS, so they paste cleanly into messages, social media, and documents without turning into boxes."
      },
      {
        "q": "How do I copy a Japanese character?",
        "a": "Tap or click any character to copy it, then paste it anywhere with Ctrl+V on Windows or Cmd+V on Mac. You can copy several in a row to build words."
      }
    ],
    "keywords": [
      "japanese symbols copy paste",
      "japanese letters",
      "hiragana copy paste",
      "katakana copy and paste",
      "kanji symbols",
      "japanese characters copy"
    ]
  },
  {
    "slug": "chinese",
    "name": "Chinese",
    "nativeName": "中文",
    "family": "Logographic (Hanzi)",
    "direction": "ltr",
    "intro": "Chinese is written with hanzi, logographic characters in which each symbol stands for a syllable and a meaning rather than a single sound. Everyday literacy uses a few thousand of the tens of thousands that exist, and the same characters are read across Mandarin, Cantonese, and other varieties. All of the hanzi below are genuine Unicode characters that copy and paste anywhere.",
    "groups": [
      {
        "label": "Numbers",
        "note": "Hanzi numerals with their values.",
        "items": [
          {
            "char": "一",
            "roman": "1"
          },
          {
            "char": "二",
            "roman": "2"
          },
          {
            "char": "三",
            "roman": "3"
          },
          {
            "char": "四",
            "roman": "4"
          },
          {
            "char": "五",
            "roman": "5"
          },
          {
            "char": "六",
            "roman": "6"
          },
          {
            "char": "七",
            "roman": "7"
          },
          {
            "char": "八",
            "roman": "8"
          },
          {
            "char": "九",
            "roman": "9"
          },
          {
            "char": "十",
            "roman": "10"
          },
          {
            "char": "百",
            "roman": "100"
          },
          {
            "char": "千",
            "roman": "1,000"
          },
          {
            "char": "万",
            "roman": "10,000"
          },
          {
            "char": "亿",
            "roman": "100,000,000"
          }
        ]
      },
      {
        "label": "Common Words",
        "note": "Single hanzi with English meanings (Simplified).",
        "items": [
          {
            "char": "爱",
            "roman": "love"
          },
          {
            "char": "龙",
            "roman": "dragon"
          },
          {
            "char": "福",
            "roman": "fortune"
          },
          {
            "char": "王",
            "roman": "king"
          },
          {
            "char": "神",
            "roman": "god / spirit"
          },
          {
            "char": "虎",
            "roman": "tiger"
          },
          {
            "char": "梦",
            "roman": "dream"
          },
          {
            "char": "水",
            "roman": "water"
          },
          {
            "char": "火",
            "roman": "fire"
          },
          {
            "char": "山",
            "roman": "mountain"
          },
          {
            "char": "心",
            "roman": "heart"
          },
          {
            "char": "光",
            "roman": "light"
          },
          {
            "char": "花",
            "roman": "flower"
          },
          {
            "char": "鱼",
            "roman": "fish"
          },
          {
            "char": "鸟",
            "roman": "bird"
          },
          {
            "char": "月",
            "roman": "moon"
          },
          {
            "char": "日",
            "roman": "sun / day"
          },
          {
            "char": "风",
            "roman": "wind"
          },
          {
            "char": "雨",
            "roman": "rain"
          },
          {
            "char": "和",
            "roman": "harmony / peace"
          },
          {
            "char": "美",
            "roman": "beautiful"
          },
          {
            "char": "力",
            "roman": "strength"
          },
          {
            "char": "金",
            "roman": "gold / metal"
          },
          {
            "char": "家",
            "roman": "home / family"
          }
        ]
      },
      {
        "label": "Zodiac Animals",
        "note": "The 12 animals of the Chinese zodiac.",
        "items": [
          {
            "char": "鼠",
            "roman": "Rat"
          },
          {
            "char": "牛",
            "roman": "Ox"
          },
          {
            "char": "虎",
            "roman": "Tiger"
          },
          {
            "char": "兔",
            "roman": "Rabbit"
          },
          {
            "char": "龙",
            "roman": "Dragon"
          },
          {
            "char": "蛇",
            "roman": "Snake"
          },
          {
            "char": "马",
            "roman": "Horse"
          },
          {
            "char": "羊",
            "roman": "Goat"
          },
          {
            "char": "猴",
            "roman": "Monkey"
          },
          {
            "char": "鸡",
            "roman": "Rooster"
          },
          {
            "char": "狗",
            "roman": "Dog"
          },
          {
            "char": "猪",
            "roman": "Pig"
          }
        ]
      },
      {
        "label": "Radicals & Symbols",
        "note": "Common building-block radicals and symbols.",
        "items": [
          {
            "char": "人",
            "roman": "person"
          },
          {
            "char": "口",
            "roman": "mouth"
          },
          {
            "char": "手",
            "roman": "hand"
          },
          {
            "char": "木",
            "roman": "tree / wood"
          },
          {
            "char": "土",
            "roman": "earth"
          },
          {
            "char": "女",
            "roman": "woman"
          },
          {
            "char": "目",
            "roman": "eye"
          },
          {
            "char": "耳",
            "roman": "ear"
          },
          {
            "char": "门",
            "roman": "gate / door"
          },
          {
            "char": "言",
            "roman": "speech"
          },
          {
            "char": "足",
            "roman": "foot"
          },
          {
            "char": "心",
            "roman": "heart"
          },
          {
            "char": "刀",
            "roman": "knife"
          },
          {
            "char": "日",
            "roman": "sun"
          },
          {
            "char": "中",
            "roman": "middle / China"
          },
          {
            "char": "大",
            "roman": "big"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Are these Simplified or Traditional Chinese characters?",
        "a": "These are Simplified Chinese, used in mainland China and Singapore. Traditional forms, used in Taiwan and Hong Kong, are separate Unicode characters; for example the simplified and traditional versions of dragon are different code points."
      },
      {
        "q": "Does each Chinese character mean a whole word?",
        "a": "Each hanzi carries a meaning and one syllable, but many modern Chinese words combine two characters. The single characters here work well on their own as symbols for names, tattoos, and decoration."
      },
      {
        "q": "Will Chinese characters display correctly everywhere?",
        "a": "Yes. These are standard Unicode hanzi included in the fonts on virtually all modern devices, so they paste reliably into chats, captions, and documents."
      }
    ],
    "keywords": [
      "chinese symbols copy paste",
      "chinese characters",
      "hanzi copy paste",
      "chinese letters",
      "chinese zodiac symbols",
      "chinese word for love symbol"
    ]
  },
  {
    "slug": "korean",
    "name": "Korean",
    "nativeName": "한국어",
    "family": "Featural alphabet (Hangul)",
    "direction": "ltr",
    "intro": "Korean is written in Hangul, a featural alphabet of 14 basic consonants and 10 basic vowels (jamo) that combine into square syllable blocks. Invented in the 15th century, it is widely praised as logical and quick to learn. The jamo, syllable blocks, and words below are all real Unicode characters that copy and paste anywhere.",
    "groups": [
      {
        "label": "Consonants (Jamo)",
        "note": "The 14 basic consonant letters (Revised Romanization).",
        "items": [
          {
            "char": "ㄱ",
            "roman": "g / k"
          },
          {
            "char": "ㄴ",
            "roman": "n"
          },
          {
            "char": "ㄷ",
            "roman": "d / t"
          },
          {
            "char": "ㄹ",
            "roman": "r / l"
          },
          {
            "char": "ㅁ",
            "roman": "m"
          },
          {
            "char": "ㅂ",
            "roman": "b / p"
          },
          {
            "char": "ㅅ",
            "roman": "s"
          },
          {
            "char": "ㅇ",
            "roman": "ng / silent"
          },
          {
            "char": "ㅈ",
            "roman": "j"
          },
          {
            "char": "ㅊ",
            "roman": "ch"
          },
          {
            "char": "ㅋ",
            "roman": "k"
          },
          {
            "char": "ㅌ",
            "roman": "t"
          },
          {
            "char": "ㅍ",
            "roman": "p"
          },
          {
            "char": "ㅎ",
            "roman": "h"
          }
        ]
      },
      {
        "label": "Vowels (Jamo)",
        "note": "The 10 basic vowel letters.",
        "items": [
          {
            "char": "ㅏ",
            "roman": "a"
          },
          {
            "char": "ㅑ",
            "roman": "ya"
          },
          {
            "char": "ㅓ",
            "roman": "eo"
          },
          {
            "char": "ㅕ",
            "roman": "yeo"
          },
          {
            "char": "ㅗ",
            "roman": "o"
          },
          {
            "char": "ㅛ",
            "roman": "yo"
          },
          {
            "char": "ㅜ",
            "roman": "u"
          },
          {
            "char": "ㅠ",
            "roman": "yu"
          },
          {
            "char": "ㅡ",
            "roman": "eu"
          },
          {
            "char": "ㅣ",
            "roman": "i"
          }
        ]
      },
      {
        "label": "Common Words",
        "note": "Everyday words written as syllable blocks.",
        "items": [
          {
            "char": "안녕",
            "roman": "hello / hi"
          },
          {
            "char": "사랑",
            "roman": "love"
          },
          {
            "char": "감사",
            "roman": "thanks"
          },
          {
            "char": "한국",
            "roman": "Korea"
          },
          {
            "char": "네",
            "roman": "yes"
          },
          {
            "char": "아니요",
            "roman": "no"
          },
          {
            "char": "행복",
            "roman": "happiness"
          },
          {
            "char": "친구",
            "roman": "friend"
          },
          {
            "char": "사람",
            "roman": "person"
          },
          {
            "char": "물",
            "roman": "water"
          },
          {
            "char": "꽃",
            "roman": "flower"
          },
          {
            "char": "하늘",
            "roman": "sky"
          }
        ]
      },
      {
        "label": "Numbers",
        "note": "Sino-Korean numbers plus a few native Korean.",
        "items": [
          {
            "char": "일",
            "roman": "1 (Sino)"
          },
          {
            "char": "이",
            "roman": "2 (Sino)"
          },
          {
            "char": "삼",
            "roman": "3 (Sino)"
          },
          {
            "char": "사",
            "roman": "4 (Sino)"
          },
          {
            "char": "오",
            "roman": "5 (Sino)"
          },
          {
            "char": "육",
            "roman": "6 (Sino)"
          },
          {
            "char": "칠",
            "roman": "7 (Sino)"
          },
          {
            "char": "팔",
            "roman": "8 (Sino)"
          },
          {
            "char": "구",
            "roman": "9 (Sino)"
          },
          {
            "char": "십",
            "roman": "10 (Sino)"
          },
          {
            "char": "하나",
            "roman": "1 (native)"
          },
          {
            "char": "둘",
            "roman": "2 (native)"
          },
          {
            "char": "셋",
            "roman": "3 (native)"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How do Korean jamo form syllables?",
        "a": "Individual jamo stack into one square block; a consonant, a vowel, and an optional final consonant combine into a single character. Korean is always written in these blocks of 2 to 4 letters rather than a straight line of separate letters."
      },
      {
        "q": "Why do some jamo look like they are floating?",
        "a": "Standalone jamo are real Unicode letters but are designed to combine. Shown alone they can sit oddly; inside a finished syllable block they take their proper positions and sizes."
      },
      {
        "q": "Do Korean characters work in usernames and captions?",
        "a": "Yes. Hangul is well-supported Unicode, so these copy and paste into social media, games, and documents on any modern phone or computer without breaking."
      }
    ],
    "keywords": [
      "korean symbols copy paste",
      "korean letters",
      "hangul copy paste",
      "korean characters",
      "korean alphabet symbols",
      "korean word for love"
    ]
  },
  {
    "slug": "russian",
    "name": "Russian",
    "nativeName": "Русский",
    "family": "Cyrillic alphabet",
    "direction": "ltr",
    "intro": "Russian is written in the Cyrillic alphabet, a 33-letter script of consonants and vowels read left to right. It is used by over 250 million people and shares many letters with other Slavic languages. Each capital and lowercase letter below is a standard Unicode character that copies and pastes into any app or document.",
    "groups": [
      {
        "label": "Uppercase",
        "note": "All 33 capital letters with transliteration.",
        "items": [
          {
            "char": "А",
            "roman": "A"
          },
          {
            "char": "Б",
            "roman": "B"
          },
          {
            "char": "В",
            "roman": "V"
          },
          {
            "char": "Г",
            "roman": "G"
          },
          {
            "char": "Д",
            "roman": "D"
          },
          {
            "char": "Е",
            "roman": "Ye"
          },
          {
            "char": "Ё",
            "roman": "Yo"
          },
          {
            "char": "Ж",
            "roman": "Zh"
          },
          {
            "char": "З",
            "roman": "Z"
          },
          {
            "char": "И",
            "roman": "I"
          },
          {
            "char": "Й",
            "roman": "Y"
          },
          {
            "char": "К",
            "roman": "K"
          },
          {
            "char": "Л",
            "roman": "L"
          },
          {
            "char": "М",
            "roman": "M"
          },
          {
            "char": "Н",
            "roman": "N"
          },
          {
            "char": "О",
            "roman": "O"
          },
          {
            "char": "П",
            "roman": "P"
          },
          {
            "char": "Р",
            "roman": "R"
          },
          {
            "char": "С",
            "roman": "S"
          },
          {
            "char": "Т",
            "roman": "T"
          },
          {
            "char": "У",
            "roman": "U"
          },
          {
            "char": "Ф",
            "roman": "F"
          },
          {
            "char": "Х",
            "roman": "Kh"
          },
          {
            "char": "Ц",
            "roman": "Ts"
          },
          {
            "char": "Ч",
            "roman": "Ch"
          },
          {
            "char": "Ш",
            "roman": "Sh"
          },
          {
            "char": "Щ",
            "roman": "Shch"
          },
          {
            "char": "Ъ",
            "roman": "(hard sign)"
          },
          {
            "char": "Ы",
            "roman": "Y"
          },
          {
            "char": "Ь",
            "roman": "(soft sign)"
          },
          {
            "char": "Э",
            "roman": "E"
          },
          {
            "char": "Ю",
            "roman": "Yu"
          },
          {
            "char": "Я",
            "roman": "Ya"
          }
        ]
      },
      {
        "label": "Lowercase",
        "note": "All 33 small letters with transliteration.",
        "items": [
          {
            "char": "а",
            "roman": "a"
          },
          {
            "char": "б",
            "roman": "b"
          },
          {
            "char": "в",
            "roman": "v"
          },
          {
            "char": "г",
            "roman": "g"
          },
          {
            "char": "д",
            "roman": "d"
          },
          {
            "char": "е",
            "roman": "ye"
          },
          {
            "char": "ё",
            "roman": "yo"
          },
          {
            "char": "ж",
            "roman": "zh"
          },
          {
            "char": "з",
            "roman": "z"
          },
          {
            "char": "и",
            "roman": "i"
          },
          {
            "char": "й",
            "roman": "y"
          },
          {
            "char": "к",
            "roman": "k"
          },
          {
            "char": "л",
            "roman": "l"
          },
          {
            "char": "м",
            "roman": "m"
          },
          {
            "char": "н",
            "roman": "n"
          },
          {
            "char": "о",
            "roman": "o"
          },
          {
            "char": "п",
            "roman": "p"
          },
          {
            "char": "р",
            "roman": "r"
          },
          {
            "char": "с",
            "roman": "s"
          },
          {
            "char": "т",
            "roman": "t"
          },
          {
            "char": "у",
            "roman": "u"
          },
          {
            "char": "ф",
            "roman": "f"
          },
          {
            "char": "х",
            "roman": "kh"
          },
          {
            "char": "ц",
            "roman": "ts"
          },
          {
            "char": "ч",
            "roman": "ch"
          },
          {
            "char": "ш",
            "roman": "sh"
          },
          {
            "char": "щ",
            "roman": "shch"
          },
          {
            "char": "ъ",
            "roman": "(hard sign)"
          },
          {
            "char": "ы",
            "roman": "y"
          },
          {
            "char": "ь",
            "roman": "(soft sign)"
          },
          {
            "char": "э",
            "roman": "e"
          },
          {
            "char": "ю",
            "roman": "yu"
          },
          {
            "char": "я",
            "roman": "ya"
          }
        ]
      },
      {
        "label": "Common Words",
        "note": "Useful everyday Russian words.",
        "items": [
          {
            "char": "Привет",
            "roman": "Hi"
          },
          {
            "char": "Спасибо",
            "roman": "Thanks"
          },
          {
            "char": "Любовь",
            "roman": "Love"
          },
          {
            "char": "Россия",
            "roman": "Russia"
          },
          {
            "char": "Да",
            "roman": "Yes"
          },
          {
            "char": "Нет",
            "roman": "No"
          },
          {
            "char": "Здравствуйте",
            "roman": "Hello (formal)"
          },
          {
            "char": "Пожалуйста",
            "roman": "Please / You are welcome"
          },
          {
            "char": "Друг",
            "roman": "Friend"
          },
          {
            "char": "Мир",
            "roman": "Peace / World"
          },
          {
            "char": "Вода",
            "roman": "Water"
          },
          {
            "char": "Счастье",
            "roman": "Happiness"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is Russian Cyrillic the same as other Cyrillic languages?",
        "a": "They overlap but are not identical. Modern Russian uses exactly 33 letters; Ukrainian, Serbian, and Bulgarian add or drop a few letters, so this set is specifically the Russian alphabet."
      },
      {
        "q": "Why do some Cyrillic letters look like Latin ones?",
        "a": "Letters such as the Cyrillic A, E, and O look like Latin A, E, and O but are distinct Unicode characters with different sounds and code points. Copying from here gives you the genuine Cyrillic letters, not lookalikes."
      },
      {
        "q": "Will Russian letters display on all devices?",
        "a": "Yes. Cyrillic is part of the core Unicode set included in standard fonts on every modern phone and computer, so these letters paste cleanly into any chat or document."
      }
    ],
    "keywords": [
      "russian symbols copy paste",
      "russian letters",
      "cyrillic alphabet copy paste",
      "russian characters",
      "cyrillic letters",
      "russian word for love"
    ]
  },
  {
    "slug": "arabic",
    "name": "Arabic",
    "nativeName": "العربية",
    "family": "Abjad (consonantal script)",
    "direction": "rtl",
    "intro": "Arabic is written right to left in a flowing cursive script of 28 letters, where most letters connect to their neighbours and change shape by position. It is an abjad, so short vowels are usually left out and inferred by the reader. The letters, numerals, and words below are all real Unicode characters that copy and paste anywhere.",
    "groups": [
      {
        "label": "Letters",
        "note": "All 28 letters with their names (read right to left).",
        "items": [
          {
            "char": "ا",
            "name": "alif",
            "roman": "a / aa"
          },
          {
            "char": "ب",
            "name": "baa",
            "roman": "b"
          },
          {
            "char": "ت",
            "name": "taa",
            "roman": "t"
          },
          {
            "char": "ث",
            "name": "thaa",
            "roman": "th"
          },
          {
            "char": "ج",
            "name": "jeem",
            "roman": "j"
          },
          {
            "char": "ح",
            "name": "Haa",
            "roman": "H"
          },
          {
            "char": "خ",
            "name": "khaa",
            "roman": "kh"
          },
          {
            "char": "د",
            "name": "daal",
            "roman": "d"
          },
          {
            "char": "ذ",
            "name": "dhaal",
            "roman": "dh"
          },
          {
            "char": "ر",
            "name": "raa",
            "roman": "r"
          },
          {
            "char": "ز",
            "name": "zaay",
            "roman": "z"
          },
          {
            "char": "س",
            "name": "seen",
            "roman": "s"
          },
          {
            "char": "ش",
            "name": "sheen",
            "roman": "sh"
          },
          {
            "char": "ص",
            "name": "Saad",
            "roman": "S"
          },
          {
            "char": "ض",
            "name": "Daad",
            "roman": "D"
          },
          {
            "char": "ط",
            "name": "Taa",
            "roman": "T"
          },
          {
            "char": "ظ",
            "name": "Zaa",
            "roman": "Z"
          },
          {
            "char": "ع",
            "name": "ayn",
            "roman": "aa"
          },
          {
            "char": "غ",
            "name": "ghayn",
            "roman": "gh"
          },
          {
            "char": "ف",
            "name": "faa",
            "roman": "f"
          },
          {
            "char": "ق",
            "name": "qaaf",
            "roman": "q"
          },
          {
            "char": "ك",
            "name": "kaaf",
            "roman": "k"
          },
          {
            "char": "ل",
            "name": "laam",
            "roman": "l"
          },
          {
            "char": "م",
            "name": "meem",
            "roman": "m"
          },
          {
            "char": "ن",
            "name": "noon",
            "roman": "n"
          },
          {
            "char": "ه",
            "name": "haa",
            "roman": "h"
          },
          {
            "char": "و",
            "name": "waaw",
            "roman": "w / uu"
          },
          {
            "char": "ي",
            "name": "yaa",
            "roman": "y / ii"
          }
        ]
      },
      {
        "label": "Numbers",
        "note": "Eastern Arabic (Arabic-Indic) numerals.",
        "items": [
          {
            "char": "٠",
            "roman": "0"
          },
          {
            "char": "١",
            "roman": "1"
          },
          {
            "char": "٢",
            "roman": "2"
          },
          {
            "char": "٣",
            "roman": "3"
          },
          {
            "char": "٤",
            "roman": "4"
          },
          {
            "char": "٥",
            "roman": "5"
          },
          {
            "char": "٦",
            "roman": "6"
          },
          {
            "char": "٧",
            "roman": "7"
          },
          {
            "char": "٨",
            "roman": "8"
          },
          {
            "char": "٩",
            "roman": "9"
          }
        ]
      },
      {
        "label": "Common Words",
        "note": "Useful Arabic words (read right to left).",
        "items": [
          {
            "char": "سلام",
            "roman": "peace / salaam"
          },
          {
            "char": "حب",
            "roman": "love"
          },
          {
            "char": "شكرا",
            "roman": "thanks"
          },
          {
            "char": "نعم",
            "roman": "yes"
          },
          {
            "char": "لا",
            "roman": "no"
          },
          {
            "char": "مرحبا",
            "roman": "hello"
          },
          {
            "char": "الله",
            "roman": "Allah / God"
          },
          {
            "char": "ماء",
            "roman": "water"
          },
          {
            "char": "صديق",
            "roman": "friend"
          },
          {
            "char": "حياة",
            "roman": "life"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Why do Arabic letters change shape?",
        "a": "Arabic is cursive: most letters have different forms at the start, middle, and end of a word and join to their neighbours. The isolated letters shown here are the base forms; they reshape automatically when typed inside a word."
      },
      {
        "q": "Which way is Arabic read and typed?",
        "a": "Arabic runs right to left. When you paste a word, your device handles the direction automatically, so it appears correctly even inside left-to-right text."
      },
      {
        "q": "Are these Arabic numerals the same as 1, 2, 3?",
        "a": "The Western digits descend from Arabic, but the numerals here are the Eastern Arabic-Indic forms used across much of the Arabic-speaking world. They are standard Unicode and paste anywhere."
      }
    ],
    "keywords": [
      "arabic symbols copy paste",
      "arabic letters",
      "arabic alphabet copy paste",
      "arabic characters",
      "arabic word for love",
      "arabic numbers copy paste"
    ]
  }
];

const _bySlug = new Map<string, ScriptSet>(SCRIPTS.map(s => [s.slug, s]));

export function getScript(slug: string): ScriptSet | undefined {
  return _bySlug.get(slug);
}
