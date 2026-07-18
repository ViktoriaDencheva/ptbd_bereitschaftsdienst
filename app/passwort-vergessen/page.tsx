"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

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

function StepIndicator({ current, isEN }: { current: number; isEN: boolean }) {
  const STEPS = isEN
    ? ["Forgot password", "Email sent", "New password", "Done"]
    : ["Passwort vergessen", "E-Mail versendet", "Neues Passwort", "Abgeschlossen"];

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: i <= current ? "var(--cta)" : "#E5E7EB",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s", flexShrink: 0,
            }}>
              {i < current ? (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              ) : (
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: i === current ? "white" : "#9CA3AF" }}>{i + 1}</span>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ width: 48, height: 2, background: i < current ? "var(--cta)" : "#E5E7EB", margin: "0 4px", transition: "background 0.3s", flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
      <div className="step-label" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginTop: 8 }}>
        {STEPS.map((label, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 32, display: "flex", justifyContent: "center" }}>
              <span style={{ fontFamily: F, fontSize: 11, color: i <= current ? "var(--cta)" : "#9CA3AF", fontWeight: i === current ? 600 : 400, whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div style={{ width: 48 + 8, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
      <p className="step-label-mobile" style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "var(--cta)", textAlign: "center", margin: "20px 0 0" }}>
        {STEPS[current]}
      </p>
    </div>
  );
}

function Step1({ onNext, isEN }: { onNext: (email: string) => void; isEN: boolean }) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(email); }, 1200);
  }

  return (
    <div style={{ maxWidth: 440, margin: "0 auto" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--cta)" strokeWidth="1.8"/>
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1.5" fill="var(--cta)"/>
        </svg>
      </div>
      <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px", textAlign: "center" }}>{isEN ? "Reset password" : "Passwort zurücksetzen"}</h1>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", textAlign: "center", lineHeight: 1.6 }}>
        {isEN ? "Enter your email address. We'll send you a link to reset your password." : "Gib Deine E-Mail-Adresse ein. Wir senden Dir einen Link zum Zurücksetzen Deines Passworts."}
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)" }}>
            {isEN ? "Email address" : "E-Mail-Adresse"}<span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/></svg>
            </div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder={isEN ? "Your email address" : "Deine E-Mail-Adresse"}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={{ width: "100%", padding: "13px 14px 13px 40px", borderRadius: 10, border: `1.5px solid ${focused ? "var(--cta)" : "#E0E0E0"}`, fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none", background: "white", boxSizing: "border-box", transition: "border-color 0.2s" }}
            />
          </div>
        </div>
        <button type="submit" disabled={loading || !email}
          style={{ width: "100%", height: 50, borderRadius: 9999, background: loading || !email ? "#93B8D8" : "var(--cta)", color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: loading || !email ? "not-allowed" : "pointer", transition: "background 0.2s" }}
          onMouseEnter={e => { if (!loading && email) e.currentTarget.style.background = "var(--cta-hover)"; }}
          onMouseLeave={e => { if (!loading && email) e.currentTarget.style.background = "var(--cta)"; }}
        >{loading ? (isEN ? "Sending …" : "Wird gesendet …") : (isEN ? "Send link" : "Link senden")}</button>
        <a href="/anmelden" style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", textAlign: "center", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
        >{isEN ? "Return to sign in" : "Zur Anmeldung zurückkehren"}</a>
      </form>
    </div>
  );
}

