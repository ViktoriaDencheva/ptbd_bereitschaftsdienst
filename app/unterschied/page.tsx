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
      { icon: "🎓", label: "Ausbildung", value: "5-jähriges Psychologiestudium (Master oder Diplom) — kein Arzt, keine Approbation als Therapeut*in" },
      { icon: "❤️", label: "Hilft bei", value: "Lebenskrisen, Stress, Burnout-Prävention, Orientierung, Persönlichkeitsentwicklung, psychologische Diagnostik" },
      { icon: "💬", label: "Methoden", value: "Psychologische Gespräche, standardisierte Tests, Diagnostik, Beratung — keine Psychotherapie im Kassensystem" },
      { icon: "💊", label: "Medikamente?", value: "Nein — Psycholog*innen dürfen keine Medikamente verschreiben" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Wenn du eine psychologische Einschätzung brauchst, dich orientieren möchtest oder präventiv arbeiten willst — ohne langen Wartezeiten" },
      { icon: "⏱", label: "Dauer", value: "Meist wenige bis 10 Sitzungen — flexibel, oft privat oder selbstzahlend (60–120 €/Sitzung)" },
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
      { icon: "🎓", label: "Ausbildung", value: "Psychologiestudium + staatlich anerkannte Approbation als Psychotherapeut*in (3–5 Jahre Weiterbildung)" },
      { icon: "❤️", label: "Hilft bei", value: "Depression, Angststörungen, Trauma, Burnout, Essstörungen, Zwangsstörungen, PTBS" },
      { icon: "💬", label: "Methoden", value: "Verhaltenstherapie (KVT), tiefenpsychologische Verfahren, EMDR, Schematherapie — je nach Ausbildungsschwerpunkt" },
      { icon: "💊", label: "Medikamente?", value: "Nein — bei Bedarf Überweisung zum Psychiater*in" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Bei anhaltenden psychischen Belastungen oder Erkrankungen — Kassentherapie möglich, aber Wartezeit oft 3–6 Monate" },
      { icon: "⏱", label: "Dauer", value: "Kurzzeittherapie: 12–24 Sitzungen. Langzeittherapie: bis zu 80 Sitzungen über 1–2 Jahre. Kassensitz oder Privatpraxis (80–150 €/Std.)" },
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
      { icon: "🎓", label: "Ausbildung", value: "Vollständiges Medizinstudium (6 Jahre) + Facharztausbildung Psychiatrie & Psychotherapie (5 Jahre)" },
      { icon: "❤️", label: "Hilft bei", value: "Schwere Depression, Schizophrenie, Bipolare Störung, akute Psychosen, ADHS, Suchterkrankungen, Krisen mit Fremdgefährdung" },
      { icon: "💬", label: "Methoden", value: "Medikamentöse Therapie, psychiatrische Gespräche, Krisenintervention — manche bieten zusätzlich Psychotherapie an" },
      { icon: "💊", label: "Medikamente?", value: "Ja — als einzige Berufsgruppe mit vollem Verschreibungsrecht für Psychopharmaka (Antidepressiva, Antipsychotika u.a.)" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Bei schweren oder akuten Erkrankungen, wenn Medikamente nötig sind oder andere Behandlungen nicht ausreichen" },
      { icon: "⏱", label: "Dauer", value: "Langfristige Begleitung — ambulant (Facharztpraxis) oder stationär (Klinik). Kassenabrechnung möglich, Wartezeit je nach Region" },
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
      { icon: "🎓", label: "Ausbildung", value: "Ausbildung in sozialer Beratung, systemischem Coaching oder Lebensberatung — kein Studium oder Approbation erforderlich" },
      { icon: "🤝", label: "Hilft bei", value: "Lebenskrisen, Orientierungslosigkeit, Stress, Beziehungsfragen, berufliche Veränderungen, Trauer, Erschöpfung ohne klinischen Befund" },
      { icon: "💬", label: "Methoden", value: "Lösungsorientierte Gesprächsführung, Coaching, systemische Beratung — niedrigschwellig und ohne Diagnose" },
      { icon: "💊", label: "Medikamente?", value: "Nein — keine medizinischen Befugnisse. Bei Verdacht auf Erkrankung: Weiterempfehlung an Fachärzt*innen" },
      { icon: "📅", label: "Wann sinnvoll?", value: "Wenn du Unterstützung brauchst, aber keine klinische Diagnose vorliegt — kurzfristige Termine, oft online verfügbar" },
      { icon: "⏱", label: "Dauer", value: "Meist 3–8 Gespräche, flexibel buchbar. Keine Kassenerstattung — Kosten variieren, oft 50–90 €/Sitzung" },
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

const blueFilter = "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)";
// Outline icons for detail rows — same stroke style as platform icons
const DETAIL_ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><path d="M22 10V6L12 2L2 6L12 10L22 6V10M6 12.5V17.5L12 20L18 17.5V12.5L12 15L6 12.5Z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <img key="3" src="/icon_pill.svg" width={18} height={18} alt="" style={{ display: "block", objectFit: "contain", filter: blueFilter }} />,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><circle cx="12" cy="12" r="10" stroke="var(--cta)" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

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
          <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: isMobile ? 22 : 32, lineHeight: 1.3, color: "var(--black)", margin: "0 0 6px" }}>Vergleiche Berufsgruppen</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.6 }}>Wähle eine oder zwei Berufsgruppen aus.</p>

          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "280px 1fr", gap: isMobile ? 20 : 24, alignItems: "start" }}>

          {/* Checkboxes — horizontal tab style like TherapistDifference */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {specKeys.map(k => {
              const s = SPECS[k];
              const checked1 = compareA === k;
              const checked2 = compareB === k;
              const checked = checked1 || checked2;
              return (
                <button key={k} onClick={() => {
                  if (checked1) { setCompareA(compareB); setCompareB(null); return; }
                  if (checked2) { setCompareB(null); return; }
                  if (!compareA) { setCompareA(k); return; }
                  if (!compareB) { setCompareB(k); return; }
                  setCompareA(compareB); setCompareB(k);
                }} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "0 16px",
                  height: checked ? 64 : 58,
                  borderRadius: "0 10px 10px 0",
                  background: checked ? s.lightBg : "white",
                  border: "none",
                  borderLeft: `3px solid ${checked ? s.color : "#E0E0E0"}`,
                  cursor: "pointer", transition: "all 0.18s",
                  boxShadow: checked ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
                }}>
                  <img src={k === "psychologe" ? "/icon_psychologist.svg" : k === "psychotherapeut" ? "/icon_psychotherapeut.svg" : k === "psychiater" ? "/icon_psychiater.svg" : "/icon_sozialberater.svg"} width={24} height={24} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                  <span style={{ fontFamily: F, fontWeight: checked ? 700 : 400, fontSize: 16, color: s.color, flex: 1, textAlign: "left" }}>{s.label}</span>
                  {/* Checkbox */}
                  <span style={{ width: 20, height: 20, borderRadius: 5, border: checked ? `2px solid ${s.color}` : "2px solid #C3C3C3", background: checked ? s.color : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                    {checked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Result cards */}
          <div>
          {(compareA || compareB) ? (() => {
            const active = [compareA, compareB].filter(Boolean) as SpecKey[];
            return (
              <div key={active.join("-")} style={{ animation: "tdFadeIn 0.3s ease" }}>
                {active.length === 1 ? (() => {
                  const s = SPECS[active[0]];
                  return (
                    <div style={{ background: "linear-gradient(135deg, #FFF6F2 0%, #F5FBFF 100%)", borderRadius: 20, padding: isMobile ? 20 : 32, display: "grid", gridTemplateColumns: !isMobile ? "1fr 220px" : "1fr", gridTemplateRows: "auto auto", columnGap: 32, rowGap: 24 }}>
                      <div style={{ gridColumn: 1, gridRow: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                        <span style={{ display: "inline-flex", alignSelf: "flex-start", background: "var(--blue-subtle)", borderRadius: 9999, padding: "4px 14px", fontFamily: F, fontWeight: 400, fontSize: 13, color: "var(--black)" }}>{s.tagline}</span>
                        <h3 style={{ fontFamily: F, fontWeight: 500, fontSize: isMobile ? 24 : 32, lineHeight: 1.2, color: s.color, margin: 0 }}>{s.label}</h3>
                        <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>{s.desc}</p>
                      </div>
                      {!isMobile && (
                        <div style={{ gridColumn: 2, gridRow: "1 / 3", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                          <img src={s.image} alt={s.label} style={{ width: "100%", maxWidth: 200, height: "auto", objectFit: "contain" }} />
                        </div>
                      )}
                      <div style={{ gridColumn: !isMobile ? "1 / 2" : 1, gridRow: 2, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 10 }}>
                        {s.details.map((d, i) => (
                          <div key={i} style={{ background: "white", borderRadius: 12, padding: "14px", border: `1px solid ${s.color}18`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#D6EBFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {DETAIL_ICONS[i]}
                            </div>
                            <div>
                              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "var(--grey-text)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.label}</p>
                              <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.4 }}>{d.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })() : (() => {
                  const sA = SPECS[active[0]];
                  const sB = SPECS[active[1]];
                  return (
                    <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                      {/* Profession headers */}
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr", gap: 0 }}>
                        {[sA, sB].map((s, idx) => (
                          <div key={s.label} style={{
                            background: s.lightBg,
                            borderBottom: `3px solid ${s.color}`,
                            padding: isMobile ? "20px 16px" : "24px 28px",
                            borderRight: idx === 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center"
                          }}>
                            <img src={s.image} alt={s.label} style={{ width: isMobile ? 64 : 88, height: isMobile ? 64 : 88, objectFit: "contain" }} />
                            <span style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 15 : 18, color: s.color }}>{s.label}</span>
                            <span style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", lineHeight: 1.3 }}>{s.tagline}</span>
                          </div>
                        ))}
                      </div>
                      {/* Comparison rows */}
                      {sA.details.map((dA, i) => {
                        const dB = sB.details[i];
                        return (
                          <div key={i} style={{ borderBottom: i < sA.details.length - 1 ? "1px solid #F0F0F0" : "none" }}>
                            {/* Row label */}
                            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "12px 16px 6px" : "16px 28px 8px", background: "#FAFAFA" }}>
                              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#D6EBFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {DETAIL_ICONS[i]}
                              </div>
                              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "var(--grey-text)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{dA.label}</span>
                            </div>
                            {/* Values */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                              <div style={{ padding: isMobile ? "10px 16px 14px" : "12px 28px 18px", borderRight: "1px solid #F0F0F0" }}>
                                <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.5 }}>{dA.value}</p>
                              </div>
                              <div style={{ padding: isMobile ? "10px 16px 14px" : "12px 28px 18px" }}>
                                <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.5 }}>{dB.value}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            );
          })() : (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--grey-text)", fontFamily: F, fontSize: 15 }}>
              Wähle eine Berufsgruppe aus.
            </div>
          )}
          </div>{/* end right col */}
          </div>{/* end sidebar grid */}
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
