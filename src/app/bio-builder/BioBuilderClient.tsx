"use client";

import { useState, useCallback, useRef } from "react";
import CopyToast from "@/components/CopyToast";
import { useCopyToast } from "@/lib/use-copy-toast";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸", limit: 150, color: "#E1306C" },
  { id: "discord",   label: "Discord",   icon: "🎮", limit: 190, color: "#5865F2" },
  { id: "tiktok",    label: "TikTok",    icon: "🎵", limit: 80,  color: "#FE2C55" },
  { id: "twitter",   label: "Twitter/X", icon: "🐦", limit: 160, color: "#1DA1F2" },
];

const SYMBOL_GROUPS = [
  { label: "Stars & Sparkles", symbols: ["✦","✧","★","☆","⭐","✨","💫","✶","✷","✸","✹","❇","⋆","⁂","✴"] },
  { label: "Hearts", symbols: ["♡","♥","❤","💕","💖","💗","💙","🖤","🤍","💜","❣","❥","🩷","🫀","💝"] },
  { label: "Arrows & Direction", symbols: ["→","←","↑","↓","↳","↪","➤","➜","›","»","⇢","⟶","▸","◂","⬦"] },
  { label: "Flowers & Nature", symbols: ["✿","❀","❁","✾","🌸","🌺","🌻","🌹","🍀","☘","🌿","🍃","🌱","🪷","⚘"] },
  { label: "Decorative", symbols: ["꧁","꧂","彡","ツ","シ","【","】","《","》","「","」","°","•","◦","∞"] },
  { label: "Shapes", symbols: ["◈","◉","○","●","□","■","▲","△","◆","◇","⬡","⬢","⬟","◐","◑"] },
];

