import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Greek Alphabet Symbols — Complete List α β γ Copy & Paste",
  description: "Complete Greek alphabet with uppercase and lowercase letters, names and their common uses in math, science and everyday language. Copy any Greek letter.",
  keywords: ["greek alphabet copy paste","greek letters list","alpha beta gamma symbols","greek symbols math","all greek letters"],
};

const greekLetters = [
  { upper: "Α", lower: "α", name: "Alpha", uses: "First, beginning, alpha particle, significance level" },
  { upper: "Β", lower: "β", name: "Beta", uses: "Second, beta testing, beta radiation, regression coefficient" },
  { upper: "Γ", lower: "γ", name: "Gamma", uses: "Gamma radiation, gamma function, shear strain" },
  { upper: "Δ", lower: "δ", name: "Delta", uses: "Change, difference, river delta, Dirac delta function" },
  { upper: "Ε", lower: "ε", name: "Epsilon", uses: "Small quantity in calculus, permittivity, empty string" },
  { upper: "Ζ", lower: "ζ", name: "Zeta", uses: "Riemann zeta function, damping ratio" },
  { upper: "Η", lower: "η", name: "Eta", uses: "Efficiency, viscosity, eta meson" },
  { upper: "Θ", lower: "θ", name: "Theta", uses: "Angle, temperature (thermodynamics), angular position" },
  { upper: "Ι", lower: "ι", name: "Iota", uses: "Tiny amount ('not one iota'), iota subscript" },
  { upper: "Κ", lower: "κ", name: "Kappa", uses: "Curvature, thermal conductivity, spring constant" },
  { upper: "Λ", lower: "λ", name: "Lambda", uses: "Wavelength, lambda calculus, decay constant, eigenvalue" },
  { upper: "Μ", lower: "μ", name: "Mu", uses: "Micro- (10⁻⁶), mean, friction coefficient, magnetic permeability" },
  { upper: "Ν", lower: "ν", name: "Nu", uses: "Frequency, kinematic viscosity, neutrino" },
  { upper: "Ξ", lower: "ξ", name: "Xi", uses: "Random variable, xi baryon" },
  { upper: "Ο", lower: "ο", name: "Omicron", uses: "Fifteenth letter, COVID-19 variant name" },
  { upper: "Π", lower: "π", name: "Pi", uses: "π ≈ 3.14159, circle ratio, prime counting function" },
  { upper: "Ρ", lower: "ρ", name: "Rho", uses: "Density, resistivity, correlation coefficient, rho meson" },
  { upper: "Σ", lower: "σ", name: "Sigma", uses: "Summation (Σ), standard deviation (σ), stress, Stefan-Boltzmann" },
  { upper: "Τ", lower: "τ", name: "Tau", uses: "Torque, shear stress, tau lepton, 2π constant" },
  { upper: "Υ", lower: "υ", name: "Upsilon", uses: "Upsilon meson, sometimes used for velocity" },
  { upper: "Φ", lower: "φ", name: "Phi", uses: "Golden ratio (φ ≈ 1.618), magnetic flux, work function" },
  { upper: "Χ", lower: "χ", name: "Chi", uses: "Chi-squared test, electric susceptibility" },
  { upper: "Ψ", lower: "ψ", name: "Psi", uses: "Wave function (quantum), psychology symbol" },
  { upper: "Ω", lower: "ω", name: "Omega", uses: "Ohm (Ω), angular frequency (ω), last/final" },
];

export default function BlogGreek() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>
        <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link> › <Link href="/symbols/greek" style={{ color: "var(--text3)", textDecoration: "none" }}>Greek Letters</Link>
      </div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        Complete Greek Alphabet — Copy & Paste All Letters
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 40, lineHeight: 1.7 }}>
        All 24 Greek letters with both uppercase and lowercase forms, their English names, and their common uses in mathematics, science, and everyday language. Click any row to copy the lowercase letter.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 48 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Uppercase","Lowercase","Name","Common Uses"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: "var(--text3)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {greekLetters.map((l, i) => (
              <tr key={l.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td style={{ padding: "12px 14px", fontSize: "1.5rem", color: "var(--text)" }}>{l.upper}</td>
                <td style={{ padding: "12px 14px", fontSize: "1.5rem", color: "var(--accent)" }}>{l.lower}</td>
                <td style={{ padding: "12px 14px", color: "var(--text)", fontWeight: 500 }}>{l.name}</td>
                <td style={{ padding: "12px 14px", color: "var(--text2)", fontSize: 13 }}>{l.uses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/symbols/greek" className="cat-pill">Browse all Greek symbols</Link>
        <Link href="/symbols/math" className="cat-pill">Math symbols</Link>
        <Link href="/symbol/theta" className="cat-pill">θ Theta</Link>
        <Link href="/symbol/omega-upper" className="cat-pill">Ω Omega</Link>
      </div>
    </div>
  );
}
