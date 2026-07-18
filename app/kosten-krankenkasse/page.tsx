"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

const FONT = "'Poppins',sans-serif";
const CTA = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 80px" } as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8EFF8", padding: "18px 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", gap: 16, textAlign: "left" }}>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 16, color: "#1A1A1A" }}>{q}</span>
        <span style={{ fontFamily: FONT, fontSize: 22, color: CTA, flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <p style={{ fontFamily: FONT, fontSize: 15.5, color: "#555", lineHeight: 1.7, margin: "12px 0 0" }}>{a}</p>}
    </div>
  );
}

export default function KostenPage() {
  const { T } = useLang();
  const K = T.kosten;
  const COST_CARDS = K.cost_cards;
  const KK_STEPS = K.kk_steps;
  const FAQS = K.faqs;
  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px 0" }} className="kk-bc">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}>{K.breadcrumb_home}</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>{K.breadcrumb_current}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "white", padding: "20px 0 0" }}>
        <div style={W} className="kk-w">
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }}>
              <h1 className="kk-h1" style={{ fontFamily: FONT, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                {K.h1}
              </h1>
              <p style={{ fontFamily: FONT, fontSize: 17, color: "#555", lineHeight: 1.7, margin: 0 }}>
                {K.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost cards */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div style={W} className="kk-w">
          <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{K.options_title}</h2>
          <p style={{ fontFamily: FONT, fontSize: 15, color: "#888", marginBottom: 40 }}>{K.options_subtitle}</p>
          <div className="kk-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {COST_CARDS.map(card => (
              <div key={card.label} style={{ background: card.bg, borderRadius: 14, padding: 28, border: `1.5px solid ${card.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: card.color, background: "white", borderRadius: 999, padding: "4px 14px", width: "fit-content", border: `1px solid ${card.border}` }}>{card.label}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: FONT, fontSize: 15, color: "#444", lineHeight: 1.5 }}>
                      <span style={{ color: card.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Krankenkasse Schritt für Schritt — horizontal */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="kk-w">
          <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{K.steps_title}</h2>
          <p style={{ fontFamily: FONT, fontSize: 15, color: "#888", marginBottom: 40 }}>{K.steps_subtitle}</p>
          <div className="kk-steps" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
            {KK_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, padding: "0 16px", position: "relative" }}>
                {/* connector line */}
                {i < KK_STEPS.length - 1 && (
                  <div style={{ position: "absolute", top: 20, left: "50%", width: "100%", height: 2, background: "#D8E8F7", zIndex: 0 }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: CTA, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 800, fontSize: 16, flexShrink: 0, position: "relative", zIndex: 1 }}>{step.num}</div>
                <p style={{ fontFamily: FONT, fontSize: 15, color: "#333", lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div style={W} className="kk-w">
          <div className="kk-faq-grid">
            <div>
              <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 8 }}>{K.faq_title}</h2>
              <p style={{ fontFamily: FONT, fontSize: 15, color: "#888" }}>{K.faq_subtitle}</p>
            </div>
            <div>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
              <div style={{ paddingTop: 24, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", fontFamily: FONT, fontSize: 14, color: "#888" }}>
                {K.faq_not_found}{" "}
                <a href="/faq" style={{ color: CTA, fontWeight: 600, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >{K.faq_all}</a>
                {" "}{K.faq_or}{" "}
                <a href="/kontakt" style={{ color: CTA, fontWeight: 600, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >{K.faq_contact}</a>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* CTA — Über uns style */}
      <section style={{ background: "#F5F9FD", padding: "72px 0" }}>
        <div style={{ ...W, textAlign: "center" }} className="kk-w">
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>
              {K.cta_title}
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>
              {K.cta_subtitle}
            </p>
            <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/vorgespraech"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: FONT, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1e4270")}
                onMouseLeave={e => (e.currentTarget.style.background = CTA)}>
                {K.cta_primary}
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
              </a>
              <a href="/orientierungstest"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid ${CTA}`, color: CTA, fontFamily: FONT, fontWeight: 600, fontSize: 15, textDecoration: "none", background: "white", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#EEF4FC")}
                onMouseLeave={e => (e.currentTarget.style.background = "white")}>
                {K.cta_secondary}
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .kk-bc { padding: 32px 80px 0 !important; }
        .kk-w { padding-left: 80px !important; padding-right: 80px !important; }
        .kk-h1 { font-size: 44px; }
        .kk-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch; }
        .kk-cards { grid-template-columns: repeat(3, 1fr); }
        .kk-faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        @media (max-width: 1070px) {
          .kk-bc { padding: 16px 16px 0 !important; }
          .kk-w { padding-left: 16px !important; padding-right: 16px !important; }
          .kk-h1 { font-size: 30px !important; }
          .kk-hero-grid { display: flex !important; flex-direction: column !important; }
          .kk-hero-img { min-height: 180px !important; order: -1; margin-bottom: 16px; }
          .kk-hero-content { padding-bottom: 32px !important; }
          .kk-cards { grid-template-columns: 1fr !important; }
          .kk-faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .kk-steps { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          section { padding-top: 40px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </>
  );
}
