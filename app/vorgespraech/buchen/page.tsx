"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoredUser, type AuthUser } from "@/lib/auth";
import { saveBooking } from "@/lib/bookings";

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

const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstWeekday(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

function isAvailableDay(date: Date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.floor((date.getTime() - today.getTime()) / 86400000);
  if (diff < 1) return false;
  const dow = date.getDay();
  if (dow === 0 || dow === 6) return false;
  return diff % 3 !== 0;
}

function availableSlots(date: Date) {
  const diff = Math.floor((date.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime()) / 86400000);
  const morning = diff % 2 === 0 ? ["09:00","10:00","11:00"] : ["09:30","10:30","11:30"];
  const afternoon = diff % 4 === 1 ? ["14:00","15:00","16:00"] : ["14:00","14:30","15:00","15:30","16:00","16:30"];
  return { morning, afternoon };
}

// ── Progress bar ──────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const steps = ["Termin", "Angaben", "Bestätigung"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {steps.map((label, i) => {
        const n = i + 1; const done = step > n; const active = step === n;
        return (
          <React.Fragment key={n}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: done || active ? CTA : "white", border: done || active ? `2px solid ${CTA}` : "2px solid #D0D0D0", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {done
                  ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  : <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: active ? "white" : "#A0A0A0" }}>{n}</span>
                }
              </div>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: active || done ? 600 : 400, color: active || done ? CTA : "#A0A0A0", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? CTA : "#E8E8E8", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Left panel ────────────────────────────────────────────────────────