function Step2({ email, onNext, onResend, isEN }: { email: string; onNext: () => void; onResend: () => void; isEN: boolean }) {
  const [resent, setResent] = useState(false);

  function handleResend() {
    setResent(true);
    onResend();
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E4F2EB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#4A8C6A" strokeWidth="1.8"/>
          <polyline points="22,6 12,13 2,6" stroke="#4A8C6A" strokeWidth="1.8"/>
          <circle cx="18" cy="18" r="5" fill="#4A8C6A"/>
          <path d="M15.5 18l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px" }}>{isEN ? "Email sent" : "E-Mail versendet"}</h1>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 6px", lineHeight: 1.6 }}>
        {isEN ? "If an account with this email address exists, we've sent you a link to reset your password." : "Wenn ein Konto mit dieser E-Mail-Adresse existiert, haben wir Dir einen Link zum Zurücksetzen Deines Passworts geschickt."}
      </p>
      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: "var(--cta)", margin: "0 0 32px" }}>{email}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a href="/anmelden" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 50, borderRadius: 9999, background: "var(--cta)", color: "white", textDecoration: "none", fontFamily: F, fontWeight: 600, fontSize: 15, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
        >{isEN ? "Go to sign in" : "Zur Anmeldung"}</a>
        <button onClick={handleResend} style={{ width: "100%", height: 50, borderRadius: 9999, background: "transparent", color: resent ? "#4A8C6A" : "var(--cta)", border: `1.5px solid ${resent ? "#4A8C6A" : "var(--cta)"}`, fontFamily: F, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s" }}>
          {resent ? (isEN ? "✓ Email resent" : "✓ E-Mail erneut gesendet") : (isEN ? "Resend email" : "E-Mail erneut senden")}
        </button>
      </div>

      <div style={{ marginTop: 32, padding: "16px", borderRadius: 12, background: "var(--blue-ultra-light)", border: "1px solid #C8DFFF" }}>
        <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: "0 0 10px" }}>
          {isEN ? "Demo: simulate clicking the link in the email" : "Demo: Link aus der E-Mail simulieren"}
        </p>
        <button onClick={onNext} style={{ fontFamily: F, fontSize: 13, color: "var(--cta)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
          {isEN ? "→ Open password reset link" : "→ Passwort-Reset-Link öffnen"}
        </button>
      </div>
    </div>
  );
}

function Step3({ onNext, isEN }: { onNext: () => void; isEN: boolean }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [loading, setLoading] = useState(false);

  const checks = isEN ? [
    { label: "At least 8 characters", ok: pw.length >= 8 },
    { label: "One number", ok: /\d/.test(pw) },
    { label: "One special character", ok: /[^A-Za-z0-9]/.test(pw) },
  ] : [
    { label: "Mindestens 8 Zeichen", ok: pw.length >= 8 },
    { label: "Eine Zahl", ok: /\d/.test(pw) },
    { label: "Ein Sonderzeichen", ok: /[^A-Za-z0-9]/.test(pw) },
  ];
  const match = pw && pw2 && pw === pw2;
  const valid = checks.every(c => c.ok) && match;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1200);
  }

  return (
    <div style={{ maxWidth: 440, margin: "0 auto" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--cta)" strokeWidth="1.8"/>
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px", textAlign: "center" }}>{isEN ? "Create new password" : "Neues Passwort erstellen"}</h1>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", textAlign: "center", lineHeight: 1.6 }}>
        {isEN ? "Choose a secure password for your account." : "Wähle ein sicheres Passwort für Dein Konto."}
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)" }}>{isEN ? "New password" : "Neues Passwort"}<span style={{ color: "#EF4444", marginLeft: 2 }}>*</span></label>
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)}
              placeholder={isEN ? "New password" : "Neues Passwort"} onFocus={() => setFocused1(true)} onBlur={() => setFocused1(false)}
              style={{ width: "100%", padding: "13px 44px 13px 14px", borderRadius: 10, border: `1.5px solid ${focused1 ? "var(--cta)" : "#E0E0E0"}`, fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none", background: "white", boxSizing: "border-box", transition: "border-color 0.2s" }}
            />
            <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", padding: 0 }}>
              <EyeIcon open={showPw} />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: "var(--black)" }}>{isEN ? "Confirm password" : "Passwort bestätigen"}<span style={{ color: "#EF4444", marginLeft: 2 }}>*</span></label>
          <div style={{ position: "relative" }}>
            <input type={showPw2 ? "text" : "password"} value={pw2} onChange={e => setPw2(e.target.value)}
              placeholder={isEN ? "Confirm password" : "Passwort bestätigen"} onFocus={() => setFocused2(true)} onBlur={() => setFocused2(false)}
              style={{ width: "100%", padding: "13px 44px 13px 14px", borderRadius: 10, border: `1.5px solid ${pw2 && !match ? "#EF4444" : focused2 ? "var(--cta)" : "#E0E0E0"}`, fontFamily: F, fontSize: 14, color: "var(--black)", outline: "none", background: "white", boxSizing: "border-box", transition: "border-color 0.2s" }}
            />
            <button type="button" onClick={() => setShowPw2(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", padding: 0 }}>
              <EyeIcon open={showPw2} />
            </button>
          </div>
          {pw2 && !match && <p style={{ fontFamily: F, fontSize: 12, color: "#EF4444", margin: 0 }}>{isEN ? "Passwords do not match." : "Die Passwörter stimmen nicht überein."}</p>}
        </div>

        {pw.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {checks.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: c.ok ? "#E4F2EB" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {c.ok
                    ? <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="#4A8C6A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D1D5DB" }} />
                  }
                </div>
                <span style={{ fontFamily: F, fontSize: 13, color: c.ok ? "#4A8C6A" : "var(--grey-text)" }}>{c.label}</span>
              </div>
            ))}
          </div>
        )}

        <button type="submit" disabled={!valid || loading}
          style={{ width: "100%", height: 50, borderRadius: 9999, background: !valid || loading ? "#93B8D8" : "var(--cta)", color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: !valid || loading ? "not-allowed" : "pointer", transition: "background 0.2s", marginTop: 4 }}
          onMouseEnter={e => { if (valid && !loading) e.currentTarget.style.background = "var(--cta-hover)"; }}
          onMouseLeave={e => { if (valid && !loading) e.currentTarget.style.background = "var(--cta)"; }}
        >{loading ? (isEN ? "Saving …" : "Wird gespeichert …") : (isEN ? "Save password" : "Passwort speichern")}</button>
      </form>
    </div>
  );
}

