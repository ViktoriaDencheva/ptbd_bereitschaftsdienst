"use client";
import React, { useState } from "react";

const imgWoman = "/fachkraefte/specialist-howtostart.jpg";
const imgCheckmark = "/icons/icon-check.svg";

const IconVorgespraech = ({ size = 24 }: { size?: number }) => (
  <img src="/icons/icon-vorgespraech.svg" width={size} height={size} alt="" style={{ objectFit: "contain", flexShrink: 0, pointerEvents: "none" }} />
);
const IconTest = ({ size = 24 }: { size?: number }) => (
  <img src="/icons/icon-test.svg" width={size} height={size} alt="" style={{ objectFit: "contain", flexShrink: 0, pointerEvents: "none" }} />
);
const IconArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/>
  </svg>
);

const tabs = [
  { id: "vorgespräch", label: "Vorgespräch vereinbaren", labelMobile: "Vorgespräch", Icon: IconVorgespraech },
  { id: "test",        label: "Orientierungstest",       labelMobile: "Orientierungstest", Icon: IconTest },
];

const bulletsV = ["Kostenlos & unverbindlich", "Individiell & vertraulich", "Mit erfahrenen Fachkräften", "Online oder in deiner Nähe"];
const bulletsT = ["Kostenlos & anonym", "Nur 5 Minuten", "Sofortige Empfehlung", "Ohne Registrierung"];

