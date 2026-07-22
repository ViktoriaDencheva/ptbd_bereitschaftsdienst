"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

const F = "'Poppins', sans-serif";
const CTA = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 80px" } as const;

const PHASES_DE = [
  { title: "Ankommen & Kennenlernen", duration: "ca. 15–20 Min.", desc: "Du erzählst, was dich beschäftigt. Die Fachkraft hört zu, stellt erste Fragen und schafft einen sicheren Rahmen. Kein Druck, kein Urteil." },
  { title: "Situationsklärung", duration: "ca. 20–30 Min.", desc: "Gemeinsam beleuchtet ihr deine aktuelle Situation, Belastungen und Ressourcen. Die Fachkraft hilft dir, dein Anliegen zu konkretisieren." },
  { title: "Möglichkeiten besprechen", duration: "ca. 10–15 Min.", desc: "Die Fachkraft erklärt, welche Formen der Unterstützung für dich in Frage kommen — kurz- oder langfristig, online oder persönlich." },
  { title: "Nächste Schritte", duration: "ca. 5–10 Min.", desc: "Ihr vereinbart, wie es weitergeht. Ob weitere Termine, Empfehlungen oder eine Bedenkzeit — du entscheidest in deinem eigenen Tempo." },
];

const PHASES_EN = [
  { title: "Arriving & getting acquainted", duration: "approx. 15–20 min.", desc: "You share what's on your mind. The specialist listens, asks initial questions, and creates a safe space. No pressure, no judgement." },
  { title: "Clarifying the situation", duration: "approx. 20–30 min.", desc: "Together you explore your current situation, stressors, and resources. The specialist helps you articulate your concerns." },
  { title: "Discussing options", duration: "approx. 10–15 min.", desc: "The specialist explains what forms of support may be right for you — short- or long-term, online or in person." },
  { title: "Next steps", duration: "approx. 5–10 min.", desc: "You agree on how to proceed. Whether further appointments, referrals, or time to think — you decide at your own pace." },
];

const FORMAT_CARDS_DE = [
  { icon: "/icons/icon-orientierung.svg", title: "Online", points: ["Videocall via gesicherter Verbindung", "Von zu Hause aus, diskret", "Gleiche Qualität wie persönlich", "Österreichweit verfügbar"] },
  { icon: "/icons/icon-pin.svg", title: "Persönlich", points: ["In einer unserer Beratungsstellen", "6 Standorte in Österreich", "Vertrauliche Räumlichkeiten", "Barrierearm zugänglich"] },
];

const FORMAT_CARDS_EN = [
  { icon: "/icons/icon-orientierung.svg", title: "Online", points: ["Video call via secure connection", "From home, discreet", "Same quality as in person", "Available across Austria"] },
  { icon: "/icons/icon-pin.svg", title: "In person", points: ["At one of our counselling centres", "6 locations in Austria", "Confidential premises", "Accessible entrance"] },
];

const FAQS_DE = [
  { q: "Wie lange dauert eine Beratungssitzung?", a: "Eine Standardsitzung dauert in der Regel 50 Minuten. Das Erstgespräch kann etwas kürzer sein (ca. 45 Minuten)." },
  { q: "Was soll ich zum ersten Gespräch mitbringen?", a: "Nichts Spezielles — nur dich selbst. Es kann helfen, dir vorher zu überlegen, was dich aktuell am meisten beschäftigt." },
  { q: "Wird das Gespräch aufgezeichnet?", a: "Nein, niemals. Alle Gespräche finden in absolutem Vertrauen statt und unterliegen der Schweigepflicht." },
  { q: "Was, wenn ich beim ersten Gespräch merke, dass es nicht passt?", a: "Das ist völlig in Ordnung. Du bist zu nichts verpflichtet. Wir helfen dir dann, eine andere passende Fachkraft zu finden." },
];

const FAQS_EN = [
  { q: "How long does a counselling session last?", a: "A standard session usually lasts 50 minutes. The initial consultation may be slightly shorter (approx. 45 minutes)." },
  { q: "What should I bring to the first session?", a: "Nothing special — just yourself. It can help to think beforehand about what's weighing on you most right now." },
  { q: "Is the session recorded?", a: "No, never. All sessions take place in absolute confidence and are subject to professional confidentiality." },
  { q: "What if I feel during the first session that it's not the right fit?", a: "That's completely fine. You are not obligated to anything. We will then help you find another suitable specialist." },
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
  const { lang } = useLang();
  const isEN = lang === 'en';

  const PHASES = isEN ? PHASES_EN : PHASES_DE;
  const FORMAT_CARDS = isEN ? FORMAT_CARDS_EN : FORMAT_CARDS_DE;
  const FAQS = isEN ? FAQS_EN : FAQS_DE;

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px 0" }} className="adb-bc">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <Link href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}>{isEN ? "Home" : "Startseite"}</Link>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>{isEN ? "How a session works" : "Ablauf der Beratung"}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "white", padding: "20px 0 0" }}>
        <div style={W} className="adb-w">
          <div className="adb-hero-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }} className="adb-hero-content">
              <h1 className="adb-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                {isEN ? <>What to expect<br />in a session</> : <>Was dich in der<br />Beratung erwartet</>}
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                {isEN
                  ? "Many people aren't sure exactly how a counselling session works. Here you'll find out what to expect — step by step."
                  : "Viele Menschen wissen nicht genau, wie eine Beratungssitzung abläuft. Hier erfährst du, was dich erwartet — Schritt für Schritt."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  {isEN ? "Book an appointment" : "Termin vereinbaren"}
                </Link>
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
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "How a session unfolds" : "So läuft eine Sitzung ab"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 48 }}>{isEN ? "A typical initial session lasts 45–60 minutes." : "Ein typisches Erstgespräch dauert 45–60 Minuten."}</p>
          <div className="adb-phases" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {PHASES.map((phase, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "36px 32px 28px", border: "1.5px solid #E8EFF8", display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden", transition: "box-shadow 0.2s, border-color 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,91,141,0.08)"; e.currentTarget.style.borderColor = "#C5D8F0"; e.currentTarget.style.transform = "scale(1.008)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E8EFF8"; e.currentTarget.style.transform = "scale(1)"; }}
              >
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

      {/* Format */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Online or in person" : "Online oder persönlich"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>{isEN ? "You choose the format that suits you best." : "Du wählst das Format, das am besten zu dir passt."}</p>
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

      {/* FAQ */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="adb-w">
          <div className="adb-faq-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Frequently asked questions" : "Häufige Fragen"}</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#888" }}>{isEN ? "Still have questions about how it works?" : "Noch Fragen zum Ablauf?"}</p>
            </div>
            <div style={{ padding: "0 4px" }}>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
              <div style={{ paddingTop: 24, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", fontFamily: F, fontSize: 14, color: "#888" }}>
                {isEN ? "Your question not listed?" : "Deine Frage ist nicht dabei?"}{" "}
                <Link href="/faq" style={{ color: CTA, fontWeight: 600, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >{isEN ? "View all questions" : "Alle Fragen ansehen"}</Link>
                {" "}{isEN ? "or" : "oder"}{" "}
                <Link href="/kontakt" style={{ color: CTA, fontWeight: 600, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >{isEN ? "write to us directly" : "schreib uns direkt"}</Link>.
              </div>
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
