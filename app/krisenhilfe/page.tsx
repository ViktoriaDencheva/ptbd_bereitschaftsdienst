"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

const F = "'Poppins', sans-serif";
const CTA = "#2D5B8D";
const RED = "#C0191C";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 80px" } as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  // (no useLang needed — q/a come from parent as translated strings)
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

export default function KrisenhilfePage() {
  const { lang } = useLang();
  const isEN = lang === 'en';

  const HOTLINES = isEN ? [
    { name: "Telephone Counselling", number: "142", desc: "24/7 · free · anonymous", href: "tel:142", urgent: true },
    { name: "Ö3 Helpline", number: "116 123", desc: "24/7 · free", href: "tel:116123", urgent: false },
    { name: "Emergency", number: "133 / 112", desc: "In acute danger of life", href: "tel:112", urgent: true },
    { name: "Psychosocial Service Vienna", number: "+43 1 313 30", desc: "Mon–Fri · 8:00–20:00", href: "tel:+431313 30", urgent: false },
    { name: "Crisis Intervention Centre Vienna", number: "+43 1 406 95 95", desc: "24/7 · Walk-in available", href: "tel:+43140695 95", urgent: false },
    { name: "Rat auf Draht (Young People)", number: "147", desc: "24/7 · free · anonymous", href: "tel:147", urgent: false },
  ] : [
    { name: "Telefonseelsorge", number: "142", desc: "24/7 · kostenlos · anonym", href: "tel:142", urgent: true },
    { name: "Ö3-Kummernummer", number: "116 123", desc: "24/7 · kostenlos", href: "tel:116123", urgent: false },
    { name: "Notruf", number: "133 / 112", desc: "Bei akuter Lebensgefahr", href: "tel:112", urgent: true },
    { name: "Psychosozialer Dienst Wien", number: "+43 1 313 30", desc: "Mo–Fr · 8:00–20:00", href: "tel:+431313 30", urgent: false },
    { name: "Kriseninterventionszentrum Wien", number: "+43 1 406 95 95", desc: "24/7 · Walk-in möglich", href: "tel:+43140695 95", urgent: false },
    { name: "Rat auf Draht (Jugendliche)", number: "147", desc: "24/7 · kostenlos · anonym", href: "tel:147", urgent: false },
  ];

  const SIGNS = isEN ? [
    "Persistent hopelessness or emptiness",
    "Thoughts of harming yourself",
    "Suicidal thoughts or plans",
    "Severe panic attacks that won't stop",
    "Complete withdrawal from all people",
    "Inability to cope with daily life",
    "Acute loss of reality",
  ] : [
    "Anhaltende Hoffnungslosigkeit oder Leere",
    "Gedanken daran, sich selbst zu schaden",
    "Suizidgedanken oder -pläne",
    "Starke Panikattacken, die nicht aufhören",
    "Völliger Rückzug von allen Menschen",
    "Unfähigkeit, den Alltag zu bewältigen",
    "Akuter Realitätsverlust",
  ];

  const ORGAS = isEN ? [
    { name: "Crisis Intervention Centre Vienna", url: "https://www.kiz-wien.at", desc: "Outpatient crisis intervention, walk-in and telephone" },
    { name: "Psychosocial Service (PSD)", url: "https://www.psd-wien.at", desc: "Psychosocial counselling and support in Vienna" },
    { name: "Suicide Prevention Austria (SUPRA)", url: "https://www.suizidpraevention.at", desc: "Prevention, counselling and information" },
    { name: "pro mente austria", url: "https://www.promenteaustria.at", desc: "Network of psychosocial facilities across Austria" },
  ] : [
    { name: "Kriseninterventionszentrum Wien", url: "https://www.kiz-wien.at", desc: "Ambulante Krisenintervention, Walk-in und Telefon" },
    { name: "Psychosozialer Dienst (PSD)", url: "https://www.psd-wien.at", desc: "Psychosoziale Beratung und Betreuung in Wien" },
    { name: "Suizidprävention Austria (SUPRA)", url: "https://www.suizidpraevention.at", desc: "Prävention, Beratung und Informationen" },
    { name: "pro mente austria", url: "https://www.promenteaustria.at", desc: "Netzwerk psychosozialer Einrichtungen österreichweit" },
  ];

  const STEPS = isEN ? [
    { icon: "📞", text: "Call the telephone counselling service immediately: 142 (free, 24/7)" },
    { icon: "🧘", text: "Get yourself to safety — move away from possible sources of danger" },
    { icon: "👤", text: "Call a trusted person or ask someone to stay with you" },
    { icon: "🏥", text: "Go to the nearest psychiatric emergency unit or call emergency services (112)" },
  ] : [
    { icon: "📞", text: "Ruf sofort die Telefonseelsorge an: 142 (kostenlos, 24/7)" },
    { icon: "🧘", text: "Bring dich in Sicherheit — entferne dich von möglichen Gefahrenquellen" },
    { icon: "👤", text: "Ruf eine vertraute Person an oder bitte jemanden, bei dir zu bleiben" },
    { icon: "🏥", text: "Fahre in die nächste psychiatrische Notaufnahme oder ruf den Notruf (112) an" },
  ];

  const FAQS = isEN ? [
    { q: "When is it a crisis?", a: "A crisis occurs when you feel overwhelmed, hopeless or in danger — and no longer see any personal resources to cope with it. Trust your feelings. If you're unsure, just call." },
    { q: "Is the telephone counselling service really free and anonymous?", a: "Yes. The number 142 is free, available 24 hours a day and completely anonymous. You don't have to give your name." },
    { q: "What if I can't speak myself?", a: "Then call 112 and keep the phone open — emergency services are also active during silent calls. Alternatively: send an SMS or email to a crisis centre." },
    { q: "Can I also call on behalf of someone else?", a: "Yes, you can also call if you're worried about another person. The telephone counselling service will also advise you in such situations." },
  ] : [
    { q: "Wann ist es eine Krise?", a: "Eine Krise liegt vor, wenn du dich überfordert, hoffnungslos oder in Gefahr fühlst — und keine eigenen Ressourcen mehr siehst, um damit umzugehen. Vertraue deinem Gefühl. Wenn du dir nicht sicher bist, ruf einfach an." },
    { q: "Ist die Telefonseelsorge wirklich kostenlos und anonym?", a: "Ja. Die Nummer 142 ist kostenlos, 24 Stunden täglich erreichbar und absolut anonym. Du musst deinen Namen nicht nennen." },
    { q: "Was, wenn ich selbst nicht sprechen kann?", a: "Dann ruf 112 an und halt das Telefon offen — der Notruf ist auch bei stillen Anrufen aktiv. Alternativ: Schreib eine SMS oder E-Mail an eine Kriseneinrichtung." },
    { q: "Kann ich auch für jemand anderen anrufen?", a: "Ja, du kannst auch dann anrufen, wenn du dir Sorgen um eine andere Person machst. Die Telefonseelsorge berät dich auch in solchen Situationen." },
  ];

  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px 0" }} className="kh-bc">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <Link href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}>{isEN ? "Home" : "Startseite"}</Link>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>{isEN ? "Crisis Help" : "Krisenhilfe"}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "white", padding: "20px 0 0" }}>
        <div style={W} className="kh-w">
          <div className="kh-hero-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }} className="kh-hero-content">
              <span style={{ display: "inline-flex", alignItems: "center", fontFamily: F, fontSize: 12, fontWeight: 700, color: RED, letterSpacing: "0.08em", background: "#FEF0F0", borderRadius: 999, padding: "5px 14px", width: "fit-content" }}>
                {isEN ? "CRISIS HELP" : "KRISENHILFE"}
              </span>
              <h1 className="kh-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                {isEN ? <>You are not alone —<br />Help is here</> : <>Du bist nicht allein —<br />Hilfe ist da</>}
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                {isEN
                  ? "If you are in an acute crisis or having suicidal thoughts, please contact one of the services listed below immediately. Help is free and available around the clock."
                  : "Wenn du dich in einer akuten Krise befindest oder an Suizid denkst, wende dich bitte sofort an eine der unten angeführten Stellen. Hilfe ist kostenlos und rund um die Uhr erreichbar."}
              </p>
              {/* Emergency CTA */}
              <Link href="tel:142" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 28px", borderRadius: 9999, background: RED, color: "white", fontFamily: F, fontWeight: 700, fontSize: 16, textDecoration: "none", width: "fit-content" }}>
                <span style={{ fontSize: 20 }}>📞</span> {isEN ? "Call now: 142" : "Jetzt anrufen: 142"}
              </Link>
              <p style={{ fontFamily: F, fontSize: 13, color: "#888", margin: 0 }}>{isEN ? "Telephone Counselling · free · 24/7 · anonymous" : "Telefonseelsorge · kostenlos · 24/7 · anonym"}</p>
            </div>
            <div className="kh-hero-img" style={{ position: "relative", minHeight: 360, paddingBottom: 40 }}>
              <div style={{ position: "absolute", inset: "0 0 40px 0", background: "linear-gradient(135deg, #FEF0F0 0%, #FDE8E8 100%)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: F, fontSize: 80, opacity: 0.2 }}>🤝</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotlines */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="kh-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Crisis Hotlines in Austria" : "Krisenhotlines in Österreich"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>{isEN ? "All numbers are free to call." : "Alle Nummern sind kostenlos erreichbar."}</p>
          <div className="kh-hotlines" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {HOTLINES.map(h => (
              <Link key={h.name} href={h.href} style={{ display: "flex", alignItems: "center", gap: 16, background: "white", borderRadius: 14, padding: "20px 24px", border: h.urgent ? `2px solid ${RED}` : "1.5px solid #E8EFF8", textDecoration: "none", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                  <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "#1A1A1A" }}>{h.name}</span>
                  <span style={{ fontFamily: F, fontSize: 13, color: "#888" }}>{h.desc}</span>
                </div>
                <span style={{ fontFamily: F, fontWeight: 800, fontSize: 22, color: h.urgent ? RED : CTA, flexShrink: 0 }}>{h.number}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Warnzeichen */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="kh-w">
          <div className="kh-signs-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "When to get help immediately?" : "Wann sofort Hilfe holen?"}</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#555", lineHeight: 1.7 }}>
                {isEN
                  ? "These warning signs show that you need professional support right now — please don't hesitate."
                  : "Diese Warnsignale zeigen, dass du jetzt sofort professionelle Unterstützung benötigst — bitte zögere nicht."}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {SIGNS.map((sign, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < SIGNS.length - 1 ? "1px solid #E8EFF8" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: RED, flexShrink: 0 }} />
                  <span style={{ fontFamily: F, fontSize: 15, color: "#333" }}>{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Was tun in einer Krise */}
      <section style={{ background: "#FEF6F6", padding: "72px 0" }}>
        <div style={W} className="kh-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "What to do in a crisis?" : "Was tun in einer Krise?"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>{isEN ? "Step by step." : "Schritt für Schritt."}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 680 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", paddingBottom: i < STEPS.length - 1 ? 32 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: RED, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{step.icon}</div>
                  {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 32, background: "#F5C0C0", marginTop: 4 }} />}
                </div>
                <p style={{ fontFamily: F, fontSize: 15, color: "#333", lineHeight: 1.7, margin: "12px 0 0" }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisationen */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="kh-w">
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Further Support Organisations" : "Weitere Hilfsorganisationen"}</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", marginBottom: 40 }}>{isEN ? "Professional support throughout Austria." : "Professionelle Unterstützung in ganz Österreich."}</p>
          <div className="kh-orgas" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {ORGAS.map(org => (
              <Link key={org.name} href={org.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", gap: 6, background: "#F7F9FC", borderRadius: 14, padding: "20px 24px", border: "1.5px solid #E8EFF8", textDecoration: "none", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: CTA }}>{org.name}</span>
                <span style={{ fontFamily: F, fontSize: 13, color: "#666" }}>{org.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="kh-w">
          <div className="kh-faq-grid">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{isEN ? "Frequently Asked Questions" : "Häufige Fragen"}</h2>
              <p style={{ fontFamily: F, fontSize: 15, color: "#888" }}>{isEN ? "Questions about crisis help." : "Fragen zur Krisenhilfe."}</p>
            </div>
            <div>{FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .kh-bc { padding: 32px 80px 0 !important; }
        .kh-w { padding-left: 80px !important; padding-right: 80px !important; }
        .kh-h1 { font-size: 48px; }
        .kh-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch; }
        .kh-hotlines { grid-template-columns: repeat(2, 1fr); }
        .kh-signs-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        .kh-orgas { grid-template-columns: repeat(2, 1fr); }
        .kh-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        @media (max-width: 1070px) {
          .kh-bc { padding: 16px 16px 0 !important; }
          .kh-w { padding-left: 16px !important; padding-right: 16px !important; }
          .kh-h1 { font-size: 32px !important; }
          .kh-hero-grid { display: flex !important; flex-direction: column !important; }
          .kh-hero-img { min-height: 180px !important; order: -1; margin-bottom: 16px; }
          .kh-hero-content { padding-bottom: 32px !important; }
          .kh-hotlines { grid-template-columns: 1fr !important; }
          .kh-signs-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .kh-orgas { grid-template-columns: 1fr !important; }
          .kh-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          section { padding-top: 40px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </>
  );
}
