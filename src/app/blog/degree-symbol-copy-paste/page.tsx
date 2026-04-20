import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Degree Symbol ° — How to Type It on Any Device",
  description: "How to type the degree symbol on Windows (Alt+0176), Mac (Option+Shift+8), iPhone (hold 0), and Android. Plus HTML code and CSS value.",
};

export default function BlogPost() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 28, fontSize: 13, color: "var(--text3)" }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
        <span>&#x203A;</span>
        <Link href="/blog" style={{ color: "var(--text3)", textDecoration: "none" }}>Blog</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
        Degree Symbol ° — How to Type It on Any Device
      </h1>
      <p style={{ fontSize: 15, color: "var(--text3)", marginBottom: 40, lineHeight: 1.6 }}>How to type the degree symbol on Windows (Alt+0176), Mac (Option+Shift+8), iPhone (hold 0), and Android. Plus HTML code and CSS value.</p>
      <article style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: `<p>The <strong>degree symbol &deg;</strong> is used for temperature (25&deg;C), angles (90&deg;), and geographic coordinates. It is one of those characters everyone needs but few know how to type.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Windows Keyboard Shortcut</h2>
<p>Hold <strong>Alt</strong> and type <strong>0176</strong> on the numpad (not the number row). Release Alt and &deg; appears. Make sure Num Lock is on.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Mac Keyboard Shortcut</h2>
<p>Press <strong>Option + Shift + 8</strong>. Works in every app on Mac.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">iPhone</h2>
<p>Switch to the numbers screen (tap 123), then <strong>hold the 0 key</strong>. A popup appears with &deg; &mdash; slide to it and release.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Android</h2>
<p>On most Android keyboards, switch to numbers/symbols and <strong>hold the 0 key</strong>. The degree symbol should appear as an option.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">HTML and CSS</h2>
<p>In HTML: <code>&amp;deg;</code> or <code>&amp;#176;</code>. In CSS: <code>\\\\00B0</code>.</p>
<h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin:2rem 0 0.75rem">Should You Write &deg;C or &#8451;?</h2>
<p>Both are correct. <strong>&deg;C</strong> (two characters) is more universally supported. <strong>&#8451;</strong> (U+2103, a single precomposed character) is fine but slightly less compatible with older systems.</p>` }} />
    </div>
  );
}
