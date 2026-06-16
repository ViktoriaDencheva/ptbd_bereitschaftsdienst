"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBookings, type Booking } from "@/lib/bookings";
import { sendTherapistMessage } from "@/lib/messages";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";

/* ── therapist speech lines (spoken aloud via SpeechSynthesis) ───────── */
const GREETING = "Guten Tag! Schön, dass Sie heute dabei sind. Entschuldigen Sie bitte, ich bin leider ohne Kamera heute. Aber ich freue mich sehr, Ihnen helfen zu können. Wie geht es Ihnen?";

const SPOKEN_REPLIES = [
  "Das klingt sehr verständlich. Erzählen Sie mir bitte mehr davon.",
  "Wie lange begleitet Sie dieses Gefühl schon?",
  "Was hat sich in letzter Zeit in Ihrem Alltag verändert?",
  "Das ist ein wichtiger Schritt, dass Sie darüber sprechen können.",
  "Haben Sie jemanden in Ihrem Umfeld, mit dem Sie über diese Dinge reden können?",
  "Wie reagiert Ihr Körper, wenn Sie in solchen Situationen sind?",
  "Ich verstehe. Das klingt wirklich herausfordernd für Sie.",
  "Was würde Ihnen in dieser Situation am meisten helfen?",
];

/* ── icons ─────────────────────────────────────────────────────────── */
function MicOnIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function MicOffIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 1l22 22M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function CamOnIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function CamOffIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 1l22 22M15.18 15.18A2 2 0 0113 17H5a2 2 0 01-2-2V8a2 2 0 01.18-.83M7.76 3H13a2 2 0 012 2v.18l4.447-2.224A1 1 0 0121 3.9v7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function PhoneOffIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92v3.28a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.42 19.42 0 013.32 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0H5.5a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.18 7.9a16 16 0 004.5 5.41z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M23 1L1 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function ScreenIcon() {
  return <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function ChatIcon({ unread }: { unread?: boolean }) {
  return (
    <span style={{ position: "relative" }}>
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {unread && <span style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: "var(--cta-brand)", border: "1.5px solid #1e293b" }} />}
    </span>
  );
}

/* ── chat types ─────────────────────────────────────────────────────── */
interface Msg { from: "you" | "them"; text: string; time: string }

const INITIAL_MSGS: Msg[] = [
  { from: "them", text: "Guten Tag! Schön, dass Sie heute dabei sind. Entschuldigen Sie bitte, ich bin ohne Kamera heute. Wie geht es Ihnen?", time: "10:01" },
];

function nowStr() {
  return new Date().toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" });
}

/* ── speech helper ──────────────────────────────────────────────────── */
function speak(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.92;
  u.pitch = 1.05;

  // prefer a German female voice if available
  const voices = window.speechSynthesis.getVoices();
  const deVoice =
    voices.find(v => v.lang.startsWith("de") && v.name.toLowerCase().includes("female")) ||
    voices.find(v => v.lang.startsWith("de") && !v.name.toLowerCase().includes("male")) ||
    voices.find(v => v.lang.startsWith("de")) ||
    null;
  if (deVoice) u.voice = deVoice;

  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
}

