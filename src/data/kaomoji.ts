import { generatedKaomoji } from './generated-kaomoji';
export interface Kaomoji {
  id: string;
  face: string;
  name: string;
  mood: string;
  keywords: string[];
}

export const kaomojiCategories = [
  { id: "happy", name: "Happy & Excited", icon: "(ï¼¾â–½ï¼¾)" },
  { id: "love", name: "Love & Affection", icon: "(â™¡Ï‰â™¡)" },
  { id: "sad", name: "Sad & Crying", icon: "(â•¥_â•¥)" },
  { id: "angry", name: "Angry & Frustrated", icon: "(ãƒŽà² ç›Šà² )ãƒŽ" },
  { id: "surprised", name: "Surprised & Shocked", icon: "(âŠ™_âŠ™)" },
  { id: "shy", name: "Shy & Blushing", icon: "(ã€ƒâ–½ã€ƒ)" },
  { id: "cool", name: "Cool & Confident", icon: "(âŒâ– _â– )" },
  { id: "silly", name: "Silly & Playful", icon: "(â‰§âˆ‡â‰¦)" },
  { id: "waving", name: "Waving & Greeting", icon: "( Â´ â–½ ` )ï¾‰" },
  { id: "bear", name: "Animals & Creatures", icon: "Ê•â€¢á´¥â€¢Ê”" },
];

