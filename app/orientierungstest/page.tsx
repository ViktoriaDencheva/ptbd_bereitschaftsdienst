"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

function useWindowWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w === 0 ? 375 : w;
}

// ── Questions ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "topic",
    question: "Was belastet dich derzeit am meisten?",
    subtitle: "Du kannst auch mehreres auswählen.",
    multi: true,
    photo: "/orientierungstest/frage1.jpg",
    options: [
      { value: "angst",      label: "Angst und Sorgen" },
      { value: "depression", label: "Niedergeschlagenheit oder Depression" },
      { value: "trauma",     label: "Traumatische Erlebnisse" },
      { value: "stress",     label: "Stress und Überforderung" },
      { value: "beziehung",  label: "Beziehungsprobleme" },
      { value: "lebens",     label: "Wichtige Lebensentscheidungen" },
      { value: "anderes",    label: "Sonstiges" },
    ],
  },
  {
    id: "duration",
    question: "Wie lange besteht diese Belastung bereits?",
    subtitle: "Das hilft uns, die Dringlichkeit besser einzuschätzen.",
    multi: false,
    photo: "/orientierungstest/frage2.jpg",
    options: [
      { value: "kurz",   label: "Weniger als 2 Wochen" },
      { value: "mittel", label: "2 Wochen bis 3 Monate" },
      { value: "lang",   label: "3 bis 6 Monate" },
      { value: "immer",  label: "Länger als 6 Monate" },
    ],
  },
  {
    id: "alltag",
    question: "Beeinträchtigt dies deinen Alltag?",
    subtitle: "Das hilft uns, das Ausmaß besser einzuschätzen.",
    multi: false,
    photo: "/orientierungstest/frage3.jpg",
    options: [
      { value: "kaum",       label: "Kaum, ich komme gut zurecht" },
      { value: "teilweise",  label: "Teilweise, manche Dinge fallen schwer" },
      { value: "stark",      label: "Stark, ich habe Schwierigkeiten im Alltag" },
      { value: "sehrstark",  label: "Sehr stark, ich kann kaum noch funktionieren" },
    ],
  },
  {
    id: "symptome",
    question: "Hast du körperliche Symptome?",
    subtitle: "Körper und Psyche hängen oft zusammen.",
    multi: false,
    photo: "/orientierungstest/frage4.jpg",
    options: [
      { value: "keine",    label: "Nein, keine körperlichen Symptome" },
      { value: "leicht",   label: "Leichte Symptome (z.B. Schlafprobleme, Kopfschmerzen)" },
      { value: "deutlich", label: "Deutliche Symptome (z.B. Appetitlosigkeit, Erschöpfung)" },
      { value: "stark",    label: "Starke körperliche Beschwerden" },
    ],
  },
  {
    id: "ziel",
    question: "Was ist dein Hauptziel für die Beratung?",
    subtitle: "Du kannst auch mehreres auswählen.",
    multi: true,
    photo: "/orientierungstest/frage5.jpg",
    options: [
      { value: "verstehen",   label: "Mich selbst besser verstehen" },
      { value: "bewaeltigen", label: "Bewältigungsstrategien lernen" },
      { value: "trauma",      label: "Traumata verarbeiten" },
      { value: "orientierung",label: "Orientierung und Lebensberatung" },
      { value: "behandlung",  label: "Behandlung einer Erkrankung" },
      { value: "anderes",     label: "Sonstiges" },
    ],
  },
];

// icon bg colors cycling through design tokens per card position
const CARD_COLORS = [
  { bg: "#ECF5FF", stroke: "#2D5B8D" },  // blue-ultra-light / cta
  { bg: "#FFF7E0", stroke: "#8A6200" },  // yellow-light
  { bg: "#FEF5F0", stroke: "#C05A28" },  // red-bg
  { bg: "#EDFAEB", stroke: "#33700E" },  // green-light / green
];

// icon bg colors cycling through design tokens per card position
const CARD_COLORS = [
  { bg: "#ECF5FF", stroke: "#2D5B8D" },
  { bg: "#FFF7E0", stroke: "#8A6200" },
  { bg: "#FEF5F0", stroke: "#C05A28" },
  { bg: "#EDFAEB", stroke: "#33700E" },
];

