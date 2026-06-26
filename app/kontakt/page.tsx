"use client";
import { useState, useEffect } from "react";
import { Plus, Minus, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AustriaMap, { PROVINCES } from "@/components/AustriaMap";
type ProvinceId = typeof PROVINCES[number]["id"];

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const CTA_HEX = "#2D5B8D";
const RED = "#CD1719";

function useWindowWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(window.innerWidth);
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => removeEventListener("resize", h);
  }, []);
  return w;
}

const ACTION_CARDS = [
  {
    icon: "/icons/icon-vorgespraech.svg",
    title: "Orientierungsgespräch",
    desc: "Kostenloses 20-minütiges Gespräch, um gemeinsam herauszufinden, welche Unterstützung zu dir passt.",
    cta: "Jetzt buchen",
    href: "/vorgespraech",
    accent: CTA_HEX,
  },
  {
    icon: "/icons/icon-mail.svg",
    title: "Kontaktformular",
    desc: "Du hast eine Frage oder ein Anliegen? Schreib uns — wir antworten innerhalb von 24 Stunden.",
    cta: "Zum Formular",
    href: "#kontaktformular",
    accent: CTA_HEX,
  },
  {
    icon: "/icons/icon-fachkraefte-warum.svg",
    title: "Fachkräfte Bereich",
    desc: "Direkt passende Therapeut*innen, Psycholog*innen oder Psychiater*innen in deiner Region finden.",
    cta: "Fachkräfte entdecken",
    href: "/fachkraefte",
    accent: CTA_HEX,
  },
  {
    icon: "/icons/icon-unterstuetzung.svg",
    title: "Notfall & Krise",
    desc: "Bei akuter Gefahr ruf sofort den Notruf 112 oder die Telefonseelsorge 142 an. Wir helfen dir weiter.",
    cta: "Kriseninfo",
    href: "#notfall",
    accent: RED,
    isRed: true,
  },
];

const INFO_CARDS = [
  { icon: "/icons/icon-phone-contact.svg", label: "Telefon", value: "+43 1 123 45 67", sub: "Mo–Fr · 9:00–17:00 Uhr" },
  { icon: "/icons/icon-mail.svg", label: "E-Mail", value: "info@ptbd.at", sub: "Antwort innerhalb 24h" },
  { icon: "/icons/icon-pin.svg", label: "Österreichweit", value: "Alle 9 Bundesländer", sub: "In deiner Region verfügbar" },
  { icon: "/icons/icon-clock.svg", label: "Antwortzeit", value: "< 24 Stunden", sub: "Schnelle, persönliche Rückmeldung" },
];

const THEMEN = [
  "Allgemeine Frage",
  "Therapeut*in finden",
  "Orientierungsgespräch",
  "Kosten & Krankenkasse",
  "Technisches Problem",
  "Feedback & Anregungen",
  "Sonstiges",
];

const TIMELINE = [
  { icon: "/icons/icon-mail.svg", title: "Nachricht erhalten", desc: "Wir erhalten deine Anfrage und bestätigen den Eingang automatisch per E-Mail." },
  { icon: "/icons/icon-vorgespraech.svg", title: "Persönliche Prüfung", desc: "Unser Team liest deine Nachricht und leitet sie an die richtige Person weiter." },
  { icon: "/icons/icon-orientierung.svg", title: "Antwort innerhalb 24h", desc: "Du erhältst eine persönliche Antwort — oft schon nach wenigen Stunden." },
  { icon: "/icons/icon-fachkraefte-warum.svg", title: "Weiterer Support", desc: "Falls nötig, begleiten wir dich beim nächsten Schritt — Gespräch, Vermittlung oder Info." },
];

