"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getBookings, type Booking } from "@/lib/bookings";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstWeekday(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

const MORNING_SLOTS = ["08:00","09:00","10:00","11:00"];
const AFTERNOON_SLOTS = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];

function isAvailableDay(date: Date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.floor((date.getTime() - today.getTime()) / 86400000);
  if (diff < 1) return false;
  if (date.getDay() === 0) return false;
  return diff % 3 !== 0;
}

function availableSlots(date: Date) {
  const dow = date.getDay();
  const diff = Math.floor((date.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime()) / 86400000);
  const morning = diff % 2 === 0 ? MORNING_SLOTS : MORNING_SLOTS.slice(1);
  const afternoon = dow === 6 ? AFTERNOON_SLOTS.slice(0,3) : diff % 4 === 1 ? AFTERNOON_SLOTS.slice(2) : AFTERNOON_SLOTS;
  return { morning, afternoon };
}

function CalIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function ClockIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

function TimeChip({ time, selected, onClick }: { time: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 36, padding: "0 14px", borderRadius: 9999,
        fontFamily: F, fontSize: 13,
        background: selected ? CTA : "var(--blue-ultra-light)",
        color: selected ? "white" : CTA,
        border: `1.5px solid ${selected ? CTA : "transparent"}`,
        cursor: "pointer", transition: "all 0.15s",
        display: "flex", alignItems: "center", gap: 5,
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "#D6EBFF"; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "var(--blue-ultra-light)"; }}
    >
      <ClockIcon /> {time}
    </button>
  );
}

