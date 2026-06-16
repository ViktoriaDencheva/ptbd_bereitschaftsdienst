"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoredUser, clearUser, getFirstName, type AuthUser } from "@/lib/auth";
import { getBookings, cancelBooking, type Booking } from "@/lib/bookings";
import { therapists } from "@/lib/therapists";
import {
  getThreads, getThread, sendPatientMessage, markThreadRead, getTotalUnread,
  type Message,
} from "@/lib/messages";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const BRAND = "var(--cta-brand)";

type Tab = "dashboard" | "termine" | "nachrichten" | "dokumente" | "profil";

const DOCS = [
  { id: 1, type: "Rechnung", therapist: "Dr. Sarah Müller", apptDate: "12.12.2025", fileDate: "12.12.2025", color: "#F1F5F9", iconColor: "#2D5B8D" },
  { id: 2, type: "Sitzungsbestätigung", therapist: "Dr. Sarah Müller", apptDate: "01.12.2025", fileDate: "01.12.2025", color: "#F1F5F9", iconColor: "#2D5B8D" },
  { id: 3, type: "Krankenkassenformular", therapist: "Dr. Sarah Müller", apptDate: "25.11.2025", fileDate: "25.11.2025", color: "#F1F5F9", iconColor: "#2D5B8D" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Guten Morgen";
  if (h < 18) return "Guten Tag";
  return "Guten Abend";
}

/* ── icons ─────────────────────────────────────────────────────────── */
function VideoIcon() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function CalIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function ClockIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function MonitorIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function MapPinIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1114 0c0 5.314-7 11-7 11z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function DirectionsIcon() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M3 12l18-9-9 18-2-8-7-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/></svg>;
}
function MsgIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function DocIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function UserIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function HomeIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function DownloadIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function HeadphonesIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0118 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function LockIcon() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function ChevronRight() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}

