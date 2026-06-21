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

// ── Calendar helpers ──────────────────────────────────────────
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

// ── ProgressBar ───────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const steps = ["Format & Termin", "Deine Daten", "Bestätigung"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {steps.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#33700E" : active ? CTA : "#E8EFF8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {done
                  ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: active ? "white" : "var(--grey-text)" }}>{n}</span>}
              </div>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: active ? 600 : 400, color: active ? CTA : done ? "#33700E" : "var(--grey-text)", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? "#33700E" : "#E8EFF8", margin: "0 8px 16px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Left panel (booking) ──────────────────────────────────────
function LeftPanel({ format, selectedDate, selectedTime }: { format: string; selectedDate: Date | null; selectedTime: string | null }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
          <img src="/fachkraefte/specialist-howtostart.jpg" alt="Beraterin" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,40,80,0.55) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "white", margin: "0 0 2px" }}>Kostenloses Erstgespräch</p>
            <p style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.85)", margin: 0 }}>Psychotherapeutischer Bereitschaftsdienst</p>
          </div>
        </div>
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 9 }}>
          {[
            { icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.6"/><path d="M12 7v5l3 3" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, text: "20 Minuten" },
            { icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Kostenlos & vertraulich" },
            { icon: format === "vor-ort"
              ? <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={CTA} strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke={CTA} strokeWidth="1.6"/></svg>
              : <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>,
              text: format === "vor-ort" ? "Vor Ort in Wien" : "Online per Video" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {r.icon}
              <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)" }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div style={{ background: "var(--blue-ultra-light)", border: `1px solid ${CTA}20`, borderRadius: 16, padding: "14px 18px" }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: CTA, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 6px" }}>Gewählter Termin</p>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 2px" }}>
            {selectedDate.getDate()}. {MONTHS_SHORT[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </p>
          <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{selectedTime} Uhr · 20 Min.</p>
        </div>
      )}
    </div>
  );
}