function Step4({ isEN }: { isEN: boolean }) {
  return (
    <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#E4F2EB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path stroke="#4A8C6A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 26, color: "var(--black)", margin: "0 0 8px" }}>{isEN ? "Password changed successfully" : "Passwort erfolgreich geändert"}</h1>
      <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: "0 0 32px", lineHeight: 1.6 }}>
        {isEN ? "You can now sign in with your new password." : "Du kannst Dich jetzt mit Deinem neuen Passwort anmelden."}
      </p>
      <a href="/anmelden" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 50, borderRadius: 9999, background: "var(--cta)", color: "white", textDecoration: "none", fontFamily: F, fontWeight: 600, fontSize: 15, transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
      >{isEN ? "Go to sign in" : "Zur Anmeldung"}</a>
    </div>
  );
}

export default function PasswortVergessenPage() {
  const { lang } = useLang();
  const isEN = lang === 'en';
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 6 }}>
        <a href="/" style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
        >{isEN ? "Home" : "Startseite"}</a>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <a href="/anmelden" style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
        >{isEN ? "Sign in" : "Anmelden"}</a>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontFamily: F, fontSize: 13, color: "var(--cta)", fontWeight: 500 }}>{isEN ? "Forgot password" : "Passwort vergessen"}</span>
      </div>

      <main style={{ background: "#F8FAFE", minHeight: "calc(100vh - 200px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
          <StepIndicator current={step} isEN={isEN} />
          <div style={{ background: "white", borderRadius: 24, padding: "48px 40px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", maxWidth: 560, margin: "0 auto" }} className="pw-card">
            {step === 0 && <Step1 onNext={e => { setEmail(e); setStep(1); }} isEN={isEN} />}
            {step === 1 && <Step2 email={email} onNext={() => setStep(2)} onResend={() => {}} isEN={isEN} />}
            {step === 2 && <Step3 onNext={() => setStep(3)} isEN={isEN} />}
            {step === 3 && <Step4 isEN={isEN} />}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .step-label-mobile { display: none; }
        @media (max-width: 1070px) {
          .pw-card { padding: 32px 20px !important; }
          .step-label { display: none !important; }
          .step-label-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}