/* ── timer ──────────────────────────────────────────────────────────── */
function useTimer() {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ── therapist avatar ───────────────────────────────────────────────── */
function TherapistAvatar({ name, src, size = 120 }: { name: string; src?: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const [ok, setOk] = useState(true);
  if (src && ok) {
    return <img src={src} alt={name} onError={() => setOk(false)}
      style={{ width: size, height: size, borderRadius: 16, objectFit: "cover", objectPosition: "center top" }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: 16, background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: F, fontWeight: 700, fontSize: size * 0.32, color: "rgba(255,255,255,0.85)" }}>{initials}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function GespraechPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(false);         // starts off — user grants on demand
  const [sharing, setSharing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState(false);
  const [ended, setEnded] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const [therapistSpeaking, setTherapistSpeaking] = useState(false);
  const [camError, setCamError] = useState("");

  const chatBottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timer = useTimer();

  /* load booking */
  useEffect(() => {
    const b = getBookings().find(bk => bk.id === id);
    setBooking(b ?? null);
  }, [id]);

  /* play greeting after a short delay */
  useEffect(() => {
    // voices may not be loaded immediately
    const playGreeting = () => {
      setTimeout(() => {
        setTherapistSpeaking(true);
        speak(GREETING, () => setTherapistSpeaking(false));
      }, 1200);
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      playGreeting();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", playGreeting, { once: true });
    }
    return () => {
      window.speechSynthesis.cancel();
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* camera helpers */
  const startCamera = useCallback(async () => {
    setCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCamOn(true);
    } catch {
      setCamError("Kamerazugriff verweigert");
      setCamOn(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamOn(false);
  }, []);

  const toggleCam = useCallback(() => {
    if (camOn) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [camOn, startCamera, stopCamera]);

  /* keep video element in sync when camOn changes */
  useEffect(() => {
    if (camOn && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [camOn]);

  /* auto-scroll chat */
  useEffect(() => {
    chatBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  /* send chat + auto-reply with spoken voice */
  function sendMessage() {
    if (!draft.trim()) return;
    const userMsg: Msg = { from: "you", text: draft.trim(), time: nowStr() };
    setMsgs(m => [...m, userMsg]);
    setDraft("");

    const replyText = SPOKEN_REPLIES[replyIndex % SPOKEN_REPLIES.length];
    setReplyIndex(i => i + 1);

    setTimeout(() => {
      setTherapistSpeaking(true);
      const replyMsg: Msg = { from: "them", text: replyText, time: nowStr() };
      setMsgs(m => [...m, replyMsg]);
      if (!chatOpen) setUnread(true);
      speak(replyText, () => setTherapistSpeaking(false));
    }, 1600);
  }

  function openChat() {
    setChatOpen(true);
    setUnread(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  const therapistName = booking?.therapistName ?? "Fachkraft";
  const therapistPhoto = booking?.therapistPhoto;

  /* ── ended screen ─────────────────────────────────────────────────── */
  if (ended) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, padding: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 24, color: "white", margin: "0 0 8px" }}>Gespräch beendet</h1>
          <p style={{ fontFamily: F, fontSize: 14, color: "#94a3b8", margin: 0 }}>Dauer: {timer}</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => router.push("/profil")} style={{ height: 44, padding: "0 24px", borderRadius: 9999, background: CTA, color: "white", border: "none", fontFamily: F, fontWeight: 500, fontSize: 14, cursor: "pointer" }}>
            Zum Profil
          </button>
          <button onClick={() => router.push("/fachkraefte")} style={{ height: 44, padding: "0 24px", borderRadius: 9999, background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", fontFamily: F, fontSize: 14, cursor: "pointer" }}>
            Neue Fachkraft
          </button>
        </div>
      </div>
    );
  }

  /* ── main UI ──────────────────────────────────────────────────────── */
  return (
    <div style={{ height: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Top bar */}
      <div style={{ height: 56, borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "white" }}>{therapistName}</span>
          <span style={{ fontFamily: F, fontSize: 13, color: "#64748b", marginLeft: 6 }}>{timer}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {sharing && (
            <span style={{ fontFamily: F, fontSize: 12, color: "#fbbf24", background: "rgba(251,191,36,0.12)", borderRadius: 9999, padding: "3px 10px" }}>
              Bildschirm wird geteilt
            </span>
          )}
          <span style={{ fontFamily: F, fontSize: 12, color: "#475569" }}>Online-Sitzung · Verschlüsselt</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4ade80" strokeWidth="1.5"/></svg>
        </div>
      </div>

      {/* Video area + optional chat */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>

          {/* Therapist "video" */}
          <div style={{ width: "min(640px, 90%)", aspectRatio: "16/9", background: "#1e293b", borderRadius: 20, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${therapistSpeaking ? "#4ade80" : "#334155"}`, transition: "border-color 0.3s", boxShadow: therapistSpeaking ? "0 0 0 3px rgba(74,222,128,0.2)" : "none" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1e293b 0%, #0f2040 50%, #1a1f35 100%)" }} />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <TherapistAvatar name={therapistName} src={therapistPhoto} size={120} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: "white", margin: "0 0 4px" }}>{therapistName}</p>
                <p style={{ fontFamily: F, fontSize: 12, color: "#64748b", margin: 0 }}>
                  {therapistSpeaking ? "spricht gerade…" : "Kamera nicht verfügbar · Audio aktiv"}
                </p>
              </div>
              {/* Audio bars — animate when speaking */}
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 24 }}>
                {[6, 14, 10, 18, 8, 16, 12, 10, 18].map((h, i) => (
                  <div key={i} style={{
                    width: 3,
                    height: therapistSpeaking ? h : 4,
                    borderRadius: 2,
                    background: therapistSpeaking ? "#4ade80" : "#334155",
                    transition: "height 0.15s, background 0.3s",
                    animation: therapistSpeaking ? `pulse-bar ${0.4 + i * 0.07}s ease-in-out infinite alternate` : "none",
                  }} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(0,0,0,0.5)", borderRadius: 8, padding: "4px 10px", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: 6 }}>
              {therapistSpeaking && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />}
              <span style={{ fontFamily: F, fontSize: 12, color: "white" }}>{therapistName}</span>
            </div>
          </div>

          {/* Self-view PiP */}
          <div style={{ position: "absolute", bottom: 20, right: 20, width: 160, height: 106, background: "#111827", borderRadius: 14, overflow: "hidden", border: `2px solid ${camOn ? "#2D5B8D" : "#334155"}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, transition: "border-color 0.2s" }}>
            {/* real camera video */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: camOn ? "block" : "none", transform: "scaleX(-1)" }}
            />
            {/* overlay when cam off */}
            {!camOn && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: "#64748b" }}>Du</span>
                </div>
                <span style={{ fontFamily: F, fontSize: 10, color: "#64748b" }}>
                  {camError || "Kamera aus"}
                </span>
              </div>
            )}
            {/* "Du" label */}
            {camOn && (
              <div style={{ position: "absolute", bottom: 6, left: 8, zIndex: 2 }}>
                <span style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.8)" }}>Du</span>
              </div>
            )}
          </div>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <div style={{ width: 300, background: "#1e293b", borderLeft: "1px solid #334155", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "white" }}>Chat</span>
              <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "you" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "8px 12px", borderRadius: m.from === "you" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.from === "you" ? CTA : "#2d3748" }}>
                    <p style={{ fontFamily: F, fontSize: 13, color: "white", margin: 0, lineHeight: 1.5 }}>{m.text}</p>
                  </div>
                  <span style={{ fontFamily: F, fontSize: 10, color: "#475569", marginTop: 3 }}>{m.time}</span>
                </div>
              ))}
              <div ref={chatBottom} />
            </div>
            <div style={{ padding: "10px 12px", borderTop: "1px solid #334155", display: "flex", gap: 8 }}>
              <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Nachricht…"
                style={{ flex: 1, height: 38, borderRadius: 9999, background: "#0f172a", border: "1px solid #334155", color: "white", fontFamily: F, fontSize: 13, padding: "0 14px", outline: "none" }} />
              <button onClick={sendMessage} style={{ width: 38, height: 38, borderRadius: "50%", background: CTA, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div style={{ height: 80, borderTop: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexShrink: 0 }}>
        <ControlBtn active={micOn} onClick={() => setMicOn(v => !v)} label={micOn ? "Stummschalten" : "Stummschaltung aufheben"}>
          {micOn ? <MicOnIcon /> : <MicOffIcon />}
        </ControlBtn>

        <ControlBtn active={camOn} onClick={toggleCam} label={camOn ? "Kamera aus" : "Kamera ein"}>
          {camOn ? <CamOnIcon /> : <CamOffIcon />}
        </ControlBtn>

        <ControlBtn active={sharing} onClick={() => setSharing(v => !v)} label={sharing ? "Teilen stoppen" : "Bildschirm teilen"}>
          <ScreenIcon />
        </ControlBtn>

        <ControlBtn active={chatOpen} onClick={openChat} label="Chat">
          <ChatIcon unread={unread} />
        </ControlBtn>

        <button onClick={() => {
          window.speechSynthesis.cancel();
          stopCamera();
          // send session summary from therapist to patient chat
          if (booking) {
            const summary = `Vielen Dank für unser heutiges Gespräch! 😊\n\n**Zusammenfassung unserer Sitzung:**\nWir haben heute über Ihre aktuellen Belastungen gesprochen und erste Schritte erarbeitet.\n\n**Meine Empfehlungen für die nächsten Tage:**\n• Versuchen Sie täglich 10 Minuten Atemübungen einzuplanen\n• Führen Sie ein kurzes Stimmungstagebuch – nur 2–3 Sätze pro Tag\n• Achten Sie auf ausreichend Schlaf und Bewegung\n\nBei Fragen oder wenn Sie zwischen unseren Terminen Unterstützung brauchen, können Sie mir hier jederzeit schreiben. Bis zum nächsten Gespräch! 💙`;
            sendTherapistMessage(
              booking.therapistId,
              booking.therapistName,
              booking.therapistRole,
              booking.therapistPhoto,
              summary
            );
          }
          setEnded(true);
        }} title="Gespräch beenden"
          style={{ width: 52, height: 52, borderRadius: "50%", background: "#dc2626", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "background 0.2s", marginLeft: 12 }}
          onMouseEnter={e => (e.currentTarget.style.background = "#b91c1c")}
          onMouseLeave={e => (e.currentTarget.style.background = "#dc2626")}
        >
          <PhoneOffIcon />
        </button>
      </div>

      <style>{`
        @keyframes pulse-bar {
          from { transform: scaleY(0.3); opacity: 0.5; }
          to   { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ControlBtn({ children, active, onClick, label }: { children: React.ReactNode; active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} title={label}
      style={{ width: 48, height: 48, borderRadius: "50%", background: active ? "#1e293b" : "#374151", border: `1.5px solid ${active ? "#334155" : "#4b5563"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: active ? "white" : "#9ca3af", transition: "all 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.background = "#2d3748")}
      onMouseLeave={e => (e.currentTarget.style.background = active ? "#1e293b" : "#374151")}
    >
      {children}
    </button>
  );
}
