"use client";
const imgQuote = "https://www.figma.com/api/mcp/asset/ca5d8950-3b8f-4bd6-9d4e-769db0fa8872";
const imgStarFull = "https://www.figma.com/api/mcp/asset/a4910320-9b2c-4876-916d-ae7c3650943c";
const imgStarEmpty = "https://www.figma.com/api/mcp/asset/1982d891-c419-4a21-9168-70fdad0f6798";
const imgCardBg = "https://www.figma.com/api/mcp/asset/72229caa-819a-4907-97ef-e99b49e56d19";
// ProvenExpert — square image, not circle
const imgProvenExpert = "https://www.figma.com/api/mcp/asset/05c4a3c2-ef51-4fc0-b4fd-96b71ee28e2d";

const reviews = [
  { text: "Ich habe mich sofort gut aufgehoben gefühlt. Die Kommunikation war einfühlsam, und es war schön zu wissen, dass alle Fachkräfte geprüft und verifiziert sind.", name: "Elia Hahn", date: "05.04.2024", initial: "E", stars: 5 },
  { text: "Ich hatte zuerst Hemmungen, online Hilfe zu suchen. Aber die Plattform hat mir den Einstieg unglaublich leicht gemacht. Alles wirkt ruhig, klar und professionell.", name: "Maria Hrtl", date: "12.04.2024", initial: "M", stars: 5 },
  { text: "Sehr übersichtliche Plattform. Auch wenn ich emotional überfordert war, habe ich mich gut durch die Schritte geführt gefühlt. Klare Sprache, klare Struktur.", name: "Nikola Schmidt", date: "25.03.2024", initial: "N", stars: 5 },
  { text: "Die Terminbuchung ging viel schneller als erwartet. Besonders gut fand ich das Orientierungsgespräch – endlich wusste ich, welche Fachrichtung wirklich zu meinem Problem passt.", name: "Lukas Tober", date: "25.06.2024", initial: "L", stars: 5 },
];

function ReviewCard({ r, width = 366 }: { r: typeof reviews[0]; width?: number }) {
  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 250, padding: "16px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, flexShrink: 0, width }}>
      <img src={imgCardBg} alt="" style={{ position: "absolute", left: "-8.38%", top: "-5.91%", width: "116.75%", height: "123.74%", objectFit: "cover", pointerEvents: "none" }} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <img src={imgQuote} alt="" style={{ width: 48, height: 48 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {[1,2,3,4,5].map(i => <img key={i} src={i <= r.stars ? imgStarFull : imgStarEmpty} alt="" style={{ width: 20, height: 20 }} />)}
        </div>
      </div>
      <p style={{ position: "relative", fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--black)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as any }}>{r.text}</p>
      <div style={{ position: "relative", borderTop: "1px solid var(--grey-border)", paddingTop: 5, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--blue-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--blue-dark)" }}>{r.initial}</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: 1.4, color: "var(--blue-dark)", whiteSpace: "nowrap" }}>{r.name}</div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: 1.5, color: "var(--grey)" }}>{r.date}</div>
        </div>
      </div>
    </div>
  );
}

export default function Meinungen() {
  return (
    <section style={{ background: "var(--blue-ultra-light)", overflow: "hidden" }}>
      {/* ===== DESKTOP ===== */}
      <div className="mein-desktop" style={{ padding: "32px 80px 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)", flex: "0 0 auto", maxWidth: 663 }}>Das sagen unsere Nutzer*innen</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey)", flex: 1 }}>Echte Menschen. Echte Geschichte. Entdecke, wie unsere Plattform Unterstützung bietet und wirklich einen Unterschied macht.</p>
          </div>
          <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
            {/* ProvenExpert — square, not circle */}
            <div style={{ width: 264, height: 264, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
              <img src={imgProvenExpert} alt="ProvenExpert" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Cards — scrollable row, no layout break */}
            <div style={{ flex: 1, display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4, minWidth: 0 }}>
              {reviews.map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="mein-mobile" style={{ display: "none", padding: "32px 16px 48px" }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)", marginBottom: 12 }}>Das sagen unsere Nutzer*innen</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)", marginBottom: 24 }}>Echte Menschen. Echte Geschichte. Entdecke, wie unsere Plattform Unterstützung bietet.</p>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
          {reviews.map((r, i) => <ReviewCard key={i} r={r} width={300} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mein-desktop { display: none !important; }
          .mein-mobile { display: block !important; }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
