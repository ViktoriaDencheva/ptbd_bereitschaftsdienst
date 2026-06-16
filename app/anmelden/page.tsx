"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { storeUser } from "@/lib/auth";
import { GoogleLogin } from "@react-oauth/google";

const F = "'Poppins', sans-serif";

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
  label, type = "text", value, onChange, placeholder, rightElement, icon, required = true,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  rightElement?: React.ReactNode; icon?: React.ReactNode; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)" }}>
        {label}{required && <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }}>
            {icon}
          </div>
        )}
        <input
          type={type} value={value}
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

const MailIcon = () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/></svg>;
const LockIcon = () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5"/></svg>;
const ArrowIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill={color}/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.4 18.9 12 24 12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C37 38.3 44 33 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

const LOGIN_BULLETS = [
  "Termine buchen & verwalten",
  "Online-Sitzungen starten",
  "Dokumente herunterladen",
  "Sicher & DSGVO-konform",
];

const REGISTER_BULLETS = [
  "Bereits registriert? Einfach anmelden",
  "Deine Daten sind sicher verschlüsselt",
  "Zugang zu über 120+ Fachkräften",
  "Kassenrückerstattung möglich",
];

function GoogleButton({ label }: { label: string }) {
  const hasClientId = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  async function handleCredential(credentialResponse: { credential?: string }) {
    try {
      if (credentialResponse.credential) {
        // Decode JWT to get user info (no backend needed)
        const payload = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
        storeUser({
          name: payload.name ?? payload.email,
          email: payload.email,
          avatar: payload.picture,
          provider: "google",
        });
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
        <GoogleIcon /> {label}
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
        text={label.includes("registrier") ? "signup_with" : "signin_with"}
        shape="pill"
        size="large"
      />
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
      <span style={{ fontFamily: F, fontSize: 12, color: "#9CA3AF" }}>oder</span>
      <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
    </div>
  );
}

export default function AnmeldenPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Register state
  const [rVorname, setRVorname] = useState("");
  const [rNachname, setRNachname] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPhone, setRPhone] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [showRPw, setShowRPw] = useState(false);
  const [agb, setAgb] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  const pwStrength = rPassword.length === 0 ? 0 : rPassword.length < 6 ? 1 : rPassword.length < 10 ? 2 : 3;
  const strengthColor = ["transparent", "#EF4444", "#F59E0B", "#16A34A"][pwStrength];
  const strengthLabel = ["", "Schwach", "Mittel", "Stark"][pwStrength];

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setLoginError("Bitte fülle alle Pflichtfelder aus."); return; }
    setLoginError(""); setLoginLoading(true);
    setTimeout(() => {
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      storeUser({ name, email, provider: "email" });
      window.location.href = "/profil";
    }, 1000);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!rVorname || !rNachname || !rEmail || !rPhone || !rPassword) { setRegError("Bitte fülle alle Pflichtfelder aus."); return; }
    if (!agb) { setRegError("Bitte akzeptiere die AGB und Datenschutzerklärung."); return; }
    if (rPassword.length < 6) { setRegError("Das Passwort muss mindestens 6 Zeichen lang sein."); return; }
    setRegError(""); setRegLoading(true);
    setTimeout(() => {
      storeUser({ name: `${rVorname} ${rNachname}`, email: rEmail, provider: "email" });
      window.location.href = "/profil";
    }, 1200);
  }

  const LoginForm = (
    <div>
      <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px" }}>Willkommen zurück</h2>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.6 }}>
        Melde Dich an, um Deine Termine, Online-Sitzungen und Nachrichten zu verwalten.
      </p>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <InputField label="E-Mail-Adresse" type="email" value={email} onChange={setEmail} placeholder="Deine E-Mail-Adresse" icon={<MailIcon />} />
        <InputField label="Passwort" type={showPw ? "text" : "password"} value={password} onChange={setPassword} placeholder="Dein Passwort" icon={<LockIcon />}
          rightElement={<button type="button" onClick={() => setShowPw(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", padding: 0 }}><EyeIcon open={showPw} /></button>}
        />
        <div className="login-checkbox-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/passwort-vergessen" style={{ fontFamily: F, fontSize: 14, color: "var(--cta)", textDecoration: "none", fontWeight: 500 }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >Passwort vergessen?</a>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div onClick={() => setRemember(v => !v)} style={{ width: 16, height: 16, borderRadius: 3, border: remember ? "2px solid var(--cta)" : "2px solid #9CA3AF", background: remember ? "var(--cta)" : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}>
              {remember && <svg width="9" height="9" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </div>
            <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>Angemeldet bleiben</span>
          </label>
        </div>
        {loginError && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontFamily: F, fontSize: 13, color: "#991B1B" }}>{loginError}</div>}
        <button type="submit" disabled={loginLoading} style={{ width: "100%", height: 50, borderRadius: 9999, background: loginLoading ? "#93B8D8" : "var(--cta)", color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: loginLoading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
          onMouseEnter={e => { if (!loginLoading) e.currentTarget.style.background = "var(--cta-hover)"; }}
          onMouseLeave={e => { if (!loginLoading) e.currentTarget.style.background = "var(--cta)"; }}
        >{loginLoading ? "Anmelden …" : "Anmelden"}</button>
        <Divider />
        <GoogleButton label="Mit Google anmelden" />
      </form>
    </div>
  );

  const RegisterForm = (
    <div>
      <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px" }}>Konto erstellen</h2>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.6 }}>
        Verwalte Termine, Online-Sitzungen und Dokumente an einem Ort.
      </p>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="Vorname" value={rVorname} onChange={setRVorname} placeholder="Dein Vorname" />
          <InputField label="Nachname" value={rNachname} onChange={setRNachname} placeholder="Dein Nachname" />
        </div>
        <InputField label="E-Mail-Adresse" type="email" value={rEmail} onChange={setREmail} placeholder="Deine E-Mail-Adresse" icon={<MailIcon />} />
        <InputField label="Telefonnummer" type="tel" value={rPhone} onChange={setRPhone} placeholder="+43 123 456 789"
          icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
        <div>
          <InputField label="Passwort" type={showRPw ? "text" : "password"} value={rPassword} onChange={setRPassword} placeholder="Mindestens 6 Zeichen" icon={<LockIcon />}
            rightElement={<button type="button" onClick={() => setShowRPw(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", padding: 0 }}><EyeIcon open={showRPw} /></button>}
          />
          {rPassword.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, height: 3, borderRadius: 9999, background: "#E5E7EB", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(pwStrength / 3) * 100}%`, background: strengthColor, borderRadius: 9999, transition: "width 0.3s, background 0.3s" }} />
              </div>
              <span style={{ fontFamily: F, fontSize: 11, color: strengthColor, fontWeight: 600, minWidth: 38 }}>{strengthLabel}</span>
            </div>
          )}
        </div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
          <div onClick={() => setAgb(v => !v)} style={{ width: 16, height: 16, borderRadius: 3, border: agb ? "2px solid var(--cta)" : "2px solid #9CA3AF", background: agb ? "var(--cta)" : "white", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            {agb && <svg width="9" height="9" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
          </div>
          <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.5 }}>
            Ich akzeptiere die <a href="#" style={{ color: "var(--cta)", textDecoration: "underline" }}>AGB</a> und die <a href="#" style={{ color: "var(--cta)", textDecoration: "underline" }}>Datenschutzerklärung</a>.
          </span>
        </label>
        {regError && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontFamily: F, fontSize: 13, color: "#991B1B" }}>{regError}</div>}
        <button type="submit" disabled={regLoading} style={{ width: "100%", height: 50, borderRadius: 9999, background: regLoading ? "#93B8D8" : "var(--cta)", color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: regLoading ? "not-allowed" : "pointer", transition: "background 0.2s", marginTop: 4 }}
          onMouseEnter={e => { if (!regLoading) e.currentTarget.style.background = "var(--cta-hover)"; }}
          onMouseLeave={e => { if (!regLoading) e.currentTarget.style.background = "var(--cta)"; }}
        >{regLoading ? "Konto wird erstellt …" : "Konto erstellen"}</button>
        <Divider />
        <GoogleButton label="Mit Google registrieren" />
      </form>
    </div>
  );

  const LoginPromo = (
    <div>
      <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 8px" }}>Bereits registriert?</h2>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px", lineHeight: 1.6 }}>
        Melde Dich an und greife auf Deine Termine, Sitzungen und Dokumente zu.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {REGISTER_BULLETS.map((b, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cta)", flexShrink: 0, display: "inline-block" }} />
            {b}
          </li>
        ))}
      </ul>
      <button onClick={() => setMode("login")} className="auth-secondary-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: 50, borderRadius: 9999, background: "transparent", color: "var(--cta)", border: "1.5px solid var(--cta)", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-ultra-light)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        Anmelden
      </button>
    </div>
  );

  const RegisterPromo = (
    <div>
      <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 8px" }}>Noch kein Konto?</h2>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px", lineHeight: 1.6 }}>
        Erstelle kostenlos ein Konto und profitiere von allen Vorteilen der Plattform.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {LOGIN_BULLETS.map((b, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cta)", flexShrink: 0, display: "inline-block" }} />
            {b}
          </li>
        ))}
      </ul>
      <button onClick={() => setMode("register")} className="auth-secondary-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: 50, borderRadius: 9999, background: "transparent", color: "var(--cta)", border: "1.5px solid var(--cta)", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-ultra-light)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        Registrieren
      </button>
      <p style={{ fontFamily: F, fontSize: 13, color: "#9CA3AF", textAlign: "center", marginTop: 12 }}>Es dauert nur eine Minute.</p>
    </div>
  );

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
        <span style={{ fontFamily: F, fontSize: 13, color: "var(--cta)", fontWeight: 500 }}>{mode === "login" ? "Anmelden" : "Registrieren"}</span>
      </div>

      {/* ── Banner ── */}
      <div className="auth-banner-wrapper" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 0 40px" }}>
        <div className="auth-banner" style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          height: 320, backgroundImage: "url('/banner_Anmeldung.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
          <div className="banner-inner" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px" }}>
            <h1 className="banner-title" style={{ fontFamily: F, fontWeight: 700, fontSize: 36, color: "#111827", margin: 0, lineHeight: 1.2 }}>
              Deine Unterstützung,<br />wenn Du sie brauchst.
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main section ── */}
      <div>
        <div className="auth-main" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>
          <div className="auth-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 56px", alignItems: "center" }}>
            {/* LEFT */}
            <div>{mode === "login" ? LoginForm : RegisterForm}</div>

            {/* DIVIDER */}
            <div style={{ background: "#E5E7EB", width: 1, alignSelf: "stretch" }} />

            {/* RIGHT */}
            <div>{mode === "login" ? RegisterPromo : LoginPromo}</div>
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
          .auth-cols > div:nth-child(2) { display: none !important; }
          .auth-cols > div:nth-child(3) {
            padding-top: 32px !important;
            margin-top: 32px !important;
            border-top: 1px solid #E5E7EB !important;
          }
          /* Banner: portrait on mobile, title at top */
          .auth-banner-wrapper { padding: 0 16px 24px !important; }
          .auth-banner {
            height: 440px !important;
            border-radius: 16px !important;
            background-image: url('/banner_Anmeldung-mob.jpg') !important;
            background-position: center center !important;
            background-size: cover !important;
          }
          .banner-inner { justify-content: flex-start !important; padding: 56px 20px 0 !important; }
          .banner-title { font-size: 32px !important; color: #111827 !important; text-shadow: none !important; }
          /* Main section spacing */
          .auth-main { padding: 28px 16px 56px !important; }
          /* Vorname + Nachname stack vertically */
          .name-grid { grid-template-columns: 1fr !important; }
          /* Checkbox row: wrap to two lines */
          .login-checkbox-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          /* No hover effects on touch devices for secondary buttons */
          @media (hover: none) {
            .auth-secondary-btn { background: transparent !important; }
          }
        }
      `}</style>
    </>
  );
}
