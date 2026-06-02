"use client";
const imgBg = "https://www.figma.com/api/mcp/asset/c3b34fff-933e-42fd-86c9-4acde13edc57";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/2c0c1adb-2d3d-4bec-886e-fcbfc4b27385";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/9a662361-b5b2-4b47-9de6-aa12822c7a05";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/3a021a81-441a-488a-8041-9804bdb5277e";

// Autoplay video URL — replace with real video when available
const VIDEO_URL = "";

const benefits = [
  { img: imgIcon1, title: "Qualifizierte Fachkräfte", desc: "Alle Spezialist*innen sind geprüft, erfahren und transparent dargestellt." },
  { img: imgIcon2, title: "Orientierung, wenn Du sie brauchst", desc: "Wir begleiten Dich Schritt für Schritt – transparent und verständlich." },
  { img: imgIcon3, title: "Unterstützung ohne Druck", desc: "Du entscheidest in Deinem Tempo – ohne Druck oder Verpflichtung." },
];

export default function WarumUns() {
  return (
    <section style={{ position: "relative" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <img src={imgBg} alt="" style={{ position: "absolute", top: "-14.07%", left: 0, width: "100%", height: "128.14%" }} />
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="warum-desktop" style={{ padding: "32px 80px", maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)", flex: "1 1 300px" }}>Warum Menschen sich für uns entscheiden</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey)", flex: "1 1 300px" }}>Unsere Plattform wurde entwickelt, um Dir Orientierung, Vertrauen und Unterstützung zu geben - genau dann, wenn Du sie brauchst.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            {/* Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {benefits.map((b, i) => (
                <div key={i} className="benefit-card" style={{ background: "var(--blue-ultra-light)", border: "1px solid var(--blue-primary)", borderRadius: 16, padding: 17, display: "flex", gap: 16, alignItems: "flex-start", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--blue-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src={b.img} alt="" style={{ width: 56, height: 56, objectFit: "contain" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 24, lineHeight: 1.3, color: "var(--black)" }}>{b.title}</h4>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey)" }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Video */}
            <div style={{ height: 475, borderRadius: 20, overflow: "hidden", background: "#1a1a1a", position: "relative" }}>
              {VIDEO_URL ? (
                <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
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
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)", marginBottom: 12 }}>Warum Menschen sich für uns entscheiden</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)", marginBottom: 24 }}>Unsere Plattform wurde entwickelt, um Dir Orientierung, Vertrauen und Unterstützung zu geben.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: "var(--blue-ultra-light)", border: "1px solid var(--blue-primary)", borderRadius: 16, padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--blue-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={b.img} alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
              </div>
              <div>
                <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 18, lineHeight: 1.3, color: "var(--black)", marginBottom: 4 }}>{b.title}</h4>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--grey)" }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
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
