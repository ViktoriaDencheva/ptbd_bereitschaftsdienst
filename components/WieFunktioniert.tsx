"use client";
const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

const steps = [
  {
    n: "01",
    title: "Erstgespräch buchen",
    sub: "Sofort & unverbindlich",
    desc: "Du buchst ein kostenloses 30-minütiges Erstgespräch — online oder in deiner Nähe. Keine Warteliste, kein Bürokratieaufwand.",
    highlight: "Kostenlos · Online oder vor Ort · Innerhalb von 3–5 Tagen",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: "02",
    title: "Bedarf klären",
    sub: "Persönlich & vertraulich",
    desc: "Im Erstgespräch hörst du zu und wirst gehört. Eine erfahrene Fachkraft hilft dir, deine Situation einzuschätzen und den richtigen nächsten Schritt zu finden.",
    highlight: "Kein Druck · Individuelle Einschätzung · Völlig anonym",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    n: "03",
    title: "Therapeut:in finden",
    sub: "Passend zu dir",
    desc: "Basierend auf deinen Themen, Wünschen und Verfügbarkeit empfehlen wir dir passende Fachkräfte. Du entscheidest — wir begleiten.",
    highlight: "35+ Fachkräfte · Nach Methode & Ort filterbar · Kassenplätze möglich",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: "04",
    title: "Therapie starten",
    sub: "Innerhalb einer Woche",
    desc: "Du beginnst deine Therapie — strukturiert, professionell, auf dich zugeschnitten. Der Prozess dauert so lange, wie du ihn brauchst.",
    highlight: "Therapie ab 50€ · Krankenkasse anerkannt · Flexibel & digital",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function WieFunktioniert() {
  return (
    <section style={{ background: "white", padding: "80px 0" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 80px" }} className="wf-inner">

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 52, textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>So einfach geht's</p>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 32, color: "var(--black)", margin: 0 }}>Wie funktioniert es?</h2>
          <p style={{ fontFamily: F, fontSize: 16, color: "var(--grey-text)", margin: 0, maxWidth: 480, lineHeight: 1.7 }}>
            Von der ersten Anfrage bis zum Therapiebeginn — alles in einer Woche.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 52 }} className="wf-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: 22, left: "calc(50% + 28px)", right: "calc(-50% + 28px)", height: 1, background: "linear-gradient(to right, var(--cta), #C0D8F5)", display: "var(--wf-connector-display, block)" }} className="wf-connector" />
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 16, background: "var(--blue-ultra-light)", borderRadius: 20, padding: "28px 20px 24px", flex: 1 }}>
                {/* Step number + icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: F, fontWeight: 800, fontSize: 13, color: CTA, letterSpacing: "0.05em" }}>{s.n}</span>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "white", display: "flex", alignItems: "center", justifyContent: "center", color: CTA, boxShadow: "0 2px 10px rgba(45,91,141,0.12)" }}>
                    {s.icon}
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: "0 0 4px" }}>{s.title}</p>
                  <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, margin: "0 0 10px" }}>{s.sub}</p>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
                <div style={{ background: "white", borderRadius: 10, padding: "8px 12px", fontFamily: F, fontSize: 12, color: CTA, fontWeight: 500, lineHeight: 1.5 }}>
                  {s.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: CTA, color: "white", borderRadius: 9999, padding: "14px 32px", fontFamily: F, fontWeight: 600, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 20px rgba(45,91,141,0.28)" }}>
            Jetzt Erstgespräch buchen — kostenlos
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 1070px) {
          .wf-inner { padding: 0 20px !important; }
          .wf-inner h2 { font-size: 24px !important; }
          .wf-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .wf-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
