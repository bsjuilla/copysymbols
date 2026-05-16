"use client";
import { useState, useEffect, useCallback } from "react";
import { Creation, UserProfile, CATEGORIES, getCreations, saveCreations, getCurrentUser, saveUser, generateId, timeAgo, seedIfEmpty } from "./communityData";

type Tab = "feed" | "hall-of-fame" | "create" | "profile";
type Sort = "newest" | "most-liked" | "weekly";

// ─── Auth Modal ────────────────────────────────────────────────
function AuthModal({ onClose, onSave }: { onClose: () => void; onSave: (u: UserProfile) => void }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("😊");
  const avatars = ["😊","🎨","🌙","⭐","🔥","💎","🦋","🌸","🐻","🤖","👑","🎭","🌊","⚡","🎵"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, width: "100%", maxWidth: 440 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Join Symbol Forge</h2>
        <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 24 }}>Create your profile to start sharing creations</p>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Choose your avatar</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {avatars.map(a => (
              <button key={a} onClick={() => setAvatar(a)} style={{ width: 44, height: 44, borderRadius: 10, fontSize: "1.4rem", background: avatar === a ? "var(--accent-glow)" : "var(--surface)", border: `1px solid ${avatar === a ? "var(--accent)" : "var(--border)"}`, cursor: "pointer" }}>{a}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Display name *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name..." maxLength={30}
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 15, fontFamily: "inherit", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Short bio (optional)</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell the community about yourself..." maxLength={120} rows={2}
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px", color: "var(--text2)", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={() => { if (!name.trim()) return; const u: UserProfile = { id: generateId(), username: name.toLowerCase().replace(/\s+/g,"-"), displayName: name.trim(), bio: bio.trim(), avatar, joinedAt: Date.now(), totalLikes: 0, creationCount: 0, likedCreations: [] }; saveUser(u); onSave(u); }} disabled={!name.trim()}
            style={{ flex: 2, background: name.trim() ? "var(--accent)" : "var(--surface)", border: "none", borderRadius: 8, padding: "10px", color: name.trim() ? "var(--bg)" : "var(--text3)", fontSize: 14, fontWeight: 600, cursor: name.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
            Create Profile ✦
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create Form ────────────────────────────────────────────────
function CreateForm({ user, onPost }: { user: UserProfile; onPost: () => void }) {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState<"public"|"private">("public");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");

  const quickSymbols = ["ʕ•ᴥ•ʔ","(◕‿◕)","✦","★","♡","❤","♥","✿","❀","•","·","꧁","꧂","彡","✨","🌙","💫","⭐","🔥","💎","👑","🌸","🎵","🌊"];

  const handlePost = () => {
    setError("");
    if (!symbol.trim()) return setError("Please add a symbol or emoji.");
    if (!name.trim()) return setError("Please give your creation a name.");
    if (!category) return setError("Please choose a category.");

    const creations = getCreations();
    const todayCreations = creations.filter(c => c.authorId === user.id && Date.now() - c.createdAt < 86400000);
    if (todayCreations.length >= 5) return setError("You can only post 5 creations per day.");

    const exact = creations.find(c => c.symbol === symbol.trim() && c.visibility === "public");
    if (exact) return setError(`This symbol already exists as "${exact.name}".`);

    const newCreation: import("./communityData").Creation = {
      id: generateId(), symbol: symbol.trim(), name: name.trim(), description: desc.trim(),
      category, tags: tags.split(",").map(t => t.trim()).filter(Boolean).slice(0, 5),
      authorId: user.id, authorName: user.displayName, authorAvatar: user.avatar,
      createdAt: Date.now(), likes: 0, comments: [], visibility, promoted: false, reports: 0,
    };
    creations.unshift(newCreation);
    saveCreations(creations);

    const updatedUser = { ...user, creationCount: user.creationCount + 1 };
    saveUser(updatedUser);

    setSymbol(""); setName(""); setDesc(""); setCategory(""); setTags(""); setPreview(false);
    onPost();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div className="section-label">Symbol Forge</div>
      <h2 className="font-display" style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>Create & Share</h2>
      <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 28 }}>Combine symbols, emoji or text art and share it with the community.</p>

      {/* Symbol input */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Your creation *</label>
        <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Type or paste your symbol / emoji combination..."
          style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 16px", color: "var(--text)", fontSize: 22, fontFamily: "serif", outline: "none", marginBottom: 12 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
        <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10 }}>Quick add:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {quickSymbols.map(s => (
            <button key={s} onClick={() => setSymbol(prev => prev + s)}
              style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", fontSize: "1.1rem", cursor: "pointer", color: "var(--text)", transition: "all 0.12s" }}>
              {s}
            </button>
          ))}
        </div>
        {symbol && (
          <div style={{ marginTop: 16, padding: 20, background: "var(--bg3)", borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Preview</div>
            <div style={{ fontSize: "2.5rem", fontFamily: "serif", lineHeight: 1.4 }}>{symbol}</div>
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Give it a name..." maxLength={40}
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Category *</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: category ? "var(--text)" : "var(--text3)", fontSize: 14, fontFamily: "inherit", outline: "none" }}>
            <option value="">Select category...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Description (optional)</label>
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="What is this for?" maxLength={120}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Tags (comma separated, max 5)</label>
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="cute, animal, love, dark..." maxLength={100}
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {(["public","private"] as const).map(v => (
          <button key={v} onClick={() => setVisibility(v)}
            style={{ flex: 1, padding: "10px", borderRadius: 8, border: `1px solid ${visibility === v ? "var(--accent)" : "var(--border)"}`, background: visibility === v ? "var(--accent-glow)" : "var(--surface)", color: visibility === v ? "var(--accent)" : "var(--text2)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
            {v === "public" ? "🌐 Public" : "🔒 Private"}
          </button>
        ))}
      </div>
      {error && <div style={{ background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#ff6464", marginBottom: 14 }}>{error}</div>}
      <button onClick={handlePost} style={{ width: "100%", background: "var(--accent)", border: "none", borderRadius: 10, padding: "14px", color: "var(--bg)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        ✦ Post to Community
      </button>
      <p style={{ fontSize: 12, color: "var(--text3)", textAlign: "center", marginTop: 10 }}>Max 5 posts per day · No image uploads · Must be copy-pasteable text</p>
    </div>
  );
}

// ─── Creation Card ────────────────────────────────────────────────
function CreationCard({ creation, user, onUpdate }: { creation: Creation; user: UserProfile | null; onUpdate: () => void }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);

  const isLiked = user?.likedCreations.includes(creation.id);

  const copy = async () => {
    try { await navigator.clipboard.writeText(creation.symbol); } catch {}
    setCopied(true);
    const toast = document.getElementById("global-toast");
    const sym = document.getElementById("toast-symbol");
    const msg = document.getElementById("toast-message");
    if (toast && sym && msg) { sym.textContent = creation.symbol; msg.textContent = "Copied " + creation.name; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1800); }
    setTimeout(() => setCopied(false), 1800);
  };

  const like = () => {
    if (!user) return;
    const creations = getCreations();
    const idx = creations.findIndex(c => c.id === creation.id);
    if (idx === -1) return;
    const alreadyLiked = user.likedCreations.includes(creation.id);
    creations[idx].likes += alreadyLiked ? -1 : 1;
    saveCreations(creations);
    const newLiked = alreadyLiked ? user.likedCreations.filter(id => id !== creation.id) : [...user.likedCreations, creation.id];
    saveUser({ ...user, likedCreations: newLiked, totalLikes: user.totalLikes + (alreadyLiked ? -1 : 1) });
    onUpdate();
  };

  const addComment = () => {
    if (!user || !commentText.trim()) return;
    const creations = getCreations();
    const idx = creations.findIndex(c => c.id === creation.id);
    if (idx === -1) return;
    creations[idx].comments.push({ id: generateId(), authorId: user.id, authorName: user.displayName, text: commentText.trim(), createdAt: Date.now() });
    saveCreations(creations);
    setCommentText("");
    onUpdate();
  };

  const catColors: Record<string, string> = { "Emoji":"#f59e0b","Symbol":"#6366f1","Text Art":"#10b981","Kaomoji":"#ec4899","Animal":"#22c55e","People & Face":"#f97316","Food":"#ef4444","Nature":"#14b8a6","Object":"#8b5cf6","Abstract":"#64748b","Logo Style":"#c8a96e","Other":"#9090a8" };
  const catColor = catColors[creation.category] || "#9090a8";

  return (
    <div style={{ background: "var(--surface)", border: `1px solid ${creation.promoted ? "var(--accent)" : "var(--border)"}`, borderRadius: 14, overflow: "hidden" }}>
      {creation.promoted && (
        <div style={{ background: "var(--accent)", padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "var(--bg)", display: "flex", alignItems: "center", gap: 6 }}>
          ✦ Community Favourite
        </div>
      )}
      <div style={{ padding: "20px 20px 16px" }}>
        {/* Author */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem" }}>{creation.authorAvatar}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{creation.authorName}</div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{timeAgo(creation.createdAt)}</div>
            </div>
          </div>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: `${catColor}22`, color: catColor, fontWeight: 500 }}>{creation.category}</span>
        </div>

        {/* Symbol */}
        <div style={{ textAlign: "center", padding: "20px 0", fontSize: "2.5rem", fontFamily: "serif", lineHeight: 1.4, background: "var(--bg3)", borderRadius: 10, marginBottom: 14, cursor: "pointer" }} onClick={copy} title="Click to copy">
          {creation.symbol}
        </div>

        {/* Name & desc */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{creation.name}</div>
          {creation.description && <div style={{ fontSize: 13, color: "var(--text2)" }}>{creation.description}</div>}
        </div>

        {/* Tags */}
        {creation.tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {creation.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text3)" }}>#{t}</span>)}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={copy} style={{ flex: 2, background: copied ? "var(--accent)" : "var(--bg3)", border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`, borderRadius: 8, padding: "8px 14px", color: copied ? "var(--bg)" : "var(--text2)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
          <button onClick={like} style={{ flex: 1, background: isLiked ? "rgba(239,68,68,0.1)" : "var(--bg3)", border: `1px solid ${isLiked ? "rgba(239,68,68,0.4)" : "var(--border)"}`, borderRadius: 8, padding: "8px 10px", color: isLiked ? "#ef4444" : "var(--text2)", fontSize: 13, cursor: user ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
            {isLiked ? "♥" : "♡"} {creation.likes}
          </button>
          <button onClick={() => setShowComments(s => !s)} style={{ flex: 1, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", color: "var(--text2)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            💬 {creation.comments.length}
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "16px 20px" }}>
          {creation.comments.length === 0 && <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 12 }}>No comments yet. Be the first!</p>}
          {creation.comments.map(c => (
            <div key={c.id} style={{ marginBottom: 12, display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)" }}>{c.authorName}</span>
                <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 6 }}>{timeAgo(c.createdAt)}</span>
                <p style={{ fontSize: 14, color: "var(--text2)", margin: "2px 0 0" }}>{c.text}</p>
              </div>
            </div>
          ))}
          {user ? (
            <div style={{ display: "flex", gap: 8 }}>
              <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." maxLength={200}
                onKeyDown={e => e.key === "Enter" && addComment()}
                style={{ flex: 1, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", color: "var(--text)", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button onClick={addComment} style={{ background: "var(--accent)", border: "none", borderRadius: 8, padding: "8px 14px", color: "var(--bg)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Post</button>
            </div>
          ) : <p style={{ fontSize: 12, color: "var(--text3)" }}>Sign in to comment.</p>}
        </div>
      )}
    </div>
  );
}

// ─── Hall of Fame ────────────────────────────────────────────────
function HallOfFame({ creations }: { creations: Creation[] }) {
  const top = [...creations].filter(c => c.visibility === "public").sort((a, b) => b.likes - a.likes).slice(0, 10);
  const topWeek = [...creations].filter(c => c.visibility === "public" && Date.now() - c.createdAt < 604800000).sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: "2rem", marginBottom: 8 }}>🏆</div>
        <h2 className="font-display" style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>Hall of Fame</h2>
        <p style={{ fontSize: 15, color: "var(--text2)" }}>The most loved creations of all time</p>
      </div>

      {top.map((c, i) => (
        <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: i < 3 ? "var(--accent)" : "var(--text3)", minWidth: 28 }}>#{i + 1}</span>
          <span style={{ fontSize: "1.8rem", fontFamily: "serif" }}>{c.symbol}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>by {c.authorName} · {c.category}</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#ef4444" }}>♥ {c.likes}</div>
        </div>
      ))}

      {topWeek.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>⚡ Trending This Week</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {topWeek.map(c => (
              <div key={c.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontFamily: "serif", marginBottom: 8 }}>{c.symbol}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#ef4444" }}>♥ {c.likes}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Profile Page ────────────────────────────────────────────────
function ProfilePage({ user, onUpdate }: { user: UserProfile; onUpdate: () => void }) {
  const creations = getCreations().filter(c => c.authorId === user.id);
  const totalLikes = creations.reduce((sum, c) => sum + c.likes, 0);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>{user.avatar}</div>
          <div style={{ flex: 1 }}>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>{user.displayName}</h2>
            <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 8 }}>@{user.username}</p>
            {user.bio && <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{user.bio}</p>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 20 }}>
          {[["Creations", creations.length], ["Total Likes", totalLikes], ["Public", creations.filter(c => c.visibility === "public").length]].map(([label, val]) => (
            <div key={label as string} style={{ background: "var(--bg3)", borderRadius: 10, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>{val}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Your Creations</h3>
      {creations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text3)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✦</div>
          <p>You haven&apos;t posted anything yet. Go create something!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {creations.map(c => (
            <div key={c.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: "1.8rem", fontFamily: "serif", textAlign: "center", marginBottom: 10, padding: 12, background: "var(--bg3)", borderRadius: 8 }}>{c.symbol}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>{c.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text3)" }}>
                <span>{c.category} · {c.visibility}</span>
                <span>♥ {c.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Community Client ────────────────────────────────────────────────
export default function CommunityClient() {
  const [tab, setTab] = useState<Tab>("feed");
  const [sort, setSort] = useState<Sort>("newest");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [creations, setCreations] = useState<Creation[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => {
    setCreations(getCreations());
    setUser(getCurrentUser());
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    seedIfEmpty();
    setUser(getCurrentUser());
    refresh();
  }, [refresh]);

  const publicCreations = creations.filter(c => c.visibility === "public");

  const filtered = publicCreations
    .filter(c => filter === "All" || c.category === filter)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.includes(search) || c.tags.some(t => t.includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sort === "newest") return b.createdAt - a.createdAt;
      if (sort === "most-liked") return b.likes - a.likes;
      if (sort === "weekly") {
        const aW = Date.now() - a.createdAt < 604800000 ? a.likes : 0;
        const bW = Date.now() - b.createdAt < 604800000 ? b.likes : 0;
        return bW - aW;
      }
      return 0;
    });

  const promoted = publicCreations.filter(c => c.promoted || c.likes >= 100);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 48px" }}>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSave={u => { setUser(u); setShowAuth(false); refresh(); }} />}

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 0 32px", borderBottom: "1px solid var(--border)", marginBottom: 32 }}>
        <div style={{ fontSize: "2rem", marginBottom: 8 }}>✦</div>
        <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
          Symbol <span className="gradient-text">Forge</span>
        </h1>
        <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 20, maxWidth: 500, margin: "0 auto 20px" }}>Create and share emoji, symbols and text art. The community votes on the best — top creations get featured sitewide.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 14, color: "var(--text3)" }}>{publicCreations.length} creations · {new Set(publicCreations.map(c => c.authorId)).size} creators</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["feed","hall-of-fame","create","profile"] as Tab[]).map(t => (
            <button key={t} onClick={() => { if (t === "create" && !user) { setShowAuth(true); return; } if (t === "profile" && !user) { setShowAuth(true); return; } setTab(t); }}
              className={`cat-pill ${tab === t ? "active" : ""}`} style={{ textTransform: "capitalize", fontSize: 13 }}>
              {t === "feed" ? "🌐 Feed" : t === "hall-of-fame" ? "🏆 Hall of Fame" : t === "create" ? "✦ Create" : "👤 Profile"}
            </button>
          ))}
        </div>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text2)" }}>
            <span>{user.avatar}</span><span>{user.displayName}</span>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)} style={{ background: "var(--accent)", border: "none", borderRadius: 8, padding: "7px 16px", color: "var(--bg)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Join Free
          </button>
        )}
      </div>

      {/* Promoted strip */}
      {tab === "feed" && promoted.length > 0 && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 14, padding: "16px 20px", marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>✦ Community Favourites</div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {promoted.slice(0, 8).map(c => (
              <div key={c.id} title={c.name} style={{ flexShrink: 0, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", textAlign: "center", cursor: "pointer", minWidth: 80 }}
                onClick={() => navigator.clipboard.writeText(c.symbol)}>
                <div style={{ fontSize: "1.5rem", fontFamily: "serif" }}>{c.symbol}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>♥ {c.likes}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feed */}
      {tab === "feed" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
              <input className="search-input" style={{ paddingLeft: 44 }} placeholder="Search creations..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", color: "var(--text)", fontSize: 13, fontFamily: "inherit", outline: "none" }}>
              <option value="newest">Newest</option>
              <option value="most-liked">Most Liked</option>
              <option value="weekly">This Week</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {["All", ...CATEGORIES].map(c => (
              <button key={c} className={`cat-pill ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)} style={{ fontSize: 12 }}>{c}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 24px", color: "var(--text3)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✦</div>
              <p>No creations found. Be the first to create one!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filtered.map(c => <CreationCard key={c.id + tick} creation={c} user={user} onUpdate={refresh} />)}
            </div>
          )}
        </div>
      )}

      {tab === "hall-of-fame" && <HallOfFame creations={creations} />}
      {tab === "create" && user && <CreateForm user={user} onPost={() => { refresh(); setTab("feed"); }} />}
      {tab === "profile" && user && <ProfilePage user={user} onUpdate={refresh} />}
    </div>
  );
}
