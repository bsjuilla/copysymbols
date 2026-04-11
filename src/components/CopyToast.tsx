"use client";
export default function CopyToast() {
  return (
    <div id="global-toast" className="copy-toast">
      <span id="toast-symbol" style={{ fontSize: "1.4rem" }}>©</span>
      <span id="toast-message">Copied!</span>
      <span style={{ fontSize: "12px", opacity: 0.7 }}>✓</span>
    </div>
  );
}
