"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

function useWindowWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(window.innerWidth);
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ── Questions ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "topic",
    question: "Was beschäftigt Dich am meisten?",
    subtitle: "Du kannst auch mehreres auswählen.",
    multi: true,
    options: [
      { value: "angst", label: "Angst & Sorgen", icon: "😰", tags: ["Angststörungen", "Panikattacken"] },
      { value: "stress", label: "Stress & Druck", icon: "😤", tags: ["Stress", "Burnout"] },
      { value: "depression", label: "Traurigkeit & Depression", icon: "😔", tags: ["Depression"] },
      { value: "beziehung", label: "Beziehungsprobleme", icon: "💔", tags: ["Beziehungsprobleme"] },
      { value: "burnout", label: "Erschöpfung & Burnout", icon: "🔥", tags: ["Burnout", "Stress"] },
      { value: "trauma", label: "Trauma & belastende Erlebnisse", icon: "🌧️", tags: ["Trauma"] },
      { value: "selbst", label: "Selbstwert & Identität", icon: "🪞", tags: ["Selbstwertprobleme"] },
      { value: "anderes", label: "Etwas anderes", icon: "💭", tags: [] },
    ],
  },
  {
    id: "duration",
    question: "Wie lange besteht das schon?",
    subtitle: "Das hilft uns, die Dringlichkeit besser einzuschätzen.",
    multi: false,
    options: [
      { value: "kurz", label: "Weniger als 4 Wochen", icon: "📅", tags: [] },
      { value: "mittel", label: "1 bis 6 Monate", icon: "🗓️", tags: [] },
      { value: "lang", label: "Länger als 6 Monate", icon: "⏳", tags: [] },
      { value: "immer", label: "Schon immer / sehr lang", icon: "🔁", tags: [] },
    ],
  },
  {
    id: "experience",
    question: "Hast Du schon Erfahrung mit Therapie?",
    subtitle: "Das beeinflusst unsere Empfehlung.",
    multi: false,
    options: [
      { value: "nein", label: "Nein, das erste Mal", icon: "🌱", tags: [] },
      { value: "frueher", label: "Ja, früher in Therapie", icon: "📖", tags: [] },
      { value: "aktuell", label: "Aktuell in Therapie", icon: "✅", tags: [] },
    ],
  },
  {
    id: "format",
    question: "Welche Form bevorzugst Du?",
    subtitle: "Du kannst Dich auch später noch entscheiden.",
    multi: false,
    options: [
      { value: "online", label: "Online", icon: "💻", tags: [] },
      { value: "vor-ort", label: "Vor Ort", icon: "📍", tags: [] },
      { value: "beides", label: "Beides ist ok", icon: "🔄", tags: [] },
    ],
  },
  {
    id: "urgency",
    question: "Wie dringend brauchst Du Unterstützung?",
    subtitle: "Damit wir passende Termine anzeigen können.",
    multi: false,
    options: [
      { value: "sofort", label: "So bald wie möglich", icon: "🚨", tags: [] },
      { value: "wochen", label: "In den nächsten Wochen", icon: "📆", tags: [] },
      { value: "erkunden", label: "Ich erkunde Optionen", icon: "🔍", tags: [] },
    ],
  },
];

const STEPS_HOW = [
  { n: "01", title: "Fragen beantworten", desc: "5 kurze Fragen zu Deiner Situation." },
  { n: "02", title: "Bedürfnisse analysieren", desc: "Wir werten Deine Antworten aus." },
  { n: "03", title: "Fachkräfte erhalten", desc: "Du erhältst passende Empfehlungen." },
  { n: "04", title: "Termin buchen", desc: "Buche direkt bei Deiner Wunsch-Fachkraft." },
];

const CATEGORIES = [
  { label: "Angst", color: "#EEF4FF", border: "#C0D4F7", text: "#2D5B8D" },
  { label: "Stress", color: "#FFF7E0", border: "#FFD970", text: "#8A6200" },
  { label: "Depression", color: "#F0F8FF", border: "#B0D0F0", text: "#1A5276" },
  { label: "Beziehungsprobleme", color: "#FEF5F0", border: "#F5BFA0", text: "#8B3A0F" },
  { label: "Burnout", color: "#FFF0F0", border: "#FFAAAA", text: "#8B0000" },
  { label: "Trauma", color: "#F5F0FF", border: "#C8B0F0", text: "#4A1F8B" },
  { label: "Selbstwert", color: "#F0FFF4", border: "#A0E0B0", text: "#1A6630" },
];

