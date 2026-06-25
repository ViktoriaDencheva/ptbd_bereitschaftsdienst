"use client";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA = "var(--cta)";
const CTA_HEX = "#2D5B8D";

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

const STATS = [
  { value: "10+", label: "Jahre Erfahrung" },
  { value: "1.000+", label: "Therapeut*innen im Netzwerk" },
  { value: "9", label: "Bundesländer österreichweit" },
  { value: "Ø 1 Woche", label: "bis zum Therapiebeginn" },
];

const STEPS = [
  { icon: "/icons/icon-vorgespraech.svg", title: "Hilfe suchen", desc: "Du erkennst, dass du Unterstützung brauchst — das ist der mutigste Schritt." },
  { icon: "/icons/icon-orientierung.svg", title: "Orientierungsgespräch", desc: "In einem kostenlosen Gespräch klären wir gemeinsam, was du brauchst." },
  { icon: "/icons/icon-test.svg", title: "Passende Empfehlung", desc: "Wir empfehlen dir gezielt die Fachkraft, die am besten zu deiner Situation passt." },
  { icon: "/icons/icon-fachkraefte-warum.svg", title: "Therapeut*in finden", desc: "Direkter Kontakt zu einer qualifizierten Fachkraft — ohne lange Wartezeiten." },
  { icon: "/icons/icon-unterstuetzung.svg", title: "Unterstützung erhalten", desc: "Du bist nicht allein. Wir bleiben an deiner Seite, auch nach der Vermittlung." },
];

const WERTE = [
  {
    color: "#E07878", bg: "#FFF0F0",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#E07878" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Menschen im Mittelpunkt",
    desc: "Wir hören zu, nehmen uns Zeit und begegnen jedem Menschen auf Augenhöhe — ohne Urteile.",
  },
  {
    color: "#4A90D9", bg: "#EBF4FF",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#4A90D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Persönliche Begleitung",
    desc: "Keine Algorithmen, kein anonymes Matching. Jede Empfehlung kommt von echten Menschen.",
  },
  {
    color: "#5BAA6E", bg: "#F0FAF2",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#5BAA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#5BAA6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Vertrauen & Diskretion",
    desc: "Datenschutz und Vertraulichkeit sind keine Selbstverständlichkeit — für uns sind sie Grundlage.",
  },
  {
    color: "#B07D3A", bg: "#FFF8EE",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#B07D3A" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="#B07D3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Schneller Zugang",
    desc: "Weil Hilfe nicht warten sollte. Wir verkürzen den Weg zwischen Bedarf und Unterstützung.",
  },
];

const TRUST = [
  { year: "2013", text: "Gründung des Vereins mit dem Ziel, psychotherapeutische Hilfe niedrigschwellig zugänglich zu machen." },
  { year: "Heute", text: "Über 1.000 qualifizierte Therapeut*innen, Psycholog*innen und Psychiater*innen in ganz Österreich." },
  { year: "Österreichweit", text: "Präsenz in allen 9 Bundesländern — damit niemand auf Unterstützung verzichten muss." },
  { year: "Gemeinnützig", text: "Wir sind ein gemeinnütziger Verein — nicht auf Profit ausgerichtet, sondern auf Menschen." },
];

const FAQ = [
  { q: "Warum wurde PTBD gegründet?", a: "Der Psychotherapeutische Bereitschaftsdienst entstand aus dem Bedürfnis heraus, psychotherapeutische Hilfe schnell und ohne bürokratische Hürden zugänglich zu machen. Oft vergehen Monate, bis Menschen einen Therapieplatz finden — das wollten wir ändern." },
  { q: "Wie funktioniert die Vermittlung?", a: "In einem kostenlosen Orientierungsgespräch klären wir gemeinsam, was du brauchst. Danach empfehlen wir dir passende Fachkräfte aus unserem Netzwerk — persönlich, nicht algorithmisch." },
  { q: "Ist PTBD kostenlos?", a: "Das Orientierungsgespräch und die Vermittlung sind kostenlos. Die Kosten für Therapiesitzungen hängen von der jeweiligen Fachkraft und der Kassenerstattung ab." },
  { q: "Wer steckt hinter PTBD?", a: "Wir sind ein gemeinnütziger Verein aus erfahrenen Psycholog*innen, Organisationstalenten und Menschen, die selbst erlebt haben, wie schwer der erste Schritt sein kann." },
  { q: "Warum gibt es ein Orientierungsgespräch?", a: "Weil der Weg zur richtigen Unterstützung nicht immer offensichtlich ist. Das Gespräch hilft dir zu verstehen, welche Art von Hilfe zu deiner Situation passt — und nimmt die Unsicherheit aus dem ersten Schritt." },
];

