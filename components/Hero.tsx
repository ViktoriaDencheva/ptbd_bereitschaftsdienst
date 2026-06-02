"use client";
// Desktop hero image
const imgHeroDesktop = "https://www.figma.com/api/mcp/asset/4a6c6fe7-5243-4a92-89e9-f6366d06b4aa";
// Mobile hero image
const imgHeroMobile = "https://www.figma.com/api/mcp/asset/a4e21c7a-bd72-4773-9b05-e1f94cfde96d";

// Trust icons — RED from Figma (mobile version has correct red icons)
const imgIconVerifiziert = "https://www.figma.com/api/mcp/asset/4f2ef9c4-5bc4-4982-9428-57c923e1713d";
const imgIconKrankenkasse = "https://www.figma.com/api/mcp/asset/bfc1bec9-ab25-4080-af70-4b3b13d063e2";
const imgIconOsterreich = "https://www.figma.com/api/mcp/asset/f3818ce2-68ce-45ef-98d0-d83d1652433f";
const imgIconVertraulich = "https://www.figma.com/api/mcp/asset/63515a05-2088-46fe-857e-35e02cd06567";
const imgIconDSGVO = "https://www.figma.com/api/mcp/asset/20026759-de4b-4493-bfde-ab1807617cc3";

const trustItems = [
  { img: imgIconVerifiziert, title: "Verifizierte Fachkräfte", sub: "Qualifiziert & geprüft" },
  { img: imgIconKrankenkasse, title: "Krankenkassen anerkannt", sub: "Teilrefundierung möglich" },
  { img: imgIconOsterreich, title: "Österreichweit", sub: "In ganz Österreich" },
  { img: imgIconVertraulich, title: "Vertraulich", sub: "Schutz deiner Angaben" },
  { img: imgIconDSGVO, title: "DSGVO-Konform", sub: "Datenschutz garantiert" },
];

export default function Hero() {
  return (
    <section>
      {/* ===== DESKTOP HERO ===== */}
      <div className="hero-desktop" style={{ position: "relative", height: 700, overflow: "hidden" }}>
        <img src={imgHeroDesktop} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90.76deg, rgba(255,255,255,0.4) 0.32%, rgba(255,255,255,0) 73.53%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "80px 80px 60px", maxWidth: 1440, margin: "0 auto", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
          <div style={{ maxWidth: 580, display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 64, lineHeight: 1.3, color: "var(--black)" }}>
                <span>Du musst da </span><span style={{ color: "var(--red-primary)" }}>nicht </span>
                <br /><span style={{ color: "var(--red-primary)" }}>alleine</span><span> durch</span>
              </h1>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--black)" }}>
                Professionelle Hilfe ist nur einen Klick entfernt. Unser<br />engagiertes Team begleitet dich dabei
              </p>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <button style={{ background: "var(--blue-dark)", color: "white", border: "none", borderRadius: "var(--radius-full)", padding: "12px 24px", height: 56, fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-primary)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--blue-dark)")}
              >Termin verinbaren</button>
              <button style={{ background: "white", color: "var(--black)", border: "1px solid var(--blue-dark)", borderRadius: "var(--radius-full)", padding: "12px 24px", height: 56, fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-primary)"; (e.currentTarget as HTMLElement).style.color = "var(--blue-primary)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--black)"; }}
              >Passende Hilfe finden</button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE HERO ===== */}
      <div className="hero-mobile" style={{ display: "none", position: "relative", height: 549, overflow: "hidden" }}>
        <img src={imgHeroMobile} alt="" style={{ position: "absolute", width: "233.49%", height: "93.35%", left: "-130.55%", top: "-12.09%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(177.83deg, rgba(214,235,255,0) 14.74%, #D6EBFF 54.14%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)" }}>
              <span>Du musst da </span><span style={{ color: "var(--red-primary)" }}>nicht </span>
              <br /><span style={{ color: "var(--red-primary)" }}>alleine</span><span> durch</span>
            </h1>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--black)" }}>
              Professionelle Hilfe ist nur einen Klick entfernt. Unser engagiertes Team begleitet dich dabei
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ background: "var(--blue-dark)", color: "white", border: "none", borderRadius: "var(--radius-full)", height: 48, fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Termin verinbaren</button>
            <button style={{ background: "white", color: "var(--black)", border: "1px solid var(--blue-dark)", borderRadius: "var(--radius-full)", height: 48, fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Passende Hilfe finden</button>
          </div>
        </div>
      </div>

      {/* ===== TRUST STRIP — Desktop: floating, Mobile: inline below hero ===== */}
      <div className="trust-strip-desktop" style={{ position: "relative", zIndex: 10, margin: "-50px auto 0", maxWidth: "var(--max-width)", width: "calc(100% - 160px)", background: "white", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        {trustItems.map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "1 0 auto" }}>
            <img src={item.img} alt="" style={{ width: 44, height: 44, objectFit: "contain" }} />
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--black)", textAlign: "center", whiteSpace: "nowrap" }}>{item.title}</div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: "var(--grey)", textAlign: "center", whiteSpace: "nowrap" }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Mobile trust strip */}
      <div className="trust-strip-mobile" style={{ display: "none", background: "white", boxShadow: "0 4px 7.5px rgba(0,0,0,0.1)", borderRadius: 20, margin: "0 0", padding: 16, flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {trustItems.map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 170 }}>
            <img src={item.img} alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, color: "var(--black)", textAlign: "center" }}>{item.title}</div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: "var(--grey)", textAlign: "center" }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-desktop { display: none !important; }
          .hero-mobile { display: block !important; }
          .trust-strip-desktop { display: none !important; }
          .trust-strip-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
