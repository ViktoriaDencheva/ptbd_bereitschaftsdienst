"use client";
import { useRef, useState } from "react";





const steps = [
  { num: "01", img: "/steps/step1-desktop.jpg", imgMob: "/steps/step1-mobile.jpg", title: "Vorgespräch oder Test wählen", desc: "Wir helfen Dir, die passende Fachkraft zu finden - abgestimmt auf deine Bedürfnisse und Wünsche." },
  { num: "02", img: "/steps/step2-desktop.jpg", imgMob: "/steps/step2-mobile.jpg", title: "Passende Spezialist*innen erhalten", desc: "Auf Basis Deiner Angaben schlagen wir Dir geeignete Fachkräfte vor." },
  { num: "03", img: "/steps/step3-desktop.jpg", imgMob: "/steps/step4-mobile.jpg", title: "Termin online oder vor Ort buchen", desc: "Buche online oder vor Ort - so, wie es am besten in deinen Alltag passt." },
  { num: "04", img: "/steps/step4-desktop.jpg", imgMob: "/steps/step3-mobile.jpg", title: "Beratung direkt über die Plattform starten", desc: "Starte deine Unterstützung und erhalte genau die Begleitung, die Du brauchst – direkt hier auf der Plattform." },
];

function StepCard({ step, mobile = false }: { step: typeof steps[0] & { imgMob: string }; mobile?: boolean }) {
  return (
    <div className="step-card" style={{ background: "var(--red-bg)", borderRadius: 16, overflow: "hidden", display: "flex", alignItems: "stretch", minHeight: mobile ? "auto" : 254, border: "1px solid transparent", transition: "all var(--duration-base) var(--ease-standard)", cursor: "pointer" }}>
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / (el.scrollWidth / steps.length));
    setActiveIndex(index);
  };

  return (
    <section style={{ background: "white" }}>
      {/* ===== DESKTOP ===== */}
      <div className="steps-desktop" style={{ padding: "48px 80px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)", width: "50%" }}>
              <span style={{ display: "block" }}>So einfach kommst Du zu</span>
              <span style={{ display: "block" }}>passender Unterstützung</span>
            </h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)", width: "40%", textAlign: "right", alignSelf: "center" }}>In vier einfachen Schritten begleiten wir Dich auf dem Weg zu mehr Wohlbefinden.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {steps.map(s => <StepCard key={s.num} step={s} />)}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="steps-mobile" style={{ display: "none", padding: "32px 16px", background: "white" }}>
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
            So einfach kommst Du zu passender Unterstützung
          </h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
            In vier einfachen Schritten begleiten wir Dich auf dem Weg zu mehr Wohlbefinden.
          </p>
        </div>
        {/* Cards — хоризонтален скрол */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          style={{
            display: "flex", gap: 12,
            overflowX: "auto", scrollSnapType: "x mandatory",
            paddingBottom: 8,
            scrollbarWidth: "none",
          }}
        >
          {steps.map(s => (
            <div key={s.num} style={{
              background: "var(--red-bg)", borderRadius: 16, overflow: "hidden",
              minWidth: "85vw", maxWidth: "85vw", flexShrink: 0,
              scrollSnapAlign: "start",
            }}>
              {/* Image top */}
              <div style={{ height: 146, position: "relative", overflow: "hidden" }}>
                <img src={s.imgMob} alt={s.title} className="photo-warm" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Text bottom */}
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 56, lineHeight: 1.3, color: "#D4BAB8", flexShrink: 0 }}>{s.num}</span>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 18, lineHeight: 1.4, color: "var(--black)", margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot индикатор */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                height: 8,
                width: i === activeIndex ? 24 : 8,
                borderRadius: 9999,
                background: i === activeIndex ? "var(--cta)" : "#D4BAB8",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .step-card:hover {
          background: white !important;
          border-color: var(--red-dark-primary) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        }
        @media (max-width: 1070px) {
          .steps-desktop { display: none !important; }
          .steps-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