// ── Why-cards: actual reasons why THIS type is recommended ────
const WHY_CARDS: Record<string, { icon: React.ReactNode; title: string; desc: string }[]> = {
  psychotherapeut: [
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>, title: "Deine Belastung hält an", desc: "Du leidest seit Wochen oder Monaten — das braucht mehr als ein Gespräch, sondern gezielte Therapie." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.7"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>, title: "Muster erkennen & ändern", desc: "Psychotherapeut:innen helfen dir, belastende Denk- und Verhaltensmuster dauerhaft zu verändern." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>, title: "Bewährte Methoden", desc: "KVT, tiefenpsychologische und andere anerkannte Verfahren wirken nachweislich bei Angst, Depression & Trauma." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>, title: "Kassenerstattung möglich", desc: "Zugelassene Psychotherapeut:innen können Kassenleistungen abrechnen — für dich oft kostenlos." },
  ],
  psychologe: [
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7"/><path d="M12 8l4 4-4 4M8 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Du suchst Orientierung", desc: "Du stehst vor wichtigen Lebensentscheidungen und brauchst jemanden, der dir hilft, Klarheit zu gewinnen." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zM9 21h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Keine klinische Diagnose nötig", desc: "Psycholog:innen helfen auch ohne Erkrankung — bei Krisen, Beziehungsfragen und persönlichem Wachstum." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Offene, flexible Beratung", desc: "Du entscheidest Tempo und Themen — kein starres Therapieprogramm, sondern echtes Gespräch auf Augenhöhe." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Früh eingreifen lohnt sich", desc: "Psychologische Beratung jetzt verhindert, dass sich Belastungen zu ernsthaften Erkrankungen entwickeln." },
  ],
  psychiater: [
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Deine Situation ist ernst", desc: "Deine Antworten zeigen eine starke Belastung, die ärztliche Fachkompetenz und schnelle Hilfe erfordert." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17v-5m4 5v-3m4 3v-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Medikamente als Option", desc: "Psychiater:innen können Medikamente verschreiben, die schnell Linderung bringen — wenn nötig." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>, title: "Therapie & Medizin kombiniert", desc: "Als Ärzt:innen können sie Psychotherapie und medizinische Behandlung gleichzeitig anbieten." },
    { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Langfristige Stabilisierung", desc: "Psychiater:innen begleiten dich dauerhaft — von der Akutphase bis zur nachhaltigen Genesung." },
  ],
};

// ── Specialist types ─────────────────────────────────────────
const SPECIALIST_TYPES: Record<string, { title: string; role: string; icon: string; why: string; desc: string; tags: string[] }> = {
  psychotherapeut: {
    title: "Psychotherapeut:in",
    role: "Psychotherapie",
    icon: "/icons/role-psychotherapie.svg",
    why: "Psychotherapeut:innen sind spezialisiert auf die langfristige Behandlung von psychischen Erkrankungen wie Depressionen, Angststörungen und Traumata. Ihre Methoden helfen dir, Gedankenmuster zu verstehen und nachhaltig zu verändern.",
    desc: "Zugelassene Fachkraft für psychotherapeutische Behandlung — am häufigsten empfohlen bei anhaltenden Belastungen.",
    tags: ["Angststörungen", "Depression", "Trauma", "Burnout"],
  },
  psychologe: {
    title: "Psycholog:in",
    role: "Psychologie",
    icon: "/icons/role-brain.svg",
    why: "Psycholog:innen bieten psychologische Diagnostik, Beratung und Unterstützung. Sie sind ideal für persönliche Krisen, Lebensentscheidungen und präventive Begleitung — ohne zwingend eine klinische Diagnose zu stellen.",
    desc: "Expert:in für Diagnostik und psychologische Beratung — passend bei Orientierungsbedarf und Lebenskrisen.",
    tags: ["Lebenskrisen", "Stress", "Beziehungsprobleme", "Orientierung"],
  },
  psychiater: {
    title: "Psychiater:in",
    role: "Psychiatrie",
    icon: "/icons/role-herz.svg",
    why: "Psychiater:innen sind Ärzt:innen mit Spezialisierung auf psychische Erkrankungen. Sie können sowohl Psychotherapie durchführen als auch Medikamente verschreiben — besonders wichtig bei schweren oder dringenden Fällen.",
    desc: "Ärztliche Fachkraft für schwere psychische Erkrankungen — auch zuständig für medikamentöse Behandlung.",
    tags: ["Schwere Depression", "Akute Krisen", "Medikamentöse Behandlung"],
  },
};

