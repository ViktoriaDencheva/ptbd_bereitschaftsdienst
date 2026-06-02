"use client";
import { useState } from "react";

const imgWoman = "https://www.figma.com/api/mcp/asset/2457d92b-1632-4139-bce2-9a4d759c09db";
const imgIconVorgespräch = "https://www.figma.com/api/mcp/asset/d5f705e4-c78e-40a8-9337-c0bbded3e09a";
const imgIconTest = "https://www.figma.com/api/mcp/asset/1aa48ba3-7471-4d10-81c7-719154cabebd";
const imgCheckmark = "https://www.figma.com/api/mcp/asset/303aedc1-6280-4d88-80d4-4f65c94149a7";
const imgArrow = "https://www.figma.com/api/mcp/asset/2bfd19d0-e923-4b85-9c1e-8f93db83bc8a";
const imgTabIconVorgespräch = "https://www.figma.com/api/mcp/asset/0c07f2ce-4085-4a5d-bad7-5693f529ee75";
const imgTabIconTest = "https://www.figma.com/api/mcp/asset/7982cb15-83f9-4e4f-b58e-16c5d18adc4e";

const tabs = [
  { id: "vorgespräch", label: "Vorgespräch vereinbaren", icon: imgTabIconVorgespräch },
  { id: "test", label: "Orientierungstest", icon: imgTabIconTest },
];

export default function HowToStart() {
  const [activeTab, setActiveTab] = useState("vorgespräch");
  const isV = activeTab === "vorgespräch";

  const bullets = isV
    ? ["Kostenlos & unverbindlich", "Individiell & vertraulich", "Mit erfahrenen Fachkräften", "Online oder in deiner Nähe"]
    : ["Kostenlos & anonym", "Nur 5 Minuten", "Sofortige Empfehlung", "Ohne Registrierung"];

  const tabContent = (
    <div>
      {/* Tab headers */}
      <div style={{ display: "flex" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px 8px", background: activeTab === tab.id ? "var(--blue-subtle)" : "transparent", border: "none", borderBottom: activeTab === tab.id ? "1px solid var(--red-primary)" : "1px solid transparent", borderRadius: "16px 16px 0 0", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: activeTab === tab.id ? 500 : 400, fontSize: 16, color: activeTab === tab.id ? "var(--black)" : "var(--grey)", whiteSpace: "nowrap", transition: "all 0.2s" }}>
            <img src={tab.icon} alt="" style={{ width: 24, height: 24 }} />
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab card */}
      <div style={{ background: "linear-gradient(180deg, var(--blue-subtle) 0%, white 100%)", borderRadius: "0 16px 16px 16px", padding: 24, display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Icon */}
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, white 0%, var(--red-light-system) 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <img src={isV ? imgIconVorgespräch : imgIconTest} alt="" style={{ width: 36, height: 36 }} />
        </div>
        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 24, lineHeight: 1.3, color: "var(--black)", whiteSpace: "nowrap" }}>
              {isV ? "Persönliches Gespräch" : "Online-Test machen"}
            </h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)" }}>
              {isV ? "Du musst nicht selbst wissen, an wen Du Dich wenden sollst. In einem kurzen und unverbindlichen Gespräch helfen wir Dir dabei, die passende Unterstützung zu finden." : "Wenn Du lieber selbst herausfinden möchtest, wer zu Dir passt, kannst Du unseren anonymen Orientierungstest ausfüllen."}
            </p>
          </div>
          {/* Bullets + Button side by side */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {bullets.map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "var(--grey)", fontFamily: "'Poppins',sans-serif" }}>
                  <img src={imgCheckmark} alt="✓" style={{ width: 20, height: 20, flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
            <button style={{ background: "var(--blue-dark)", color: "white", border: "none", borderRadius: "var(--radius-full)", padding: "12px 24px", height: 48, fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", transition: "background 0.2s", flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-primary)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--blue-dark)")}
            >
              {isV ? "kostenloses Erstgespräch" : "Test beginnen"}
              <img src={imgArrow} alt="" style={{ width: 24, height: 24 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section style={{ background: "white", paddingTop: 100 }}>
      {/* ===== DESKTOP ===== */}
      <div className="how-desktop" style={{ padding: "0 80px 80px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left image */}
          <div style={{ borderRadius: 20, overflow: "hidden", height: 601 }}>
            <img src={imgWoman} alt="Therapist" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Right content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, color: "var(--red-primary)", lineHeight: 1.5, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>SO KÖNNEN WIR HELFEN</span>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)" }}>Wie möchtest du starten?</h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey)" }}>
                Wähle den Weg, der sich für dich im Moment richtig anfühlt. Beides ist kostenlos, vertraulich und unverbindlich.
              </p>
            </div>
            {tabContent}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="how-mobile" style={{ display: "none", padding: "0 16px 48px" }}>
        {/* Image top */}
        <div style={{ borderRadius: 16, overflow: "hidden", height: 350, marginBottom: 24 }}>
          <img src={imgWoman} alt="Therapist" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: "var(--red-primary)", textTransform: "uppercase" as const }}>SO KÖNNEN WIR HELFEN</span>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)" }}>Wie möchtest du starten?</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)" }}>
              Wähle den Weg, der sich für dich im Moment richtig anfühlt. Beides ist kostenlos, vertraulich und unverbindlich.
            </p>
          </div>
          {tabContent}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .how-desktop { display: none !important; }
          .how-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