export const kaomoji: Kaomoji[] = [
  // Happy
  { id: "joy-1", face: "(ï¼¾â–½ï¼¾)", name: "Big Smile", mood: "happy", keywords: ["happy","smile","joy","excited"] },
  { id: "joy-2", face: "(â—•â€¿â—•)", name: "Soft Smile", mood: "happy", keywords: ["cute","happy","smile"] },
  { id: "joy-3", face: "(â‰§â—¡â‰¦)", name: "Big Happy Eyes", mood: "happy", keywords: ["happy","joyful","excited"] },
  { id: "joy-4", face: "ãƒ½(Â´â–½`)/", name: "Excited Arms Up", mood: "happy", keywords: ["happy","excited","yay","arms"] },
  { id: "joy-5", face: "(ï¼¾Ï‰ï¼¾)", name: "Cheerful", mood: "happy", keywords: ["happy","cheerful","bright"] },
  { id: "joy-6", face: "(ï¾‰â—•ãƒ®â—•)ï¾‰*:ï½¥ï¾Ÿâœ§", name: "Magic Happy", mood: "happy", keywords: ["happy","magic","sparkle","excited"] },
  { id: "joy-7", face: "Ù©(â—•â€¿â—•ï½¡)Û¶", name: "Cheerful Arms", mood: "happy", keywords: ["happy","cheering","arms"] },
  { id: "joy-8", face: "(âœ¿â— â€¿â— )", name: "Flower Smile", mood: "happy", keywords: ["cute","happy","flower","smile"] },
  { id: "joy-9", face: "(*^â–½^*)", name: "Grinning", mood: "happy", keywords: ["grin","happy","smile"] },
  { id: "joy-10", face: "(â‰§âˆ‡â‰¦)/", name: "Super Excited", mood: "happy", keywords: ["excited","happy","yay"] },
  { id: "joy-11", face: "ãƒ¾(ï¼¾-ï¼¾)ãƒŽ", name: "Happy Wave", mood: "happy", keywords: ["happy","wave","bye"] },
  { id: "joy-12", face: "(^o^)/", name: "Happy Cheer", mood: "happy", keywords: ["happy","cheer","yay"] },

  // Love
  { id: "love-1", face: "(â™¡Ï‰â™¡)", name: "In Love", mood: "love", keywords: ["love","heart","crush","affection"] },
  { id: "love-2", face: "(ï½¡â™¥â€¿â™¥ï½¡)", name: "Heart Eyes", mood: "love", keywords: ["love","heart eyes","adore"] },
  { id: "love-3", face: "(ã¥ï½¡â—•â€¿â€¿â—•ï½¡)ã¥", name: "Hug", mood: "love", keywords: ["hug","love","embrace","cuddle"] },
  { id: "love-4", face: "â™¡(Ë˜â–½Ë˜>Ô…( Ë˜âŒ£Ë˜)", name: "Love Arrow", mood: "love", keywords: ["love","cupid","heart","arrow"] },
  { id: "love-5", face: "(ã£â—”â—¡â—”)ã£ â™¥", name: "Giving Heart", mood: "love", keywords: ["love","give","heart","gift"] },
  { id: "love-6", face: "(.ã¥â—¡ï¹â—¡)ã¥.", name: "Pleading Hug", mood: "love", keywords: ["hug","plead","love","arms"] },
  { id: "love-7", face: "(Ë† âŒ£ Ë†)â™¡", name: "Loving Smile", mood: "love", keywords: ["love","smile","heart","sweet"] },
  { id: "love-8", face: "â™¥(Ë†âŒ£Ë†Ô…)", name: "Shy Love", mood: "love", keywords: ["love","shy","cute","heart"] },

  // Sad
  { id: "sad-1", face: "(â•¥_â•¥)", name: "Crying", mood: "sad", keywords: ["sad","cry","tears","upset"] },
  { id: "sad-2", face: "(T_T)", name: "Sobbing", mood: "sad", keywords: ["sad","sob","tears","crying"] },
  { id: "sad-3", face: "(ï¼›ï¹ï¼›)", name: "Weeping", mood: "sad", keywords: ["weeping","sad","cry","upset"] },
  { id: "sad-4", face: "(Ã³ï¹Ã²ï½¡)", name: "Pouty Sad", mood: "sad", keywords: ["pouty","sad","upset","cry"] },
  { id: "sad-5", face: "ï½¡ï¾Ÿ(ï¾ŸÂ´Ï‰`ï¾Ÿ)ï¾Ÿï½¡", name: "Anime Cry", mood: "sad", keywords: ["anime","cry","sad","tears"] },
  { id: "sad-6", face: "(â•¯ï¸µâ•°,)", name: "Dejected", mood: "sad", keywords: ["sad","dejected","upset","down"] },
  { id: "sad-7", face: "(/Ï‰ï¼¼)", name: "Hiding Sad", mood: "sad", keywords: ["sad","hiding","shy","upset"] },
  { id: "sad-8", face: "(Â´ï¼›Ï‰ï¼›`)", name: "Teary Eyes", mood: "sad", keywords: ["teary","sad","cry","emotional"] },

  // Angry
  { id: "angry-1", face: "(ãƒŽà² ç›Šà² )ãƒŽå½¡â”»â”â”»", name: "Flip Table", mood: "angry", keywords: ["angry","flip table","rage","frustrated"] },
  { id: "angry-2", face: "( ã‚œÐ”ã‚œ)", name: "Shocked Angry", mood: "angry", keywords: ["angry","shocked","rage"] },
  { id: "angry-3", face: "(â•¬à² ç›Šà² )", name: "Rage Face", mood: "angry", keywords: ["rage","angry","mad","frustrated"] },
  { id: "angry-4", face: "ãƒ½(`Ð”Â´)ï¾‰", name: "Tantrum", mood: "angry", keywords: ["angry","tantrum","upset","mad"] },
  { id: "angry-5", face: "(â‰§ãƒ­â‰¦)", name: "Outraged", mood: "angry", keywords: ["angry","outraged","mad","upset"] },
  { id: "angry-6", face: "å‡¸(à² _à² )å‡¸", name: "Double Middle Finger", mood: "angry", keywords: ["angry","rude","protest","mad"] },

  // Surprised
  { id: "surprised-1", face: "(âŠ™_âŠ™)", name: "Wide Eyes", mood: "surprised", keywords: ["surprised","shocked","wide eyes","wow"] },
  { id: "surprised-2", face: "Î£(Â°â–³Â°|||)ï¸´", name: "Total Shock", mood: "surprised", keywords: ["shocked","surprised","omg","wow"] },
  { id: "surprised-3", face: "âˆ‘(O_O;)", name: "Gasping", mood: "surprised", keywords: ["gasp","shocked","surprised","oh no"] },
  { id: "surprised-4", face: "(âŠ™oâŠ™)", name: "Open Mouth", mood: "surprised", keywords: ["surprised","open mouth","wow"] },
  { id: "surprised-5", face: "(Â°ãƒ­Â°)ï¼", name: "Alarmed", mood: "surprised", keywords: ["alarmed","surprised","shocked","alert"] },
  { id: "surprised-6", face: "w(Â°ï½Â°)w", name: "Arms Wide Shock", mood: "surprised", keywords: ["shocked","surprised","wow","arms"] },

  // Shy
  { id: "shy-1", face: "(ã€ƒâ–½ã€ƒ)", name: "Blushing", mood: "shy", keywords: ["shy","blush","embarrassed","cute"] },
  { id: "shy-2", face: "(*/Ï‰ï¼¼*)", name: "Hiding Face", mood: "shy", keywords: ["shy","hiding","embarrassed","blush"] },
  { id: "shy-3", face: "(â„ â„â€¢â„Ï‰â„â€¢â„ â„)", name: "Very Shy", mood: "shy", keywords: ["very shy","blush","embarrassed"] },
  { id: "shy-4", face: "(*ï¿£â–½ï¿£)b", name: "Thumbs Up Shy", mood: "shy", keywords: ["shy","thumbs up","okay","modest"] },
  { id: "shy-5", face: "(âœ¿ãƒ˜á´¥ãƒ˜)", name: "Shy Puppy", mood: "shy", keywords: ["shy","cute","puppy","animal"] },

  // Cool
  { id: "cool-1", face: "(âŒâ– _â– )", name: "Deal With It", mood: "cool", keywords: ["cool","sunglasses","deal with it","swag"] },
  { id: "cool-2", face: "( â€¢_â€¢)>âŒâ– -â– ", name: "Putting on Shades", mood: "cool", keywords: ["cool","sunglasses","csi","swag"] },
  { id: "cool-3", face: "á•™(â‡€â€¸â†¼â€¶)á•—", name: "Flexing", mood: "cool", keywords: ["cool","flex","strong","muscle"] },
  { id: "cool-4", face: "(à¸‡'Ì€-'Ì)à¸‡", name: "Ready to Fight", mood: "cool", keywords: ["fight","ready","determined","cool"] },
  { id: "cool-5", face: "Â¯\\_(ãƒ„)_/Â¯", name: "Shrug", mood: "cool", keywords: ["shrug","whatever","idk","meh"] },
  { id: "cool-6", face: "(ï¿£ãƒ¼ï¿£)", name: "Smug", mood: "cool", keywords: ["smug","confident","cool","satisfied"] },

  // Silly
  { id: "silly-1", face: "(â‰§âˆ‡â‰¦)", name: "Goofy Laugh", mood: "silly", keywords: ["silly","laugh","goofy","funny"] },
  { id: "silly-2", face: "d(^_^)b", name: "Thumbs Both Up", mood: "silly", keywords: ["thumbs up","both","agree","silly"] },
  { id: "silly-3", face: "(Ã³â€¿Ã²)", name: "Mischievous", mood: "silly", keywords: ["mischievous","evil grin","plotting"] },
  { id: "silly-4", face: "(Â¬â€¿Â¬)", name: "Sly Smile", mood: "silly", keywords: ["sly","smirk","sneaky","plotting"] },
  { id: "silly-5", face: "(Î©Ð”Î©)", name: "Dramatic", mood: "silly", keywords: ["dramatic","silly","overdramatic"] },
  { id: "silly-6", face: "( Ë˜ Â³Ë˜)â™¥", name: "Blowing Kiss", mood: "silly", keywords: ["kiss","blowing kiss","love","cute"] },
  { id: "silly-7", face: "ï¼ˆã¥ï¿£3ï¿£ï¼‰ã¥â•­â¤ï½ž", name: "Big Kiss", mood: "silly", keywords: ["kiss","love","hug","heart"] },

  // Waving
  { id: "wave-1", face: "( Â´ â–½ ` )ï¾‰", name: "Happy Wave", mood: "waving", keywords: ["wave","hello","hi","greet"] },
  { id: "wave-2", face: "(ï¾‰â—•ãƒ®â—•)ï¾‰", name: "Excited Wave", mood: "waving", keywords: ["wave","excited","hello","hi"] },
  { id: "wave-3", face: "ãƒ¾(ï¼¾ âˆ‡ ï¼¾)", name: "Cheerful Wave", mood: "waving", keywords: ["wave","cheerful","hello","bye"] },
  { id: "wave-4", face: "o(ã€ƒï¼¾â–½ï¼¾ã€ƒ)o", name: "Bouncy Greet", mood: "waving", keywords: ["greet","happy","wave","hello"] },
  { id: "wave-5", face: "(ï¿£â–½ï¿£)ãƒŽ", name: "Casual Wave", mood: "waving", keywords: ["casual","wave","hello","bye"] },

  // Animals
  { id: "bear-1", face: "Ê•â€¢á´¥â€¢Ê”", name: "Bear", mood: "bear", keywords: ["bear","animal","cute","kawaii"] },
  { id: "bear-2", face: "(=^ï½¥Ï‰ï½¥^=)", name: "Cat", mood: "bear", keywords: ["cat","kitty","cute","animal"] },
  { id: "bear-3", face: "(â€¢Ì€á´—â€¢Ì)Ùˆ", name: "Determined", mood: "bear", keywords: ["determined","motivated","fist pump"] },
  { id: "bear-4", face: "Uãƒ»á´¥ãƒ»U", name: "Dog", mood: "bear", keywords: ["dog","puppy","cute","animal"] },
  { id: "bear-5", face: "(âˆªï½¡âˆª)ï½¡ï½¡ï½¡zzZ", name: "Sleeping", mood: "bear", keywords: ["sleep","zzz","tired","nap"] },
  { id: "bear-6", face: "(Â´ï½¥Ï‰ï½¥`)", name: "Sad Bear", mood: "bear", keywords: ["sad","bear","downcast","lonely"] },
  { id: "bear-7", face: "(*Î¦Ï‰Î¦*)", name: "Cat Stare", mood: "bear", keywords: ["cat","stare","intense","animal"] },
  { id: "bear-8", face: "Ê•ã£â€¢á´¥â€¢Ê”ã£", name: "Bear Hug", mood: "bear", keywords: ["bear","hug","cute","embrace"] },
];
// Merged by content bot — do not edit this block
const _existingKaoIds = new Set(kaomoji.map(k => k.id));
kaomoji.push(...generatedKaomoji.filter(k => !_existingKaoIds.has(k.id)));