type SpecialistKey = keyof typeof SPECIALIST_TYPES;

function getRecommendation(answers: Record<string, string[]>): SpecialistKey {
  const topics = answers.topic ?? [];
  const alltag = answers.alltag?.[0] ?? "";
  const symptome = answers.symptome?.[0] ?? "";
  const ziel = answers.ziel ?? [];
  const duration = answers.duration?.[0] ?? "";

  // Psychiater: severe impairment, strong physical symptoms, or acute/heavy psychiatric need
  if (alltag === "sehrstark") return "psychiater";
  if (symptome === "stark" || symptome === "deutlich") return "psychiater";
  if (topics.includes("depression") && (duration === "lang" || duration === "immer")) return "psychiater";
  if (ziel.includes("behandlung")) return "psychiater";

  // Psychologe: life orientation, relationships, low impairment, or diagnostic/coaching goals
  if (topics.includes("lebens") || topics.includes("beziehung")) return "psychologe";
  if (ziel.includes("orientierung") || ziel.includes("verstehen")) return "psychologe";
  if (alltag === "kaum" && duration === "kurz") return "psychologe";

  // Psychotherapeut: trauma, anxiety, burnout, stress with medium-long duration
  if (topics.includes("trauma") || topics.includes("angst") || topics.includes("stress")) return "psychotherapeut";
  if (ziel.includes("bewaeltigen") || ziel.includes("trauma")) return "psychotherapeut";
  if (duration === "mittel" || duration === "lang") return "psychotherapeut";

  return "psychotherapeut";
}

// ── Mock therapists per specialist type ──────────────────────
const RESULT_THERAPISTS: Record<string, { id: number; name: string; role: string; photo: string; tags: string[]; match: number }[]> = {
  psychotherapeut: [
    { id: 1, name: "Dr. Sarah Müller",  role: "Psychotherapeutin (VT)", photo: "/fachkraefte/fachkraft-1.jpg", tags: ["Depression", "Angst", "Trauma"], match: 98 },
    { id: 2, name: "Michael Weber",     role: "Psychologischer Psychotherapeut", photo: "/fachkraefte/fachkraft-2.jpg", tags: ["Burnout", "Stress", "Angststörungen"], match: 94 },
    { id: 3, name: "Dr. Elena Fischer", role: "Psychotherapeutin (TP)", photo: "/fachkraefte/fachkraft-3.jpg", tags: ["Trauma", "Trauer", "Depression"], match: 89 },
  ],
  psychologe: [
    { id: 4, name: "Dr. Anna Bauer",   role: "Psycholog:in", photo: "/fachkraefte/fachkraft-1.jpg", tags: ["Lebenskrisen", "Stress", "Orientierung"], match: 96 },
    { id: 5, name: "Lena Schreiber",   role: "Psycholog:in & Beraterin", photo: "/fachkraefte/fachkraft-3.jpg", tags: ["Beziehungsprobleme", "Selbstwert"], match: 91 },
    { id: 6, name: "Thomas Hoffmann",  role: "Klinischer Psychologe", photo: "/fachkraefte/fachkraft-2.jpg", tags: ["Coaching", "Persönlichkeit"], match: 85 },
  ],
  psychiater: [
    { id: 7, name: "Dr. med. Klaus Richter", role: "Facharzt für Psychiatrie", photo: "/fachkraefte/fachkraft-2.jpg", tags: ["Schwere Depression", "Medikamente"], match: 97 },
    { id: 8, name: "Dr. med. Maria Lang",    role: "Psychiaterin & Psychotherapeutin", photo: "/fachkraefte/fachkraft-3.jpg", tags: ["Akute Krisen", "Bipolare Störung"], match: 92 },
    { id: 9, name: "Dr. med. Jan Berger",    role: "Facharzt für Psychiatrie", photo: "/fachkraefte/fachkraft-1.jpg", tags: ["Angststörungen", "Trauma", "Medikamente"], match: 87 },
  ],
};

