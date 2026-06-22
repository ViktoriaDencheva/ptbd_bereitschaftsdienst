"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

function useWindowWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(window.innerWidth);
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}


export default function VorgespraechPage() {
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;
  const stepsRef = useRef<HTMLDivElement>(null);

  // Shared wrapper style — same as navbar
  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;

  // Breadcrumbs — same as fachkraefte/[id], no border
  const Breadcrumbs = ({ extra }: { extra?: string }) => (
    <div style={{ ...wrap, padding: isMobile ? "14px 16px 6px" : "14px 40px 6px" }} className="breadcrumb-wrap">
      <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
          Startseite
        </a>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
        {extra ? (
          <>
            <a href="/vorgespraech" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
              Kostenloses Erstgespräch
            </a>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>{extra}</span>
          </>
        ) : (
          <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Kostenloses Orientierungsgespräch</span>
        )}
      </nav>
    </div>
  );

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <Breadcrumbs />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "0 0 40px" : "0 0 64px" }}>
        <div style={{ ...wrap }}>
          <div style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
            gap: isMobile ? 20 : 64,
            alignItems: "stretch",
            paddingTop: isMobile ? 8 : 8,
          }}>
            {/* Left: hero image — fills same height as right column */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
              <img src="/vorgespraech-banner.jpg" alt="Spezialistin"
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center", display: "block" }} />
            </div>

            {/* Right: content */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: isMobile ? 0 : 32, paddingBottom: isMobile ? 0 : 32 }}>
              {/* Badge — border only, centered text */}
              <div style={{ display: "inline-block", border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "5px 16px", marginBottom: 18, alignSelf: "flex-start", textAlign: "center" }}>
                <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, letterSpacing: "0.07em", textTransform: "uppercase" }}>Kostenlos &amp; vertraulich</span>
              </div>

              <h1 style={{ fontFamily: F, fontWeight: 500, fontSize: isMobile ? 28 : 40, lineHeight: 1.2, color: "var(--black)", margin: "0 0 14px" }}>
                Kostenloses<br />Orientierungsgespräch
              </h1>
              <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 28px" }}>
                Unsicher, wo du anfangen sollst? In einem 30-minütigen Gespräch hören wir dir zu, helfen dir deine Situation einzuordnen und zeigen dir, welche Unterstützung für dich sinnvoll sein könnte.
              </p>

              {/* 4 benefits — blue checkmarks */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  "Persönliche Empfehlung",
                  "Vertraulich & diskret",
                  "Kostenlos & unverbindlich",
                  "Online oder Vor Ort",
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* "Mehr erfahren" scroll link */}
              <button
                onClick={() => stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
                <span style={{ fontFamily: F, fontSize: 14, color: CTA, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Wie läuft das Gespräch ab?</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke="var(--cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — horizontal timeline ─────────────────── */}
      <section ref={stepsRef} style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ marginBottom: isMobile ? 36 : 52, textAlign: "center" }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, lineHeight: 1.3, color: "var(--black)", margin: "0 0 8px" }}>
              Wie läuft das Gespräch ab?
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
              Dein Weg zu mehr Klarheit und Orientierung.
            </p>
          </div>

          {(() => {
            const steps = [
              { n: 1, icon: "/icons/icon-vorgespraech.svg", title: "Gespräch vereinbaren", desc: "Wähle online einen Termin – kostenlos, ohne Wartezeit und ohne Verpflichtung." },
              { n: 2, icon: "/icons/icon-unterstuetzung.svg", title: "Offen erzählen", desc: "Du schilderst deine Situation in deinem eigenen Tempo – wir hören zu, ohne zu urteilen." },
              { n: 3, icon: "/icons/icon-orientierung.svg", title: "Orientierung erhalten", desc: "Wir helfen dir einzuordnen, welche Unterstützung für dich am sinnvollsten wäre." },
              { n: 4, icon: "/icons/icon-test.svg", title: "Deinen Weg gehen", desc: "Du entscheidest in Ruhe über den nächsten Schritt – wir begleiten dich dabei." },
            ];
            const iconFilter = "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)";
            return isMobile ? (
              /* Mobile: vertical cards */
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {steps.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#F8FAFE", borderRadius: 16, padding: "20px 18px" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "white", border: `1.5px solid ${CTA}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src={s.icon} width={26} height={26} alt="" style={{ objectFit: "contain", filter: iconFilter }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, margin: "0 0 2px", letterSpacing: "0.06em" }}>{s.n}.</p>
                      <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 4px" }}>{s.title}</h3>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop: 4 cards with connector */
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative" }}>
                {/* Connector line behind cards */}
                <div style={{ position: "absolute", top: 52, left: "12.5%", right: "12.5%", borderTop: "2px dashed #C8D8EE", zIndex: 0 }} />
                {steps.map((s, i) => (
                  <div key={i} style={{ background: "#F8FAFE", borderRadius: 20, padding: "32px 24px 28px", border: "1px solid #EAF0FA", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
                    {/* Icon circle */}
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "white", border: `2px solid ${CTA}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
                      <img src={s.icon} width={38} height={38} alt="" style={{ objectFit: "contain", filter: iconFilter }} />
                    </div>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 12, color: CTA, margin: "0 0 6px", letterSpacing: "0.07em" }}>{s.n}.</p>
                    <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 10px", lineHeight: 1.35 }}>{s.title}</h3>
                    <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Pre-CTA text + button */}
          <div style={{ marginTop: isMobile ? 40 : 56, textAlign: "center" }}>
            <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", margin: "0 0 20px", lineHeight: 1.6 }}>
              Bereit für den ersten Schritt?<br />
              <span style={{ color: "var(--black)", fontWeight: 500 }}>Das Gespräch dauert nur 30 Minuten – kostenlos und unverbindlich.</span>
            </p>
            <a href="/vorgespraech/buchen"
              style={{ height: 54, padding: "0 36px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(45,91,141,0.28)", transition: "background 0.2s", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
              Kostenloses Erstgespräch buchen
              <img src="/icons/arrow-right.svg" width={18} height={18} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── ORIENTIERUNGSTEST BANNER ─────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "0 0 48px" : "0 0 80px" }}>
        <div style={{ ...wrap }}>
          <div style={{ borderRadius: isMobile ? 20 : 24, overflow: "hidden", position: "relative", minHeight: isMobile ? 260 : 240, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            {/* Background image */}
            <img src="/orientierungstest-small-banner.jpg" alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            {/* Gradient overlay — right readable, left shows image */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(236,245,255,0.97) 0%, rgba(236,245,255,0.93) 40%, rgba(236,245,255,0.4) 70%, transparent 100%)" }} />
            {/* Text content — right side */}
            <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "36px 24px" : "48px 52px", maxWidth: isMobile ? "100%" : 500 }}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>
                Noch unsicher?
              </p>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, lineHeight: 1.3, color: "var(--black)", margin: "0 0 10px" }}>
                Lieber selbst herausfinden,<br />was zu dir passt?
              </h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px", lineHeight: 1.6 }}>
                Beantworte einige kurze Fragen und erhalte passende Empfehlungen für deine Situation.
              </p>
              <a href="/orientierungstest" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.22)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Orientierungstest starten
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
