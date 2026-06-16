"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { therapists } from "@/lib/therapists";
import { saveBooking } from "@/lib/bookings";

function useWindowWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // while w===0 (SSR / before first effect), treat as mobile so we never
  // apply alignSelf:"flex-start" on narrow screens before hydration
  return w === 0 ? 375 : w;
}

// ── helpers ──────────────────────────────────────────────────────────
const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstWeekday(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Mon=0
}

const MORNING_SLOTS = ["08:00","09:00","10:00","11:00"];
const AFTERNOON_SLOTS = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];

// deterministic availability by day offset from today
function isAvailableDay(date: Date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.floor((date.getTime() - today.getTime()) / 86400000);
  if (diff < 1) return false;
  const dow = date.getDay();
  if (dow === 0) return false; // no Sunday
  return diff % 3 !== 0;
}

function availableSlots(date: Date) {
  const dow = date.getDay();
  const diff = Math.floor((date.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime()) / 86400000);
  const morning = diff % 2 === 0 ? MORNING_SLOTS : MORNING_SLOTS.slice(1);
  const afternoon = dow === 6 ? AFTERNOON_SLOTS.slice(0,3) : diff % 4 === 1 ? AFTERNOON_SLOTS.slice(2) : AFTERNOON_SLOTS;
  return { morning, afternoon };
}

const GRUND_OPTIONS = [
  "Angst & Sorgen",
  "Depression",
  "Stress & Burnout",
  "Beziehungsprobleme",
  "Trauma",
  "Selbstwert",
  "Sonstiges",
];

// ── Left panel ────────────────────────────────────────────────────────
function LeftPanel({
  t, format, selectedDate, selectedTime, step, isMobile,
}: {
  t: NonNullable<ReturnType<typeof therapists.find>>;
  format: "online" | "vor-ort";
  selectedDate: string;
  selectedTime: string;
  step: number;
  isMobile: boolean;
}) {
  const addr = t.address as { street: string; city: string } | null;

  return (
    <div style={{
      background: "white",
      border: "1px solid #EBEBEB",
      borderRadius: 20,
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      ...(isMobile ? {} : { position: "sticky", top: 88, alignSelf: "flex-start" }),
    }}>
      {/* Therapist */}
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
          <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <div>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, color: "var(--black)", margin: 0 }}>{t.name}</p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", margin: "3px 0 0" }}>{t.role}</p>
          {t.verified && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--green)", fontWeight: 500 }}>Verifiziert</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ height: 1, background: "#F0F0F0" }} />

      {/* Booking summary */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Format */}
        <SummaryRow
          icon={format === "online"
            ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="var(--cta)" strokeWidth="1.6"/></svg>}
          label={format === "online" ? "Online-Sitzung" : "Vor-Ort-Termin"}
        />
        {format === "vor-ort" && addr && (
          <SummaryRow
            icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" stroke="var(--cta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            label={`${addr.street}, ${addr.city}`}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${addr.street}, ${addr.city}`)}`}
          />
        )}
        {selectedDate && (
          <SummaryRow
            icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            label={selectedDate}
          />
        )}
        {selectedTime && (
          <SummaryRow
            icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="var(--cta)" strokeWidth="1.6"/><path d="M12 7v5l3 3" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            label={`${selectedTime} Uhr · ${t.sessionDuration} Min.`}
          />
        )}
        <SummaryRow
          icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M17 6.5C15.6 5.3 13.9 4.5 12 4.5C8.13 4.5 5 7.63 5 11.5C5 15.37 8.13 18.5 12 18.5C13.9 18.5 15.6 17.7 17 16.5" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round"/><path d="M3 10h9M3 13h9" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round"/></svg>}
          label={`€${t.price} / Sitzung`}
        />
      </div>

      {/* Trust badge */}
      <div style={{ background: "var(--green-light)", border: "1px solid #C3EDD0", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        {/* Shield with checkmark */}
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="var(--green)" fillOpacity="0.15" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--green)", margin: 0, lineHeight: 1.6 }}>
          <span style={{ fontWeight: 600 }}>Sichere &amp; verschlüsselte Buchung.</span>{" "}
          <span style={{ fontWeight: 600 }}>Kostenlose Stornierung </span>bis 24h vorher.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)", fontWeight: 500, lineHeight: 1.4, textDecoration: "underline", textUnderlineOffset: 2 }}>{label}</a>
      ) : (
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)", fontWeight: 500, lineHeight: 1.4 }}>{label}</span>
      )}
    </div>
  );
}

// ── Progress ─────────────────────────────────────────────────────────
const STEPS = ["Termin", "Angaben", "Zahlung"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <>
            {/* Step circle + label */}
            <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: done || active ? "var(--cta)" : "white",
                border: done || active ? "2px solid var(--cta)" : "2px solid #D0D0D0",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {done
                  ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  : <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: active ? "white" : "#A0A0A0" }}>{n}</span>
                }
              </div>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: active || done ? 600 : 400, color: active || done ? "var(--cta)" : "#A0A0A0", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {/* Connector — separate flex child so both connectors share space equally */}
            {i < STEPS.length - 1 && (
              <div key={`c${i}`} style={{ flex: 1, height: 2, background: done ? "var(--cta)" : "#E8E8E8", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />
            )}
          </>
        );
      })}
    </div>
  );
}

