"use client";
import { useState, useEffect, useRef } from "react";
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

  if (alltag === "sehrstark" || symptome === "stark") return "psychiater";
  if (topics.includes("trauma") || ziel.includes("trauma")) return "psychiater";
  if (topics.includes("depression") && (duration === "lang" || duration === "immer")) return "psychiater";
  if (topics.includes("lebens") || topics.includes("beziehung") || ziel.includes("orientierung")) return "psychologe";
  return "psychotherapeut";
}

// ── Mock therapists ──────────────────────────────────────────
const RESULT_THERAPISTS = [
  { id: 1, name: "Dr. Sarah Müller", role: "Klinische Psychologin", photo: "/fachkraefte/fachkraft-1.jpg", tags: ["Angststörungen", "Depression", "Trauma"], match: 98 },
  { id: 2, name: "Michael Weber",    role: "Psychologischer Psychotherapeut", photo: "/fachkraefte/fachkraft-2.jpg", tags: ["Burnout", "Stress", "Angststörungen"], match: 94 },
  { id: 3, name: "Dr. Elena Fischer",role: "Psychotherapeutin", photo: "/fachkraefte/fachkraft-3.jpg", tags: ["Beziehungsprobleme", "Trauma", "Depression"], match: 89 },
];

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
    <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
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

                  {/* Options — scrollable, takes remaining space */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", flex: 1, paddingRight: 4, minHeight: 0 }}>
                    {q.options.map(opt => {
                      const sel = answers[q.id]?.includes(opt.value);
                      return (
                        <button key={opt.value} onClick={() => toggleAnswer(q.id, opt.value, q.multi)}
                          style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 12, border: sel ? `2px solid ${CTA}` : "1.5px solid #DDE8F5", background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer", transition: "all 0.15s", textAlign: "left", width: "100%", flexShrink: 0 }}>
                          {/* Checkbox */}
                          <div style={{ width: 20, height: 20, borderRadius: q.multi ? 5 : "50%", border: sel ? `2px solid ${CTA}` : "2px solid #C5D5EA", background: sel ? CTA : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                            {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span style={{ fontFamily: F, fontSize: 15, fontWeight: sel ? 600 : 400, color: sel ? CTA : "var(--black)" }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

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
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── RESULTS ─────────────────────────────────────────── */}
      {phase === "results" && (() => {
        const specKey = getRecommendation(answers);
        const spec = SPECIALIST_TYPES[specKey];
        return (
          <div style={{ ...wrap, paddingTop: isMobile ? 24 : 56, paddingBottom: 80 }}>

            {/* ── Recommendation card ── */}
            <div style={{ borderRadius: 24, overflow: "hidden", background: "linear-gradient(135deg, #E8F1FD 0%, #F3F8FF 60%, #EEF5FF 100%)", marginBottom: 32, display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 320px" }}>

              {/* Left — content */}
              <div style={{ padding: isMobile ? "28px 24px" : "40px 44px", display: "flex", flexDirection: "column", gap: 18 }}>
                <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Deine Empfehlung</p>

                <div>
                  <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 26 : 36, color: "var(--black)", margin: "0 0 10px", lineHeight: 1.1 }}>{spec.title}</h1>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{spec.desc}</p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {spec.tags.map(tag => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", borderRadius: 9999, padding: "6px 14px", fontFamily: F, fontSize: 13, color: CTA, fontWeight: 500, boxShadow: "0 1px 4px rgba(45,91,141,0.08)" }}>
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke={CTA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.5"/></svg>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Why box */}
                <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #C8DFFF", borderRadius: 14, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <svg style={{ flexShrink: 0, marginTop: 1 }} width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.6"/><path d="M12 8v4M12 16h.01" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.7 }}>{spec.why}</p>
                </div>

                <a href="/fachkraefte" style={{ fontFamily: F, fontSize: 13, color: CTA, textDecoration: "none", fontWeight: 600, alignSelf: "flex-start" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
                  Was ist der Unterschied zwischen den Fachkräften? →
                </a>
              </div>

              {/* Right — decorative image */}
              {!isMobile && (
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <img src="/fachkraefte/fachkraft-1.jpg" alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(232,241,253,0.5) 0%, transparent 40%)" }} />
                </div>
              )}
            </div>

            {/* Matching therapists */}
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, color: "var(--black)", margin: "0 0 16px" }}>Passende Fachkräfte in deiner Nähe</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {RESULT_THERAPISTS.map((t, i) => {
                const isTop = i === 0;
                return (
                  <a key={t.id} href={`/fachkraefte/${t.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{ background: isTop ? "linear-gradient(135deg, #EAF3FF 0%, #F4F9FF 100%)" : "white", borderRadius: 20, border: isTop ? `2px solid ${CTA}` : "1px solid #E8EEF8", boxShadow: isTop ? "0 8px 32px rgba(45,91,141,0.13)" : "0 2px 10px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "stretch", position: "relative", transition: "box-shadow 0.2s, transform 0.18s, border-color 0.2s", cursor: "pointer" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = isTop ? "0 14px 40px rgba(45,91,141,0.18)" : "0 8px 28px rgba(45,91,141,0.10)"; if (!isTop) el.style.borderColor = "#B8D0EE"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = isTop ? "0 8px 32px rgba(45,91,141,0.13)" : "0 2px 10px rgba(0,0,0,0.04)"; if (!isTop) el.style.borderColor = "#E8EEF8"; }}>

                      {isTop && (
                        <div style={{ position: "absolute", top: 14, left: 14, background: CTA, color: "white", borderRadius: 9999, padding: "3px 11px", fontFamily: F, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, zIndex: 1 }}>
                          <svg width="9" height="9" fill="white" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          Beste Übereinstimmung
                        </div>
                      )}

                      {/* Photo — portrait */}
                      <div style={{ width: isMobile ? "100%" : isTop ? 110 : 96, height: isMobile ? 160 : "auto", flexShrink: 0, overflow: "hidden", borderRadius: isMobile ? "20px 20px 0 0" : "20px 0 0 20px" }}>
                        <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, padding: isMobile ? "18px 18px 20px" : isTop ? "22px 28px 22px 24px" : "18px 24px 18px 20px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                        {/* Name + match */}
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                          <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 15 : isTop ? 18 : 16, color: "var(--black)", margin: 0 }}>{t.name}</h3>
                          <span style={{ fontFamily: F, fontSize: 12, color: "#1E6B34", fontWeight: 700, background: "#E2F7E9", borderRadius: 8, padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke="#1E6B34" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#1E6B34" strokeWidth="1.5"/></svg>
                            {t.match}% Match
                          </span>
                        </div>
                        <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{t.role}</p>

                        {/* Match bar */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1, height: 5, background: "#E0EAF5", borderRadius: 9999, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${t.match}%`, background: isTop ? CTA : "#6FA3D4", borderRadius: 9999 }} />
                          </div>
                          <span style={{ fontFamily: F, fontSize: 11, color: "var(--grey-text)", whiteSpace: "nowrap" }}>{t.match}% Übereinstimmung</span>
                        </div>

                        {/* Tags */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {t.tags.map(tag => (
                            <span key={tag} style={{ background: isTop ? "rgba(45,91,141,0.08)" : "#F3F6FC", border: `1px solid ${isTop ? "rgba(45,91,141,0.18)" : "#DDE8F5"}`, borderRadius: 8, padding: "3px 10px", fontFamily: F, fontSize: 12, color: isTop ? CTA : "#5A6A80", fontWeight: isTop ? 500 : 400 }}>{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      {!isMobile && (
                        <div style={{ display: "flex", alignItems: "center", padding: "0 28px 0 0", flexShrink: 0 }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: isTop ? CTA : "white", color: isTop ? "white" : CTA, border: `1.5px solid ${CTA}`, borderRadius: 12, padding: "11px 22px", fontFamily: F, fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", boxShadow: isTop ? "0 4px 14px rgba(45,91,141,0.22)" : "none" }}>
                            Profil ansehen
                            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                      )}
                      {isMobile && (
                        <div style={{ padding: "0 18px 18px" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: isTop ? CTA : "white", color: isTop ? "white" : CTA, border: `1.5px solid ${CTA}`, borderRadius: 10, padding: "10px 20px", fontFamily: F, fontWeight: 600, fontSize: 13 }}>
                            Profil ansehen <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </a>
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
