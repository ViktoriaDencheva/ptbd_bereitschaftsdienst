"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

const F = "'Poppins', sans-serif";
const CTA = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 80px" } as const;

const STEPS_DE = [
  { num: "1", title: "Bedarf erkennen", desc: "Du merkst, dass du Unterstützung brauchst — sei es durch anhaltenden Stress, emotionale Belastung oder eine Krise. Der erste Schritt ist der Entschluss, Hilfe zu suchen." },
  { num: "2", title: "Fachkraft finden", desc: "Auf unserer Plattform findest du qualifizierte Psychotherapeuten, Psychologen und Sozialberater. Filtere nach Spezialgebiet, Sprache, Ort oder Online-Option." },
  { num: "3", title: "Erstgespräch buchen", desc: "Buche ein Kostenloses Erstgespräch (ca. 15–20 Minuten). Kein Druck, keine Verpflichtung — einfach kennenlernen und offene Fragen klären." },
  { num: "4", title: "Erstgespräch führen", desc: "Im Erstgespräch lernst du die Fachkraft kennen, beschreibst deine Situation und besprichst gemeinsam, ob eine Zusammenarbeit sinnvoll ist." },
  { num: "5", title: "Begleitung beginnen", desc: "Wenn die Chemie stimmt, beginnt deine regelmäßige Begleitung — ob online oder persönlich, in deinem Tempo und nach deinen Bedürfnissen." },
];

const STEPS_EN = [
  { num: "1", title: "Recognise the need", desc: "You notice that you need support — whether through ongoing stress, emotional strain, or a crisis. The first step is the decision to seek help." },
  { num: "2", title: "Find a specialist", desc: "On our platform you'll find qualified psychotherapists, psychologists, and social counsellors. Filter by speciality, language, location, or online option." },
  { num: "3", title: "Book an initial consultation", desc: "Book a free initial consultation (approx. 15–20 minutes). No pressure, no obligation — just get acquainted and clear up any questions." },
  { num: "4", title: "Have the initial consultation", desc: "In the initial consultation you get to know the specialist, describe your situation, and discuss together whether working together makes sense." },
  { num: "5", title: "Begin your support", desc: "If the chemistry is right, your regular support begins — online or in person, at your own pace and according to your needs." },
];

const AFTER_DE = [
  { icon: "📅", title: "Regelmäßige Termine", desc: "Du vereinbarst wiederkehrende Sitzungen, die zu deinem Alltag passen." },
  { icon: "🔄", title: "Flexibles Format", desc: "Online, telefonisch oder persönlich — du entscheidest, was für dich passt." },
  { icon: "📝", title: "Individuelle Begleitung", desc: "Jeder Prozess ist einzigartig. Die Fachkraft richtet sich nach deinen Zielen." },
  { icon: "🔒", title: "Absolute Vertraulichkeit", desc: "Alles, was ihr besprecht, bleibt vertraulich. Das ist gesetzlich geschützt." },
];

const AFTER_EN = [
  { icon: "📅", title: "Regular appointments", desc: "You arrange recurring sessions that fit your everyday life." },
  { icon: "🔄", title: "Flexible format", desc: "Online, by phone, or in person — you decide what works for you." },
  { icon: "📝", title: "Individual support", desc: "Every process is unique. The specialist adapts to your goals." },
  { icon: "🔒", title: "Absolute confidentiality", desc: "Everything you discuss stays confidential. This is protected by law." },
];

const FAQS_DE = [
  { q: "Muss ich mich sofort für eine Therapie entscheiden?", a: "Nein. Das Erstgespräch ist unverbindlich. Du kannst dir Zeit lassen und erst dann entscheiden, ob du weitermachen möchtest." },
  { q: "Was kostet das Erstgespräch?", a: "Das Erstgespräch ist kostenlos und unverbindlich. Erst wenn du eine Begleitung startest, entstehen Kosten." },
  { q: "Wie schnell bekomme ich einen Termin?", a: "Die meisten Fachkräfte haben innerhalb weniger Tage freie Termine. Bei dringendem Bedarf gibt es oft auch kurzfristige Möglichkeiten." },
  { q: "Kann ich die Fachkraft wechseln?", a: "Ja, jederzeit. Wenn die Chemie nicht stimmt, helfen wir dir, eine andere passende Fachkraft zu finden." },
  { q: "Was, wenn ich nicht weiß, welche Art von Unterstützung ich brauche?", a: "Genau dafür ist das Erstgespräch da. Die Fachkraft hilft dir, deinen Bedarf zu klären." },
];

const FAQS_EN = [
  { q: "Do I have to commit to therapy straight away?", a: "No. The initial consultation is non-binding. You can take your time and then decide whether you want to continue." },
  { q: "How much does the initial consultation cost?", a: "The initial consultation is free and non-binding. Costs only arise once you start ongoing support." },
  { q: "How quickly can I get an appointment?", a: "Most specialists have free slots within a few days. For urgent needs there are often also short-notice options." },
  { q: "Can I change my specialist?", a: "Yes, at any time. If the chemistry isn't right, we'll help you find another suitable specialist." },
  { q: "What if I don't know what kind of support I need?", a: "That's exactly what the initial consultation is for. The specialist helps you clarify your needs." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8EFF8", padding: "18px 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", gap: 16, textAlign: "left" }}>
        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "#1A1A1A" }}>{q}</span>
        <span style={{ fontFamily: F, fontWeight: 400, fontSize: 22, color: CTA, flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <p style={{ fontFamily: F, fontSize: 14.5, color: "#555", lineHeight: 1.7, margin: "12px 0 0" }}>{a}</p>}
    </div>
  );
}

