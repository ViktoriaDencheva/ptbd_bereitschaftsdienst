"use client";
import { useState } from "react";
import { Plus, Minus, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    zeiten: "Mo–Fr · nach Vereinbarung",
    info: "U-Bahn: Burgring, Karlsplatz, Museumsquartier, Volkstheater. Parkgarage Robert-Stolz-Platz in der Nähe.",
    online: true,
    mapsUrl: "https://maps.google.com/?q=Nibelungengasse+11+1010+Wien",
  },
  {
    id: "linz-1",
    bundesland: "Oberösterreich",
    stadt: "Linz",
    name: "Beratungsstelle Linz",
    adresse: "Bockgasse 3/Erdgeschoss, 4020 Linz",
    telefon: "+43 732 237377",
    zeiten: "Mo–Fr · nach Vereinbarung",
    info: "Ca. 10 Minuten vom Hauptbahnhof. Bushaltestellen Donau Karl-Wiser-Straße. Kurzparkzone Bockgasse.",
    online: true,
    mapsUrl: "https://maps.google.com/?q=Bockgasse+3+4020+Linz",
  },
  {
    id: "salzburg-1",
    bundesland: "Salzburg",
    stadt: "Salzburg",
    name: "Beratungsstelle Salzburg",
    adresse: "Bergstraße 22, 5020 Salzburg",
    telefon: "+43 662 202210",
    zeiten: "Mo–Fr · nach Vereinbarung",
    info: "Haltestellen Mirabellplatz oder Makartplatz. Parkgaragen in der Linzer Gasse.",
    online: true,
    mapsUrl: "https://maps.google.com/?q=Bergstraße+22+5020+Salzburg",
  },
  {
    id: "graz-1",
    bundesland: "Steiermark",
    stadt: "Graz",
    name: "Beratungsstelle Graz",
    adresse: "Kaiserfeldgasse 17/3. Stock, 8010 Graz",
    telefon: "+43 316 395335",
    zeiten: "Mo–Fr · nach Vereinbarung",
    info: "Haltestellen Jakominiplatz und Wielandgasse. Blaue Zone Parken verfügbar.",
    online: true,
    mapsUrl: "https://maps.google.com/?q=Kaiserfeldgasse+17+8010+Graz",
  },
  {
    id: "innsbruck-1",
    bundesland: "Tirol",
    stadt: "Innsbruck",
    name: "Beratungsstelle Innsbruck",
    adresse: "Maximilianstraße 2/3. Stock/Raum 358, 6020 Innsbruck",
    telefon: "+43 512 250070",
    zeiten: "Mo–Fr · nach Vereinbarung",
    info: "Ca. 8 Minuten vom Hauptbahnhof. Haltestellen Triumphpforte/Casino oder Maximilianstraße.",
    online: true,
    mapsUrl: "https://maps.google.com/?q=Maximilianstraße+2+6020+Innsbruck",
  },
  {
    id: "klagenfurt-1",
    bundesland: "Kärnten",
    stadt: "Klagenfurt",
    name: "Beratungsstelle Klagenfurt",
    adresse: "Mozartstraße 90/Stiege 3/2. Stock, 9020 Klagenfurt",
    telefon: "+43 463 203338",
    zeiten: "Mo–Fr · nach Vereinbarung",
    info: "Mehrere Haltestellen im Umkreis von 10 Gehminuten erreichbar.",
    online: true,
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

// ─── Austria interactive map ─────────────────────────────────────────────────

const PROVINCES: { id: string; label: string; paths: string[] }[] = [
  {
    id: "Vorarlberg",
    label: "V",
    paths: [
      "M8,225 L55,200 L72,222 L67,292 L30,310 L10,272 Z",
    ],
  },
  {
    id: "Tirol",
    label: "T",
    paths: [
      // Nordtirol
      "M55,200 L242,148 L298,150 L312,198 L282,232 L228,252 L152,268 L67,258 L72,222 Z",
      // Osttirol
      "M272,262 L322,275 L370,270 L390,258 L364,242 L322,256 L282,250 Z",
    ],
  },
  {
    id: "Salzburg",
    label: "S",
    paths: [
      "M242,148 L350,122 L388,150 L390,212 L364,242 L322,256 L282,250 L282,232 L298,178 L260,158 Z",
    ],
  },
  {
    id: "Oberösterreich",
    label: "OÖ",
    paths: [
      "M350,122 L480,102 L514,136 L508,172 L478,198 L430,210 L388,202 L388,150 Z",
    ],
  },
  {
    id: "Niederösterreich",
    label: "NÖ",
    paths: [
      "M480,102 L648,82 L688,108 L702,152 L698,208 L670,222 L640,232 L592,218 L542,206 L512,192 L508,172 L514,136 Z",
    ],
  },
  {
    id: "Wien",
    label: "W",
    paths: [
      "M690,152 L712,148 L718,172 L694,174 L690,162 Z",
    ],
  },
  {
    id: "Burgenland",
    label: "B",
    paths: [
      "M698,208 L720,202 L730,238 L722,292 L706,334 L686,348 L666,338 L656,308 L672,250 L698,228 Z",
    ],
  },
  {
    id: "Steiermark",
    label: "Stmk",
    paths: [
      "M390,212 L478,198 L512,192 L542,206 L592,218 L640,232 L656,308 L630,342 L576,368 L506,370 L452,350 L422,312 L390,282 L370,258 L390,232 Z",
    ],
  },
  {
    id: "Kärnten",
    label: "K",
    paths: [
      "M282,250 L322,256 L364,242 L390,258 L390,282 L422,312 L390,368 L330,380 L282,370 L252,340 L244,300 L257,270 L272,262 Z",
    ],
  },
];

function AustriaMap({
  activeBL,
  hasStandort,
  onSelect,
}: {
  activeBL: string;
  hasStandort: (bl: string) => boolean;
  onSelect: (bl: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 740 }}>
      <svg
        viewBox="0 0 740 400"
        style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}
        aria-label="Österreich Karte – Bundesländer"
      >
        {/* Background */}
        <rect x="0" y="0" width="740" height="400" fill="#EEF3FA" rx="12" />

        {PROVINCES.map(({ id, label, paths }) => {
          const active = activeBL === id;
          const hover = hovered === id;
          const hasLocation = hasStandort(id);
          const fill = active
            ? CTA_HEX
            : hover && hasLocation
            ? "#C5D8F0"
            : hasLocation
            ? "#D8E8F7"
            : "#E4EAF2";
          const stroke = active ? "#1e3f66" : hover ? "#9BBAD8" : "#B8CEDE";
          const cursor = hasLocation ? "pointer" : "default";

          return (
            <g
              key={id}
              style={{ cursor }}
              onClick={() => hasLocation && onSelect(id)}
              onMouseEnter={() => hasLocation && setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={id}
            >
              {paths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={active ? 1.5 : 1}
                  style={{ transition: "fill 0.18s, stroke 0.18s" }}
                />
              ))}
              {/* Label — skip Wien (too small) */}
              {id !== "Wien" && id !== "Tirol" && (() => {
                // Compute rough centroid from first path
                const pts = paths[0].replace(/[MLZ]/g, " ").trim().split(/\s+/).reduce<number[][]>((acc, _, i, arr) => {
                  if (i % 2 === 0 && arr[i + 1]) acc.push([parseFloat(arr[i]), parseFloat(arr[i + 1])]);
                  return acc;
                }, []);
                const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
                const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
                return (
                  <text
                    x={cx} y={cy}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={id === "Niederösterreich" || id === "Steiermark" ? 13 : 11}
                    fontWeight={active ? 700 : 500}
                    fill={active ? "white" : "#4A6A8A"}
                    style={{ pointerEvents: "none", userSelect: "none", fontFamily: "Poppins, sans-serif" }}
                  >
                    {label}
                  </text>
                );
              })()}
            </g>
          );
        })}

        {/* Wien label separately (tiny province) */}
        <text x={704} y={162} textAnchor="middle" fontSize={8} fontWeight={500}
          fill={activeBL === "Wien" ? "white" : "#4A6A8A"}
          style={{ pointerEvents: "none", userSelect: "none", fontFamily: "Poppins, sans-serif" }}
        >W</text>
        {/* Tirol label in main body */}
        <text x={170} y={222} textAnchor="middle" fontSize={13} fontWeight={activeBL === "Tirol" ? 700 : 500}
          fill={activeBL === "Tirol" ? "white" : "#4A6A8A"}
          style={{ pointerEvents: "none", userSelect: "none", fontFamily: "Poppins, sans-serif" }}
        >T</text>
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          background: "#1A1A1A", color: "white", fontFamily: F, fontSize: 13, fontWeight: 500,
          padding: "5px 14px", borderRadius: 999, pointerEvents: "none", whiteSpace: "nowrap",
        }}>
          {hovered}
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", gap: 18, marginTop: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 12, color: "#666" }}>
          <span style={{ width: 14, height: 14, borderRadius: 3, background: "#D8E8F7", display: "inline-block", border: "1px solid #B8CEDE" }} />
          Standort vorhanden
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 12, color: "#666" }}>
          <span style={{ width: 14, height: 14, borderRadius: 3, background: CTA_HEX, display: "inline-block" }} />
          Ausgewählt
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 12, color: "#666" }}>
          <span style={{ width: 14, height: 14, borderRadius: 3, background: "#E4EAF2", display: "inline-block", border: "1px solid #B8CEDE" }} />
          Online / kein Standort
        </div>
      </div>
    </div>
  );
}

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
  return (
    <div style={{ background: "white", borderRadius: 14, border: "1.5px solid #E8EFF8", padding: "24px", display: "flex", flexDirection: "column", gap: 16, transition: "box-shadow 0.2s, border-color 0.2s" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.boxShadow = "0 6px 24px rgba(45,91,141,0.10)"; el.style.borderColor = "#C5D8F0"; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.boxShadow = "none"; el.style.borderColor = "#E8EFF8"; }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: CTA_HEX, background: "#EBF2FC", borderRadius: 999, padding: "2px 10px" }}>{s.bundesland}</span>
            {s.online && (
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "#2D7A3A", background: "#F0FAF2", borderRadius: 999, padding: "2px 10px" }}>Online verfügbar</span>
            )}
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StandortePage() {
  const [activeBL, setActiveBL] = useState("Alle");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = STANDORTE.filter(s => {
    if (activeBL !== "Alle" && s.bundesland !== activeBL) return false;
    if (onlineOnly && !s.online) return false;
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
      <section style={{ background: "white", padding: "64px 0 0", overflow: "hidden" }}>
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
            <div className="st-hero-img-wrap" style={{ position: "relative", alignSelf: "stretch", minHeight: 360 }}>
              <img
                src="/kontakt-banner.png"
                alt="Beratungszimmer"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px 20px 0 0" }}
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
          <AustriaMap
            activeBL={activeBL}
            hasStandort={(bl) => STANDORTE.some(s => s.bundesland === bl)}
            onSelect={(bl) => {
              setActiveBL(bl);
              document.getElementById("standortliste")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </section>

      {/* ── FILTER + LIST ── */}
      <section id="standortliste" style={{ background: "white", padding: "72px 0" }}>
        <div className="st-w" style={W}>
          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
            <span style={{ fontFamily: F, fontSize: 14, color: "#666" }}>Filter:</span>
            <button
              onClick={() => setOnlineOnly(o => !o)}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 14px", borderRadius: 9999, border: onlineOnly ? `1.5px solid #2D7A3A` : "1.5px solid #DDE8F5", background: onlineOnly ? "#F0FAF2" : "white", color: onlineOnly ? "#2D7A3A" : "#555", fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}
            >
              ✓ Online verfügbar
            </button>
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
              Keine Standorte gefunden. <button onClick={() => { setActiveBL("Alle"); setOnlineOnly(false); }} style={{ background: "none", border: "none", color: CTA_HEX, cursor: "pointer", fontFamily: F, fontSize: 15 }}>Filter zurücksetzen</button>
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

      {/* ── CTA ── */}
      <section style={{ background: "white", padding: "80px 0 96px" }}>
        <div className="st-w" style={W}>
          <div style={{ background: "linear-gradient(135deg, #EBF2FC 0%, #F5F9FF 100%)", borderRadius: 20, padding: "60px 48px", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, color: "#1A1A1A", marginBottom: 12, lineHeight: 1.25 }}>Noch unsicher?</h2>
            <p style={{ fontFamily: F, fontSize: 16, color: "#555", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
              Starte mit einem kostenlosen Orientierungsgespräch — wir helfen dir herauszufinden, welcher Standort und welche Fachkraft am besten zu dir passt.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/vorgespraech" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 52, padding: "0 32px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.22)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#234a72")}
                onMouseLeave={e => (e.currentTarget.style.background = CTA_HEX)}
              >
                Kostenloses Orientierungsgespräch
              </a>
              <a href="/fachkraefte" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 52, padding: "0 32px", borderRadius: 9999, border: `1.5px solid ${CTA_HEX}`, color: CTA_HEX, fontFamily: F, fontWeight: 500, fontSize: 15, textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#EBF2FC"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                Fachkräfte finden
              </a>
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
          .st-faq-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 1200px) and (min-width: 1071px) {
          .st-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
