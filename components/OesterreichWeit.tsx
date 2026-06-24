"use client";
const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

const cities = [
  { name: "Wien", count: "12+ Fachkräfte" },
  { name: "Graz", count: "8+ Fachkräfte" },
  { name: "Linz", count: "6+ Fachkräfte" },
  { name: "Salzburg", count: "5+ Fachkräfte" },
  { name: "Innsbruck", count: "4+ Fachkräfte" },
  { name: "Klagenfurt", count: "3+ Fachkräfte" },
  { name: "Dornbirn", count: "2+ Fachkräfte" },
];

export default function OesterreichWeit() {
  return (
    <section style={{ background: "var(--blue-ultra-light)", padding: "72px 0" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 80px" }} className="oew-inner">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 48, textAlign: "center" }}>
          <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Reichweite</p>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 32, color: "var(--black)", margin: 0 }}>Österreichweit vertreten</h2>
          <p style={{ fontFamily: F, fontSize: 16, color: "var(--grey-text)", margin: 0, maxWidth: 500, lineHeight: 1.7 }}>
            Über 35 geprüfte Fachkräfte in ganz Österreich — online oder in deiner Nähe.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 48 }}>
          {cities.map((c, i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "16px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 120, boxShadow: "0 2px 12px rgba(45,91,141,0.08)", border: "1px solid rgba(45,91,141,0.08)" }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 17, color: "var(--black)" }}>{c.name}</span>
              <span style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)" }}>{c.count}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <a href="/fachkraefte" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "12px 28px", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.25)" }}>
            Fachkraft in meiner Nähe finden
          </a>
          <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "12px 24px", fontFamily: F, fontWeight: 500, fontSize: 15, textDecoration: "none" }}>
            Termin vereinbaren
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1070px) {
          .oew-inner { padding: 0 20px !important; }
          .oew-inner h2 { font-size: 24px !important; }
        }
      `}</style>
    </section>
  );
}
