"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 80px" } as const;

const PHASES = [
  {
    title: "Ankommen & Kennenlernen",
    duration: "ca. 15–20 Min.",
    desc: "Du erzählst, was dich beschäftigt. Die Fachkraft hört zu, stellt erste Fragen und schafft einen sicheren Rahmen. Kein Druck, kein Urteil.",
  },
  {
    title: "Situationsklärung",
    duration: "ca. 20–30 Min.",
    desc: "Gemeinsam beleuchtet ihr deine aktuelle Situation, Belastungen und Ressourcen. Die Fachkraft hilft dir, dein Anliegen zu konkretisieren.",
  },
  {
    title: "Möglichkeiten besprechen",
    duration: "ca. 10–15 Min.",
    desc: "Die Fachkraft erklärt, welche Formen der Unterstützung für dich in Frage kommen — kurz- oder langfristig, online oder persönlich.",
  },
  {
    title: "Nächste Schritte",
    duration: "ca. 5–10 Min.",
    desc: "Ihr vereinbart, wie es weitergeht. Ob weitere Termine, Empfehlungen oder eine Bedenkzeit — du entscheidest in deinem eigenen Tempo.",
  },
];

const FORMAT_CARDS = [
  {
    icon: "🖥️",
    title: "Online",
    points: ["Videocall via gesicherter Verbindung", "Von zu Hause aus, diskret", "Gleiche Qualität wie persönlich", "Österreichweit verfügbar"],
  },
  {
    icon: "🏢",
    title: "Persönlich",
    points: ["In einer unserer Beratungsstellen", "6 Standorte in Österreich", "Vertrauliche Räumlichkeiten", "Barrierearm zugänglich"],
  },
  {
    icon: "📞",
    title: "Telefonisch",
    points: ["Für erste Kontakte", "Schnell und unkompliziert", "Keine technischen Anforderungen", "Auf Wunsch anonym"],
  },
];

const FAQS = [
  { q: "Wie lange dauert eine Beratungssitzung?", a: "Eine Standardsitzung dauert in der Regel 50 Minuten. Das Erstgespräch kann etwas kürzer sein (ca. 45 Minuten)." },
  { q: "Was soll ich zum ersten Gespräch mitbringen?", a: "Nichts Spezielles — nur dich selbst. Es kann helfen, dir vorher zu überlegen, was dich aktuell am meisten beschäftigt." },
  { q: "Wird das Gespräch aufgezeichnet?", a: "Nein, niemals. Alle Gespräche finden in absolutem Vertrauen statt und unterliegen der Schweigepflicht." },
  { q: "Was, wenn ich beim ersten Gespräch merke, dass es nicht passt?", a: "Das ist völlig in Ordnung. Du bist zu nichts verpflichtet. Wir helfen dir dann, eine andere passende Fachkraft zu finden." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8EFF8", padding: "18px 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", gap: 16, textAlign: "left" }}>
        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "#1A1A1A" }}>{q}</span>
        <span style={{ fontFamily: F, fontSize: 22, color: CTA, flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <p style={{ fontFamily: F, fontSize: 14.5, color: "#555", lineHeight: 1.7, margin: "12px 0 0" }}>{a}</p>}
    </div>
  );
}

export default function AblaufPage() {
  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px 0" }} className="adb-bc">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}>Startseite</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>Ablauf der Beratung</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "white", padding: "20px 0 0" }}>
        <div style={W} className="adb-w">
          <div className="adb-hero-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }} className="adb-hero-content">
              <span style={{ display: "inline-flex", alignItems: "center", fontFamily: F, fontSize: 12, fontWeight: 700, color: CTA, letterSpacing: "0.08em", background: "#EBF2FC", borderRadius: 999, padding: "5px 14px", width: "fit-content" }}>
                ABLAUF DER BERATUNG
              </span>
              <h1 className="adb-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                Was dich in der<br />Beratung erwartet
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                Viele Menschen wissen nicht genau, wie eine Beratungssitzung abläuft. Hier erfährst du, was dich erwartet — Schritt für Schritt.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/orientierungsgespraech" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  Termin vereinbaren
                </a>
              </div>
            </div>
            <div className="adb-hero-img" style={{ position: "relative", minHeight: 360, paddingBottom: 40 }}>
              <div style={{ position: "absolute", inset: "0 0 40px 0", background: "linear-gradient(135deg, #D8E8F7 0%, #EBF2FC 100%)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: 80, opacity: 0.15 }}>💬</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>So läuft eine Sitzung ab</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 48 }}>Ein typisches Erstgespräch dauert 45–60 Minuten.</p>
          <div className="adb-phases" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {PHASES.map((phase, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, padding: 28, border: "1.5px solid #E8EFF8", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: CTA, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "#1A1A1A" }}>{phase.title}</div>
                    <div style={{ fontFamily: F, fontSize: 12, color: CTA, fontWeight: 600 }}>{phase.duration}</div>
                  </div>
                </div>
                <p style={{ fontFamily: F, fontSize: 14.5, color: "#555", lineHeight: 1.7, margin: 0 }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>Online, persönlich oder telefonisch</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>Du wählst das Format, das am besten zu dir passt.</p>
          <div className="adb-formats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FORMAT_CARDS.map(card => (
              <div key={card.title} style={{ background: "#F7F9FC", borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{card.icon}</span>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "#1A1A1A", margin: 0 }}>{card.title}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {card.points.map(p => (
                    <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: F, fontSize: 14, color: "#555", lineHeight: 1.5 }}>
                      <span style={{ color: CTA, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <div className="adb-faq-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>Häufige Fragen</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#888" }}>Noch Fragen zum Ablauf?</p>
            </div>
            <div>{FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .adb-bc { padding: 32px 80px 0 !important; }
        .adb-w { padding-left: 80px !important; padding-right: 80px !important; }
        .adb-h1 { font-size: 48px; }
        .adb-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch; }
        .adb-phases { grid-template-columns: repeat(2, 1fr); }
        .adb-formats { grid-template-columns: repeat(3, 1fr); }
        .adb-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        @media (max-width: 1070px) {
          .adb-bc { padding: 16px 16px 0 !important; }
          .adb-w { padding-left: 16px !important; padding-right: 16px !important; }
          .adb-h1 { font-size: 32px !important; }
          .adb-hero-grid { display: flex !important; flex-direction: column !important; }
          .adb-hero-img { min-height: 180px !important; order: -1; margin-bottom: 16px; }
          .adb-hero-content { padding-bottom: 32px !important; }
          .adb-phases { grid-template-columns: 1fr !important; }
          .adb-formats { grid-template-columns: 1fr !important; }
          .adb-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          section { padding-top: 40px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </>
  );
}