/* ── Avatar ─────────────────────────────────────────────────────────── */
function Avatar({ name, src, size = 44 }: { name: string; src?: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const ok = src && src !== failedSrc;
  if (ok) {
    return <img src={src} alt={name} onError={() => setFailedSrc(src ?? null)}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", flexShrink: 0 }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: F, fontWeight: 700, fontSize: size * 0.35, color: CTA }}>{initials}</span>
    </div>
  );
}

/* ── Booking card ───────────────────────────────────────────────────── */
function BookingCard({ b, past, onCancel, onOpenChat }: { b: Booking; past?: boolean; onCancel?: (id: string) => void; onOpenChat?: (therapistId: string) => void }) {
  const [confirm, setConfirm] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (past) return;
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, [past]);

  const months: Record<string, number> = { Januar:0,Februar:1,März:2,April:3,Mai:4,Juni:5,Juli:6,August:7,September:8,Oktober:9,November:10,Dezember:11 };
  function apptDate(): Date {
    const parts = b.date.replace(/^[^,]+,\s*/, "").split(" ");
    const [h, m] = b.time.split(":").map(Number);
    return new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(parts[0]), h, m);
  }

  const msUntil = past ? -1 : apptDate().getTime() - now.getTime();
  const canJoin = !past && msUntil <= 5 * 60 * 1000;
  const canCancel = !past && msUntil > 24 * 60 * 60 * 1000;

  function fmtCountdown(ms: number) {
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), min = Math.floor((s % 3600) / 60), sec = s % 60;
    if (d > 0) return `noch ${d}T ${h}h ${min}min`;
    if (h > 0) return `noch ${h}h ${min}min ${sec}s`;
    return `noch ${min}min ${sec}s`;
  }

  const therapist = therapists.find(t => String(t.id) === String(b.therapistId));
  const addr = therapist?.address as { street: string; city: string } | null ?? null;
  const mapsUrl = addr ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${addr.street}, ${addr.city}`)}` : null;
  const isVorOrt = b.format === "vor-ort";

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header */}
      <div className="bc-header" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar name={b.therapistName} src={b.therapistPhoto} size={46} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: "var(--black)", margin: 0 }}>{b.therapistName}</p>
          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>{b.therapistRole}</p>
        </div>
        {past && <span style={{ fontFamily: F, fontSize: 12, fontWeight: 500, color: "#6B7280", background: "#F3F4F6", borderRadius: 9999, padding: "3px 10px" }}>Vergangen</span>}
      </div>

      {/* Info rows */}
      <div className="bc-body" style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 58 }}>
        <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: CTA }}><CalIcon /></span>{b.date}</span>
        <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: CTA }}><ClockIcon /></span>{b.time} Uhr</span>
        <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: CTA }}>{isVorOrt ? <MapPinIcon /> : <MonitorIcon />}</span>
          <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA, background: "var(--blue-ultra-light)", borderRadius: 9999, padding: "3px 10px" }}>
            {isVorOrt
              ? addr ? `Vor-Ort · ${addr.street}, ${addr.city}` : "Vor-Ort"
              : "Online-Sitzung"}
          </span>
        </span>
      </div>

      {/* Buttons for past appointments */}
      {past && (
        <div className="bc-body booking-buttons" style={{ paddingLeft: 58, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href={`/buchen/${b.therapistId}`} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 500, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Erneut buchen
          </a>
          <button onClick={() => onOpenChat?.(b.therapistId)} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Sitzungsnotizen ansehen
          </button>
        </div>
      )}

      {/* Policy + buttons for upcoming */}
      {!past && (
        <div className="bc-body" style={{ paddingLeft: 58 }}>
          {/* Policy row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ flexShrink: 0 }}>
              {canCancel
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#9CA3AF" strokeWidth="1.5"/><path d="M8 11V7a4 4 0 018 0v4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>}
            </span>
            <span style={{ fontFamily: F, fontSize: 12, color: canCancel ? "var(--grey-text)" : "#9CA3AF" }}>
              {canCancel ? "Kostenlose Umbuchung & Absage bis 24 Std. vor Beginn möglich" : "Kostenlose Absage nicht mehr möglich – weniger als 24 Std. bis zum Termin"}
            </span>
          </div>

          {/* Info box < 24h */}
          {!canCancel && (
            <div style={{ marginBottom: 12, padding: "9px 12px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", display: "flex", gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <p style={{ fontFamily: F, fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                Möchten Sie einen anderen Termin? Sagen Sie diesen ab und buchen Sie direkt bei{" "}
                <a href={`/fachkraefte/${b.therapistId}`} style={{ color: CTA, fontWeight: 500, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                >{b.therapistName}</a> einen neuen Termin.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="booking-buttons" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* Video / Directions */}
            {isVorOrt ? (
              mapsUrl ? (
                <a href={mapsUrl} target="_blank" rel="noreferrer" style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 500, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                  <DirectionsIcon /> Route anzeigen
                </a>
              ) : null
            ) : canJoin ? (
              <a href={`/gespraech/${b.id}`} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 500, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
                <VideoIcon /> Zum Gespräch beitreten
              </a>
            ) : (
              <div className="tooltip-wrap" style={{ position: "relative" }}>
                <div style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "#F3F4F6", color: "#9CA3AF", fontFamily: F, fontSize: 13, display: "flex", alignItems: "center", gap: 5, cursor: "not-allowed", border: "1.5px solid #E5E7EB", userSelect: "none" }}>
                  <VideoIcon /> {fmtCountdown(msUntil)}
                </div>
                <div className="tooltip-box" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#F9FAFB", color: "#111827", fontFamily: F, fontSize: 12, lineHeight: 1.6, padding: "9px 12px", borderRadius: 10, whiteSpace: "normal" as const, pointerEvents: "none", opacity: 0, transition: "opacity 0.15s", zIndex: 20, width: 260, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", border: "1px solid #E5E7EB" }}>
                  Der Beitritts-Link wird kurz vor Beginn Ihrer Sitzung aktiv. Bitte haben Sie noch etwas Geduld.
                  <div style={{ position: "absolute", top: -6, left: 16, width: 10, height: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", borderBottom: "none", borderRight: "none", transform: "rotate(45deg)" }} />
                </div>
              </div>
            )}

            {/* Termin verschieben — nur > 24h */}
            {canCancel && (
              <a href={`/termin-verschieben/${b.id}`} style={{ height: 36, padding: "0 12px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, fontFamily: F, fontSize: 13, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
                Termin verschieben
              </a>
            )}

            {/* Absagen — immer */}
            {confirm ? (
              <>
                <button onClick={() => setConfirm(false)} style={{ height: 36, padding: "0 12px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Abbrechen</button>
                <button onClick={() => onCancel?.(b.id)} style={{ height: 36, padding: "0 12px", borderRadius: 9999, background: "#DC2626", color: "white", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Ja, absagen</button>
              </>
            ) : (
              <button onClick={() => setConfirm(true)} style={{ height: 36, padding: "0 12px", borderRadius: 9999, background: "#FEF2F2", color: "#DC2626", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Absagen</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SicherheitCard ─────────────────────────────────────────────────── */
function SicherheitCard({ inp, lbl, saved, savedSection }: { inp: React.CSSProperties; lbl: React.CSSProperties; saved: (id: string) => void; savedSection: string | null }) {
  const [open, setOpen] = useState<"password" | "email" | null>(null);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [emailForm, setEmailForm] = useState({ email: "", password: "" });

  const iconBox = (icon: React.ReactNode) => (
    <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</span>
  );
  const lockIcon = <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" stroke="var(--cta)" strokeWidth="1.5"/><path d="M8 11V7a4 4 0 018 0v4" stroke="var(--cta)" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  const mailIcon = <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--cta)" strokeWidth="1.5"/><path d="M3 7l9 6 9-6" stroke="var(--cta)" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  const chevron = (flipped: boolean) => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ transform: flipped ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}><path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--black)" }}>Sicherheit</span>
        {savedSection === "security" && <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#16A34A", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 9999, padding: "2px 10px" }}>✓ Gespeichert</span>}
      </div>

      {/* Passwort */}
      <button onClick={() => setOpen(open === "password" ? null : "password")} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 0", background: "none", border: "none", borderBottom: "1px solid #F3F4F6", cursor: "pointer", textAlign: "left" as const }}>
        {iconBox(lockIcon)}
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "var(--black)", flex: 1 }}>Passwort ändern</span>
        {chevron(open === "password")}
      </button>
      {open === "password" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 0 8px" }}>
          <div><label style={lbl}>Aktuelles Passwort</label><input style={inp} type="password" placeholder="••••••••" value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} /></div>
          <div className="sicherheit-pw-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={lbl}>Neues Passwort</label><input style={inp} type="password" placeholder="Mindestens 8 Zeichen" value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} /></div>
            <div><label style={lbl}>Bestätigen</label><input style={inp} type="password" placeholder="Wiederholen" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} /></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setOpen(null); setPwForm({ current: "", next: "", confirm: "" }); saved("security"); }} style={{ height: 36, padding: "0 20px", borderRadius: 9999, background: "var(--cta)", color: "white", border: "none", fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 13, cursor: "pointer" }}>Speichern</button>
            <button onClick={() => setOpen(null)} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: "pointer" }}>Abbrechen</button>
          </div>
        </div>
      )}

      {/* E-Mail */}
      <button onClick={() => setOpen(open === "email" ? null : "email")} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}>
        {iconBox(mailIcon)}
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "var(--black)", flex: 1 }}>E-Mail-Adresse ändern</span>
        {chevron(open === "email")}
      </button>
      {open === "email" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 0 8px" }}>
          <div><label style={lbl}>Neue E-Mail-Adresse</label><input style={inp} type="email" placeholder="neu@beispiel.at" value={emailForm.email} onChange={e => setEmailForm(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label style={lbl}>Passwort zur Bestätigung</label><input style={inp} type="password" placeholder="••••••••" value={emailForm.password} onChange={e => setEmailForm(p => ({ ...p, password: e.target.value }))} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setOpen(null); setEmailForm({ email: "", password: "" }); saved("security"); }} style={{ height: 36, padding: "0 20px", borderRadius: 9999, background: "var(--cta)", color: "white", border: "none", fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 13, cursor: "pointer" }}>Speichern</button>
            <button onClick={() => setOpen(null)} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: "pointer" }}>Abbrechen</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── ProfilSettings ──────────────────────────────────────────────────── */
function ProfilSettings({ user, onLogout }: { user: { name: string; email: string }; onLogout: () => void }) {
  const nameParts = user.name.split(" ");
  const initials = nameParts.map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const [photo, setPhoto] = useState<string | null>(null);
  const [editPersonal, setEditPersonal] = useState(false);
  const [personal, setPersonal] = useState({ vorname: nameParts[0] ?? "", nachname: nameParts.slice(1).join(" "), email: user.email, phone: "", birthdate: "" });
  const [versicherung, setVersicherung] = useState<"gesetzlich" | "privat" | "selbst">("gesetzlich");
  const [kasse, setKasse] = useState("ÖGK");
  const [editVersicherung, setEditVersicherung] = useState(false);
  const [notifs, setNotifs] = useState({ terminbestaetigung: true, erinnerung: true, nachrichten: true, plattform: false });
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(f);
  }
  function saved(id: string) { setSavedSection(id); setTimeout(() => setSavedSection(null), 2000); }

  const inp: React.CSSProperties = { fontFamily: F, fontSize: 14, color: "var(--black)", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "9px 12px", width: "100%", outline: "none", background: "#FAFAFA", boxSizing: "border-box" };
  const lbl: React.CSSProperties = { fontFamily: F, fontSize: 12, fontWeight: 600, color: "var(--grey-text)", marginBottom: 5, display: "block", textTransform: "uppercase" as const, letterSpacing: 0.5 };
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid #F3F4F6" }}>
      <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)" }}>{label}</span>
      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: "var(--black)" }}>{value || "—"}</span>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)", margin: 0 }}>Mein Profil</h2>

      <div className="profil-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" }}>

        {/* ── LEFT ── */}
        <div className="profil-col-left" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Persönliche Daten */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)" }}>Persönliche Daten</span>
              {savedSection === "personal" && <span style={{ fontFamily: F, fontSize: 12, color: "#16A34A", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 9999, padding: "2px 10px" }}>✓ Gespeichert</span>}
            </div>
            {editPersonal ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                <div className="profil-personal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={lbl}>Vorname</label><input style={inp} value={personal.vorname} onChange={e => setPersonal(p => ({ ...p, vorname: e.target.value }))} /></div>
                  <div><label style={lbl}>Nachname</label><input style={inp} value={personal.nachname} onChange={e => setPersonal(p => ({ ...p, nachname: e.target.value }))} /></div>
                </div>
                <div><label style={lbl}>E-Mail-Adresse</label><input style={inp} type="email" value={personal.email} onChange={e => setPersonal(p => ({ ...p, email: e.target.value }))} /></div>
                <div><label style={lbl}>Telefonnummer</label><input style={inp} placeholder="+43 123 456 789" value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} /></div>
                <div><label style={lbl}>Geburtsdatum</label><input style={inp} type="date" value={personal.birthdate} onChange={e => setPersonal(p => ({ ...p, birthdate: e.target.value }))} /></div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button onClick={() => { setEditPersonal(false); saved("personal"); }} style={{ height: 36, padding: "0 20px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer" }}>Speichern</button>
                  <button onClick={() => setEditPersonal(false)} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Abbrechen</button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 8 }}>
                {row("Vorname", personal.vorname)}
                {row("Nachname", personal.nachname)}
                {row("E-Mail-Adresse", personal.email)}
                {row("Telefonnummer", personal.phone)}
                {row("Geburtsdatum", personal.birthdate)}
                <button onClick={() => setEditPersonal(true)} style={{ marginTop: 16, height: 36, padding: "0 20px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer" }}>
                  Bearbeiten
                </button>
              </div>
            )}
          </div>

          {/* Versicherung */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)" }}>Versicherung</span>
              {savedSection === "versicherung" && <span style={{ fontFamily: F, fontSize: 12, color: "#16A34A", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 9999, padding: "2px 10px" }}>✓ Gespeichert</span>}
            </div>
            {editVersicherung ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
                <div>
                  <label style={lbl}>Versicherungsart</label>
                  {([["gesetzlich", "Gesetzlich versichert"], ["privat", "Privat versichert"], ["selbst", "Selbstzahler"]] as const).map(([val, label]) => (
                    <label key={val} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 14, color: "var(--black)", cursor: "pointer", marginBottom: 10 }}>
                      <input type="radio" name="versicherung" checked={versicherung === val} onChange={() => setVersicherung(val)} style={{ accentColor: CTA, width: 16, height: 16 }} />
                      {label}
                    </label>
                  ))}
                </div>
                {versicherung === "gesetzlich" && (
                  <div>
                    <label style={lbl}>Krankenkasse</label>
                    <select style={{ ...inp, appearance: "none" as const }} value={kasse} onChange={e => setKasse(e.target.value)}>
                      {["ÖGK", "BVAEB", "SVS", "KFA", "BVA"].map(k => <option key={k}>{k}</option>)}
                    </select>
                  </div>
                )}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setEditVersicherung(false); saved("versicherung"); }} style={{ height: 36, padding: "0 20px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer" }}>Ändern</button>
                  <button onClick={() => setEditVersicherung(false)} style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Abbrechen</button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 8 }}>
                {row("Versicherungsart", versicherung === "gesetzlich" ? "Gesetzlich versichert" : versicherung === "privat" ? "Privat versichert" : "Selbstzahler")}
                {versicherung === "gesetzlich" && row("Krankenkasse", kasse)}
                <button onClick={() => setEditVersicherung(true)} style={{ marginTop: 16, height: 36, padding: "0 20px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer" }}>
                  Ändern
                </button>
              </div>
            )}
          </div>

          {/* Sicherheit */}
          <SicherheitCard inp={inp} lbl={lbl} saved={saved} savedSection={savedSection} />

          {/* Datenschutz */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "22px 24px" }}>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", display: "block", marginBottom: 16 }}>Datenschutz</span>
            {[
              { label: "Datenschutzbestimmungen", href: "/datenschutz" },
              { label: "Datenexport anfordern", href: "#" },
            ].map(item => (
              <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "13px 0", borderBottom: "1px solid #F3F4F6", textDecoration: "none" }}>
                <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", flex: 1 }}>{item.label}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ))}
            <div style={{ paddingTop: 16 }}>
              {!deleteConfirm ? (
                <button onClick={() => setDeleteConfirm(true)} style={{ background: "none", border: "none", fontFamily: F, fontSize: 13, color: "#9CA3AF", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                  Konto löschen
                </button>
              ) : (
                <div style={{ background: "#FEF2F2", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontFamily: F, fontSize: 13, color: "#DC2626", margin: 0 }}>Ihr Konto und alle Daten werden unwiderruflich gelöscht. Möchten Sie fortfahren?</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={onLogout} style={{ height: 34, padding: "0 14px", borderRadius: 9999, background: "#DC2626", color: "white", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Ja, löschen</button>
                    <button onClick={() => setDeleteConfirm(false)} style={{ height: 34, padding: "0 14px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: F, fontSize: 13, cursor: "pointer" }}>Abbrechen</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="profil-col-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Avatar */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
            <div style={{ position: "relative" }}>
              {photo
                ? <img src={photo} alt="Profilbild" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "2px solid #C8DFFF" }} />
                : <div style={{ width: 90, height: 90, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #C8DFFF" }}>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 32, color: CTA }}>{initials}</span>
                  </div>
              }
              <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: CTA, border: "2px solid white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.5-6.5a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16H8v-2a2 2 0 01.586-1.414z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
            </div>
            <div>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: "0 0 2px" }}>{personal.vorname} {personal.nachname}</p>
              <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: "0 0 10px" }}>{personal.email}</p>
              <span style={{ fontFamily: F, fontSize: 12, color: CTA, background: "var(--blue-ultra-light)", borderRadius: 9999, padding: "3px 12px", fontWeight: 500 }}>Patient</span>
            </div>
            <button onClick={() => fileRef.current?.click()} style={{ width: "100%", height: 36, borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Foto ändern
            </button>
          </div>

          {/* Benachrichtigungen */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)" }}>Benachrichtigungen</span>
            {(Object.entries({
              terminbestaetigung: "Terminbestätigung per E-Mail",
              erinnerung: "Terminerinnerung 24h vorher",
              nachrichten: "Nachrichten von Fachkräften",
              plattform: "Plattform-Benachrichtigungen",
            }) as [keyof typeof notifs, string][]).map(([key, label]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ fontFamily: F, fontSize: 13, color: "var(--black)", margin: 0 }}>{label}</p>
                <div onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} style={{ width: 42, height: 24, borderRadius: 9999, background: notifs[key] ? CTA : "#D1D5DB", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 4, left: notifs[key] ? 22 : 4, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Abmelden */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EEF2F7", padding: "22px 24px" }}>
            <button onClick={onLogout} style={{ width: "100%", height: 40, borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer" }}>
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function ProfilPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [termineView, setTermineView] = useState<"anstehend" | "vergangene">("anstehend");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
  const [threads, setThreads] = useState(getThreads());
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [chatMsgs, setChatMsgs] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const chatBottom = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => new Date());
  const [openDoc, setOpenDoc] = useState<typeof DOCS[0] | null>(null);

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const u = getStoredUser();
    if (!u) { window.location.href = "/anmelden"; return; }
    setUser(u);
    // Seed a past booking for demo purposes if none exist
    const existing = getBookings();
    if (!existing.some(b => b.id === "demo-past-1")) {
      const past: import("@/lib/bookings").Booking = {
        id: "demo-past-1",
        therapistId: "1",
        therapistName: "Dr. Sarah Müller",
        therapistRole: "Klinische Psychologin",
        therapistPhoto: "/fachkraefte/fachkraft-1.jpg",
        date: "Di, 10. Juni 2026",
        time: "14:00",
        format: "online",
        status: "confirmed",
        bookedAt: new Date("2026-06-01").toISOString(),
      };
      localStorage.setItem("pb_bookings", JSON.stringify([past, ...existing]));
    }
    setBookings(getBookings());
    setThreads(getThreads());

    const refreshBookings = () => setBookings(getBookings());
    const refreshMsgs = () => { setThreads(getThreads()); if (openThread) setChatMsgs(getThread(openThread)); };
    window.addEventListener("pb_bookings_change", refreshBookings);
    window.addEventListener("pb_messages_change", refreshMsgs);
    return () => {
      window.removeEventListener("pb_bookings_change", refreshBookings);
      window.removeEventListener("pb_messages_change", refreshMsgs);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openThread) {
      setChatMsgs(getThread(openThread));
      markThreadRead(openThread);
      setThreads(getThreads());
    }
  }, [openThread]);

  useEffect(() => {
    chatBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs]);

  function handleCancel(id: string) {
    cancelBooking(id);
    setBookings(getBookings());
    setCancelConfirm(null);
  }

  function openChat(therapistId: string) {
    setOpenThread(therapistId);
    setTab("nachrichten");
  }

  function sendMsg() {
    if (!draft.trim() || !openThread) return;
    const t = threads.find(th => th.therapistId === openThread);
    if (!t) return;
    sendPatientMessage(t.therapistId, t.therapistName, t.therapistRole, t.therapistPhoto, draft.trim());
    setDraft("");
    setChatMsgs(getThread(openThread));
    setThreads(getThreads());
  }

  function printDoc(doc: typeof DOCS[0]) {
    const userName = user ? `${(user as {vorname?:string;name?:string}).vorname ?? ""} ${(user as {nachname?:string;name?:string}).nachname ?? (user as {name?:string}).name ?? ""}`.trim() : "Patient";
    const isRechnung = doc.type === "Rechnung";
    const isBest = doc.type === "Sitzungsbestätigung";
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${doc.type}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Helvetica Neue',Arial,sans-serif;color:#111;background:#fff;padding:56px;max-width:800px;margin:0 auto}
  .logo{font-size:13px;font-weight:700;color:#2D5B8D;letter-spacing:.04em;margin-bottom:40px}
  h1{font-size:26px;font-weight:700;margin-bottom:6px}
  .sub{font-size:13px;color:#6B7280;margin-bottom:36px}
  .row{display:flex;justify-content:space-between;margin-bottom:32px}
  .block p{font-size:12px;color:#6B7280;margin-bottom:4px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
  .block span{font-size:14px;color:#111}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  th{text-align:left;font-size:11px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:.05em;padding:8px 12px;background:#F9FAFB;border-bottom:1px solid #E5E7EB}
  td{padding:12px 12px;font-size:14px;border-bottom:1px solid #F3F4F6}
  .total{text-align:right;margin-top:20px;font-size:15px}
  .total strong{font-size:20px;color:#2D5B8D}
  .footer{margin-top:56px;padding-top:20px;border-top:1px solid #E5E7EB;font-size:11px;color:#9CA3AF;line-height:1.7}
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;background:#DCFCE7;color:#15803D}
  @media print{body{padding:32px}}
</style></head><body>
<div class="logo">Psychotherapeutischer Bereitschaftsdienst</div>
<h1>${doc.type}</h1>
<div class="sub">Dokument-Nr. PBD-${2025000 + doc.id * 137} &nbsp;·&nbsp; Ausgestellt am ${doc.fileDate}</div>
<div class="row">
  <div class="block"><p>Patient</p><span>${userName}</span></div>
  <div class="block" style="text-align:right"><p>Fachkraft</p><span>${doc.therapist}</span></div>
</div>
${isRechnung ? `
<table>
  <thead><tr><th>Leistung</th><th>Sitzung</th><th style="text-align:right">Betrag</th></tr></thead>
  <tbody>
    <tr><td>Psychotherapeutische Sitzung (50 min)</td><td>${doc.apptDate}</td><td style="text-align:right">€ 120,00</td></tr>
    <tr><td>Online-Sitzungspauschale</td><td>${doc.apptDate}</td><td style="text-align:right">€ 0,00</td></tr>
  </tbody>
</table>
<div class="total"><p style="color:#6B7280;font-size:13px;margin-bottom:4px">Gesamtbetrag</p><strong>€ 120,00</strong>&nbsp;<span class="badge">Bezahlt</span></div>
` : isBest ? `
<table>
  <thead><tr><th>Detail</th><th>Information</th></tr></thead>
  <tbody>
    <tr><td>Art der Sitzung</td><td>Online-Psychotherapie</td></tr>
    <tr><td>Datum</td><td>${doc.apptDate}</td></tr>
    <tr><td>Dauer</td><td>50 Minuten</td></tr>
    <tr><td>Therapeut</td><td>${doc.therapist}</td></tr>
    <tr><td>Status</td><td><span class="badge">Abgeschlossen</span></td></tr>
  </tbody>
</table>
` : `
<table>
  <thead><tr><th>Feld</th><th>Wert</th></tr></thead>
  <tbody>
    <tr><td>Versicherter</td><td>${userName}</td></tr>
    <tr><td>Behandlungsdatum</td><td>${doc.apptDate}</td></tr>
    <tr><td>Diagnose-Code</td><td>F41.1 (Generalisierte Angststörung)</td></tr>
    <tr><td>Therapeut</td><td>${doc.therapist}</td></tr>
    <tr><td>Kostenerstattung</td><td>Bitte bei Ihrer Krankenkasse einreichen</td></tr>
  </tbody>
</table>
`}
<div class="footer">
  Psychotherapeutischer Bereitschaftsdienst &nbsp;·&nbsp; bereitschaftsdienst.at &nbsp;·&nbsp; Dieses Dokument wurde elektronisch erstellt und ist ohne Unterschrift gültig.
</div>
</body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  }

  if (!user) return null;

  const upcoming = bookings
    .filter(b => b.status === "confirmed")
    .sort((a, b) => getBookingDate(a).getTime() - getBookingDate(b).getTime());
  const nowTs = Date.now();
  const past = bookings.filter(b => b.status !== "cancelled" && getBookingDate(b).getTime() < nowTs);
  const next = upcoming[0] ?? null;
  const lastTherapist = upcoming[0] ?? past[0] ?? null;
  const unreadCount = getTotalUnread();

  function getBookingDate(b: Booking): Date {
    // b.date e.g. "Do, 18. Juni 2026", b.time e.g. "11:00"
    const months: Record<string, number> = { Januar:0, Februar:1, März:2, April:3, Mai:4, Juni:5, Juli:6, August:7, September:8, Oktober:9, November:10, Dezember:11 };
    const parts = b.date.replace(/^[^,]+,\s*/, "").split(" ");
    const day = parseInt(parts[0]);
    const month = months[parts[1]] ?? 0;
    const year = parseInt(parts[2]);
    const [h, m] = b.time.split(":").map(Number);
    return new Date(year, month, day, h, m);
  }

  function formatCountdown(ms: number): string {
    if (ms <= 0) return "";
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    if (d > 0) return `noch ${d}T ${h}h ${min}min`;
    if (h > 0) return `noch ${h}h ${min}min ${sec}s`;
    return `noch ${min}min ${sec}s`;
  }

  const TABS: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { key: "termine", label: "Meine Termine", icon: <CalIcon /> },
    { key: "nachrichten", label: "Nachrichten", icon: <MsgIcon />, badge: unreadCount },
    { key: "dokumente", label: "Dokumente", icon: <DocIcon /> },
    { key: "profil", label: "Profil", icon: <UserIcon /> },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "#F4F7FB", minHeight: "calc(100vh - 72px)" }}>

        {/* ── Breadcrumbs ─────────────────────────────────────────── */}
        <div className="profil-wrapper" style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", gap: 6 }}>
          <a href="/" style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = CTA)}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
          >Startseite</a>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: F, fontSize: 13, color: CTA, fontWeight: 500 }}>Mein Konto</span>
        </div>

        {/* ── Hero banner ─────────────────────────────────────────── */}
        <div className="profil-wrapper" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 28px" }}>
          <div className="profil-banner" style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            height: 240, backgroundImage: "url('/KontoBanner.png')",
            backgroundSize: "cover", backgroundPosition: "center top",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(236,245,255,0.92) 0%, rgba(236,245,255,0.5) 55%, transparent 100%)" }} />
            <div className="profil-banner-inner" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: 560 }}>
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 30, color: "var(--black)", margin: "0 0 10px", lineHeight: 1.2 }}>
                {greeting()}, {getFirstName(user)}
              </h1>
              <p style={{ fontFamily: F, fontSize: 14, color: "#374151", margin: 0, lineHeight: 1.7 }}>
                Schön, dass Sie wieder da sind. Hier finden Sie alles Wichtige rund um Ihre Termine und Nachrichten.
              </p>
            </div>
          </div>
        </div>

        {/* ── Tab nav + Info ──────────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <div className="profil-wrapper" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Info strip — top rounded only, merges into tab bar */}
            <div className="profil-info-strip" style={{ background: "#F2F4F7", border: "1px solid #E4E7EC", borderRadius: "12px 12px 0 0", borderBottom: "none", padding: "12px 18px 28px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <p style={{ fontFamily: F, fontSize: 14, color: "#374151", margin: 0 }}>
                <span style={{ color: BRAND, fontWeight: 600 }}>Terminänderung &amp; Stornierung:</span>{" "}
                Kostenlose Umbuchung bis 24 Std. vor Beginn. Bei kurzfristiger Absage können Kosten anfallen. Absagen durch die Fachkraft werden erstattet.
              </p>
            </div>

            {/* Tabs — fully rounded, overlaps bottom of info strip */}
            <div className="profil-tab-bar" style={{ background: "white", border: "1px solid #E4E7EC", borderRadius: 9999, display: "flex", justifyContent: "center", overflowX: "auto", marginTop: -20, position: "relative", zIndex: 1 }}>
              <div className="profil-tab-scroll" style={{ display: "flex", gap: 4, padding: "8px 10px" }}>
                {TABS.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "10px 22px",
                    fontFamily: F, fontWeight: tab === t.key ? 600 : 400, fontSize: 14,
                    color: tab === t.key ? CTA : "var(--grey-text)",
                    background: tab === t.key ? "var(--blue-ultra-light)" : "transparent",
                    border: "none", borderRadius: 9999, cursor: "pointer",
                    transition: "background 0.15s, color 0.15s", whiteSpace: "nowrap",
                  }}
                    onMouseEnter={e => { if (tab !== t.key) { e.currentTarget.style.background = "#F4F7FB"; e.currentTarget.style.color = CTA; } }}
                    onMouseLeave={e => { if (tab !== t.key) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--grey-text)"; } }}
                  >
                    <span style={{ color: tab === t.key ? CTA : "#9CA3AF", display: "flex" }}>{t.icon}</span>
                    {t.label}
                    {!!t.badge && (
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: BRAND, color: "white", fontFamily: F, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="profil-wrapper profil-content" style={{ maxWidth: 1440, margin: "0 auto", padding: "28px 40px 64px" }}>

          {/* ═══ DASHBOARD ═══ */}
          {tab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="dashboard-grid">

                {/* LEFT col */}
                <div className="db-col-left" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Nächster Termin */}
                <div className="db-termin" style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: 0 }}>Nächster Termin</h2>
                    <button onClick={() => setTab("termine")} style={{ fontFamily: F, fontSize: 13, color: CTA, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                    >Alle anzeigen</button>
                  </div>
                  {next ? (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <Avatar name={next.therapistName} src={next.therapistPhoto} size={52} />
                        <div>
                          <p style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: "var(--black)", margin: 0 }}>{next.therapistName}</p>
                          <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>{next.therapistRole}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                        {[
                          { icon: <CalIcon />, text: next.date },
                          { icon: <ClockIcon />, text: `${next.time} Uhr` },
                          { icon: <MonitorIcon />, text: next.format === "online" ? "Online-Sitzung" : "Vor-Ort-Termin" },
                        ].map((row, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ color: CTA }}>{row.icon}</span>
                            <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>{row.text}</span>
                          </div>
                        ))}
                      </div>
                      {(() => {
                        const apptDate = getBookingDate(next);
                        const msUntil = apptDate.getTime() - now.getTime();
                        const msUntil24h = 24 * 60 * 60 * 1000;
                        const canJoin = msUntil <= 5 * 60 * 1000; // joinable 5min before
                        const canCancel = msUntil > msUntil24h;
                        return (
                          <>
                            {/* Policy row */}
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                              <span style={{ flexShrink: 0 }}>
                                {canCancel
                                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={CTA} strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke={CTA} strokeWidth="1.8" strokeLinecap="round"/></svg>
                                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#9CA3AF" strokeWidth="1.5"/><path d="M8 11V7a4 4 0 018 0v4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                }
                              </span>
                              <span style={{ fontFamily: F, fontSize: 13, color: canCancel ? "#6B7280" : "#9CA3AF" }}>
                                {canCancel
                                  ? "Kostenlose Umbuchung & Absage bis 24 Std. vor Beginn möglich"
                                  : "Kostenlose Absage nicht mehr möglich – weniger als 24 Std. bis zum Termin"}
                              </span>
                            </div>

                            {/* Info wenn < 24h: kein Termin verschieben, stattdessen Hinweis */}
                            {!canCancel && (
                              <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", display: "flex", gap: 8 }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
                                <p style={{ fontFamily: F, fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                                  Möchten Sie einen anderen Termin?{" "}
                                  Sagen Sie diesen Termin ab und buchen Sie direkt bei{" "}
                                  <a href={`/fachkraefte/${next.therapistId}`} style={{ color: CTA, fontWeight: 500, textDecoration: "none" }}
                                    onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                                    onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                                  >{next.therapistName}</a>{" "}
                                  einen neuen Termin.
                                </p>
                              </div>
                            )}

                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                              {/* Video button */}
                              {canJoin ? (
                                <a href={`/gespraech/${next.id}`} style={{ height: 40, padding: "0 16px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, textDecoration: "none", transition: "background 0.2s" }}
                                  onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
                                  onMouseLeave={e => (e.currentTarget.style.background = CTA)}
                                >
                                  <VideoIcon /> Zum Gespräch beitreten
                                </a>
                              ) : (
                                <div style={{ position: "relative" }} className="tooltip-wrap">
                                  <div style={{ height: 40, padding: "0 16px", borderRadius: 9999, background: "#F3F4F6", color: "#9CA3AF", fontFamily: F, fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", gap: 6, userSelect: "none", cursor: "not-allowed", border: "1.5px solid #E5E7EB" }}>
                                    <VideoIcon /> {formatCountdown(msUntil)}
                                  </div>
                                  <div className="tooltip-box" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#F9FAFB", color: "#111827", fontFamily: F, fontSize: 13, lineHeight: 1.6, padding: "10px 14px", borderRadius: 10, whiteSpace: "normal" as const, pointerEvents: "none", opacity: 0, transition: "opacity 0.15s", zIndex: 20, width: 300, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", border: "1px solid #E5E7EB" }}>
                                    Der Beitritts-Link wird kurz vor Beginn Ihrer Sitzung aktiv. Bitte haben Sie noch etwas Geduld.
                                    <div style={{ position: "absolute", top: -6, left: 20, width: 10, height: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", borderBottom: "none", borderRight: "none", transform: "rotate(45deg)" }} />
                                  </div>
                                </div>
                              )}

                              {/* Termin verschieben — nur wenn > 24h */}
                              {canCancel && (
                                <a href={`/termin-verschieben/${next.id}`} style={{ height: 40, padding: "0 14px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", textDecoration: "none" }}>
                                  Termin verschieben
                                </a>
                              )}

                              {/* Absagen — immer aktiv */}
                              {cancelConfirm === next.id ? (
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button onClick={() => setCancelConfirm(null)} style={{ height: 40, padding: "0 12px", borderRadius: 9999, background: "#F3F4F6", color: "#374151", border: "none", fontFamily: F, fontSize: 14, cursor: "pointer" }}>Abbrechen</button>
                                  <button onClick={() => handleCancel(next.id)} style={{ height: 40, padding: "0 12px", borderRadius: 9999, background: "#DC2626", color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Ja, absagen</button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setCancelConfirm(next.id)}
                                  style={{ height: 40, padding: "0 14px", borderRadius: 9999, background: "#FEF2F2", color: "#DC2626", border: "none", fontFamily: F, fontSize: 14, cursor: "pointer" }}
                                >
                                  Absagen
                                </button>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 14px" }}>Keine anstehenden Termine</p>
                      <a href="/fachkraefte" style={{ height: 40, padding: "0 20px", borderRadius: 9999, background: CTA, color: "white", textDecoration: "none", fontFamily: F, fontWeight: 500, fontSize: 13, display: "inline-flex", alignItems: "center" }}>
                        Fachkraft finden
                      </a>
                    </div>
                  )}
                </div>

                {/* Meine Dokumente */}
                <div className="db-dokumente" style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: 0 }}>Meine Dokumente</h2>
                    <button onClick={() => setTab("dokumente")} style={{ fontFamily: F, fontSize: 14, color: CTA, fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>Alle anzeigen</button>
                  </div>
                  {DOCS.map(doc => (
                    <div key={doc.id} onClick={() => printDoc(doc)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 10, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={doc.iconColor} strokeWidth="1.4" fill={doc.color}/>
                          <path d="M14 2v6h6" stroke={doc.iconColor} strokeWidth="1.4" strokeLinecap="round"/>
                          <path d="M8 13h8M8 17h5" stroke={doc.iconColor} strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "0 0 1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.type}</p>
                        <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0 }}>{doc.therapist} · {doc.apptDate}</p>
                      </div>
                      <span style={{ color: "#9CA3AF", flexShrink: 0 }}><DownloadIcon /></span>
                    </div>
                  ))}
                </div>

                </div>{/* end LEFT col */}

                {/* RIGHT col */}
                <div className="db-col-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Neueste Nachricht */}
                <div className="db-nachrichten" style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: 0 }}>Neueste Nachricht</h2>
                    <button onClick={() => setTab("nachrichten")} style={{ fontFamily: F, fontSize: 14, color: CTA, fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>Alle anzeigen</button>
                  </div>
                  {threads[0] ? (
                    <div onClick={() => { openChat(threads[0].therapistId); }} style={{ padding: "12px 14px", borderRadius: 14, background: "#F9FAFB", display: "flex", gap: 12, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-ultra-light)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#F9FAFB")}
                    >
                      <Avatar name={threads[0].therapistName} src={threads[0].therapistPhoto} size={40} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                          <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>{threads[0].therapistName}</p>
                          {threads[0].unread > 0 && <span style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND, flexShrink: 0 }} />}
                        </div>
                        <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                          {threads[0].last.text.replace(/\*\*/g, "")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>Noch keine Nachrichten</p>
                  )}
                  <button onClick={() => setTab("nachrichten")} style={{ height: 42, width: "100%", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#D8EBFF")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--blue-ultra-light)")}
                  >
                    <MsgIcon /> Nachrichten öffnen
                  </button>
                </div>

                {/* Schnellzugriff */}
                <div className="db-schnell" style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 24 }}>
                  <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: "0 0 14px" }}>Schnellzugriff</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <a href={lastTherapist ? `/buchen/${lastTherapist.therapistId}` : "/fachkraefte"}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderRadius: 12, background: CTA, color: "white", textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
                      onMouseLeave={e => (e.currentTarget.style.background = CTA)}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CalIcon />
                        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 14 }}>
                          {lastTherapist ? `Erneut bei ${lastTherapist.therapistName.split(" ").slice(-1)[0]} buchen` : "Fachkraft finden"}
                        </span>
                      </span>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    </a>
                    {[
                      { label: "Hilfe bei der Auswahl", icon: <UserIcon />, href: "/fachkraefte" },
                      { label: "Datenschutz & Sicherheit", icon: <LockIcon />, href: "/datenschutz" },
                    ].map((item, i) => (
                      <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 12, background: "#F9FAFB", color: "var(--black)", textDecoration: "none", border: "1px solid #F3F4F6", transition: "background 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-ultra-light)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#F9FAFB")}
                      >
                        <span style={{ color: CTA }}>{item.icon}</span>
                        <span style={{ fontFamily: F, fontSize: 14, flex: 1 }}>{item.label}</span>
                        <span style={{ color: "#9CA3AF" }}><ChevronRight /></span>
                      </a>
                    ))}
                  </div>
                </div>

                </div>{/* end RIGHT col */}
              </div>

              {/* Help bar */}
              <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", color: CTA, flexShrink: 0 }}>
                    <HeadphonesIcon />
                  </div>
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>Brauchen Sie Hilfe?</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>Wir sind für Sie da.</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <button style={{ height: 40, padding: "0 20px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer" }}>
                    Kontakt aufnehmen
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                    {["FAQ", "Kontakt", "Datenschutz"].map((l, i) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                        {i > 0 && <span style={{ color: "#D1D5DB", margin: "0 12px" }}>·</span>}
                        <a href="#" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget.style.color = CTA)}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
                        >{l}</a>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ MEINE TERMINE ═══ */}
          {tab === "termine" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="termine-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)", margin: 0 }}>Meine Termine</h2>
                <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 9999, padding: 4, gap: 2 }}>
                  {(["anstehend", "vergangene"] as const).map(v => (
                    <button key={v} onClick={() => setTermineView(v)} style={{ height: 34, padding: "0 16px", borderRadius: 9999, border: "none", fontFamily: F, fontSize: 13, fontWeight: 500, cursor: "pointer", background: termineView === v ? "white" : "transparent", color: termineView === v ? CTA : "var(--grey-text)", boxShadow: termineView === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
                      {v === "anstehend" ? "Anstehend" : "Vergangene"}
                    </button>
                  ))}
                </div>
              </div>
              {termineView === "anstehend" ? (
                upcoming.length === 0 ? (
                  <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 48, textAlign: "center" }}>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 16px" }}>Noch keine Termine vorhanden.</p>
                    <a href="/fachkraefte" style={{ height: 40, padding: "0 20px", borderRadius: 9999, background: CTA, color: "white", textDecoration: "none", fontFamily: F, fontWeight: 500, fontSize: 13, display: "inline-flex", alignItems: "center" }}>Fachkraft finden</a>
                  </div>
                ) : (
                  upcoming.map(b => <BookingCard key={b.id} b={b} onCancel={id => { cancelBooking(id); setBookings(getBookings()); }} />)
                )
              ) : (
                past.length === 0 ? (
                  <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", padding: 48, textAlign: "center" }}>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>Keine vergangenen Termine.</p>
                  </div>
                ) : (
                  past.map(b => <BookingCard key={b.id} b={b} past onOpenChat={openChat} />)
                )
              )}
            </div>
          )}

          {/* ═══ NACHRICHTEN ═══ */}
          {tab === "nachrichten" && (
            <div style={{ display: "grid", gridTemplateColumns: openThread ? "300px 1fr" : "1fr", gap: 16, alignItems: "start" }} className="nachrichten-grid">

              {/* Thread list */}
              <div className={openThread ? "chat-thread-list chat-thread-list--hidden" : "chat-thread-list"} style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", overflow: "hidden" }}>
                <div style={{ padding: "18px 20px", borderBottom: "1px solid #EEF2F7" }}>
                  <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: 0 }}>Nachrichten</h2>
                </div>
                {threads.length === 0 ? (
                  <div style={{ padding: "32px 20px", textAlign: "center" }}>
                    <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>
                      Nach Ihrem ersten Gespräch erhalten Sie hier eine Zusammenfassung und können mit Ihrer Fachkraft schreiben.
                    </p>
                  </div>
                ) : threads.map(th => (
                  <div key={th.therapistId}
                    onClick={() => { setOpenThread(th.therapistId); setChatMsgs(getThread(th.therapistId)); markThreadRead(th.therapistId); setThreads(getThreads()); }}
                    style={{ display: "flex", gap: 12, padding: "14px 20px", cursor: "pointer", borderBottom: "1px solid #F3F4F6", background: openThread === th.therapistId ? "var(--blue-ultra-light)" : "transparent", transition: "background 0.15s" }}
                    onMouseEnter={e => { if (openThread !== th.therapistId) e.currentTarget.style.background = "#F9FAFB"; }}
                    onMouseLeave={e => { if (openThread !== th.therapistId) e.currentTarget.style.background = "transparent"; }}
                  >
                    <Avatar name={th.therapistName} src={th.therapistPhoto} size={42} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>{th.therapistName}</p>
                        {th.unread > 0 && <span style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND, flexShrink: 0 }} />}
                      </div>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {th.last.text.replace(/\*\*/g, "").slice(0, 50)}…
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat window */}
              {openThread && (() => {
                const th = threads.find(t => t.therapistId === openThread);
                if (!th) return null;
                return (
                  <div className="chat-window" style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", display: "flex", flexDirection: "column", height: 560 }}>
                    {/* Chat header */}
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEF2F7", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <button className="chat-back-btn" onClick={() => setOpenThread(null)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0 4px 0 0", color: CTA, flexShrink: 0 }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                      <Avatar name={th.therapistName} src={th.therapistPhoto} size={38} />
                      <div>
                        <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>{th.therapistName}</p>
                        <p style={{ fontFamily: F, fontSize: 11, color: "var(--grey-text)", margin: 0 }}>{th.therapistRole}</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                      {chatMsgs.map(m => {
                        const isTherapist = m.from === "therapist";
                        const lines = m.text.split("\n");
                        return (
                          <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: isTherapist ? "flex-start" : "flex-end" }}>
                            <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: isTherapist ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: isTherapist ? "#F4F7FB" : CTA }}>
                              {lines.map((line, i) => {
                                if (!line) return <br key={i} />;
                                // bold markdown **text**
                                const parts = line.split(/\*\*(.*?)\*\*/g);
                                return (
                                  <p key={i} style={{ fontFamily: F, fontSize: 13, color: isTherapist ? "var(--black)" : "white", margin: "0 0 2px", lineHeight: 1.6 }}>
                                    {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
                                  </p>
                                );
                              })}
                            </div>
                            <span style={{ fontFamily: F, fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>
                              {new Date(m.sentAt).toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        );
                      })}
                      <div ref={chatBottom} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: "12px 16px", borderTop: "1px solid #EEF2F7", display: "flex", gap: 10 }}>
                      <input value={draft} onChange={e => setDraft(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMsg()}
                        placeholder="Nachricht schreiben…"
                        style={{ flex: 1, height: 42, borderRadius: 9999, border: "1.5px solid #E5E7EB", fontFamily: F, fontSize: 13, padding: "0 16px", outline: "none", background: "#F9FAFB", color: "var(--black)", transition: "border-color 0.2s" }}
                        onFocus={e => (e.target.style.borderColor = CTA)}
                        onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
                      />
                      <button onClick={sendMsg} style={{ width: 42, height: 42, borderRadius: "50%", background: CTA, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", flexShrink: 0 }}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
                        onMouseLeave={e => (e.currentTarget.style.background = CTA)}
                      >
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ═══ DOKUMENTE ═══ */}
          {tab === "dokumente" && (
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)", margin: "0 0 16px" }}>Meine Dokumente</h2>
              <div style={{ background: "white", borderRadius: 20, border: "1px solid #EEF2F7", overflow: "hidden" }}>
                {DOCS.map((doc, i) => (
                  <div key={doc.id} onClick={() => printDoc(doc)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: i < DOCS.length - 1 ? "1px solid #F3F4F6" : "none", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={doc.iconColor} strokeWidth="1.4" fill={doc.color}/>
                        <path d="M14 2v6h6" stroke={doc.iconColor} strokeWidth="1.4" strokeLinecap="round"/>
                        <path d="M8 13h8M8 17h5" stroke={doc.iconColor} strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 2px" }}>{doc.type}</p>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{doc.therapist} · Sitzung vom {doc.apptDate}</p>
                    </div>
                    <button className="doc-dl-btn" style={{ height: 36, padding: "0 14px", borderRadius: 9999, background: "var(--blue-ultra-light)", color: CTA, border: "none", fontFamily: F, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <DownloadIcon /> <span className="doc-dl-label">Herunterladen</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ PROFIL SETTINGS ═══ */}
          {tab === "profil" && (
            <ProfilSettings user={user} onLogout={() => { clearUser(); window.location.href = "/"; }} />
          )}

        </div>
      </main>
      <Footer />
      <style>{`
        .tooltip-wrap:hover .tooltip-box { opacity: 1 !important; }


        @media (max-width: 900px) {
          .nachrichten-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 1070px) {
          /* Wrapper padding */
          .profil-wrapper { padding-left: 16px !important; padding-right: 16px !important; }
          .profil-content { padding-top: 16px !important; padding-bottom: 40px !important; }

          /* Info strip — compact on mobile */
          .profil-info-strip { padding: 10px 14px 24px !important; }
          .profil-info-strip p { font-size: 12px !important; }

          /* Tab bar — horizontal scroll, lower height */
          .profil-tab-bar { border-radius: 9999px !important; margin-top: -16px !important; }
          .profil-tab-scroll { overflow-x: auto !important; -webkit-overflow-scrolling: touch; justify-content: flex-start !important; padding: 5px 8px !important; }
          .profil-tab-scroll button { padding: 7px 12px !important; font-size: 12px !important; white-space: nowrap !important; }
          .profil-tab-scroll button svg { display: none !important; }

          /* ProfilSettings two-col → single col, right col first */
          .profil-two-col { display: flex !important; flex-direction: column !important; }
          .profil-col-right { order: 0; width: 100% !important; }
          .profil-col-left  { order: 1; width: 100% !important; }

          /* Personal/Sicherheit inner grids → single col */
          .profil-personal-grid { grid-template-columns: 1fr !important; }
          .sicherheit-pw-grid { grid-template-columns: 1fr !important; }

          /* BookingCard buttons wrap */
          .booking-buttons { flex-wrap: wrap !important; }

          /* Nachrichten — full-screen chat on mobile */
          .nachrichten-grid { display: block !important; }
          .chat-thread-list { display: block !important; }
          .chat-thread-list--hidden { display: none !important; }
          .chat-window { height: calc(100vh - 200px) !important; border-radius: 16px !important; }
          .chat-back-btn { display: flex !important; }

          /* Termine header — stack on mobile */
          .termine-header { flex-direction: column !important; align-items: flex-start !important; gap: 10px; }

          /* Dokumente — icon only on mobile */
          .doc-dl-label { display: none !important; }
          .doc-dl-btn { height: 36px !important; width: 36px !important; padding: 0 !important; border-radius: 50% !important; justify-content: center !important; }

          /* BookingCard — stack avatar above content */
          .bc-header { flex-direction: column !important; align-items: flex-start !important; }
          .bc-body { padding-left: 0 !important; }

          /* Dashboard — single col, cards reorder via display:contents on wrappers */
          .dashboard-grid { display: flex !important; flex-direction: column !important; }
          .db-col-left, .db-col-right { display: contents !important; }
          .db-termin      { order: 1; }
          .db-nachrichten { order: 2; }
          .db-schnell     { order: 3; }
          .db-dokumente   { order: 4; }

          /* Banner height */
          .profil-banner { height: 200px !important; }
          .profil-banner-inner { padding: 36px 20px !important; }
          .profil-banner-text { font-size: 20px !important; }
          .profil-banner-sub { font-size: 13px !important; }
        }
      `}</style>
    </>
  );
}
