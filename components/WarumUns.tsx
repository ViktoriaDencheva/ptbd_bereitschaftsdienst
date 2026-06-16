"use client";
import { useEffect, useRef } from "react";
const imgBg: string | null = null;
const imgIcon1 = "/icons/icon-fachkraefte-warum.svg";
const imgIcon2 = "/icons/icon-orientierung.svg";
const imgIcon3 = "/icons/icon-unterstuetzung.svg";

// Autoplay video URL — replace with real video when available
const VIDEO_URL = "/video-warum-uns.mp4";

const benefits = [
  { img: imgIcon1, title: "Qualifizierte Fachkräfte", desc: "Alle Spezialist*innen sind geprüft, erfahren und transparent dargestellt." },
  { img: imgIcon2, title: "Orientierung, wenn Du sie brauchst", desc: "Wir begleiten Dich Schritt für Schritt – transparent und verständlich." },
  { img: imgIcon3, title: "Unterstützung ohne Druck", desc: "Du entscheidest in Deinem Tempo – ohne Druck oder Verpflichtung." },
];

export default function WarumUns() {
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    [videoDesktopRef, videoMobileRef].forEach(ref => {
      const v = ref.current;
      if (!v) return;
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);

  return (
    <section style={{ position: "relative" }} className="warum-section">
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {imgBg && <img src={imgBg} alt="" style={{ position: "absolute", top: "-14.07%", left: 0, width: "100%", height: "128.14%" }} />}
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="warum-desktop" style={{ padding: "64px 80px", maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)", maxWidth: 560 }}>Warum Menschen sich für uns entscheiden</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 20, lineHeight: 1.6, color: "var(--grey-text)", maxWidth: 560 }}>Orientierung. Vertrauen. Unterstützung — genau dann, wenn Du sie brauchst.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            {/* Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {benefits.map((b, i) => (
                <div key={i} className="benefit-card" style={{
                  background: "white",
                  borderRadius: 12,
                  borderLeft: "3px solid var(--cta-hover)",
                  padding: "20px 24px",
                  display: "flex", gap: 20, alignItems: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src={b.img} alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>{b.title}</h4>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.7, color: "var(--grey-text)", margin: 0 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Video */}
            <div style={{ height: 475, borderRadius: 12, overflow: "hidden", background: "#1a1a1a", position: "relative" }}>
              {VIDEO_URL ? (
                <video ref={videoDesktopRef} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
                  <source src={VIDEO_URL} type="video/mp4" />
                </video>
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--blue-ultra-light)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontSize: 24, marginLeft: 4 }}>▶</span>
                  </div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, color: "var(--grey)" }}>Video wird hinzugefügt</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="warum-mobile" style={{ display: "none", padding: "32px 16px", position: "relative" }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)", marginBottom: 8 }}>Warum Menschen sich für uns entscheiden</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: "var(--grey-text)", marginBottom: 24 }}>Orientierung. Vertrauen. Unterstützung — genau dann, wenn Du sie brauchst.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: "white", borderLeft: "3px solid var(--cta-hover)", borderRadius: 12, padding: 16, display: "flex", gap: 12, alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={b.img} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
              </div>
              <div>
                <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.3, color: "var(--black)", margin: "0 0 4px" }}>{b.title}</h4>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Видео */}
        <div style={{ borderRadius: 16, overflow: "hidden", background: "#1a1a1a", marginTop: 16, aspectRatio: "16/9" }}>
          <video ref={videoMobileRef} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>
      </div>

      <style>{`
        @media (max-width: 1070px) {
          .warum-desktop { display: none !important; }
          .warum-mobile { display: block !important; }
        }
        .benefit-card:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 24px rgba(11,114,178,0.12);
        }
      `}</style>
    </section>
  );
}