const DIVIDERS = [
  { label: "Thin line",       s: "────────────────────" },
  { label: "Double line",     s: "════════════════════" },
  { label: "Thick line",      s: "━━━━━━━━━━━━━━━━━━━━" },
  { label: "Dotted",          s: "· · · · · · · · · ·" },
  { label: "Star center",     s: "────── ✦ ──────" },
  { label: "Diamond line",    s: "✦────────────────✦" },
  { label: "Heart divider",   s: "⊰ ─────── ♡ ─────── ⊱" },
  { label: "Sparkle wave",    s: "✧.*･ﾟ:✧.*･ﾟ:" },
  { label: "Flower ends",     s: "✿─────────────✿" },
  { label: "Star ends",       s: "★━━━━━━━━━━━━━━━━━━━★" },
  { label: "Ornament",        s: "꧁────────────꧂" },
  { label: "Audio wave",      s: "ılı.lıllılı.ıllı." },
  { label: "Crystal",         s: "·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩͙˚̩̥̩̥*̩̩͙·͙" },
  { label: "Arrow center",    s: "⋘ ─── ∗ ⋅◈⋅ ∗ ─── ⋙" },
  { label: "Minimal dots",    s: "•° ✿ °•" },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────

type BlockType = "text" | "divider" | "symbol-row";
interface Block {
  id: string;
  type: BlockType;
  content: string;
}

let _id = 0;
const uid = () => `b${++_id}`;

const DEFAULT_BLOCKS: Block[] = [
  { id: uid(), type: "text",       content: "✦ your name ✦" },
  { id: uid(), type: "divider",    content: "────── ✦ ──────" },
  { id: uid(), type: "text",       content: "↳ dreamer & creator" },
  { id: uid(), type: "symbol-row", content: "🌸 📍 ✨" },
  { id: uid(), type: "text",       content: "→ link in bio" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function BioBuilderClient() {
  const [platform, setPlatform]       = useState(PLATFORMS[0]);
  const [blocks, setBlocks]           = useState<Block[]>(DEFAULT_BLOCKS);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [copied, setCopied]           = useState(false);
  const { copy: copyToast }           = useCopyToast();
  const [symGroup, setSymGroup]       = useState(0);
  const [tab, setTab]                 = useState<"symbols"|"dividers">("dividers");
  const [dragging, setDragging]       = useState<string | null>(null);
  const [dragOver, setDragOver]       = useState<string | null>(null);
  const dragItem                      = useRef<string | null>(null);

  const bio = blocks.map(b => b.content).join("\n");
  const charCount = bio.length;
  const overLimit = charCount > platform.limit;
  const pct = Math.min(charCount / platform.limit, 1);

  // ── Block operations ────────────────────────────────────────────────────────

  const updateBlock = useCallback((id: string, content: string) => {
    setBlocks(bs => bs.map(b => b.id === id ? { ...b, content } : b));
  }, []);

  const addBlock = useCallback((type: BlockType, content: string) => {
    const newBlock: Block = { id: uid(), type, content };
    setBlocks(bs => {
      if (!activeBlock) return [...bs, newBlock];
      const idx = bs.findIndex(b => b.id === activeBlock);
      const next = [...bs];
      next.splice(idx + 1, 0, newBlock);
      return next;
    });
    setActiveBlock(newBlock.id);
  }, [activeBlock]);

  const removeBlock = useCallback((id: string) => {
    setBlocks(bs => bs.filter(b => b.id !== id));
    setActiveBlock(null);
  }, []);

  const insertSymbol = useCallback((sym: string) => {
    if (activeBlock) {
      const b = blocks.find(b => b.id === activeBlock);
      if (b && b.type === "text") {
        updateBlock(activeBlock, b.content + sym);
        return;
      }
    }
    addBlock("text", sym);
  }, [activeBlock, blocks, updateBlock, addBlock]);

  const addDivider = useCallback((d: string) => {
    addBlock("divider", d);
  }, [addBlock]);

  const copyBio = useCallback(() => {
    // useCopyToast does the clipboard write (+ textarea fallback) and pops the
    // shared toast, matching the copy feedback used across the site.
    void copyToast(bio, { symbol: "📝", label: "Copied bio!" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [bio, copyToast]);

  const clearAll = useCallback(() => {
    setBlocks([{ id: uid(), type: "text", content: "" }]);
    setActiveBlock(null);
  }, []);

  // ── Drag-to-reorder ──────────────────────────────────────────────────────────

  const onDragStart = (id: string) => { dragItem.current = id; setDragging(id); };
  const onDragEnter = (id: string) => setDragOver(id);
  const onDragEnd   = () => {
    if (dragItem.current && dragOver && dragItem.current !== dragOver) {
      setBlocks(bs => {
        const from = bs.findIndex(b => b.id === dragItem.current);
        const to   = bs.findIndex(b => b.id === dragOver);
        const next = [...bs];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    }
    dragItem.current = null;
    setDragging(null);
    setDragOver(null);
  };

  return (
    <>
      <CopyToast />
      <style>{`
        .bb-wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; }
        .bb-header { margin-bottom: 32px; }
        .bb-platform-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 0; }
        .bb-platform-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 100px;
          border: 1px solid var(--border); background: var(--bg3);
          color: var(--text2); font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.15s;
        }
        .bb-platform-btn.active { color: var(--bg); border-color: transparent; }
        .bb-platform-btn:not(.active):hover { border-color: var(--border2); color: var(--text); }
        .bb-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }
        @media (max-width: 900px) { .bb-layout { grid-template-columns: 1fr; } }

        /* ── Editor panel ── */
        .bb-editor { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
        .bb-editor-header { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .bb-blocks { padding: 16px; display: flex; flex-direction: column; gap: 6px; min-height: 200px; }
        .bb-block {
          display: flex; align-items: flex-start; gap: 8px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 12px; padding: 2px 8px 2px 4px;
          transition: all 0.15s; cursor: pointer;
        }
        .bb-block.active { border-color: var(--accent); background: rgba(200,169,110,0.06); }
        .bb-block.dragging { opacity: 0.4; }
        .bb-block.drag-over { border-color: var(--accent); border-style: dashed; }
        .bb-drag-handle {
          padding: 10px 4px; color: var(--text3); cursor: grab;
          font-size: 12px; line-height: 1; user-select: none; flex-shrink: 0;
        }
        .bb-drag-handle:active { cursor: grabbing; }
        .bb-block-input {
          flex: 1; background: none; border: none; outline: none;
          color: var(--text); font-family: 'DM Mono', monospace;
          font-size: 13px; line-height: 1.6; padding: 8px 0; resize: none;
          min-height: 36px;
        }
        .bb-block-input::placeholder { color: var(--text3); }
        .bb-block-divider {
          flex: 1; padding: 8px 0; font-family: 'DM Mono', monospace;
          font-size: 13px; color: var(--text2); line-height: 1.6;
          word-break: break-all; white-space: pre-wrap;
        }
        .bb-remove-btn {
          background: none; border: none; cursor: pointer; color: var(--text3);
          font-size: 16px; padding: 8px 4px; line-height: 1; opacity: 0;
          transition: opacity 0.15s, color 0.15s; flex-shrink: 0;
        }
        .bb-block:hover .bb-remove-btn, .bb-block.active .bb-remove-btn { opacity: 1; }
        .bb-remove-btn:hover { color: var(--coral); }
        .bb-add-text-btn {
          width: 100%; background: none; border: 1px dashed var(--border);
          border-radius: 10px; color: var(--text3); font-size: 13px;
          padding: 10px; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.15s; margin-top: 4px;
        }
        .bb-add-text-btn:hover { border-color: var(--accent); color: var(--accent); }

        /* ── Picker panel ── */
        .bb-picker { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
        .bb-picker-tabs { display: flex; border-bottom: 1px solid var(--border); }
        .bb-picker-tab {
          flex: 1; padding: 12px; background: none; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: var(--text3); cursor: pointer; transition: all 0.15s;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
        }
        .bb-picker-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .bb-picker-body { padding: 14px; }
        .bb-sym-group-tabs { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px; }
        .bb-sym-group-tab {
          padding: 3px 10px; border-radius: 100px; border: 1px solid var(--border);
          background: var(--bg3); color: var(--text3); font-size: 11px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s;
        }
        .bb-sym-group-tab.active { border-color: var(--accent); color: var(--accent); background: rgba(200,169,110,0.08); }
        .bb-sym-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(36px, 1fr)); gap: 5px; margin-bottom: 8px; }
        .bb-sym-btn {
          aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; cursor: pointer; transition: all 0.12s;
        }
        .bb-sym-btn:hover { border-color: var(--accent); background: rgba(200,169,110,0.1); transform: scale(1.1); }
        .bb-div-list { display: flex; flex-direction: column; gap: 5px; }
        .bb-div-btn {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          padding: 8px 12px; background: var(--bg3); border: 1px solid var(--border);
          border-radius: 10px; cursor: pointer; transition: all 0.15s;
        }
        .bb-div-btn:hover { border-color: var(--accent); background: rgba(200,169,110,0.06); }
        .bb-div-preview { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text2); flex: 1; text-align: center; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .bb-div-label { font-size: 10px; color: var(--text3); flex-shrink: 0; }
        .bb-add-icon { font-size: 14px; color: var(--text3); flex-shrink: 0; }

        /* ── Phone mockup ── */
        .bb-phone-wrap { position: sticky; top: 80px; }
        .bb-phone {
          width: 260px; margin: 0 auto;
          background: var(--bg2); border-radius: 36px;
          border: 2px solid var(--border2);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04);
          overflow: hidden; position: relative;
        }
        .bb-phone-notch {
          width: 80px; height: 20px; background: var(--bg);
          border-radius: 0 0 12px 12px; margin: 0 auto;
        }
        .bb-phone-screen { padding: 12px 16px 24px; }
        .bb-phone-topbar { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 10px; color: var(--text3); padding: 0 4px; }
        .bb-profile-section { text-align: center; padding: 0 8px 16px; }
        .bb-profile-avatar {
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          margin: 0 auto 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
        }
        .bb-profile-name { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
        .bb-profile-handle { font-size: 10px; color: var(--text3); margin-bottom: 10px; }
        .bb-phone-bio {
          font-size: 11px; line-height: 1.65; color: var(--text2);
          white-space: pre-wrap; text-align: left; font-family: 'DM Mono', monospace;
          word-break: break-word; max-height: 160px; overflow: hidden;
        }
        .bb-phone-stats { display: flex; justify-content: space-around; padding: 12px 0; border-top: 1px solid var(--border); margin: 0 -16px; }
        .bb-phone-stat { text-align: center; }
        .bb-phone-stat-n { font-size: 13px; font-weight: 600; color: var(--text); }
        .bb-phone-stat-l { font-size: 9px; color: var(--text3); }
        .bb-phone-follow { margin: 10px 0 0; background: var(--accent); color: var(--bg); border: none; border-radius: 8px; width: 100%; padding: 7px; font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; }

        /* ── Char counter ── */
        .bb-char-bar-wrap { padding: 12px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
        .bb-char-bar-bg { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .bb-char-bar-fill { height: 100%; border-radius: 2px; transition: width 0.3s, background 0.3s; }
        .bb-char-count { font-family: 'DM Mono', monospace; font-size: 11px; flex-shrink: 0; }

        /* ── Copy section ── */
        .bb-copy-section { padding: 16px 20px; border-top: 1px solid var(--border); display: flex; gap: 8px; }
        .bb-copy-btn {
          flex: 1; padding: 12px; border-radius: 12px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          background: var(--accent); color: var(--bg);
        }
        .bb-copy-btn:hover { background: var(--accent2); transform: translateY(-1px); }
        .bb-copy-btn.copied { background: var(--green); color: var(--bg); }
        .bb-clear-btn {
          padding: 12px 16px; border-radius: 12px;
          border: 1px solid var(--border); background: var(--bg3);
          color: var(--text3); font-family: 'DM Sans', sans-serif;
          font-size: 13px; cursor: pointer; transition: all 0.15s;
        }
        .bb-clear-btn:hover { border-color: var(--coral); color: var(--coral); }

        /* ── Tips ── */
        .bb-tip { font-size: 11px; color: var(--text3); padding: 8px 20px 0; line-height: 1.5; }
      `}</style>

      <div className="bb-wrap">

        {/* Header */}
        <div className="bb-header">
          <div className="section-label" style={{ marginBottom: 8 }}>Interactive tool</div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
            ✦ Bio Builder
          </h1>
          <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 20, lineHeight: 1.6, maxWidth: 600 }}>
            Build your perfect bio with symbols and dividers. See it live in the phone preview. Click copy when done.
          </p>
          <div className="bb-platform-tabs">
            {PLATFORMS.map(p => (
              <button
                key={p.id}
                className={`bb-platform-btn ${platform.id === p.id ? "active" : ""}`}
                style={platform.id === p.id ? { backgroundColor: p.color } : {}}
                onClick={() => setPlatform(p)}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
                <span style={{ fontSize: 10, opacity: 0.7 }}>{p.limit} chars</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bb-layout">

          {/* ── LEFT: Editor + Picker ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Block editor */}
            <div className="bb-editor">
              <div className="bb-editor-header">
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                  Bio lines <span style={{ color: "var(--text3)", fontWeight: 400 }}>— drag to reorder</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                  Click a line to edit it
                </div>
              </div>

              <div className="bb-blocks">
                {blocks.map(block => (
                  <div
                    key={block.id}
                    className={[
                      "bb-block",
                      activeBlock === block.id ? "active" : "",
                      dragging === block.id ? "dragging" : "",
                      dragOver === block.id && dragging !== block.id ? "drag-over" : "",
                    ].join(" ")}
                    onClick={() => setActiveBlock(block.id)}
                    draggable
                    onDragStart={() => onDragStart(block.id)}
                    onDragEnter={() => onDragEnter(block.id)}
                    onDragEnd={onDragEnd}
                    onDragOver={e => e.preventDefault()}
                  >
                    <span className="bb-drag-handle" title="Drag to reorder">⠿</span>

                    {block.type === "divider" ? (
                      <div
                        className="bb-block-divider"
                        onClick={e => {
                          e.stopPropagation();
                          setActiveBlock(block.id);
                        }}
                      >
                        {block.content}
                      </div>
                    ) : (
                      <textarea
                        className="bb-block-input"
                        value={block.content}
                        placeholder="Type something..."
                        rows={1}
                        onChange={e => {
                          updateBlock(block.id, e.target.value);
                          // Auto-resize
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        onClick={e => { e.stopPropagation(); setActiveBlock(block.id); }}
                        onFocus={() => setActiveBlock(block.id)}
                      />
                    )}

                    <button
                      className="bb-remove-btn"
                      onClick={e => { e.stopPropagation(); removeBlock(block.id); }}
                      title="Remove line"
                    >×</button>
                  </div>
                ))}

                <button
                  className="bb-add-text-btn"
                  onClick={() => addBlock("text", "")}
                >
                  + Add text line
                </button>
              </div>

              {/* Char counter */}
              <div className="bb-char-bar-wrap">
                <div className="bb-char-bar-bg">
                  <div
                    className="bb-char-bar-fill"
                    style={{
                      width: `${pct * 100}%`,
                      background: overLimit ? "var(--coral)" : pct > 0.8 ? "var(--accent)" : "var(--teal)",
                    }}
                  />
                </div>
                <span className="bb-char-count" style={{ color: overLimit ? "var(--coral)" : "var(--text3)" }}>
                  {charCount} / {platform.limit}
                  {overLimit && " ⚠"}
                </span>
              </div>

              {/* Copy button */}
              <div className="bb-copy-section">
                <button className={`bb-copy-btn ${copied ? "copied" : ""}`} onClick={copyBio}>
                  {copied ? "✓ Copied to clipboard!" : `Copy ${platform.label} Bio`}
                </button>
                <button className="bb-clear-btn" onClick={clearAll} title="Clear all">Clear</button>
              </div>

              {overLimit && (
                <p className="bb-tip" style={{ color: "var(--coral)", paddingBottom: 12 }}>
                  ⚠ Your bio is {charCount - platform.limit} characters over the {platform.label} limit of {platform.limit}.
                </p>
              )}
            </div>

            {/* Symbol / Divider picker */}
            <div className="bb-picker">
              <div className="bb-picker-tabs">
                <button className={`bb-picker-tab ${tab === "dividers" ? "active" : ""}`} onClick={() => setTab("dividers")}>
                  ─ Dividers
                </button>
                <button className={`bb-picker-tab ${tab === "symbols" ? "active" : ""}`} onClick={() => setTab("symbols")}>
                  ✦ Symbols
                </button>
              </div>

              <div className="bb-picker-body">
                {tab === "symbols" && (
                  <>
                    <div className="bb-sym-group-tabs">
                      {SYMBOL_GROUPS.map((g, i) => (
                        <button
                          key={g.label}
                          className={`bb-sym-group-tab ${symGroup === i ? "active" : ""}`}
                          onClick={() => setSymGroup(i)}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                    <div className="bb-sym-grid">
                      {SYMBOL_GROUPS[symGroup].symbols.map(sym => (
                        <button
                          key={sym}
                          className="bb-sym-btn"
                          onClick={() => insertSymbol(sym)}
                          title={`Insert ${sym}`}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 6, lineHeight: 1.5 }}>
                      {activeBlock ? "↑ Clicking a symbol adds it to the selected line" : "Select a text line above first, then click a symbol to add it"}
                    </p>
                  </>
                )}

                {tab === "dividers" && (
                  <div className="bb-div-list">
                    {DIVIDERS.map(d => (
                      <button
                        key={d.label}
                        className="bb-div-btn"
                        onClick={() => addDivider(d.s)}
                        title="Add divider"
                      >
                        <span className="bb-div-label">{d.label}</span>
                        <span className="bb-div-preview">{d.s}</span>
                        <span className="bb-add-icon">+</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ── RIGHT: Phone mockup ── */}
          <div className="bb-phone-wrap">
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Mono, monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Live preview — {platform.label}
              </span>
            </div>
            <div className="bb-phone">
              <div style={{ background: "var(--bg)", paddingTop: 12 }}>
                <div className="bb-phone-notch" />
              </div>
              <div className="bb-phone-screen">
                <div className="bb-phone-topbar">
                  <span>9:41</span>
                  <span>●●●</span>
                </div>

                <div className="bb-profile-section">
                  <div className="bb-profile-avatar">✦</div>
                  <div className="bb-profile-name">Your Name</div>
                  <div className="bb-profile-handle">@yourhandle</div>

                  <div className="bb-phone-bio">
                    {bio || <span style={{ color: "var(--text3)", fontStyle: "italic" }}>Your bio will appear here...</span>}
                  </div>
                </div>

                {platform.id === "instagram" && (
                  <>
                    <div className="bb-phone-stats">
                      <div className="bb-phone-stat">
                        <div className="bb-phone-stat-n">248</div>
                        <div className="bb-phone-stat-l">Posts</div>
                      </div>
                      <div className="bb-phone-stat">
                        <div className="bb-phone-stat-n">4.2K</div>
                        <div className="bb-phone-stat-l">Followers</div>
                      </div>
                      <div className="bb-phone-stat">
                        <div className="bb-phone-stat-n">312</div>
                        <div className="bb-phone-stat-l">Following</div>
                      </div>
                    </div>
                    <button className="bb-phone-follow">Follow</button>
                  </>
                )}

                {platform.id === "discord" && (
                  <div style={{ padding: "10px 0 0", borderTop: "1px solid var(--border)", marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["Member","Verified","Active"].map(r => (
                        <span key={r} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(88,101,242,0.2)", color: "#7289DA", fontFamily: "DM Mono, monospace" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tips below phone */}
            <div style={{ marginTop: 20, padding: "16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>💡 Tips</div>
              <ul style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Drag lines to reorder them</li>
                <li>Click a line to select it, then add symbols</li>
                <li>Use dividers to separate sections</li>
                <li>Keep under the character limit</li>
                <li>Replace [brackets] with your info</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
