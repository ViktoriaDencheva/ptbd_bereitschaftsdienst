"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AustriaMap, { PROVINCES } from "@/components/AustriaMap";
import { useLang } from "@/lib/lang";
type ProvinceId = typeof PROVINCES[number]["id"];

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const CTA_HEX = "#2D5B8D";

function useWindowWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(window.innerWidth);
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => removeEventListener("resize", h);
  }, []);
  return w;
}

const STATS_VALUES = ["1 Woche", "1.000+", "10+", "9"] as const;

const STEPS_STATIC = [
  { icon: "/icons/icon-vorgespraech.svg", bg: "var(--blue-ultra-light)" },
  { icon: "/icons/icon-orientierung.svg", bg: "var(--yellow-light)" },
  { icon: "/icons/icon-test.svg", bg: "var(--green-light)" },
  { icon: "/icons/icon-fachkraefte-warum.svg", bg: "var(--blue-ultra-light)" },
  { icon: "/icons/icon-unterstuetzung.svg", bg: "var(--yellow-light)" },
];

const WERTE_STATIC = [
  {
    color: "#E07878", bg: "#FFF0F0",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#E07878" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    color: "#4A90D9", bg: "#EBF4FF",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#4A90D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    color: "#5BAA6E", bg: "#F0FAF2",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#5BAA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#5BAA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    color: "#B07D3A", bg: "#FFF8EE",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#B07D3A" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="#B07D3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

export default function UeberUnsPage() {
  const { T } = useLang();
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;
  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [werteIdx, setWerteIdx] = useState(0);
  const [stepsIdx, setStepsIdx] = useState(0);
  const werteRef = useRef<HTMLDivElement>(null);
  const stepsSliderRef = useRef<HTMLDivElement>(null);
  const activeProvince = PROVINCES.find(p => p.id === selectedProvince) ?? null;

  // Merge static (icons/bg) with translated text
  const STATS = T.ueberUns.stats.map((s, i) => ({ value: STATS_VALUES[i], label: s.label, sub: s.sub }));
  const STEPS = T.ueberUns.steps.map((s, i) => ({ ...STEPS_STATIC[i], title: s.title, desc: s.desc }));
  const WERTE = T.ueberUns.werte.map((w, i) => ({ ...WERTE_STATIC[i], title: w.title, desc: w.desc }));
  const TRUST = T.ueberUns.trust;
  const FAQ = T.ueberUns.faq;

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: "white" }}>
        {/* Breadcrumbs */}
        <div style={{ ...wrap, paddingTop: isMobile ? 20 : 28, paddingBottom: isMobile ? 12 : 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
            <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CTA}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"}>{T.nav.home}</a>
            <span style={{ color: "#C3C3C3" }}>›</span>
            <span style={{ color: "var(--black)", fontWeight: 500 }}>{T.ueberUns.breadcrumb_current}</span>
          </div>
        </div>

        {/* Banner image with text overlay */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden", height: isMobile ? 480 : 560 }}>
          <picture>
            <source media="(max-width: 1070px)" srcSet="/ueber-uns-hero-banner-image-mobile.jpg" />
            <img
              src="/ueber-uns-hero-banner-image.jpg"
              alt="Über uns"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </picture>

          {/* Overlay for readability and tone-matching */}
          <div style={{ position: "absolute", inset: 0, background: isMobile
            ? "linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 30%, rgba(255,255,255,0.52) 55%, rgba(255,255,255,0) 85%)"
            : "linear-gradient(to left, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0) 65%)"
          }} />

          {/* Text content */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: isMobile ? "flex-end" : "center" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 20px 60px" : "0 40px", width: "100%" }}>
              <div style={{ maxWidth: isMobile ? "100%" : 560 }}>
                <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 26 : 44, lineHeight: 1.2, color: "var(--black)", margin: "0 0 16px" }}>
                  {T.ueberUns.hero_h1}
                </h1>
                <p style={{ fontFamily: F, fontSize: isMobile ? 14 : 16, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 28px" }}>
                  {T.ueberUns.hero_desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                  {T.ueberUns.hero_bullets.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{t}</span>
                    </div>
                  ))}
                </div>
                <a href="/vorgespraech"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 36px 0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", alignSelf: "flex-start", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = CTA; }}>
                  {T.ueberUns.hero_cta}
                  <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION + WERTE (combined) ───────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0", borderTop: "1px solid #F0F4F8" }}>
        <div style={{ ...wrap }}>
          {/* Mission quote */}
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 40 }}>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 20px" }}>{T.ueberUns.mission_label}</p>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 20, lineHeight: 1.45, margin: 0, color: "var(--black)" }}>
                {T.ueberUns.mission_quote}
              </p>
              <div style={{ height: 1, background: "#E2EBF5", margin: "24px 0" }} />
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", lineHeight: 1.8, margin: 0 }}>
                {T.ueberUns.mission_desc_mobile}
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 48px", alignItems: "center", marginBottom: 56 }}>
              <div style={{ paddingRight: 8 }}>
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 20px" }}>{T.ueberUns.mission_label}</p>
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: 26, lineHeight: 1.45, margin: 0, color: "var(--black)" }}>
                  {T.ueberUns.mission_quote}
                </p>
              </div>
              <div style={{ width: 1, alignSelf: "stretch", background: "#E2EBF5" }} />
              <div style={{ paddingLeft: 8 }}>
                <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", lineHeight: 1.85, margin: 0 }}>
                  {T.ueberUns.mission_desc_desktop}
                </p>
              </div>
            </div>
          )}
          {/* Werte cards */}
          {isMobile ? (
            <div>
              <div ref={werteRef}
                onScroll={e => { const el = e.currentTarget; setWerteIdx(Math.round(el.scrollLeft / (el.clientWidth * 0.82))); }}
                style={{ display: "flex", overflowX: "auto", gap: 12, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", marginRight: -16, paddingRight: 32 } as React.CSSProperties}>
                {WERTE.map((w, i) => (
                  <div key={i} style={{ background: w.bg, borderRadius: 20, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 12, flexShrink: 0, width: "82%", scrollSnapAlign: "start" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", boxShadow: `0 2px 12px ${w.color}20` }}>{w.icon}</div>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: 0 }}>{w.title}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{w.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
                {WERTE.map((_, i) => (
                  <div key={i} style={{ height: 6, borderRadius: 3, background: werteIdx === i ? CTA_HEX : "#D0DFF0", width: werteIdx === i ? 20 : 6, transition: "all 0.3s ease" }} />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {WERTE.map((w, i) => (
                <div key={i}
                  style={{ background: w.bg, borderRadius: 20, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12, transition: "transform 0.35s ease", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", boxShadow: `0 2px 12px ${w.color}20` }}>{w.icon}</div>
                  <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: 0 }}>{w.title}</p>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WIRKUNG ──────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>{T.ueberUns.wirkung_label}</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: 0 }}>{T.ueberUns.wirkung_h2}</h2>
          </div>

          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: "white", borderRadius: 20, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 8, border: "1.5px solid #D0DFF0" }}>
                  <p style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: CTA, margin: 0, lineHeight: 1.1 }}>{s.value}</p>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>{s.label}</p>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.sub}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {STATS.map((s, i) => {
                const hov = hoveredStat === i;
                return (
                  <div key={i}
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}
                    style={{
                      background: hov ? "white" : "transparent",
                      borderRadius: 20,
                      padding: "28px 24px",
                      display: "flex", flexDirection: "column", gap: 8,
                      border: `1.5px solid ${hov ? "#D6E8FF" : "#D0DFF0"}`,
                      boxShadow: hov ? "0 8px 28px rgba(45,91,141,0.10)" : "none",
                      transform: hov ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                      transition: "all 0.2s ease",
                    }}>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 38, color: CTA, margin: 0, lineHeight: 1.1 }}>{s.value}</p>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>{s.label}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.sub}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── WIE WIR ARBEITEN ─────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>{T.ueberUns.wie_label}</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "0 0 8px" }}>{T.ueberUns.wie_h2}</h2>
            <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{T.ueberUns.wie_desc}</p>
          </div>
          {isMobile ? (
            <div>
              <div ref={stepsSliderRef}
                onScroll={e => { const el = e.currentTarget; setStepsIdx(Math.round(el.scrollLeft / (el.clientWidth * 0.85))); }}
                style={{ display: "flex", overflowX: "auto", gap: 12, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", marginRight: -16, paddingRight: 32 } as React.CSSProperties}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ flexShrink: 0, width: "85%", scrollSnapAlign: "start", background: "white", borderRadius: 20, padding: "40px 18px 28px", border: "1px solid #EAF0FA", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <span style={{ position: "absolute", top: 8, right: 12, fontFamily: F, fontWeight: 800, fontSize: 64, color: CTA, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{i + 1}</span>
                    <img src={s.icon} width={44} height={44} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)", marginBottom: 16 }} />
                    <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 8px" }}>{s.title}</h3>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
                {STEPS.map((_, i) => (
                  <div key={i} style={{ height: 6, borderRadius: 3, background: stepsIdx === i ? CTA_HEX : "#D0DFF0", width: stepsIdx === i ? 20 : 6, transition: "all 0.3s ease" }} />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, position: "relative" }}>
              {STEPS.map((s, i) => (
                <div key={i}
                  style={{ background: "white", borderRadius: 20, padding: "48px 20px 32px", border: "1px solid #EAF0FA", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#F4F9FF"; el.style.borderColor = CTA_HEX; el.style.boxShadow = "0 4px 20px rgba(45,91,141,0.10)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.borderColor = "#EAF0FA"; el.style.boxShadow = "none"; }}>
                  <span style={{ position: "absolute", top: 10, right: 14, fontFamily: F, fontWeight: 800, fontSize: 72, color: CTA, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{i + 1}</span>
                  <div style={{ position: "relative", marginBottom: 20 }}>
                    <img src={s.icon} width={52} height={52} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)", display: "block" }} />
                  </div>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 10px", lineHeight: 1.35 }}>{s.title}</h3>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NETZWERK ─────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ marginBottom: isMobile ? 28 : 40, textAlign: isMobile ? "center" : "left" }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>{T.ueberUns.netzwerk_label}</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "0 0 8px" }}>{T.ueberUns.netzwerk_h2}</h2>
            <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", lineHeight: 1.7, margin: 0 }}>
              {T.ueberUns.netzwerk_desc}
            </p>
          </div>
          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: "5fr 2fr", gap: isMobile ? 24 : 48, alignItems: "start" }}>
            {/* Interactive Map */}
            <div>
              <AustriaMap activeId={selectedProvince} onSelect={setSelectedProvince} />
            </div>
            {/* Info Panel */}
            <div style={{ minHeight: isMobile ? "auto" : 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {activeProvince ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>{T.ueberUns.netzwerk_selected_label}</p>
                    <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 26, color: "var(--black)", margin: 0 }}>{activeProvince.name}</h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <span style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 48 : 56, color: "#CD1719", lineHeight: 1 }}>{activeProvince.count}</span>
                      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "6px 0 0", lineHeight: 1.4 }}>{T.ueberUns.netzwerk_count_desc.replace("{name}", activeProvince.name)}</p>
                    </div>
                    <div style={{ width: 40, height: 3, background: "#CD1719", borderRadius: 2 }} />
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                      {T.ueberUns.netzwerk_chips_selected.map((t, i) => (
                        <span key={i} style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: CTA_HEX, border: `1.5px solid ${CTA_HEX}`, borderRadius: 9999, padding: "6px 14px", display: "inline-block" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <a href={`/fachkraefte?bundesland=${activeProvince.id}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 22px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                    {T.ueberUns.netzwerk_cta_selected.replace("{name}", activeProvince.name)}
                    <img src="/icons/arrow-right.svg" width={13} height={13} alt="" style={{ filter: "brightness(0) invert(1)" }} />
                  </a>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, color: "var(--black)", margin: "0 0 8px" }}>{T.ueberUns.netzwerk_default_h3}</h3>
                    <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.7, margin: 0 }}>
                      {T.ueberUns.netzwerk_default_desc}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                    {T.ueberUns.netzwerk_chips_default.map((t, i) => (
                      <span key={i} style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: CTA_HEX, border: `1.5px solid ${CTA_HEX}`, borderRadius: 9999, padding: "6px 14px", display: "inline-block" }}>{t}</span>
                    ))}
                  </div>
                  <a href="/fachkraefte"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 22px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                    {T.ueberUns.netzwerk_cta_default}
                    <img src="/icons/arrow-right.svg" width={13} height={13} alt="" style={{ filter: "brightness(0) invert(1)" }} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTRAUEN / TIMELINE ─────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>{T.ueberUns.vertrauen_label}</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: 0 }}>{T.ueberUns.vertrauen_h2}</h2>
          </div>
          {/* Desktop: horizontal timeline */}
          {!isMobile ? (
            <div style={{ position: "relative" }}>
              {/* connector line */}
              <div style={{ position: "absolute", top: 6, left: 0, right: 0, height: 2, background: "#D6E4F7", zIndex: 0 }} />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${TRUST.length}, 1fr)`, gap: 24 }}>
                {TRUST.map((t, i) => (
                  <div key={i} style={{ position: "relative", zIndex: 1, paddingTop: 28 }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: 14, height: 14, borderRadius: "50%", background: CTA, border: "3px solid white", boxShadow: `0 0 0 2px ${CTA_HEX}` }} />
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: CTA, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.year}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Mobile: vertical */
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TRUST.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < TRUST.length - 1 ? 28 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: CTA, flexShrink: 0, marginTop: 4 }} />
                    {i < TRUST.length - 1 && <div style={{ width: 2, flex: 1, background: "#D6E4F7", marginTop: 6 }} />}
                  </div>
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: CTA, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.year}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48, display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: isMobile ? 28 : 40, lineHeight: "1.3", color: "var(--black)", margin: 0 }}>{T.ueberUns.faq_h2}</h2>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: isMobile ? 15 : 18, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
              {T.ueberUns.faq_desc}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 864, margin: "0 auto" }}>
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "none", border: "none", borderBottom: open ? "none" : "1px solid var(--grey-border)", cursor: "pointer", textAlign: "left", gap: 16 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: isMobile ? 16 : 20, lineHeight: 1.4, color: "var(--black)", flex: 1 }}>{item.q}</span>
                    <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {open ? <Minus size={16} color="var(--black)" /> : <Plus size={16} color="var(--black)" />}
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "12px 16px 16px", fontFamily: F, fontWeight: 400, fontSize: isMobile ? 14 : 16, lineHeight: 1.5, color: "var(--grey-text)", borderBottom: "1px solid var(--grey-border)" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>
              {T.ueberUns.cta_h2}
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>
              {T.ueberUns.cta_desc}
            </p>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, marginTop: 8, width: isMobile ? "100%" : "auto" }}>
              <a href="/vorgespraech"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 50, padding: "0 36px 0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                {T.ueberUns.cta_primary}
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
              </a>
              <a href="/fachkraefte"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid ${CTA}`, color: CTA, fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", background: "white", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEF4FC"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
                {T.ueberUns.cta_secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