export default function SoFunktioniertEsPage() {
  const { lang } = useLang();
  const isEN = lang === 'en';
  const STEPS = isEN ? STEPS_EN : STEPS_DE;
  const AFTER = isEN ? AFTER_EN : AFTER_DE;
  const FAQS = isEN ? FAQS_EN : FAQS_DE;

  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px 0" }} className="sfb-bc">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}>{isEN ? "Home" : "Startseite"}</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>{isEN ? "How it works" : "So funktioniert es"}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "white", padding: "20px 0 0" }}>
        <div style={W} className="sfb-w">
          <div className="sfb-hero-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }} className="sfb-hero-content">
              <span style={{ display: "inline-flex", alignItems: "center", fontFamily: F, fontSize: 12, fontWeight: 700, color: CTA, letterSpacing: "0.08em", background: "#EBF2FC", borderRadius: 999, padding: "5px 14px", width: "fit-content" }}>
                {isEN ? "HOW IT WORKS" : "SO FUNKTIONIERT ES"}
              </span>
              <h1 className="sfb-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                {isEN ? <>5 steps to<br />the right support</> : <>In 5 Schritten zur<br />richtigen Unterstützung</>}
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                {isEN
                  ? "From the first thought to regular support — we show you how straightforward the path to professional psychosocial help really is."
                  : "Von der ersten Überlegung bis zur regelmäßigen Begleitung — wir zeigen dir, wie einfach der Weg zu professioneller psychosozialer Unterstützung ist."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/orientierungsgespraech" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  {isEN ? "Get started" : "Jetzt starten"}
                </a>
                <a href="/fachkraefte" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid #C5D8F0`, color: CTA, fontFamily: F, fontWeight: 500, fontSize: 15, textDecoration: "none" }}>
                  {isEN ? "Browse specialists" : "Fachkräfte ansehen"}
                </a>
              </div>
            </div>
            <div className="sfb-hero-img" style={{ position: "relative", minHeight: 360, paddingBottom: 40 }}>
              <img src="/orientierungsgespraech-hero.jpg" alt={isEN ? "How it works" : "So funktioniert es"}
                style={{ position: "absolute", inset: "0 0 40px 0", width: "100%", height: "calc(100% - 40px)", objectFit: "cover", borderRadius: 20 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: "0 0 40px 0", background: "linear-gradient(135deg, #D8E8F7 0%, #EBF2FC 100%)", borderRadius: 20, zIndex: -1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="sfb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Your journey in 5 steps" : "Dein Weg in 5 Schritten"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 56 }}>{isEN ? "Clear, simple, and straightforward." : "Klar, einfach und ohne Umwege."}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="sfb-step" style={{ display: "flex", gap: 32, alignItems: "flex-start", paddingBottom: i < STEPS.length - 1 ? 40 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: F, fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 40, background: "#D8E8F7", marginTop: 4 }} />}
                </div>
                <div style={{ paddingTop: 12 }}>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "#1A1A1A", margin: "0 0 8px" }}>{step.title}</h3>
                  <p style={{ fontFamily: F, fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0, maxWidth: 600 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nach dem ersten Kontakt */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="sfb-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "What happens next?" : "Was passiert danach?"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>{isEN ? "After the first contact, your individual support begins." : "Nach dem ersten Kontakt beginnt deine individuelle Begleitung."}</p>
          <div className="sfb-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {AFTER.map(item => (
              <div key={item.title} style={{ background: "#F7F9FC", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "#1A1A1A", margin: 0 }}>{item.title}</h3>
                <p style={{ fontFamily: F, fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="sfb-w">
          <div className="sfb-faq-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Frequently asked questions" : "Häufige Fragen"}</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#888" }}>{isEN ? "Everything important at a glance." : "Alles Wichtige auf einen Blick."}</p>
            </div>
            <div>{FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: CTA, padding: "64px 0" }}>
        <div style={{ ...W, textAlign: "center" }} className="sfb-w">
          <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: 32, color: "white", margin: "0 0 12px" }}>{isEN ? "Ready for the first step?" : "Bereit für den ersten Schritt?"}</h2>
          <p style={{ fontFamily: F, fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 32px" }}>{isEN ? "Book your free initial consultation now." : "Buche jetzt dein Kostenloses Erstgespräch."}</p>
          <a href="/orientierungsgespraech" style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 36px", borderRadius: 9999, background: "white", color: CTA, fontFamily: F, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
            {isEN ? "Book initial consultation" : "Erstgespräch buchen"}
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        .sfb-bc { padding: 32px 80px 0 !important; }
        .sfb-w { padding-left: 80px !important; padding-right: 80px !important; }
        .sfb-h1 { font-size: 48px; }
        .sfb-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch; }
        .sfb-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        @media (max-width: 1070px) {
          .sfb-bc { padding: 16px 16px 0 !important; }
          .sfb-w { padding-left: 16px !important; padding-right: 16px !important; }
          .sfb-h1 { font-size: 32px !important; }
          .sfb-hero-grid { display: flex !important; flex-direction: column !important; }
          .sfb-hero-img { min-height: 200px !important; order: -1; margin-bottom: 16px; }
          .sfb-hero-img img { inset: 0 !important; height: 100% !important; }
          .sfb-hero-content { padding-bottom: 32px !important; }
          .sfb-cards { grid-template-columns: 1fr !important; }
          .sfb-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .sfb-step { gap: 16px !important; }
          section { padding-top: 40px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </>
  );
}