export default function HowToStart() {
  const [activeTab, setActiveTab] = useState("vorgespräch");
  const isV = activeTab === "vorgespräch";
  const bullets = isV ? bulletsV : bulletsT;

  const tabContent = (
    <div>
      {/* Tab headers — опростени */}
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 20px",
              background: active ? "var(--blue-ultra-light)" : "transparent",
              border: "none",
              borderBottom: active ? "2px solid var(--cta-brand)" : "2px solid transparent",
              borderRadius: "12px 12px 0 0",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: active ? 600 : 400,
              fontSize: 15,
              color: active ? "var(--black)" : "var(--grey-text)",
              whiteSpace: "nowrap" as const,
              transition: "all 0.2s ease",
            }}>
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab card — опростена, фокус върху primary action */}
      <div style={{
        background: "linear-gradient(160deg, var(--blue-ultra-light) 0%, #ffffff 60%)",
        borderRadius: "0 16px 16px 16px",
        padding: "32px 28px",
        display: "flex", flexDirection: "column", gap: 24,
      }}>
        {/* Заглавие + описание */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            {isV ? <IconVorgespraech size={28} /> : <IconTest size={28} />}
          </div>
          <div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 22, lineHeight: 1.3, color: "var(--black)", margin: "0 0 8px" }}>
              {isV ? "Persönliches Gespräch" : "Online-Test machen"}
            </h3>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "var(--grey-text)", margin: 0, maxWidth: 420 }}>
              {isV
                ? "Kostenlos, unverbindlich und vertraulich. Wir helfen Dir, die passende Fachkraft zu finden."
                : "In nur 5 Minuten. Anonym, kostenlos und ohne Registrierung."}
            </p>
          </div>
        </div>

        {/* 3 bullet points — kompakt */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map(b => (
            <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--grey-text)", fontFamily: "'Poppins', sans-serif" }}>
              <img src={imgCheckmark} alt="✓" style={{ width: 18, height: 18, flexShrink: 0 }} />
              {b}
            </li>
          ))}
        </ul>

        {/* Primary CTA — prominent */}
        <a
          href={isV ? "/vorgespraech" : "/orientierungstest"}
          style={{ alignSelf: "flex-start", background: "var(--cta)", color: "white", border: "none", borderRadius: "var(--radius-circle)", padding: "0 28px", height: 52, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
        >
          {isV ? "Kostenloses Erstgespräch" : "Test beginnen"}
          <IconArrow />
        </a>
      </div>
    </div>
  );

  return (
    <section style={{ background: "white", padding: 0 }} className="how-section">
      {/* DESKTOP */}
      <div className="how-desktop how-layout-desktop" style={{ padding: "0 80px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "513px 1fr", gap: 32, alignItems: "stretch" }}>
          {/* Left image — 513px wide, height matches right content */}
          <div style={{ borderRadius: 20, overflow: "hidden" }}>
            <img src={imgWoman} alt="Therapist" className="photo-warm" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          {/* Right content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14, color: "var(--cta-brand)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                SO KÖNNEN WIR HELFEN
              </span>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 40, lineHeight: 1.3, color: "var(--black)" }}>
                Wie möchtest du starten?
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)" }}>
                Wähle den Weg, der sich für dich im Moment richtig anfühlt. Beides ist kostenlos, vertraulich und unverbindlich.
              </p>
            </div>
            {tabContent}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="how-mobile how-layout-mobile" style={{ padding: "32px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Titles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, color: "var(--cta-brand)", textTransform: "uppercase" as const }}>SO KÖNNEN WIR HELFEN</span>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>Wie möchtest du starten?</h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
              Wähle den Weg, der sich für dich im Moment richtig anfühlt. Beides ist kostenlos, vertraulich und unverbindlich.
            </p>
          </div>

          {/* Image */}
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "358/350" }}>
            <img src={imgWoman} alt="Therapist" className="photo-warm" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>

          {/* Tabs + Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Pill tab switcher */}
            <div style={{ display: "flex", background: "white", borderRadius: 9999, height: 48, padding: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              {tabs.map(({ id, labelMobile, Icon }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    onPointerDown={() => setActiveTab(id)}
                    className="how-tab-btn"
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: active ? "#d6ebff" : "transparent",
                      border: "none", borderRadius: 9999,
                      cursor: "pointer",
                      fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16,
                      color: active ? "var(--black)" : "var(--grey-text)",
                      boxShadow: active ? "6px 0 10px rgba(0,0,0,0.08)" : "none",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap" as const,
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                    } as React.CSSProperties}
                  >
                    <span className="how-tab-icon"><Icon size={24} /></span>
                    {labelMobile}
                  </button>
                );
              })}
            </div>

            {/* Card */}
            <div style={{
              background: "linear-gradient(180deg, #d6ebff 0%, white 100%)",
              borderRadius: "16px",
              padding: 16,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              {/* Icon + title */}
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "linear-gradient(180deg, white 0%, #ffeaea 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {isV ? <IconVorgespraech size={28} /> : <IconTest size={28} />}
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 24, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
                  {isV ? "Persönliches Gespräch" : "Online-Test machen"}
                </h3>
              </div>

              {/* Description */}
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>
                {isV
                  ? "Kostenlos, unverbindlich und vertraulich. Wir helfen Dir, die passende Fachkraft zu finden."
                  : "In nur 5 Minuten. Anonym, kostenlos und ohne Registrierung."}
              </p>

              {/* Bullets + Button */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {bullets.map(b => (
                    <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "var(--grey-text)", fontFamily: "'Poppins', sans-serif" }}>
                      <img src={imgCheckmark} alt="✓" style={{ width: 20, height: 20, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href={isV ? "/vorgespraech" : "/orientierungstest"} style={{
                  background: "var(--cta)", color: "white", border: "none",
                  borderRadius: 9999, height: 48, width: "100%",
                  fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  textDecoration: "none", boxSizing: "border-box",
                }}>
                  {isV ? "Kostenloses Erstgespräch" : "Test beginnen"}
                  <IconArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .how-layout-desktop { display: block; }
        .how-layout-mobile { display: none; }
        @media (max-width: 1070px) {
          .how-layout-desktop { display: none; }
          .how-layout-mobile { display: block; }
          .how-section { padding: 0 !important; }
        }
        @media (max-width: 390px) {
          .how-tab-btn { font-size: 13px !important; gap: 5px !important; }
          .how-tab-icon { display: none !important; }
        }
        @media (min-width: 1071px) and (max-width: 1280px) {
          .how-grid { grid-template-columns: 42% 1fr !important; }
          .how-desktop { padding-left: 32px !important; padding-right: 32px !important; }
        }
      `}</style>
    </section>
  );
}
