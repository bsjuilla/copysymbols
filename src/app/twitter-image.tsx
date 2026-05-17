import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CopyChars — Copy & Paste 3000+ Symbols, Emoji & Special Characters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            color: "#c8a96e",
            letterSpacing: "-0.03em",
            display: "flex",
            alignItems: "center",
          }}
        >
          ✦ CopyChars
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#e8e6dc",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 1000,
          }}
        >
          Copy & Paste 3000+ Symbols, Emoji & Special Characters
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            marginTop: 80,
            fontSize: 72,
            color: "#c8a96e",
          }}
        >
          <span>❤</span>
          <span>★</span>
          <span>∞</span>
          <span>☥</span>
          <span>✿</span>
          <span>♪</span>
          <span>→</span>
          <span>©</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
