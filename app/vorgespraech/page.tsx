"use client";
import { useState, useEffect } from "react";
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

// ── Icons ────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="var(--cta)" opacity="0.12" />
      <path d="M7 12.5l3.5 3.5L17 9" stroke="var(--cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronLeft() {
  return <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function ChevronRight() {
  return <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// ── Calendar helpers ─────────────────────────────────────────
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  // 0=Mon offset
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

// ── Steps data ───────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Termin auswählen", desc: "Wähle einen passenden Termin in unserem Kalender." },
  { n: "02", title: "Kurzes Gespräch", desc: "Ein 20-minütiges Erstgespräch kostenlos und unverbindlich." },
  { n: "03", title: "Fachkraft finden", desc: "Wir empfehlen passende Therapeuten für Deine Situation." },
  { n: "04", title: "Therapie beginnen", desc: "Starte Deine Therapie — online oder vor Ort." },
];

const BENEFITS = [
  "Kostenlos & unverbindlich",
  "Vertraulich & sicher",
  "Persönliche Empfehlung",
  "Online oder vor Ort",
  "In 20 Minuten Klarheit",
];

// ── Main page ────────────────────────────────────────────────
export default function VorgespraechPage() {
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;

  // Booking state
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "confirm">("calendar");
  const [form, setForm] = useState({ name: "", email: "", topic: "" });
  const [submitted, setSubmitted] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  }
  function isWeekend(day: number) {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    return dow === 0 || dow === 6;
  }
  function isSelected(day: number) {
    return selectedDate?.getFullYear() === viewYear &&
           selectedDate?.getMonth() === viewMonth &&
           selectedDate?.getDate() === day;
  }

  return (
    <main style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: "white", borderBottom: "1px solid #EEF2F7", paddingTop: isMobile ? 100 : 110 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "32px 20px 40px" : "56px 32px 64px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 36 : 64, alignItems: "flex-start" }}>

          {/* LEFT: photo + trust badge */}
          <div style={{ flexShrink: 0, width: isMobile ? "100%" : 420, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: isMobile ? 220 : 300, background: "#D6EBFF" }}>
              <img
                src="/fachkraefte/fachkraft-1.jpg"
                alt="Therapeutin"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
              {/* overlay badge */}
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: "var(--black)", margin: 0 }}>Kostenloses Erstgespräch</p>
                  <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: "2px 0 0" }}>Kostenlos · Vertraulich · 20 Min.</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div style={{ background: "var(--blue-ultra-light)", borderRadius: 16, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {BENEFITS.map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckIcon />
                  <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: "var(--black)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, textTransform: "uppercase", letterSpacing: "0.08em" }}>Kostenloses Erstgespräch</span>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 28 : 38, color: "var(--black)", margin: "10px 0 16px", lineHeight: 1.25 }}>
              Kostenloses<br />Orientierungsgespräch
            </h1>
            <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.7 }}>
              Gemeinsam finden wir die passende Unterstützung für Deine Situation — ohne Verpflichtung, ohne Kosten. In einem kurzen Gespräch hörst Du von uns, welche Möglichkeiten es gibt.
            </p>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--grey-text)", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Wie funktioniert das?</p>
              {STEPS.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: i < STEPS.length - 1 ? 20 : 0 }}>
                  {/* line */}
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", left: 18, top: 36, bottom: 0, width: 2, background: "#E8EFF8" }} />
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: CTA, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{s.n}</div>
                  <div style={{ paddingTop: 6 }}>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 2px" }}>{s.title}</p>
                    <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ──────────────────────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "40px 20px" : "64px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 30, color: "var(--black)", margin: 0 }}>Termin für Dein Erstgespräch buchen</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: "10px 0 0" }}>Wähle einen passenden Termin — in weniger als 2 Minuten.</p>
        </div>

        {!submitted ? (
          <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", boxShadow: "0 4px 32px rgba(45,91,141,0.06)", maxWidth: 780, margin: "0 auto", overflow: "hidden" }}>

            {/* progress bar */}
            <div style={{ display: "flex", borderBottom: "1px solid #EEF2F7" }}>
              {(["calendar","form","confirm"] as const).map((s, i) => {
                const active = step === s;
                const done = (step === "form" && i === 0) || (step === "confirm" && i < 2);
                const labels = ["Datum & Uhrzeit","Deine Daten","Bestätigung"];
                return (
                  <div key={s} style={{ flex: 1, padding: "16px 12px", textAlign: "center", borderBottom: active ? `2px solid ${CTA}` : "2px solid transparent", background: active ? "var(--blue-ultra-light)" : "transparent" }}>
                    <span style={{ fontFamily: F, fontSize: 13, fontWeight: active ? 600 : 400, color: active ? CTA : done ? "#33700E" : "var(--grey-text)" }}>
                      {done ? "✓ " : `${i+1}. `}{labels[i]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: isMobile ? "24px 20px" : "36px 40px" }}>

              {/* STEP 1: Calendar */}
              {step === "calendar" && (
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 32 }}>
                  {/* Calendar */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                      <button onClick={prevMonth} style={{ background: "none", border: "1px solid #E8EFF8", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: CTA }}>
                        <ChevronLeft />
                      </button>
                      <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)" }}>
                        {MONTHS_DE[viewMonth]} {viewYear}
                      </span>
                      <button onClick={nextMonth} style={{ background: "none", border: "1px solid #E8EFF8", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: CTA }}>
                        <ChevronRight />
                      </button>
                    </div>
                    {/* Day headers */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                      {DAYS_DE.map(d => (
                        <div key={d} style={{ textAlign: "center", fontFamily: F, fontSize: 12, fontWeight: 600, color: "var(--grey-text)", padding: "4px 0" }}>{d}</div>
                      ))}
                    </div>
                    {/* Day cells */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const disabled = isPast(day) || isWeekend(day);
                        const sel = isSelected(day);
                        return (
                          <button key={day} disabled={disabled} onClick={() => { setSelectedDate(new Date(viewYear, viewMonth, day)); setSelectedTime(null); }}
                            style={{ height: 38, borderRadius: 9, border: sel ? `2px solid ${CTA}` : "1px solid transparent", background: sel ? CTA : disabled ? "transparent" : "var(--blue-ultra-light)", color: sel ? "white" : disabled ? "#C8D0DC" : "var(--black)", fontFamily: F, fontSize: 13, fontWeight: sel ? 700 : 400, cursor: disabled ? "default" : "pointer", transition: "all 0.15s" }}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div style={{ width: isMobile ? "100%" : 200, flexShrink: 0 }}>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 14px" }}>
                      {selectedDate ? `${selectedDate.getDate()}. ${MONTHS_DE[selectedDate.getMonth()]}` : "Zuerst Datum wählen"}
                    </p>
                    {selectedDate ? (
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "1fr", gap: 8 }}>
                        {TIME_SLOTS.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            style={{ padding: "10px 0", borderRadius: 10, border: selectedTime === t ? `2px solid ${CTA}` : "1px solid #E8EFF8", background: selectedTime === t ? CTA : "white", color: selectedTime === t ? "white" : "var(--black)", fontFamily: F, fontSize: 13, fontWeight: selectedTime === t ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ background: "var(--blue-ultra-light)", borderRadius: 12, padding: 20, textAlign: "center" }}>
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" style={{ opacity: 0.3 }}><rect x="3" y="4" width="18" height="18" rx="2" stroke="var(--cta)" strokeWidth="1.5"/><path d="M8 2v4M16 2v4M3 10h18" stroke="var(--cta)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "8px 0 0" }}>Bitte wähle zuerst ein Datum</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Form */}
              {step === "form" && (
                <div>
                  <div style={{ background: "var(--blue-ultra-light)", borderRadius: 12, padding: "14px 18px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="var(--cta)" strokeWidth="1.6"/><path d="M8 2v4M16 2v4M3 10h18" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round"/></svg>
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: CTA }}>
                      {selectedDate?.getDate()}. {MONTHS_DE[selectedDate?.getMonth() ?? 0]} {selectedDate?.getFullYear()} um {selectedTime} Uhr
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { key: "name", label: "Dein Name", placeholder: "Vorname Nachname", type: "text" },
                      { key: "email", label: "E-Mail-Adresse", placeholder: "name@email.com", type: "email" },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          style={{ width: "100%", height: 46, borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "0 14px", fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none", boxSizing: "border-box", background: "white" }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>Worum geht es? <span style={{ fontWeight: 400, color: "var(--grey-text)" }}>(optional)</span></label>
                      <textarea placeholder="Beschreibe kurz, was Dich beschäftigt …" value={form.topic}
                        onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
                        rows={3}
                        style={{ width: "100%", borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "12px 14px", fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none", boxSizing: "border-box", resize: "vertical", background: "white", lineHeight: 1.5 }} />
                    </div>
                    <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
                      Deine Daten werden ausschließlich zur Terminvereinbarung verwendet und streng vertraulich behandelt.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: Confirm */}
              {step === "confirm" && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="var(--cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "var(--black)", margin: "0 0 10px" }}>Termin bestätigen</h3>
                  <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: "0 0 28px" }}>
                    Bitte überprüfe Deinen Termin und bestätige die Buchung.
                  </p>
                  <div style={{ background: "#F8FAFC", borderRadius: 14, padding: "20px 24px", textAlign: "left", marginBottom: 28 }}>
                    {[
                      ["Termin", `${selectedDate?.getDate()}. ${MONTHS_DE[selectedDate?.getMonth() ?? 0]} ${selectedDate?.getFullYear()}, ${selectedTime} Uhr`],
                      ["Name", form.name],
                      ["E-Mail", form.email],
                      ...(form.topic ? [["Thema", form.topic]] : []),
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--grey-text)", minWidth: 60 }}>{k}</span>
                        <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", justifyContent: step === "calendar" ? "flex-end" : "space-between", marginTop: 28, gap: 12 }}>
                {step !== "calendar" && (
                  <button onClick={() => setStep(s => s === "form" ? "calendar" : "form")}
                    style={{ height: 46, padding: "0 24px", borderRadius: 9999, border: "1.5px solid #DDE8F5", background: "white", fontFamily: F, fontSize: 14, fontWeight: 600, color: "var(--grey-text)", cursor: "pointer" }}>
                    Zurück
                  </button>
                )}
                <button
                  disabled={step === "calendar" && (!selectedDate || !selectedTime)}
                  onClick={() => {
                    if (step === "calendar") setStep("form");
                    else if (step === "form") { if (form.name && form.email) setStep("confirm"); }
                    else if (step === "confirm") setSubmitted(true);
                  }}
                  style={{ height: 46, padding: "0 28px", borderRadius: 9999, background: (step === "calendar" && (!selectedDate || !selectedTime)) ? "#B0C4DE" : CTA, color: "white", border: "none", fontFamily: F, fontSize: 14, fontWeight: 700, cursor: (step === "calendar" && (!selectedDate || !selectedTime)) ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
                  {step === "confirm" ? "Termin jetzt buchen" : "Weiter"}
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Success state */
          <div style={{ background: "white", borderRadius: 20, border: "1px solid #C3EDD0", boxShadow: "0 4px 32px rgba(51,112,14,0.06)", maxWidth: 560, margin: "0 auto", padding: isMobile ? "40px 24px" : "56px 48px", textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#EDFAEB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#33700E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 12px" }}>Dein Termin ist gebucht!</h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: "0 0 8px", lineHeight: 1.7 }}>
              Wir haben eine Bestätigung an <strong style={{ color: "var(--black)" }}>{form.email}</strong> gesendet.
            </p>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.7 }}>
              Dein Erstgespräch findet am <strong style={{ color: "var(--black)" }}>{selectedDate?.getDate()}. {MONTHS_DE[selectedDate?.getMonth() ?? 0]} um {selectedTime} Uhr</strong> statt.
            </p>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "12px 28px", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Zurück zur Startseite
            </a>
          </div>
        )}

        {/* ── Cross-nav banner ────────────────────────────────── */}
        <div style={{ maxWidth: 780, margin: "32px auto 0", background: "white", border: "1px solid #DDE8F5", borderRadius: 16, padding: isMobile ? "18px 20px" : "18px 28px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 14 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="var(--cta)" strokeWidth="1.6"/><path d="M12 8v4l3 3" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <div>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>Lieber selbst Orientierung erhalten?</p>
              <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "2px 0 0" }}>Beantworte ein paar kurze Fragen und erhalte passende Empfehlungen.</p>
            </div>
          </div>
          <a href="/orientierungstest" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, color: CTA, fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none", border: "1.5px solid var(--cta)", borderRadius: 9999, padding: "8px 18px", whiteSpace: "nowrap", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = CTA; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = CTA; }}>
            Orientierungstest starten →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
