"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoredUser, type AuthUser } from "@/lib/auth";
import { saveBooking } from "@/lib/bookings";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

const LOCATIONS = [
  { id: "wien",       city: "Wien",      address: "Nibelungengasse 11, 3. OG, Tür 15", zip: "1010 Wien",      transit: "U2/U4 Karlsplatz, U2 Museumsquartier" },
  { id: "linz",       city: "Linz",      address: "Bockgasse 3, EG",                  zip: "4020 Linz",      transit: "10 Min. vom Hauptbahnhof" },
  { id: "salzburg",   city: "Salzburg",  address: "Bergstraße 22",                    zip: "5020 Salzburg",  transit: "Mirabellplatz / Makartplatz" },
  { id: "graz",       city: "Graz",      address: "Kaiserfeldgasse 17, 3. OG",        zip: "8010 Graz",      transit: "Nahe Jakominiplatz" },
  { id: "innsbruck",  city: "Innsbruck", address: "Maximilianstraße 2, 3. OG, Zi. 358", zip: "6020 Innsbruck", transit: "8 Min. vom Hauptbahnhof" },
  { id: "klagenfurt", city: "Klagenfurt",address: "Mozartstraße 90, Stiege 3, 2. OG", zip: "9020 Klagenfurt", transit: "10 Min. zu Fuß erreichbar" },
  { id: "dornbirn",   city: "Dornbirn",  address: "FH Vorarlberg, Hochschulstr. 1, Geb. V, 7. OG, Zi. V708", zip: "6850 Dornbirn", transit: "FH Vorarlberg Campus" },
];

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
function LeftPanel({ format, locationId, selectedDate, selectedTime, isMobile }: {
  format: "online" | "vor-ort"; locationId: string; selectedDate: string; selectedTime: string; isMobile: boolean;
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
            : [{ icon: <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={CTA} strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke={CTA} strokeWidth="1.6"/></svg>, label: `Vor Ort – ${LOCATIONS.find(l => l.id === locationId)?.city ?? ""}` }]),
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
function Confirmation({ format, location, selectedDate, selectedTime, selectedDayObj, isMobile, user }: {
  format: "online" | "vor-ort"; location: typeof LOCATIONS[0]; selectedDate: string; selectedTime: string; selectedDayObj: Date | null; isMobile: boolean; user: AuthUser | null;
}) {
  const KONTO_FEATURES = [
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Termine verwalten", desc: "Alle Buchungen auf einen Blick" },
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Nachrichten", desc: "Direkt mit deinem Berater schreiben" },
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={CTA} strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Fachkräfte finden", desc: "Passende Therapeuten entdecken" },
    { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={CTA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Sicher & vertraulich", desc: "DSGVO-konform, jederzeit löschbar" },
  ];

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "32px 16px 64px" : "48px 40px 80px" }}>
      {/* Success header */}
      <div style={{ textAlign: "center", marginBottom: 32, maxWidth: 680, margin: "0 auto 32px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EDFAEB", border: "2px solid #C3EDD0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "var(--black)", margin: "0 0 8px" }}>Dein Erstgespräch ist gebucht!</h1>
        <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: "0 0 24px", lineHeight: 1.6 }}>
          Wir freuen uns auf das Gespräch mit dir. Eine Bestätigung wurde an deine E-Mail-Adresse gesendet.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {[selectedDate, `${selectedTime} Uhr · 30 Min.`, format === "online" ? "Online per Video" : `Vor Ort – ${location.city}`, "Kostenlos"].map((chip, i) => (
            <div key={i} style={{ background: "white", border: "1px solid #E8E8E8", borderRadius: 9999, padding: "7px 16px", fontFamily: F, fontSize: 13, color: "var(--black)", fontWeight: 500 }}>{chip}</div>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {/* Was passiert als Nächstes — timeline style */}
        <div style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 20, padding: "28px 26px" }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 24px" }}>Was passiert als Nächstes?</p>
          {([
            { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Bestätigung erhalten", desc: "Du erhältst eine Bestätigungs-E-Mail mit allen Details." },
            { icon: format === "online"
              ? <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke={CTA} strokeWidth="1.6"/><path d="M8 21h8M12 17v4" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>
              : <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={CTA} strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke={CTA} strokeWidth="1.6"/></svg>,
              title: format === "online" ? "Video-Link erhalten" : "Adresse notieren",
              desc: format === "online" ? "Den Videoanruf-Link bekommst du kurz vor dem Termin." : `${location.address}, ${location.zip}` },
            { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Erinnerung erhalten", desc: "Wir senden dir eine Erinnerung kurz vor dem Gespräch." },
            { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={CTA} strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, title: "Fachkraft finden", desc: "Nach dem Gespräch empfehlen wir dir passende Fachkräfte." },
          ] as { icon: React.ReactNode; title: string; desc: string }[]).map((s, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 36 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--blue-ultra-light)", border: `2px solid ${CTA}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                  {s.icon}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 20, background: "linear-gradient(to bottom, var(--cta), #C8DFFF)", opacity: 0.35, margin: "3px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "7px 0 3px" }}>{s.title}</p>
                <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Wichtige Informationen */}
        <div style={{ background: "var(--blue-ultra-light)", border: "1px solid #C8DFFF", borderRadius: 20, padding: "28px 26px", display: "flex", flexDirection: "column" }}>
          <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 20px" }}>Wichtige Informationen</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.6"/><path d="M12 7v5l3 3" stroke={CTA} strokeWidth="1.6" strokeLinecap="round"/></svg>, text: "Das Gespräch dauert ca. 30 Minuten." },
              { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Sorge für einen ruhigen, ungestörten Ort." },
              { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Du kannst dein Anliegen offen schildern – wir hören zu." },
              { icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={CTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: "Kostenfreie Absage bis 24h vorher möglich." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", lineHeight: 1.55, marginTop: 6 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", marginBottom: 32 }}>
        {/* Add to calendar — generates .ics download */}
        <button
          onClick={() => {
            const pad = (n: number) => String(n).padStart(2, "0");
            const dateObj = new Date(selectedDayObj ?? new Date());
            const [hh, mm] = selectedTime.split(":").map(Number);
            const y = dateObj.getFullYear();
            const mo = pad(dateObj.getMonth() + 1);
            const d = pad(dateObj.getDate());
            const endMin = mm + 30; const endHh = hh + Math.floor(endMin / 60);
            const dtStart = `${y}${mo}${d}T${pad(hh)}${pad(mm)}00`;
            const dtEnd   = `${y}${mo}${d}T${pad(endHh)}${pad(endMin % 60)}00`;
            const loc = format === "vor-ort" ? `${location.address}\\, ${location.zip}` : "Online per Video";
            const ics = [
              "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//PTBD//DE",
              "BEGIN:VEVENT",
              `DTSTART:${dtStart}`,
              `DTEND:${dtEnd}`,
              `SUMMARY:Kostenloses Erstgespräch – PTBD`,
              `LOCATION:${loc}`,
              `DESCRIPTION:Psychotherapeutischer Bereitschaftsdienst – Kostenloses Erstgespräch`,
              "END:VEVENT", "END:VCALENDAR"
            ].join("\r\n");
            const blob = new Blob([ics], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "erstgespraech-ptbd.ics"; a.click();
            URL.revokeObjectURL(url);
          }}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "white", color: CTA, border: `1.5px solid ${CTA}`, borderRadius: 9999, padding: "13px 28px", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--blue-ultra-light)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke={CTA} strokeWidth="2" strokeLinecap="round"/></svg>
          In Kalender eintragen
        </button>

        {/* Profile / Register */}
        <a href={user ? "/profil" : "/registrieren"}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: CTA, color: "white", borderRadius: 9999, padding: "13px 28px", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 16px rgba(45,91,141,0.25)", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/></svg>
          {user ? "Zum Profil — Termin ansehen" : "Konto erstellen & Termin speichern"}
        </a>
      </div>
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
  const [locationId, setLocationId] = useState("wien");
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

  const selectedLocation = LOCATIONS.find(l => l.id === locationId) ?? LOCATIONS[0];

  function handleConfirm() {
    saveBooking({
      therapistId: "vorgespraech",
      therapistName: "Kostenloses Erstgespräch",
      therapistRole: "Psychotherapeutischer Bereitschaftsdienst",
      therapistPhoto: "/vorgespraech-banner.jpg",
      date: selectedDate,
      time: selectedTime,
      format,
      ...(format === "vor-ort" ? { locationAddress: `${selectedLocation.address}, ${selectedLocation.zip}` } : {}),
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
        <Confirmation format={format} location={selectedLocation} selectedDate={selectedDate} selectedTime={selectedTime} selectedDayObj={selectedDayObj} isMobile={isMobile} user={user} />
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
            <LeftPanel format={format} locationId={locationId} selectedDate={selectedDate} selectedTime={selectedTime} isMobile={isMobile} />

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

                  {/* Location picker — only for vor-ort */}
                  {format === "vor-ort" && (
                    <div style={{ marginBottom: 28 }}>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 12px" }}>Standort wählen</p>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                        {LOCATIONS.map(loc => {
                          const sel = locationId === loc.id;
                          return (
                            <button key={loc.id} onClick={() => setLocationId(loc.id)}
                              style={{ display: "flex", flexDirection: "column", padding: "16px 18px", border: sel ? `2px solid ${CTA}` : "1.5px solid #E8E8E8", borderRadius: 16, background: sel ? "var(--blue-ultra-light)" : "white", cursor: "pointer", textAlign: "left", transition: "all 0.18s", boxShadow: sel ? "0 2px 12px rgba(45,91,141,0.13)" : "none" }}
                              onMouseEnter={e => { if (!sel) { (e.currentTarget as HTMLElement).style.borderColor = "#C0D8F5"; (e.currentTarget as HTMLElement).style.background = "#FAFCFF"; } }}
                              onMouseLeave={e => { if (!sel) { (e.currentTarget as HTMLElement).style.borderColor = "#E8E8E8"; (e.currentTarget as HTMLElement).style.background = "white"; } }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div style={{ width: 28, height: 28, borderRadius: 8, background: sel ? CTA : "#EEF3FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}>
                                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke={sel ? "white" : CTA} strokeWidth="2"/><circle cx="12" cy="10" r="2" stroke={sel ? "white" : CTA} strokeWidth="2"/></svg>
                                  </div>
                                  <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: sel ? CTA : "var(--black)" }}>{loc.city}</span>
                                </div>
                                {sel && (
                                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill={CTA}/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
                                )}
                              </div>
                              <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: "0 0 3px", lineHeight: 1.4 }}>{loc.address}</p>
                              <p style={{ fontFamily: F, fontSize: 11, color: "#9CA3AF", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#B0B0B0" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/></svg>
                                {loc.transit}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Calendar */}
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 10px" }}>Datum</p>
                  <div style={{ border: "1px solid #EBEBEB", borderRadius: 12, padding: 10, marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <button onClick={() => { if (!isPrevDisabled) { if (calMonth === 0) { setCalYear(y => y-1); setCalMonth(11); } else setCalMonth(m => m-1); } }}
                        disabled={isPrevDisabled} style={{ background: isPrevDisabled ? "transparent" : "#F0F4FA", border: "none", width: 34, height: 34, borderRadius: 9, cursor: isPrevDisabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: isPrevDisabled ? 0.3 : 1, transition: "background 0.15s" }}
                        onMouseEnter={e => { if (!isPrevDisabled) (e.currentTarget as HTMLElement).style.background = "var(--blue-ultra-light)"; }}
                        onMouseLeave={e => { if (!isPrevDisabled) (e.currentTarget as HTMLElement).style.background = "#F0F4FA"; }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke={CTA} strokeWidth="2.5" strokeLinecap="round" d="M15 6l-6 6 6 6"/></svg>
                      </button>
                      <span style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)" }}>{MONTHS_DE[calMonth]} {calYear}</span>
                      <button onClick={() => { if (calMonth === 11) { setCalYear(y => y+1); setCalMonth(0); } else setCalMonth(m => m+1); }}
                        style={{ background: "#F0F4FA", border: "none", width: 34, height: 34, borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue-ultra-light)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F0F4FA"; }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke={CTA} strokeWidth="2.5" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
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
                        const isToday = date.getTime() === today.getTime();
                        const isSel = selectedDayObj?.getDate() === day && selectedDayObj?.getMonth() === calMonth && selectedDayObj?.getFullYear() === calYear;
                        return (
                          <button key={day} onClick={() => avail && selectDay(day)} disabled={!avail}
                            style={{
                              width: "100%", aspectRatio: "1", borderRadius: 8,
                              background: isSel ? CTA : avail ? "var(--blue-ultra-light)" : "transparent",
                              color: isSel ? "white" : avail ? CTA : isPast ? "#D8D8D8" : isToday ? "var(--grey-text)" : "#C0C0C0",
                              border: isToday ? "1.5px solid var(--grey-border)" : "none",
                              fontFamily: F, fontWeight: isSel ? 600 : avail ? 500 : 400, fontSize: 11,
                              cursor: avail ? "pointer" : "default", transition: "all 0.15s",
                              position: "relative",
                            }}
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
