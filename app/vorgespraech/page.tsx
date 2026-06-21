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

// ── Calendar helpers ─────────────────────────────────────────
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

// ── ProgressBar ──────────────────────────────────────────────
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
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#33700E" : active ? CTA : "#E8EFF8", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                {done
                  ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: active ? "white" : "var(--grey-text)" }}>{n}</span>}
              </div>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: active ? 600 : 400, color: active ? CTA : done ? "#33700E" : "var(--grey-text)", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? "#33700E" : "#E8EFF8", margin: "0 8px 16px", transition: "background 0.2s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Left panel ───────────────────────────────────────────────
function LeftPanel({ step, format, selectedDate, selectedTime, isMobile }: {
  step: number; format: string; selectedDate: Date | null; selectedTime: string | null; isMobile: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Photo card */}
      <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
          <img src="/fachkraefte/specialist-howtostart.jpg" alt="Beraterin" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,40,80,0.55) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "white", margin: "0 0 2px" }}>Kostenloses Erstgespräch</p>
            <p style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.85)", margin: 0 }}>Psychotherapeutischer Bereitschaftsdienst</p>
          </div>
        </div>
        <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
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

      {/* Selected termin */}
      {selectedDate && selectedTime && (
        <div style={{ background: "var(--blue-ultra-light)", border: `1px solid ${CTA}20`, borderRadius: 16, padding: "16px 20px" }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: CTA, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" }}>Dein gewählter Termin</p>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 2px" }}>
            {selectedDate.getDate()}. {MONTHS_SHORT[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </p>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>{selectedTime} Uhr · 20 Min.</p>
        </div>
      )}

      {/* Cross-nav */}
      <a href="/orientierungstest" style={{ textDecoration: "none", display: "block", background: `linear-gradient(135deg, ${CTA} 0%, #1A4A7A 100%)`, borderRadius: 16, padding: "18px 20px", transition: "opacity 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "white", margin: "0 0 4px" }}>Lieber selbst herausfinden?</p>
        <p style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "0 0 12px", lineHeight: 1.5 }}>5 Fragen — sofortige Empfehlung</p>
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "white", display: "flex", alignItems: "center", gap: 4 }}>
          Orientierungstest starten
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.634 6.234a.9.9 0 0 1 1.273 0l4.8 4.8a.9.9 0 0 1 0 1.273l-4.8 4.8a.9.9 0 1 1-1.272-1.272L16.068 12.4H6.8a.9.9 0 1 1 0-1.8h9.268l-3.434-3.435a.9.9 0 0 1 0-1.272Z" fill="white"/></svg>
        </span>
      </a>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────