// ── Step 1: Termin ────────────────────────────────────────────────────
function Step1({
  t, format, setFormat, selectedDate, setSelectedDate, selectedTime, setSelectedTime, onNext,
}: {
  t: NonNullable<ReturnType<typeof therapists.find>>;
  format: "online" | "vor-ort";
  setFormat: (f: "online" | "vor-ort") => void;
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
  onNext: () => void;
}) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDayObj, setSelectedDayObj] = useState<Date | null>(null);

  const canGoNext = !!selectedDate && !!selectedTime;
  const addr = t.address as { street: string; city: string } | null;
  const canVorOrt = t.angebot === "vor-ort" || t.angebot === "beides";
  const canOnline = t.angebot === "online" || t.angebot === "beides";

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstWD = getFirstWeekday(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  const isPrevDisabled = calYear === today.getFullYear() && calMonth === today.getMonth();

  function selectDay(day: number) {
    const date = new Date(calYear, calMonth, day);
    if (!isAvailableDay(date)) return;
    setSelectedDayObj(date);
    const dayNames = ["So","Mo","Di","Mi","Do","Fr","Sa"];
    setSelectedDate(`${dayNames[date.getDay()]}, ${day}. ${MONTHS_DE[calMonth]} ${calYear}`);
    setSelectedTime("");
  }

  const slots = selectedDayObj ? availableSlots(selectedDayObj) : null;

  return (
    <div>
      {/* Format toggle */}
      <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 6px" }}>Termin auswählen</h2>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px" }}>Wähle Deinen bevorzugten Sitzungsformat und Wunschtermin.</p>

      <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 10px" }}>Format</p>
      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        {canOnline && (
          <FormatCard
            active={format === "online"}
            onClick={() => setFormat("online")}
            icon={<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
            title="Online-Sitzung"
            sub="Per Video von überall"
          />
        )}
        {canVorOrt && (
          <FormatCard
            active={format === "vor-ort"}
            onClick={() => setFormat("vor-ort")}
            icon={<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.6"/></svg>}
            title="Vor-Ort-Termin"
            sub={addr ? `${addr.street}, ${addr.city}` : "In der Praxis"}
          />
        )}
      </div>

      {format === "vor-ort" && addr && (
        <div style={{ background: "var(--blue-ultra-light)", border: "1px solid #BFDDFF", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", marginBottom: 28 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="var(--cta)" strokeWidth="1.8"/><circle cx="12" cy="10" r="2" stroke="var(--cta)" strokeWidth="1.8"/></svg>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta)", fontWeight: 500 }}>
            Praxisadresse: {addr.street}, {addr.city}
          </span>
        </div>
      )}

      {/* Calendar */}
      <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 10px" }}>Datum</p>
      <div style={{ border: "1px solid #EBEBEB", borderRadius: 12, padding: "10px", marginBottom: 24 }}>
        {/* Month nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <button onClick={prevMonth} disabled={isPrevDisabled} style={{ background: "none", border: "none", borderRadius: 6, width: 24, height: 24, cursor: isPrevDisabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: isPrevDisabled ? 0.3 : 1 }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
          </button>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, color: "var(--black)" }}>{MONTHS_DE[calMonth]} {calYear}</span>
          <button onClick={nextMonth} style={{ background: "none", border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        {/* Weekday headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 2 }}>
          {DAYS_DE.map(d => (
            <div key={d} style={{ textAlign: "center", fontFamily: "'Poppins',sans-serif", fontSize: 9, fontWeight: 600, color: "#B0B0B0", padding: "2px 0" }}>{d}</div>
          ))}
        </div>
        {/* Days */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
          {Array.from({ length: firstWD }).map((_, i) => <div key={`e${i}`} style={{ aspectRatio: "1" }} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(calYear, calMonth, day);
            const avail = isAvailableDay(date);
            const isSelected = selectedDayObj?.getDate() === day && selectedDayObj?.getMonth() === calMonth && selectedDayObj?.getFullYear() === calYear;
            const isPast = date < today;
            return (
              <button
                key={day}
                onClick={() => avail && selectDay(day)}
                disabled={!avail || isPast}
                style={{
                  width: "100%", aspectRatio: "1", borderRadius: 8,
                  background: isSelected ? "var(--cta)" : avail ? "var(--blue-ultra-light)" : "transparent",
                  color: isSelected ? "white" : avail ? "var(--cta)" : isPast ? "#D8D8D8" : "#C0C0C0",
                  border: "none",
                  fontFamily: "'Poppins',sans-serif", fontWeight: isSelected ? 600 : avail ? 500 : 400,
                  fontSize: 11, cursor: avail ? "pointer" : "default",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (avail && !isSelected) e.currentTarget.style.background = "#D6EBFF"; }}
                onMouseLeave={e => { if (avail && !isSelected) e.currentTarget.style.background = "var(--blue-ultra-light)"; }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {slots && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 12px" }}>Uhrzeit</p>
          {slots.morning.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", fontWeight: 500, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Vormittag</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {slots.morning.map(s => (
                  <TimeChip key={s} time={s} selected={selectedTime === s} onClick={() => setSelectedTime(s)} />
                ))}
              </div>
            </div>
          )}
          {slots.afternoon.length > 0 && (
            <div>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", fontWeight: 500, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Nachmittag &amp; Abend</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {slots.afternoon.map(s => (
                  <TimeChip key={s} time={s} selected={selectedTime === s} onClick={() => setSelectedTime(s)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <CtaRow onNext={onNext} disabled={!canGoNext} nextLabel="Weiter zu Angaben" />
    </div>
  );
}

function FormatCard({ active, onClick, icon, title, sub }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, border: active ? "2px solid var(--cta)" : "2px solid #E8E8E8",
        borderRadius: 14, padding: "16px 14px", background: active ? "var(--blue-ultra-light)" : "white",
        cursor: "pointer", textAlign: "left", transition: "all 0.15s",
        display: "flex", flexDirection: "column", gap: 8,
      }}
    >
      <div style={{ color: active ? "var(--cta)" : "var(--grey-text)" }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: active ? "var(--cta)" : "var(--black)", margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", margin: "3px 0 0", lineHeight: 1.4 }}>{sub}</p>
      </div>
    </button>
  );
}

function TimeChip({ time, selected, onClick }: { time: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px", borderRadius: 9999,
        border: selected ? "2px solid var(--cta)" : "1.5px solid #E0E0E0",
        background: selected ? "var(--cta)" : "white",
        color: selected ? "white" : "var(--black)",
        fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 14,
        cursor: "pointer", transition: "all 0.15s",
      }}
      onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.color = "var(--cta)"; } }}
      onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = "#E0E0E0"; e.currentTarget.style.color = "var(--black)"; } }}
    >
      {time}
    </button>
  );
}