// ── Step icons ────────────────────────────────────────────────
const StepIcons = [
  // Calendar
  <svg key="cal" width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3" stroke={CTA} strokeWidth="1.5"/><path d="M8 2v4M16 2v4M3 10h18" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="15" r="1" fill={CTA}/><circle cx="12" cy="15" r="1" fill={CTA}/><circle cx="16" cy="15" r="1" fill={CTA}/></svg>,
  // Chat
  <svg key="chat" width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke={CTA} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 9h8M8 13h5" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Person + check
  <svg key="person" width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" stroke={CTA} strokeWidth="1.5"/><path d="M2 21v-1a7 7 0 0 1 7-7h2" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 19l2 2 4-4" stroke={CTA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Plant/grow
  <svg key="plant" width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 22V12" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/><path d="M12 12C12 12 7 10 5 5c0 0 5 0 7 5z" stroke={CTA} strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 12c0 0 5-2 7-7 0 0-5 0-7 7z" stroke={CTA} strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 22h14" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/></svg>,
];

// ── Main ──────────────────────────────────────────────────────
export default function VorgespraechPage() {
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;
  const bookingRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [format, setFormat] = useState<"online" | "vor-ort">("online");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ vorname: "", nachname: "", email: "", topic: "" });
  const [confirmed, setConfirmed] = useState(false);

  function goToStep(n: number) { setStep(n); bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  function isPast(day: number) { const d = new Date(viewYear, viewMonth, day); const t = new Date(); t.setHours(0,0,0,0); return d < t; }
  function isWeekend(day: number) { const d = new Date(viewYear, viewMonth, day).getDay(); return d === 0 || d === 6; }
  function isSelected(day: number) { return selectedDate?.getFullYear() === viewYear && selectedDate?.getMonth() === viewMonth && selectedDate?.getDate() === day; }

  // ── Confirmation ──────────────────────────────────────────────
  if (confirmed) {
    return (
      <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
        <Navbar />
        {/* Breadcrumbs — same as fachkraefte/[id] */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 16px" }} className="breadcrumb-wrap">
          <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4, verticalAlign: "middle" }}><path d="M3 12L12 4l9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Startseite
            </a>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
            <a href="/vorgespraech" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Kostenloses Erstgespräch</a>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Buchungsbestätigung</span>
          </nav>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "32px 16px 64px" : "48px 24px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#EDFAEB", border: "4px solid #C3EDD0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#33700E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "0 0 10px" }}>Dein Erstgespräch ist gebucht!</h1>
            <p style={{ fontFamily: F, fontSize: 16, color: "var(--grey-text)", margin: 0 }}>
              Eine Bestätigung wurde an <strong style={{ color: "var(--black)" }}>{form.email}</strong> gesendet.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: "24px 28px" }}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: "var(--grey-text)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 16px" }}>Dein Termin</p>
              {[
                ["📅", "Datum", `${selectedDate?.getDate()}. ${MONTHS_DE[selectedDate?.getMonth() ?? 0]} ${selectedDate?.getFullYear()}`],
                ["⏰", "Uhrzeit", `${selectedTime} Uhr · 20 Minuten`],
                [format === "online" ? "💻" : "📍", "Format", format === "online" ? "Online per Videoanruf" : "Vor Ort — Mariahilfer Str. 47/3, 1060 Wien"],
                ["👤", "Name", `${form.vorname} ${form.nachname}`],
              ].map(([icon, label, value]) => (
                <div key={label as string} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start", borderBottom: "1px solid #F5F7FA", paddingBottom: 12 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: F, fontSize: 11, color: "var(--grey-text)", margin: "0 0 1px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--black)", margin: 0, fontWeight: 600 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--blue-ultra-light)", borderRadius: 20, padding: "24px 28px" }}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 16px" }}>Was kommt als nächstes?</p>
              {["Du erhältst eine E-Mail-Bestätigung.", format === "online" ? "Den Videoanruf-Link findest Du in Deinem Profil." : "Die Adresse und Anfahrt findest Du in der Bestätigungs-E-Mail.", "Wir senden Dir eine Erinnerung kurz vor dem Termin.", "Danach empfehlen wir Dir passende Fachkräfte."].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "white" }}>{i+1}</span>
                  </div>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.55 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12 }}>
            <a href="/profil" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "14px 28px", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Zum Profil — Termin ansehen
            </a>
            <a href="/" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "white", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "14px 28px", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              Zurück zur Startseite
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Breadcrumbs — same pattern as fachkraefte/[id], no border ── */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 16px" }} className="breadcrumb-wrap">
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
            onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M3 12L12 4l9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Startseite
          </a>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
          <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Kostenloses Orientierungsgespräch</span>
        </nav>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: "white", overflow: "hidden" }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
          minHeight: isMobile ? undefined : 480,
        }}>
          {/* Left: image flush */}
          <div style={{ position: "relative", minHeight: isMobile ? 260 : undefined, overflow: "hidden" }}>
            <img
              src="/fachkraefte/specialist-howtostart.jpg"
              alt="Spezialistin"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </div>

          {/* Right: content */}
          <div style={{ padding: isMobile ? "32px 16px 40px" : "48px 56px 48px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--blue-ultra-light)", borderRadius: 9999, padding: "5px 14px", marginBottom: 20, alignSelf: "flex-start" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={CTA} strokeWidth="1.6" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, letterSpacing: "0.07em", textTransform: "uppercase" }}>Kostenlos &amp; vertraulich</span>
            </div>

            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 28 : 42, lineHeight: 1.2, color: "var(--black)", margin: "0 0 16px" }}>
              Kostenloses<br />Orientierungsgespräch
            </h1>
            <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", lineHeight: 1.65, margin: "0 0 28px", maxWidth: 420 }}>
              Gemeinsam finden wir die passende Unterstützung für Deine Situation.
            </p>

            {/* 4 facts inline */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 16 : 24, marginBottom: 32 }}>
              {[
                { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" stroke={CTA} strokeWidth="1.5"/><path d="M2 21v-1a7 7 0 0 1 7-7h2" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 19l2 2 4-4" stroke={CTA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Persönliche\nEmpfehlung" },
                { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={CTA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Vertraulich &\ndiskret" },
                { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22c0 0-8-4-8-10a8 8 0 1 1 16 0c0 6-8 10-8 10z" stroke={CTA} strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke={CTA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Kostenlos &\nunverbindlich" },
                { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={CTA} strokeWidth="1.5"/><circle cx="12" cy="10" r="2" stroke={CTA} strokeWidth="1.5"/></svg>, text: "Online oder\nin deiner Nähe" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>{f.icon}</div>
                  <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.4, whiteSpace: "pre-line" }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              style={{ height: 56, padding: "0 36px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 700, fontSize: 17, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", boxShadow: "0 4px 20px rgba(45,91,141,0.28)", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--cta-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = CTA}>
              Kostenloses Erstgespräch buchen
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.634 6.234a.9.9 0 0 1 1.273 0l4.8 4.8a.9.9 0 0 1 0 1.273l-4.8 4.8a.9.9 0 1 1-1.272-1.272L16.068 12.4H6.8a.9.9 0 1 1 0-1.8h9.268l-3.434-3.435a.9.9 0 0 1 0-1.272Z" fill="white"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — title left, steps right ────────────────── */}
      <section style={{ background: "white", borderTop: "1px solid #EEF2F7", padding: isMobile ? "48px 16px" : "72px 40px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "300px 1fr", gap: isMobile ? 36 : 64, alignItems: "flex-start" }}>

          {/* Left: title */}
          <div style={{ paddingTop: isMobile ? 0 : 32 }}>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>So läuft es ab</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 32, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
              In 4 einfachen Schritten zur passenden Unterstützung
            </h2>
          </div>

          {/* Right: 4 steps */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 20 : 0 }}>
            {[
              { n: 1, icon: StepIcons[0], title: "Termin wählen", desc: "Wähle online einen passenden Termin für dein Gespräch." },
              { n: 2, icon: StepIcons[1], title: "Gespräch führen", desc: "In einem persönlichen Gespräch schilderst du deine Situation." },
              { n: 3, icon: StepIcons[2], title: "Passende Fachkraft finden", desc: "Wir empfehlen dir eine Fachkraft, die zu deinen Bedürfnissen passt." },
              { n: 4, icon: StepIcons[3], title: "Therapie starten", desc: "Du entscheidest dich in Ruhe für den nächsten Schritt." },
            ].map((s, i) => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative", paddingRight: !isMobile && i < 3 ? 24 : 0 }}>
                {/* Number + connector line */}
                <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 20 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: "white" }}>{s.n}</span>
                  </div>
                  {!isMobile && i < 3 && (
                    <div style={{ flex: 1, height: 1, background: "#DDE8F5", marginLeft: 12 }} />
                  )}
                </div>
                {/* Icon */}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: "var(--black)", margin: "0 0 8px", lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-NAV BANNER — light style ───────────────────────── */}
      <section style={{ background: "#F0F6FF", padding: isMobile ? "28px 16px" : "36px 40px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: 20, justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--blue-ultra-light)", border: `1px solid ${CTA}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 3-1.755 4.98-3.5 6.5L15 17H9l-.5-1.5C6.755 13.98 5 12 5 9a7 7 0 0 1 7-7z" stroke={CTA} strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 21h6M10 17v4M14 17v4" stroke={CTA} strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: "0 0 4px" }}>Noch unsicher?</p>
              <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>Du möchtest lieber selbst herausfinden, welche Unterstützung zu dir passt?</p>
            </div>
          </div>
          <a href="/orientierungstest" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: CTA, border: `1.5px solid ${CTA}30`, borderRadius: 9999, padding: "12px 24px", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", flexShrink: 0, boxShadow: "0 2px 8px rgba(45,91,141,0.08)", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = CTA)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = `${CTA}30`)}>
            Orientierungstest starten
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.634 6.234a.9.9 0 0 1 1.273 0l4.8 4.8a.9.9 0 0 1 0 1.273l-4.8 4.8a.9.9 0 1 1-1.272-1.272L16.068 12.4H6.8a.9.9 0 1 1 0-1.8h9.268l-3.434-3.435a.9.9 0 0 1 0-1.272Z" fill={CTA}/></svg>
          </a>
        </div>
      </section>

      {/* ── BOOKING SECTION ──────────────────────────────────────── */}
      <section ref={bookingRef} style={{ background: "#F8FAFE", padding: isMobile ? "40px 16px 64px" : "64px 40px 80px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: "0 0 8px" }}>Termin buchen</h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0 }}>Wähle Format, Datum und Uhrzeit für Dein kostenloses Erstgespräch.</p>
          </div>

          <div style={{ maxWidth: 1050, margin: "0 auto", display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "280px 1fr", gap: isMobile ? 20 : 28, alignItems: "flex-start" }}>
            {!isMobile && <LeftPanel format={format} selectedDate={selectedDate} selectedTime={selectedTime} />}

            <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: isMobile ? "24px 18px" : "36px 40px" }}>
              <ProgressBar step={step} />

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 14px" }}>Gesprächsformat</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                    {[
                      { value: "online" as const, label: "Online", sub: "Per Videoanruf", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
                      { value: "vor-ort" as const, label: "Vor Ort", sub: "PTBD Büro Wien", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg> },
                    ].map(opt => {
                      const sel = format === opt.value;
                      return (
                        <button key={opt.value} onClick={() => setFormat(opt.value)}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 16px", borderRadius: 14, border: sel ? `2px solid ${CTA}` : "1.5px solid #E8EFF8", background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer", color: sel ? CTA : "var(--grey-text)" }}>
                          {opt.icon}
                          <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: sel ? CTA : "var(--black)" }}>{opt.label}</span>
                          <span style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)" }}>{opt.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                  {format === "vor-ort" && (
                    <div style={{ background: "var(--blue-ultra-light)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={CTA} strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke={CTA} strokeWidth="1.6"/></svg>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>
                        <strong style={{ color: "var(--black)" }}>PTBD Beratungsstelle Wien</strong><br />
                        Mariahilfer Straße 47/3, 1060 Wien · Mo–Fr 09:00–17:00
                      </p>
                    </div>
                  )}

                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 16px" }}>Datum wählen</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else setViewMonth(m => m-1); }}
                      style={{ background: "none", border: "1px solid #E8EFF8", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: CTA }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                    <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)" }}>{MONTHS_DE[viewMonth]} {viewYear}</span>
                    <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); } else setViewMonth(m => m+1); }}
                      style={{ background: "none", border: "1px solid #E8EFF8", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: CTA }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
                    {DAYS_DE.map(d => <div key={d} style={{ textAlign: "center", fontFamily: F, fontSize: 12, fontWeight: 600, color: "var(--grey-text)", padding: "4px 0" }}>{d}</div>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 24 }}>
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const disabled = isPast(day) || isWeekend(day);
                      const sel = isSelected(day);
                      return (
                        <button key={day} disabled={disabled} onClick={() => { setSelectedDate(new Date(viewYear, viewMonth, day)); setSelectedTime(null); }}
                          style={{ height: 36, borderRadius: 8, border: sel ? `2px solid ${CTA}` : "1px solid transparent", background: sel ? CTA : disabled ? "transparent" : "#F5F8FF", color: sel ? "white" : disabled ? "#C8D0DC" : "var(--black)", fontFamily: F, fontSize: 13, fontWeight: sel ? 700 : 400, cursor: disabled ? "default" : "pointer" }}>
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {selectedDate && (
                    <>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 12px" }}>
                        Uhrzeit — {selectedDate.getDate()}. {MONTHS_SHORT[selectedDate.getMonth()]}
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
                        {TIME_SLOTS.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            style={{ padding: "10px 0", borderRadius: 10, border: selectedTime === t ? `2px solid ${CTA}` : "1px solid #E8EFF8", background: selectedTime === t ? CTA : "white", color: selectedTime === t ? "white" : "var(--black)", fontFamily: F, fontSize: 13, fontWeight: selectedTime === t ? 600 : 400, cursor: "pointer" }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button disabled={!selectedDate || !selectedTime} onClick={() => goToStep(2)}
                      style={{ height: 48, padding: "0 32px", borderRadius: 9999, background: selectedDate && selectedTime ? CTA : "#B0C4DE", color: "white", border: "none", fontFamily: F, fontSize: 15, fontWeight: 700, cursor: selectedDate && selectedTime ? "pointer" : "not-allowed" }}>
                      Weiter
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <div style={{ background: "var(--blue-ultra-light)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke={CTA} strokeWidth="1.6"/><path d="M8 2v4M16 2v4M3 10h18" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: CTA }}>
                      {selectedDate?.getDate()}. {MONTHS_DE[selectedDate?.getMonth() ?? 0]}, {selectedTime} Uhr
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                      {[{ key: "vorname", label: "Vorname" }, { key: "nachname", label: "Nachname" }].map(f => (
                        <div key={f.key}>
                          <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>{f.label}</label>
                          <input placeholder={f.label} value={form[f.key as keyof typeof form]}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                            style={{ width: "100%", height: 46, borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "0 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>E-Mail-Adresse</label>
                      <input type="email" placeholder="name@email.com" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        style={{ width: "100%", height: 46, borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "0 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>
                        Worum geht es? <span style={{ fontWeight: 400, color: "var(--grey-text)" }}>(optional)</span>
                      </label>
                      <textarea placeholder="Beschreibe kurz, was Dich beschäftigt …" value={form.topic}
                        onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} rows={3}
                        style={{ width: "100%", borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "12px 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box" as const, resize: "vertical", lineHeight: 1.5 }} />
                    </div>
                    <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
                      Deine Daten werden ausschließlich zur Terminvereinbarung verwendet und streng vertraulich behandelt.
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
                    <button onClick={() => goToStep(1)} style={{ height: 48, padding: "0 24px", borderRadius: 9999, border: "1.5px solid #DDE8F5", background: "white", fontFamily: F, fontSize: 14, fontWeight: 600, color: "var(--grey-text)", cursor: "pointer" }}>Zurück</button>
                    <button onClick={() => { if (form.vorname && form.email) goToStep(3); }}
                      style={{ height: 48, padding: "0 32px", borderRadius: 9999, background: form.vorname && form.email ? CTA : "#B0C4DE", color: "white", border: "none", fontFamily: F, fontSize: 15, fontWeight: 700, cursor: form.vorname && form.email ? "pointer" : "not-allowed" }}>
                      Weiter
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)", margin: "0 0 20px" }}>Bitte überprüfe Deine Angaben</h3>
                  <div style={{ background: "#F8FAFC", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
                    {[
                      ["Termin", `${selectedDate?.getDate()}. ${MONTHS_DE[selectedDate?.getMonth() ?? 0]} ${selectedDate?.getFullYear()}, ${selectedTime} Uhr`],
                      ["Format", format === "online" ? "Online per Videoanruf" : "Vor Ort — Mariahilfer Str. 47/3, 1060 Wien"],
                      ["Name", `${form.vorname} ${form.nachname}`],
                      ["E-Mail", form.email],
                      ...(form.topic ? [["Thema", form.topic]] : []),
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "flex-start", borderBottom: "1px solid #EEF2F7", paddingBottom: 12 }}>
                        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--grey-text)", minWidth: 70, flexShrink: 0 }}>{k}</span>
                        <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <button onClick={() => goToStep(2)} style={{ height: 48, padding: "0 24px", borderRadius: 9999, border: "1.5px solid #DDE8F5", background: "white", fontFamily: F, fontSize: 14, fontWeight: 600, color: "var(--grey-text)", cursor: "pointer" }}>Zurück</button>
                    <button onClick={() => setConfirmed(true)}
                      style={{ height: 48, padding: "0 32px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(45,91,141,0.25)" }}>
                      Jetzt buchen
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isMobile && <LeftPanel format={format} selectedDate={selectedDate} selectedTime={selectedTime} />}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