function LeftPanel({ format, selectedDate, selectedTime, isMobile }: {
  format: "online" | "vor-ort"; selectedDate: string; selectedTime: string; isMobile: boolean;
}) {
  return (
    <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20, ...(isMobile ? {} : { position: "sticky", top: 88, alignSelf: "flex-start" }) }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 14, flexShrink: 0, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/logo.svg" alt="PTBD" style={{ width: 48, height: 48, objectFit: "contain" }} />
        </div>
        <div>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: 0 }}>Kostenloses Erstgespräch</p>
          <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: "3px 0 0" }}>Psychotherapeutischer Bereitschaftsdienst</p>
        </div>
      </div>

      <div style={{ height: 1, background: "#F0F0F0" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.6"/><path d="M12 7v5l3 3" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, label: "30 Minuten" },
          { icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Kostenlos & vertraulich" },
          ...(format === "online"
            ? [{ icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke={CTA} strokeWidth="1.6"/><path d="M8 21h8M12 17v4" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, label: "Online per Video" }]
            : [{ icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={CTA} strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke={CTA} strokeWidth="1.6"/></svg>, label: "Vor Ort in Wien" }]),
          ...(selectedDate ? [{ icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, label: selectedDate }] : []),
          ...(selectedTime ? [{ icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.6"/><path d="M12 7v5l3 3" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, label: `${selectedTime} Uhr · 30 Min.` }] : []),
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{r.icon}</div>
            <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)", fontWeight: 500 }}>{r.label}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "#EDFAEB", border: "1px solid #C3EDD0", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="var(--green)" fillOpacity="0.15" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M9 12l2 2 4-4" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily: F, fontSize: 12, color: "var(--green)", margin: 0, lineHeight: 1.6 }}>
          <span style={{ fontWeight: 600 }}>Komplett kostenlos.</span>{" "}Keine Kreditkarte, keine Verpflichtung.
        </p>
      </div>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────
function Confirmation({ format, selectedDate, selectedTime, isMobile, user }: {
  format: "online" | "vor-ort"; selectedDate: string; selectedTime: string; isMobile: boolean; user: AuthUser | null;
}) {
  const KONTO_FEATURES = [
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Termine verwalten", desc: "Alle Buchungen auf einen Blick" },
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Nachrichten", desc: "Direkt mit deinem Berater schreiben" },
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={CTA} strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Fachkräfte finden", desc: "Passende Therapeuten entdecken" },
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Sicher & vertraulich", desc: "DSGVO-konform, jederzeit löschbar" },
  ];

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: isMobile ? "32px 16px 64px" : "48px 24px 80px" }}>
      {/* Success header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EDFAEB", border: "2px solid #C3EDD0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "var(--black)", margin: "0 0 8px" }}>Dein Erstgespräch ist gebucht!</h1>
        <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: "0 0 24px", lineHeight: 1.6 }}>
          Wir freuen uns auf das Gespräch mit dir. Eine Bestätigung wurde an deine E-Mail-Adresse gesendet.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {[selectedDate, `${selectedTime} Uhr · 30 Min.`, format === "online" ? "Online per Video" : "Vor Ort in Wien", "Kostenlos"].map((chip, i) => (
            <div key={i} style={{ background: "white", border: "1px solid #E8E8E8", borderRadius: 9999, padding: "7px 16px", fontFamily: F, fontSize: 13, color: "var(--black)", fontWeight: 500 }}>{chip}</div>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div style={{ background: "var(--blue-ultra-light)", border: "1px solid #C8DFFF", borderRadius: 20, padding: "24px 22px" }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "var(--black)", margin: "0 0 14px" }}>Was passiert als Nächstes?</p>
          {[
            "Du erhältst eine Bestätigungs-E-Mail mit allen Details.",
            format === "online" ? "Den Videoanruf-Link bekommst du kurz vor dem Termin." : "Die Adresse findest du in der Bestätigungs-E-Mail.",
            "Wir senden dir eine Erinnerung kurz vor dem Gespräch.",
            "Nach dem Gespräch empfehlen wir dir passende Fachkräfte.",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "white" }}>{i+1}</span>
              </div>
              <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.55 }}>{t}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#EDFAEB", border: "1px solid #C3EDD0", borderRadius: 20, padding: "24px 22px" }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "var(--black)", margin: "0 0 14px" }}>Wichtige Informationen</p>
          {[
            "Das Gespräch dauert ca. 30 Minuten.",
            "Sorge für einen ruhigen, ungestörten Ort.",
            "Du kannst dein Anliegen offen schildern – wir hören zu.",
            "Kostenfreie Absage bis 24h vorher möglich.",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="9" fill="var(--green)" fillOpacity="0.2" stroke="var(--green)" strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* If logged in: profile button. If not: Konto banner */}
      {user ? (
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", marginBottom: 32 }}>
          <a href="/profil"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: CTA, borderRadius: 9999, padding: "12px 28px", fontFamily: F, fontWeight: 700, fontSize: 15, color: "white", textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.25)", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/></svg>
            Zum Profil — Termin ansehen
          </a>
          <a href="/"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "white", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "12px 28px", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--blue-ultra-light)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
            Zurück zur Startseite
          </a>
        </div>
      ) : (
        <div style={{ borderRadius: isMobile ? 16 : 24, backgroundImage: "url('/KontoBanner.png')", backgroundSize: "cover", backgroundPosition: "center", padding: isMobile ? "28px 20px" : "48px 56px", marginBottom: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1 }}>
            <div>
              <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Dein kostenloser Account</p>
              <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, color: "var(--black)", margin: "0 0 20px", lineHeight: 1.3 }}>Sieh deinen Termin in deinem Profil</h3>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px 20px" }}>
                {KONTO_FEATURES.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backdropFilter: "blur(4px)" }}>{f.icon}</div>
                    <div>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: "var(--black)", margin: "4px 0 2px" }}>{f.title}</p>
                      <p style={{ fontFamily: F, fontSize: 11, color: "#444", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10 }}>
              <a href="/anmelden"
                style={{ display: "block", textAlign: "center", background: CTA, color: "white", borderRadius: 9999, padding: "13px 24px", fontFamily: F, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(45,91,141,0.3)", boxSizing: "border-box" as const, flex: 1 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Anmelden
              </a>
              <a href="/registrieren"
                style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,0.75)", color: CTA, borderRadius: 9999, padding: "13px 24px", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", border: `1.5px solid ${CTA}`, transition: "all 0.2s", boxSizing: "border-box" as const, flex: 1 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.75)"}>
                Konto erstellen
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────
function TimeChip({ time, selected, onClick }: { time: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 16px", borderRadius: 9999, border: selected ? `2px solid ${CTA}` : "1.5px solid #E0E0E0", background: selected ? CTA : "white", color: selected ? "white" : "var(--black)", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer", transition: "all 0.15s" }}
      onMouseEnter={e => { if (!selected) { (e.currentTarget as HTMLElement).style.borderColor = CTA; (e.currentTarget as HTMLElement).style.color = CTA; } }}
      onMouseLeave={e => { if (!selected) { (e.currentTarget as HTMLElement).style.borderColor = "#E0E0E0"; (e.currentTarget as HTMLElement).style.color = "var(--black)"; } }}>
      {time}
    </button>
  );
}

function FormField({ label, children, required, optional }: { label: string; children: React.ReactNode; required?: boolean; optional?: boolean }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)", marginBottom: 6 }}>
        {label}
        {required && <span style={{ color: "var(--cta-brand)", marginLeft: 3 }}>*</span>}
        {optional && <span style={{ color: "var(--grey-text)", fontWeight: 400, marginLeft: 4 }}>(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E0E0E0", fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none", boxSizing: "border-box" as const, background: "white" }}
      onFocus={e => e.currentTarget.style.borderColor = CTA}
      onBlur={e => e.currentTarget.style.borderColor = "#E0E0E0"} />
  );
}