const CATEGORIES = [
  { label: "Angst",              color: "#EEF4FF", border: "#C0D4F7", text: "#2D5B8D" },
  { label: "Stress",             color: "#FFF7E0", border: "#FFD970", text: "#8A6200" },
  { label: "Depression",         color: "#F0F8FF", border: "#B0D0F0", text: "#1A5276" },
  { label: "Beziehungsprobleme", color: "#FEF5F0", border: "#F5BFA0", text: "#8B3A0F" },
  { label: "Burnout",            color: "#FFF0F0", border: "#FFAAAA", text: "#8B0000" },
  { label: "Trauma",             color: "#F5F0FF", border: "#C8B0F0", text: "#4A1F8B" },
  { label: "Selbstwert",         color: "#F0FFF4", border: "#A0E0B0", text: "#1A6630" },
];

const STEPS_HOW = [
  { n: 1, icon: "/icons/icon-test.svg",          title: "Fragen beantworten",  desc: "5 kurze Fragen zu deiner Situation, deinen Bedürfnissen und Präferenzen." },
  { n: 2, icon: "/icons/icon-orientierung.svg",  title: "Analyse läuft",       desc: "Wir werten deine Antworten aus und suchen nach passenden Fachkräften." },
  { n: 3, icon: "/icons/icon-unterstuetzung.svg",title: "Empfehlung erhalten", desc: "Du erhältst eine persönliche Empfehlung mit Erklärung, welcher Typ am besten passt." },
  { n: 4, icon: "/icons/icon-vorgespraech.svg",  title: "Termin buchen",       desc: "Buche direkt online einen Termin bei deiner Wunsch-Fachkraft." },
];

type Answers = Record<string, string[]>;

