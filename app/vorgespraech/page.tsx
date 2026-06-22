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

const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

function ProgressBar({ step }: { step: number }) {
  const steps = ["Format & Termin", "Deine Daten", "Bestätigung"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {steps.map((label, i) => {
        const n = i + 1; const done = step > n; const active = step === n;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#33700E" : active ? CTA : "#E8EFF8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {done ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: active ? "white" : "var(--grey-text)" }}>{n}</span>}
              </div>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: active ? 600 : 400, color: active ? CTA : done ? "#33700E" : "var(--grey-text)", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: done ? "#33700E" : "#E8EFF8", margin: "0 8px 16px" }} />}
          </div>
        );
      })}
    </div>
  );
}

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
            { icon: "/icons/icon-clock.svg", text: "20 Minuten" },
            { icon: "/icons/shield-check.svg", text: "Kostenlos & vertraulich" },
            { icon: format === "vor-ort" ? "/icons/icon-pin.svg" : "/icons/icon-orientierung.svg", text: format === "vor-ort" ? "Vor Ort in Wien" : "Online per Video" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={r.icon} width={16} height={16} alt="" style={{ objectFit: "contain", flexShrink: 0, opacity: 0.85 }} />
              <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)" }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>
      {selectedDate && selectedTime && (
        <div style={{ background: "var(--blue-ultra-light)", border: `1px solid ${CTA}20`, borderRadius: 16, padding: "14px 18px" }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: CTA, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 6px" }}>Gewählter Termin</p>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 2px" }}>{selectedDate.getDate()}. {MONTHS_SHORT[selectedDate.getMonth()]} {selectedDate.getFullYear()}</p>
          <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{selectedTime} Uhr · 20 Min.</p>
        </div>
      )}
    </div>
  );
}

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

  // Shared wrapper style — same as navbar
  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;

  // Breadcrumbs — same as fachkraefte/[id], no border
  const Breadcrumbs = ({ extra }: { extra?: string }) => (
    <div style={{ ...wrap, padding: isMobile ? "14px 16px" : "14px 40px" }} className="breadcrumb-wrap">
      <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
          Startseite
        </a>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
        {extra ? (
          <>
            <a href="/vorgespraech" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
              Kostenloses Erstgespräch
            </a>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>{extra}</span>
          </>
        ) : (
          <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Kostenloses Orientierungsgespräch</span>
        )}
      </nav>
    </div>
  );

  // ── Confirmation ──────────────────────────────────────────────
  if (confirmed) {
    return (
      <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
        <Navbar />
        <Breadcrumbs extra="Buchungsbestätigung" />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "32px 16px 64px" : "48px 40px 80px" }}>
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
            <a href="/profil" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "14px 28px", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Zum Profil — Termin ansehen</a>
            <a href="/" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "white", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "14px 28px", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Zurück zur Startseite</a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />
      <Breadcrumbs />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "0 0 40px" : "0 0 64px" }}>
        <div style={{ ...wrap }}>
          <div style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
            gap: isMobile ? 28 : 64,
            alignItems: "center",
            paddingTop: isMobile ? 28 : 48,
          }}>
            {/* Left: hero image — transparent bg, show full */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", minHeight: isMobile ? 260 : 460 }}>
              <img src="/vorgespraech-banner.png" alt="Spezialistin"
                style={{ width: "100%", objectFit: "contain", objectPosition: "bottom center", display: "block", maxHeight: isMobile ? 280 : 500 }} />
            </div>

            {/* Right: content */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--blue-ultra-light)", borderRadius: 9999, padding: "5px 14px", marginBottom: 18, alignSelf: "flex-start" }}>
                <img src="/icons/shield-check.svg" width={14} height={14} alt="" style={{ objectFit: "contain" }} />
                <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, letterSpacing: "0.07em", textTransform: "uppercase" }}>Kostenlos &amp; vertraulich</span>
              </div>

              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 28 : 40, lineHeight: 1.2, color: "var(--black)", margin: "0 0 14px" }}>
                Kostenloses<br />Orientierungsgespräch
              </h1>
              <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 17, color: "var(--grey-text)", lineHeight: 1.65, margin: "0 0 28px" }}>
                Gemeinsam finden wir die passende Unterstützung für Deine Situation.
              </p>

              {/* 4 benefit cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {[
                  { icon: "/icons/icon-vorgespraech.svg", title: "Persönliche Empfehlung", sub: "Wir hören dir zu und empfehlen die passende Fachkraft für deine Situation." },
                  { icon: "/icons/shield-check.svg",       title: "100 % vertraulich", sub: "Alles bleibt unter uns — das Gespräch unterliegt der Schweigepflicht." },
                  { icon: "/icons/icon-check.svg",         title: "Völlig kostenlos", sub: "Das Erstgespräch ist gratis — ohne Anmeldung, ohne versteckte Kosten." },
                  { icon: "/icons/icon-pin.svg",           title: "Online oder Vor Ort", sub: "Du wählst: bequem per Video oder persönlich in unserem Büro in Wien." },
                ].map((f, i) => (
                  <div key={i} style={{ background: "var(--blue-ultra-light)", borderRadius: 16, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(45,91,141,0.1)" }}>
                      <img src={f.icon} width={20} height={20} alt="" style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "var(--black)", margin: "0 0 4px" }}>{f.title}</p>
                      <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                style={{ height: 54, padding: "0 34px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", boxShadow: "0 4px 20px rgba(45,91,141,0.25)", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--cta-hover)"}
                onMouseLeave={e => e.currentTarget.style.background = CTA}>
                Kostenloses Erstgespräch buchen
                <img src="/icons/arrow-right.svg" width={18} height={18} alt="" style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — modern numbered cards ─────────────────── */}
      <section style={{ background: "#F8FAFE", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          {/* Section header */}
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>So läuft es ab</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 32, lineHeight: 1.3, color: "var(--black)", margin: "0 0 10px" }}>
              In 4 einfachen Schritten zur<br />passenden Unterstützung
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
              Von der Terminbuchung bis zur Therapieempfehlung — unkompliziert und vertraulich.
            </p>
          </div>

          {/* Steps grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: isMobile ? 16 : 20 }}>
            {[
              { n: 1, icon: "/icons/icon-clock.svg",         title: "Termin wählen",           desc: "Wähle online einen passenden Termin für dein Gespräch.", color: "#EBF2FF" },
              { n: 2, icon: "/icons/icon-vorgespraech.svg",  title: "Gespräch führen",          desc: "In einem persönlichen Gespräch schilderst du deine Situation.", color: "#EDF9F0" },
              { n: 3, icon: "/icons/icon-unterstuetzung.svg",title: "Passende Fachkraft finden",desc: "Wir empfehlen dir eine Fachkraft, die zu deinen Bedürfnissen passt.", color: "#FFF4E8" },
              { n: 4, icon: "/icons/icon-test.svg",          title: "Therapie starten",         desc: "Du entscheidest dich in Ruhe für den nächsten Schritt.", color: "#F3EEFF" },
            ].map((s, i) => (
              <div key={s.n} style={{ position: "relative", background: "white", borderRadius: 20, padding: "28px 24px 26px", border: "1px solid #EEF2F7", overflow: "hidden", display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Large background number */}
                <span style={{ position: "absolute", top: -10, right: 14, fontFamily: F, fontWeight: 800, fontSize: 80, color: "#F0F4FA", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{s.n}</span>

                {/* Step number badge */}
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: CTA, flexShrink: 0 }}>
                  <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "white" }}>{s.n}</span>
                </div>

                {/* Icon */}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={s.icon} width={26} height={26} alt="" style={{ objectFit: "contain" }} />
                </div>

                <div>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 6px", lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>

                {/* Connector arrow — not on last */}
                {!isMobile && i < 3 && (
                  <div style={{ position: "absolute", top: "50%", right: -14, transform: "translateY(-50%)", zIndex: 2, background: "white", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #EEF2F7", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke={CTA} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ──────────────────────────────────────── */}
      <section ref={bookingRef} style={{ background: "white", padding: isMobile ? "48px 0 64px" : "72px 0 80px" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: "0 0 8px" }}>Termin buchen</h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0 }}>Wähle Format, Datum und Uhrzeit für Dein kostenloses Erstgespräch.</p>
          </div>

          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "280px 1fr", gap: isMobile ? 20 : 28, alignItems: "flex-start" }}>
            {!isMobile && <LeftPanel format={format} selectedDate={selectedDate} selectedTime={selectedTime} />}

            <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: isMobile ? "24px 18px" : "36px 40px" }}>
              <ProgressBar step={step} />

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 14px" }}>Gesprächsformat</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                    {[
                      { value: "online" as const, label: "Online", sub: "Per Videoanruf", icon: "/icons/icon-orientierung.svg" },
                      { value: "vor-ort" as const, label: "Vor Ort", sub: "PTBD Büro Wien", icon: "/icons/icon-pin.svg" },
                    ].map(opt => {
                      const sel = format === opt.value;
                      return (
                        <button key={opt.value} onClick={() => setFormat(opt.value)}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 16px", borderRadius: 14, border: sel ? `2px solid ${CTA}` : "1.5px solid #E8EFF8", background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer" }}>
                          <img src={opt.icon} width={24} height={24} alt="" style={{ objectFit: "contain", opacity: sel ? 1 : 0.5 }} />
                          <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: sel ? CTA : "var(--black)" }}>{opt.label}</span>
                          <span style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)" }}>{opt.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                  {format === "vor-ort" && (
                    <div style={{ background: "var(--blue-ultra-light)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <img src="/icons/icon-pin.svg" width={16} height={16} alt="" style={{ objectFit: "contain", flexShrink: 0, marginTop: 2 }} />
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
                      const day = i + 1; const disabled = isPast(day) || isWeekend(day); const sel = isSelected(day);
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
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 12px" }}>Uhrzeit — {selectedDate.getDate()}. {MONTHS_SHORT[selectedDate.getMonth()]}</p>
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
                    <img src="/icons/icon-clock.svg" width={16} height={16} alt="" style={{ objectFit: "contain" }} />
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: CTA }}>{selectedDate?.getDate()}. {MONTHS_DE[selectedDate?.getMonth() ?? 0]}, {selectedTime} Uhr</span>
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
                      <label style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--black)", display: "block", marginBottom: 6 }}>Worum geht es? <span style={{ fontWeight: 400, color: "var(--grey-text)" }}>(optional)</span></label>
                      <textarea placeholder="Beschreibe kurz, was Dich beschäftigt …" value={form.topic}
                        onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} rows={3}
                        style={{ width: "100%", borderRadius: 10, border: "1.5px solid #DDE8F5", padding: "12px 14px", fontFamily: F, fontSize: 14, outline: "none", boxSizing: "border-box" as const, resize: "vertical", lineHeight: 1.5 }} />
                    </div>
                    <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>Deine Daten werden ausschließlich zur Terminvereinbarung verwendet und streng vertraulich behandelt.</p>
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