// ── Step 2: Angaben ───────────────────────────────────────────────────
function Step2({
  grund, setGrund, zusatz, setZusatz,
  vorname, setVorname, nachname, setNachname,
  email, setEmail, telefon, setTelefon,
  onBack, onNext,
}: {
  grund: string; setGrund: (v: string) => void;
  zusatz: string; setZusatz: (v: string) => void;
  vorname: string; setVorname: (v: string) => void;
  nachname: string; setNachname: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  telefon: string; setTelefon: (v: string) => void;
  onBack: () => void; onNext: () => void;
}) {
  const canGoNext = !!grund && !!vorname && !!nachname && !!email && !!telefon;

  return (
    <div>
      <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 6px" }}>Deine Angaben</h2>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px" }}>Alle Angaben werden vertraulich behandelt.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Grund */}
        <FormField label="Worum geht es hauptsächlich?" required>
          <div style={{ position: "relative" }}>
            <select
              value={grund}
              onChange={e => setGrund(e.target.value)}
              style={{
                width: "100%", padding: "12px 40px 12px 14px", borderRadius: 10,
                border: "1.5px solid #E0E0E0", fontFamily: "'Poppins',sans-serif", fontSize: 14,
                color: grund ? "var(--black)" : "var(--grey-text)", background: "white",
                appearance: "none", cursor: "pointer", outline: "none",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--cta)"}
              onBlur={e => e.currentTarget.style.borderColor = "#E0E0E0"}
            >
              <option value="" disabled>Bitte wählen…</option>
              {GRUND_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <path stroke="var(--grey-text)" strokeWidth="2" strokeLinecap="round" d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </FormField>

        {/* Zusatz */}
        <FormField label="Zusätzliche Informationen" optional>
          <textarea
            value={zusatz}
            onChange={e => setZusatz(e.target.value)}
            placeholder="Was möchtest Du noch mitteilen? (optional)"
            rows={3}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 10,
              border: "1.5px solid #E0E0E0", fontFamily: "'Poppins',sans-serif", fontSize: 14,
              color: "var(--black)", resize: "vertical", outline: "none", boxSizing: "border-box",
            }}
            onFocus={e => e.currentTarget.style.borderColor = "var(--cta)"}
            onBlur={e => e.currentTarget.style.borderColor = "#E0E0E0"}
          />
        </FormField>

        <div style={{ height: 1, background: "#F0F0F0" }} />

        {/* Name row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FormField label="Vorname" required>
            <TextInput value={vorname} onChange={setVorname} placeholder="Max" />
          </FormField>
          <FormField label="Nachname" required>
            <TextInput value={nachname} onChange={setNachname} placeholder="Mustermann" />
          </FormField>
        </div>

        <FormField label="E-Mail" required>
          <TextInput value={email} onChange={setEmail} placeholder="deine@email.at" type="email" />
        </FormField>

        <FormField label="Telefon" required>
          <TextInput value={telefon} onChange={setTelefon} placeholder="+43 660 123 45 67" type="tel" />
        </FormField>
      </div>

      <div style={{ marginTop: 32 }}>
        <CtaRow onNext={onNext} disabled={!canGoNext} nextLabel="Weiter zur Zahlung" />
      </div>
    </div>
  );
}

function FormField({ label, children, required, optional }: { label: string; children: React.ReactNode; required?: boolean; optional?: boolean }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 13, color: "var(--black)", marginBottom: 6 }}>
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
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        border: "1.5px solid #E0E0E0", fontFamily: "'Poppins',sans-serif", fontSize: 14,
        color: "var(--black)", outline: "none", boxSizing: "border-box", background: "white",
      }}
      onFocus={e => e.currentTarget.style.borderColor = "var(--cta)"}
      onBlur={e => e.currentTarget.style.borderColor = "#E0E0E0"}
    />
  );
}

const KRANKENKASSEN = ["ÖGK", "BVAEB", "SVS", "KFA Wien", "NÖGKK", "STGKK", "BGKK", "KGKK", "OÖGKK", "SGKK", "TGKK", "VGKK", "Privat versichert", "Ich möchte keine Angabe machen"];
const KASSEN_WITH_HINT = ["ÖGK", "BVAEB", "SVS", "KFA Wien", "NÖGKK", "STGKK", "BGKK", "KGKK", "OÖGKK", "SGKK", "TGKK", "VGKK"];

// ── Step 3: Rückerstattung & Zahlung ─────────────────────────────────
function Step3({
  t, format, selectedDate, selectedTime,
  kasseName, setKasseName,
  cardName, setCardName, cardNumber, setCardNumber, cardExpiry, setCardExpiry, cardCvc, setCardCvc,
  agbAccepted, setAgbAccepted,
  onBack, onConfirm,
}: {
  t: NonNullable<ReturnType<typeof therapists.find>>;
  format: "online" | "vor-ort";
  selectedDate: string;
  selectedTime: string;
  kasseName: string; setKasseName: (v: string) => void;
  cardName: string; setCardName: (v: string) => void;
  cardNumber: string; setCardNumber: (v: string) => void;
  cardExpiry: string; setCardExpiry: (v: string) => void;
  cardCvc: string; setCardCvc: (v: string) => void;
  agbAccepted: boolean;
  setAgbAccepted: (v: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const addr = t.address as { street: string; city: string } | null;
  const [payMethod, setPayMethod] = useState<"card" | "paypal" | "apple-pay" | "google-pay">("card");
  const cardValid = payMethod === "card"
    ? (!!cardName && cardNumber.replace(/\s/g,"").length >= 16 && cardExpiry.length === 5 && cardCvc.length >= 3)
    : true;
  const canConfirm = agbAccepted && cardValid;
  const showKasseHint = KASSEN_WITH_HINT.includes(kasseName);

  function formatCardNumber(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  }

  const F = "'Poppins',sans-serif";

  return (
    <div>
      <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 6px" }}>Rückerstattung &amp; Zahlung</h2>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px" }}>Überprüfe Deine Buchung und schließe sie ab.</p>

      {/* Booking summary */}
      <div style={{ border: "1px solid #EBEBEB", borderRadius: 16, padding: "20px 24px", marginBottom: 24, background: "#FAFBFD" }}>
        <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "var(--black)", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Terminübersicht</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px", marginBottom: 16 }}>
          <BookingLine label="Fachkraft" value={t.name} />
          <BookingLine label="Format" value={format === "online" ? "Online-Sitzung" : "Vor-Ort-Termin"} />
          <BookingLine label="Datum" value={selectedDate} />
          <BookingLine label="Uhrzeit" value={`${selectedTime} · ${t.sessionDuration} Min.`} />
          {format === "vor-ort" && addr && (
            <div style={{ gridColumn: "1 / -1" }}>
              <BookingLine label="Adresse" value={`${addr.street}, ${addr.city}`} />
            </div>
          )}
        </div>
        <div style={{ height: 1, background: "#E8E8E8", margin: "0 0 14px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>Sitzungspreis</span>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", fontWeight: 500 }}>€{t.price} / {t.sessionDuration} Min.</span>
          </div>
          {t.kassenerstattung && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>Kassenrückerstattung</span>
              <span style={{ fontFamily: F, fontSize: 14, color: "var(--green)", fontWeight: 500 }}>möglich</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)" }}>Zahlung heute</span>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "var(--cta)" }}>€{t.price}</span>
          </div>
        </div>
      </div>

      {/* Kassenrückerstattung info */}
      {t.kassenerstattung && (
        <div style={{ background: "var(--green-light)", border: "1px solid #C3EDD0", borderRadius: 12, padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" fill="var(--green)" fillOpacity="0.2" stroke="var(--green)" strokeWidth="1.5"/>
              <path d="M12 8v4M12 16h.01" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "0 0 4px" }}>Kassenrückerstattung möglich</p>
              <p style={{ fontFamily: F, fontSize: 13, color: "#2D5530", margin: 0, lineHeight: 1.6 }}>
                Du bezahlst die Sitzung zunächst selbst. Nach dem Termin erhältst Du eine Honorarnote, die Du bei Deiner Krankenkasse einreichen kannst.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Krankenkasse dropdown — informational, only when kassenerstattung */}
      {t.kassenerstattung && (
        <>
          <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 8px" }}>Deine Krankenkasse <span style={{ fontWeight: 400, color: "var(--grey-text)", fontSize: 13 }}>(optional)</span></p>
          <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "0 0 10px", lineHeight: 1.5 }}>Diese Angabe hilft uns, Dir nach dem Termin die passende Honorarnote bereitzustellen.</p>
          <div style={{ marginBottom: 24 }}>
            <div style={{ position: "relative" }}>
              <select
                value={kasseName}
                onChange={e => setKasseName(e.target.value)}
                style={{
                  width: "100%", padding: "12px 36px 12px 14px", borderRadius: 10,
                  border: "1.5px solid #E0E0E0", fontFamily: F, fontSize: 14,
                  color: "var(--black)", outline: "none",
                  boxSizing: "border-box" as const, background: "white", cursor: "pointer",
                  appearance: "none" as const,
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--cta)"}
                onBlur={e => e.currentTarget.style.borderColor = "#E0E0E0"}
              >
                <option value="" style={{ color: "#1A1A1A" }}>Bitte wählen …</option>
                {KRANKENKASSEN.map(k => <option key={k} value={k} style={{ color: "#1A1A1A" }}>{k}</option>)}
              </select>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <path d="M6 9l6 6 6-6" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {showKasseHint && (
              <div style={{ background: "var(--blue-ultra-light)", border: "1px solid #C8DFFF", borderRadius: 10, padding: "14px 16px", marginTop: 12 }}>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--cta)", margin: "0 0 4px" }}>Hinweis zur Rückerstattung</p>
                <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0, lineHeight: 1.6 }}>
                  Die genaue Höhe der Rückerstattung hängt von Deiner Krankenkasse und den Voraussetzungen ab. Nach dem Termin stellen wir Dir die benötigte Honorarnote in Deinem Profil bereit.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Zahlungsmethode */}
      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 12px" }}>Zahlungsmethode</p>
      <div style={{ border: "1px solid #EBEBEB", borderRadius: 12, padding: "20px", marginBottom: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {([
            { key: "card", label: "Kreditkarte" },
            { key: "paypal", src: "/icons/paypal.svg" },
            { key: "apple-pay", src: "/icons/apple-pay.svg" },
            { key: "google-pay", src: "/icons/google-pay.svg" },
          ] as { key: string; label?: string; src?: string }[]).map(m => (
            <button
              key={m.key}
              onClick={() => setPayMethod(m.key as typeof payMethod)}
              style={{
                border: payMethod === m.key ? "2px solid var(--cta)" : "1.5px solid #E0E0E0",
                borderRadius: 10, padding: "8px 14px", background: payMethod === m.key ? "var(--blue-ultra-light)" : "white",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
              }}
            >
              {m.label && <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: payMethod === m.key ? "var(--cta)" : "var(--black)" }}>{m.label}</span>}
              {m.src && <img src={m.src} alt={m.key} style={{ height: 20, width: "auto", display: "block" }} />}
            </button>
          ))}
        </div>

        {payMethod === "card" && (
          <>
            <FormField label="Karteninhaber" required>
              <TextInput value={cardName} onChange={setCardName} placeholder="Vorname Nachname" />
            </FormField>
            <FormField label="Kartennummer" required>
              <TextInput value={cardNumber} onChange={v => setCardNumber(formatCardNumber(v))} placeholder="0000 0000 0000 0000" />
            </FormField>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FormField label="Ablaufdatum" required>
                <TextInput value={cardExpiry} onChange={v => setCardExpiry(formatExpiry(v))} placeholder="MM/JJ" />
              </FormField>
              <FormField label="CVC" required>
                <TextInput value={cardCvc} onChange={v => setCardCvc(v.replace(/\D/g,"").slice(0,4))} placeholder="123" />
              </FormField>
            </div>
          </>
        )}
        {payMethod !== "card" && (
          <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
            Du wirst nach dem Klick auf „Sicher bezahlen" zur Zahlungsseite weitergeleitet.
          </p>
        )}
      </div>

      {/* Stornierung */}
      <div style={{ border: "1px solid #E8E8E8", borderRadius: 12, padding: "16px 18px", marginBottom: 24 }}>
        <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "0 0 6px" }}>Stornierung</p>
        <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>
          Du kannst Deinen Termin bis 24&nbsp;Stunden vor Beginn kostenfrei stornieren. Der vollständige Betrag wird automatisch auf dieselbe Zahlungsmethode zurückerstattet.
        </p>
      </div>

      {/* AGB */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 28, background: agbAccepted ? "transparent" : "var(--blue-ultra-light)", borderRadius: 10, padding: "12px", border: agbAccepted ? "none" : "1.5px solid #C8DFFF", transition: "all 0.2s" }}>
        <div
          onClick={() => setAgbAccepted(!agbAccepted)}
          style={{
            width: 20, height: 20, borderRadius: 5, border: agbAccepted ? "2px solid var(--cta)" : "2px solid #C0C0C0",
            background: agbAccepted ? "var(--cta)" : "white", flexShrink: 0, marginTop: 1,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
          }}
        >
          {agbAccepted && <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
        </div>
        <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.5 }}>
          Ich akzeptiere die <a href="#" style={{ color: "var(--cta)", textDecoration: "underline" }}>AGB</a> und die <a href="#" style={{ color: "var(--cta)", textDecoration: "underline" }}>Datenschutzerklärung</a>.
        </span>
      </label>

      <CtaRow onNext={onConfirm} disabled={!canConfirm} nextLabel={
        payMethod === "paypal" ? "Weiter zu PayPal" :
        payMethod === "apple-pay" ? "Weiter zu Apple Pay" :
        payMethod === "google-pay" ? "Weiter zu Google Pay" :
        "Sicher bezahlen &amp; Termin buchen"
      } />
    </div>
  );
}

function BookingLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#9E9E9E", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ── Step 4: Confirmation ──────────────────────────────────────────────
const NEXT_STEPS = [
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Bestätigung erhalten", desc: "Du erhältst eine E-Mail mit allen Details." },
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Termin reserviert", desc: "Dein Termin ist verbindlich für Dich reserviert." },
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Erinnerung", desc: "Du erhältst 24h vor dem Termin eine Erinnerung." },
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Erstgespräch", desc: "Wir begleiten Dich auf Deinem Weg." },
];

const KONTO_FEATURES = [
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Online-Sitzungen", desc: "Nimm sicher und bequem an Deinen Sitzungen teil." },
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Terminverwaltung", desc: "Sieh alle Deine Termine ein und verwalte sie einfach." },
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Umbuchung & Stornierung", desc: "Ändere oder storniere Termine mit wenigen Klicks." },
  { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Nachrichten & Erinnerungen", desc: "Erhalte wichtige Infos und Erinnerungen rechtzeitig." },
];

function Confirmation({
  t, format, selectedDate, selectedTime, isMobile, isPhone,
}: {
  t: NonNullable<ReturnType<typeof therapists.find>>;
  format: "online" | "vor-ort";
  selectedDate: string;
  selectedTime: string;
  isMobile: boolean;
  isPhone: boolean; // same as isMobile — kept for internal use
}) {
  const addr = t.address as { street: string; city: string } | null;
  const F = "'Poppins',sans-serif";

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: isPhone ? "32px 16px 64px" : isMobile ? "40px 28px 64px" : "48px 40px 64px" }}>

      {/* ── Hero (full width, centered) ── */}
      <div style={{ marginBottom: 20, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-light)", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <svg width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isPhone ? 22 : 28, color: "var(--black)", margin: "0 0 8px" }}>Dein Termin ist bestätigt!</h2>
        <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px", lineHeight: 1.6 }}>Vielen Dank für Dein Vertrauen.<br/>Eine Bestätigung wurde an Deine E-Mail-Adresse gesendet.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>
          {[
            { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: selectedDate },
            { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="var(--cta)" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: `${selectedTime} Uhr · ${t.sessionDuration} Min.` },
            ...(addr ? [{ icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="var(--cta)" strokeWidth="1.8"/></svg>, label: `${addr.street}, ${addr.city}` }] : [{ icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: "Online-Sitzung" }]),
            { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M17 6.5C15.6 5.3 13.9 4.5 12 4.5C8.13 4.5 5 7.63 5 11.5C5 15.37 8.13 18.5 12 18.5C13.9 18.5 15.6 17.7 17 16.5" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/><path d="M3 10h9M3 13h9" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: `€${t.price} bezahlt` },
          ].map((chip, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: "1px solid #E8E8E8", borderRadius: 9999, padding: "8px 16px" }}>
              {chip.icon}
              <span style={{ fontFamily: F, fontSize: 13, color: "var(--black)", fontWeight: 500 }}>{chip.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Therapist card + Was passiert als Nächstes + Info cards ── */}
      <div style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: isMobile ? undefined : "300px 1fr 280px", flexDirection: isMobile ? "column" : undefined, gap: isMobile ? 24 : 24, marginBottom: 32, alignItems: "stretch" }}>
        {/* Left: therapist card */}
        <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: "0 0 340px", overflow: "hidden" }}>
            <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
          <div style={{ padding: "16px 20px", flex: 1 }}>
            <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic" }}>
              „Ich freue mich darauf, Dich kennenzulernen und gemeinsam den passenden Weg für Dich zu finden."
            </p>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>{t.name}</p>
            <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: "3px 0 0" }}>{t.role}</p>
          </div>
        </div>

        {/* Middle: Was passiert als Nächstes — timeline */}
        <div style={{ backgroundImage: isMobile ? "none" : "url('/Was passiert als Nächstes_Banner.jpg')", backgroundSize: "cover", backgroundPosition: "center", background: isMobile ? "white" : undefined, border: "1px solid #EBEBEB", borderRadius: 20, padding: isMobile ? 20 : 28 }}>
          <h3 style={{ fontFamily: F, fontWeight: 600, fontSize: isMobile ? 16 : 18, color: "var(--black)", margin: "0 0 28px" }}>Was passiert als Nächstes?</h3>
          <div>
            {NEXT_STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 36 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--blue-ultra-light)", border: "2px solid var(--cta)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                    {s.icon}
                  </div>
                  {i < NEXT_STEPS.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: "linear-gradient(to bottom, var(--cta), #C8DFFF)", opacity: 0.4, margin: "3px 0" }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < NEXT_STEPS.length - 1 ? 24 : 0 }}>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "7px 0 4px" }}>{s.title}</p>
                  <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Rückerstattung vorbereiten */}
          <div style={{ background: "var(--blue-ultra-light)", border: "1px solid #C8DFFF", borderRadius: 20, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="9" stroke="var(--cta)" strokeWidth="1.6"/>
                <path d="M12 8v4M12 16h.01" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: 0 }}>Rückerstattung vorbereiten</p>
            </div>
            <p style={{ fontFamily: F, fontSize: 12, color: "var(--black)", margin: "0 0 8px", lineHeight: 1.6 }}>
              Nach dem Termin findest Du Deine Honorarnote in Deinem Konto. Du kannst sie anschließend bei Deiner Krankenkasse einreichen.
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" fill="var(--cta)" fillOpacity="0.12" stroke="var(--cta)" strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily: F, fontSize: 12, color: "var(--black)", lineHeight: 1.5 }}>Vollständige Rückerstattung auf dieselbe Zahlungsmethode</span>
            </div>
          </div>

          {/* Wichtige Informationen */}
          <div style={{ background: "var(--green-light)", border: "1px solid #C3EDD0", borderRadius: 20, padding: 20, flex: 1 }}>
            <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "0 0 12px" }}>Wichtige Informationen</p>
            {[
              "Kostenfreie Stornierung bis 24 Stunden vor Terminbeginn",
              "Sorge für einen ruhigen, ungestörten Ort während der Sitzung.",
              "Termin kann im Profil verwaltet werden",
              "Erinnerung per E-Mail vor dem Termin",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: i < 3 ? 8 : 0 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" fill="var(--green)" fillOpacity="0.2" stroke="var(--green)" strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontFamily: F, fontSize: 12, color: "var(--black)", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Calendar + Profile buttons ── */}
      <div style={{ display: "flex", flexDirection: isPhone ? "column" : "row", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 32 }}>
        <a
          href={(() => {
            const raw = selectedDate.replace(/^[A-Za-zÄäÖöÜüß]+,\s*/, "").replace(".", "").trim().split(" ");
            const day = (raw[0] || "01").padStart(2, "0");
            const month = String(MONTHS_DE.indexOf(raw[1]) + 1).padStart(2, "0");
            const year = raw[2] || "2026";
            const [hh, mm] = selectedTime.split(":");
            const totalEnd = parseInt(mm || "0") + (t.sessionDuration || 50);
            const eHh = String(parseInt(hh || "0") + Math.floor(totalEnd / 60)).padStart(2, "0");
            const eMm = String(totalEnd % 60).padStart(2, "0");
            const dtS = `${year}${month}${day}T${hh}${mm}00`;
            const dtE = `${year}${month}${day}T${eHh}${eMm}00`;
            const loc = addr ? `${addr.street}, ${addr.city}` : "Online";
            return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Termin bei ${t.name}`)}&dates=${dtS}/${dtE}&location=${encodeURIComponent(loc)}`;
          })()}
          target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "white", border: "1.5px solid var(--cta)", borderRadius: 9999, padding: "11px 22px", fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--cta)", textDecoration: "none", transition: "all 0.2s", ...(isPhone ? { width: "100%", boxSizing: "border-box" as const } : {}) }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "var(--blue-ultra-light)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(45,91,141,0.15)"; }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "white"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="var(--cta)" strokeWidth="2" strokeLinecap="round"/></svg>
          Zum Kalender hinzufügen
        </a>
        <a href="/profil"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--cta)", border: "1.5px solid var(--cta)", borderRadius: 9999, padding: "11px 22px", fontFamily: F, fontWeight: 600, fontSize: 14, color: "white", textDecoration: "none", transition: "all 0.2s", ...(isPhone ? { width: "100%", boxSizing: "border-box" as const } : {}) }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "var(--cta-hover)"; e.currentTarget.style.borderColor = "var(--cta-hover)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(45,91,141,0.3)"; }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "var(--cta)"; e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/></svg>
          Zum Profil
        </a>
      </div>

      {/* ── Konto banner (full width) ── */}
      <div style={{ borderRadius: isMobile ? 16 : 24, backgroundImage: "url('/KontoBanner.png')", backgroundSize: "cover", backgroundPosition: "center", padding: isMobile ? "28px 20px" : "48px 56px", marginBottom: 32, position: "relative", overflow: "hidden" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1 }}>
          {/* Features */}
          <div>
            <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "var(--cta)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Dein kostenloser Account</p>
            <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 20 : 26, color: "var(--black)", margin: "0 0 20px", lineHeight: 1.3 }}>Verwalte Deine Therapie an einem Ort</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px" }}>
              {KONTO_FEATURES.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backdropFilter: "blur(4px)" }}>
                    {f.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: "var(--black)", margin: "4px 0 2px" }}>{f.title}</p>
                    <p style={{ fontFamily: F, fontSize: 11, color: "#444", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons — full width on mobile */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="/anmelden"
              style={{ display: "block", textAlign: "center", background: "var(--cta)", color: "white", borderRadius: 9999, padding: "13px 24px", fontFamily: F, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(45,91,141,0.3)", boxSizing: "border-box" as const }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "var(--cta-hover)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,91,141,0.4)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "var(--cta)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,91,141,0.3)"; }}
            >Anmelden</a>
            <a href="/registrieren"
              style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,0.75)", color: "var(--cta)", borderRadius: 9999, padding: "13px 24px", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", border: "1.5px solid var(--cta)", transition: "all 0.2s", boxSizing: "border-box" as const }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "white"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "rgba(255,255,255,0.75)"; }}
            >Konto erstellen</a>
          </div>
        </div>
      </div>


    </div>
  );
}

