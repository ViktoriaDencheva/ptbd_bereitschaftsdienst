"use client";
import { useState, useRef, useEffect } from "react";
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
    icon: "/icons/icon-orientierung.svg",
    title: "Online",
    points: ["Videocall via gesicherter Verbindung", "Von zu Hause aus, diskret", "Gleiche Qualität wie persönlich", "Österreichweit verfügbar"],
  },
  {
    icon: "/icons/icon-pin.svg",
    title: "Persönlich",
    points: ["In einer unserer Beratungsstellen", "6 Standorte in Österreich", "Vertrauliche Räumlichkeiten", "Barrierearm zugänglich"],
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
        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 15, color: "#1A1A1A", lineHeight: 1.5 }}>{q}</span>
        <span style={{ fontFamily: F, fontSize: 22, color: CTA, flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <p style={{ fontFamily: F, fontSize: 14.5, color: "#555", lineHeight: 1.7, margin: "12px 0 0" }}>{a}</p>}
    </div>
  );
}

export default function AblaufPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

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
              <h1 className="adb-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                Was dich in der<br />Beratung erwartet
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                Viele Menschen wissen nicht genau, wie eine Beratungssitzung abläuft. Hier erfährst du, was dich erwartet — Schritt für Schritt.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  Termin vereinbaren
                </a>
              </div>
            </div>
            {/* Video */}
            <div className="adb-hero-img" style={{ position: "relative", minHeight: 360, paddingBottom: 40 }}>
              <div style={{ position: "absolute", inset: "0 0 40px 0", borderRadius: 20, overflow: "hidden", background: "#1A1A1A" }}>
                <video ref={videoRef} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
                  <source src="/video-warum-uns.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf — modernized cards */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>So läuft eine Sitzung ab</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 48 }}>Ein typisches Erstgespräch dauert 45–60 Minuten.</p>
          <div className="adb-phases" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {PHASES.map((phase, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "36px 32px 28px", border: "1.5px solid #E8EFF8", display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden", transition: "box-shadow 0.2s, border-color 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(45,91,141,0.10)"; e.currentTarget.style.borderColor = "#C5D8F0"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E8EFF8"; }}
              >
                {/* Watermark number — darker blue */}
                <span style={{ position: "absolute", top: -4, right: 14, fontFamily: F, fontWeight: 900, fontSize: 88, color: "#2D5B8D", opacity: 0.08, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{i + 1}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative" }}>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "#1A1A1A", margin: 0 }}>{phase.title}</h3>
                  <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, letterSpacing: "0.05em" }}>{phase.duration}</span>
                </div>
                <p style={{ fontFamily: F, fontSize: 14.5, color: "#666", lineHeight: 1.7, margin: 0, position: "relative" }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format — only Online & Persönlich */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>Online oder persönlich</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>Du wählst das Format, das am besten zu dir passt.</p>
          <div className="adb-formats" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {FORMAT_CARDS.map(card => (
              <div key={card.title} style={{ background: "#F7F9FC", borderRadius: 16, padding: "32px 36px", border: "1.5px solid #E8EFF8", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#EBF2FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src={card.icon} width={24} height={24} alt="" />
                  </div>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 20, color: "#1A1A1A", margin: 0 }}>{card.title}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {card.points.map(p => (
                    <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: F, fontSize: 14.5, color: "#555", lineHeight: 1.5 }}>
                      <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ flexShrink: 0, marginTop: 1 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — white background */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <div className="adb-faq-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>Häufige Fragen</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 24 }}>Noch Fragen zum Ablauf?</p>
              <a href="/faq" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 14, fontWeight: 600, color: CTA, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
              >
                Alle Fragen ansehen →
              </a>
            </div>
            <div style={{ padding: "0 4px" }}>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
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
        .adb-formats { grid-template-columns: repeat(2, 1fr); }
        .adb-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        @media (max-width: 1070px) {
          .adb-bc { padding: 16px 16px 0 !important; }
          .adb-w { padding-left: 16px !important; padding-right: 16px !important; }
          .adb-h1 { font-size: 32px !important; }
          .adb-hero-grid { display: flex !important; flex-direction: column !important; }
          .adb-hero-img { min-height: 220px !important; order: -1; margin-bottom: 16px; }
          .adb-hero-img img { inset: 0 !important; height: 100% !important; }
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