export default function UeberUnsPage() {
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;
  const wrap = { maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" } as const;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "40px 0 48px" : "56px 0 72px" }}>
        <div style={{ ...wrap }}>
          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "center" }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>Über uns</p>
              <h1 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 28 : 42, lineHeight: 1.15, color: "var(--black)", margin: "0 0 12px" }}>
                Wenn Menschen Hilfe brauchen, sollte der Weg dorthin nicht kompliziert sein.
              </h1>
              <p style={{ fontFamily: F, fontSize: isMobile ? 14 : 16, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 8px", fontStyle: "italic" }}>
                Genau deshalb gibt es den Psychotherapeutischen Bereitschaftsdienst.
              </p>
              <p style={{ fontFamily: F, fontSize: isMobile ? 14 : 15, color: "var(--grey-text)", lineHeight: 1.7, margin: "0 0 28px" }}>
                Seit über 10 Jahren verbinden wir Menschen mit qualifizierter psychotherapeutischer Unterstützung — schnell, persönlich und österreichweit.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {["Über 10 Jahre Erfahrung", "Rund 1.000 Therapeut*innen", "Österreichweit verfügbar"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 15, color: "var(--black)", fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
              <a href="/vorgespraech"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 36px 0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", alignSelf: "flex-start", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Unser Angebot entdecken
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
              </a>
            </div>
            {/* Right: illustration */}
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: "100%", maxWidth: 480, aspectRatio: "4/3", background: "linear-gradient(135deg, #EBF4FF 0%, #F5FBFF 100%)", borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src="/icons/image-psychologist.svg" alt="" style={{ width: "75%", height: "75%", objectFit: "contain", opacity: 0.9 }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0", borderTop: "1px solid #F0F4F8" }}>
        <div style={{ ...wrap }}>
          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: "1fr 1fr", gap: isMobile ? 32 : 80, alignItems: "center" }}>
            {/* Quote */}
            <div style={{ position: "relative" }}>
              <div style={{ width: 48, height: 4, background: CTA, borderRadius: 2, marginBottom: 24 }} />
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, lineHeight: 1.35, color: "var(--black)", margin: 0 }}>
                „Niemand sollte monatelang auf psychotherapeutische Hilfe warten müssen."
              </p>
            </div>
            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Unsere Mission</p>
              <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", lineHeight: 1.8, margin: 0 }}>
                Der Psychotherapeutische Bereitschaftsdienst wurde gegründet, weil psychische Gesundheit keine Frage von Wartelisten sein sollte.
              </p>
              <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", lineHeight: 1.8, margin: 0 }}>
                Wir schaffen einen direkten, persönlichen Zugang zu qualifizierten Fachkräften — für alle, die Hilfe suchen, unabhängig von Vorkenntnissen, Kassenstatus oder Wohnort.
              </p>
              <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", lineHeight: 1.8, margin: 0 }}>
                Nicht als kommerzielle Plattform. Sondern als gemeinnütziger Verein, der Menschen in den Mittelpunkt stellt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WIRKUNG ──────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Unsere Wirkung</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: 0 }}>Zahlen, die vertrauen schaffen.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 16 : 24 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 20, padding: isMobile ? "24px 16px" : "32px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(45,91,141,0.06)" }}>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: isMobile ? 28 : 36, color: CTA, margin: "0 0 6px", lineHeight: 1.1 }}>{s.value}</p>
                <p style={{ fontFamily: F, fontSize: isMobile ? 12 : 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIE WIR ARBEITEN ─────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Wie wir Menschen begleiten</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: "0 0 8px" }}>Vom ersten Gedanken bis zur Unterstützung.</h2>
            <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>Wir begleiten dich durch jeden Schritt — klar, persönlich und ohne Umwege.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)", gap: isMobile ? 16 : 0, position: "relative" }}>
            {!isMobile && (
              <div style={{ position: "absolute", top: 32, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg, #D6E4F7 0%, #2D5B8D 50%, #D6E4F7 100%)", zIndex: 0 }} />
            )}
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "center", gap: 12, position: "relative", zIndex: 1, padding: isMobile ? "0 0 0 16px" : "0 8px", borderLeft: isMobile ? `3px solid ${i === 0 ? CTA : "#D6E4F7"}` : "none" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: i === 0 ? "#D6E4F7" : "#F0F6FF", border: `2px solid ${i === 0 ? CTA_HEX : "#D6E4F7"}`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <img src={s.icon} width={28} height={28} alt="" style={{ objectFit: "contain", filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)" }} />
                </div>
                <div style={{ textAlign: isMobile ? "left" : "center" }}>
                  <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: CTA, margin: "0 0 4px" }}>{`${i + 1}. ${s.title}`}</p>
                  <p style={{ fontFamily: F, fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NETZWERK ─────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "center" }}>
            {/* Map */}
            <div style={{ background: "white", borderRadius: 24, padding: isMobile ? 20 : 32, boxShadow: "0 4px 24px rgba(45,91,141,0.07)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280 }}>
              <img src="/icons/frame346.svg" alt="Österreich Karte" style={{ width: "100%", maxWidth: 380, height: "auto", objectFit: "contain" }} />
            </div>
            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Unser Netzwerk</p>
                <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: "0 0 8px" }}>Österreichweit für dich da.</h2>
                <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", lineHeight: 1.7, margin: 0 }}>
                  Unser Netzwerk aus Psycholog*innen, Psychotherapeut*innen und Psychiater*innen ist in allen Bundesländern für dich verfügbar.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["1.000+ Psychotherapeut*innen im Netzwerk", "Alle 9 Bundesländer Österreichs", "Persönliche Vermittlung — kein Algorithmus", "Unterschiedliche Fachrichtungen & Schwerpunkte"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src="/icons/icon-check.svg" width={18} height={18} alt="" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 14, color: "var(--black)" }}>{t}</span>
                  </div>
                ))}
              </div>
              <a href="/fachkraefte"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 28px", borderRadius: 9999, border: `1.5px solid ${CTA}`, color: CTA, fontFamily: F, fontWeight: 600, fontSize: 14, textDecoration: "none", alignSelf: "flex-start", whiteSpace: "nowrap", background: "white" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEF4FC"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
                Fachkräfte in deiner Nähe finden
                <img src="/icons/arrow-right.svg" width={14} height={14} alt="" style={{ filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(500%) hue-rotate(190deg)" }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WERTE ────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Unsere Werte</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: "0 0 8px" }}>Was uns antreibt.</h2>
            <p style={{ fontFamily: F, fontSize: 14, color: "var(--grey-text)", margin: 0 }}>Keine Unternehmensphilosophie. Menschliche Überzeugungen.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {WERTE.map((w, i) => (
              <div key={i} style={{ background: w.bg, borderRadius: 20, padding: isMobile ? "20px 16px" : "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", boxShadow: `0 2px 12px ${w.color}20` }}>
                  {w.icon}
                </div>
                <p style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 13 : 15, color: "var(--black)", margin: 0 }}>{w.title}</p>
                <p style={{ fontFamily: F, fontSize: isMobile ? 12 : 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTRAUEN / TIMELINE ─────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ marginBottom: isMobile ? 32 : 48 }}>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: CTA, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Warum Menschen uns vertrauen</p>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: 0 }}>Unsere Geschichte, kurz erzählt.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 720 }}>
            {TRUST.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: isMobile ? 16 : 28, paddingBottom: i < TRUST.length - 1 ? 32 : 0 }}>
                {/* Line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: CTA, flexShrink: 0, marginTop: 4 }} />
                  {i < TRUST.length - 1 && <div style={{ width: 2, flex: 1, background: "#D6E4F7", marginTop: 6 }} />}
                </div>
                <div style={{ paddingBottom: i < TRUST.length - 1 ? 0 : 0 }}>
                  <p style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 13 : 14, color: CTA, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.year}</p>
                  <p style={{ fontFamily: F, fontSize: isMobile ? 13 : 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48, display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: F, fontWeight: 600, fontSize: isMobile ? 28 : 40, lineHeight: "1.3", color: "var(--black)", margin: 0 }}>Häufige Fragen</h2>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: isMobile ? 15 : 18, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
              Hier findest du Antworten auf die wichtigsten Fragen rund um PTBD.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 864, margin: "0 auto" }}>
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "none", border: "none", borderBottom: open ? "none" : "1px solid var(--grey-border)", cursor: "pointer", textAlign: "left", gap: 16 }}>
                    <span style={{ fontFamily: F, fontWeight: 500, fontSize: isMobile ? 16 : 20, lineHeight: 1.4, color: "var(--black)", flex: 1 }}>{item.q}</span>
                    <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {open ? <Minus size={16} color="var(--black)" /> : <Plus size={16} color="var(--black)" />}
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "12px 16px 16px", fontFamily: F, fontWeight: 400, fontSize: isMobile ? 14 : 16, lineHeight: 1.5, color: "var(--grey-text)", borderBottom: "1px solid var(--grey-border)" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ background: "#F5F9FD", padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: isMobile ? 22 : 30, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>
              Bereit, den ersten Schritt zu machen?
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: "var(--grey-text)", margin: 0, lineHeight: 1.7 }}>
              Wir sind für dich da — kostenlos, unverbindlich und vertraulich.
            </p>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, marginTop: 8, width: isMobile ? "100%" : "auto" }}>
              <a href="/vorgespraech"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 50, padding: "0 36px 0 28px", borderRadius: 9999, background: CTA, color: "white", fontFamily: F, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.26)", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--cta-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CTA}>
                Kostenloses Orientierungsgespräch
                <img src="/icons/arrow-right.svg" width={16} height={16} alt="" style={{ filter: "brightness(0) invert(1)" }} />
              </a>
              <a href="/fachkraefte"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid ${CTA}`, color: CTA, fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", background: "white", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EEF4FC"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
                Therapeut*in finden
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