export default function TerminVerschiebenPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const today = new Date(); today.setHours(0,0,0,0);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDayObj, setSelectedDayObj] = useState<Date | null>(null);

  useEffect(() => {
    const b = getBookings().find(x => x.id === id) ?? null;
    setBooking(b);
  }, [id]);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstWD = getFirstWeekday(calYear, calMonth);
  const isPrevDisabled = calYear === today.getFullYear() && calMonth === today.getMonth();

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  function selectDay(day: number) {
    const date = new Date(calYear, calMonth, day);
    if (!isAvailableDay(date)) return;
    setSelectedDayObj(date);
    const dayNames = ["So","Mo","Di","Mi","Do","Fr","Sa"];
    setSelectedDate(`${dayNames[date.getDay()]}, ${day}. ${MONTHS_DE[calMonth]} ${calYear}`);
    setSelectedTime("");
  }

  const slots = selectedDayObj ? availableSlots(selectedDayObj) : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate) { setError("Bitte wählen Sie ein Datum."); return; }
    if (!selectedTime) { setError("Bitte wählen Sie eine Uhrzeit."); return; }
    setError("");
    setDone(true);
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "#F4F7FB", minHeight: "calc(100vh - 72px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", gap: 6 }}>
          <a href="/profil" style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = CTA)}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
          >Mein Konto</a>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: F, fontSize: 13, color: CTA, fontWeight: 500 }}>Termin verschieben</span>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto 64px", padding: "0 40px" }}>
          {done ? (
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 40, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "var(--black)", margin: "0 0 10px" }}>Termin verschoben</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.7 }}>
                Ihr Termin wurde erfolgreich auf <strong>{selectedDate}</strong> um <strong>{selectedTime} Uhr</strong> verschoben.<br />
                Eine Bestätigung erhalten Sie per E-Mail.
              </p>
              <a href="/profil" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 500, fontSize: 14, textDecoration: "none" }}>
                Zurück zum Konto
              </a>
            </div>
          ) : (
            <>
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 6px" }}>Termin verschieben</h1>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px" }}>Wählen Sie ein neues Datum und eine neue Uhrzeit für Ihren Termin.</p>

              {/* Current booking */}
              {booking && (
                <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "16px 20px", marginBottom: 20 }}>
                  <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "var(--grey-text)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px" }}>Aktueller Termin</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    {booking.therapistPhoto ? (
                      <img src={booking.therapistPhoto} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: CTA, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: F, fontWeight: 700, fontSize: 16 }}>
                        {booking.therapistName.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                      </div>
                    )}
                    <div>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "var(--black)", margin: 0 }}>{booking.therapistName}</p>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{booking.therapistRole}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 20 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13, color: "var(--grey-text)" }}><CalIcon /> {booking.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13, color: "var(--grey-text)" }}><ClockIcon /> {booking.time} Uhr</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 28 }}>
                <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)", margin: "0 0 22px" }}>Neuen Termin wählen</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                  {/* Calendar */}
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 10px" }}>Datum</p>
                    <div style={{ border: "1px solid #EBEBEB", borderRadius: 12, padding: 10 }}>
                      {/* Month nav */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <button type="button" onClick={prevMonth} disabled={isPrevDisabled} style={{ background: "none", border: "none", borderRadius: 6, width: 28, height: 28, cursor: isPrevDisabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: isPrevDisabled ? 0.3 : 1 }}>
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
                        </button>
                        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)" }}>{MONTHS_DE[calMonth]} {calYear}</span>
                        <button type="button" onClick={nextMonth} style={{ background: "none", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
                        </button>
                      </div>
                      {/* Weekday headers */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 2 }}>
                        {DAYS_DE.map(d => (
                          <div key={d} style={{ textAlign: "center", fontFamily: F, fontSize: 9, fontWeight: 600, color: "#B0B0B0", padding: "2px 0" }}>{d}</div>
                        ))}
                      </div>
                      {/* Days */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
                        {Array.from({ length: firstWD }).map((_, i) => <div key={`e${i}`} style={{ aspectRatio: "1" }} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const date = new Date(calYear, calMonth, day);
                          const avail = isAvailableDay(date);
                          const isPast = date < today;
                          const isSelected = selectedDayObj?.getDate() === day && selectedDayObj?.getMonth() === calMonth && selectedDayObj?.getFullYear() === calYear;
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => avail && selectDay(day)}
                              disabled={!avail || isPast}
                              style={{
                                width: "100%", aspectRatio: "1", borderRadius: 8,
                                background: isSelected ? CTA : avail ? "var(--blue-ultra-light)" : "transparent",
                                color: isSelected ? "white" : avail ? CTA : isPast ? "#D8D8D8" : "#C0C0C0",
                                border: "none",
                                fontFamily: F, fontWeight: isSelected ? 600 : avail ? 500 : 400,
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
                  </div>

                  {/* Time slots */}
                  {slots && (
                    <div>
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
                          <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", fontWeight: 500, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Nachmittag &amp; Abend</p>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {slots.afternoon.map(s => <TimeChip key={s} time={s} selected={selectedTime === s} onClick={() => setSelectedTime(s)} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Policy */}
                  <div style={{ background: "#FFF8F0", border: "1px solid #FDE8C8", borderRadius: 10, padding: "12px 14px", display: "flex", gap: 8 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    <p style={{ fontFamily: F, fontSize: 13, color: "#92400E", margin: 0, lineHeight: 1.6 }}>
                      <strong>Hinweis:</strong> Kostenlose Umbuchung bis 24 Stunden vor dem aktuellen Termin. Bei kurzfristiger Änderung können Kosten anfallen.
                    </p>
                  </div>

                  {error && <p style={{ fontFamily: F, fontSize: 13, color: "#DC2626", margin: 0 }}>{error}</p>}

                  <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                    <a href="/profil" style={{ height: 44, padding: "0 22px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", fontFamily: F, fontSize: 14, display: "flex", alignItems: "center", textDecoration: "none" }}>
                      Abbrechen
                    </a>
                    <button type="submit" style={{ height: 44, padding: "0 28px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 14, cursor: "pointer", opacity: selectedDate && selectedTime ? 1 : 0.5 }}>
                      Termin verschieben
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
