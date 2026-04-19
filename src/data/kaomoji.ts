import { generatedKaomoji } from "./generated-kaomoji";
export interface Kaomoji {
  id: string;
  face: string;
  name: string;
  mood: string;
  keywords: string[];
}

export const kaomojiCategories = [
  { id: "happy", name: "Happy & Excited", icon: "(＾▽＾)" },
  { id: "love", name: "Love & Affection", icon: "(♡ω♡)" },
  { id: "sad", name: "Sad & Crying", icon: "(╥_╥)" },
  { id: "angry", name: "Angry & Frustrated", icon: "(ノಠ益ಠ)ノ" },
  { id: "surprised", name: "Surprised & Shocked", icon: "(⊙_⊙)" },
  { id: "shy", name: "Shy & Blushing", icon: "(〃▽〃)" },
  { id: "cool", name: "Cool & Confident", icon: "(⌐■_■)" },
  { id: "silly", name: "Silly & Playful", icon: "(≧∇≦)" },
  { id: "waving", name: "Waving & Greeting", icon: "( ´ ▽ ` )ﾉ" },
  { id: "bear", name: "Animals & Creatures", icon: "ʕ•ᴥ•ʔ" },
];

export const kaomoji: Kaomoji[] = [
  // Happy
  { id: "joy-1", face: "(＾▽＾)", name: "Big Smile", mood: "happy", keywords: ["happy","smile","joy","excited"] },
  { id: "joy-2", face: "(◕‿◕)", name: "Soft Smile", mood: "happy", keywords: ["cute","happy","smile"] },
  { id: "joy-3", face: "(≧◡≦)", name: "Big Happy Eyes", mood: "happy", keywords: ["happy","joyful","excited"] },
  { id: "joy-4", face: "ヽ(´▽`)/", name: "Excited Arms Up", mood: "happy", keywords: ["happy","excited","yay","arms"] },
  { id: "joy-5", face: "(＾ω＾)", name: "Cheerful", mood: "happy", keywords: ["happy","cheerful","bright"] },
  { id: "joy-6", face: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", name: "Magic Happy", mood: "happy", keywords: ["happy","magic","sparkle","excited"] },
  { id: "joy-7", face: "٩(◕‿◕｡)۶", name: "Cheerful Arms", mood: "happy", keywords: ["happy","cheering","arms"] },
  { id: "joy-8", face: "(✿◠‿◠)", name: "Flower Smile", mood: "happy", keywords: ["cute","happy","flower","smile"] },
  { id: "joy-9", face: "(*^▽^*)", name: "Grinning", mood: "happy", keywords: ["grin","happy","smile"] },
  { id: "joy-10", face: "(≧∇≦)/", name: "Super Excited", mood: "happy", keywords: ["excited","happy","yay"] },
  { id: "joy-11", face: "ヾ(＾-＾)ノ", name: "Happy Wave", mood: "happy", keywords: ["happy","wave","bye"] },
  { id: "joy-12", face: "(^o^)/", name: "Happy Cheer", mood: "happy", keywords: ["happy","cheer","yay"] },

  // Love
  { id: "love-1", face: "(♡ω♡)", name: "In Love", mood: "love", keywords: ["love","heart","crush","affection"] },
  { id: "love-2", face: "(｡♥‿♥｡)", name: "Heart Eyes", mood: "love", keywords: ["love","heart eyes","adore"] },
  { id: "love-3", face: "(づ｡◕‿‿◕｡)づ", name: "Hug", mood: "love", keywords: ["hug","love","embrace","cuddle"] },
  { id: "love-4", face: "♡(˘▽˘>ԅ( ˘⌣˘)", name: "Love Arrow", mood: "love", keywords: ["love","cupid","heart","arrow"] },
  { id: "love-5", face: "(っ◔◡◔)っ ♥", name: "Giving Heart", mood: "love", keywords: ["love","give","heart","gift"] },
  { id: "love-6", face: "(.づ◡﹏◡)づ.", name: "Pleading Hug", mood: "love", keywords: ["hug","plead","love","arms"] },
  { id: "love-7", face: "(ˆ ⌣ ˆ)♡", name: "Loving Smile", mood: "love", keywords: ["love","smile","heart","sweet"] },
  { id: "love-8", face: "♥(ˆ⌣ˆԅ)", name: "Shy Love", mood: "love", keywords: ["love","shy","cute","heart"] },

  // Sad
  { id: "sad-1", face: "(╥_╥)", name: "Crying", mood: "sad", keywords: ["sad","cry","tears","upset"] },
  { id: "sad-2", face: "(T_T)", name: "Sobbing", mood: "sad", keywords: ["sad","sob","tears","crying"] },
  { id: "sad-3", face: "(；﹏；)", name: "Weeping", mood: "sad", keywords: ["weeping","sad","cry","upset"] },
  { id: "sad-4", face: "(ó﹏ò｡)", name: "Pouty Sad", mood: "sad", keywords: ["pouty","sad","upset","cry"] },
  { id: "sad-5", face: "｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡", name: "Anime Cry", mood: "sad", keywords: ["anime","cry","sad","tears"] },
  { id: "sad-6", face: "(╯︵╰,)", name: "Dejected", mood: "sad", keywords: ["sad","dejected","upset","down"] },
  { id: "sad-7", face: "(/ω＼)", name: "Hiding Sad", mood: "sad", keywords: ["sad","hiding","shy","upset"] },
  { id: "sad-8", face: "(´；ω；`)", name: "Teary Eyes", mood: "sad", keywords: ["teary","sad","cry","emotional"] },

  // Angry
  { id: "angry-1", face: "(ノಠ益ಠ)ノ彡┻━┻", name: "Flip Table", mood: "angry", keywords: ["angry","flip table","rage","frustrated"] },
  { id: "angry-2", face: "( ゜Д゜)", name: "Shocked Angry", mood: "angry", keywords: ["angry","shocked","rage"] },
  { id: "angry-3", face: "(╬ಠ益ಠ)", name: "Rage Face", mood: "angry", keywords: ["rage","angry","mad","frustrated"] },
  { id: "angry-4", face: "ヽ(`Д´)ﾉ", name: "Tantrum", mood: "angry", keywords: ["angry","tantrum","upset","mad"] },
  { id: "angry-5", face: "(≧ロ≦)", name: "Outraged", mood: "angry", keywords: ["angry","outraged","mad","upset"] },
  { id: "angry-6", face: "凸(ಠ_ಠ)凸", name: "Double Middle Finger", mood: "angry", keywords: ["angry","rude","protest","mad"] },

  // Surprised
  { id: "surprised-1", face: "(⊙_⊙)", name: "Wide Eyes", mood: "surprised", keywords: ["surprised","shocked","wide eyes","wow"] },
  { id: "surprised-2", face: "Σ(°△°|||)︴", name: "Total Shock", mood: "surprised", keywords: ["shocked","surprised","omg","wow"] },
  { id: "surprised-3", face: "∑(O_O;)", name: "Gasping", mood: "surprised", keywords: ["gasp","shocked","surprised","oh no"] },
  { id: "surprised-4", face: "(⊙o⊙)", name: "Open Mouth", mood: "surprised", keywords: ["surprised","open mouth","wow"] },
  { id: "surprised-5", face: "(°ロ°)！", name: "Alarmed", mood: "surprised", keywords: ["alarmed","surprised","shocked","alert"] },
  { id: "surprised-6", face: "w(°ｏ°)w", name: "Arms Wide Shock", mood: "surprised", keywords: ["shocked","surprised","wow","arms"] },

  // Shy
  { id: "shy-1", face: "(〃▽〃)", name: "Blushing", mood: "shy", keywords: ["shy","blush","embarrassed","cute"] },
  { id: "shy-2", face: "(*/ω＼*)", name: "Hiding Face", mood: "shy", keywords: ["shy","hiding","embarrassed","blush"] },
  { id: "shy-3", face: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", name: "Very Shy", mood: "shy", keywords: ["very shy","blush","embarrassed"] },
  { id: "shy-4", face: "(*￣▽￣)b", name: "Thumbs Up Shy", mood: "shy", keywords: ["shy","thumbs up","okay","modest"] },
  { id: "shy-5", face: "(✿ヘᴥヘ)", name: "Shy Puppy", mood: "shy", keywords: ["shy","cute","puppy","animal"] },

  // Cool
  { id: "cool-1", face: "(⌐■_■)", name: "Deal With It", mood: "cool", keywords: ["cool","sunglasses","deal with it","swag"] },
  { id: "cool-2", face: "( •_•)>⌐■-■", name: "Putting on Shades", mood: "cool", keywords: ["cool","sunglasses","csi","swag"] },
  { id: "cool-3", face: "ᕙ(⇀‸↼‶)ᕗ", name: "Flexing", mood: "cool", keywords: ["cool","flex","strong","muscle"] },
  { id: "cool-4", face: "(ง'̀-'́)ง", name: "Ready to Fight", mood: "cool", keywords: ["fight","ready","determined","cool"] },
  { id: "cool-5", face: "¯\\_(ツ)_/¯", name: "Shrug", mood: "cool", keywords: ["shrug","whatever","idk","meh"] },
  { id: "cool-6", face: "(￣ー￣)", name: "Smug", mood: "cool", keywords: ["smug","confident","cool","satisfied"] },

  // Silly
  { id: "silly-1", face: "(≧∇≦)", name: "Goofy Laugh", mood: "silly", keywords: ["silly","laugh","goofy","funny"] },
  { id: "silly-2", face: "d(^_^)b", name: "Thumbs Both Up", mood: "silly", keywords: ["thumbs up","both","agree","silly"] },
  { id: "silly-3", face: "(ó‿ò)", name: "Mischievous", mood: "silly", keywords: ["mischievous","evil grin","plotting"] },
  { id: "silly-4", face: "(¬‿¬)", name: "Sly Smile", mood: "silly", keywords: ["sly","smirk","sneaky","plotting"] },
  { id: "silly-5", face: "(ΩДΩ)", name: "Dramatic", mood: "silly", keywords: ["dramatic","silly","overdramatic"] },
  { id: "silly-6", face: "( ˘ ³˘)♥", name: "Blowing Kiss", mood: "silly", keywords: ["kiss","blowing kiss","love","cute"] },
  { id: "silly-7", face: "（づ￣3￣）づ╭❤～", name: "Big Kiss", mood: "silly", keywords: ["kiss","love","hug","heart"] },

  // Waving
  { id: "wave-1", face: "( ´ ▽ ` )ﾉ", name: "Happy Wave", mood: "waving", keywords: ["wave","hello","hi","greet"] },
  { id: "wave-2", face: "(ﾉ◕ヮ◕)ﾉ", name: "Excited Wave", mood: "waving", keywords: ["wave","excited","hello","hi"] },
  { id: "wave-3", face: "ヾ(＾ ∇ ＾)", name: "Cheerful Wave", mood: "waving", keywords: ["wave","cheerful","hello","bye"] },
  { id: "wave-4", face: "o(〃＾▽＾〃)o", name: "Bouncy Greet", mood: "waving", keywords: ["greet","happy","wave","hello"] },
  { id: "wave-5", face: "(￣▽￣)ノ", name: "Casual Wave", mood: "waving", keywords: ["casual","wave","hello","bye"] },

  // Animals
  { id: "bear-1", face: "ʕ•ᴥ•ʔ", name: "Bear", mood: "bear", keywords: ["bear","animal","cute","kawaii"] },
  { id: "bear-2", face: "(=^･ω･^=)", name: "Cat", mood: "bear", keywords: ["cat","kitty","cute","animal"] },
  { id: "bear-3", face: "(•̀ᴗ•́)و", name: "Determined", mood: "bear", keywords: ["determined","motivated","fist pump"] },
  { id: "bear-4", face: "U・ᴥ・U", name: "Dog", mood: "bear", keywords: ["dog","puppy","cute","animal"] },
  { id: "bear-5", face: "(∪｡∪)｡｡｡zzZ", name: "Sleeping", mood: "bear", keywords: ["sleep","zzz","tired","nap"] },
  { id: "bear-6", face: "(´･ω･`)", name: "Sad Bear", mood: "bear", keywords: ["sad","bear","downcast","lonely"] },
  { id: "bear-7", face: "(*ΦωΦ*)", name: "Cat Stare", mood: "bear", keywords: ["cat","stare","intense","animal"] },
  { id: "bear-8", face: "ʕっ•ᴥ•ʔっ", name: "Bear Hug", mood: "bear", keywords: ["bear","hug","cute","embrace"] },
];
const _existingKaoIds=new Set(kaomoji.map(k=>k.id));
kaomoji.push(...generatedKaomoji.filter(k=>!_existingKaoIds.has(k.id)));
