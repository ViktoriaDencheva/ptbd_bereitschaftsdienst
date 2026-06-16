"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "500+", label: "Gespräche geführt" },
  { value: "4.9★", label: "Kundenbewertung" },
  { value: "48h", label: "bis zum ersten Termin" },
  { value: "100%", label: "Geprüfte Fachkräfte" },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop: hide on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 10;
      el.style.maxHeight = scrolled ? "0" : "56px";
      el.style.opacity = scrolled ? "0" : "1";
    };
    // Reset на върха при mount
    window.scrollTo(0, 0);
    el.style.maxHeight = "56px";
    el.style.opacity = "1";
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile: auto-rotate stats
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % stats.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "var(--blue-ultra-light)",
        borderBottom: "1px solid #ddeeff",
        maxHeight: "56px",
        opacity: 1,
        overflow: "hidden",
        transition: "max-height 0.4s ease, opacity 0.3s ease",
        position: "sticky", top: 0, zIndex: 101,
      }}
      className="social-proof-bar"
    >
      {/* Desktop — all stats */}
      <div className="sp-desktop" style={{
        maxWidth: 1440, margin: "0 auto",
        padding: "10px 80px",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 40,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--cta)" }}>{s.value}</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13, color: "var(--grey-text)", whiteSpace: "nowrap" }}>{s.label}</span>
            {i < stats.length - 1 && <div style={{ width: 1, height: 16, background: "var(--grey-border)", marginLeft: 24 }} />}
          </div>
        ))}
      </div>

      {/* Mobile — rotating single stat with arrows */}
      <div className="sp-mobile" style={{
        padding: "0 16px",
        display: "none", alignItems: "center", justifyContent: "center", gap: 10, height: "100%",
      }}>
        <button onClick={() => setActiveIndex(i => (i - 1 + stats.length) % stats.length)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", color: "var(--cta)", fontSize: 20, lineHeight: 1, fontWeight: 700, flexShrink: 0 }}>‹</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--cta)" }}>
            {stats[activeIndex].value}
          </span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, color: "var(--grey-text)" }}>
            {stats[activeIndex].label}
          </span>
        </div>
        <button onClick={() => setActiveIndex(i => (i + 1) % stats.length)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", color: "var(--cta)", fontSize: 20, lineHeight: 1, fontWeight: 700, flexShrink: 0 }}>›</button>
      </div>

      <style>{`
        @media (max-width: 1070px) {
          .sp-desktop { display: none !important; }
          .sp-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
