"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useWinW() {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(window.innerWidth);
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const CTA_HEX = "#2D5B8D";

// ── Data ──────────────────────────────────────────────────────────────────────
const SPECS = {
  psychologe: {
    label: "Psycholog*in",
    color: "#4A90D9",
    lightBg: "#EBF4FF",
    icon: "/icons/role-brain.svg",
    image: "/icons/image-psychologist.svg",
    tagline: "Beratung, Diagnostik & Orientierung",
    desc: "Psycholog*innen bieten psychologische Diagnostik, Beratung und Unterstützung. Ideal bei Lebenskrisen, Orientierungsbedarf und präventiver Begleitung — ohne zwingend eine Diagnose zu stellen.",
    details: [
      { icon: "🎓", label: "Ausbildung", value: "Studium der Psychologie (5 Jahre, Master oder Diplom)" },
      { icon: "❤️", label: "Hilft bei", value: "Lebenskrisen, Stress, Orientierung, Persönlichkeitsentwicklung" },
      { icon: "💬", label: "Methoden", value: "Gespräche, Tests, Diagnostik, Beratung" },
      { icon: "💊", label: "Medikamente?", value: "Nein" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Bei Orientierungsbedarf, Lebensfragen, präventiver Unterstützung" },
      { icon: "⏱", label: "Dauer", value: "Wenige Sitzungen bis mehrere Monate" },
    ],
  },
  psychotherapeut: {
    label: "Psychotherapeut*in",
    color: "#E07878",
    lightBg: "#FFF0F0",
    icon: "/icons/role-hilfe.svg",
    image: "/icons/image-psychotherapeut.svg",
    tagline: "Langfristige Therapie psychischer Erkrankungen",
    desc: "Psychotherapeut*innen sind spezialisiert auf die langfristige Behandlung von psychischen Erkrankungen. Ihre Methoden helfen, Gedankenmuster zu verstehen und nachhaltig zu verändern.",
    details: [
      { icon: "🎓", label: "Ausbildung", value: "Psychologiestudium + approbierte Weiterbildung (3–5 Jahre)" },
      { icon: "❤️", label: "Hilft bei", value: "Depression, Angststörungen, Trauma, Burnout, Essstörungen" },
      { icon: "💬", label: "Methoden", value: "Verhaltenstherapie, tiefenpsychologische Verfahren, EMDR" },
      { icon: "💊", label: "Medikamente?", value: "Nein" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Bei anhaltenden psychischen Belastungen und Erkrankungen" },
      { icon: "⏱", label: "Dauer", value: "Meist 25–80 Sitzungen über Monate bis Jahre" },
    ],
  },
  psychiater: {
    label: "Psychiater*in",
    color: "#5BAA6E",
    lightBg: "#F0FAF2",
    icon: "/icons/role-herz.svg",
    image: "/icons/image-psychiater.svg",
    tagline: "Medizinische Behandlung & Medikamente",
    desc: "Psychiater*innen sind Ärzt*innen mit Spezialisierung auf psychische Erkrankungen. Sie können sowohl Psychotherapie durchführen als auch Medikamente verschreiben.",
    details: [
      { icon: "🎓", label: "Ausbildung", value: "Medizinstudium (6 Jahre) + Facharztausbildung (5 Jahre)" },
      { icon: "❤️", label: "Hilft bei", value: "Schwere Depression, Schizophrenie, Bipolare Störung, akute Krisen" },
      { icon: "💬", label: "Methoden", value: "Medikamentöse Therapie, psychiatrische Gespräche, ggf. Psychotherapie" },
      { icon: "💊", label: "Medikamente?", value: "Ja — einzige Gruppe mit Verschreibungsrecht" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Bei schweren Erkrankungen, Medikamentenbedarf, akuten Krisen" },
      { icon: "⏱", label: "Dauer", value: "Langfristige Behandlung, oft ambulant oder stationär" },
    ],
  },
  sozialberater: {
    label: "Sozialberater*in",
    color: "#B07D3A",
    lightBg: "#FFF8EE",
    icon: "/icon_sozialberater.svg",
    image: "/sozialberater.png",
    tagline: "Lebensberatung & Orientierung",
    desc: "Soziale Lebensberater*innen begleiten Menschen in schwierigen Lebenssituationen — ohne Diagnose, ohne lange Wartezeiten. Ideal bei Krisen, Orientierungsbedarf und alltäglichen Belastungen.",
    details: [
      { icon: "🎓", label: "Ausbildung", value: "Ausbildung in sozialer Beratung, Coaching oder Lebensberatung" },
      { icon: "🤝", label: "Hilft bei", value: "Lebenskrisen, Orientierungslosigkeit, Stress, Beziehungsfragen, berufliche Veränderungen" },
      { icon: "💬", label: "Methoden", value: "Gesprächsbegleitung, Coaching, lösungsorientierte Beratung" },
      { icon: "💊", label: "Medikamente?", value: "Nein — kein medizinisches Verschreibungsrecht" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Wenn du Orientierung suchst, ohne eine klinische Diagnose zu benötigen" },
      { icon: "⏱", label: "Dauer", value: "Flexible Einzelgespräche, kurzfristig verfügbar" },
    ],
  },
};

type CellVal = boolean | "partial";
const QUICK_ROWS: { label: string; psychologe: CellVal; psychotherapeut: CellVal; psychiater: CellVal; sozialberater: CellVal }[] = [
  { label: "Gespräche / Beratung", psychologe: true,      psychotherapeut: true,      psychiater: true,      sozialberater: true },
  { label: "Diagnostik / Tests",   psychologe: true,      psychotherapeut: true,      psychiater: true,      sozialberater: false },
  { label: "Psychotherapie",        psychologe: false,     psychotherapeut: true,      psychiater: "partial", sozialberater: false },
  { label: "Medikamente",           psychologe: false,     psychotherapeut: false,     psychiater: true,      sozialberater: false },
  { label: "Kassenerstattung",      psychologe: "partial", psychotherapeut: true,      psychiater: true,      sozialberater: false },
  { label: "Diagnose nötig",         psychologe: false,     psychotherapeut: false,     psychiater: true,      sozialberater: false },
];

const DECISION_TREE = [
  { q: "Ich brauche Medikamente oder eine ärztliche Diagnose.", answer: "psychiater", answerLabel: "Psychiater*in" },
  { q: "Ich leide unter Depressionen, Angststörungen oder Trauma.", answer: "psychotherapeut", answerLabel: "Psychotherapeut*in" },
  { q: "Ich suche Beratung oder möchte mich orientieren.", answer: "psychologe", answerLabel: "Psycholog*in" },
  { q: "Ich weiß noch nicht, was ich brauche.", answer: "gespräch", answerLabel: "Orientierungsgespräch" },
];


const EXAMPLES = [
  { name: "Anna, 27", situation: "Ich habe seit Monaten Panikattacken und traue mich kaum noch aus dem Haus.", result: "psychotherapeut", resultLabel: "Psychotherapeut*in", color: "#E07878", bg: "#FFF0F0" },
  { name: "Markus, 42", situation: "Mein Arzt vermutet eine schwere Depression. Ich brauche Medikamente und Unterstützung.", result: "psychiater", resultLabel: "Psychiater*in", color: "#5BAA6E", bg: "#F0FAF2" },
  { name: "Lisa, 24", situation: "Ich bin unsicher, was ich mit meinem Leben anfangen soll. Kein konkretes Problem, aber ich fühle mich verloren.", result: "psychologe", resultLabel: "Psycholog*in", color: "#4A90D9", bg: "#EBF4FF" },
  { name: "Felix, 33", situation: "Ich weiß nicht, ob meine Probleme \"schlimm genug\" für Therapie sind. Ich brauche erstmal eine Einschätzung.", result: "gespräch", resultLabel: "Orientierungsgespräch", color: CTA_HEX, bg: "#ECF5FF" },
];

type SpecKey = keyof typeof SPECS;

function CheckCell({ val }: { val: boolean | "partial" }) {
  if (val === true) return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "#D4F0C8" }}>
      <img src="/icon_check.svg" width={18} height={18} alt="Ja" style={{ objectFit: "contain" }} />
    </span>
  );
  if (val === "partial") return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "#FFE8B0" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 8v5M12 16h.01" stroke="#8A5C00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#8A5C00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "#FFD0D0" }}>
      <img src="/icon_cancel.svg" width={18} height={18} alt="Nein" style={{ objectFit: "contain" }} />
    </span>
  );
}

