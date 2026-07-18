"use client";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

const F = "'Poppins', sans-serif";
const CTA_HEX = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 40px" } as const;

// ─── Subcomponents ────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: 16,
          background: "none", border: "none",
          borderBottom: open ? "none" : "1px solid var(--grey-border)",
          cursor: "pointer", textAlign: "left", gap: 16,
        }}
      >
        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: "var(--black)", flex: 1 }}>{q}</span>
        <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {open ? <Minus size={16} color="var(--black)" /> : <Plus size={16} color="var(--black)" />}
        </div>
      </button>
      {open && (
        <div style={{ padding: "12px 16px 16px", fontFamily: F, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)", borderBottom: "1px solid var(--grey-border)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FaqPage() {
  const { T } = useLang();
  const FAQ = T.faq;
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    setOpenCat(catId);
    setTimeout(() => {
      const el = document.getElementById(`cat-${catId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const filteredFaq = query.trim()
    ? FAQ.items.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()))
    : null;

  const faqByCat = FAQ.categories.map(cat => ({
    ...cat,
    items: FAQ.items.filter(f => f.cat === cat.id),
  }));

  return (
    <>
      <Navbar />

      {/* ── BREADCRUMBS ── */}
      <div className="faq-bc-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CTA_HEX}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"}>{T.nav.home}</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>FAQ</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ backgroundImage: "url('/FAQ-banner.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: 320, padding: "72px 0 64px", width: "100%" }}>
        <div className="faq-w" style={{ ...W, position: "relative" }}>
          <h1 className="faq-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 16 }}>
            {FAQ.page_title}
          </h1>
          <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
            {FAQ.page_sub}
          </p>
          <div style={{ position: "relative", maxWidth: 560 }}>
            <svg style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={FAQ.search_placeholder}
              className="faq-search-input"
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 52, paddingRight: 20, height: 56, borderRadius: 10, border: "1.5px solid #DDE8F5", fontFamily: F, fontSize: 15.5, color: "#1A1A1A", outline: "none", boxShadow: "0 4px 24px rgba(45,91,141,0.10)", background: "white", transition: "border-color 0.2s, box-shadow 0.2s" }}
            />
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ── */}
      {filteredFaq && (
        <section style={{ background: "white", padding: "48px 0" }}>
          <div className="faq-w" style={W}>
            <p style={{ fontFamily: F, fontSize: 13.5, color: "#888", marginBottom: 16 }}>
              {filteredFaq.length} result{filteredFaq.length !== 1 ? "s" : ""} for „{query}"
            </p>
            {filteredFaq.length === 0 ? (
              <p style={{ fontFamily: F, fontSize: 15, color: "#555" }}>{FAQ.no_results}</p>
            ) : (
              <div style={{ background: "white", borderRadius: 16, border: "1.5px solid #DDE8F5", padding: "0 24px" }}>
                {filteredFaq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {!filteredFaq && (
        <>
          {/* ── CATEGORIES ── */}
          <section className="faq-section-kategorien" style={{ background: "white", padding: "64px 0 0" }}>
            <div className="faq-w" style={W}>
              <div className="faq-cat-grid">
                {FAQ.categories.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToCategory(id)}
                    className="faq-cat-card"
                    style={{
                      background: activeCategory === id ? "#EBF2FC" : "white",
                      border: activeCategory === id ? `1.5px solid ${CTA_HEX}` : "1.5px solid #DDE8F5",
                      borderRadius: 14, padding: "20px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, transition: "all 0.2s",
                    }}
                  >
                    <span style={{ display: "flex" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
                        {id === "orientierung" && <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
                        {id === "fachkraefte" && <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                        {id === "termine" && <><rect x="3" y="4" width="18" height="18" rx="2" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2v4M8 2v4M3 10h18" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                        {id === "kosten" && <><circle cx="12" cy="12" r="9" stroke={CTA_HEX} strokeWidth="1.8"/><path d="M12 7v10M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 2.5-5 2.5-5 5 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round"/></>}
                        {id === "datenschutz" && <><rect x="3" y="11" width="18" height="11" rx="2" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0110 0v4" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                        {id === "plattform" && <><circle cx="12" cy="12" r="9" stroke={CTA_HEX} strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                      </svg>
                    </span>
                    <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12.5, color: activeCategory === id ? CTA_HEX : "#333", textAlign: "left", lineHeight: 1.3 }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ACCORDION ── */}
          <section ref={faqRef} className="faq-section-accordion" style={{ background: "white", padding: "64px 0 0" }}>
            <div className="faq-w" style={W}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", marginBottom: 32 }}>{FAQ.all_label}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {faqByCat.map(cat => (
                  <div key={cat.id} id={`cat-${cat.id}`} style={{ borderRadius: 8, background: openCat === cat.id ? "#EBF2FC" : "#F2F2F4", overflow: "hidden", transition: "background 0.2s" }}>
                    <button
                      onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                      style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
                    >
                      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: openCat === cat.id ? CTA_HEX : "#1A1A1A" }}>{cat.label}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s", transform: openCat === cat.id ? "rotate(180deg)" : "rotate(0deg)" }}>
                        <path d="M3 6l5 5 5-5" stroke={openCat === cat.id ? CTA_HEX : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openCat === cat.id && (
                      <div style={{ background: "white" }}>
                        {cat.items.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CTA ── */}
      <section className="faq-section-cta" style={{ background: "white", padding: "80px 0 96px" }}>
        <div className="faq-w" style={W}>
          <div className="faq-cta-wrap" style={{ borderRadius: 20, overflow: "hidden", display: "flex", background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #F0F0F0" }}>
            <img src="/vorgespraech-banner.png" alt="" aria-hidden={true} className="faq-cta-img" style={{ width: "45%", objectFit: "cover", flexShrink: 0, display: "block" }} />
            <div className="faq-cta-text" style={{ flex: 1, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center", background: "white" }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 14, lineHeight: 1.25 }}>{FAQ.page_title}</h2>
              <p style={{ fontFamily: F, fontSize: 16, color: "#555", lineHeight: 1.7, marginBottom: 32 }}>{FAQ.page_sub}</p>
              <div>
                <a
                  href="/kontakt"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 32px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.22)" }}
                >
                  {FAQ.contact_cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .faq-bc-wrap { max-width: 1440px; margin: 0 auto; padding: 32px 80px 28px; }
        .faq-h1 { font-size: 42px; }
        .faq-search-input:focus { border-color: #2D5B8D !important; box-shadow: 0 0 0 3px rgba(45,91,141,0.15), 0 4px 24px rgba(45,91,141,0.10) !important; }
        .faq-cat-card:hover { border-color: #2D5B8D !important; box-shadow: 0 4px 16px rgba(45,91,141,0.12); transform: translateY(-2px); }
        .faq-cat-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
        @media (max-width: 1070px) {
          .faq-w { padding-left: 16px !important; padding-right: 16px !important; }
          .faq-bc-wrap { padding: 20px 16px 16px !important; }
          .faq-h1 { font-size: 30px !important; }
          .faq-cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .faq-section-kategorien { padding: 32px 0 0 !important; }
          .faq-section-accordion { padding: 24px 0 0 !important; }
          .faq-section-cta { padding: 32px 0 40px !important; }
          .faq-cta-wrap { flex-direction: column !important; border-radius: 12px !important; }
          .faq-cta-img { width: calc(100% + 32px) !important; margin-left: -16px !important; height: 240px !important; border-radius: 0 !important; }
          .faq-cta-text { padding: 24px 16px 28px !important; }
        }
      `}</style>
    </>
  );
}
