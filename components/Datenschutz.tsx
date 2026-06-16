import React from "react";
const IconDSGVO = () => (
  <img src="/icons/dsgvo-konform.svg" width={48} height={48} alt="" style={{ flexShrink: 0 }} />
);
const IconLock = () => (
  <img src="/icons/vertrauliche-kommunikation.svg" width={48} height={48} alt="" style={{ flexShrink: 0 }} />
);
const IconVerbindung = () => (
  <img src="/icons/sichere-verbindung.svg" width={48} height={48} alt="" style={{ flexShrink: 0 }} />
);

/* Карта — еднаква структура за всички */
function DatenCard({ bg, Icon, title, desc, mobile = false }: { bg: string; Icon: () => React.ReactElement; title: string; desc: string; mobile?: boolean }) {
  if (mobile) {
    return (
      <div style={{
        background: bg, borderRadius: 12, padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Icon />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h5 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
            {title}
          </h5>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.4, color: "var(--grey-text)", margin: 0 }}>
            {desc}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={{
      background: bg, borderRadius: 16, padding: 16,
      display: "flex", flexDirection: "column", justifyContent: "center",
      gap: 8, height: 172,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon />
        <h5 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: "var(--black)", margin: 0 }}>
          {title}
        </h5>
      </div>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}

const cards = [
  { bg: "var(--red-light-system)", Icon: IconDSGVO,      title: "DSGVO - konform",           desc: "Alle Daten werden nach den höchsten Datenschutzstandards verarbeitet." },
  { bg: "var(--blue-ultra-light)", Icon: IconLock,        title: "Vertrauliche Kommunikation",desc: "Gespräche und Informationen bleiben geschützt und privat." },
  { bg: "var(--green-light)",      Icon: IconVerbindung,  title: "Sichere Verbindung",        desc: "Alle Inhalte werden verschlüsselt übertragen." },
];

export default function Datenschutz() {
  return (
    <section style={{ background: "white" }}>
      {/* ===== DESKTOP ===== */}
      <div className="daten-desktop" style={{ padding: "64px 80px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "stretch" }}>

          {/* LEFT — title + desc + Frame 346 SVG */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)" }}>
                Deine Privatsphäre steht an erster Stelle
              </h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)" }}>
                Deine Privatsphäre und Sicherheit stehen bei jeder Unterstützung an erster Stelle.
              </p>
            </div>
            <div style={{ flex: 1, borderRadius: 20, overflow: "hidden", minHeight: 0 }}>
              <img src="/icons/frame346.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          {/* RIGHT — снимка с припокриваща се DSGVO + Vertrauliche + Sichere */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>

            {/* Снимка + DSGVO абсолютно в долния ляв ъгъл */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", height: 293 }}>
                <img src="/icons/datenschutz-image.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ position: "absolute", left: 0, bottom: 0, width: "calc(50% - 8px)", zIndex: 2 }}>
                <DatenCard {...cards[0]} />
              </div>
            </div>

            {/* Vertrauliche + Sichere */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <DatenCard {...cards[1]} />
              <DatenCard {...cards[2]} />
            </div>
          </div>

        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="daten-mobile" style={{ display: "none", padding: "32px 16px" }}>
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 24, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
            Deine Privatsphäre steht an erster Stelle
          </h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
            Deine Privatsphäre und Sicherheit stehen bei jeder Unterstützung an erster Stelle.
          </p>
        </div>
        {/* Top 2 карти */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {cards.slice(0, 2).map((c, i) => (
            <div key={i} style={{
              background: c.bg, borderRadius: 16, padding: "20px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              textAlign: "center",
            }}>
              <c.Icon />
              <h5 className="daten-card-title" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
                {c.title}
              </h5>
              <p className="daten-card-desc" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.4, color: "var(--grey-text)", margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
        {/* 3та карта — full width хоризонтална */}
        {(() => { const c = cards[2]; const Icon = c.Icon; return (
          <div style={{
            background: c.bg, borderRadius: 16, padding: "24px 20px",
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <Icon />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <h5 className="daten-card-title" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
                {c.title}
              </h5>
              <p className="daten-card-desc" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
                {c.desc}
              </p>
            </div>
          </div>
        ); })()}
      </div>

      <style>{`
        @media (max-width: 1070px) {
          .daten-desktop { display: none !important; }
          .daten-mobile { display: block !important; }
        }
        @media (max-width: 390px) {
          .daten-card-title { font-size: 14px !important; }
          .daten-card-desc  { font-size: 13px !important; }
        }
      `}</style>
    </section>
  );
}