const FAQS = [
  { q: "Wie schnell erhalte ich eine Antwort auf meine Nachricht?", a: "Wir bemühen uns, alle Anfragen innerhalb von 24 Werktags-Stunden zu beantworten. Bei dringenden Anliegen empfehlen wir, uns telefonisch zu kontaktieren." },
  { q: "Ist das Orientierungsgespräch wirklich kostenlos?", a: "Ja, das Orientierungsgespräch ist vollständig kostenlos und unverbindlich. Es dauert ca. 20 Minuten und hilft dir herauszufinden, welche Unterstützung am besten zu dir passt." },
  { q: "Kann ich anonym Kontakt aufnehmen?", a: "Ja, du kannst uns auch anonym kontaktieren. Wenn du einen Rückruf oder eine direkte Antwort möchtest, benötigen wir natürlich deine Kontaktdaten." },
  { q: "Was tue ich, wenn ich mich in einer akuten Krise befinde?", a: "Bei akuter Selbst- oder Fremdgefährdung ruf bitte sofort den Notruf 112 oder die Telefonseelsorge unter 142 an. Unsere Plattform ist nicht für Notfallsituationen ausgelegt." },
];

const wrap = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };

export default function KontaktPage() {
  const width = useWindowWidth();
  const isMobile = width > 0 && width < 768;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | null>(null);
  const [formState, setFormState] = useState({ vorname: "", nachname: "", email: "", telefon: "", thema: "", nachricht: "", dsgvo: false });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.vorname || !formState.email || !formState.nachricht || !formState.dsgvo) return;
    setSubmitted(true);
  }

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ background: "white" }}>
        {/* Breadcrumbs */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "20px 16px 12px" : "28px 40px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
            <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CTA}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"}>Startseite</a>
            <span style={{ color: "#C3C3C3" }}>›</span>
            <span style={{ color: "var(--black)", fontWeight: 500 }}>Kontakt</span>
          </div>
        </div>

        {/* Banner with text overlay */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden", height: isMobile ? 480 : 560 }}>
          <img
            src="/kontakt-banner.png"
            alt="Kontakt"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: isMobile ? "flex-end" : "center" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 20px 60px" : "0 40px", width: "100%" }}>
              <div style={{ maxWidth: isMobile ? "100%" : 560 }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA_HEX, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Kontakt</span>
                <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 28 : 44, lineHeight: 1.2, color: "var(--black)", margin: "10px 0 16px" }}>
                  Wir sind für<br />dich da.
                </h1>
                <p style={{ fontFamily: F, fontSize: isMobile ? 14 : 16, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 20px" }}>
                  Egal ob du Fragen hast, Unterstützung brauchst oder einfach nicht weißt, wo du anfangen sollst — wir helfen dir weiter.
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 28 }}>
                  {[
                    "Persönliche Beratung auf Wunsch",
                    "Antwort innerhalb von 24 Stunden",
                    "Kostenlos & vertraulich",
                  ].map((text, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={18} color={CTA_HEX} strokeWidth={2.2} />
                      <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
                  <a href="#kontaktformular"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", whiteSpace: "nowrap" as const }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA_HEX}>
                    Nachricht schreiben
                    <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
                  </a>
                  <a href="tel:+4311234567"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 24px", borderRadius: 9999, border: `1.5px solid ${CTA_HEX}`, color: CTA_HEX, fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", background: "white", whiteSpace: "nowrap" as const }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEF4FC"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
                    +43 1 123 45 67
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── KONTAKTMÖGLICHKEITEN ──────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Direkt erreichbar</span>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "8px 0 0" }}>So erreichst du uns</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {INFO_CARDS.map((card, i) => (
              <div key={i} style={{ background: "white", borderRadius: 20, padding: "28px 20px", border: "1.5px solid #D0DFF0", display: "flex", flexDirection: "column", gap: 10, textAlign: "center", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={card.icon} width={24} height={24} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)" }} />
                </div>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: CTA, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{card.label}</p>
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 14 : 16, color: "var(--black)", margin: 0 }}>{card.value}</p>
                <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAKTFORMULAR ───────────────────────────────────────────── */}
      <section id="kontaktformular" style={{ background: "white", padding: isMobile ? "48px 0" : "80px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 40 : 64, alignItems: "flex-start" }}>

            {/* Form left */}
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Schreib uns</span>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "8px 0 28px" }}>Kontaktformular</h2>

              {submitted ? (
                <div style={{ background: "var(--blue-ultra-light)", borderRadius: 20, padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
                  <CheckCircle2 size={56} color={CTA_HEX} strokeWidth={1.8} />
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "var(--black)", margin: 0 }}>Nachricht gesendet!</h3>
                  <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.7, maxWidth: 380 }}>
                    Vielen Dank für deine Nachricht. Wir melden uns innerhalb von 24 Stunden bei dir zurück.
                  </p>
                  <a href="/orientierungstest" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 28px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", marginTop: 8 }}>
                    Orientierungstest starten →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Vorname *", key: "vorname", placeholder: "Max" },
                      { label: "Nachname *", key: "nachname", placeholder: "Mustermann" },
                    ].map(f => (
                      <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>{f.label}</span>
                        <input
                          value={(formState as any)[f.key]}
                          onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          required={f.label.includes("*")}
                          style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white" }}
                          onFocus={e => (e.target.style.borderColor = CTA_HEX)}
                          onBlur={e => (e.target.style.borderColor = "var(--grey-border)")}
                        />
                      </label>
                    ))}
                  </div>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>E-Mail *</span>
                    <input
                      type="email" value={formState.email} required
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      placeholder="max@beispiel.at"
                      style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white" }}
                      onFocus={e => (e.target.style.borderColor = CTA_HEX)}
                      onBlur={e => (e.target.style.borderColor = "var(--grey-border)")}
                    />
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>Telefon <span style={{ color: "var(--grey-text)", fontWeight: 400 }}>(optional)</span></span>
                    <input
                      type="tel" value={formState.telefon}
                      onChange={e => setFormState(s => ({ ...s, telefon: e.target.value }))}
                      placeholder="+43 1 234 567"
                      style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white" }}
                      onFocus={e => (e.target.style.borderColor = CTA_HEX)}
                      onBlur={e => (e.target.style.borderColor = "var(--grey-border)")}
                    />
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>Thema *</span>
                    <select
                      value={formState.thema} required
                      onChange={e => setFormState(s => ({ ...s, thema: e.target.value }))}
                      style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: formState.thema ? "var(--black)" : "var(--grey-text)", background: "white", appearance: "none", cursor: "pointer" }}
                      onFocus={e => (e.target.style.borderColor = CTA_HEX)}
                      onBlur={e => (e.target.style.borderColor = "var(--grey-border)")}
                    >
                      <option value="" disabled>Bitte wählen…</option>
                      {THEMEN.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>Nachricht *</span>
                    <textarea
                      value={formState.nachricht} required rows={5}
                      onChange={e => setFormState(s => ({ ...s, nachricht: e.target.value }))}
                      placeholder="Beschreibe dein Anliegen…"
                      style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white", resize: "vertical", lineHeight: 1.6 }}
                      onFocus={e => (e.target.style.borderColor = CTA_HEX)}
                      onBlur={e => (e.target.style.borderColor = "var(--grey-border)")}
                    />
                  </label>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <input
                      type="checkbox" checked={formState.dsgvo} required
                      onChange={e => setFormState(s => ({ ...s, dsgvo: e.target.checked }))}
                      style={{ width: 16, height: 16, flexShrink: 0, marginTop: 3, accentColor: CTA_HEX }}
                    />
                    <span style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", lineHeight: 1.6 }}>
                      Ich stimme der <a href="#" style={{ color: CTA_HEX }}>Datenschutzerklärung</a> zu und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden. *
                    </span>
                  </label>
                  <button type="submit"
                    style={{ height: 52, borderRadius: 9999, background: CTA_HEX, color: "white", border: "none", fontFamily: F, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 20px rgba(45,91,141,0.28)", transition: "background 0.2s", marginTop: 4 }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA_HEX}>
                    Nachricht senden
                    <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
                  </button>
                </form>
              )}
            </div>

            {/* Right info panel */}
            <div style={{ flex: "0 0 340px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "var(--blue-ultra-light)", borderRadius: 20, padding: "28px 24px" }}>
                <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "var(--black)", margin: "0 0 16px" }}>Warum uns kontaktieren?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Wir finden gemeinsam die passende Unterstützung für dich",
                    "Keine Wartelisten — schnelle, unkomplizierte Hilfe",
                    "Unser Team kennt das österreichische Versorgungssystem",
                    "Vertraulich, kostenlos und ohne Verpflichtung",
                    "Österreichweit verfügbar — in allen 9 Bundesländern",
                  ].map((text, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle2 size={17} color={CTA_HEX} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", lineHeight: 1.55 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "white", border: "1.5px solid #EAF0FA", borderRadius: 20, padding: "24px" }}>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 12px" }}>Direktkontakt</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="tel:+4311234567" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <img src="/icons/icon-phone-contact.svg" width={18} height={18} alt="" />
                    <span style={{ fontFamily: F, fontSize: 14, color: CTA_HEX, fontWeight: 500 }}>+43 1 123 45 67</span>
                  </a>
                  <a href="mailto:info@ptbd.at" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <img src="/icons/icon-mail.svg" width={18} height={18} alt="" />
                    <span style={{ fontFamily: F, fontSize: 14, color: CTA_HEX, fontWeight: 500 }}>info@ptbd.at</span>
                  </a>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="/icons/icon-clock.svg" width={18} height={18} alt="" />
                    <span style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)" }}>Mo–Fr · 9:00–17:00 Uhr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SO GEHT ES WEITER ─────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Nach deiner Nachricht</span>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "8px 0 0" }}>So geht es weiter</h2>
          </div>
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: CTA_HEX, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "white" }}>{i + 1}</span>
                    </div>
                    {i < TIMELINE.length - 1 && <div style={{ width: 2, height: 36, background: "#D6E4F7", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: "0 0 4px" }}>{t.title}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 20, left: "6.25%", right: "6.25%", height: 2, background: "#D6E4F7", zIndex: 0 }} />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${TIMELINE.length}, 1fr)`, gap: 24 }}>
                {TIMELINE.map((t, i) => (
                  <div key={i} style={{ position: "relative", zIndex: 1, paddingTop: 52, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ position: "absolute", top: 6, left: 0, width: 28, height: 28, borderRadius: "50%", background: CTA_HEX, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid white", boxShadow: `0 0 0 2px ${CTA_HEX}` }}>
                      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 12, color: "white" }}>{i + 1}</span>
                    </div>
                    <p style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: "var(--black)", margin: 0 }}>{t.title}</p>
                    <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── AUSTRIA MAP ───────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 32 : 64, alignItems: "flex-start" }}>
            <div style={{ flex: "0 0 auto", maxWidth: isMobile ? "100%" : 480 }}>
              <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Unser Netzwerk</span>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "8px 0 16px" }}>Österreichweit für dich da</h2>
              <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.7, color: "var(--grey-text)", margin: "0 0 24px" }}>
                Wähle ein Bundesland auf der Karte, um Fachkräfte in deiner Region zu entdecken.
              </p>
              {selectedProvince && (
                <div style={{ background: "var(--blue-ultra-light)", borderRadius: 16, padding: "20px", marginBottom: 20 }}>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: CTA_HEX, margin: "0 0 10px" }}>
                    {PROVINCES.find(p => p.id === selectedProvince)?.name}
                  </p>
                  <a href={`/fachkraefte?bundesland=${selectedProvince}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 40, padding: "0 20px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA_HEX}>
                    Fachkräfte anzeigen →
                  </a>
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PROVINCES.map(p => (
                  <button key={p.id}
                    onClick={() => setSelectedProvince(p.id as ProvinceId)}
                    style={{ fontFamily: F, fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 9999, border: `1.5px solid ${selectedProvince === p.id ? CTA_HEX : "#D0DFF0"}`, background: selectedProvince === p.id ? CTA_HEX : "white", color: selectedProvince === p.id ? "white" : CTA_HEX, cursor: "pointer", transition: "all 0.2s" }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minHeight: isMobile ? 240 : 360, position: "relative" }}>
              <AustriaMap
                activeId={selectedProvince}
                onSelect={id => setSelectedProvince(id as ProvinceId)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Häufige Fragen</span>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 24 : 32, color: "var(--black)", margin: "8px 0 0" }}>FAQ</h2>
          </div>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 2 }}>
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{ background: "white", borderRadius: 14, overflow: "hidden", marginBottom: 8, border: "1px solid #EAF0FA" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontFamily: F, fontWeight: 600, fontSize: isMobile ? 14 : 15, color: "var(--black)", lineHeight: 1.4 }}>{item.q}</span>
                    <div style={{ width: 28, height: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {open ? <Minus size={15} color="var(--black)" /> : <Plus size={15} color="var(--black)" />}
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "4px 20px 18px", fontFamily: F, fontSize: isMobile ? 14 : 15, lineHeight: 1.65, color: "var(--grey-text)" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
