"use client";
const imgHeroDesktop = "/heroImage.png";
const imgHeroMobile = "/heroImage-mob.png";
const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const RED = "var(--cta-brand)";

const sellingPoints = [
  { icon: "⏱", text: "Termin innerhalb einer Woche" },
  { icon: "💶", text: "Erstgespräch 85€" },
  { icon: "💶", text: "Therapie ab 50€" },
  { icon: "📍", text: "Österreichweit" },
];

const Stars = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ color: "#F5A623", fontSize: 18, letterSpacing: 2 }}>★★★★★</span>
    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)" }}>4,9</span>
    <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>· über 200 Bewertungen</span>
  </div>
);

export default function Hero() {
  return (
    <section>
      {/* ===== DESKTOP HERO ===== */}
      <div className="hero-desktop" style={{ position: "relative", height: 600, overflow: "hidden" }}>
        <img src={imgHeroDesktop} alt="" className="photo-warm" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90.76deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 42%, rgba(255,255,255,0) 68%)" }} />
        <div className="hero-desktop-inner" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "80px 80px 60px", maxWidth: 1440, margin: "0 auto", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
          <div style={{ width: "52%", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 56, lineHeight: 1.15, color: "var(--black)", margin: 0 }}>
                Psychotherapie<br />
                <span style={{ color: RED }}>ohne lange</span> Wartezeiten.
              </h1>
              <p style={{ fontFamily: F, fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>
                Professionelle Begleitung — diskret, schnell und in ganz Österreich.
              </p>
            </div>

            {/* Selling points */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {sellingPoints.map((p, i) => (
                <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "white", border: "1.5px solid #E0EAF5", borderRadius: 9999, padding: "7px 16px", fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)", boxShadow: "0 1px 4px rgba(45,91,141,0.07)" }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  {p.text}
                </div>
              ))}
            </div>

            {/* Stars */}
            <Stars />

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <a href="/vorgespraech"
                style={{ background: CTA, color: "white", border: `1.5px solid ${CTA}`, borderRadius: "var(--radius-circle)", padding: "0 28px", height: 52, fontFamily: F, fontWeight: 600, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none", display: "inline-flex", alignItems: "center", boxShadow: "0 4px 20px rgba(45,91,141,0.28)", transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--cta-hover)"; el.style.borderColor = "var(--cta-hover)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = CTA; el.style.borderColor = CTA; }}>
                Jetzt Termin vereinbaren
              </a>
              <a href="/orientierungstest"
                style={{ background: "rgba(255,255,255,0.85)", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: "var(--radius-circle)", padding: "0 24px", height: 52, fontFamily: F, fontWeight: 500, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none", display: "inline-flex", alignItems: "center", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--blue-ultra-light)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.85)"; }}>
                Kostenlos orientieren
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ===== MOBILE HERO ===== */}
      <div className="hero-mobile" style={{ display: "none", position: "relative", flexDirection: "column", justifyContent: "flex-end", minHeight: "calc(100svh - 64px)" }}>
        <img src={imgHeroMobile} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.9) 72%, rgba(255,255,255,0.97) 88%)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 30, lineHeight: 1.2, color: "var(--black)", margin: 0 }}>
              Psychotherapie<br />
              <span style={{ color: RED }}>ohne lange</span> Wartezeiten.
            </h1>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>
              Professionelle Begleitung — diskret und schnell.
            </p>
          </div>

          {/* Mobile selling points — horizontal scroll */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
            {sellingPoints.map((p, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "white", border: "1.5px solid #E0EAF5", borderRadius: 9999, padding: "6px 12px", fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <span>{p.icon}</span>{p.text}
              </div>
            ))}
          </div>

          <Stars />

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="/vorgespraech" style={{ background: CTA, color: "white", border: "none", borderRadius: "var(--radius-circle)", minHeight: 52, padding: "12px 24px", fontFamily: F, fontWeight: 600, fontSize: 16, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Jetzt Termin vereinbaren
            </a>
            <a href="/orientierungstest" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: "var(--radius-circle)", minHeight: 52, padding: "12px 24px", fontFamily: F, fontWeight: 500, fontSize: 16, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Kostenlos orientieren
            </a>
          </div>
        </div>
      </div>

      {/* ===== TRUST STRIP DESKTOP ===== */}
      <div className="trust-strip-desktop" style={{ position: "relative", zIndex: 10, margin: "-48px auto 0", maxWidth: "var(--max-width)", width: "calc(100% - 160px)", background: "white", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 0 }}>
        {[
          { val: "2.000+", label: "Menschen begleitet" },
          { val: "4,9 ★", label: "Kundenbewertung" },
          { val: "1 Woche", label: "bis zum ersten Termin" },
          { val: "100%", label: "Geprüfte Fachkräfte" },
          { val: "35+", label: "Fachkräfte in Wien" },
        ].map((item, i, arr) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: "1 1 0", minWidth: 0, borderRight: i < arr.length - 1 ? "1px solid #EAF0FA" : "none", padding: "0 16px" }}>
            <div style={{ fontFamily: F, fontWeight: 700, fontSize: 20, color: "var(--black)" }}>{item.val}</div>
            <div style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", textAlign: "center" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* ===== MOBILE TRUST STRIP ===== */}
      <div className="trust-strip-mobile trust-strip-animate" style={{ display: "none", padding: "0 16px 24px", marginTop: -32, position: "relative", zIndex: 10 }}>
        <div style={{ background: "white", borderRadius: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.10)", padding: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { val: "2.000+", label: "Menschen begleitet" },
              { val: "4,9 ★", label: "Kundenbewertung" },
              { val: "1 Woche", label: "bis zum Termin" },
              { val: "100%", label: "Geprüfte Fachkräfte" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 0", textAlign: "center" }}>
                <div style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)" }}>{item.val}</div>
                <div style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1070px) {
          .hero-desktop { display: none !important; }
          .hero-mobile { display: flex !important; flex-direction: column; }
          .trust-strip-desktop { display: none !important; }
          .trust-strip-mobile { display: block !important; }
          .trust-strip-animate {
            animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: 0.1s;
          }
        }
      `}</style>
    </section>
  );
}
