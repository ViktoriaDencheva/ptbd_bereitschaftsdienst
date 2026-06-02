const imgPhoto = "https://www.figma.com/api/mcp/asset/e739fbf4-47cc-49b8-a206-b53ce90d672f";
const imgFrame346 = "https://www.figma.com/api/mcp/asset/8d4f5c9f-e6de-4237-b646-74e3cfe7c206";
const imgDSGVO = "https://www.figma.com/api/mcp/asset/62cf440a-830c-4cec-96cf-a2c07fb14943";
const imgKommunikation = "https://www.figma.com/api/mcp/asset/ea706948-7eb6-41c4-b562-673189d769df";
const imgVerbindung = "https://www.figma.com/api/mcp/asset/baaba411-71e4-4938-827e-838f6c430aa5";

const cards = [
  { bg: "var(--red-light-system)", img: imgDSGVO, title: "DSGVO - konform", desc: "Alle Daten werden nach den höchsten Datenschutzstandards verarbeitet." },
  { bg: "var(--blue-ultra-light)", img: imgKommunikation, title: "Vertrauliche Kommunikation", desc: "Gespräche und Informationen bleiben geschützt und privat." },
  { bg: "var(--green-light)", img: imgVerbindung, title: "Sichere Verbindung", desc: "Alle Inhalte werden verschlüsselt übertragen." },
];

export default function Datenschutz() {
  return (
    <section style={{ background: "white" }}>
      {/* ===== DESKTOP ===== */}
      <div className="daten-desktop" style={{ padding: "32px 80px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36, justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 48, lineHeight: 1.3, color: "var(--black)" }}>Deine Privatsphäre steht an erster Stelle</h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 24, lineHeight: 1.3, color: "var(--grey)" }}>Deine Privatsphäre und Sicherheit stehen bei jeder Unterstützung an erster Stelle.</p>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", height: 244 }}>
              <img src={imgFrame346} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          {/* Right — image + cards in proper layout from Figma */}
          <div style={{ position: "relative" }}>
            {/* Top image */}
            <div style={{ borderRadius: 20, overflow: "hidden", height: 293, marginBottom: 16 }}>
              <img src={imgPhoto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Cards — 2 col grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {cards.map((c, i) => (
                <div key={i} style={{ background: c.bg, borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={c.img} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: "var(--black)" }}>{c.title}</span>
                  </div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="daten-mobile" style={{ display: "none", padding: "32px 16px" }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 28, lineHeight: 1.3, color: "var(--black)", marginBottom: 8 }}>Deine Privatsphäre steht an erster Stelle</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)", marginBottom: 24 }}>Deine Privatsphäre und Sicherheit stehen bei jeder Unterstützung an erster Stelle.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: c.bg, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={c.img} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 18, color: "var(--black)" }}>{c.title}</span>
              </div>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--grey)" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .daten-desktop { display: none !important; }
          .daten-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