// ── Mock result therapists ───────────────────────────────────
const RESULT_THERAPISTS = [
  { id: 1, name: "Dr. Sarah Müller", role: "Klinische Psychologin", photo: "/fachkraefte/fachkraft-1.jpg", tags: ["Angststörungen", "Depression", "Trauma"], match: 98 },
  { id: 2, name: "Michael Weber", role: "Psychologischer Psychotherapeut", photo: "/fachkraefte/fachkraft-2.jpg", tags: ["Burnout", "Stress", "Angststörungen"], match: 94 },
  { id: 3, name: "Dr. Elena Fischer", role: "Psychotherapeutin", photo: "/fachkraefte/fachkraft-3.jpg", tags: ["Beziehungsprobleme", "Trauma", "Depression"], match: 89 },
];

type Answers = Record<string, string[]>;

// ── Main ────────────────────────────────────────────────────
export default function OrientierungstestPage() {
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;
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
    } else {
      setLoading(true);
      setTimeout(() => { setLoading(false); setPhase("results"); }, 1800);
    }
  }

  const progress = ((currentQ + (canProceed() ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <main style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />

      {/* ── LANDING ─────────────────────────────────────────── */}
      {phase === "landing" && (
        <>
          {/* Breadcrumbs */}
          <div style={{ ...wrap, padding: isMobile ? "14px 16px 6px" : "14px 40px 6px" }}>
            <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Startseite</a>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
              <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Orientierungstest</span>
            </nav>
          </div>

          {/* Hero */}
          <section style={{ background: "white", padding: isMobile ? "0 0 40px" : "0 0 64px" }}>
            <div style={{ ...wrap }}>
              <div style={{
                display: isMobile ? "flex" : "grid",
                flexDirection: isMobile ? "column" : undefined,
                gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
                gap: isMobile ? 20 : 64,
                alignItems: "stretch",
                paddingTop: 8,
              }}>
                {/* Left: image */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                  <img src="/orientierungstest-small-banner.jpg" alt="Orientierungstest"
                    style={{ width: "100%", maxHeight: isMobile ? 260 : 440, objectFit: "cover", objectPosition: "center", borderRadius: 20, display: "block" }} />
                </div>

                {/* Right: content */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: isMobile ? 0 : 32, paddingBottom: isMobile ? 0 : 32 }}>
                  <div style={{ display: "inline-block", border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "5px 16px", marginBottom: 18, alignSelf: "flex-start" }}>
                    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, letterSpacing: "0.07em", textTransform: "uppercase" }}>Kostenlos &amp; anonym</span>
                  </div>

                  <h1 style={{ fontFamily: F, fontWeight: 500, fontSize: isMobile ? 28 : 40, lineHeight: 1.2, color: "var(--black)", margin: "0 0 14px" }}>
                    Finde die passende<br />Unterstützung
                  </h1>
                  <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 28px" }}>
                    Beantworte 5 kurze Fragen zu deiner Situation und erhalte in weniger als 3 Minuten passende Fachkräfte-Empfehlungen — kostenlos und ohne Registrierung.
                  </p>

                  {/* Benefits */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {[
                      "Nur 5 Fragen, dauert unter 3 Minuten",
                      "Komplett anonym & ohne Anmeldung",
                      "Passende Fachkräfte direkt buchen",
                      "Basierend auf deinen individuellen Bedürfnissen",
                    ].map((text, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                        <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Scroll link */}
                  <button
                    onClick={() => stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
                    <span style={{ fontFamily: F, fontSize: 14, color: CTA, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Wie funktioniert der Test?</span>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke={CTA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Steps — Wie funktioniert das? */}
          <section ref={stepsRef} style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
            <div style={{ ...wrap }}>
              <div style={{ marginBottom: isMobile ? 36 : 52, textAlign: "center" }}>
                <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, lineHeight: 1.3, color: "var(--black)", margin: "0 0 8px" }}>
                  Wie funktioniert der Test?
                </h2>
                <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
                  In vier einfachen Schritten zu deiner persönlichen Empfehlung.
                </p>
              </div>

              {isMobile ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { n: 1, icon: "/icons/icon-test.svg", title: "Fragen beantworten", desc: "5 kurze Fragen zu deiner Situation, deinen Bedürfnissen und Präferenzen." },
                    { n: 2, icon: "/icons/icon-orientierung.svg", title: "Analyse läuft", desc: "Wir werten deine Antworten aus und suchen nach passenden Fachkräften." },
                    { n: 3, icon: "/icons/icon-unterstuetzung.svg", title: "Empfehlungen erhalten", desc: "Du erhältst eine persönliche Liste von Fachkräften, die zu dir passen." },
                    { n: 4, icon: "/icons/icon-vorgespraech.svg", title: "Termin buchen", desc: "Buche direkt online einen Termin bei deiner Wunsch-Fachkraft." },
                  ].map((s, i) => (
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
                  {[
                    { n: 1, icon: "/icons/icon-test.svg", title: "Fragen beantworten", desc: "5 kurze Fragen zu deiner Situation, deinen Bedürfnissen und Präferenzen." },
                    { n: 2, icon: "/icons/icon-orientierung.svg", title: "Analyse läuft", desc: "Wir werten deine Antworten aus und suchen nach passenden Fachkräften." },
                    { n: 3, icon: "/icons/icon-unterstuetzung.svg", title: "Empfehlungen erhalten", desc: "Du erhältst eine persönliche Liste von Fachkräften, die zu dir passen." },
                    { n: 4, icon: "/icons/icon-vorgespraech.svg", title: "Termin buchen", desc: "Buche direkt online einen Termin bei deiner Wunsch-Fachkraft." },
                  ].map((s, i) => (
                    <div key={i}
                      style={{ background: "white", borderRadius: 20, padding: "32px 20px 28px", border: "1px solid #EAF0FA", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#F4F9FF"; el.style.borderColor = CTA; el.style.boxShadow = "0 4px 20px rgba(45,91,141,0.10)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.borderColor = "#EAF0FA"; el.style.boxShadow = "none"; }}>
                      <span style={{ position: "absolute", top: -8, right: 10, fontFamily: F, fontWeight: 800, fontSize: 96, color: CTA, opacity: 0.12, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{s.n}</span>
                      <div style={{ position: "relative", marginBottom: 20 }}>
                        <img src={s.icon} width={56} height={56} alt="" style={{ objectFit: "contain", filter: iconFilter, display: "block" }} />
                      </div>
                      <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 10px", lineHeight: 1.35 }}>{s.title}</h3>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.65 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Pre-CTA + button */}
              <div style={{ marginTop: isMobile ? 40 : 56, textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", margin: "0 0 20px", lineHeight: 1.6 }}>
                  Bereit loszulegen?<br />
                  <span style={{ color: "var(--black)", fontWeight: 500 }}>Der Test dauert nur 3 Minuten – kostenlos und anonym.</span>
                </p>
                <button onClick={() => setPhase("test")}
                  style={{ height: 54, padding: "0 36px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(45,91,141,0.28)", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                  Test jetzt starten
                  <img src="/icons/arrow-right.svg" width={18} height={18} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </button>
              </div>
            </div>
          </section>

          {/* Vorgesprach cross-nav banner */}
          <section style={{ background: "white", padding: isMobile ? "0 0 48px" : "0 0 80px" }}>
            <div style={{ ...wrap }}>
              <div style={{ borderRadius: isMobile ? 20 : 24, overflow: "hidden", position: "relative", minHeight: isMobile ? 220 : 200, display: "flex", alignItems: "center", justifyContent: "flex-end", background: "var(--blue-ultra-light)", border: "1px solid #C8DFFF" }}>
                <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "32px 24px" : "40px 52px", maxWidth: isMobile ? "100%" : 600, width: "100%", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 20 }}>
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Lieber persönlich?</p>
                    <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 18 : 22, lineHeight: 1.3, color: "var(--black)", margin: "0 0 8px" }}>
                      Sprich direkt mit uns
                    </h2>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
                      In einem kostenlosen 30-minütigen Erstgespräch helfen wir dir persönlich weiter.
                    </p>
                  </div>
                  <a href="/vorgespraech" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.22)", transition: "background 0.2s", whiteSpace: "nowrap" }}
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
        <section style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "120px 20px 60px" : "130px 32px 80px" }}>

          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)" }}>Frage {currentQ + 1} von {QUESTIONS.length}</span>
              <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: CTA }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 6, background: "#E8EFF8", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: CTA, borderRadius: 9999, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {!loading ? (
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", boxShadow: "0 4px 32px rgba(45,91,141,0.06)", padding: isMobile ? "28px 20px" : "40px 48px" }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 24, color: "var(--black)", margin: "0 0 8px" }}>
                {QUESTIONS[currentQ].question}
              </h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px" }}>
                {QUESTIONS[currentQ].subtitle}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 10 }}>
                {QUESTIONS[currentQ].options.map(opt => {
                  const selected = answers[QUESTIONS[currentQ].id]?.includes(opt.value);
                  return (
                    <button key={opt.value}
                      onClick={() => toggleAnswer(QUESTIONS[currentQ].id, opt.value, QUESTIONS[currentQ].multi)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, border: selected ? `2px solid ${CTA}` : "1.5px solid #E8EFF8", background: selected ? "var(--blue-ultra-light)" : "white", cursor: "pointer", transition: "all 0.15s", textAlign: "left" }}>
                      <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{opt.icon}</span>
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: selected ? 600 : 400, color: selected ? CTA : "var(--black)" }}>{opt.label}</span>
                      {selected && (
                        <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
                <button onClick={() => { if (currentQ > 0) setCurrentQ(q => q - 1); else setPhase("landing"); }}
                  style={{ height: 46, padding: "0 24px", borderRadius: 9999, border: "1.5px solid #DDE8F5", background: "white", fontFamily: F, fontSize: 14, fontWeight: 600, color: "var(--grey-text)", cursor: "pointer" }}>
                  Zurück
                </button>
                <button onClick={nextQuestion} disabled={!canProceed()}
                  style={{ height: 46, padding: "0 28px", borderRadius: 9999, background: canProceed() ? CTA : "#B0C4DE", color: "white", border: "none", fontFamily: F, fontSize: 14, fontWeight: 700, cursor: canProceed() ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
                  {currentQ < QUESTIONS.length - 1 ? "Weiter" : "Ergebnis anzeigen"}
                </button>
              </div>
            </div>
          ) : (
            /* Loading state */
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: "60px 48px", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" stroke="#DDE8F5" strokeWidth="2.5"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke={CTA} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: "var(--black)", margin: "0 0 6px" }}>Deine Antworten werden ausgewertet …</p>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>Wir suchen die passenden Fachkräfte für Dich.</p>
            </div>
          )}

          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </section>
      )}

      {/* ── RESULTS ─────────────────────────────────────────── */}
      {phase === "results" && (
        <section style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "120px 20px 60px" : "130px 32px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EDFAEB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#33700E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 26 : 34, color: "var(--black)", margin: "0 0 12px" }}>Deine persönlichen Empfehlungen</h1>
            <p style={{ fontFamily: F, fontSize: 16, color: "var(--grey-text)", margin: 0 }}>Basierend auf Deinen Antworten haben wir diese Fachkräfte für Dich gefunden.</p>
          </div>

          {/* Result cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
            {RESULT_THERAPISTS.map((t, i) => (
              <div key={t.id} style={{ background: "white", borderRadius: 18, border: "1px solid #EEF2F7", boxShadow: i === 0 ? "0 0 0 2px var(--cta), 0 8px 32px rgba(45,91,141,0.10)" : "none", padding: isMobile ? 16 : "24px 28px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 14 : 24, alignItems: isMobile ? "flex-start" : "center", position: "relative" }}>
                {i === 0 && (
                  <div style={{ position: "absolute", top: -12, left: 20, background: CTA, color: "white", borderRadius: 9999, padding: "3px 12px", fontFamily: F, fontSize: 11, fontWeight: 700 }}>
                    ★ Beste Übereinstimmung
                  </div>
                )}
                <div style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 16 : 18, color: "var(--black)", margin: 0 }}>{t.name}</h3>
                    <span style={{ fontFamily: F, fontSize: 12, color: "#33700E", fontWeight: 600, background: "#EDFAEB", borderRadius: 9999, padding: "2px 10px" }}>{t.match}% Match</span>
                  </div>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "4px 0 10px" }}>{t.role}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ background: "#F5F8FF", border: "1px solid #DDE8F5", borderRadius: 9999, padding: "4px 12px", fontFamily: F, fontSize: 12, color: "var(--black)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: isMobile ? "row" : "column", gap: 8, alignItems: isMobile ? "center" : "flex-end" }}>
                  <a href={`/fachkraefte/${t.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: i === 0 ? CTA : "white", color: i === 0 ? "white" : CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "9px 20px", fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                    Profil ansehen →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
            <a href="/fachkraefte" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1.5px solid ${CTA}`, color: CTA, borderRadius: 9999, padding: "11px 28px", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Alle Fachkräfte ansehen
            </a>
            <button onClick={() => { setPhase("test"); setCurrentQ(0); setAnswers({}); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", background: "none", color: "var(--grey-text)", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer", padding: "11px 16px" }}>
              Test wiederholen
            </button>
          </div>

          {/* Cross-nav banner */}
          <div style={{ background: "white", border: "1px solid #DDE8F5", borderRadius: 16, padding: isMobile ? "18px 20px" : "18px 28px", marginTop: 40, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 14 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={CTA} strokeWidth="1.6"/></svg>
              </div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>Möchtest Du lieber persönlich beraten werden?</p>
                <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "2px 0 0" }}>In einem kostenlosen Erstgespräch beraten wir Dich persönlich.</p>
              </div>
            </div>
            <a href="/vorgespraech" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, color: CTA, fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none", border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "8px 18px", whiteSpace: "nowrap" }}>
              Kostenloses Vorgespräch →
            </a>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
