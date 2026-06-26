"use client";
import { useState, useRef } from "react";
import { Plus, Minus, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AustriaMap, { PROVINCES } from "@/components/AustriaMap";
type ProvinceId = typeof PROVINCES[number]["id"];

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const CTA_HEX = "#2D5B8D";

const INFO_CARDS = [
  { icon: "/icons/icon-vorgespraech.svg", label: "Kontaktformular", value: "Nachricht schreiben", sub: "Direkt & unkompliziert", href: "#kontaktformular" },
  { icon: "/icons/icon-phone-contact.svg", label: "Telefon", value: "+43 1 123 45 67", sub: "Mo–Fr · 9:00–17:00 Uhr", href: "tel:+4311234567" },
  { icon: "/icons/icon-mail.svg", label: "E-Mail", value: "info@ptbd.at", sub: "Antwort innerhalb 24h", href: "mailto:info@ptbd.at" },
  { icon: "/icons/icon-pin.svg", label: "Österreichweit", value: "Alle 9 Bundesländer", sub: "In deiner Region verfügbar", href: null },
  { icon: "/icons/icon-clock.svg", label: "Antwortzeit", value: "< 24 Stunden", sub: "Schnelle, persönliche Rückmeldung", href: null },
];

const THEMEN = [
  "Allgemeine Frage", "Therapeut*in finden", "Orientierungsgespräch",
  "Kosten & Krankenkasse", "Technisches Problem", "Feedback & Anregungen", "Sonstiges",
];

const TIMELINE = [
  { title: "Nachricht erhalten", desc: "Wir erhalten deine Anfrage und bestätigen den Eingang automatisch per E-Mail." },
  { title: "Persönliche Prüfung", desc: "Unser Team liest deine Nachricht und leitet sie an die richtige Person weiter." },
  { title: "Antwort innerhalb 24h", desc: "Du erhältst eine persönliche Antwort — oft schon nach wenigen Stunden." },
  { title: "Weiterer Support", desc: "Falls nötig, begleiten wir dich beim nächsten Schritt — Gespräch, Vermittlung oder Info." },
];

const FAQS = [
  { q: "Wie schnell erhalte ich eine Antwort auf meine Nachricht?", a: "Wir bemühen uns, alle Anfragen innerhalb von 24 Werktags-Stunden zu beantworten. Bei dringenden Anliegen empfehlen wir, uns telefonisch zu kontaktieren." },
  { q: "Ist das Orientierungsgespräch wirklich kostenlos?", a: "Ja, das Orientierungsgespräch ist vollständig kostenlos und unverbindlich. Es dauert ca. 20 Minuten und hilft dir herauszufinden, welche Unterstützung am besten zu dir passt." },
  { q: "Kann ich anonym Kontakt aufnehmen?", a: "Ja, du kannst uns auch anonym kontaktieren. Wenn du einen Rückruf oder eine direkte Antwort möchtest, benötigen wir natürlich deine Kontaktdaten." },
  { q: "Was tue ich, wenn ich mich in einer akuten Krise befinde?", a: "Bei akuter Selbst- oder Fremdgefährdung ruf bitte sofort den Notruf 112 oder die Telefonseelsorge unter 142 an. Unsere Plattform ist nicht für Notfallsituationen ausgelegt." },
];

const WARUM = [
  { text: "Wir finden gemeinsam die passende Unterstützung für dich", icon: "/icons/icon-orientierung.svg" },
  { text: "Keine Wartelisten — schnelle, unkomplizierte Hilfe", icon: "/icons/icon-clock.svg" },
  { text: "Unser Team kennt das österreichische Versorgungssystem", iconEl: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.40095 6.49999C6.15928 6.08048 6.02273 5.60872 6.00295 5.12499C5.98511 4.72542 6.04735 4.32631 6.186 3.95114C6.32466 3.57597 6.53694 3.23232 6.81035 2.94039C7.08377 2.64847 7.4128 2.41416 7.77809 2.25126C8.14338 2.08835 8.53756 2.00014 8.93745 1.9918C9.33733 1.98347 9.73485 2.05518 10.1066 2.20272C10.4784 2.35026 10.8169 2.57065 11.1022 2.85093C11.3876 3.13122 11.614 3.46572 11.7681 3.83479C11.9223 4.20385 12.0011 4.60002 12 4.99999M12 4.99999V18M17.599 6.49999C17.841 6.08057 17.9769 5.60881 17.997 5.12499C18.0148 4.72542 17.9526 4.32631 17.8139 3.95114C17.6752 3.57597 17.463 3.23232 17.1896 2.94039C16.9161 2.64847 16.5871 2.41416 16.2218 2.25126C15.8565 2.08835 15.4623 2.00014 15.0625 1.9918C14.6626 1.98347 14.2651 2.05518 13.8933 2.20272C13.5215 2.35026 13.183 2.57065 12.8977 2.85093C12.6123 3.13122 12.3859 3.46572 12.2318 3.83479C12.0776 4.20385 11.9988 4.60002 12 4.99999M6.00295 5.12499C5.41515 5.27613 4.86945 5.55904 4.40718 5.9523C3.94491 6.34556 3.57819 6.83886 3.3348 7.39484C3.0914 7.95081 2.97771 8.55488 3.00234 9.1613C3.02697 9.76772 3.18927 10.3606 3.47695 10.895M4.06195 10.5C3.85565 10.6145 3.65989 10.746 3.47695 10.895C2.97113 11.3059 2.57338 11.8342 2.31829 12.4339C2.0632 13.0336 1.95851 13.6866 2.01332 14.336C2.06812 14.9854 2.28077 15.6115 2.63276 16.16C2.98475 16.7085 3.46542 17.1626 4.03295 17.483M4.03295 17.483C3.96287 18.0252 4.00469 18.5761 4.15584 19.1015C4.30699 19.627 4.56425 20.1158 4.91174 20.5379C5.25923 20.9601 5.68956 21.3065 6.17617 21.5557C6.66278 21.805 7.19533 21.9519 7.74093 21.9873C8.28653 22.0227 8.83359 21.9459 9.34834 21.7616C9.86309 21.5773 10.3346 21.2894 10.7337 20.9157C11.1328 20.5421 11.4511 20.0906 11.6689 19.5891C11.8867 19.0876 11.9994 18.5467 12 18M4.03295 17.483C4.63322 17.8216 5.31078 18.0003 5.99995 18M12 18C12.0005 18.5467 12.1132 19.0876 12.331 19.5891C12.5488 20.0906 12.8671 20.5421 13.2662 20.9157C13.6653 21.2894 14.1368 21.5773 14.6516 21.7616C15.1663 21.9459 15.7134 22.0227 16.259 21.9873C16.8046 21.9519 17.3371 21.805 17.8237 21.5557C18.3103 21.3065 18.7407 20.9601 19.0882 20.5379C19.4357 20.1158 19.6929 19.627 19.8441 19.1015C19.9952 18.5761 20.037 18.0252 19.967 17.483M17.997 5.12499C18.5848 5.27613 19.1305 5.55904 19.5927 5.9523C20.055 6.34556 20.4217 6.83886 20.6651 7.39484C20.9085 7.95081 21.0222 8.55488 20.9976 9.1613C20.9729 9.76772 20.8106 10.3606 20.523 10.895M19.938 10.5C20.1442 10.6145 20.34 10.746 20.523 10.895C21.0288 11.3059 21.4265 11.8342 21.6816 12.4339C21.9367 13.0336 22.0414 13.6866 21.9866 14.336C21.9318 14.9854 21.7191 15.6115 21.3671 16.16C21.0152 16.7085 20.5345 17.1626 19.967 17.483M19.967 17.483C19.3667 17.8216 18.6891 18.0003 18 18M15 13C14.1604 12.7046 13.4273 12.167 12.8933 11.455C12.3593 10.743 12.0484 9.88866 12 8.99999C11.9515 9.88866 11.6406 10.743 11.1066 11.455C10.5726 12.167 9.83951 12.7046 8.99995 13" stroke="#2D5B8D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { text: "Vertraulich, kostenlos und ohne Verpflichtung", icon: "/icons/lock-keyhole.svg" },
  { text: "Österreichweit verfügbar — in allen 9 Bundesländern", icon: "/icons/icon-pin.svg" },
] as Array<{ text: string; icon?: string; iconEl?: React.ReactNode }>;

export default function KontaktPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cardIdx, setCardIdx] = useState(0);
  const cardSliderRef = useRef<HTMLDivElement>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | null>(null);
  const [formState, setFormState] = useState({ vorname: "", nachname: "", email: "", telefon: "", thema: "", nachricht: "", dsgvo: false });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.vorname || !formState.email || !formState.nachricht || !formState.dsgvo) return;
    setSubmitted(true);
  }

  const cardInner = (card: typeof INFO_CARDS[0], size: "sm" | "lg") => (
    <>
      <div style={{ width: size === "lg" ? 52 : 44, height: size === "lg" ? 52 : 44, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={card.icon} width={size === "lg" ? 24 : 20} height={size === "lg" ? 24 : 20} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)" }} />
      </div>
      <p style={{ fontFamily: F, fontWeight: 600, fontSize: size === "lg" ? 13 : 11, color: CTA, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{card.label}</p>
      <p style={{ fontFamily: F, fontWeight: 700, fontSize: size === "lg" ? 16 : 14, color: "var(--black)", margin: 0 }}>{card.value}</p>
      <p style={{ fontFamily: F, fontSize: size === "lg" ? 13 : 12, color: "var(--grey-text)", margin: 0 }}>{card.sub}</p>
    </>
  );

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ background: "white" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }} className="k-breadcrumbs-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
            <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CTA}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"}>Startseite</a>
            <span style={{ color: "#C3C3C3" }}>›</span>
            <span style={{ color: "var(--black)", fontWeight: 500 }}>Kontakt</span>
          </div>
        </div>

        {/* Desktop hero */}
        <div className="k-hero-desktop" style={{ position: "relative", width: "100%", overflow: "hidden", height: 560 }}>
          <img src="/kontakt-banner.png" alt="Kontakt" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90.76deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0) 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", width: "100%" }}>
              <div style={{ maxWidth: 560 }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA_HEX, letterSpacing: "0.1em", textTransform: "uppercase" }}>Kontakt</span>
                <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 44, lineHeight: 1.2, color: "var(--black)", margin: "10px 0 16px" }}>Wir sind für<br />dich da.</h1>
                <p style={{ fontFamily: F, fontSize: 16, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 20px" }}>
                  Egal ob du Fragen hast, Unterstützung brauchst oder einfach nicht weißt, wo du anfangen sollst — wir helfen dir weiter.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {["Persönliche Beratung auf Wunsch", "Antwort innerhalb von 24 Stunden", "Kostenlos & vertraulich"].map((text, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={18} color={CTA_HEX} strokeWidth={2.2} />
                      <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="#kontaktformular"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA_HEX}>
                    Nachricht schreiben
                    <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
                  </a>
                  <a href="tel:+4311234567"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 24px", borderRadius: 9999, border: `1.5px solid ${CTA_HEX}`, color: CTA_HEX, fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", background: "white", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEF4FC"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
                    +43 1 123 45 67
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero — full height + bottom gradient (like homepage) */}
        <div className="k-hero-mobile" style={{ display: "none", position: "relative", flexDirection: "column", justifyContent: "flex-end", minHeight: "calc(100svh - 64px)" }}>
          <img src="/kontakt-banner-mobile.png" alt="Kontakt" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.92) 75%, rgba(255,255,255,0.97) 90%)", pointerEvents: "none", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, padding: "0 20px 48px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: 32, lineHeight: 1.2, color: "var(--black)", margin: 0 }}>Wir sind für dich da.</h1>
              <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", lineHeight: 1.5, margin: 0 }}>
                Egal ob du Fragen hast, Unterstützung brauchst oder einfach nicht weißt, wo du anfangen sollst — wir helfen dir weiter.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="#kontaktformular" style={{ background: CTA_HEX, color: "white", borderRadius: 9999, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: F, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
                Nachricht schreiben
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
              </a>
              <a href="tel:+4311234567" style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", color: CTA_HEX, border: `1.5px solid ${CTA_HEX}`, borderRadius: 9999, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 500, fontSize: 16, textDecoration: "none" }}>
                +43 1 123 45 67
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── KONTAKTMÖGLICHKEITEN ──────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD" }} className="k-section">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Direkt erreichbar</span>
            <h2 style={{ fontFamily: F, fontWeight: 700, color: "var(--black)", margin: "8px 0 0" }} className="k-h2">So erreichst du uns</h2>
          </div>
          {/* Desktop: 5-col grid */}
          <div className="k-cards-desktop">
            <div className="k-cards-grid">
              {INFO_CARDS.map((card, i) => {
                const baseStyle: React.CSSProperties = { background: "white", borderRadius: 20, border: "1.5px solid #D0DFF0", display: "flex", flexDirection: "column", gap: 10, textAlign: "center", alignItems: "center", textDecoration: "none", transition: "all 0.2s" };
                return card.href ? (
                  <a key={i} href={card.href} style={baseStyle} className="k-card"
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = CTA_HEX; el.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#D0DFF0"; el.style.transform = "translateY(0)"; }}>
                    {cardInner(card, "lg")}
                  </a>
                ) : (
                  <div key={i} style={baseStyle} className="k-card">{cardInner(card, "lg")}</div>
                );
              })}
            </div>
          </div>

          {/* Mobile: slider with dots */}
          <div className="k-cards-mobile" style={{ display: "none" }}>
            <div ref={cardSliderRef}
              onScroll={e => { const el = e.currentTarget; setCardIdx(Math.round(el.scrollLeft / (el.clientWidth * 0.75))); }}
              style={{ display: "flex", overflowX: "auto", gap: 12, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", marginRight: -16, paddingRight: 32 } as React.CSSProperties}>
              {INFO_CARDS.map((card, i) => {
                const baseStyle: React.CSSProperties = { background: "white", borderRadius: 20, border: "1.5px solid #D0DFF0", display: "flex", flexDirection: "column", gap: 8, textAlign: "center", alignItems: "center", textDecoration: "none", flexShrink: 0, width: "75%", scrollSnapAlign: "start", padding: "20px 16px" };
                return card.href ? (
                  <a key={i} href={card.href} style={baseStyle}>{cardInner(card, "sm")}</a>
                ) : (
                  <div key={i} style={baseStyle}>{cardInner(card, "sm")}</div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {INFO_CARDS.map((_, i) => (
                <div key={i} style={{ height: 6, borderRadius: 3, background: cardIdx === i ? CTA_HEX : "#D0DFF0", width: cardIdx === i ? 20 : 6, transition: "all 0.3s ease" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KONTAKTFORMULAR ───────────────────────────────────────────── */}
      <section id="kontaktformular" style={{ background: "white" }} className="k-section k-section-lg">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="k-form-row">
            {/* Form */}
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Schreib uns</span>
              <h2 style={{ fontFamily: F, fontWeight: 700, color: "var(--black)", margin: "8px 0 28px" }} className="k-h2">Kontaktformular</h2>
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
                  <div className="k-name-grid">
                    {[{ label: "Vorname *", key: "vorname", placeholder: "Max" }, { label: "Nachname *", key: "nachname", placeholder: "Mustermann" }].map(f => (
                      <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>{f.label}</span>
                        <input value={(formState as any)[f.key]} onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} required={f.label.includes("*")}
                          style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white" }}
                          onFocus={e => (e.target.style.borderColor = CTA_HEX)} onBlur={e => (e.target.style.borderColor = "var(--grey-border)")} />
                      </label>
                    ))}
                  </div>
                  {[
                    { label: "E-Mail *", key: "email", type: "email", placeholder: "max@beispiel.at", required: true },
                    { label: "Telefon", key: "telefon", type: "tel", placeholder: "+43 1 234 567", required: false, optional: true },
                  ].map(f => (
                    <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>
                        {f.label} {f.optional && <span style={{ color: "var(--grey-text)", fontWeight: 400 }}>(optional)</span>}
                      </span>
                      <input type={f.type} value={(formState as any)[f.key]} onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} required={f.required}
                        style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white" }}
                        onFocus={e => (e.target.style.borderColor = CTA_HEX)} onBlur={e => (e.target.style.borderColor = "var(--grey-border)")} />
                    </label>
                  ))}
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>Thema *</span>
                    <select value={formState.thema} required onChange={e => setFormState(s => ({ ...s, thema: e.target.value }))}
                      style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: formState.thema ? "var(--black)" : "var(--grey-text)", background: "white", appearance: "none", cursor: "pointer" }}
                      onFocus={e => (e.target.style.borderColor = CTA_HEX)} onBlur={e => (e.target.style.borderColor = "var(--grey-border)")}>
                      <option value="" disabled>Bitte wählen…</option>
                      {THEMEN.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: 13, color: "var(--black)" }}>Nachricht *</span>
                    <textarea value={formState.nachricht} required rows={5} onChange={e => setFormState(s => ({ ...s, nachricht: e.target.value }))} placeholder="Beschreibe dein Anliegen…"
                      style={{ fontFamily: F, fontSize: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--grey-border)", outline: "none", color: "var(--black)", background: "white", resize: "vertical", lineHeight: 1.6 }}
                      onFocus={e => (e.target.style.borderColor = CTA_HEX)} onBlur={e => (e.target.style.borderColor = "var(--grey-border)")} />
                  </label>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <input type="checkbox" checked={formState.dsgvo} required onChange={e => setFormState(s => ({ ...s, dsgvo: e.target.checked }))}
                      style={{ width: 16, height: 16, flexShrink: 0, marginTop: 3, accentColor: CTA_HEX }} />
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

            {/* Right panel */}
            <div className="k-form-sidebar" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1.5px solid #EAF0FA" }}>
                <div style={{ background: CTA_HEX, padding: "22px 24px" }}>
                  <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 18, color: "white", margin: 0 }}>Warum uns kontaktieren?</h3>
                  <p style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "4px 0 0" }}>5 gute Gründe, uns zu schreiben</p>
                </div>
                <div style={{ background: "white", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 0 }}>
                  {WARUM.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0", borderBottom: i < WARUM.length - 1 ? "1px solid #F0F4F8" : "none" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {item.iconEl ?? <img src={item.icon} width={15} height={15} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)" }} />}
                      </div>
                      <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)", lineHeight: 1.55 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "white", border: "1.5px solid #EAF0FA", borderRadius: 20, padding: "24px" }}>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 12px" }}>Direktkontakt</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="tel:+4311234567" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <img src="/icons/icon-phone-contact.svg" width={18} height={18} alt="" />
                    <span style={{ fontFamily: F, fontSize: 14, color: CTA_HEX, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>+43 1 123 45 67</span>
                  </a>
                  <a href="mailto:info@ptbd.at" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <img src="/icons/icon-mail.svg" width={18} height={18} alt="" />
                    <span style={{ fontFamily: F, fontSize: 14, color: CTA_HEX, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>info@ptbd.at</span>
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
      <section style={{ background: "#F5F9FD" }} className="k-section">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Nach deiner Nachricht</span>
            <h2 style={{ fontFamily: F, fontWeight: 700, color: "var(--black)", margin: "8px 0 0" }} className="k-h2">So geht es weiter</h2>
          </div>
          {/* Desktop timeline */}
          <div className="k-timeline-desktop" style={{ position: "relative" }}>
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
          {/* Mobile timeline */}
          <div className="k-timeline-mobile" style={{ display: "none", flexDirection: "column", gap: 20 }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
        </div>
      </section>

      {/* ── AUSTRIA MAP ───────────────────────────────────────────────── */}
      <section style={{ background: "white" }} className="k-section k-map-section">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="k-map-row">
            <div className="k-map-text">
              <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: CTA, letterSpacing: "0.1em", textTransform: "uppercase" }}>Unser Netzwerk</span>
              <h2 style={{ fontFamily: F, fontWeight: 700, color: "var(--black)", margin: "8px 0 16px" }} className="k-h2">Österreichweit für dich da</h2>
              <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.7, color: "var(--grey-text)", margin: "0 0 24px" }}>
                Wähle ein Bundesland auf der Karte, um Fachkräfte in deiner Region zu entdecken.
              </p>
              {selectedProvince && (
                <div style={{ border: `1.5px solid ${CTA_HEX}`, borderRadius: 16, padding: "20px 24px", marginBottom: 20, background: "white", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, boxShadow: "0 4px 20px rgba(45,91,141,0.10)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--blue-ultra-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src="/icons/icon-pin.svg" width={18} height={18} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "var(--black)", margin: 0 }}>{PROVINCES.find(p => p.id === selectedProvince)?.name}</p>
                      <p style={{ fontFamily: F, fontSize: 13, color: "var(--grey-text)", margin: 0 }}>Fachkräfte verfügbar</p>
                    </div>
                  </div>
                  <a href={`/fachkraefte?bundesland=${selectedProvince}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 38, padding: "0 18px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA_HEX}>
                    Anzeigen →
                  </a>
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PROVINCES.map(p => (
                  <button key={p.id} onClick={() => setSelectedProvince(p.id as ProvinceId)}
                    style={{ fontFamily: F, fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 9999, border: `1.5px solid ${selectedProvince === p.id ? CTA_HEX : "#D0DFF0"}`, background: selectedProvince === p.id ? CTA_HEX : "white", color: selectedProvince === p.id ? "white" : CTA_HEX, cursor: "pointer", transition: "all 0.2s" }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, position: "relative" }} className="k-map-svg">
              <AustriaMap activeId={selectedProvince} onSelect={id => setSelectedProvince(id as ProvinceId)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: "white" }} className="k-section k-faq-section">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 style={{ fontFamily: F, fontWeight: 600, lineHeight: 1.3, color: "var(--black)", margin: 0 }} className="k-h1-faq">Häufige Fragen</h2>
            <p style={{ fontFamily: F, fontWeight: 400, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }} className="k-sub-faq">
              Hier findest du Antworten auf häufige Fragen rund um Kontakt und Erreichbarkeit.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 864, margin: "0 auto" }}>
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
                  <button onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 16, background: "none", border: "none", borderBottom: open ? "none" : "1px solid var(--grey-border)", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontFamily: F, fontWeight: 500, lineHeight: 1.4, color: "var(--black)", flex: 1 }} className="k-faq-q">{item.q}</span>
                    <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {open ? <Minus size={16} color="var(--black)" /> : <Plus size={16} color="var(--black)" />}
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "12px 16px 16px", fontFamily: F, fontWeight: 400, lineHeight: 1.5, color: "var(--grey-text)", borderBottom: "1px solid var(--grey-border)" }} className="k-faq-a">
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

      <style>{`
        /* Breadcrumbs padding */
        .k-breadcrumbs-wrap { padding: 28px 40px 16px; }

        /* Section padding */
        .k-section { padding: 72px 0; }
        .k-section-lg { padding: 80px 0; }

        /* Cards */
        .k-cards-desktop { display: block; }
        .k-cards-mobile { display: none !important; }
        .k-cards-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .k-card { padding: 28px 20px; }

        /* Form layout: row on desktop */
        .k-form-row { display: flex; flex-direction: row; gap: 64px; align-items: flex-start; }
        .k-form-sidebar { flex: 0 0 340px; }
        .k-name-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Timeline */
        .k-timeline-desktop { display: block; }
        .k-timeline-mobile { display: none !important; }

        /* Map */
        .k-map-row { display: flex; flex-direction: row; gap: 64px; align-items: flex-start; }
        .k-map-text { flex: 0 0 auto; max-width: 480px; }
        .k-map-svg { min-height: 360px; }

        /* Typography desktop */
        .k-h2 { font-size: 32px; }
        .k-h1-faq { font-size: 40px; }
        .k-sub-faq { font-size: 18px; }
        .k-faq-q { font-size: 20px; }
        .k-faq-a { font-size: 16px; }

        /* Hero */
        .k-hero-desktop { display: block; }
        .k-hero-mobile { display: none !important; }

        @media (max-width: 1070px) {
          .k-breadcrumbs-wrap { padding: 20px 16px 12px; }
          .k-section { padding: 48px 0; }
          .k-section-lg { padding: 48px 0; }

          /* Hero */
          .k-hero-desktop { display: none !important; }
          .k-hero-mobile { display: flex !important; }

          /* Cards: slider on mobile */
          .k-cards-desktop { display: none !important; }
          .k-cards-mobile { display: block !important; }

          /* Form: stacked */
          .k-form-row { flex-direction: column !important; gap: 40px !important; }
          .k-form-sidebar { flex: none !important; width: 100% !important; }
          .k-name-grid { grid-template-columns: 1fr !important; }

          /* Timeline */
          .k-timeline-desktop { display: none !important; }
          .k-timeline-mobile { display: flex !important; }

          /* Map */
          .k-map-row { flex-direction: column !important; gap: 32px !important; }
          .k-map-text { max-width: 100% !important; }
          .k-map-svg { min-height: 200px; }
          .k-map-section { padding-bottom: 24px !important; }
          .k-faq-section { padding-top: 24px !important; }

          /* Typography */
          .k-h2 { font-size: 24px; }
          .k-h1-faq { font-size: 28px; }
          .k-sub-faq { font-size: 16px; }
          .k-faq-q { font-size: 16px; }
          .k-faq-a { font-size: 14px; }
        }
      `}</style>
    </main>
  );
}
