"use client";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { storeUser } from "@/lib/auth";

const F = "'Poppins', sans-serif";

function GoogleIcon() {
  return <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.1 0-9.5-3.3-11.1-8l-6.5 5C9.6 39.5 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.2 5.2C37 38.1 44 33 44 24c0-1.2-.1-2.4-.4-3.5z"/></svg>;
}

function GoogleRegisterButton() {
  const hasClientId = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  async function handleCredential(credentialResponse: { credential?: string }) {
    try {
      if (credentialResponse.credential) {
        const payload = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
        storeUser({ name: payload.name ?? payload.email, email: payload.email, avatar: payload.picture, provider: "google" });
      } else {
        storeUser({ name: "Google Nutzer", email: "nutzer@gmail.com", provider: "google" });
      }
      window.location.href = "/profil";
    } catch {
      storeUser({ name: "Google Nutzer", email: "nutzer@gmail.com", provider: "google" });
      window.location.href = "/profil";
    }
  }

  const mockLogin = () => {
    storeUser({ name: "Google Nutzer", email: "nutzer@gmail.com", provider: "google" });
    window.location.href = "/profil";
  };

  if (!hasClientId || isMobile) {
    return (
      <button type="button" onClick={mockLogin} style={{ width: "100%", height: 48, borderRadius: 9999, background: "white", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)", cursor: "pointer" }}>
        <GoogleIcon /> Mit Google registrieren
      </button>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <GoogleLogin
        onSuccess={handleCredential}
        onError={() => {}}
        useOneTap={false}
        width="100%"
        text="signup_with"
        shape="pill"
        size="large"
      />
    </div>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function InputField({
  label, type = "text", value, onChange, placeholder, rightElement, icon,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  rightElement?: React.ReactNode; icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)" }}>{label}</label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: icon ? "13px 14px 13px 40px" : "13px 14px",
            paddingRight: rightElement ? "44px" : "14px",
            borderRadius: 10,
            border: `1.5px solid ${focused ? "var(--cta)" : "#E0E0E0"}`,
            fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none",
            background: "white", boxSizing: "border-box", transition: "border-color 0.2s",
          }}
        />
        {rightElement && (
          <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: "/icons/icon-vorgespraech.svg",          title: "Kostenlos & unverbindlich",        desc: "Die Registrierung ist kostenlos und ohne Verpflichtung." },
  { icon: "/icons/vertrauliche-kommunikation.svg",  title: "Termine buchen & verwalten",       desc: "Buche, ändere oder storniere Termine ganz einfach." },
  { icon: "/icons/dsgvo-konform.svg",               title: "Honorarnoten herunterladen",       desc: "Alle wichtigen Unterlagen sicher an einem Ort." },
  { icon: "/icons/sichere-verbindung.svg",           title: "Sicher & DSGVO-konform",           desc: "Deine Daten sind verschlüsselt und sicher bei uns." },
];

export default function RegistrierenPage() {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agb, setAgb] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColor = ["transparent", "#EF4444", "#F59E0B", "#16A34A"][pwStrength];
  const strengthLabel = ["", "Schwach", "Mittel", "Stark"][pwStrength];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vorname || !nachname || !email || !password) { setError("Bitte fülle alle Pflichtfelder aus."); return; }
    if (!agb) { setError("Bitte akzeptiere die AGB und Datenschutzerklärung."); return; }
    if (password.length < 6) { setError("Das Passwort muss mindestens 6 Zeichen lang sein."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { window.location.href = "/profil"; }, 1200);
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 6 }}>
        <a href="/" style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
        >Startseite</a>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontFamily: F, fontSize: 13, color: "var(--cta)", fontWeight: 500 }}>Registrieren</span>
      </div>

      {/* ── Banner ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 0 40px" }}>
        <div style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          height: 320, backgroundImage: "url('/banner_Anmeldung.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: 520 }}>
            <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 36, color: "#111827", margin: "0 0 12px", lineHeight: 1.2 }}>
              Dein persönlicher<br />Bereich wartet.
            </h1>
            <p style={{ fontFamily: F, fontSize: 15, color: "#374151", margin: 0, lineHeight: 1.6 }}>
              Erstelle Dein Konto in einer Minute und<br />starte Deine Therapiebegleitung.
            </p>
          </div>
        </div>
      </div>

      {/* ── Register + Benefits section ── */}
      <div style={{ background: "#F8FAFE", borderTop: "1px solid #EEF2F7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>
          <div className="auth-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 48px", alignItems: "start" }}>

            {/* ── LEFT: Register form ── */}
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px" }}>Konto erstellen</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.6 }}>
                Verwalte Termine, Online-Sitzungen und Dokumente an einem Ort.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <InputField label="Vorname" value={vorname} onChange={setVorname} placeholder="Dein Vorname" />
                  <InputField label="Nachname" value={nachname} onChange={setNachname} placeholder="Dein Nachname" />
                </div>

                <InputField
                  label="E-Mail-Adresse" type="email" value={email} onChange={setEmail}
                  placeholder="Deine E-Mail-Adresse"
                  icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/></svg>}
                />

                <div>
                  <InputField
                    label="Passwort" type={showPw ? "text" : "password"}
                    value={password} onChange={setPassword} placeholder="Mindestens 6 Zeichen"
                    icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    rightElement={
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", padding: 0 }}>
                        <EyeIcon open={showPw} />
                      </button>
                    }
                  />
                  {password.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <div style={{ flex: 1, height: 3, borderRadius: 9999, background: "#E5E7EB", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(pwStrength / 3) * 100}%`, background: strengthColor, borderRadius: 9999, transition: "width 0.3s, background 0.3s" }} />
                      </div>
                      <span style={{ fontFamily: F, fontSize: 11, color: strengthColor, fontWeight: 600, minWidth: 38 }}>{strengthLabel}</span>
                    </div>
                  )}
                </div>

                {/* AGB */}
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <div
                    onClick={() => setAgb(v => !v)}
                    style={{ width: 16, height: 16, borderRadius: 3, border: agb ? "2px solid var(--cta)" : "2px solid #9CA3AF", background: agb ? "var(--cta)" : "white", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                  >
                    {agb && <svg width="9" height="9" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                  </div>
                  <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.5 }}>
                    Ich akzeptiere die{" "}
                    <a href="#" style={{ color: "var(--cta)", textDecoration: "underline" }}>AGB</a>
                    {" "}und die{" "}
                    <a href="#" style={{ color: "var(--cta)", textDecoration: "underline" }}>Datenschutzerklärung</a>.
                  </span>
                </label>

                {error && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontFamily: F, fontSize: 13, color: "#991B1B" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  style={{ width: "100%", height: 50, borderRadius: 9999, background: loading ? "#93B8D8" : "var(--cta)", color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", marginTop: 4 }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "var(--cta-hover)"; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "var(--cta)"; }}
                >
                  {loading ? "Konto wird erstellt …" : "Konto erstellen"}
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                  <span style={{ fontFamily: F, fontSize: 12, color: "#9CA3AF" }}>oder</span>
                  <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                </div>

                <GoogleRegisterButton />

                <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textAlign: "center", margin: 0 }}>
                  Bereits registriert?{" "}
                  <a href="/anmelden" style={{ color: "var(--cta)", fontWeight: 600, textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                  >Anmelden</a>
                </p>
              </form>
            </div>

            {/* ── DIVIDER ── */}
            <div style={{ background: "#E5E7EB", width: 1, alignSelf: "stretch" }} />

            {/* ── RIGHT: Benefits ── */}
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px" }}>Deine Vorteile</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.6 }}>
                Alles, was Du für Deine Therapiebegleitung brauchst, an einem Ort.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {FEATURES.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src={f.icon} alt="" style={{ width: 22, height: 22 }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 2px" }}>{f.title}</p>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 1070px) {
          .auth-cols {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .auth-cols > div:nth-child(2) {
            display: none !important;
          }
          .auth-cols > div:nth-child(3) {
            padding-top: 40px !important;
            margin-top: 40px !important;
            border-top: 1px solid #E5E7EB !important;
          }
        }
      `}</style>
    </>
  );
}
