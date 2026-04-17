export interface Creation {
  id: string;
  symbol: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: number;
  likes: number;
  comments: Comment[];
  visibility: "public" | "private";
  promoted: boolean;
  reports: number;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: number;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  joinedAt: number;
  totalLikes: number;
  creationCount: number;
  likedCreations: string[];
}

export const CATEGORIES = [
  "Emoji", "Symbol", "Text Art", "Kaomoji", "Animal",
  "People & Face", "Food", "Nature", "Object", "Abstract",
  "Logo Style", "Other"
];

export const PROMOTION_THRESHOLDS = {
  minLikes: 100,
  minComments: 10,
  minAgeDays: 7,
};

// LocalStorage helpers
export function getCreations(): Creation[] {
  try { return JSON.parse(localStorage.getItem("cc-creations") || "[]"); } catch { return []; }
}

export function saveCreations(c: Creation[]) {
  try { localStorage.setItem("cc-creations", JSON.stringify(c)); } catch {}
}

export function getCurrentUser(): UserProfile | null {
  try { return JSON.parse(localStorage.getItem("cc-user") || "null"); } catch { return null; }
}

export function saveUser(u: UserProfile) {
  try { localStorage.setItem("cc-user", JSON.stringify(u)); } catch {}
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

// Seed with some starter content
export function seedIfEmpty() {
  const existing = getCreations();
  if (existing.length > 0) return;
  const seed: Creation[] = [
    { id: "seed1", symbol: "ʕ•ᴥ•ʔ♡", name: "Love Bear", description: "A cute bear giving love", category: "Animal", tags: ["cute","bear","love"], authorId: "seed", authorName: "SymbolBot", authorAvatar: "🤖", createdAt: Date.now() - 864000000, likes: 247, comments: [{ id: "c1", authorId: "s", authorName: "StarGirl", text: "So cute! 🐻", createdAt: Date.now() - 500000 }], visibility: "public", promoted: true, reports: 0 },
    { id: "seed2", symbol: "✦━━━━━━✦", name: "Star Divider", description: "Elegant star border", category: "Text Art", tags: ["border","star","divider"], authorId: "seed", authorName: "SymbolBot", authorAvatar: "🤖", createdAt: Date.now() - 720000000, likes: 183, comments: [], visibility: "public", promoted: true, reports: 0 },
    { id: "seed3", symbol: "( ˘ ³˘)♥︎", name: "Blowing Kiss", description: "Sending love your way", category: "Kaomoji", tags: ["kiss","love","cute"], authorId: "seed", authorName: "KaoQueen", authorAvatar: "👸", createdAt: Date.now() - 432000000, likes: 156, comments: [{ id: "c2", authorId: "s2", authorName: "EmojiKing", text: "Using this in every message!", createdAt: Date.now() - 200000 }], visibility: "public", promoted: false, reports: 0 },
    { id: "seed4", symbol: "꧁༺ ༻꧂", name: "Royal Frame", description: "Ornamental frame for names", category: "Symbol", tags: ["frame","ornament","royal"], authorId: "seed2", authorName: "ArtMaster", authorAvatar: "🎨", createdAt: Date.now() - 259200000, likes: 94, comments: [], visibility: "public", promoted: false, reports: 0 },
    { id: "seed5", symbol: "🌙⋆｡°✩", name: "Night Sparkle", description: "Moon and stars aesthetic", category: "Emoji", tags: ["moon","stars","aesthetic","night"], authorId: "seed2", authorName: "ArtMaster", authorAvatar: "🎨", createdAt: Date.now() - 172800000, likes: 312, comments: [{ id: "c3", authorId: "s3", authorName: "NightOwl", text: "This is perfect for my bio 🌙", createdAt: Date.now() - 100000 }, { id: "c4", authorId: "s4", authorName: "StarChild", text: "Saved it immediately!", createdAt: Date.now() - 50000 }], visibility: "public", promoted: true, reports: 0 },
    { id: "seed6", symbol: "(づ｡◕‿‿◕｡)づ", name: "Big Hug", description: "Sending a warm hug", category: "Kaomoji", tags: ["hug","love","warm","cute"], authorId: "seed3", authorName: "HugMaster", authorAvatar: "🤗", createdAt: Date.now() - 86400000, likes: 201, comments: [], visibility: "public", promoted: false, reports: 0 },
  ];
  saveCreations(seed);
}