export default function UnterschiedPage() {
  const winW = useWinW();
  const isMobile = winW > 0 && winW < 1071;
  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;

  const [activeSpec, setActiveSpec] = useState<SpecKey>("psychologe");
  const [compareA, setCompareA] = useState<SpecKey | null>("psychologe");
  const [compareB, setCompareB] = useState<SpecKey | null>("psychotherapeut");
  const [selectedDecision, setSelectedDecision] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const specKeys = Object.keys(SPECS) as SpecKey[];

  const spec = SPECS[activeSpec];

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "32px 0 40px" : "40px 0 64px" }}>
        <div style={{ ...wrap }}>
          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column-reverse" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 1fr", gap: isMobile ? 24 : 64, alignItems: "center" }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>Die Unterschiede im Überblick</p>
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 26 : 38, lineHeight: 1.2, color: "var(--black)", margin: "0 0 16px" }}>
                Psycholog*in,<br />Psychotherapeut*in,<br />Psychiater*in<br />oder Sozialberater*in?
              </h1>
              <p style={{ fontFamily: F, fontSize: isMobile ? 14 : 16, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 24px" }}>
                Wir erklären dir einfach, wer dir wann helfen kann — damit du die richtige Entscheidung triffst.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Einfach erklärt", "Schnell verständlich", "Für die richtige Entscheidung"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
              <a href="#vergleich"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", transition: "background 0.2s", alignSelf: "flex-start" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Jetzt herausfinden
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </a>
            </div>
            {/* Right: illustration */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 10 : 16 }}>
              {specKeys.map((k) => {
                const s = SPECS[k];
                return (
                  <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, background: s.lightBg, borderRadius: 20, padding: isMobile ? "22px 16px" : "32px 20px" }}>
                    <div style={{ width: isMobile ? 64 : 88, height: isMobile ? 64 : 88, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${s.color}30`, overflow: "hidden" }}>
                      <img src={s.image} width={k === "sozialberater" ? (isMobile ? 44 : 58) : (isMobile ? 44 : 62)} height={k === "sozialberater" ? (isMobile ? 44 : 58) : (isMobile ? 44 : 62)} alt="" style={{ objectFit: "contain" }} />
                    </div>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 13 : 15, color: s.color, textAlign: "center", lineHeight: 1.3 }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK COMPARISON TABLE ───────────────────────────── */}
      <section style={{ background: "#F4F9FF", padding: isMobile ? "40px 0" : "56px 0" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Auf einen Blick</p>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, color: "var(--black)", margin: "0 0 6px" }}>Schnellübersicht</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.6 }}>Die wichtigsten Unterschiede auf einen Blick.</p>
          <div style={{ overflowX: "auto", borderRadius: 16, boxShadow: "0 2px 16px rgba(45,91,141,0.07)", background: "white" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ background: "white" }}>
                  <th style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--grey-text)", textAlign: "left", padding: "18px 20px", borderBottom: "1px solid #E8F0FA" }}>Kriterium</th>
                  {(["psychologe", "psychotherapeut", "psychiater"] as SpecKey[]).map(k => (
                    <th key={k}
                      onMouseEnter={() => setHoveredCol(k)}
                      onMouseLeave={() => setHoveredCol(null)}
                      style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: SPECS[k].color, textAlign: "center", padding: "18px 16px", borderBottom: "1px solid #E8F0FA", cursor: "default", background: hoveredCol === k ? "rgba(45,91,141,0.06)" : "white", transition: "background 0.18s" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <img src={k === "psychologe" ? "/icon_psychologist.svg" : k === "psychotherapeut" ? "/icon_psychotherapeut.svg" : "/icon_psychiater.svg"} width={28} height={28} alt="" style={{ objectFit: "contain" }} />
                        {SPECS[k].label}
                      </div>
                    </th>
                  ))}
                  <th
                    onMouseEnter={() => setHoveredCol("sozialberater")}
                    onMouseLeave={() => setHoveredCol(null)}
                    style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: SPECS.sozialberater.color, textAlign: "center", padding: "18px 16px", borderBottom: "1px solid #E8F0FA", cursor: "default", background: hoveredCol === "sozialberater" ? "rgba(45,91,141,0.06)" : "white", transition: "background 0.18s" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <img src="/icon_sozialberater.svg" width={28} height={28} alt="" style={{ objectFit: "contain" }} />
                      {SPECS.sozialberater.label}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {QUICK_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 500, padding: "16px 20px", borderBottom: i < QUICK_ROWS.length - 1 ? "1px solid #EEF3FA" : "none", background: i % 2 === 0 ? "white" : "rgba(236,245,255,0.45)" }}>{row.label}</td>
                    {(["psychologe", "psychotherapeut", "psychiater"] as SpecKey[]).map(k => (
                      <td key={k}
                        onMouseEnter={() => setHoveredCol(k)}
                        onMouseLeave={() => setHoveredCol(null)}
                        style={{ textAlign: "center", padding: "16px 16px", borderBottom: i < QUICK_ROWS.length - 1 ? "1px solid #EEF3FA" : "none", background: hoveredCol === k ? "rgba(45,91,141,0.06)" : i % 2 === 0 ? "white" : "rgba(236,245,255,0.45)", transition: "background 0.18s" }}>
                        <CheckCell val={row[k]} />
                      </td>
                    ))}
                    <td
                      onMouseEnter={() => setHoveredCol("sozialberater")}
                      onMouseLeave={() => setHoveredCol(null)}
                      style={{ textAlign: "center", padding: "16px 16px", borderBottom: i < QUICK_ROWS.length - 1 ? "1px solid #EEF3FA" : "none", background: hoveredCol === "sozialberater" ? "rgba(45,91,141,0.06)" : i % 2 === 0 ? "white" : "rgba(236,245,255,0.45)", transition: "background 0.18s" }}>
                      <CheckCell val={row.sozialberater} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SIDE-BY-SIDE COMPARISON ──────────────────────────── */}
      <section id="vergleich" style={{ background: "white", padding: isMobile ? "40px 0" : "56px 0" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Im Detail</p>
          <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: isMobile ? 22 : 32, lineHeight: 1.3, color: "var(--black)", margin: "0 0 6px" }}>Vergleiche zwei Berufsgruppen</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.6 }}>Wähle zwei Berufsgruppen aus und sieh die Unterschiede auf einen Blick.</p>

          {/* Picker: 4 selection cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
            {specKeys.map(k => {
              const s = SPECS[k];
              const isA = compareA === k;
              const isB = compareB === k;
              const selected = isA || isB;
              return (
                <button key={k} onClick={() => {
                  if (isA) { setCompareA(null); return; }
                  if (isB) { setCompareB(null); return; }
                  if (!compareA) { setCompareA(k); return; }
                  if (!compareB) { setCompareB(k); return; }
                  setCompareA(k); setCompareB(null);
                }} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  padding: isMobile ? "16px 10px" : "20px 14px",
                  borderRadius: 16,
                  background: isA ? SPECS[k].lightBg : isB ? SPECS[k].lightBg : "white",
                  border: selected ? `2px solid ${s.color}` : "2px solid #EAF0FA",
                  cursor: "pointer", transition: "all 0.18s",
                  position: "relative",
                }}>
                  {selected && (
                    <span style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "white" }}>{isA ? "A" : "B"}</span>
                    </span>
                  )}
                  <img src={k === "psychologe" ? "/icon_psychologist.svg" : k === "psychotherapeut" ? "/icon_psychotherapeut.svg" : k === "psychiater" ? "/icon_psychiater.svg" : "/icon_sozialberater.svg"} width={32} height={32} alt="" style={{ objectFit: "contain" }} />
                  <span style={{ fontFamily: F, fontWeight: selected ? 700 : 500, fontSize: isMobile ? 12 : 14, color: selected ? s.color : "var(--grey-text)", textAlign: "center", lineHeight: 1.3 }}>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Side-by-side result */}
          {compareA && compareB ? (
            <div key={`${compareA}-${compareB}`} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, animation: "tdFadeIn 0.3s ease" }}>
              {[compareA, compareB].map((k, col) => {
                const s = SPECS[k as SpecKey];
                return (
                  <div key={k} style={{ background: s.lightBg, borderRadius: 20, padding: isMobile ? 18 : 28, border: `1.5px solid ${s.color}30` }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${s.color}25`, overflow: "hidden", flexShrink: 0 }}>
                        <img src={s.image} width={38} height={38} alt="" style={{ objectFit: "contain" }} />
                      </div>
                      <div>
                        <span style={{ display: "inline-block", background: "white", borderRadius: 9999, padding: "2px 10px", fontFamily: F, fontSize: 11, color: s.color, fontWeight: 600, marginBottom: 4 }}>{col === 0 ? "A" : "B"}</span>
                        <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 16 : 18, color: "var(--black)", margin: 0 }}>{s.label}</h3>
                      </div>
                    </div>
                    <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.6, margin: "0 0 20px" }}>{s.desc}</p>
                    {/* Details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {s.details.map((d, i) => (
                        <div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 14px", border: `1px solid ${s.color}18`, display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 16, flexShrink: 0 }}>{d.icon}</span>
                          <div>
                            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: s.color, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.label}</p>
                            <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.4 }}>{d.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--grey-text)", fontFamily: F, fontSize: 15 }}>
              {!compareA && !compareB ? "Wähle zwei Berufsgruppen oben aus, um sie zu vergleichen." : "Wähle noch eine weitere Berufsgruppe aus."}
            </div>
          )}
        </div>
        <style>{`@keyframes tdFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </section>

      {/* ── DECISION HELPER ──────────────────────────────────── */}
      <section style={{ background: "#F8FAFE", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Entscheidungshilfe</p>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, color: "var(--black)", margin: "0 0 8px" }}>Welcher passt zu dir?</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.6 }}>Wähle die Aussage, die am besten auf dich zutrifft.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
            {DECISION_TREE.map((item, i) => {
              const selected = selectedDecision === i;
              const s = item.answer !== "gespräch" ? SPECS[item.answer as SpecKey] : null;
              const color = s ? s.color : CTA_HEX;
              const bg = s ? s.lightBg : "#ECF5FF";
              return (
                <div key={i}>
                  <button onClick={() => setSelectedDecision(selected ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "18px 20px", borderRadius: 14, border: selected ? `2px solid ${color}` : "2px solid #E8EEF6", background: selected ? bg : "white", cursor: "pointer", transition: "all 0.18s", textAlign: "left" }}>
                    <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: selected ? 600 : 400, lineHeight: 1.4 }}>{item.q}</span>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, transform: selected ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      <path d="M6 9l6 6 6-6" stroke={selected ? color : "var(--grey-border)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {selected && (
                    <div style={{ background: bg, border: `1.5px solid ${color}30`, borderRadius: "0 0 14px 14px", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, marginTop: -2 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 500 }}>Empfehlung: </span>
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color }}>→ {item.answerLabel}</span>
                      {item.answer !== "gespräch" ? (
                        <a href="/fachkraefte" style={{ marginLeft: "auto", fontFamily: F, fontSize: 12, color: CTA, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>Jetzt suchen →</a>
                      ) : (
                        <a href="/vorgespraech" style={{ marginLeft: "auto", fontFamily: F, fontSize: 12, color: CTA, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>Gespräch buchen →</a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REAL EXAMPLES ────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Erkennst du dich?</p>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, color: "var(--black)", margin: "0 0 8px" }}>Beispiele aus dem Alltag</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.6 }}>Reale Situationen — und welche Fachkraft dort am sinnvollsten ist.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {EXAMPLES.map((ex, i) => (
              <div key={i} style={{ background: ex.bg, borderRadius: 20, padding: "24px 24px 20px", border: `1px solid ${ex.color}25`, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: ex.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: "white" }}>{ex.name.charAt(0)}</span>
                  </div>
                  <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)" }}>{ex.name}</span>
                </div>
                <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>„{ex.situation}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4, borderTop: `1px solid ${ex.color}20` }}>
                  <span style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)" }}>Empfehlung:</span>
                  <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: ex.color, background: "white", borderRadius: 9999, padding: "2px 12px", border: `1px solid ${ex.color}30` }}>→ {ex.resultLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────── */}
      <section style={{ background: "#F8FAFE", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>
              Noch unsicher, wer zu dir passt?
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>
              Kein Problem — dafür sind wir da. In einem kostenlosen Gespräch helfen wir dir persönlich weiter.
            </p>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, marginTop: 8 }}>
              <a href="/vorgespraech"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Kostenloses Orientierungsgespräch
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </a>
              <a href="/orientierungstest"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid ${CTA}`, color: CTA, fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", background: "white", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = CTA; el.style.color = "white"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.color = CTA; }}>
                Orientierungstest starten
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