function NextButton({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: "100%", height: 52, borderRadius: 9999, background: disabled ? "#B0C4D8" : CTA, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"; }}
      onMouseLeave={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = CTA; }}>
      {label}
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/></svg>
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────
export default function VorgespraechBuchenPage() {
  const winW = useWindowWidth();
  const isMobile = winW < 1071;

  const [user, setUser] = useState<AuthUser | null>(null);
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState<"online" | "vor-ort">("online");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [thema, setThema] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date(); today.setHours(0,0,0,0);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDayObj, setSelectedDayObj] = useState<Date | null>(null);

  useEffect(() => {
    const u = getStoredUser();
    setUser(u);
    if (u) {
      const parts = u.name.split(" ");
      setVorname(parts[0] || "");
      setNachname(parts.slice(1).join(" ") || "");
      setEmail(u.email);
    }
    const handler = () => setUser(getStoredUser());
    window.addEventListener("pb_auth_change", handler);
    return () => window.removeEventListener("pb_auth_change", handler);
  }, []);

  function goToStep(n: number) { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); }

  function selectDay(day: number) {
    const date = new Date(calYear, calMonth, day);
    if (!isAvailableDay(date)) return;
    setSelectedDayObj(date);
    const dayNames = ["So","Mo","Di","Mi","Do","Fr","Sa"];
    setSelectedDate(`${dayNames[date.getDay()]}, ${day}. ${MONTHS_DE[calMonth]} ${calYear}`);
    setSelectedTime("");
  }

  function handleConfirm() {
    saveBooking({
      therapistId: "vorgespraech",
      therapistName: "Kostenloses Erstgespräch",
      therapistRole: "Psychotherapeutischer Bereitschaftsdienst",
      therapistPhoto: "/vorgespraech-banner.jpg",
      date: selectedDate,
      time: selectedTime,
      format,
      status: "confirmed",
    });
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;

  const Breadcrumbs = () => (
    <div style={{ ...wrap, padding: isMobile ? "14px 16px 6px" : "14px 40px 6px" }}>
      <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <a href="/" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Startseite</a>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
        <a href="/vorgespraech" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>Kostenloses Erstgespräch</a>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
        <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 600 }}>Termin buchen</span>
      </nav>
    </div>
  );

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstWD = getFirstWeekday(calYear, calMonth);
  const isPrevDisabled = calYear === today.getFullYear() && calMonth === today.getMonth();
  const slots = selectedDayObj ? availableSlots(selectedDayObj) : null;
  const canStep1 = !!selectedDate && !!selectedTime;
  const canStep2 = !!vorname && !!email && !!telefon;

  return (
    <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
      <Navbar />
      <Breadcrumbs />

      {confirmed ? (
        <Confirmation format={format} selectedDate={selectedDate} selectedTime={selectedTime} isMobile={isMobile} user={user} />
      ) : (
        <div style={{ maxWidth: 1150, margin: "0 auto", padding: isMobile ? "24px 16px 64px" : "40px 24px 64px", boxSizing: "border-box" as const }}>
          <div style={{ marginBottom: 16 }}>
            <button onClick={() => step > 1 ? goToStep(step - 1) : window.history.back()}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, fontFamily: F, fontSize: 14, color: "var(--grey-text)", cursor: "pointer", marginBottom: 16 }}
              onMouseEnter={e => (e.currentTarget.style.color = CTA)} onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
              Zurück
            </button>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "var(--black)", margin: 0 }}>Erstgespräch buchen</h1>
          </div>

          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "300px 1fr", gap: isMobile ? 20 : 28, alignItems: "flex-start" }}>
            <LeftPanel format={format} selectedDate={selectedDate} selectedTime={selectedTime} isMobile={isMobile} />

            <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: isMobile ? "24px 18px" : "36px 40px" }}>
              <ProgressBar step={step} />

              {/* ── STEP 1: Termin ── */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 6px" }}>Termin auswählen</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px" }}>Wähle dein bevorzugtes Format und einen passenden Termin.</p>

                  {/* Format */}
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 10px" }}>Format</p>
                  <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                    {([
                      { value: "online" as const, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>, title: "Online-Gespräch", sub: "Per Video von überall" },
                      { value: "vor-ort" as const, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.6"/></svg>, title: "Vor-Ort-Gespräch", sub: "Mariahilfer Str. 47/3, Wien" },
                    ] as const).map(opt => {
                      const sel = format === opt.value;
                      return (
                        <button key={opt.value} onClick={() => { setFormat(opt.value); setSelectedTime(""); }}
                          style={{ flex: 1, border: sel ? `2px solid ${CTA}` : "2px solid #E8E8E8", borderRadius: 14, padding: "16px 14px", background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ color: sel ? CTA : "var(--grey-text)" }}>{opt.icon}</div>
                          <div>
                            <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: sel ? CTA : "var(--black)", margin: 0 }}>{opt.title}</p>
                            <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: "3px 0 0" }}>{opt.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Calendar */}
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 10px" }}>Datum</p>
                  <div style={{ border: "1px solid #EBEBEB", borderRadius: 12, padding: 10, marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <button onClick={() => { if (!isPrevDisabled) { if (calMonth === 0) { setCalYear(y => y-1); setCalMonth(11); } else setCalMonth(m => m-1); } }}
                        disabled={isPrevDisabled} style={{ background: "none", border: "none", width: 24, height: 24, cursor: isPrevDisabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: isPrevDisabled ? 0.3 : 1 }}>
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
                      </button>
                      <span style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)" }}>{MONTHS_DE[calMonth]} {calYear}</span>
                      <button onClick={() => { if (calMonth === 11) { setCalYear(y => y+1); setCalMonth(0); } else setCalMonth(m => m+1); }}
                        style={{ background: "none", border: "none", width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
                      </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 2 }}>
                      {DAYS_DE.map(d => <div key={d} style={{ textAlign: "center", fontFamily: F, fontSize: 9, fontWeight: 600, color: "#B0B0B0", padding: "2px 0" }}>{d}</div>)}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
                      {Array.from({ length: firstWD }).map((_, i) => <div key={`e${i}`} style={{ aspectRatio: "1" }} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(calYear, calMonth, day);
                        const avail = isAvailableDay(date);
                        const isPast = date < today;
                        const isSel = selectedDayObj?.getDate() === day && selectedDayObj?.getMonth() === calMonth && selectedDayObj?.getFullYear() === calYear;
                        return (
                          <button key={day} onClick={() => avail && selectDay(day)} disabled={!avail || isPast}
                            style={{ width: "100%", aspectRatio: "1", borderRadius: 8, background: isSel ? CTA : avail ? "var(--blue-ultra-light)" : "transparent", color: isSel ? "white" : avail ? CTA : isPast ? "#D8D8D8" : "#C0C0C0", border: "none", fontFamily: F, fontWeight: isSel ? 600 : avail ? 500 : 400, fontSize: 11, cursor: avail ? "pointer" : "default", transition: "all 0.15s" }}
                            onMouseEnter={e => { if (avail && !isSel) (e.currentTarget as HTMLElement).style.background = "#D6EBFF"; }}
                            onMouseLeave={e => { if (avail && !isSel) (e.currentTarget as HTMLElement).style.background = "var(--blue-ultra-light)"; }}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  {slots && (
                    <div style={{ marginBottom: 32 }}>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 12px" }}>Uhrzeit</p>
                      {slots.morning.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", fontWeight: 500, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Vormittag</p>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {slots.morning.map(s => <TimeChip key={s} time={s} selected={selectedTime === s} onClick={() => setSelectedTime(s)} />)}
                          </div>
                        </div>
                      )}
                      {slots.afternoon.length > 0 && (
                        <div>
                          <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", fontWeight: 500, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Nachmittag</p>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {slots.afternoon.map(s => <TimeChip key={s} time={s} selected={selectedTime === s} onClick={() => setSelectedTime(s)} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <NextButton onClick={() => goToStep(2)} disabled={!canStep1} label="Weiter zu den Angaben" />
                </div>
              )}

              {/* ── STEP 2: Angaben ── */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 6px" }}>Deine Angaben</h2>
                  <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px" }}>Alle Angaben werden streng vertraulich behandelt.</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                      <FormField label="Vorname" required><TextInput value={vorname} onChange={setVorname} placeholder="Max" /></FormField>
                      <FormField label="Nachname" required><TextInput value={nachname} onChange={setNachname} placeholder="Mustermann" /></FormField>
                    </div>
                    <FormField label="E-Mail" required><TextInput value={email} onChange={setEmail} placeholder="deine@email.at" type="email" /></FormField>
                    <FormField label="Telefon" required><TextInput value={telefon} onChange={setTelefon} placeholder="+43 660 123 45 67" type="tel" /></FormField>
                    <FormField label="Worum geht es?" optional>
                      <textarea value={thema} onChange={e => setThema(e.target.value)} placeholder="Beschreibe kurz, was dich beschäftigt … (optional)" rows={3}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E0E0E0", fontFamily: F, fontSize: 14, color: "var(--black)", resize: "vertical", outline: "none", boxSizing: "border-box" as const, lineHeight: 1.5 }}
                        onFocus={e => e.currentTarget.style.borderColor = CTA}
                        onBlur={e => e.currentTarget.style.borderColor = "#E0E0E0"} />
                    </FormField>
                    <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
                      Deine Daten werden ausschließlich zur Terminvereinbarung verwendet und nach DSGVO behandelt.
                    </p>
                  </div>

                  <div style={{ marginTop: 28 }}>
                    <NextButton onClick={handleConfirm} disabled={!canStep2} label="Gespräch jetzt buchen" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
