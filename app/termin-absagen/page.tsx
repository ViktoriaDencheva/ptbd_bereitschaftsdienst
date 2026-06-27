"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 80px" } as const;

const INFO_CARDS = [
  {
    icon: "❌",
    title: "Termin absagen",
    items: [
      "Bis 24 Stunden vorher: kostenlos",
      "Unter 24 Stunden: Ausfallgebühr möglich",
      "Absage direkt über dein Profil oder per Telefon",
      "Die Fachkraft wird automatisch benachrichtigt",
    ],
  },
  {
    icon: "📅",
    title: "Termin verschieben",
    items: [
      "Jederzeit über dein Benutzerkonto möglich",
      "Neuen Termin direkt im Kalender der Fachkraft wählen",
      "Mindestens 24 Stunden vorher empfohlen",
      "Bei Engpässen: telefonisch mit der Fachkraft absprechen",
    ],
  },
  {
    icon: "⚠️",
    title: "Bei Problemen",
    items: [
      "Kontaktiere uns unter info@ptbd.at",
      "Telefonisch: +43 1 3672222 (Mo–Fr 9–18 Uhr)",
      "Wir helfen dir, einen neuen Termin zu finden",
      "Notfälle: Krisenhilfe unter 142",
    ],
  },
];

const FAQS = [
  { q: "Wie sage ich einen Termin ab?", a: "Du kannst Termine über dein Benutzerprofil auf der Plattform absagen. Alternativ kannst du direkt die Beratungsstelle kontaktieren oder uns per E-Mail schreiben." },
  { q: "Entstehen Kosten, wenn ich kurzfristig absage?", a: "Bei Absagen unter 24 Stunden kann die Fachkraft eine Ausfallgebühr verlangen. Bitte lies dazu die Stornobedingungen der jeweiligen Fachkraft in ihrem Profil." },
  { q: "Was passiert, wenn ich einen Termin vergesse?", a: "Vergessene Termine gelten als kurzfristige Absagen und können kostenpflichtig sein. Wir senden dir Erinnerungen per E-Mail vor deinem Termin." },
  { q: "Kann ich einen Termin auf eine andere Fachkraft übertragen?", a: "Nein, Termine sind personengebunden. Du kannst aber jederzeit einen neuen Termin bei einer anderen Fachkraft buchen." },
  { q: "Was tue ich, wenn ich dringend Unterstützung brauche und meinen Termin verschieben muss?", a: "Kontaktiere uns direkt — wir suchen gemeinsam mit dir nach einem möglichst frühen Ersatztermin oder einer anderen geeigneten Fachkraft." },
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

export default function TerminAbsagenPage() {
  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px 0" }} className="ta-bc">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}>Startseite</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>Termin absagen & verschieben</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "white", padding: "20px 0 0" }}>
        <div style={W} className="ta-w">
          <div className="ta-hero-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }} className="ta-hero-content">
              <span style={{ display: "inline-flex", alignItems: "center", fontFamily: F, fontSize: 12, fontWeight: 700, color: CTA, letterSpacing: "0.08em", background: "#EBF2FC", borderRadius: 999, padding: "5px 14px", width: "fit-content" }}>
                TERMINVERWALTUNG
              </span>
              <h1 className="ta-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                Termin absagen<br />oder verschieben
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                Manchmal lässt sich ein Termin nicht halten. Hier erfährst du, wie du einfach und unkompliziert einen Termin absagen oder verschieben kannst.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/profil" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  Zu meinen Terminen
                </a>
                <a href="mailto:info@ptbd.at" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid #C5D8F0`, color: CTA, fontFamily: F, fontWeight: 500, fontSize: 15, textDecoration: "none" }}>
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
            <div className="ta-hero-img" style={{ position: "relative", minHeight: 360, paddingBottom: 40 }}>
              <div style={{ position: "absolute", inset: "0 0 40px 0", background: "linear-gradient(135deg, #D8E8F7 0%, #EBF2FC 100%)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: 80, opacity: 0.15 }}>📅</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="ta-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>Alles auf einen Blick</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>Was du wissen musst, wenn sich dein Termin ändert.</p>
          <div className="ta-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {INFO_CARDS.map(card => (
              <div key={card.title} style={{ background: "white", borderRadius: 14, padding: 28, border: "1.5px solid #E8EFF8", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{card.icon}</span>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 17, color: "#1A1A1A", margin: 0 }}>{card.title}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: F, fontSize: 14, color: "#555", lineHeight: 1.5 }}>
                      <span style={{ color: CTA, fontWeight: 700, flexShrink: 0 }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight: Stornofrist */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="ta-w">
          <div style={{ background: "#FEF6ED", borderRadius: 16, border: "1.5px solid #F5D5A8", padding: "32px 40px", display: "flex", gap: 24, alignItems: "flex-start" }} className="ta-highlight">
            <span style={{ fontSize: 36, flexShrink: 0 }}>⏰</span>
            <div>
              <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 20, color: "#7A4F1E", margin: "0 0 8px" }}>Bitte 24 Stunden vorher absagen</h3>
              <p style={{ fontFamily: F, fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
                Fachkräfte reservieren Zeit exklusiv für dich. Eine Absage mindestens 24 Stunden vorher gibt ihnen die Möglichkeit, den Termin anderweitig zu vergeben — und schützt dich vor einer möglichen Ausfallgebühr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="ta-w">
          <div className="ta-faq-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>Häufige Fragen</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#888" }}>Fragen rund um Storno & Verschiebung.</p>
            </div>
            <div>{FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .ta-bc { padding: 32px 80px 0 !important; }
        .ta-w { padding-left: 80px !important; padding-right: 80px !important; }
        .ta-h1 { font-size: 48px; }
        .ta-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch; }
        .ta-cards { grid-template-columns: repeat(3, 1fr); }
        .ta-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        .ta-highlight { flex-direction: row; }
        @media (max-width: 1070px) {
          .ta-bc { padding: 16px 16px 0 !important; }
          .ta-w { padding-left: 16px !important; padding-right: 16px !important; }
          .ta-h1 { font-size: 32px !important; }
          .ta-hero-grid { display: flex !important; flex-direction: column !important; }
          .ta-hero-img { min-height: 180px !important; order: -1; margin-bottom: 16px; }
          .ta-hero-content { padding-bottom: 32px !important; }
          .ta-cards { grid-template-columns: 1fr !important; }
          .ta-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ta-highlight { flex-direction: column !important; padding: 20px !important; }
          section { padding-top: 40px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </>
  );
}
