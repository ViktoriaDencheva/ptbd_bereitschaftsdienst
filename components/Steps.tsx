"use client";
const imgStep1 = "https://www.figma.com/api/mcp/asset/2f05a912-e646-4462-8f01-a68d96650a22";
const imgStep2 = "https://www.figma.com/api/mcp/asset/2aa70db3-631e-4d92-a717-ff7ff3b25a40";
const imgStep3 = "https://www.figma.com/api/mcp/asset/f28b6c2f-5ab1-42fb-88c5-8549a1f61071";
const imgStep4 = "https://www.figma.com/api/mcp/asset/f786f521-b399-4a0b-a7fa-b3a1de19c7cb";

const steps = [
  { num: "01", img: imgStep1, title: "Vorgespräch oder Test wählen", desc: "Wir helfen Dir, die passende Fachkraft zu finden - abgestimmt auf deine Bedürfnisse und Wünsche." },
  { num: "02", img: imgStep2, title: "Passende Spezialist*innen erhalten", desc: "Auf Basis Deiner Angaben schlagen wir Dir geeignete Fachkräfte vor." },
  { num: "03", img: imgStep3, title: "Termin online oder vor Ort buchen", desc: "Buche online oder vor Ort - so, wie es am besten in deinen Alltag passt." },
  { num: "04", img: imgStep4, title: "Beratung direkt über die Plattform starten", desc: "Starte deine Unterstützung und erhalte genau die Begleitung, die Du brauchst – direkt hier auf der Plattform." },
];

function StepCard({ step, mobile = false }: { step: typeof steps[0]; mobile?: boolean }) {
  return (
    <div className="step-card" style={{ background: "var(--red-light)", borderRadius: 16, overflow: "hidden", display: "flex", alignItems: "stretch", minHeight: mobile ? "auto" : 254 }}>
      {/* Text — number not clipped, shows fully */}
      <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, flex: mobile ? "none" : "0 0 310px", width: mobile ? "auto" : undefined }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: mobile ? 72 : 100, lineHeight: 1, color: "#D4BAB8", display: "block" }}>{step.num}</span>
        <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: mobile ? 18 : 20, lineHeight: 1.4, color: "var(--black)" }}>{step.title}</h3>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: mobile ? 14 : 16, lineHeight: 1.5, color: "var(--grey)" }}>{step.desc}</p>
      </div>
      {/* Image */}
      {!mobile && (
        <div style={{ flex: 1, minHeight: 254, overflow: "hidden", position: "relative" }}>
          <img src={step.img} alt={step.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
      {mobile && (
        <div style={{ width: 140, flexShrink: 0, overflow: "hidden", position: "relative" }}>
          <img src={step.img} alt={step.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
    </div>
  );
}

export default function Steps() {
  return (
    <section style={{ background: "white" }}>
      {/* ===== DESKTOP ===== */}
      <div className="steps-desktop" style={{ padding: "48px 80px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)", flex: "0 0 auto", maxWidth: 500 }}>So einfach kommst Du zu passender Unterstützung</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey)", flex: "0 0 auto", maxWidth: 420, textAlign: "right" }}>In vier einfachen Schritten begleiten wir Dich auf dem Weg zu mehr Wohlbefinden.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {steps.map(s => <StepCard key={s.num} step={s} />)}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="steps-mobile" style={{ display: "none", padding: "32px 16px" }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)", marginBottom: 12 }}>So einfach kommst Du zu passender Unterstützung</h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)" }}>In vier einfachen Schritten begleiten wir Dich auf dem Weg zu mehr Wohlbefinden.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map(s => <StepCard key={s.num} step={s} mobile />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-desktop { display: none !important; }
          .steps-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