// ── CTA row ───────────────────────────────────────────────────────────
function CtaRow({ onNext, disabled, nextLabel }: {
  onNext: () => void;
  disabled: boolean;
  nextLabel: string;
}) {
  return (
    <button
      onClick={onNext}
      disabled={disabled}
      style={{
        width: "100%", height: 52, borderRadius: 9999,
        background: disabled ? "#B0C4D8" : "var(--cta)",
        color: "white", border: "none",
        fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "background 0.2s",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "var(--cta-hover)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "var(--cta)"; }}
      dangerouslySetInnerHTML={{ __html: nextLabel + `<svg width="14" height="14" fill="none" viewBox="0 0 24 24" style="margin-left:4px"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/></svg>` }}
    />
  );
}

// ── Main page ─────────────────────────────────────────────────────────
export default function BuchenPage() {
  const { id } = useParams<{ id: string }>();
  const t = therapists.find(th => String(th.id) === String(id));
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;

  const [step, setStep] = useState(1);
  const [format, setFormat] = useState<"online" | "vor-ort">(
    t?.angebot === "vor-ort" ? "vor-ort" : "online"
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [grund, setGrund] = useState("");
  const [zusatz, setZusatz] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [kasseName, setKasseName] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [agbAccepted, setAgbAccepted] = useState(false);

  if (!t) {
    return (
      <main style={{ minHeight: "100vh", background: "white" }}>
        <Navbar />
        <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", fontFamily: "'Poppins',sans-serif" }}>
          <h1 style={{ fontSize: 24, color: "var(--black)" }}>Fachkraft nicht gefunden</h1>
          <a href="/fachkraefte" style={{ color: "var(--cta)", textDecoration: "none", fontSize: 15, marginTop: 16, display: "inline-block" }}>← Zurück zur Suche</a>
        </div>
        <Footer />
      </main>
    );
  }

  const isConfirmed = step === 4;

  function goToStep(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main style={{ background: "#F8FAFE", minHeight: "100vh" }}>
      <Navbar />

      {!isConfirmed && <div style={{ width: "100%", maxWidth: 1150, margin: "0 auto", padding: isMobile ? "24px 16px 64px" : "40px 24px 64px", boxSizing: "border-box" as const }}>

        {/* Page title */}
        <div style={{ marginBottom: 16 }}>
          {!isConfirmed && (
            <button onClick={() => step > 1 ? goToStep(step - 1) : window.history.back()} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", textDecoration: "none", marginBottom: 20, cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
              Zurück
            </button>
          )}
          {!isConfirmed && (
            <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "var(--black)", margin: 0, lineHeight: 1.25 }} >
              Termin buchen
            </h1>
          )}
        </div>

        {/* Layout */}
        <div style={{
          width: "100%",
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "320px 1fr",
          gap: isMobile ? 20 : 28,
          alignItems: isMobile ? "stretch" : "flex-start",
        }}>
          {/* Left: summary */}
          {!isConfirmed && (
            <LeftPanel
              t={t}
              format={format}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              step={step}
              isMobile={isMobile}
            />
          )}

          {/* Right: step content */}
          {!isConfirmed && (
            <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: isMobile ? "24px 18px" : "36px 40px" }}>
              <ProgressBar step={step} />
              {step === 1 && (
                <Step1
                  t={t}
                  format={format}
                  setFormat={v => { setFormat(v); setSelectedTime(""); }}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  onNext={() => goToStep(2)}
                />
              )}
              {step === 2 && (
                <Step2
                  grund={grund} setGrund={setGrund}
                  zusatz={zusatz} setZusatz={setZusatz}
                  vorname={vorname} setVorname={setVorname}
                  nachname={nachname} setNachname={setNachname}
                  email={email} setEmail={setEmail}
                  telefon={telefon} setTelefon={setTelefon}
                  onBack={() => goToStep(1)}
                  onNext={() => goToStep(3)}
                />
              )}
              {step === 3 && (
                <Step3
                  t={t}
                  format={format}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  kasseName={kasseName}
                  setKasseName={setKasseName}
                  cardName={cardName}
                  setCardName={setCardName}
                  cardNumber={cardNumber}
                  setCardNumber={setCardNumber}
                  cardExpiry={cardExpiry}
                  setCardExpiry={setCardExpiry}
                  cardCvc={cardCvc}
                  setCardCvc={setCardCvc}
                  agbAccepted={agbAccepted}
                  setAgbAccepted={setAgbAccepted}
                  onBack={() => goToStep(2)}
                  onConfirm={() => {
                    saveBooking({
                      therapistId: String(t.id),
                      therapistName: t.name,
                      therapistRole: t.role,
                      therapistPhoto: t.photo,
                      date: selectedDate,
                      time: selectedTime,
                      format,
                      status: "confirmed",
                    });
                    goToStep(4);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>}

      {isConfirmed && (
        <Confirmation t={t} format={format} selectedDate={selectedDate} selectedTime={selectedTime} isMobile={isMobile} isPhone={isMobile} />
      )}

      <Footer />
    </main>
  );
}
