"use client";
import { useRef, useState } from "react";
const imgQuote = "/icons/icon-quote-review.svg";
const imgStarFull = "/icons/icon-star-review.svg";
const imgStarEmpty = "/icons/icon-star-empty.svg";
const imgCardBg: string | null = null;
// ProvenExpert — square image, not circle
const imgProvenExpert = "/icons/ProvenExpert.svg";

const reviews = [
  { text: "Ich habe mich sofort gut aufgehoben gefühlt. Die Kommunikation war einfühlsam, und es war schön zu wissen, dass alle Fachkräfte geprüft und verifiziert sind.", name: "Elia Hahn", date: "05.04.2024", initial: "E", stars: 5 },
  { text: "Ich hatte zuerst Hemmungen, online Hilfe zu suchen. Aber die Plattform hat mir den Einstieg unglaublich leicht gemacht. Alles wirkt ruhig, klar und professionell.", name: "Maria Hrtl", date: "12.04.2024", initial: "M", stars: 5 },
  { text: "Sehr übersichtliche Plattform. Auch wenn ich emotional überfordert war, habe ich mich gut durch die Schritte geführt gefühlt. Klare Sprache, klare Struktur.", name: "Nikola Schmidt", date: "25.03.2024", initial: "N", stars: 5 },
  { text: "Die Terminbuchung ging viel schneller als erwartet. Besonders gut fand ich das Orientierungsgespräch – endlich wusste ich, welche Fachrichtung wirklich zu meinem Problem passt.", name: "Lukas Tober", date: "25.06.2024", initial: "L", stars: 5 },
];

function ReviewCard({ r, width = 366 }: { r: typeof reviews[0]; width?: number }) {
  return (
    <div style={{
      position: "relative", borderRadius: 16, overflow: "hidden",
      background: "white", padding: "24px 24px 16px 24px",
      display: "flex", flexDirection: "column",
      flexShrink: 0, width, alignSelf: "stretch",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      {/* Декоративна форма долу-дясно — точно по дизайна */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 382 253" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M367 253H306.715C309.127 201 334.29 190.3 382 174.4V253C382 253 375.3 253 367 253Z" fill="#FBE0DC"/>
      </svg>

      {/* Quote + звезди */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={imgQuote} alt="" style={{ width: 40, height: 40 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {[1,2,3,4,5].map(i => (
            <img key={i} src={i <= r.stars ? imgStarFull : imgStarEmpty} alt="" style={{ width: 20, height: 20 }} />
          ))}
        </div>
      </div>

      {/* Текст */}
      <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "var(--black)", margin: 0, flex: 1 }}>
        {r.text}
      </p>

      {/* Автор */}
      <div style={{ borderTop: "1px solid var(--grey-border)", paddingTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--blue-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14, color: "var(--cta)" }}>{r.initial}</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--cta)", lineHeight: 1.4 }}>{r.name}</div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 12, color: "var(--grey-text)", lineHeight: 1.4 }}>{r.date}</div>
        </div>
      </div>
    </div>
  );
}

export default function Meinungen() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = reviews.length + 1; // +1 за ProvenExpert

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / totalItems;
    const index = Math.round(el.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  return (
    <section style={{ background: "var(--blue-ultra-light)", overflow: "hidden" }}>
      {/* ===== DESKTOP ===== */}
      <div className="mein-desktop" style={{ padding: "32px 80px 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "var(--black)", flex: "0 0 auto", maxWidth: 663 }}>Das sagen unsere Nutzer*innen</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey)", flex: 1 }}>Echte Menschen. Echte Geschichte. Entdecke, wie unsere Plattform Unterstützung bietet und wirklich einen Unterschied macht.</p>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
            {/* ProvenExpert — square, not circle */}
            {/* ProvenExpert — без заобляния */}
            <div style={{ flexShrink: 0, borderRadius: 0, overflow: "hidden", alignSelf: "stretch", display: "flex", alignItems: "center" }}>
              {imgProvenExpert && <img src={imgProvenExpert} alt="ProvenExpert" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
            {/* Cards — scrollable row, no layout break */}
            <div style={{ flex: 1, display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4, minWidth: 0, alignItems: "stretch" }}>
              {reviews.map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="mein-mobile" style={{ display: "none", padding: "32px 16px" }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.3, color: "var(--black)", marginBottom: 12 }}>Das sagen unsere Nutzer*innen</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)", marginBottom: 24 }}>Echte Menschen. Echte Geschichte. Entdecke, wie unsere Plattform Unterstützung bietet.</p>
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4, scrollSnapType: "x mandatory" }}
        >
          {/* ProvenExpert badge — без заоблени ъгли, същата височина като картите */}
          <div style={{ flexShrink: 0, alignSelf: "stretch", scrollSnapAlign: "start", display: "flex", alignItems: "center" }}>
            {imgProvenExpert && <img src={imgProvenExpert} alt="ProvenExpert" style={{ height: "100%", width: "auto", objectFit: "contain", display: "block" }} />}
          </div>
          {reviews.map((r, i) => (
            <div key={i} style={{ scrollSnapAlign: "start", flexShrink: 0, alignSelf: "stretch", display: "flex" }}>
              <ReviewCard r={r} width={300} />
            </div>
          ))}
        </div>

        {/* Dot индикатор */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {Array.from({ length: totalItems }).map((_, i) => (
            <div key={i} style={{
              height: 8,
              width: i === activeIndex ? 24 : 8,
              borderRadius: 9999,
              background: i === activeIndex ? "var(--cta)" : "rgba(0,0,0,0.18)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1070px) {
          .mein-desktop { display: none !important; }
          .mein-mobile { display: block !important; }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
