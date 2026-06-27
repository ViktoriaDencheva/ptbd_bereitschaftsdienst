"use client";
import { useState } from "react";
import { Plus, Minus, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AustriaMap from "@/components/AustriaMap";

const F = "'Poppins', sans-serif";
const CTA_HEX = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 40px" } as const;

// ─── Data ────────────────────────────────────────────────────────────────────

const BUNDESLAENDER = [
  "Alle", "Wien", "Niederösterreich", "Oberösterreich",
  "Steiermark", "Tirol", "Salzburg", "Kärnten", "Vorarlberg", "Burgenland",
];

type Standort = {
  id: string;
  bundesland: string;
  stadt: string;
  name: string;
  adresse: string;
  telefon: string;
  zeiten: string;
  info: string;
  online: boolean;
  image?: string;
  mapsUrl: string;
};

const STANDORTE: Standort[] = [
  {
    id: "wien-1",
    bundesland: "Wien",
    stadt: "Wien",
    name: "Beratungsstelle Wien",
    adresse: "Nibelungengasse 11/3. Stock/Tür 15, 1010 Wien",
    telefon: "+43 1 3672222",
    zeiten: "Mo–Fr · 9:00–18:00",
    info: "U-Bahn: Burgring, Karlsplatz, Museumsquartier, Volkstheater. Parkgarage Robert-Stolz-Platz in der Nähe.",
    online: true,
    image: "/standort-wien.jpg",
    mapsUrl: "https://maps.google.com/?q=Nibelungengasse+11+1010+Wien",
  },
  {
    id: "linz-1",
    bundesland: "Oberösterreich",
    stadt: "Linz",
    name: "Beratungsstelle Linz",
    adresse: "Bockgasse 3/Erdgeschoss, 4020 Linz",
    telefon: "+43 732 237377",
    zeiten: "Mo–Fr · 9:00–18:00",
    info: "Ca. 10 Minuten vom Hauptbahnhof. Bushaltestellen Donau Karl-Wiser-Straße. Kurzparkzone Bockgasse.",
    online: true,
    image: "/standort-linz.jpg",
    mapsUrl: "https://maps.google.com/?q=Bockgasse+3+4020+Linz",
  },
  {
    id: "salzburg-1",
    bundesland: "Salzburg",
    stadt: "Salzburg",
    name: "Beratungsstelle Salzburg",
    adresse: "Bergstraße 22, 5020 Salzburg",
    telefon: "+43 662 202210",
    zeiten: "Mo–Fr · 9:00–18:00",
    info: "Haltestellen Mirabellplatz oder Makartplatz. Parkgaragen in der Linzer Gasse.",
    online: true,
    image: "/standort-salzburg.jpg",
    mapsUrl: "https://maps.google.com/?q=Bergstraße+22+5020+Salzburg",
  },
  {
    id: "graz-1",
    bundesland: "Steiermark",
    stadt: "Graz",
    name: "Beratungsstelle Graz",
    adresse: "Kaiserfeldgasse 17/3. Stock, 8010 Graz",
    telefon: "+43 316 395335",
    zeiten: "Mo–Fr · 9:00–18:00",
    info: "Haltestellen Jakominiplatz und Wielandgasse. Blaue Zone Parken verfügbar.",
    online: true,
    image: "/standort-graz.jpg",
    mapsUrl: "https://maps.google.com/?q=Kaiserfeldgasse+17+8010+Graz",
  },
  {
    id: "innsbruck-1",
    bundesland: "Tirol",
    stadt: "Innsbruck",
    name: "Beratungsstelle Innsbruck",
    adresse: "Maximilianstraße 2/3. Stock/Raum 358, 6020 Innsbruck",
    telefon: "+43 512 250070",
    zeiten: "Mo–Fr · 9:00–18:00",
    info: "Ca. 8 Minuten vom Hauptbahnhof. Haltestellen Triumphpforte/Casino oder Maximilianstraße.",
    online: true,
    image: "/standort-innsbruck.jpg",
    mapsUrl: "https://maps.google.com/?q=Maximilianstraße+2+6020+Innsbruck",
  },
  {
    id: "klagenfurt-1",
    bundesland: "Kärnten",
    stadt: "Klagenfurt",
    name: "Beratungsstelle Klagenfurt",
    adresse: "Mozartstraße 90/Stiege 3/2. Stock, 9020 Klagenfurt",
    telefon: "+43 463 203338",
    zeiten: "Mo–Fr · 9:00–18:00",
    info: "Mehrere Haltestellen im Umkreis von 10 Gehminuten erreichbar.",
    online: true,
    image: "/standort-klagenfurt.jpg",
    mapsUrl: "https://maps.google.com/?q=Mozartstraße+90+9020+Klagenfurt",
  },
];

const FAQS = [
  {
    q: "Muss ich einen Termin vereinbaren?",
    a: "Ja, wir empfehlen, vorab einen Termin zu vereinbaren, um Wartezeiten zu vermeiden. Du kannst direkt online buchen oder uns telefonisch kontaktieren.",
  },
  {
    q: "Kann ich auch online teilnehmen?",
    a: "Viele unserer Standorte bieten zusätzlich Online-Beratungen per Videochat an. Das jeweilige Angebot siehst du direkt bei der Standortbeschreibung.",
  },
  {
    q: "Sind alle Standorte barrierefrei?",
    a: "Die meisten unserer Standorte sind barrierefrei zugänglich. Genaue Informationen findest du bei jedem Standort. Bei Fragen hilft dir unser Team gerne weiter.",
  },
  {
    q: "Wie finde ich den richtigen Standort?",
    a: "Nutze unsere Filterfunktion nach Bundesland oder Stadt. Wenn du unsicher bist, empfehlen wir zuerst ein kostenloses Orientierungsgespräch – das geht auch online.",
  },
];

// Mapping from Bundesland display name → ProvinceId used by AustriaMap
const BL_TO_ID: Record<string, string> = {
  "Wien": "wien",
  "Niederösterreich": "niederoesterreich",
  "Oberösterreich": "oberoesterreich",
  "Steiermark": "steiermark",
  "Tirol": "tirol",
  "Salzburg": "salzburg",
  "Kärnten": "kaernten",
  "Vorarlberg": "vorarlberg",
  "Burgenland": "burgenland",
};
const ID_TO_BL: Record<string, string> = Object.fromEntries(
  Object.entries(BL_TO_ID).map(([k, v]) => [v, k])
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "none", border: "none", borderBottom: open ? "none" : "1px solid var(--grey-border)", cursor: "pointer", textAlign: "left", gap: 16 }}
      >
        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 18, lineHeight: 1.4, color: "var(--black)", flex: 1 }}>{q}</span>
        <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {open ? <Minus size={16} color="var(--black)" /> : <Plus size={16} color="var(--black)" />}
        </div>
      </button>
      {open && (
        <div style={{ padding: "12px 16px 16px", fontFamily: F, fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--grey)", borderBottom: "1px solid var(--grey-border)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

function StandortCard({ s }: { s: Standort }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ background: "white", borderRadius: 14, border: "1.5px solid #E8EFF8", overflow: "hidden", display: "flex", flexDirection: "column", gap: 0, transition: "box-shadow 0.2s, border-color 0.2s" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.boxShadow = "0 6px 24px rgba(45,91,141,0.10)"; el.style.borderColor = "#C5D8F0"; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.boxShadow = "none"; el.style.borderColor = "#E8EFF8"; }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 180, background: "linear-gradient(135deg, #D8E8F7 0%, #EBF2FC 100%)", flexShrink: 0 }}>
        {s.image && !imgError ? (
          <img
            src={s.image}
            alt={s.name}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: F, fontSize: 48, fontWeight: 800, color: CTA_HEX, opacity: 0.18 }}>{s.stadt[0]}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA_HEX, background: "#EBF2FC", borderRadius: 999, padding: "2px 10px" }}>{s.bundesland}</span>
          </div>
          <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: 17, color: "#1A1A1A", lineHeight: 1.3, margin: 0 }}>{s.name}</h3>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <MapPin size={15} color={CTA_HEX} style={{ flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontFamily: F, fontSize: 14, color: "#444", lineHeight: 1.5 }}>{s.adresse}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Phone size={15} color={CTA_HEX} style={{ flexShrink: 0 }} />
          <a href={`tel:${s.telefon.replace(/\s/g, "")}`} style={{ fontFamily: F, fontSize: 14, color: CTA_HEX, textDecoration: "none" }}>{s.telefon}</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Clock size={15} color={CTA_HEX} style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: F, fontSize: 14, color: "#444" }}>{s.zeiten}</span>
        </div>
      </div>

      <p style={{ fontFamily: F, fontSize: 13.5, color: "#888", lineHeight: 1.55, margin: 0 }}>{s.info}</p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a
          href={s.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 40, padding: "0 18px", borderRadius: 9999, border: `1.5px solid ${CTA_HEX}`, color: CTA_HEX, fontFamily: F, fontWeight: 500, fontSize: 13.5, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#EBF2FC")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <ExternalLink size={13} /> Route öffnen
        </a>
        <a
          href="/vorgespraech"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 40, padding: "0 18px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 500, fontSize: 13.5, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#234a72")}
          onMouseLeave={e => (e.currentTarget.style.background = CTA_HEX)}
        >
          Termin vereinbaren
        </a>
      </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StandortePage() {
  const [activeBL, setActiveBL] = useState("Alle");
  const filtered = STANDORTE.filter(s => {
    if (activeBL !== "Alle" && s.bundesland !== activeBL) return false;
    return true;
  });

  return (
    <>
      <Navbar />

      {/* ── BREADCRUMBS ── */}
      <div className="st-bc-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CTA_HEX}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"}
          >Startseite</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>Standorte</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: "white", padding: "20px 0 0", overflow: "hidden" }}>
        <div className="st-w" style={W}>
          <div className="st-hero-grid">
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 64 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 12, fontWeight: 700, color: CTA_HEX, letterSpacing: "0.08em", background: "#EBF2FC", borderRadius: 999, padding: "5px 14px", width: "fit-content" }}>
                STANDORTE
              </span>
              <h1 className="st-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15, margin: 0 }}>
                Unsere Standorte<br />in Österreich
              </h1>
              <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                Der Psychotherapeutischer Bereitschaftsdienst ist in mehreren Städten Österreichs vertreten.
                Finde den nächsten Standort für ein persönliches Gespräch — oder nutze unsere Online-Angebote.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#234a72")}
                  onMouseLeave={e => (e.currentTarget.style.background = CTA_HEX)}
                >
                  Termin vereinbaren
                </a>
                <a href="#standortliste" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 28px", borderRadius: 9999, border: `1.5px solid #C5D8F0`, color: CTA_HEX, fontFamily: F, fontWeight: 500, fontSize: 15, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EBF2FC"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  Alle Standorte ansehen
                </a>
              </div>
              {/* Stats */}
              <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
                {[
                  { num: "6", label: "Standorte" },
                  { num: "5", label: "Bundesländer" },
                  { num: "5/6", label: "mit Online-Option" },
                ].map(({ num, label }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: F, fontWeight: 800, fontSize: 28, color: CTA_HEX }}>{num}</span>
                    <span style={{ fontFamily: F, fontSize: 13, color: "#888" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — image */}
            <div className="st-hero-img-wrap" style={{ position: "relative", alignSelf: "stretch", minHeight: 360, paddingBottom: 40 }}>
              <img
                src="/PTBD-Standort.png"
                alt="PTBD Standort"
                style={{ position: "absolute", inset: "0 0 40px 0", width: "100%", height: "calc(100% - 40px)", objectFit: "cover", borderRadius: 20 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div className="st-w" style={W}>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", marginBottom: 8 }}>Wo findest du uns?</h2>
          <p style={{ fontFamily: F, fontSize: 14.5, color: "#888", marginBottom: 36 }}>Klicke auf ein Bundesland, um direkt zu den Standorten zu springen.</p>
          <div className="st-map-layout">
            {/* Map */}
            <div style={{ flex: "0 0 60%" }}>
              <AustriaMap
                activeId={activeBL !== "Alle" ? (BL_TO_ID[activeBL] as any) : null}
                onSelect={(id) => {
                  const bl = ID_TO_BL[id];
                  if (bl) {
                    setActiveBL(bl);
                    document.getElementById("standortliste")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            </div>
            {/* Pills + info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: F, fontSize: 13, color: "#888", marginBottom: 16 }}>Bundesland wählen:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {BUNDESLAENDER.map(bl => {
                  const count = bl === "Alle" ? STANDORTE.length : STANDORTE.filter(s => s.bundesland === bl).length;
                  const isActive = activeBL === bl;
                  return (
                    <button
                      key={bl}
                      onClick={() => {
                        setActiveBL(bl);
                        document.getElementById("standortliste")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 14px", borderRadius: 9999, border: isActive ? `1.5px solid ${CTA_HEX}` : "1.5px solid #DDE8F5", background: isActive ? CTA_HEX : "white", color: isActive ? "white" : "#333", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: count === 0 ? "default" : "pointer", opacity: count === 0 ? 0.4 : 1, transition: "all 0.2s" }}
                    >
                      {bl}
                      {count > 0 && bl !== "Alle" && (
                        <span style={{ fontFamily: F, fontSize: 11, background: isActive ? "rgba(255,255,255,0.25)" : "#EBF2FC", color: isActive ? "white" : CTA_HEX, borderRadius: 999, padding: "1px 7px", fontWeight: 600 }}>{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontFamily: F, fontSize: 13, color: "#aaa", marginTop: 20 }}>
                {filtered.length} Standort{filtered.length !== 1 ? "e" : ""} {activeBL !== "Alle" ? `in ${activeBL}` : "österreichweit"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER + LIST ── */}
      <section id="standortliste" style={{ background: "white", padding: "72px 0" }}>
        <div className="st-w" style={W}>
          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
            {activeBL !== "Alle" && (
              <button
                onClick={() => setActiveBL("Alle")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 14px", borderRadius: 9999, border: `1.5px solid ${CTA_HEX}`, background: "#EBF2FC", color: CTA_HEX, fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer" }}
              >
                {activeBL} ×
              </button>
            )}
            <span style={{ fontFamily: F, fontSize: 13, color: "#aaa", marginLeft: "auto" }}>
              {filtered.length} von {STANDORTE.length} Standorten
            </span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", fontFamily: F, color: "#888", fontSize: 15 }}>
              Keine Standorte gefunden. <button onClick={() => { setActiveBL("Alle"); }} style={{ background: "none", border: "none", color: CTA_HEX, cursor: "pointer", fontFamily: F, fontSize: 15 }}>Filter zurücksetzen</button>
            </div>
          ) : (
            <div className="st-grid">
              {filtered.map(s => <StandortCard key={s.id} s={s} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#F7F9FC", padding: "72px 0" }}>
        <div className="st-w" style={W}>
          <div className="st-faq-layout">
            <div>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", marginBottom: 8 }}>Häufige Fragen zu Standorten</h2>
              <p style={{ fontFamily: F, fontSize: 14.5, color: "#888", marginBottom: 0 }}>Alles, was du vor deinem Besuch wissen solltest.</p>
            </div>
            <div>
              {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .st-bc-wrap { max-width: 1440px; margin: 0 auto; padding: 32px 80px 28px; }
        .st-h1 { font-size: 48px; }
        .st-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: stretch;
        }
        .st-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .st-map-layout {
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }
        .st-faq-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 1070px) {
          .st-bc-wrap { padding: 20px 16px 16px !important; }
          .st-w { padding-left: 16px !important; padding-right: 16px !important; }
          .st-h1 { font-size: 32px !important; }
          .st-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .st-hero-img-wrap { min-height: 240px !important; }
          .st-grid { grid-template-columns: 1fr !important; }
          .st-map-layout { flex-direction: column !important; gap: 24px !important; }
          .st-map-layout > div:first-child { width: 100% !important; }
          .st-faq-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 1200px) and (min-width: 1071px) {
          .st-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