// ── Main ─────────────────────────────────────────────────────
export default function OrientierungstestPage() {
  const winW = useWindowWidth();
  const isMobile = winW < 1071;
  const stepsRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<"landing" | "test" | "results">("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [sonstigesText, setSonstigesText] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;
  const iconFilter = "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)";

  function toggleAnswer(qId: string, value: string, multi: boolean) {
    setAnswers(prev => {
      const current = prev[qId] ?? [];
      if (multi) {
        return { ...prev, [qId]: current.includes(value) ? current.filter(v => v !== value) : [...current, value] };
      } else {
        return { ...prev, [qId]: [value] };
      }
    });
  }

  function canProceed() {
    const q = QUESTIONS[currentQ];
    return (answers[q.id]?.length ?? 0) > 0;
  }

  function nextQuestion() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLoading(true);
      setTimeout(() => { setLoading(false); setPhase("results"); window.scrollTo({ top: 0, behavior: "smooth" }); }, 1800);
    }
  }

  const progress = ((currentQ + (canProceed() ? 1 : 0)) / QUESTIONS.length) * 100;
  const q = QUESTIONS[currentQ];

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── LANDING ─────────────────────────────────────────── */}
      {phase === "landing" && (
        <>
          {/* Hero */}
          <section style={{ background: "white", padding: isMobile ? "0 0 40px" : "0 0 64px" }}>
          {/* Breadcrumbs */}
          <div style={{ ...wrap, padding: isMobile ? "14px 16px 20px" : "14px 40px 20px" }}>
            <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Startseite</a>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
              <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Orientierungstest</span>
            </nav>
          </div>
            <div style={{ ...wrap }}>
              <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 1fr", gap: isMobile ? 20 : 64, alignItems: "stretch" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                  <img src="/Orientierungstest-banner.jpg" alt="Orientierungstest"
                    style={{ width: "100%", maxHeight: isMobile ? 260 : 440, objectFit: "cover", objectPosition: "center", borderRadius: 20, display: "block" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: isMobile ? 0 : 32, paddingBottom: isMobile ? 0 : 32 }}>
                  <div
                    style={{ display: "inline-block", border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "5px 16px", marginBottom: 18, alignSelf: "flex-start", cursor: "default", transition: "background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--blue-ultra-light)"; el.style.boxShadow = "0 4px 20px rgba(45,91,141,0.18)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}>
                    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, letterSpacing: "0.07em", textTransform: "uppercase" }}>Kostenlos &amp; anonym</span>
                  </div>
                  <h1 style={{ fontFamily: F, fontWeight: 500, fontSize: isMobile ? 28 : 40, lineHeight: 1.2, color: "var(--black)", margin: "0 0 14px" }}>
                    Finde die passende<br />Unterstützung
                  </h1>
                  <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 28px" }}>
                    Beantworte 5 kurze Fragen zu deiner Situation und erhalte in weniger als 3 Minuten eine persönliche Empfehlung — kostenlos und ohne Registrierung.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {["Nur 5 Fragen, dauert unter 3 Minuten", "Komplett anonym & ohne Anmeldung", "Empfehlung mit Erklärung, welcher Spezialist passt", "Passende Fachkräfte direkt buchen"].map((text, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                        <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
                    <span style={{ fontFamily: F, fontSize: 14, color: CTA, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Wie funktioniert der Test?</span>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke={CTA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Steps */}
          <section ref={stepsRef} style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
            <div style={{ ...wrap }}>
              <div style={{ marginBottom: isMobile ? 36 : 52, textAlign: "center" }}>
                <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: "0 0 8px" }}>Wie funktioniert der Test?</h2>
                <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>In vier einfachen Schritten zu deiner persönlichen Empfehlung.</p>
              </div>
              {isMobile ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {STEPS_HOW.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#F8FAFE", borderRadius: 16, padding: "20px 18px" }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "white", border: `1.5px solid ${CTA}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <img src={s.icon} width={26} height={26} alt="" style={{ objectFit: "contain", filter: iconFilter }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, margin: "0 0 2px", letterSpacing: "0.06em" }}>{s.n}.</p>
                        <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 4px" }}>{s.title}</h3>
                        <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                  {STEPS_HOW.map((s, i) => (
                    <div key={i}
                      style={{ background: "white", borderRadius: 20, padding: "48px 20px 32px", border: "1px solid #EAF0FA", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#F4F9FF"; el.style.borderColor = CTA; el.style.boxShadow = "0 4px 20px rgba(45,91,141,0.10)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.borderColor = "#EAF0FA"; el.style.boxShadow = "none"; }}>
                      <span style={{ position: "absolute", top: 10, right: 14, fontFamily: F, fontWeight: 800, fontSize: 80, color: CTA, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{s.n}</span>
                      <div style={{ marginBottom: 20 }}>
                        <img src={s.icon} width={56} height={56} alt="" style={{ objectFit: "contain", filter: iconFilter, display: "block" }} />
                      </div>
                      <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 10px", lineHeight: 1.35 }}>{s.title}</h3>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: isMobile ? 40 : 56, textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", margin: "0 0 20px", lineHeight: 1.6 }}>
                  Bereit loszulegen?<br />
                  <span style={{ color: "var(--black)", fontWeight: 500 }}>Der Test dauert nur 3 Minuten – kostenlos und anonym.</span>
                </p>
                <button onClick={() => { setPhase("test"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ height: 54, padding: "0 36px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(45,91,141,0.28)", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                  Test jetzt starten
                  <img src="/icons/arrow-right.svg" width={18} height={18} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </button>
              </div>
            </div>
          </section>

          {/* Cross-nav — Vorgesprach */}
          <section style={{ background: "white", padding: isMobile ? "0 0 48px" : "0 0 80px" }}>
            <div style={{ ...wrap }}>
              <div style={{ borderRadius: isMobile ? 20 : 24, overflow: "hidden", position: "relative", minHeight: isMobile ? 200 : 220, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {/* Background image */}
                <img src="/vorgespraech-small-banner.jpg" alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "25% center" }} />
                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(236,245,255,0.97) 0%, rgba(236,245,255,0.93) 40%, rgba(236,245,255,0.4) 70%, transparent 100%)" }} />
                {/* Text content — right side */}
                <div style={{ position: "relative", zIndex: 1, maxWidth: isMobile ? "100%" : 480, padding: isMobile ? "32px 24px" : "40px 52px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Lieber persönlich?</p>
                  <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>Sprich direkt mit uns</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>In einem kostenlosen 30-minütigen Erstgespräch helfen wir dir persönlich weiter.</p>
                  <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.22)", transition: "background 0.2s", whiteSpace: "nowrap", marginTop: 4 }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                    Kostenloses Erstgespräch
                    <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── TEST ────────────────────────────────────────────── */}
      {phase === "test" && (
        <div style={{ ...wrap, paddingTop: isMobile ? 24 : 40, paddingBottom: 80 }}>
          {/* Header */}
          <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, color: "var(--black)", margin: "0 0 20px", textAlign: "center" }}>
            Lass uns gemeinsam herausfinden, was du brauchst
          </h1>

          {/* Progress */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)" }}>Frage {currentQ + 1} von {QUESTIONS.length}</span>
              <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: CTA }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 5, background: "#E0EAF5", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: CTA, borderRadius: 9999, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {!loading ? (
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", boxShadow: "0 4px 32px rgba(45,91,141,0.06)", overflow: "hidden" }}>
              <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1.4fr 1fr", height: isMobile ? undefined : 520 }}>
                {/* Left: question + options */}
                <div style={{ padding: isMobile ? "28px 20px 24px" : "40px 40px 36px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  {/* Zurück + Frage label */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    {currentQ > 0 ? (
                      <button onClick={() => { setCurrentQ(q => q - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        style={{ background: "none", border: "none", fontFamily: F, fontSize: 14, color: "var(--grey-text)", cursor: "pointer", padding: "4px 0", display: "flex", alignItems: "center", gap: 4 }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
                        Zurück
                      </button>
                    ) : <div />}
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke={CTA} strokeWidth="1.8"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="17" r=".5" fill={CTA} stroke={CTA} strokeWidth="1"/></svg>
                      <span style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: CTA }}>Frage {currentQ + 1}</span>
                    </div>
                  </div>

                  <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 24, color: "var(--black)", margin: "0 0 8px", lineHeight: 1.3 }}>
                    {q.question}
                  </h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px" }}>
                    {q.subtitle}
                  </p>

                  {/* Options — scrollable */}
                  <div className="options-scroll" style={{ display: "flex", flexDirection: "column", gap: 10, overflowY: "scroll", flex: 1, paddingRight: 6, minHeight: 0 }}>
                    {q.options.map(opt => {
                      const sel = answers[q.id]?.includes(opt.value);
                      return (
                        <button key={opt.value} onClick={() => toggleAnswer(q.id, opt.value, q.multi)}
                          style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 12, border: sel ? `2px solid ${CTA}` : "1.5px solid #DDE8F5", background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer", transition: "all 0.15s", textAlign: "left", width: "100%", flexShrink: 0 }}>
                          <div style={{ width: 20, height: 20, borderRadius: q.multi ? 5 : "50%", border: sel ? `2px solid ${CTA}` : "2px solid #C5D5EA", background: sel ? CTA : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                            {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span style={{ fontFamily: F, fontSize: 15, fontWeight: sel ? 600 : 400, color: sel ? CTA : "var(--black)" }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sonstiges field — outside scroll, always visible */}
                  {answers[q.id]?.includes("anderes") && (
                    <div style={{ marginTop: 12, borderRadius: 12, border: `1.5px solid ${CTA}`, background: "white", overflow: "hidden" }}>
                      <div style={{ padding: "8px 14px 6px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #C8DFFF" }}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA }}>Bitte beschreibe kurz</span>
                      </div>
                      <textarea
                        value={sonstigesText[q.id] ?? ""}
                        onChange={e => setSonstigesText(prev => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Was beschäftigt dich? …"
                        rows={2}
                        style={{ width: "100%", padding: "10px 14px", border: "none", fontFamily: F, fontSize: 14, color: "var(--black)", resize: "none", outline: "none", boxSizing: "border-box" as const, lineHeight: 1.5, background: "transparent" }}
                      />
                    </div>
                  )}

                  {/* Button */}
                  <button onClick={nextQuestion} disabled={!canProceed()}
                    style={{ marginTop: 28, width: "100%", height: 52, borderRadius: 12, background: canProceed() ? CTA : "#B0C4DE", color: "white", border: "none", fontFamily: F, fontSize: 15, fontWeight: 700, cursor: canProceed() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                    onMouseEnter={e => { if (canProceed()) (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"; }}
                    onMouseLeave={e => { if (canProceed()) (e.currentTarget as HTMLElement).style.background = CTA; }}>
                    {currentQ < QUESTIONS.length - 1 ? "Weiter zur nächsten Frage" : "Ergebnis anzeigen"}
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.634 6.234a.9.9 0 0 1 1.273 0l4.8 4.8a.9.9 0 0 1 0 1.273l-4.8 4.8a.9.9 0 1 1-1.272-1.272L16.068 12.4H6.8a.9.9 0 1 1 0-1.8h9.268l-3.434-3.435a.9.9 0 0 1 0-1.272Z" fill="white"/></svg>
                  </button>
                </div>

                {/* Right: photo — fills full card height */}
                {!isMobile && (
                  <div style={{ overflow: "hidden" }}>
                    <img src={q.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: "60px 48px", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" stroke="#DDE8F5" strokeWidth="2.5"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke={CTA} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: "var(--black)", margin: "0 0 6px" }}>Deine Antworten werden ausgewertet …</p>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>Wir suchen die passenden Fachkräfte für dich.</p>
            </div>
          )}
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .options-scroll { scrollbar-width: thin; scrollbar-color: #B0C8E8 #EEF3FB; }
            .options-scroll::-webkit-scrollbar { width: 4px; }
            .options-scroll::-webkit-scrollbar-track { background: #EEF3FB; border-radius: 9999px; }
            .options-scroll::-webkit-scrollbar-thumb { background: #B0C8E8; border-radius: 9999px; }
            .options-scroll::-webkit-scrollbar-thumb:hover { background: var(--cta); }
          `}</style>
        </div>
      )}

      {/* ── RESULTS ─────────────────────────────────────────── */}
      {phase === "results" && (() => {
        const specKey = getRecommendation(answers);
        const spec = SPECIALIST_TYPES[specKey];
        return (
          <div style={{ ...wrap, paddingTop: isMobile ? 24 : 56, paddingBottom: 80 }}>

            {/* ── Recommendation card ── */}
            <div style={{ borderRadius: isMobile ? 20 : 24, overflow: "hidden", background: "#EEF5FF", marginBottom: 40, display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: isMobile ? undefined : 320, position: "relative" }}>
              {/* Left: content */}
              <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : "55%", padding: isMobile ? "36px 24px 28px" : "48px 48px 48px 52px", display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
                <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Deine Empfehlung</p>

                <div>
                  <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 30 : 42, color: "var(--black)", margin: "0 0 12px", lineHeight: 1.1 }}>{spec.title}</h1>
                  <p style={{ fontFamily: F, fontSize: isMobile ? 14 : 16, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>
                    Basierend auf Deinen Antworten empfehlen wir {specKey === "psychologe" ? "eine:n" : "eine:n"} {spec.title.toLowerCase()}, {specKey === "psychiater" ? "die auf schwere psychische Erkrankungen spezialisiert ist — auch für medikamentöse Behandlung und akute Krisen." : specKey === "psychologe" ? "die dir bei Lebensfragen, Orientierung und persönlicher Entwicklung hilft." : "die auf langfristige Behandlung von Depressionen, Angststörungen und Traumata spezialisiert ist."}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {spec.tags.map(tag => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(45,91,141,0.15)", borderRadius: 9999, padding: "6px 14px", fontFamily: F, fontSize: 13, color: CTA, fontWeight: 500 }}>
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke={CTA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.5"/></svg>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Why box */}
                <div style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(45,91,141,0.12)", borderRadius: 14, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <svg style={{ flexShrink: 0, marginTop: 2 }} width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.6"/><path d="M12 8v4M12 16h.01" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.7 }}>{spec.why}</p>
                </div>

                <a href="/fachkraefte" style={{ fontFamily: F, fontSize: 13, color: CTA, textDecoration: "none", fontWeight: 600, alignSelf: "flex-start" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
                  Was ist der Unterschied zwischen den Fachkräften? →
                </a>
              </div>
              {/* Right: image */}
              {!isMobile && (
                <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 320 }}>
                  <img src="/empfehlungs-page-banner.jpg" alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #EEF5FF 0%, transparent 25%)" }} />
                </div>
              )}
            </div>

            {/* Why cards */}
            <div style={{ marginBottom: 56 }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, color: "var(--black)", margin: "0 0 28px" }}>
                Warum empfehlen wir eine:n {spec.title}?
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 12 : 20 }}>
                {WHY_CARDS[specKey].map((card, i) => {
                  const col = CARD_COLORS[i % CARD_COLORS.length];
                  return (
                    <div key={i} style={{ background: "white", border: "1px solid #EAF0FA", borderRadius: 18, padding: isMobile ? "18px 14px" : "24px 20px", display: "flex", flexDirection: "column", gap: isMobile ? 14 : 18 }}>
                      <div style={{ width: isMobile ? 48 : 52, height: isMobile ? 48 : 52, borderRadius: 14, background: col.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: col.stroke }}>
                        {card.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 13 : 15, color: "var(--black)", margin: "0 0 8px", lineHeight: 1.3 }}>{card.title}</p>
                        <p style={{ fontFamily: F, fontSize: isMobile ? 12 : 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{card.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Matching therapists */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Basierend auf deinen Antworten</p>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, color: "var(--black)", margin: 0 }}>Für dich empfohlene Fachkräfte</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {RESULT_THERAPISTS[specKey].map((t, i) => {
                const isTop = i === 0;
                return (
                  <div key={t.id} style={{ background: "white", borderRadius: 18, border: isTop ? `2px solid ${CTA}` : "1px solid #EEF2F7", boxShadow: isTop ? "0 4px 24px rgba(45,91,141,0.10)" : "0 1px 6px rgba(0,0,0,0.04)", padding: isMobile ? 16 : "20px 24px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 14 : 20, alignItems: isMobile ? "flex-start" : "center", position: "relative" }}>
                    {isTop && (
                      <div style={{ position: "absolute", top: -11, left: 18, background: CTA, color: "white", borderRadius: 9999, padding: "3px 11px", fontFamily: F, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                        <svg width="9" height="9" fill="white" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        Beste Übereinstimmung
                      </div>
                    )}
                    {/* Photo */}
                    <div style={{ width: isMobile ? 64 : 72, height: isMobile ? 64 : 80, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                      <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 3 }}>
                        <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 15 : 17, color: "var(--black)", margin: 0 }}>{t.name}</h3>
                        <span style={{ fontFamily: F, fontSize: 12, color: "#1E6B34", fontWeight: 700, background: "#E2F7E9", borderRadius: 8, padding: "2px 9px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke="#1E6B34" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#1E6B34" strokeWidth="1.5"/></svg>
                          {t.match}% Match
                        </span>
                      </div>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "0 0 10px" }}>{t.role}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {t.tags.map(tag => (
                          <span key={tag} style={{ background: isTop ? "var(--blue-ultra-light)" : "#F5F8FF", border: `1px solid ${isTop ? "#C0D8F5" : "#DDE8F5"}`, borderRadius: 9999, padding: "3px 11px", fontFamily: F, fontSize: 12, color: isTop ? CTA : "var(--black)", fontWeight: isTop ? 500 : 400 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* CTA */}
                    <div style={{ flexShrink: 0 }}>
                      <a href={`/fachkraefte/${t.id}`}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: isTop ? CTA : "white", color: isTop ? "white" : CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "10px 22px", fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap", boxShadow: isTop ? "0 4px 14px rgba(45,91,141,0.22)" : "none", transition: "all 0.2s" }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = isTop ? "var(--cta-hover)" : "var(--blue-ultra-light)"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = isTop ? CTA : "white"; }}>
                        Profil ansehen
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", alignItems: "center", marginBottom: 40 }}>
              <a href="/fachkraefte"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "12px 28px", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.25)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Alle Fachkräfte ansehen
              </a>
              <button onClick={() => { setPhase("test"); setCurrentQ(0); setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1.5px solid ${CTA}`, background: "white", color: CTA, borderRadius: 9999, padding: "12px 24px", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer" }}>
                Test wiederholen
              </button>
            </div>

            {/* Vorgesprach banner */}
            <div style={{ borderRadius: isMobile ? 20 : 24, overflow: "hidden", position: "relative", minHeight: isMobile ? 200 : 220, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <img src="/vorgespraech-small-banner.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(236,245,255,0.97) 0%, rgba(236,245,255,0.93) 40%, rgba(236,245,255,0.4) 70%, transparent 100%)" }} />
              <div style={{ position: "relative", zIndex: 1, maxWidth: isMobile ? "100%" : 480, padding: isMobile ? "32px 24px" : "40px 52px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Lieber persönlich?</p>
                <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>Sprich direkt mit uns</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>In einem kostenlosen 30-minütigen Erstgespräch helfen wir dir persönlich weiter.</p>
                <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.22)", transition: "background 0.2s", whiteSpace: "nowrap", marginTop: 4 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                  Kostenloses Erstgespräch
                  <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      <Footer />
    </main>
  );
}