export default function VorgespraechPage() {
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [format, setFormat] = useState<"online" | "vor-ort">("online");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ vorname: "", nachname: "", email: "", topic: "" });
  const [confirmed, setConfirmed] = useState(false);

  function goToStep(n: number) { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  }
  function isWeekend(day: number) { const d = new Date(viewYear, viewMonth, day).getDay(); return d === 0 || d === 6; }
  function isSelected(day: number) {
    return selectedDate?.getFullYear() === viewYear && selectedDate?.getMonth() === viewMonth && selectedDate?.getDate() === day;
  }

  // ── Confirmation page ────────────────────────────────────────
  if (confirmed) {
    return (
      <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 16px", background: "white", borderBottom: "1px solid #EEF2F7" }} className="breadcrumb-wrap">
          <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Home</a>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Buchungsbestätigung</span>
          </nav>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "32px 16px 64px" : "48px 24px 80px" }}>
          {/* Success header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#EDFAEB", border: "4px solid #C3EDD0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#33700E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "0 0 10px" }}>Dein Erstgespräch ist gebucht!</h1>
            <p style={{ fontFamily: F, fontSize: 16, color: "var(--grey-text)", margin: 0 }}>
              Eine Bestätigung wurde an <strong style={{ color: "var(--black)" }}>{form.email}</strong> gesendet.
            </p>
          </div>

          {/* Details + info grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {/* Termin summary */}
            <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: "24px 28px" }}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: "var(--grey-text)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 16px" }}>Dein Termin</p>
              {[
                { icon: "📅", label: "Datum", value: `${selectedDate?.getDate()}. ${MONTHS_DE[selectedDate?.getMonth() ?? 0]} ${selectedDate?.getFullYear()}` },
                { icon: "⏰", label: "Uhrzeit", value: `${selectedTime} Uhr · 20 Minuten` },
                { icon: format === "online" ? "💻" : "📍", label: "Format", value: format === "online" ? "Online per Videoanruf" : "Vor Ort — Mariahilfer Str. 47/3, 1060 Wien" },
                { icon: "👤", label: "Name", value: `${form.vorname} ${form.nachname}` },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, lineHeight: 1.4 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily: F, fontSize: 11, color: "var(--grey-text)", margin: "0 0 1px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--black)", margin: 0, fontWeight: 600 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div style={{ background: "var(--blue-ultra-light)", borderRadius: 20, padding: "24px 28px" }}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 16px" }}>Was kommt als nächstes?</p>
              {[
                "Du erhältst eine E-Mail-Bestätigung.",
                format === "online" ? "Den Videoanruf-Link findest Du in Deinem Profil." : "Die Adresse und Anfahrt findest Du in der Bestätigungs-E-Mail.",
                "Wir senden Dir eine Erinnerung kurz vor dem Termin.",
                "Danach empfehlen wir Dir passende Fachkräfte.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "white" }}>{i+1}</span>
                  </div>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.55 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div style={{ background: "#EDFAEB", border: "1px solid #C3EDD0", borderRadius: 16, padding: "16px 24px", marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 16 }}>
            {["Kostenfreie Absage bis 24h vorher", "Termin im Profil verwalten", "Vertraulich & unter Schweigepflicht"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#33700E" fillOpacity="0.2" stroke="#33700E" strokeWidth="1.4"/><path d="M8 12l3 3 5-5" stroke="#33700E" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)" }}>{t}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12 }}>
            <a href="/profil" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "14px 28px", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.25)", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--cta-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = CTA}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/></svg>
              Zum Profil — Termin ansehen
            </a>
            <a href="/" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "white", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "14px 28px", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              Zurück zur Startseite
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ── Booking flow ─────────────────────────────────────────────
  return (
    <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ background: "white", borderBottom: "1px solid #EEF2F7" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 16px" }} className="breadcrumb-wrap">
          <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Home</a>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Kostenloses Erstgespräch</span>
          </nav>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 1150, margin: "0 auto", padding: isMobile ? "24px 16px 64px" : "40px 24px 64px", boxSizing: "border-box" as const }}>

        {/* Back + title */}
        <div style={{ marginBottom: 24 }}>
          <button onClick={() => window.history.back()} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, fontFamily: F, fontSize: 14, color: "var(--grey-text)", cursor: "pointer", marginBottom: 16 }}
            onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
            Zurück
          </button>
          <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "var(--black)", margin: 0 }}>Kostenloses Erstgespräch buchen</h1>
        </div>

        {/* Layout: left + right */}
        <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "300px 1fr", gap: isMobile ? 20 : 28, alignItems: "flex-start" }}>

          {/* Left panel */}
          {!isMobile && <LeftPanel step={step} format={format} selectedDate={selectedDate} selectedTime={selectedTime} isMobile={isMobile} />}

          {/* Right: step content */}
          <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: isMobile ? "24px 18px" : "36px 40px" }}>
            <ProgressBar step={step} />

            {/* STEP 1: Format + Date/Time */}
            {step === 1 && (
              <div>
                {/* Format */}
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 14px" }}>Gesprächsformat</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                  {[
                    { value: "online" as const, label: "Online", sub: "Per Videoanruf", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
                    { value: "vor-ort" as const, label: "Vor Ort", sub: "PTBD Büro Wien", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg> },
                  ].map(opt => {
                    const sel = format === opt.value;
                    return (
                      <button key={opt.value} onClick={() => setFormat(opt.value)}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px 16px", borderRadius: 14, border: sel ? `2px solid ${CTA}` : "1.5px solid #E8EFF8", background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer", color: sel ? CTA : "var(--grey-text)", transition: "all 0.15s" }}>
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

                {/* Calendar */}
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 16px" }}>Datum wählen</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                  {DAYS_DE.map(d => <div key={d} style={{ textAlign: "center", fontFamily: F, fontSize: 12, fontWeight: 600, color: "var(--grey-text)", padding: "4px 0" }}>{d}</div>)}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 28 }}>
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const disabled = isPast(day) || isWeekend(day);
                    const sel = isSelected(day);
                    return (
                      <button key={day} disabled={disabled} onClick={() => { setSelectedDate(new Date(viewYear, viewMonth, day)); setSelectedTime(null); }}
                        style={{ height: 38, borderRadius: 9, border: sel ? `2px solid ${CTA}` : "1px solid transparent", background: sel ? CTA : disabled ? "transparent" : "#F5F8FF", color: sel ? "white" : disabled ? "#C8D0DC" : "var(--black)", fontFamily: F, fontSize: 13, fontWeight: sel ? 700 : 400, cursor: disabled ? "default" : "pointer", transition: "all 0.15s" }}>
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 12px" }}>
                      Uhrzeit — {selectedDate.getDate()}. {MONTHS_SHORT[selectedDate.getMonth()]}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 28 }}>
                      {TIME_SLOTS.map(t => (
                        <button key={t} onClick={() => setSelectedTime(t)}
                          style={{ padding: "10px 0", borderRadius: 10, border: selectedTime === t ? `2px solid ${CTA}` : "1px solid #E8EFF8", background: selectedTime === t ? CTA : "white", color: selectedTime === t ? "white" : "var(--black)", fontFamily: F, fontSize: 13, fontWeight: selectedTime === t ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button disabled={!selectedDate || !selectedTime} onClick={() => goToStep(2)}
                    style={{ height: 48, padding: "0 32px", borderRadius: 9999, background: selectedDate && selectedTime ? CTA : "#B0C4DE", color: "white", border: "none", fontFamily: F, fontSize: 15, fontWeight: 700, cursor: selectedDate && selectedTime ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
                    Weiter
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Personal data */}
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
                    {[
                      { key: "vorname", label: "Vorname", placeholder: "Vorname" },
                      { key: "nachname", label: "Nachname", placeholder: "Nachname" },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>{f.label}</label>
                        <input placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          style={{ width: "100%", height: 46, borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "0 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box", color: "var(--black)" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>E-Mail-Adresse</label>
                    <input type="email" placeholder="name@email.com" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      style={{ width: "100%", height: 46, borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "0 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box", color: "var(--black)" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>
                      Worum geht es? <span style={{ fontWeight: 400, color: "var(--grey-text)" }}>(optional)</span>
                    </label>
                    <textarea placeholder="Beschreibe kurz, was Dich beschäftigt …" value={form.topic}
                      onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} rows={3}
                      style={{ width: "100%", borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "12px 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.5, color: "var(--black)" }} />
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

            {/* STEP 3: Review + confirm */}
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

          {/* Left panel mobile */}
          {isMobile && <LeftPanel step={step} format={format} selectedDate={selectedDate} selectedTime={selectedTime} isMobile={isMobile} />}
        </div>
      </div>
      <Footer />
    </main>
  );
}
