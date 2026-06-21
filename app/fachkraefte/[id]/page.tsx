"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { therapists } from "@/lib/therapists";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

const availColors: Record<string, { dot: string; text: string; label: string }> = {
  today:    { dot: "#2DB36A", text: "var(--cta)", label: "Heute verfügbar" },
  thisweek: { dot: "#F59E0B", text: "var(--cta)", label: "Diese Woche verfügbar" },
  later:    { dot: "var(--grey-border)", text: "var(--grey-text)", label: "In 2+ Wochen verfügbar" },
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="currentColor"/>
  </svg>
);

export default function TherapistDetailPage() {
  const params = useParams();
  const winW = useWindowWidth();
  const isMobile = winW > 0 && winW < 1071;
  const isMedium = winW >= 1071 && winW < 1200;
  const bookingRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const el = bookingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      setShowStickyBar(!entry.isIntersecting);
    }, { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const id = Number(params.id);
  const t = therapists.find(x => x.id === id);
  const similar = (() => {
    const available = therapists.filter(x => x.id !== id && x.availability !== "later");
    const result = available.slice(0, 3);
    // fallback: if not enough available, fill with others (excluding "later" as much as possible)
    if (result.length < 3) {
      const fallback = therapists.filter(x => x.id !== id && !result.includes(x));
      return [...result, ...fallback].slice(0, 3);
    }
    return result;
  })();

  if (!t) {
    return (
      <main style={{ minHeight: "100vh", background: "white" }}>
        <Navbar />
        <div style={{ maxWidth: 800, margin: "80px auto", textAlign: "center", fontFamily: "'Poppins',sans-serif" }}>
          <h1 style={{ fontSize: 28, color: "var(--black)" }}>Fachkraft nicht gefunden</h1>
          <a href="/fachkraefte" style={{ color: "var(--cta)", textDecoration: "none", fontSize: 16, marginTop: 16, display: "inline-block" }}>← Zurück zur Suche</a>
        </div>
        <Footer />
      </main>
    );
  }

  const avail = availColors[t.availability] ?? availColors.later;

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Breadcrumbs ── */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "14px 16px" }} className="breadcrumb-wrap">
        <nav style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <a href="/" style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 14 : 14, color: "var(--grey-text)", textDecoration: "none", fontWeight: 400 }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
          >Startseite</a>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
          <a href="/fachkraefte" style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 14 : 14, color: "var(--grey-text)", textDecoration: "none", fontWeight: 400 }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
          >Fachkräfte</a>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-border)" strokeWidth="1.8" strokeLinecap="round" d="M9 6l6 6-6 6"/></svg>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 14 : 14, color: "var(--black)", fontWeight: 600 }}>{t.name}</span>
        </nav>
      </div>

      {/* ── Mobile layout ── */}
      <div style={{ display: isMobile ? "block" : "none" }}>
          {/* Hero photo */}
          <div style={{ width: "100%", height: winW > 700 ? 360 : 300, overflow: "hidden", position: "relative" }}>
            <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", display: "block" }} />
            {/* Share + save buttons overlay */}
            <MobilePhotoActions t={t} />
          </div>

          {/* Hero info */}
          <div style={{ padding: "16px 16px 32px" }}>
            {t.verified && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--green)", fontWeight: 500 }}>Verifiziert</span>
              </div>
            )}
            {/* Name row with price + badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
              <div style={{ minWidth: 0 }}>
                <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 3px", lineHeight: 1.2 }}>{t.name}</h1>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: 0 }}>{t.degree ?? t.role}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 20, color: "var(--black)" }}>€{t.price}</span>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 13, color: "var(--grey-text)" }}>/ Sitzung</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: "0 0 20px", lineHeight: 1.7 }}>{t.bio}</p>

            {/* Info row */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>{t.experience} Jahre Erfahrung</span>
              <span style={{ color: "var(--grey-border)", fontSize: 9 }}>&#x25CF;</span>
              {t.address && t.angebot !== "online" ? (
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${(t.address as {street:string;city:string}).street}, ${(t.address as {street:string;city:string}).city}`)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--cta)", textDecoration: "underline" }}>
                  {t.location}, {(t.address as {street:string;city:string}).street}
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path stroke="var(--cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </a>
              ) : (
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>{t.location}</span>
              )}
              <span style={{ color: "var(--grey-border)", fontSize: 9 }}>&#x25CF;</span>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>{t.languages.join(", ")}</span>
            </div>

            {/* Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {(t.angebot === "online" || t.angebot === "beides") && <span style={{ padding: "6px 14px", borderRadius: 9999, fontSize: 14, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "var(--cta)", border: "1.5px solid var(--cta)" }}>Online</span>}
              {(t.angebot === "vor-ort" || t.angebot === "beides") && <span style={{ padding: "6px 14px", borderRadius: 9999, fontSize: 14, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "#B07000", border: "1.5px solid #D4920A" }}>Vor Ort</span>}
              {t.kassenerstattung && (
                <div title="Du bezahlst die Sitzung zunächst selbst. Nach dem Termin erhältst Du eine Honorarnote, die Du bei Deiner Krankenkasse einreichen kannst." style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--green-light)", border: "1px solid var(--grey-border)", borderRadius: 9999, padding: "6px 12px", cursor: "help" }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--green)", fontWeight: 500 }}>Kassenrückerstattung möglich</span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="var(--green)" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
              )}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", fontWeight: 500 }}>Hilft bei:</span>
              {t.tags.map(tag => (
                <span key={tag} style={{ background: "var(--blue-ultra-light)", border: "1px solid var(--grey-border)", borderRadius: 9999, padding: "6px 14px", fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)" }}>{tag}</span>
              ))}
            </div>

          </div>

          {/* Mobile booking section (slots + CTA) */}
          <div ref={bookingRef}>
            <MobileBookingSection t={t} />
          </div>

          <MobileContentSections t={t} similar={similar} />
          {/* ── Sticky booking bar ── */}
          {showStickyBar && <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "white", borderTop: "1px solid var(--grey-bg)",
            boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
            padding: "20px 16px", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 12, zIndex: 200,
          }}>
            {/* Left: name, then badge · price on second line */}
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
<span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--black)", whiteSpace: "nowrap" }}>€{t.price}</span>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 12, color: "var(--grey-text)", whiteSpace: "nowrap" }}>/Sitzung</span>
              </div>
            </div>
            {/* Right: book button */}
            <a href={`/buchen/${t.id}`} style={{ background: "var(--cta)", color: "white", borderRadius: 9999, padding: "12px 22px", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none", whiteSpace: "nowrap", display: "inline-block", flexShrink: 0 }}>Buchen</a>
          </div>}
      </div>

      {/* ── Desktop layout: left content + right sticky widget ── */}
      <div style={{ display: isMobile ? "none" : "grid", maxWidth: 1440, margin: "0 auto", padding: isMedium ? "0 24px 64px 32px" : "0 40px 64px 80px", gridTemplateColumns: isMedium ? `1fr 300px` : "1fr 340px", gap: isMedium ? 32 : 56, alignItems: "flex-start" }}>

          {/* ── LEFT: all content ── */}
          <div>
            {/* Hero: photo + info */}
            <div style={{ display: "grid", gridTemplateColumns: isMedium ? "220px 1fr" : "300px 1fr", gap: isMedium ? 24 : 36, alignItems: "flex-start", marginBottom: 40 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", height: isMedium ? 340 : 420 }}>
                <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
              </div>
              <div style={{ paddingTop: 8 }}>
                {t.verified && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--green)", fontWeight: 500 }}>Verifiziert</span>
                  </div>
                )}
                <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 34, color: "var(--black)", margin: "0 0 8px", lineHeight: 1.2 }}>{t.name}</h1>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "var(--grey-text)", margin: "0 0 16px" }}>{t.degree ?? t.role}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, color: "var(--grey-text)", margin: "0 0 28px", lineHeight: 1.7 }}>{t.bio}</p>
                {/* Info row — listing style */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="var(--grey-border)" strokeWidth="1.6"/><path d="M12 7v5l3 1.5" stroke="var(--grey-border)" strokeWidth="1.6" strokeLinecap="round"/></svg>
                    {t.experience} Jahre Erfahrung
                  </span>
                  <span style={{ color: "var(--grey-border)", fontSize: 10 }}>&#x25CF;</span>
                  {t.address && t.angebot !== "online" ? (
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${(t.address as {street:string;city:string}).street}, ${(t.address as {street:string;city:string}).city}`)}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--cta)"; (e.currentTarget.querySelectorAll("path, circle") as NodeListOf<SVGElement>).forEach(el => el.setAttribute("stroke", "var(--cta)")); }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"; (e.currentTarget.querySelectorAll("path, circle") as NodeListOf<SVGElement>).forEach(el => el.setAttribute("stroke", "var(--grey-border)")); }}
                    >
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="var(--grey-border)" strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke="var(--grey-border)" strokeWidth="1.6"/></svg>
                      {t.location}, {(t.address as {street:string;city:string}).street}
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                    </a>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="var(--grey-border)" strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke="var(--grey-border)" strokeWidth="1.6"/></svg>
                      {t.location}
                    </span>
                  )}
                  <span style={{ color: "var(--grey-border)", fontSize: 10 }}>&#x25CF;</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="var(--grey-border)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t.languages.join(", ")}
                  </span>
                </div>

                {/* Pills — listing style */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                  {(t.angebot === "online" || t.angebot === "beides") && <span style={{ padding: "6px 14px", borderRadius: 9999, fontSize: 13, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "var(--cta)", border: "1.5px solid var(--cta)" }}>Online</span>}
                  {(t.angebot === "vor-ort" || t.angebot === "beides") && <span style={{ padding: "6px 14px", borderRadius: 9999, fontSize: 13, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "#B07000", border: "1.5px solid #D4920A" }}>Vor Ort</span>}
                  {t.kassenerstattung && (
                    <div title="Du bezahlst die Sitzung zunächst selbst. Nach dem Termin erhältst Du eine Honorarnote, die Du bei Deiner Krankenkasse einreichen kannst." style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--green-light)", border: "1px solid var(--grey-border)", borderRadius: 9999, padding: "6px 12px", cursor: "help" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--green)", fontWeight: 500, whiteSpace: "nowrap" }}>Kassenrückerstattung möglich</span>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="var(--green)" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    </div>
                  )}
                </div>

                {/* Tags — listing style */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: t.address && t.angebot !== "online" ? 28 : 0 }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", fontWeight: 500, flexShrink: 0 }}>Hilft bei:</span>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ background: "var(--blue-ultra-light)", border: "1px solid var(--grey-border)", borderRadius: 9999, padding: "6px 14px", flexShrink: 0, fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--black)" }}>{tag}</span>
                  ))}
                </div>

              </div>
            </div>


            {/* Kann ich helfen */}
            <div style={{ borderTop: "1px solid var(--grey-bg)", borderBottom: "1px solid var(--grey-bg)", marginBottom: 40, padding: "24px 0" }}>
              {/* H4 token: Medium 24px */}
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 24, color: "var(--black)", margin: "0 0 4px" }}>Kann ich Dir bei Deinem Anliegen helfen?</h2>
              {/* body-M-reg: Regular 16px */}
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 16, color: "var(--grey-text)", margin: "0 0 28px" }}>Schau Dir an, worin ich Erfahrung habe und wie ich arbeite.</p>
              <div style={{ display: "grid", gridTemplateColumns: isMedium ? "1fr" : "1fr 1fr", gap: isMedium ? "16px" : "20px 32px" }}>
                <InfoCard
                  iconEl={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.40095 6.49999C6.15928 6.08048 6.02273 5.60872 6.00295 5.12499C5.98511 4.72542 6.04735 4.32631 6.186 3.95114C6.32466 3.57597 6.53694 3.23232 6.81035 2.94039C7.08377 2.64847 7.4128 2.41416 7.77809 2.25126C8.14338 2.08835 8.53756 2.00014 8.93745 1.9918C9.33733 1.98347 9.73485 2.05518 10.1066 2.20272C10.4784 2.35026 10.8169 2.57065 11.1022 2.85093C11.3876 3.13122 11.614 3.46572 11.7681 3.83479C11.9223 4.20385 12.0011 4.60002 12 4.99999M12 4.99999V18M17.599 6.49999C17.841 6.08057 17.9769 5.60881 17.997 5.12499C18.0148 4.72542 17.9526 4.32631 17.8139 3.95114C17.6752 3.57597 17.463 3.23232 17.1896 2.94039C16.9161 2.64847 16.5871 2.41416 16.2218 2.25126C15.8565 2.08835 15.4623 2.00014 15.0625 1.9918C14.6626 1.98347 14.2651 2.05518 13.8933 2.20272C13.5215 2.35026 13.183 2.57065 12.8977 2.85093C12.6123 3.13122 12.3859 3.46572 12.2318 3.83479C12.0776 4.20385 11.9988 4.60002 12 4.99999M6.00295 5.12499C5.41515 5.27613 4.86945 5.55904 4.40718 5.9523C3.94491 6.34556 3.57819 6.83886 3.3348 7.39484C3.0914 7.95081 2.97771 8.55488 3.00234 9.1613C3.02697 9.76772 3.18927 10.3606 3.47695 10.895M4.06195 10.5C3.85565 10.6145 3.65989 10.746 3.47695 10.895C2.97113 11.3059 2.57338 11.8342 2.31829 12.4339C2.0632 13.0336 1.95851 13.6866 2.01332 14.336C2.06812 14.9854 2.28077 15.6115 2.63276 16.16C2.98475 16.7085 3.46542 17.1626 4.03295 17.483M4.03295 17.483C3.96287 18.0252 4.00469 18.5761 4.15584 19.1015C4.30699 19.627 4.56425 20.1158 4.91174 20.5379C5.25923 20.9601 5.68956 21.3065 6.17617 21.5557C6.66278 21.805 7.19533 21.9519 7.74093 21.9873C8.28653 22.0227 8.83359 21.9459 9.34834 21.7616C9.86309 21.5773 10.3346 21.2894 10.7337 20.9157C11.1328 20.5421 11.4511 20.0906 11.6689 19.5891C11.8867 19.0876 11.9994 18.5467 12 18M4.03295 17.483C4.63322 17.8216 5.31078 18.0003 5.99995 18M12 18C12.0005 18.5467 12.1132 19.0876 12.331 19.5891C12.5488 20.0906 12.8671 20.5421 13.2662 20.9157C13.6653 21.2894 14.1368 21.5773 14.6516 21.7616C15.1663 21.9459 15.7134 22.0227 16.259 21.9873C16.8046 21.9519 17.3371 21.805 17.8237 21.5557C18.3103 21.3065 18.7407 20.9601 19.0882 20.5379C19.4357 20.1158 19.6929 19.627 19.8441 19.1015C19.9952 18.5761 20.037 18.0252 19.967 17.483M17.997 5.12499C18.5848 5.27613 19.1305 5.55904 19.5927 5.9523C20.055 6.34556 20.4217 6.83886 20.6651 7.39484C20.9085 7.95081 21.0222 8.55488 20.9976 9.1613C20.9729 9.76772 20.8106 10.3606 20.523 10.895M19.938 10.5C20.1442 10.6145 20.34 10.746 20.523 10.895C21.0288 11.3059 21.4265 11.8342 21.6816 12.4339C21.9367 13.0336 22.0414 13.6866 21.9866 14.336C21.9318 14.9854 21.7191 15.6115 21.3671 16.16C21.0152 16.7085 20.5345 17.1626 19.967 17.483M19.967 17.483C19.3667 17.8216 18.6891 18.0003 18 18M15 13C14.1604 12.7046 13.4273 12.167 12.8933 11.455C12.3593 10.743 12.0484 9.88866 12 8.99999C11.9515 9.88866 11.6406 10.743 11.1066 11.455C10.5726 12.167 9.83951 12.7046 8.99995 13" stroke="#2D5B8D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  iconBg="var(--blue-ultra-light)"
                  title="Hilft bei"
                  items={t.tags.map(tag => ({ bold: tag, detail: tagDetails[tag] ?? "Spezialisierter Schwerpunkt" }))}
                  maxVisible={999}
                />
                <InfoCard
                  iconEl={<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#B07000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 0 0-7 7c0 2.49 1.3 4.68 3.25 5.93V17a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-2.07A7 7 0 0 0 12 2z"/><path stroke="#B07000" strokeWidth="1.6" strokeLinecap="round" d="M9 21h6"/><path stroke="#B07000" strokeWidth="1.4" strokeLinecap="round" d="M9.5 18.5v2.5M14.5 18.5v2.5"/></svg>}
                  iconBg="var(--yellow-light)"
                  title="Arbeitsweise"
                  items={(t.arbeitsweise ?? ["Empathisch", "Strukturiert", "Lösungsorientiert"]).map(w => ({ bold: w, detail: arbeitswDetails[w] ?? "Individuell angepasst" }))}
                  maxVisible={999}
                />
                <InfoCard
                  iconEl={<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--green)" strokeWidth="1.6"/><path stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" d="M8 21h8M12 17v4"/></svg>}
                  iconBg="var(--green-light)"
                  title="Sitzungsformat"
                  items={[
                    ...(t.angebot === "online" || t.angebot === "beides" ? [{ bold: "Online per Video", detail: "flexibel von zuhause aus" }] : []),
                    ...(t.angebot === "vor-ort" || t.angebot === "beides" ? [{ bold: "Vor Ort in der Praxis", detail: "persönlich und vertraulich" }] : []),
                    { bold: "50 Min. Sitzung", detail: "Standarddauer pro Termin" },
                    { bold: "Erstgespräch kostenlos", detail: "15 Min. unverbindlich und ohne Verpflichtung" },
                  ]}
                  maxVisible={999}
                />
                <InfoCard
                  iconEl={<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#2D5B8D" strokeWidth="1.6"/><path stroke="#2D5B8D" strokeWidth="1.6" strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                  iconBg="var(--blue-ultra-light)"
                  title="Sprachen"
                  items={t.languages.map(l => ({ bold: l, detail: langDetails[l] ?? "Sitzungssprache verfügbar" }))}
                  maxVisible={999}
                />
              </div>
            </div>

            {/* Ansatz */}
            <div style={{ marginBottom: 64, background: "var(--red-bg)", borderRadius: 16, padding: isMedium ? "32px 28px" : "48px 40px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMedium ? "1fr" : "1fr 1fr", gap: isMedium ? 24 : 56, alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta-brand)", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>Mein Ansatz</p>
                  <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, color: "var(--black)", margin: "0 0 20px", lineHeight: 1.3 }}>So unterstütze ich Dich</h2>
                  {(t.approach ?? "").split("\n\n").map((para, i) => (<p key={i} style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "var(--grey-text)", margin: "0 0 16px", lineHeight: 1.75 }}>{para}</p>))}
                </div>
                {!isMedium && (
                  <div style={{ borderRadius: "0 16px 16px 0", overflow: "hidden", margin: "-48px -40px -48px 0", alignSelf: "stretch" }}>
                    <img src="/fachkraefte/praxis-session.png" alt="Praxis" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; (e.currentTarget.parentElement as HTMLElement).style.background = "var(--blue-ultra-light)"; }} />
                  </div>
                )}
              </div>
              {isMedium && (
                <div style={{ height: 200, overflow: "hidden", borderRadius: "0 0 16px 16px", margin: "20px -28px -32px" }}>
                  <img src="/fachkraefte/praxis-session.png" alt="Praxis" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>

            {/* Ablauf */}
            <div style={{ marginBottom: 64 }}>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 26, color: "var(--black)", margin: "0 0 6px" }}>Wie läuft die Zusammenarbeit ab?</h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "var(--grey-text)", margin: "0 0 40px" }}>Dein Weg zu mehr Klarheit und Wohlbefinden.</p>
              <div style={{ display: "grid", gridTemplateColumns: isMedium ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMedium ? "32px 24px" : "0 32px", position: "relative" }}>
                {[
                  {
                    bg: "var(--blue-ultra-light)",
                    title: "Erstgespräch",
                    desc: "Wir klären Dein Anliegen und Ziele in einem kostenlosen Erstgespräch.",
                    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path stroke="#2D5B8D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  },
                  {
                    bg: "var(--yellow-light)",
                    title: "Kennenlernen",
                    desc: "Du entscheidest, ob die Zusammenarbeit für Dich passt.",
                    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6.76383 16.2846C7.2144 16.2718 7.66588 16.2745 8.11645 16.2946C9.29794 16.3592 10.4266 16.8116 11.3269 17.5807C11.6008 17.8165 11.762 17.9967 12.0004 18.2643L12.0551 18.2006C13.2757 16.8079 14.8622 16.1944 16.7082 16.2818C17.0641 16.2991 17.3891 16.2782 17.7577 16.3201C18.8582 16.4475 19.8931 16.9081 20.726 17.639C21.8156 18.592 22.4819 19.9392 22.5783 21.3837C22.5965 21.6832 22.5865 21.9854 22.592 22.2858C22.5965 22.4942 22.5774 22.73 22.3198 22.7664C22.207 22.7837 22.0668 22.7755 21.9512 22.7755L21.3295 22.7746H3.68085L2.41016 22.7755C2.18351 22.7755 1.95413 22.7773 1.72748 22.7727C1.64828 22.77 1.57273 22.7445 1.50993 22.6981C1.43256 22.6298 1.40889 22.4906 1.40889 22.3923C1.40889 21.9462 1.39524 21.4911 1.45258 21.0478C1.59549 19.9346 2.07883 18.8924 2.83615 18.0632C3.89931 16.9172 5.21005 16.3437 6.76383 16.2846ZM2.06699 22.1028C2.7515 22.1219 3.49152 22.1092 4.18148 22.1092L7.92985 22.1083H12.0441C12.2162 22.1083 12.4255 22.1028 12.5957 22.1101C12.5967 21.7587 12.5985 21.4747 12.553 21.1225C12.4155 20.0812 11.9404 19.1127 11.2013 18.3663C10.4813 17.6408 9.54735 17.1648 8.53789 17.0073C8.01814 16.9299 7.29814 16.9372 6.76292 16.9563C5.41031 17.0091 4.2634 17.4988 3.33678 18.4992C2.65228 19.2392 2.22083 20.1767 2.10523 21.178C2.06699 21.502 2.06791 21.7778 2.06699 22.1028ZM12.3991 18.8296C12.512 19.0344 12.6149 19.201 12.7177 19.414C13.1574 20.3324 13.2557 21.1034 13.2557 22.1019C13.8127 22.1246 14.4636 22.1083 15.0279 22.1083H18.2447L21.9303 22.1092C21.9303 21.7942 21.9302 21.4811 21.892 21.168C21.7628 20.103 21.2803 19.1118 20.5212 18.3544C19.7384 17.5689 18.7071 17.081 17.6048 16.9736C17.3062 16.9445 16.9012 16.9499 16.5972 16.9508C16.4351 16.9499 16.2731 16.9518 16.1111 16.9563C15.9727 16.9618 15.8316 16.9654 15.6933 16.98C14.3571 17.1211 13.2183 17.7737 12.3991 18.8296ZM10.271 1.22281C10.6233 1.22008 10.9746 1.24739 11.3223 1.30473C12.2407 1.45765 13.1674 1.85543 13.8309 2.52263C13.9911 2.68375 14.1186 2.85214 14.2496 3.03601C14.3862 3.03055 14.5254 3.00961 14.662 2.9996C15.9654 2.91222 17.3781 3.33093 18.242 4.35313C18.6406 4.82918 18.8691 5.41174 18.8063 6.03707C18.7271 6.81259 18.2975 7.33689 17.7259 7.81386C17.9097 8.42827 18.0681 9.05998 18.242 9.67803C18.2811 9.84278 18.1946 10.0121 18.0381 10.0767C17.9762 10.1013 17.9088 10.1058 17.8451 10.0895C17.7322 10.0594 17.2644 9.75358 17.1378 9.67439C16.771 9.44319 16.4024 9.21381 16.0328 8.98625C15.9063 8.90888 15.5922 8.68951 15.4575 8.65583C15.3947 8.64036 15.1435 8.67768 15.0461 8.67768C14.7867 8.67586 14.5291 8.65947 14.2724 8.62852C13.2074 8.44374 12.471 8.13881 11.7028 7.35692C11.6291 7.36784 11.5481 7.38423 11.4771 7.3997C10.9409 7.5062 10.393 7.53806 9.84864 7.49345C9.71938 7.48526 9.54553 7.62908 9.43448 7.69462C9.32798 7.75651 9.21147 7.83024 9.10224 7.8976L7.70138 8.76051C7.57577 8.83788 7.23534 9.05816 7.12156 9.10367C7.06603 9.12551 7.00596 9.13007 6.94861 9.11732C6.86669 9.10003 6.79478 9.04996 6.75018 8.97988C6.70922 8.91707 6.69192 8.84243 6.69921 8.7687C6.71104 8.63307 6.80661 8.33361 6.84666 8.19161L7.13339 7.17305C7.17799 7.01467 7.25991 6.75161 7.28995 6.59596L7.29268 6.5823C5.92004 5.58832 5.5696 3.88799 6.7875 2.59818C7.69319 1.63879 8.98118 1.26286 10.271 1.22281ZM7.4984 8.0751C7.83427 7.86028 8.17106 7.64728 8.50967 7.43702C8.74816 7.28683 9.00029 7.12208 9.24151 6.97826C9.32525 6.92364 9.44631 6.83808 9.5428 6.82716C9.71665 6.80804 9.92874 6.84172 10.1081 6.849C10.3474 6.85538 10.5878 6.84718 10.8271 6.82261C12.0278 6.68971 13.6407 6.0571 13.9493 4.74999C14.0567 4.29123 13.8819 3.72415 13.6188 3.34731C12.8015 2.18038 11.275 1.84178 9.9433 1.90549C8.97572 1.94099 7.87159 2.34514 7.19711 3.05604C6.37334 3.91166 6.49531 5.0977 7.37096 5.86413C7.4456 5.92966 7.84702 6.22822 7.87888 6.27009C8.03999 6.48582 7.72049 7.20127 7.66133 7.45613C7.61127 7.6755 7.54846 7.88213 7.4984 8.0751ZM14.5546 3.67227C14.6274 3.99358 14.6738 4.25027 14.642 4.58069C14.5409 5.622 13.7417 6.43485 12.8597 6.9109C12.796 6.94549 12.4774 7.09386 12.4519 7.12026C12.4647 7.17396 12.7924 7.38969 12.8524 7.4261C13.5124 7.82205 14.2779 7.97042 15.0397 7.97042C15.1763 7.97133 15.5822 7.92036 15.6687 7.95677C15.9391 8.06873 16.2895 8.3245 16.5489 8.48106C16.8284 8.65583 17.1087 8.82878 17.3909 8.99808C17.3144 8.72683 17.2361 8.45649 17.156 8.18615C17.1032 8.00501 16.9722 7.66731 17.0541 7.49163C17.096 7.40152 17.3572 7.24223 17.4464 7.17032C18.5751 6.25189 18.2829 4.84011 17.0495 4.18564C16.3614 3.81791 15.5895 3.63859 14.8104 3.6659C14.7339 3.66863 14.6292 3.67682 14.5546 3.67227ZM7.27721 10.196C8.22022 10.1614 9.10952 10.6374 9.60287 11.4421C10.0962 12.2467 10.1172 13.2553 9.6584 14.0809C9.19963 14.9055 8.33218 15.4189 7.38826 15.4244C5.95918 15.4326 4.78952 14.2929 4.75857 12.8648C4.72854 11.4366 5.84904 10.2487 7.27721 10.196ZM7.34366 14.7544C8.41956 14.7481 9.28611 13.8706 9.28065 12.7947C9.27427 11.7188 8.3968 10.8513 7.3209 10.8577C6.24409 10.8641 5.37754 11.7415 5.38391 12.8174C5.38937 13.8934 6.26684 14.7608 7.34366 14.7544ZM16.6163 10.195C17.5593 10.1595 18.4486 10.6365 18.9419 11.4421C19.4344 12.2476 19.4544 13.2571 18.9929 14.0809C18.5323 14.9055 17.6621 15.4162 16.7182 15.418C15.2928 15.4207 14.1295 14.2811 14.1013 12.8566C14.074 11.4321 15.1917 10.2478 16.6163 10.195ZM16.6663 14.7581C17.7431 14.7572 18.6152 13.8833 18.6142 12.8065C18.6124 11.7297 17.7395 10.8577 16.6627 10.8586C15.5859 10.8595 14.713 11.7334 14.7148 12.8102C14.7157 13.887 15.5895 14.759 16.6663 14.7581Z" fill="#B07000"/></svg>
                  },
                  {
                    bg: "var(--green-light)",
                    title: "Individuelle Begleitung",
                    desc: "Gemeinsam entwickeln wir einen Plan, der zu Dir und Deinem Leben passt.",
                    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M14.5493 1.44235H15.386C15.4503 1.46875 15.7336 1.48898 15.8286 1.50394C17.2609 1.72829 18.5481 2.50516 19.4129 3.66914C20.1194 4.63604 20.5179 5.76483 20.5127 6.96929C20.5118 7.12149 20.4836 7.28514 20.4643 7.43646C20.4388 7.64674 20.4097 7.85613 20.3789 8.06552C20.598 8.33826 20.8171 8.65675 21.0256 8.94357C21.1972 9.17936 21.4382 9.48289 21.5702 9.73891C21.6459 9.9052 21.63 10.0996 21.5649 10.2624C21.4585 10.5307 21.1057 10.7181 20.8496 10.8211C20.9227 10.9759 21.1532 11.5082 21.125 11.6692C21.0793 11.9296 20.6622 11.9921 20.5039 12.0977L20.5012 12.1153C20.5611 12.1927 20.7669 12.322 20.8549 12.4074C20.9235 12.4733 20.9781 12.5587 20.9772 12.6563C20.9763 12.8156 20.7001 13.2001 20.6235 13.4015C20.525 13.6611 20.496 13.9241 20.3209 14.1503C20.2056 14.2989 20.0437 14.4212 19.8669 14.4855C19.6038 14.5822 19.3029 14.5805 19.0267 14.5972C18.3774 14.6377 17.7166 14.6561 17.0885 14.8365C16.9943 14.8638 16.894 14.8867 16.8087 14.935C16.5606 15.074 16.1717 15.8624 15.9157 16.114C15.8611 16.1685 15.7987 16.2108 15.7212 16.2222C15.5541 16.2468 15.3623 16.2292 15.1934 16.2292L14.1499 16.2284L10.4583 16.2292C10.3668 16.3207 10.2612 16.4377 10.1327 16.4747C10.0588 16.4958 9.9902 16.4844 9.92422 16.4457C9.77289 16.3586 9.65412 16.2143 9.5283 16.0964C9.36466 15.9442 9.19838 15.7928 9.03209 15.6433C7.9209 14.6465 5.90087 12.9396 5.52255 11.4959C5.35803 10.8686 5.54807 10.1551 5.87007 9.6087C6.24575 8.9858 6.85106 8.53534 7.55578 8.3541C8.27546 8.16406 9.04177 8.27052 9.68227 8.64971C9.57757 8.3629 9.51247 8.05584 9.47112 7.75231C9.32419 6.7159 9.47551 5.65838 9.9075 4.70467C10.2497 3.9454 10.7574 3.27147 11.3917 2.73127C11.4419 2.68992 11.5017 2.6556 11.5519 2.61513C12.0789 2.19019 12.6833 1.87258 13.3317 1.68078C13.5552 1.61479 13.7584 1.5664 13.9863 1.52065C14.1147 1.49426 14.4535 1.48458 14.5493 1.44235ZM13.5305 15.5571L14.7816 15.5562C14.9919 15.5562 15.2849 15.5474 15.4881 15.5632L15.4951 15.5544C15.716 15.2676 15.9025 14.9245 16.1304 14.6377C16.4568 14.2189 17.1791 14.0887 17.6797 14.0244C18.2903 13.9461 18.9255 13.9497 19.5378 13.8802C19.8467 13.8441 19.8704 13.5186 19.947 13.281C20.0112 13.0822 20.0921 12.9176 20.1959 12.7399C19.9909 12.5657 19.756 12.4135 19.5757 12.2147C19.4842 12.1144 19.4807 11.9059 19.581 11.8117C19.7868 11.6173 20.122 11.5469 20.371 11.422C19.8924 10.28 20.0578 10.5439 20.964 10.0029C20.7784 9.77762 20.5338 9.41514 20.3552 9.16968L19.983 8.65939C19.8273 8.44472 19.6698 8.29603 19.7032 8.02329C19.7235 7.69688 19.8255 7.31329 19.8299 6.99216C19.8467 5.89856 19.4543 4.80849 18.7821 3.95244C17.8345 2.74622 16.243 2.00279 14.7024 2.11804C13.4197 2.18755 12.2161 2.7603 11.353 3.71137C10.4847 4.67388 10.0351 5.94255 10.1037 7.23675C10.1195 7.55964 10.1679 7.87988 10.2489 8.19309C10.2911 8.35146 10.358 8.53534 10.3896 8.69018C10.8902 8.31891 11.6873 8.20189 12.2979 8.29515C13.0282 8.41217 13.6827 8.81248 14.12 9.40899C14.5054 9.93951 14.7455 10.6715 14.6382 11.3305C14.4332 12.5798 12.9068 13.991 11.9979 14.8242C11.7269 15.0732 11.4586 15.3362 11.1735 15.5694C11.3187 15.5456 11.792 15.5562 11.9601 15.5562L13.5305 15.5571ZM10.0667 15.6829C10.1732 15.5553 10.2823 15.4717 10.4028 15.36L11.0856 14.7353C11.1929 14.6385 11.3653 14.4925 11.4604 14.394C11.58 14.2778 11.7093 14.1731 11.8299 14.0596C12.5108 13.4156 13.9572 12.029 13.9792 11.0665C13.9924 10.5263 13.7619 9.97822 13.3898 9.59022C12.9974 9.17848 12.4554 8.94269 11.8862 8.93741C11.5008 8.93301 11.1207 9.03155 10.7873 9.22511C10.7072 9.27085 10.6316 9.32276 10.5586 9.37995C10.4442 9.47145 10.2066 9.72571 10.0667 9.71868C9.8943 9.70988 9.64708 9.43978 9.49663 9.32628C9.16934 9.07906 8.5658 8.88286 8.15581 8.94181C7.57866 8.98404 7.05781 9.21719 6.67422 9.65709C6.32581 10.0574 6.11026 10.6029 6.14545 11.1378C6.21232 12.1443 7.86019 13.654 8.60363 14.342C8.87021 14.5884 9.13591 14.8418 9.41129 15.0793C9.63212 15.2702 9.86439 15.4717 10.0667 15.6829Z" fill="#1A1A1A"/><path d="M4.90678 17.1249C6.10947 16.6524 7.66409 16.2143 8.96356 16.5354C9.13336 16.5776 9.37531 16.6841 9.54247 16.7536L10.2745 17.0562C10.8367 17.2885 11.3997 17.5208 11.9619 17.7557C12.3262 17.9079 12.5655 18.1727 12.657 18.5589C12.8409 18.5167 13.0635 18.4868 13.2517 18.456L14.2292 18.2985L14.9805 18.1762C15.1503 18.1481 15.402 18.1014 15.5674 18.1058C15.8049 18.1111 16.0363 18.1797 16.2378 18.3047C16.5369 18.4894 16.7498 18.7859 16.8299 19.1273C16.9108 19.4757 16.8466 19.8408 16.6522 20.1408C16.4569 20.4461 16.1463 20.6538 15.7935 20.7215C15.4856 20.7813 15.1679 20.8271 14.8583 20.8772L12.9649 21.1843L11.7429 21.3822C11.5695 21.4104 11.0742 21.5019 10.9282 21.4869C10.2525 21.4183 9.57679 21.2072 8.9882 20.864C8.76121 20.7321 8.41368 20.5121 8.17174 20.447C7.82509 20.3537 7.26642 20.5059 6.95145 20.674C7.00864 20.7567 7.05438 20.8429 7.10717 20.9274C7.23826 21.135 7.29017 21.3699 7.03679 21.516C6.44028 21.8608 5.84465 22.2163 5.24023 22.548C5.22439 22.5568 5.24023 22.5471 5.22439 22.5577H5.03875C4.9798 22.5233 4.91294 22.4838 4.87511 22.4257C4.7405 22.2189 4.61733 21.9928 4.49415 21.7781L3.86509 20.6907L2.85332 18.9373C2.71079 18.6892 2.4926 18.3504 2.38614 18.0838C2.36327 18.0267 2.40286 17.9061 2.44069 17.8507C2.46796 17.812 2.50139 17.7786 2.54011 17.7513C2.78469 17.5859 3.08734 17.4381 3.34601 17.2841C3.65834 17.0967 3.98211 16.9128 4.3006 16.736C4.61996 16.5583 4.78801 16.9084 4.90678 17.1249ZM5.24199 17.7047L6.19306 19.3508C6.29511 19.5285 6.54234 19.927 6.61536 20.0951C7.13181 19.8311 7.87348 19.6402 8.42952 19.832C8.80784 19.9631 9.10961 20.1716 9.45801 20.3634C9.77914 20.5376 10.124 20.6652 10.4821 20.7409C10.5912 20.7646 10.9361 20.8288 11.0355 20.8165C11.2625 20.7892 11.5185 20.7426 11.7464 20.7057L13.0212 20.498L14.7289 20.2227C14.9867 20.1813 15.6466 20.1021 15.8392 20.0045C15.9941 19.927 16.112 19.7898 16.1639 19.6244C16.2167 19.4572 16.2008 19.276 16.119 19.1211C16.0354 18.9654 15.892 18.844 15.7222 18.7956C15.5524 18.7463 15.3747 18.7877 15.204 18.8141C14.5802 18.9293 13.9362 19.012 13.3116 19.1229C13.1593 19.1502 12.7124 19.2065 12.5919 19.2443C12.4203 19.5505 12.2391 19.7528 11.8854 19.8549C11.705 19.9068 11.515 19.9121 11.332 19.8699C11.1824 19.8355 10.8991 19.7106 10.7469 19.6473L9.79146 19.2513L8.94421 18.9003C8.79112 18.837 8.63451 18.7771 8.48759 18.7032C8.40049 18.6592 8.3345 18.5589 8.32042 18.4639C8.29755 18.3012 8.41984 18.1252 8.58261 18.0944C8.7137 18.0698 8.84039 18.1375 8.95916 18.185C9.12105 18.2528 9.28117 18.3205 9.44305 18.3865L10.878 18.9812C11.076 19.0639 11.3118 19.1757 11.515 19.225C11.7957 19.2918 12.0605 18.9883 12.0077 18.7147C11.9584 18.4578 11.7605 18.39 11.5458 18.302C11.4587 18.266 11.3725 18.2308 11.2862 18.1947L10.4232 17.8384L9.4061 17.417C9.23278 17.3448 8.96708 17.2252 8.79464 17.1803C8.50694 17.1046 8.10399 17.0782 7.80486 17.0976C7.12389 17.1433 6.58105 17.2674 5.92823 17.4697C5.72764 17.5322 5.42587 17.6545 5.24199 17.7047ZM3.16829 18.156C3.28882 18.3381 3.42607 18.5889 3.53693 18.7815L4.14487 19.8364L4.88215 21.1121C5.00092 21.3189 5.15489 21.5723 5.2631 21.7817C5.38012 21.6954 5.57807 21.5872 5.70828 21.5124L6.43412 21.0945C6.24848 20.813 6.01885 20.3881 5.84641 20.0889L4.69739 18.0997C4.64812 18.0152 4.38242 17.526 4.33755 17.4856C3.96275 17.6976 3.5422 17.958 3.16829 18.156Z" fill="#1A1A1A"/></svg>
                  },
                  {
                    bg: "var(--blue-ultra-light)",
                    title: "Fortschritt",
                    desc: "Regelmäßige Sitzungen für nachhaltige Veränderungen und neue Perspektiven.",
                    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 16V21M16 14V21M20 10V21M22 3L13.354 11.646C13.3076 11.6926 13.2524 11.7295 13.1916 11.7547C13.1309 11.7799 13.0658 11.7929 13 11.7929C12.9342 11.7929 12.8691 11.7799 12.8084 11.7547C12.7476 11.7295 12.6924 11.6926 12.646 11.646L9.354 8.354C9.26024 8.26026 9.13308 8.20761 9.0005 8.20761C8.86792 8.20761 8.74076 8.26026 8.647 8.354L2 15M4 18V21M8 14V21" stroke="#2D5B8D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  },
                ].map((step, i, arr) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", gap: 0, position: "relative" }}>
                    {/* dashed connector line: only in 4-col layout */}
                    {!isMedium && i < arr.length - 1 && (
                      <div style={{ position: "absolute", top: 32, left: 64, right: -32, height: 0, borderTop: "2px dashed var(--grey-border)", zIndex: 0 }} />
                    )}
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1, marginBottom: 20 }}>
                      {step.icon}
                    </div>
                    <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 8px", paddingRight: 0 }}>{step.title}</h3>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.6, paddingRight: 0 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifikation + Vertrauen */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: isMedium ? "1fr" : "1fr 1fr", gap: isMedium ? 40 : 56 }}>
                <div>
                  <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 28px" }}>Qualifikation &amp; Erfahrung</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {(t.qualifikationen ?? []).map((q: { year: string; title: string; institution: string }, i: number, arr) => (
                      <div key={i} style={{ display: "flex", gap: 16 }}>
                        {/* timeline spine: split line around centered dot */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
                          <div style={{ width: 2, flex: 1, background: i > 0 ? "var(--cta)" : "transparent", minHeight: 16, opacity: 0.35 }} />
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "white", border: "2.5px solid var(--cta)", flexShrink: 0, zIndex: 1 }} />
                          <div style={{ width: 2, flex: 1, background: i < arr.length - 1 ? "var(--cta)" : "transparent", minHeight: 16, opacity: 0.35 }} />
                        </div>
                        {/* content card */}
                        <div style={{ background: i % 2 === 0 ? "var(--blue-ultra-light)" : "white", borderRadius: 12, padding: "8px 14px", marginBottom: 10, flex: 1 }}>
                          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "var(--cta)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{q.year}</span>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--black)", margin: "3px 0 2px", lineHeight: 1.4 }}>{q.title}</p>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", margin: 0 }}>{q.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 22, color: "var(--black)", margin: "0 0 28px" }}>Vertrauen &amp; Sicherheit</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { bg: "var(--blue-ultra-light)", color: "#2D5B8D", title: "Verifiziertes Profil", desc: "Wir überprüfen alle Qualifikationen und Berufserfahrung.",
                        icon: <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.23764 8.0564C7.61163 7.58558 7.95119 7.07532 8.32256 6.60113C8.35874 6.55544 8.40059 6.52707 8.46074 6.52707C8.63205 6.52755 8.82732 6.56362 8.99296 6.59873C9.9153 6.79735 10.737 7.30761 11.3128 8.04102C11.4104 8.16413 11.4998 8.2935 11.5808 8.42768C11.7399 8.6917 11.7125 8.74076 11.9596 8.95092C12.2926 8.99709 12.6422 8.85906 12.9203 9.13367C13.1112 9.32219 13.113 9.47849 13.1126 9.72665C13.1112 9.84592 13.1112 9.96567 13.1134 10.0849C13.1915 10.1672 13.2904 10.2619 13.3719 10.3398C13.5258 10.4827 13.6361 10.6039 13.6618 10.8174C13.7136 11.2493 13.3444 11.4056 13.1152 11.6922C13.0873 12.0582 13.2106 12.4477 12.8515 12.6968C12.7713 12.7526 12.7028 12.7805 12.61 12.8103C12.6313 12.8517 12.6653 12.9421 12.6849 12.9892L12.8358 13.3547L12.9901 13.7274C13.0297 13.8227 13.1034 13.9617 13.0938 14.0631C13.0881 14.1252 13.0001 14.2026 12.9338 14.192C12.7438 14.1612 12.5529 14.103 12.3646 14.0564C12.307 14.1574 12.0917 14.5335 12.0071 14.5724C11.9688 14.5902 11.9248 14.5902 11.8855 14.5753C11.8485 14.5614 11.821 14.5373 11.8001 14.5051C11.7495 14.4262 11.719 14.3219 11.6833 14.2353C11.5887 14.0045 11.5011 13.7669 11.396 13.5399C11.3734 13.4778 11.3411 13.4028 11.3158 13.3408C11.1898 13.3619 11.0957 13.3634 10.971 13.3398L10.6533 14.1107C10.6001 14.2401 10.5491 14.3733 10.4872 14.4988C10.4401 14.5946 10.2906 14.6196 10.2217 14.5301C10.1119 14.3858 10.0208 14.2132 9.92054 14.0607C9.78061 14.0795 9.40924 14.2194 9.30375 14.1862C9.25929 14.1718 9.21962 14.1391 9.20045 14.0968C9.1865 14.0665 9.18345 14.0367 9.19086 14.0045C9.21788 13.8833 9.2837 13.7577 9.33165 13.6428C9.44629 13.3648 9.57095 13.0873 9.67469 12.8055C9.38657 12.7218 9.23968 12.5641 9.17822 12.2779L7.51181 12.276H4.50635L3.20914 12.2765C2.99207 12.2765 2.77282 12.2775 2.55574 12.2755C2.51869 12.2755 2.42541 12.2645 2.39752 12.2419C2.36047 12.2121 2.33998 12.1697 2.3378 12.1226C2.33257 12.0019 2.33475 11.8773 2.33518 11.7566L2.33606 11.0891C2.33562 10.7727 2.32429 10.3769 2.35175 10.0657C2.42672 9.27074 2.74797 8.51713 3.27322 7.90684C3.94972 7.11524 4.91914 6.61893 5.96876 6.52707C5.98925 6.52515 6.02281 6.52563 6.04286 6.52947C6.07468 6.53476 6.10389 6.54967 6.12655 6.57228C6.17101 6.61652 6.23291 6.70501 6.2717 6.75743L6.47744 7.03444L7.23764 8.0564ZM7.23546 8.50703C7.20451 8.49789 7.15002 8.48443 7.12997 8.46134C7.02841 8.34544 6.92336 8.19395 6.83139 8.06939L6.1575 7.16237C6.09125 7.0734 6.01453 6.96567 5.94348 6.87911C5.93345 6.8666 5.92125 6.86804 5.90817 6.86852C4.97319 6.95846 4.094 7.449 3.50119 8.15836C3.04089 8.70661 2.75756 9.37606 2.68695 10.0825C2.66385 10.3153 2.673 10.5452 2.67082 10.7779C2.66733 11.1646 2.67605 11.5561 2.67082 11.9418C2.96199 11.9442 3.2536 11.9447 3.54521 11.9437C3.67642 11.9437 3.82854 11.9403 3.95757 11.9447L3.95844 10.6293V10.2619C3.958 10.1686 3.94057 9.98971 4.00639 9.92142C4.03646 9.89113 4.07744 9.87381 4.12015 9.87333C4.33243 9.86997 4.29451 10.1152 4.29407 10.2533L4.2932 10.6284L4.29364 11.9418L8.05275 11.9437C8.42108 11.9437 8.80597 11.9379 9.17298 11.9447C9.17429 11.8408 9.19957 11.7153 9.12329 11.6364C8.89489 11.3998 8.6181 11.2406 8.62115 10.8799C8.6242 10.4764 8.96419 10.3504 9.16993 10.0811C9.18868 9.73146 9.0954 9.3674 9.38526 9.11299C9.65377 8.87734 9.99638 8.98122 10.325 8.95284C10.4135 8.8682 10.5007 8.78308 10.5874 8.69651C10.7845 8.5027 10.8886 8.41998 11.1781 8.41421C11.1096 8.32765 11.046 8.23819 10.975 8.15307C10.4074 7.47304 9.55526 6.98924 8.66212 6.87718C8.62289 6.87237 8.58323 6.86804 8.54356 6.8642C8.13426 7.38071 7.76027 7.94483 7.34661 8.45942C7.32481 8.48635 7.26902 8.49933 7.23546 8.50703ZM11.2029 13.0224C11.4326 12.9604 11.6297 12.5901 11.8498 12.4972C11.8816 12.4838 11.9832 12.4867 12.0224 12.4871L12.2935 12.4891C12.4674 12.491 12.6509 12.5025 12.7455 12.3265C12.8401 12.1515 12.7168 11.6874 12.8105 11.5291C12.8397 11.4796 12.8855 11.4392 12.9269 11.3993C13.0258 11.3036 13.249 11.1156 13.3022 11.0069C13.334 10.94 13.3379 10.864 13.3139 10.7943C13.2512 10.6188 12.868 10.3783 12.7883 10.1999C12.7752 10.1715 12.7769 10.0671 12.7769 10.0316L12.7795 9.7531C12.7804 9.59536 12.79 9.38568 12.6091 9.31787C12.4565 9.26112 12.2076 9.29382 12.0416 9.28901C11.8384 9.28372 11.8393 9.29911 11.6889 9.16012C11.5512 9.03268 11.42 8.85329 11.2526 8.76865C11.2029 8.74605 11.1266 8.75038 11.0748 8.7547C10.8451 8.81578 10.6241 9.21543 10.4353 9.27699C10.2836 9.32604 9.88915 9.24669 9.70608 9.30729C9.642 9.32845 9.58752 9.37125 9.55264 9.42848C9.44803 9.60113 9.56049 10.0455 9.47985 10.2369C9.4659 10.2691 9.39354 10.3369 9.36434 10.3653L9.17516 10.5466C9.06401 10.6534 8.90884 10.7856 8.96594 10.9588C9.03873 11.1805 9.40139 11.3685 9.49816 11.5796C9.51211 11.6095 9.50993 11.7114 9.50949 11.7489L9.50731 12.0216C9.50644 12.1115 9.49947 12.2274 9.53652 12.3145C9.67687 12.6415 10.2492 12.3967 10.4815 12.5179C10.6916 12.6276 10.907 13.0825 11.2029 13.0224ZM10.3307 12.8248C10.2566 12.8204 10.0966 12.8257 10.0408 12.8161C9.99507 12.8993 9.93143 13.0662 9.89307 13.16L9.63416 13.7895C9.99725 13.6904 10.0709 13.6048 10.2662 13.9804C10.2815 14.0049 10.2967 14.0295 10.3115 14.054C10.3651 13.9487 10.4406 13.7544 10.4859 13.6404C10.5443 13.4942 10.6293 13.3105 10.679 13.1652C10.6132 13.095 10.5382 13.0243 10.4693 12.9565C10.4344 12.9224 10.3678 12.8531 10.3307 12.8248ZM11.9592 12.8238C11.8777 12.8926 11.6759 13.0873 11.6052 13.1691C11.7338 13.4605 11.8485 13.7664 11.9753 14.0593C12.0189 13.9814 12.086 13.8717 12.1362 13.7957C12.1636 13.7544 12.1902 13.7193 12.243 13.7101C12.3445 13.6919 12.5498 13.7606 12.6536 13.7885C12.6082 13.6871 12.5603 13.5745 12.5206 13.4706C12.4391 13.2561 12.3314 13.0388 12.2573 12.8228C12.1771 12.8204 12.0381 12.8166 11.9592 12.8238Z" fill="#2D5B8D"/><path d="M11.053 9.43951C11.869 9.39094 12.5708 9.99979 12.6205 10.7996C12.6702 11.5989 12.0482 12.2866 11.2322 12.3352C10.4162 12.3837 9.71442 11.7744 9.66473 10.9751C9.61547 10.1753 10.2366 9.48761 11.053 9.43951ZM11.1908 12.0076C11.8228 11.9812 12.3136 11.4575 12.2857 10.838C12.2583 10.2186 11.7226 9.73865 11.0905 9.76702C10.4598 9.7954 9.97159 10.3186 9.99949 10.9361C10.0269 11.5541 10.56 12.0331 11.1908 12.0076Z" fill="#2D5B8D"/><path d="M11.6975 10.3369C11.8078 10.3244 11.8985 10.3716 11.9072 10.4899C11.912 10.5548 11.8662 10.6063 11.8222 10.6495C11.6553 10.8135 11.487 10.9775 11.3201 11.1415C11.2656 11.1949 11.0869 11.3772 11.0315 11.4147C11.0045 11.433 10.9727 11.4426 10.9404 11.4421C10.8388 11.4411 10.6501 11.2238 10.5725 11.1473C10.4775 11.0569 10.3005 10.9309 10.4112 10.789C10.44 10.7525 10.4831 10.7294 10.5302 10.7255C10.5638 10.7231 10.5969 10.7308 10.6261 10.7477C10.6941 10.7861 10.8676 10.9751 10.9478 11.0434C11.0376 10.9482 11.1679 10.8169 11.2625 10.7299C11.3519 10.6476 11.5995 10.3721 11.6975 10.3369Z" fill="#2D5B8D"/><path d="M7.11091 1.41728C8.42076 1.34851 9.53969 2.33199 9.61118 3.61558C9.68266 4.89868 8.67924 5.99614 7.3694 6.06684C6.05868 6.13754 4.93713 5.15357 4.86565 3.86902C4.79416 2.58448 5.79976 1.48653 7.11091 1.41728ZM7.28614 5.74077C8.41074 5.7148 9.30213 4.80201 9.27816 3.70022C9.25418 2.59794 8.32443 1.72266 7.19984 1.74382C6.07132 1.76498 5.17469 2.67922 5.19867 3.78438C5.22264 4.89002 6.15762 5.76626 7.28614 5.74077Z" fill="#2D5B8D"/></svg> },
                      { bg: "#FFF7E0", color: "#B07000", title: "Deine Daten sind sicher", desc: "Datenschutz nach höchsten Standards.",
                        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 10V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V10M5 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V12C3 10.8954 3.89543 10 5 10Z" stroke="#B07000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                      { bg: "var(--green-light)", color: "var(--green)", title: "Kassenrückerstattung möglich", desc: "Wir unterstützen Dich bei der Abwicklung.",
                        icon: <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.50953 1.15145C2.72163 1.14321 2.97594 1.14991 3.19216 1.15042H4.49308H8.47254H11.7555L12.8129 1.14991C13.0049 1.14991 13.1985 1.14785 13.3905 1.15248C13.5429 1.1566 13.6628 1.21323 13.7648 1.32906C13.8265 1.40062 13.8641 1.48968 13.8729 1.58337C13.8832 1.69715 13.8785 1.85313 13.8785 1.96948V2.61968L13.878 4.6784V7.02746L13.8785 7.75592C13.8785 7.8213 13.8775 7.89337 13.8791 7.95875C13.8847 8.21307 13.8821 8.36648 13.6783 8.541C13.7112 8.57189 13.7838 8.62131 13.8224 8.65014C13.8924 8.7011 13.9604 8.75516 14.0253 8.8123C14.4119 9.1495 14.7182 9.56804 14.9236 10.0375C15.2865 10.8762 15.302 11.8244 14.9658 12.6744C14.6224 13.5351 13.9491 14.2224 13.095 14.5833C13.0209 14.6157 12.9297 14.6497 12.853 14.6754C11.983 14.9668 11.0322 14.8968 10.2141 14.4803C9.40023 14.0695 8.78194 13.3529 8.4952 12.4875C8.23264 11.6937 8.26868 10.7032 8.64603 9.95209H3.55973H2.01789L1.53551 9.9526C1.3162 9.95312 1.11182 9.97783 0.942453 9.81103C0.824047 9.69468 0.793674 9.57628 0.793674 9.41411C0.792644 8.93174 0.793674 8.44936 0.793674 7.96699V5.08664V3.60863L0.793159 3.18237C0.792644 3.08816 0.790585 2.99395 0.799851 2.90025C0.818899 2.69948 0.969223 2.52444 1.16742 2.48068C1.29304 2.4534 1.43255 2.46215 1.56177 2.46215L2.04002 2.46318V1.90719C2.04002 1.80217 2.03333 1.63485 2.05392 1.53756C2.0704 1.45828 2.10592 1.38466 2.15688 1.32237C2.24903 1.21014 2.36898 1.16432 2.50953 1.15145ZM13.4693 4.76488C13.1521 4.77261 12.8139 4.7654 12.4947 4.76591L10.6991 4.7654L10.1457 4.76591C9.9418 4.76591 9.72661 4.77312 9.5279 4.72576C9.31734 4.67428 9.1248 4.56668 8.97088 4.4143C8.74642 4.19036 8.62184 3.88508 8.62596 3.56847C8.62905 3.25135 8.75929 2.94916 8.98735 2.72882C9.34514 2.38133 9.69315 2.39986 10.1503 2.39986H10.9096H12.5575C12.8422 2.39986 13.1377 2.39574 13.4214 2.40089L13.4718 2.40192L13.4713 2.39368C13.4631 2.2449 13.4966 1.65493 13.4415 1.58183C13.3411 1.55506 12.7295 1.56536 12.5967 1.56536H10.7284L2.61661 1.56639C2.56049 1.5669 2.51622 1.55969 2.47195 1.59161C2.44981 1.62404 2.44827 1.68737 2.44827 1.72752C2.44878 2.2135 2.44929 2.70051 2.44929 3.18649L2.44878 6.21458V7.54073C2.44878 7.62413 2.43694 8.16519 2.47143 8.20226C2.53578 8.23932 2.86166 8.22594 2.95175 8.22594H3.76978H8.87358H9.97269C10.0412 8.22594 10.4185 8.23211 10.4582 8.21667C11.251 7.90418 12.14 7.87432 12.9416 8.17394C12.9802 8.18836 13.026 8.20637 13.0672 8.21513C13.1475 8.22748 13.3967 8.24807 13.4507 8.19505C13.4801 8.08951 13.4708 7.83932 13.4708 7.71679V7.10572C13.4708 6.33041 13.479 5.53916 13.4693 4.76488ZM11.8692 13.4888C13.0193 13.4312 13.9048 12.4504 13.8456 11.3004C13.7859 10.1503 12.8046 9.26585 11.6546 9.32659C10.506 9.38734 9.62417 10.3665 9.68337 11.515C9.74257 12.6636 10.7207 13.547 11.8692 13.4888ZM11.531 8.38862C10.7315 8.44524 9.98762 8.81951 9.46561 9.42801C9.10009 9.85221 8.85968 10.3701 8.77113 10.923C8.76187 10.9812 8.73098 11.1675 8.74333 11.2144C8.76084 11.2252 8.75157 11.2216 8.77268 11.2226L9.2916 11.2252C9.35235 10.5426 9.65506 9.91502 10.1843 9.4728C10.573 9.14487 11.0543 8.94667 11.5609 8.90497C11.5598 8.83753 11.5676 8.41796 11.5511 8.38913C11.5459 8.38862 11.5356 8.3881 11.531 8.38862ZM11.5619 14.4361C11.5557 14.2698 11.5588 14.0819 11.5598 13.9146C11.4111 13.894 11.2757 13.8744 11.13 13.8353C10.5956 13.6906 10.1251 13.3709 9.79354 12.9277C9.49495 12.5333 9.35441 12.1271 9.30035 11.6401C9.13098 11.6355 8.90344 11.6468 8.74848 11.6365C8.73716 11.6607 8.74642 11.7174 8.75002 11.7472C8.77782 11.9912 8.83497 12.2311 8.92043 12.4618C9.20203 13.2185 9.77346 13.8327 10.5081 14.1684C10.8798 14.3382 11.1629 14.3918 11.5619 14.4361ZM14.2317 11.6381C14.1715 12.3089 13.8446 12.9277 13.3246 13.356C12.9575 13.6572 12.4479 13.8842 11.9712 13.9135C11.9691 14.0721 11.9758 14.2785 11.9681 14.4319C12.0829 14.4247 12.1977 14.4108 12.3115 14.3913C13.6886 14.1092 14.6657 13.0425 14.7897 11.636C14.6621 11.636 14.5282 11.6345 14.4006 11.6371C14.345 11.6386 14.2868 11.6412 14.2317 11.6381ZM13.4713 4.35098C13.4646 4.19036 13.4677 3.95149 13.4724 3.78881C12.6605 3.77697 11.8265 3.78675 11.0126 3.78675L10.2481 3.78727C10.124 3.78727 10.0056 3.78984 9.87797 3.78315C9.67874 3.77337 9.60666 3.57156 9.7364 3.42896C9.77243 3.38983 9.83627 3.38057 9.88672 3.37645C10.0695 3.37079 10.2589 3.37336 10.4422 3.37387H11.4703H12.7846C12.99 3.37387 13.269 3.36564 13.4708 3.37696C13.4615 3.22407 13.4708 2.97747 13.4698 2.81531C13.1969 2.822 12.8978 2.81531 12.6224 2.81531H10.7923C10.4751 2.81531 10.141 2.80965 9.82546 2.81582C9.57732 2.82869 9.40692 2.87142 9.23034 3.06602C9.09443 3.2184 9.02442 3.41815 9.03626 3.62201C9.04707 3.82742 9.14025 4.02047 9.29469 4.15638C9.54025 4.37363 9.78324 4.34944 10.0875 4.34944L10.6713 4.34892H12.5277H13.1285C13.2345 4.34892 13.3673 4.34532 13.4713 4.35098ZM14.2338 11.2195C14.4222 11.2273 14.6049 11.2211 14.7908 11.2262C14.7779 11.0677 14.7666 10.9467 14.7341 10.7897C14.5972 10.1354 14.2487 9.54436 13.7416 9.10883C13.355 8.77472 12.8896 8.5446 12.3892 8.44061C12.3156 8.42568 12.2461 8.41384 12.172 8.40509C12.1097 8.39737 12.0278 8.39531 11.9691 8.38141C11.9707 8.53739 11.9753 8.74692 11.9676 8.90033C12.1205 8.92247 12.2517 8.941 12.4005 8.98116C12.9359 9.12685 13.407 9.44706 13.7385 9.89185C14.0392 10.2944 14.1879 10.7233 14.2338 11.2195ZM9.17011 9.14693C9.33124 8.95439 9.51657 8.78347 9.72147 8.63881H4.72989H3.21224L2.76487 8.63933C2.54505 8.63984 2.35045 8.65992 2.18314 8.49209C2.11518 8.42362 2.06473 8.33559 2.04877 8.23726C2.03539 8.089 2.04002 7.91293 2.04002 7.76261L2.04054 6.85912V4.20426V3.32703C2.04054 3.19112 2.0462 3.01351 2.03951 2.88017C1.81969 2.88275 1.58957 2.87348 1.37077 2.8812C1.31466 2.88172 1.26215 2.87348 1.22148 2.909C1.19059 2.9646 1.2014 3.40425 1.2014 3.5L1.20192 4.45188L1.2014 8.22182V9.00947C1.2014 9.16495 1.19368 9.34255 1.21376 9.49648C1.21993 9.54178 1.33885 9.54281 1.3718 9.54178C1.89742 9.54333 2.42355 9.5423 2.94969 9.5423H5.95616H7.88978C8.19455 9.5423 8.57499 9.55363 8.87152 9.54127C8.9647 9.40021 9.05634 9.27151 9.17011 9.14693Z" fill="#33700E"/><path d="M4.67111 2.90121C4.70354 2.89812 4.75244 2.89709 4.78591 2.89709C5.0639 2.89709 5.34087 2.89658 5.61938 2.89812C5.76044 2.9007 5.90407 2.88834 6.04461 2.90275C6.12183 2.91048 6.20369 2.97534 6.21553 3.05411C6.23303 3.17509 6.22634 3.30482 6.22634 3.42734L6.22531 4.02967C6.53368 4.03893 6.84359 4.02504 7.15196 4.03533C7.21271 4.03533 7.30486 4.076 7.33215 4.13572C7.37385 4.22787 7.36098 4.41989 7.36098 4.52079L7.36149 4.98309L7.36098 5.35015C7.36098 5.48297 7.38311 5.63844 7.26574 5.72184C7.24205 5.73883 7.1638 5.75427 7.13189 5.7553C6.96303 5.76045 6.79417 5.75582 6.62531 5.75736C6.545 5.75685 6.29378 5.7656 6.22788 5.75221C6.21965 5.96895 6.23097 6.18723 6.22634 6.40499C6.22428 6.51362 6.2423 6.67681 6.19751 6.77823C6.17177 6.83588 6.11617 6.86832 6.05645 6.88685C5.7625 6.90538 5.45258 6.88222 5.15708 6.89045C5.08553 6.89045 5.00419 6.88994 4.93366 6.89148C4.69479 6.89148 4.50946 6.93524 4.50431 6.62687C4.49916 6.34218 4.51512 6.04102 4.50225 5.75942C4.30559 5.75736 4.10894 5.75685 3.91228 5.75736C3.79902 5.75839 3.67238 5.76354 3.56015 5.75273C3.50867 5.7481 3.47521 5.73471 3.43608 5.70279C3.37585 5.65234 3.36864 5.57718 3.36813 5.49841C3.36658 5.25697 3.36607 5.01604 3.3671 4.77408C3.37173 4.58 3.35526 4.38077 3.37791 4.18823C3.38615 4.1177 3.46079 4.04975 3.52926 4.04099C3.64561 4.02606 3.7671 4.03173 3.88448 4.03173L4.50431 4.03276C4.50173 3.77226 4.50637 3.51126 4.50379 3.25025C4.50173 3.08911 4.48732 2.95475 4.67111 2.90121ZM3.77997 4.44615C3.77122 4.73547 3.78975 5.06186 3.77585 5.3414C3.96839 5.34397 4.16042 5.34449 4.35295 5.34346C4.39774 5.34346 4.45025 5.34088 4.49453 5.34294C4.61036 5.34861 4.77098 5.31875 4.8585 5.41244C4.93983 5.49944 4.90792 5.6508 4.91255 5.76097C4.90534 5.9952 4.92233 6.23768 4.91152 6.47037L4.91101 6.47758L5.61063 6.48015C5.6549 6.48015 5.78515 6.48736 5.81552 6.46728C5.81707 6.25879 5.81707 6.04977 5.81604 5.84128C5.81449 5.32184 5.81398 5.34191 6.32982 5.34294H6.94295L6.95119 5.34346C6.9517 5.07215 6.96303 4.7123 6.95119 4.44975C6.65157 4.45233 6.34114 4.44975 6.04152 4.44872C5.7697 4.44769 5.81758 4.16455 5.81604 3.98334C5.81089 3.76557 5.82427 3.53545 5.81552 3.31512L5.24666 3.3146C5.16944 3.3146 4.98514 3.32078 4.9177 3.30842C4.90019 3.53545 4.91976 3.77329 4.91306 4.00599C4.90895 4.16352 4.95682 4.41423 4.72259 4.44357C4.57587 4.46211 4.4173 4.44048 4.26956 4.44821C4.15166 4.44512 3.90198 4.46005 3.79851 4.44821C3.79233 4.44769 3.78615 4.44666 3.77997 4.44615Z" fill="#33700E"/><path d="M11.1557 5.90356C11.3266 5.8979 11.5176 5.90202 11.6911 5.90202C11.8836 5.90974 12.0983 5.88349 12.2862 5.92776C12.6033 6.00189 12.853 6.27886 12.8792 6.60473C12.9003 6.86625 12.8818 7.11182 12.7057 7.31723C12.5379 7.51285 12.3572 7.58287 12.108 7.605C11.8517 7.61581 11.5881 7.6014 11.3317 7.60758C11.0661 7.61324 10.8488 7.58596 10.6403 7.40732C10.489 7.2781 10.3953 7.09277 10.3814 6.89405C10.3613 6.62532 10.3824 6.3777 10.5683 6.16869C10.7314 5.98593 10.9183 5.91901 11.1557 5.90356ZM12.108 7.1911C12.2187 7.18183 12.3222 7.14271 12.3896 7.05416C12.5508 6.84309 12.507 6.38388 12.1956 6.33085C12.0329 6.30306 11.8779 6.3185 11.7142 6.31438C11.5304 6.31541 11.3302 6.31026 11.1484 6.31747C10.8313 6.35505 10.7556 6.5759 10.7881 6.85647C10.8241 7.17257 11.0939 7.20397 11.3466 7.1947C11.5994 7.18492 11.8584 7.205 12.108 7.1911Z" fill="#33700E"/><path d="M11.7261 9.89135C11.9598 9.87848 11.9629 10.0551 11.967 10.2291C12.1225 10.2811 12.3861 10.3984 12.4489 10.5621C12.4695 10.6147 12.4674 10.6733 12.4438 10.7243C12.4221 10.7712 12.3727 10.8211 12.3212 10.8345C12.1374 10.8824 12.121 10.7372 11.9779 10.6713C11.8646 10.6152 11.7462 10.5956 11.6226 10.6352C11.4682 10.6852 11.3627 10.8654 11.4352 11.0214C11.5243 11.2139 11.7179 11.1974 11.8924 11.2247C11.9604 11.235 12.0268 11.2546 12.0901 11.2818C12.2713 11.3601 12.4118 11.4991 12.4829 11.6844C12.5472 11.8517 12.5416 12.0376 12.4664 12.2008C12.3676 12.417 12.1977 12.5287 11.9825 12.609C11.9588 12.7578 12.0015 12.8304 11.8414 12.9164C11.7724 12.938 11.706 12.9359 11.6479 12.8865C11.5665 12.818 11.567 12.714 11.5588 12.6167C11.3884 12.5586 10.9977 12.3485 11.1171 12.1189C11.1423 12.069 11.1871 12.0319 11.2412 12.017C11.4718 11.9532 11.5166 12.3058 11.878 12.208C11.9655 12.1843 12.0391 12.1266 12.0834 12.0479C12.1143 11.9918 12.1302 11.9156 12.1086 11.8548C12.0175 11.5974 11.8059 11.6422 11.6103 11.6072C11.5289 11.5923 11.4507 11.564 11.3786 11.5233C10.7979 11.2015 10.9204 10.3928 11.5511 10.2301C11.5531 10.0705 11.5403 9.93768 11.7261 9.89135Z" fill="#33700E"/></svg> },
                      { bg: "var(--blue-ultra-light)", color: "#2D5B8D", title: "Für Dich da", desc: "Unser Team hilft Dir bei allen Fragen.",
                        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.5493 1.44235H15.386C15.4503 1.46875 15.7336 1.48898 15.8286 1.50394C17.2609 1.72829 18.5481 2.50516 19.4129 3.66914C20.1194 4.63604 20.5179 5.76483 20.5127 6.96929C20.5118 7.12149 20.4836 7.28514 20.4643 7.43646C20.4388 7.64674 20.4097 7.85613 20.3789 8.06552C20.598 8.33826 20.8171 8.65675 21.0256 8.94357C21.1972 9.17936 21.4382 9.48289 21.5702 9.73891C21.6459 9.9052 21.63 10.0996 21.5649 10.2624C21.4585 10.5307 21.1057 10.7181 20.8496 10.8211C20.9227 10.9759 21.1532 11.5082 21.125 11.6692C21.0793 11.9296 20.6622 11.9921 20.5039 12.0977L20.5012 12.1153C20.5611 12.1927 20.7669 12.322 20.8549 12.4074C20.9235 12.4733 20.9781 12.5587 20.9772 12.6563C20.9763 12.8156 20.7001 13.2001 20.6235 13.4015C20.525 13.6611 20.496 13.9241 20.3209 14.1503C20.2056 14.2989 20.0437 14.4212 19.8669 14.4855C19.6038 14.5822 19.3029 14.5805 19.0267 14.5972C18.3774 14.6377 17.7166 14.6561 17.0885 14.8365C16.9943 14.8638 16.894 14.8867 16.8087 14.935C16.5606 15.074 16.1717 15.8624 15.9157 16.114C15.8611 16.1685 15.7987 16.2108 15.7212 16.2222C15.5541 16.2468 15.3623 16.2292 15.1934 16.2292L14.1499 16.2284L10.4583 16.2292C10.3668 16.3207 10.2612 16.4377 10.1327 16.4747C10.0588 16.4958 9.9902 16.4844 9.92422 16.4457C9.77289 16.3586 9.65412 16.2143 9.5283 16.0964C9.36466 15.9442 9.19838 15.7928 9.03209 15.6433C7.9209 14.6465 5.90087 12.9396 5.52255 11.4959C5.35803 10.8686 5.54807 10.1551 5.87007 9.6087C6.24575 8.9858 6.85106 8.53534 7.55578 8.3541C8.27546 8.16406 9.04177 8.27052 9.68227 8.64971C9.57757 8.3629 9.51247 8.05584 9.47112 7.75231C9.32419 6.7159 9.47551 5.65838 9.9075 4.70467C10.2497 3.9454 10.7574 3.27147 11.3917 2.73127C11.4419 2.68992 11.5017 2.6556 11.5519 2.61513C12.0789 2.19019 12.6833 1.87258 13.3317 1.68078C13.5552 1.61479 13.7584 1.5664 13.9863 1.52065C14.1147 1.49426 14.4535 1.48458 14.5493 1.44235ZM13.5305 15.5571L14.7816 15.5562C14.9919 15.5562 15.2849 15.5474 15.4881 15.5632L15.4951 15.5544C15.716 15.2676 15.9025 14.9245 16.1304 14.6377C16.4568 14.2189 17.1791 14.0887 17.6797 14.0244C18.2903 13.9461 18.9255 13.9497 19.5378 13.8802C19.8467 13.8441 19.8704 13.5186 19.947 13.281C20.0112 13.0822 20.0921 12.9176 20.1959 12.7399C19.9909 12.5657 19.756 12.4135 19.5757 12.2147C19.4842 12.1144 19.4807 11.9059 19.581 11.8117C19.7868 11.6173 20.122 11.5469 20.371 11.422C19.8924 10.28 20.0578 10.5439 20.964 10.0029C20.7784 9.77762 20.5338 9.41514 20.3552 9.16968L19.983 8.65939C19.8273 8.44472 19.6698 8.29603 19.7032 8.02329C19.7235 7.69688 19.8255 7.31329 19.8299 6.99216C19.8467 5.89856 19.4543 4.80849 18.7821 3.95244C17.8345 2.74622 16.243 2.00279 14.7024 2.11804C13.4197 2.18755 12.2161 2.7603 11.353 3.71137C10.4847 4.67388 10.0351 5.94255 10.1037 7.23675C10.1195 7.55964 10.1679 7.87988 10.2489 8.19309C10.2911 8.35146 10.358 8.53534 10.3896 8.69018C10.8902 8.31891 11.6873 8.20189 12.2979 8.29515C13.0282 8.41217 13.6827 8.81248 14.12 9.40899C14.5054 9.93951 14.7455 10.6715 14.6382 11.3305C14.4332 12.5798 12.9068 13.991 11.9979 14.8242C11.7269 15.0732 11.4586 15.3362 11.1735 15.5694C11.3187 15.5456 11.792 15.5562 11.9601 15.5562L13.5305 15.5571ZM10.0667 15.6829C10.1732 15.5553 10.2823 15.4717 10.4028 15.36L11.0856 14.7353C11.1929 14.6385 11.3653 14.4925 11.4604 14.394C11.58 14.2778 11.7093 14.1731 11.8299 14.0596C12.5108 13.4156 13.9572 12.029 13.9792 11.0665C13.9924 10.5263 13.7619 9.97822 13.3898 9.59022C12.9974 9.17848 12.4554 8.94269 11.8862 8.93741C11.5008 8.93301 11.1207 9.03155 10.7873 9.22511C10.7072 9.27085 10.6316 9.32276 10.5586 9.37995C10.4442 9.47145 10.2066 9.72571 10.0667 9.71868C9.8943 9.70988 9.64708 9.43978 9.49663 9.32628C9.16934 9.07906 8.5658 8.88286 8.15581 8.94181C7.57866 8.98404 7.05781 9.21719 6.67422 9.65709C6.32581 10.0574 6.11026 10.6029 6.14545 11.1378C6.21232 12.1443 7.86019 13.654 8.60363 14.342C8.87021 14.5884 9.13591 14.8418 9.41129 15.0793C9.63212 15.2702 9.86439 15.4717 10.0667 15.6829Z" fill="#2F5D8F"/><path d="M4.90678 17.1249C6.10947 16.6524 7.66409 16.2143 8.96356 16.5354C9.13336 16.5776 9.37531 16.6841 9.54247 16.7536L10.2745 17.0562C10.8367 17.2885 11.3997 17.5208 11.9619 17.7557C12.3262 17.9079 12.5655 18.1727 12.657 18.5589C12.8409 18.5167 13.0635 18.4868 13.2517 18.456L14.2292 18.2985L14.9805 18.1762C15.1503 18.1481 15.402 18.1014 15.5674 18.1058C15.8049 18.1111 16.0363 18.1797 16.2378 18.3047C16.5369 18.4894 16.7498 18.7859 16.8299 19.1273C16.9108 19.4757 16.8466 19.8408 16.6522 20.1408C16.4569 20.4461 16.1463 20.6538 15.7935 20.7215C15.4856 20.7813 15.1679 20.8271 14.8583 20.8772L12.9649 21.1843L11.7429 21.3822C11.5695 21.4104 11.0742 21.5019 10.9282 21.4869C10.2525 21.4183 9.57679 21.2072 8.9882 20.864C8.76121 20.7321 8.41368 20.5121 8.17174 20.447C7.82509 20.3537 7.26642 20.5059 6.95145 20.674C7.00864 20.7567 7.05438 20.8429 7.10717 20.9274C7.23826 21.135 7.29017 21.3699 7.03679 21.516C6.44028 21.8608 5.84465 22.2163 5.24023 22.548C5.22439 22.5568 5.24023 22.5471 5.22439 22.5577H5.03875C4.9798 22.5233 4.91294 22.4838 4.87511 22.4257C4.7405 22.2189 4.61733 21.9928 4.49415 21.7781L3.86509 20.6907L2.85332 18.9373C2.71079 18.6892 2.4926 18.3504 2.38614 18.0838C2.36327 18.0267 2.40286 17.9061 2.44069 17.8507C2.46796 17.812 2.50139 17.7786 2.54011 17.7513C2.78469 17.5859 3.08734 17.4381 3.34601 17.2841C3.65834 17.0967 3.98211 16.9128 4.3006 16.736C4.61996 16.5583 4.78801 16.9084 4.90678 17.1249ZM5.24199 17.7047L6.19306 19.3508C6.29511 19.5285 6.54234 19.927 6.61536 20.0951C7.13181 19.8311 7.87348 19.6402 8.42952 19.832C8.80784 19.9631 9.10961 20.1716 9.45801 20.3634C9.77914 20.5376 10.124 20.6652 10.4821 20.7409C10.5912 20.7646 10.9361 20.8288 11.0355 20.8165C11.2625 20.7892 11.5185 20.7426 11.7464 20.7057L13.0212 20.498L14.7289 20.2227C14.9867 20.1813 15.6466 20.1021 15.8392 20.0045C15.9941 19.927 16.112 19.7898 16.1639 19.6244C16.2167 19.4572 16.2008 19.276 16.119 19.1211C16.0354 18.9654 15.892 18.844 15.7222 18.7956C15.5524 18.7463 15.3747 18.7877 15.204 18.8141C14.5802 18.9293 13.9362 19.012 13.3116 19.1229C13.1593 19.1502 12.7124 19.2065 12.5919 19.2443C12.4203 19.5505 12.2391 19.7528 11.8854 19.8549C11.705 19.9068 11.515 19.9121 11.332 19.8699C11.1824 19.8355 10.8991 19.7106 10.7469 19.6473L9.79146 19.2513L8.94421 18.9003C8.79112 18.837 8.63451 18.7771 8.48759 18.7032C8.40049 18.6592 8.3345 18.5589 8.32042 18.4639C8.29755 18.3012 8.41984 18.1252 8.58261 18.0944C8.7137 18.0698 8.84039 18.1375 8.95916 18.185C9.12105 18.2528 9.28117 18.3205 9.44305 18.3865L10.878 18.9812C11.076 19.0639 11.3118 19.1757 11.515 19.225C11.7957 19.2918 12.0605 18.9883 12.0077 18.7147C11.9584 18.4578 11.7605 18.39 11.5458 18.302C11.4587 18.266 11.3725 18.2308 11.2862 18.1947L10.4232 17.8384L9.4061 17.417C9.23278 17.3448 8.96708 17.2252 8.79464 17.1803C8.50694 17.1046 8.10399 17.0782 7.80486 17.0976C7.12389 17.1433 6.58105 17.2674 5.92823 17.4697C5.72764 17.5322 5.42587 17.6545 5.24199 17.7047ZM3.16829 18.156C3.28882 18.3381 3.42607 18.5889 3.53693 18.7815L4.14487 19.8364L4.88215 21.1121C5.00092 21.3189 5.15489 21.5723 5.2631 21.7817C5.38012 21.6954 5.57807 21.5872 5.70828 21.5124L6.43412 21.0945C6.24848 20.813 6.01885 20.3881 5.84641 20.0889L4.69739 18.0997C4.64812 18.0152 4.38242 17.526 4.33755 17.4856C3.96275 17.6976 3.5422 17.958 3.16829 18.156Z" fill="#2F5D8F"/></svg> },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", background: "white", border: "1px solid var(--grey-bg)", borderRadius: 14, padding: "14px 16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--black)", margin: "0 0 2px" }}>{item.title}</p>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", margin: 0 }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Ähnliche Fachkräfte */}
            <div style={{ borderTop: "1px solid var(--grey-bg)", paddingTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 22, color: "var(--black)", margin: 0 }}>Ähnliche Fachkräfte</h2>
                <a href="/fachkraefte" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--cta)", textDecoration: "none", fontWeight: 500 }}>Alle anzeigen →</a>
              </div>
              {isMedium ? (
                /* Horizontal slider at medium widths */
                <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" as const }}>
                  {similar.map(s => (
                    <a key={s.id} href={`/fachkraefte/${s.id}`} style={{ textDecoration: "none", display: "block", background: "white", border: "1px solid var(--grey-bg)", borderRadius: 14, overflow: "hidden", flexShrink: 0, width: 220 }}>
                      <div style={{ width: "100%", height: 140, overflow: "hidden" }}>
                        <img src={s.photo} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                      </div>
                      <div style={{ padding: "12px 14px 0" }}>
                        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", margin: "0 0 2px", lineHeight: 1.3 }}>{s.name}</p>
                        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", margin: "0 0 8px" }}>{s.role}</p>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                          {(s.angebot === "online" || s.angebot === "beides") && <span style={{ padding: "2px 7px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "var(--cta)", border: "1.5px solid var(--cta)" }}>Online</span>}
                          {(s.angebot === "vor-ort" || s.angebot === "beides") && <span style={{ padding: "2px 7px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "#B07000", border: "1.5px solid #D4920A" }}>Vor Ort</span>}
                        </div>
                      </div>
                      <div style={{ borderTop: "1px solid var(--grey-bg)", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", whiteSpace: "nowrap" }}>€{s.price} <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 11, color: "var(--grey-text)" }}>/Sitz.</span></span>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: availColors[s.availability]?.text ?? "var(--grey-border)", fontWeight: 500, textAlign: "right" as const }}>{availColors[s.availability]?.label ?? ""}</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                /* 3-col grid at large widths */
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {similar.map(s => (
                    <a key={s.id} href={`/fachkraefte/${s.id}`} style={{ textDecoration: "none", display: "block", background: "white", border: "1px solid var(--grey-bg)", borderRadius: 14, overflow: "hidden", transition: "box-shadow 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <div style={{ display: "flex", gap: 14, padding: "16px 16px 12px" }}>
                        <div style={{ width: 72, height: 86, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                          <img src={s.photo} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--black)", margin: "0 0 3px", lineHeight: 1.3 }}>{s.name}</p>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", margin: "0 0 8px" }}>{s.role}</p>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {(s.angebot === "online" || s.angebot === "beides") && <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "var(--cta)", border: "1.5px solid var(--cta)" }}>Online</span>}
                            {(s.angebot === "vor-ort" || s.angebot === "beides") && <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "#B07000", border: "1.5px solid #D4920A" }}>Vor Ort</span>}
                          </div>
                        </div>
                      </div>
                      <div style={{ borderTop: "1px solid var(--grey-bg)", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, color: "var(--black)" }}>€{s.price} <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 12, color: "var(--grey-text)" }}>/ Sitzung</span></span>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: availColors[s.availability]?.text ?? "var(--grey-border)", fontWeight: 500 }}>{availColors[s.availability]?.label ?? ""}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: sticky booking widget ── */}
          <div style={{ position: "sticky", top: 88, alignSelf: "flex-start" }}>
            <BookingWidget t={t} avail={avail} />
          </div>
      </div>

      <div style={{ paddingBottom: 64 }} />
      <Footer />
    </main>
  );
}

// ── Mobile content sections ──
function MobileContentSections({ t, similar }: { t: NonNullable<ReturnType<typeof therapists.find>>; similar: typeof therapists }) {
  return (
    <>
      {/* Kann ich helfen */}
      <MobileAccordionSection t={t} />

      {/* Ansatz */}
      <div style={{ margin: "0 16px 40px", background: "var(--red-bg)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "28px 20px 20px" }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "var(--cta-brand)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>Mein Ansatz</p>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 16px", lineHeight: 1.3 }}>So unterstütze ich Dich</h2>
          {(t.approach ?? "").split("\n\n").map((para, i) => (
            <p key={i} style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: "0 0 12px", lineHeight: 1.7 }}>{para}</p>
          ))}
        </div>
        <div style={{ width: "100%", height: 200, overflow: "hidden" }}>
          <img src="/fachkraefte/praxis-session.png" alt="Praxis" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
        </div>
      </div>

      {/* Ablauf */}
      <div style={{ padding: "0 16px", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 4px" }}>Wie läuft die Zusammenarbeit ab?</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: "0 0 24px" }}>Dein Weg zu mehr Klarheit und Wohlbefinden.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { bg: "var(--blue-ultra-light)", title: "Erstgespräch", desc: "Wir klären Dein Anliegen und Ziele in einem kostenlosen Erstgespräch.",
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path stroke="#2D5B8D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg> },
            { bg: "var(--yellow-light)", title: "Kennenlernen", desc: "Du entscheidest, ob die Zusammenarbeit für Dich passt.",
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6.76383 16.2846C7.2144 16.2718 7.66588 16.2745 8.11645 16.2946C9.29794 16.3592 10.4266 16.8116 11.3269 17.5807C11.6008 17.8165 11.762 17.9967 12.0004 18.2643L12.0551 18.2006C13.2757 16.8079 14.8622 16.1944 16.7082 16.2818C17.0641 16.2991 17.3891 16.2782 17.7577 16.3201C18.8582 16.4475 19.8931 16.9081 20.726 17.639C21.8156 18.592 22.4819 19.9392 22.5783 21.3837C22.5965 21.6832 22.5865 21.9854 22.592 22.2858C22.5965 22.4942 22.5774 22.73 22.3198 22.7664C22.207 22.7837 22.0668 22.7755 21.9512 22.7755L21.3295 22.7746H3.68085L2.41016 22.7755C2.18351 22.7755 1.95413 22.7773 1.72748 22.7727C1.64828 22.77 1.57273 22.7445 1.50993 22.6981C1.43256 22.6298 1.40889 22.4906 1.40889 22.3923C1.40889 21.9462 1.39524 21.4911 1.45258 21.0478C1.59549 19.9346 2.07883 18.8924 2.83615 18.0632C3.89931 16.9172 5.21005 16.3437 6.76383 16.2846ZM2.06699 22.1028C2.7515 22.1219 3.49152 22.1092 4.18148 22.1092L7.92985 22.1083H12.0441C12.2162 22.1083 12.4255 22.1028 12.5957 22.1101C12.5967 21.7587 12.5985 21.4747 12.553 21.1225C12.4155 20.0812 11.9404 19.1127 11.2013 18.3663C10.4813 17.6408 9.54735 17.1648 8.53789 17.0073C8.01814 16.9299 7.29814 16.9372 6.76292 16.9563C5.41031 17.0091 4.2634 17.4988 3.33678 18.4992C2.65228 19.2392 2.22083 20.1767 2.10523 21.178C2.06699 21.502 2.06791 21.7778 2.06699 22.1028ZM12.3991 18.8296C12.512 19.0344 12.6149 19.201 12.7177 19.414C13.1574 20.3324 13.2557 21.1034 13.2557 22.1019C13.8127 22.1246 14.4636 22.1083 15.0279 22.1083H18.2447L21.9303 22.1092C21.9303 21.7942 21.9302 21.4811 21.892 21.168C21.7628 20.103 21.2803 19.1118 20.5212 18.3544C19.7384 17.5689 18.7071 17.081 17.6048 16.9736C17.3062 16.9445 16.9012 16.9499 16.5972 16.9508C16.4351 16.9499 16.2731 16.9518 16.1111 16.9563C15.9727 16.9618 15.8316 16.9654 15.6933 16.98C14.3571 17.1211 13.2183 17.7737 12.3991 18.8296ZM10.271 1.22281C10.6233 1.22008 10.9746 1.24739 11.3223 1.30473C12.2407 1.45765 13.1674 1.85543 13.8309 2.52263C13.9911 2.68375 14.1186 2.85214 14.2496 3.03601C14.3862 3.03055 14.5254 3.00961 14.662 2.9996C15.9654 2.91222 17.3781 3.33093 18.242 4.35313C18.6406 4.82918 18.8691 5.41174 18.8063 6.03707C18.7271 6.81259 18.2975 7.33689 17.7259 7.81386C17.9097 8.42827 18.0681 9.05998 18.242 9.67803C18.2811 9.84278 18.1946 10.0121 18.0381 10.0767C17.9762 10.1013 17.9088 10.1058 17.8451 10.0895C17.7322 10.0594 17.2644 9.75358 17.1378 9.67439C16.771 9.44319 16.4024 9.21381 16.0328 8.98625C15.9063 8.90888 15.5922 8.68951 15.4575 8.65583C15.3947 8.64036 15.1435 8.67768 15.0461 8.67768C14.7867 8.67586 14.5291 8.65947 14.2724 8.62852C13.2074 8.44374 12.471 8.13881 11.7028 7.35692C11.6291 7.36784 11.5481 7.38423 11.4771 7.3997C10.9409 7.5062 10.393 7.53806 9.84864 7.49345C9.71938 7.48526 9.54553 7.62908 9.43448 7.69462C9.32798 7.75651 9.21147 7.83024 9.10224 7.8976L7.70138 8.76051C7.57577 8.83788 7.23534 9.05816 7.12156 9.10367C7.06603 9.12551 7.00596 9.13007 6.94861 9.11732C6.86669 9.10003 6.79478 9.04996 6.75018 8.97988C6.70922 8.91707 6.69192 8.84243 6.69921 8.7687C6.71104 8.63307 6.80661 8.33361 6.84666 8.19161L7.13339 7.17305C7.17799 7.01467 7.25991 6.75161 7.28995 6.59596L7.29268 6.5823C5.92004 5.58832 5.5696 3.88799 6.7875 2.59818C7.69319 1.63879 8.98118 1.26286 10.271 1.22281ZM7.4984 8.0751C7.83427 7.86028 8.17106 7.64728 8.50967 7.43702C8.74816 7.28683 9.00029 7.12208 9.24151 6.97826C9.32525 6.92364 9.44631 6.83808 9.5428 6.82716C9.71665 6.80804 9.92874 6.84172 10.1081 6.849C10.3474 6.85538 10.5878 6.84718 10.8271 6.82261C12.0278 6.68971 13.6407 6.0571 13.9493 4.74999C14.0567 4.29123 13.8819 3.72415 13.6188 3.34731C12.8015 2.18038 11.275 1.84178 9.9433 1.90549C8.97572 1.94099 7.87159 2.34514 7.19711 3.05604C6.37334 3.91166 6.49531 5.0977 7.37096 5.86413C7.4456 5.92966 7.84702 6.22822 7.87888 6.27009C8.03999 6.48582 7.72049 7.20127 7.66133 7.45613C7.61127 7.6755 7.54846 7.88213 7.4984 8.0751ZM14.5546 3.67227C14.6274 3.99358 14.6738 4.25027 14.642 4.58069C14.5409 5.622 13.7417 6.43485 12.8597 6.9109C12.796 6.94549 12.4774 7.09386 12.4519 7.12026C12.4647 7.17396 12.7924 7.38969 12.8524 7.4261C13.5124 7.82205 14.2779 7.97042 15.0397 7.97042C15.1763 7.97133 15.5822 7.92036 15.6687 7.95677C15.9391 8.06873 16.2895 8.3245 16.5489 8.48106C16.8284 8.65583 17.1087 8.82878 17.3909 8.99808C17.3144 8.72683 17.2361 8.45649 17.156 8.18615C17.1032 8.00501 16.9722 7.66731 17.0541 7.49163C17.096 7.40152 17.3572 7.24223 17.4464 7.17032C18.5751 6.25189 18.2829 4.84011 17.0495 4.18564C16.3614 3.81791 15.5895 3.63859 14.8104 3.6659C14.7339 3.66863 14.6292 3.67682 14.5546 3.67227ZM7.27721 10.196C8.22022 10.1614 9.10952 10.6374 9.60287 11.4421C10.0962 12.2467 10.1172 13.2553 9.6584 14.0809C9.19963 14.9055 8.33218 15.4189 7.38826 15.4244C5.95918 15.4326 4.78952 14.2929 4.75857 12.8648C4.72854 11.4366 5.84904 10.2487 7.27721 10.196ZM7.34366 14.7544C8.41956 14.7481 9.28611 13.8706 9.28065 12.7947C9.27427 11.7188 8.3968 10.8513 7.3209 10.8577C6.24409 10.8641 5.37754 11.7415 5.38391 12.8174C5.38937 13.8934 6.26684 14.7608 7.34366 14.7544ZM16.6163 10.195C17.5593 10.1595 18.4486 10.6365 18.9419 11.4421C19.4344 12.2476 19.4544 13.2571 18.9929 14.0809C18.5323 14.9055 17.6621 15.4162 16.7182 15.418C15.2928 15.4207 14.1295 14.2811 14.1013 12.8566C14.074 11.4321 15.1917 10.2478 16.6163 10.195ZM16.6663 14.7581C17.7431 14.7572 18.6152 13.8833 18.6142 12.8065C18.6124 11.7297 17.7395 10.8577 16.6627 10.8586C15.5859 10.8595 14.713 11.7334 14.7148 12.8102C14.7157 13.887 15.5895 14.759 16.6663 14.7581Z" fill="#B07000"/></svg> },
            { bg: "var(--green-light)", title: "Individuelle Begleitung", desc: "Gemeinsam entwickeln wir einen Plan, der zu Dir und Deinem Leben passt.",
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M14.5493 1.44235H15.386C15.4503 1.46875 15.7336 1.48898 15.8286 1.50394C17.2609 1.72829 18.5481 2.50516 19.4129 3.66914C20.1194 4.63604 20.5179 5.76483 20.5127 6.96929C20.5118 7.12149 20.4836 7.28514 20.4643 7.43646C20.4388 7.64674 20.4097 7.85613 20.3789 8.06552C20.598 8.33826 20.8171 8.65675 21.0256 8.94357C21.1972 9.17936 21.4382 9.48289 21.5702 9.73891C21.6459 9.9052 21.63 10.0996 21.5649 10.2624C21.4585 10.5307 21.1057 10.7181 20.8496 10.8211C20.9227 10.9759 21.1532 11.5082 21.125 11.6692C21.0793 11.9296 20.6622 11.9921 20.5039 12.0977L20.5012 12.1153C20.5611 12.1927 20.7669 12.322 20.8549 12.4074C20.9235 12.4733 20.9781 12.5587 20.9772 12.6563C20.9763 12.8156 20.7001 13.2001 20.6235 13.4015C20.525 13.6611 20.496 13.9241 20.3209 14.1503C20.2056 14.2989 20.0437 14.4212 19.8669 14.4855C19.6038 14.5822 19.3029 14.5805 19.0267 14.5972C18.3774 14.6377 17.7166 14.6561 17.0885 14.8365C16.9943 14.8638 16.894 14.8867 16.8087 14.935C16.5606 15.074 16.1717 15.8624 15.9157 16.114C15.8611 16.1685 15.7987 16.2108 15.7212 16.2222C15.5541 16.2468 15.3623 16.2292 15.1934 16.2292L14.1499 16.2284L10.4583 16.2292C10.3668 16.3207 10.2612 16.4377 10.1327 16.4747C10.0588 16.4958 9.9902 16.4844 9.92422 16.4457C9.77289 16.3586 9.65412 16.2143 9.5283 16.0964C9.36466 15.9442 9.19838 15.7928 9.03209 15.6433C7.9209 14.6465 5.90087 12.9396 5.52255 11.4959C5.35803 10.8686 5.54807 10.1551 5.87007 9.6087C6.24575 8.9858 6.85106 8.53534 7.55578 8.3541C8.27546 8.16406 9.04177 8.27052 9.68227 8.64971C9.57757 8.3629 9.51247 8.05584 9.47112 7.75231C9.32419 6.7159 9.47551 5.65838 9.9075 4.70467C10.2497 3.9454 10.7574 3.27147 11.3917 2.73127C11.4419 2.68992 11.5017 2.6556 11.5519 2.61513C12.0789 2.19019 12.6833 1.87258 13.3317 1.68078C13.5552 1.61479 13.7584 1.5664 13.9863 1.52065C14.1147 1.49426 14.4535 1.48458 14.5493 1.44235ZM13.5305 15.5571L14.7816 15.5562C14.9919 15.5562 15.2849 15.5474 15.4881 15.5632L15.4951 15.5544C15.716 15.2676 15.9025 14.9245 16.1304 14.6377C16.4568 14.2189 17.1791 14.0887 17.6797 14.0244C18.2903 13.9461 18.9255 13.9497 19.5378 13.8802C19.8467 13.8441 19.8704 13.5186 19.947 13.281C20.0112 13.0822 20.0921 12.9176 20.1959 12.7399C19.9909 12.5657 19.756 12.4135 19.5757 12.2147C19.4842 12.1144 19.4807 11.9059 19.581 11.8117C19.7868 11.6173 20.122 11.5469 20.371 11.422C19.8924 10.28 20.0578 10.5439 20.964 10.0029C20.7784 9.77762 20.5338 9.41514 20.3552 9.16968L19.983 8.65939C19.8273 8.44472 19.6698 8.29603 19.7032 8.02329C19.7235 7.69688 19.8255 7.31329 19.8299 6.99216C19.8467 5.89856 19.4543 4.80849 18.7821 3.95244C17.8345 2.74622 16.243 2.00279 14.7024 2.11804C13.4197 2.18755 12.2161 2.7603 11.353 3.71137C10.4847 4.67388 10.0351 5.94255 10.1037 7.23675C10.1195 7.55964 10.1679 7.87988 10.2489 8.19309C10.2911 8.35146 10.358 8.53534 10.3896 8.69018C10.8902 8.31891 11.6873 8.20189 12.2979 8.29515C13.0282 8.41217 13.6827 8.81248 14.12 9.40899C14.5054 9.93951 14.7455 10.6715 14.6382 11.3305C14.4332 12.5798 12.9068 13.991 11.9979 14.8242C11.7269 15.0732 11.4586 15.3362 11.1735 15.5694C11.3187 15.5456 11.792 15.5562 11.9601 15.5562L13.5305 15.5571ZM10.0667 15.6829C10.1732 15.5553 10.2823 15.4717 10.4028 15.36L11.0856 14.7353C11.1929 14.6385 11.3653 14.4925 11.4604 14.394C11.58 14.2778 11.7093 14.1731 11.8299 14.0596C12.5108 13.4156 13.9572 12.029 13.9792 11.0665C13.9924 10.5263 13.7619 9.97822 13.3898 9.59022C12.9974 9.17848 12.4554 8.94269 11.8862 8.93741C11.5008 8.93301 11.1207 9.03155 10.7873 9.22511C10.7072 9.27085 10.6316 9.32276 10.5586 9.37995C10.4442 9.47145 10.2066 9.72571 10.0667 9.71868C9.8943 9.70988 9.64708 9.43978 9.49663 9.32628C9.16934 9.07906 8.5658 8.88286 8.15581 8.94181C7.57866 8.98404 7.05781 9.21719 6.67422 9.65709C6.32581 10.0574 6.11026 10.6029 6.14545 11.1378C6.21232 12.1443 7.86019 13.654 8.60363 14.342C8.87021 14.5884 9.13591 14.8418 9.41129 15.0793C9.63212 15.2702 9.86439 15.4717 10.0667 15.6829Z" fill="#1A1A1A"/><path d="M4.90678 17.1249C6.10947 16.6524 7.66409 16.2143 8.96356 16.5354C9.13336 16.5776 9.37531 16.6841 9.54247 16.7536L10.2745 17.0562C10.8367 17.2885 11.3997 17.5208 11.9619 17.7557C12.3262 17.9079 12.5655 18.1727 12.657 18.5589C12.8409 18.5167 13.0635 18.4868 13.2517 18.456L14.2292 18.2985L14.9805 18.1762C15.1503 18.1481 15.402 18.1014 15.5674 18.1058C15.8049 18.1111 16.0363 18.1797 16.2378 18.3047C16.5369 18.4894 16.7498 18.7859 16.8299 19.1273C16.9108 19.4757 16.8466 19.8408 16.6522 20.1408C16.4569 20.4461 16.1463 20.6538 15.7935 20.7215C15.4856 20.7813 15.1679 20.8271 14.8583 20.8772L12.9649 21.1843L11.7429 21.3822C11.5695 21.4104 11.0742 21.5019 10.9282 21.4869C10.2525 21.4183 9.57679 21.2072 8.9882 20.864C8.76121 20.7321 8.41368 20.5121 8.17174 20.447C7.82509 20.3537 7.26642 20.5059 6.95145 20.674C7.00864 20.7567 7.05438 20.8429 7.10717 20.9274C7.23826 21.135 7.29017 21.3699 7.03679 21.516C6.44028 21.8608 5.84465 22.2163 5.24023 22.548C5.22439 22.5568 5.24023 22.5471 5.22439 22.5577H5.03875C4.9798 22.5233 4.91294 22.4838 4.87511 22.4257C4.7405 22.2189 4.61733 21.9928 4.49415 21.7781L3.86509 20.6907L2.85332 18.9373C2.71079 18.6892 2.4926 18.3504 2.38614 18.0838C2.36327 18.0267 2.40286 17.9061 2.44069 17.8507C2.46796 17.812 2.50139 17.7786 2.54011 17.7513C2.78469 17.5859 3.08734 17.4381 3.34601 17.2841C3.65834 17.0967 3.98211 16.9128 4.3006 16.736C4.61996 16.5583 4.78801 16.9084 4.90678 17.1249ZM5.24199 17.7047L6.19306 19.3508C6.29511 19.5285 6.54234 19.927 6.61536 20.0951C7.13181 19.8311 7.87348 19.6402 8.42952 19.832C8.80784 19.9631 9.10961 20.1716 9.45801 20.3634C9.77914 20.5376 10.124 20.6652 10.4821 20.7409C10.5912 20.7646 10.9361 20.8288 11.0355 20.8165C11.2625 20.7892 11.5185 20.7426 11.7464 20.7057L13.0212 20.498L14.7289 20.2227C14.9867 20.1813 15.6466 20.1021 15.8392 20.0045C15.9941 19.927 16.112 19.7898 16.1639 19.6244C16.2167 19.4572 16.2008 19.276 16.119 19.1211C16.0354 18.9654 15.892 18.844 15.7222 18.7956C15.5524 18.7463 15.3747 18.7877 15.204 18.8141C14.5802 18.9293 13.9362 19.012 13.3116 19.1229C13.1593 19.1502 12.7124 19.2065 12.5919 19.2443C12.4203 19.5505 12.2391 19.7528 11.8854 19.8549C11.705 19.9068 11.515 19.9121 11.332 19.8699C11.1824 19.8355 10.8991 19.7106 10.7469 19.6473L9.79146 19.2513L8.94421 18.9003C8.79112 18.837 8.63451 18.7771 8.48759 18.7032C8.40049 18.6592 8.3345 18.5589 8.32042 18.4639C8.29755 18.3012 8.41984 18.1252 8.58261 18.0944C8.7137 18.0698 8.84039 18.1375 8.95916 18.185C9.12105 18.2528 9.28117 18.3205 9.44305 18.3865L10.878 18.9812C11.076 19.0639 11.3118 19.1757 11.515 19.225C11.7957 19.2918 12.0605 18.9883 12.0077 18.7147C11.9584 18.4578 11.7605 18.39 11.5458 18.302C11.4587 18.266 11.3725 18.2308 11.2862 18.1947L10.4232 17.8384L9.4061 17.417C9.23278 17.3448 8.96708 17.2252 8.79464 17.1803C8.50694 17.1046 8.10399 17.0782 7.80486 17.0976C7.12389 17.1433 6.58105 17.2674 5.92823 17.4697C5.72764 17.5322 5.42587 17.6545 5.24199 17.7047ZM3.16829 18.156C3.28882 18.3381 3.42607 18.5889 3.53693 18.7815L4.14487 19.8364L4.88215 21.1121C5.00092 21.3189 5.15489 21.5723 5.2631 21.7817C5.38012 21.6954 5.57807 21.5872 5.70828 21.5124L6.43412 21.0945C6.24848 20.813 6.01885 20.3881 5.84641 20.0889L4.69739 18.0997C4.64812 18.0152 4.38242 17.526 4.33755 17.4856C3.96275 17.6976 3.5422 17.958 3.16829 18.156Z" fill="#1A1A1A"/></svg> },
            { bg: "var(--blue-ultra-light)", title: "Fortschritt", desc: "Regelmäßige Sitzungen für nachhaltige Veränderungen und neue Perspektiven.",
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 16V21M16 14V21M20 10V21M22 3L13.354 11.646C13.3076 11.6926 13.2524 11.7295 13.1916 11.7547C13.1309 11.7799 13.0658 11.7929 13 11.7929C12.9342 11.7929 12.8691 11.7799 12.8084 11.7547C12.7476 11.7295 12.6924 11.6926 12.646 11.646L9.354 8.354C9.26024 8.26026 9.13308 8.20761 9.0005 8.20761C8.86792 8.20761 8.74076 8.26026 8.647 8.354L2 15M4 18V21M8 14V21" stroke="#2D5B8D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          ].map((step, i) => (
            <div key={i} style={{ background: step.bg, borderRadius: 12, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step.icon}</div>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)", margin: 0 }}>{step.title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualifikation */}
      <div style={{ padding: "0 16px", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 20px" }}>Qualifikation &amp; Erfahrung</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {(t.qualifikationen ?? []).map((q: { year: string; title: string; institution: string }, i: number, arr) => (
            <div key={i} style={{ display: "flex", gap: 14 }}>
              {/* timeline spine */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 18 }}>
                <div style={{ width: 2, flex: 1, background: i > 0 ? "var(--cta)" : "transparent", minHeight: 14, opacity: 0.3 }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "white", border: "2.5px solid var(--cta)", flexShrink: 0, zIndex: 1 }} />
                <div style={{ width: 2, flex: 1, background: i < arr.length - 1 ? "var(--cta)" : "transparent", minHeight: 14, opacity: 0.3 }} />
              </div>
              {/* content card */}
              <div style={{ background: i % 2 === 0 ? "var(--blue-ultra-light)" : "white", borderRadius: 12, padding: "8px 14px", marginBottom: 10, flex: 1 }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "var(--cta)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>{q.year}</span>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--black)", margin: "3px 0 2px", lineHeight: 1.4 }}>{q.title}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", margin: 0 }}>{q.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vertrauen & Sicherheit — horizontal slider */}
      <div style={{ padding: "0 16px", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 16px" }}>Vertrauen &amp; Sicherheit</h2>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16, paddingBottom: 4, scrollbarWidth: "none" as const }}>
          {[
            { bg: "var(--blue-ultra-light)", title: "Verifiziertes Profil", desc: "Wir überprüfen alle Qualifikationen und Berufserfahrung.",
              icon: <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.23764 8.0564C7.61163 7.58558 7.95119 7.07532 8.32256 6.60113C8.35874 6.55544 8.40059 6.52707 8.46074 6.52707C8.63205 6.52755 8.82732 6.56362 8.99296 6.59873C9.9153 6.79735 10.737 7.30761 11.3128 8.04102C11.4104 8.16413 11.4998 8.2935 11.5808 8.42768C11.7399 8.6917 11.7125 8.74076 11.9596 8.95092C12.2926 8.99709 12.6422 8.85906 12.9203 9.13367C13.1112 9.32219 13.113 9.47849 13.1126 9.72665C13.1112 9.84592 13.1112 9.96567 13.1134 10.0849C13.1915 10.1672 13.2904 10.2619 13.3719 10.3398C13.5258 10.4827 13.6361 10.6039 13.6618 10.8174C13.7136 11.2493 13.3444 11.4056 13.1152 11.6922C13.0873 12.0582 13.2106 12.4477 12.8515 12.6968C12.7713 12.7526 12.7028 12.7805 12.61 12.8103C12.6313 12.8517 12.6653 12.9421 12.6849 12.9892L12.8358 13.3547L12.9901 13.7274C13.0297 13.8227 13.1034 13.9617 13.0938 14.0631C13.0881 14.1252 13.0001 14.2026 12.9338 14.192C12.7438 14.1612 12.5529 14.103 12.3646 14.0564C12.307 14.1574 12.0917 14.5335 12.0071 14.5724C11.9688 14.5902 11.9248 14.5902 11.8855 14.5753C11.8485 14.5614 11.821 14.5373 11.8001 14.5051C11.7495 14.4262 11.719 14.3219 11.6833 14.2353C11.5887 14.0045 11.5011 13.7669 11.396 13.5399C11.3734 13.4778 11.3411 13.4028 11.3158 13.3408C11.1898 13.3619 11.0957 13.3634 10.971 13.3398L10.6533 14.1107C10.6001 14.2401 10.5491 14.3733 10.4872 14.4988C10.4401 14.5946 10.2906 14.6196 10.2217 14.5301C10.1119 14.3858 10.0208 14.2132 9.92054 14.0607C9.78061 14.0795 9.40924 14.2194 9.30375 14.1862C9.25929 14.1718 9.21962 14.1391 9.20045 14.0968C9.1865 14.0665 9.18345 14.0367 9.19086 14.0045C9.21788 13.8833 9.2837 13.7577 9.33165 13.6428C9.44629 13.3648 9.57095 13.0873 9.67469 12.8055C9.38657 12.7218 9.23968 12.5641 9.17822 12.2779L7.51181 12.276H4.50635L3.20914 12.2765C2.99207 12.2765 2.77282 12.2775 2.55574 12.2755C2.51869 12.2755 2.42541 12.2645 2.39752 12.2419C2.36047 12.2121 2.33998 12.1697 2.3378 12.1226C2.33257 12.0019 2.33475 11.8773 2.33518 11.7566L2.33606 11.0891C2.33562 10.7727 2.32429 10.3769 2.35175 10.0657C2.42672 9.27074 2.74797 8.51713 3.27322 7.90684C3.94972 7.11524 4.91914 6.61893 5.96876 6.52707C5.98925 6.52515 6.02281 6.52563 6.04286 6.52947C6.07468 6.53476 6.10389 6.54967 6.12655 6.57228C6.17101 6.61652 6.23291 6.70501 6.2717 6.75743L6.47744 7.03444L7.23764 8.0564ZM7.23546 8.50703C7.20451 8.49789 7.15002 8.48443 7.12997 8.46134C7.02841 8.34544 6.92336 8.19395 6.83139 8.06939L6.1575 7.16237C6.09125 7.0734 6.01453 6.96567 5.94348 6.87911C5.93345 6.8666 5.92125 6.86804 5.90817 6.86852C4.97319 6.95846 4.094 7.449 3.50119 8.15836C3.04089 8.70661 2.75756 9.37606 2.68695 10.0825C2.66385 10.3153 2.673 10.5452 2.67082 10.7779C2.66733 11.1646 2.67605 11.5561 2.67082 11.9418C2.96199 11.9442 3.2536 11.9447 3.54521 11.9437C3.67642 11.9437 3.82854 11.9403 3.95757 11.9447L3.95844 10.6293V10.2619C3.958 10.1686 3.94057 9.98971 4.00639 9.92142C4.03646 9.89113 4.07744 9.87381 4.12015 9.87333C4.33243 9.86997 4.29451 10.1152 4.29407 10.2533L4.2932 10.6284L4.29364 11.9418L8.05275 11.9437C8.42108 11.9437 8.80597 11.9379 9.17298 11.9447C9.17429 11.8408 9.19957 11.7153 9.12329 11.6364C8.89489 11.3998 8.6181 11.2406 8.62115 10.8799C8.6242 10.4764 8.96419 10.3504 9.16993 10.0811C9.18868 9.73146 9.0954 9.3674 9.38526 9.11299C9.65377 8.87734 9.99638 8.98122 10.325 8.95284C10.4135 8.8682 10.5007 8.78308 10.5874 8.69651C10.7845 8.5027 10.8886 8.41998 11.1781 8.41421C11.1096 8.32765 11.046 8.23819 10.975 8.15307C10.4074 7.47304 9.55526 6.98924 8.66212 6.87718C8.62289 6.87237 8.58323 6.86804 8.54356 6.8642C8.13426 7.38071 7.76027 7.94483 7.34661 8.45942C7.32481 8.48635 7.26902 8.49933 7.23546 8.50703ZM11.2029 13.0224C11.4326 12.9604 11.6297 12.5901 11.8498 12.4972C11.8816 12.4838 11.9832 12.4867 12.0224 12.4871L12.2935 12.4891C12.4674 12.491 12.6509 12.5025 12.7455 12.3265C12.8401 12.1515 12.7168 11.6874 12.8105 11.5291C12.8397 11.4796 12.8855 11.4392 12.9269 11.3993C13.0258 11.3036 13.249 11.1156 13.3022 11.0069C13.334 10.94 13.3379 10.864 13.3139 10.7943C13.2512 10.6188 12.868 10.3783 12.7883 10.1999C12.7752 10.1715 12.7769 10.0671 12.7769 10.0316L12.7795 9.7531C12.7804 9.59536 12.79 9.38568 12.6091 9.31787C12.4565 9.26112 12.2076 9.29382 12.0416 9.28901C11.8384 9.28372 11.8393 9.29911 11.6889 9.16012C11.5512 9.03268 11.42 8.85329 11.2526 8.76865C11.2029 8.74605 11.1266 8.75038 11.0748 8.7547C10.8451 8.81578 10.6241 9.21543 10.4353 9.27699C10.2836 9.32604 9.88915 9.24669 9.70608 9.30729C9.642 9.32845 9.58752 9.37125 9.55264 9.42848C9.44803 9.60113 9.56049 10.0455 9.47985 10.2369C9.4659 10.2691 9.39354 10.3369 9.36434 10.3653L9.17516 10.5466C9.06401 10.6534 8.90884 10.7856 8.96594 10.9588C9.03873 11.1805 9.40139 11.3685 9.49816 11.5796C9.51211 11.6095 9.50993 11.7114 9.50949 11.7489L9.50731 12.0216C9.50644 12.1115 9.49947 12.2274 9.53652 12.3145C9.67687 12.6415 10.2492 12.3967 10.4815 12.5179C10.6916 12.6276 10.907 13.0825 11.2029 13.0224ZM10.3307 12.8248C10.2566 12.8204 10.0966 12.8257 10.0408 12.8161C9.99507 12.8993 9.93143 13.0662 9.89307 13.16L9.63416 13.7895C9.99725 13.6904 10.0709 13.6048 10.2662 13.9804C10.2815 14.0049 10.2967 14.0295 10.3115 14.054C10.3651 13.9487 10.4406 13.7544 10.4859 13.6404C10.5443 13.4942 10.6293 13.3105 10.679 13.1652C10.6132 13.095 10.5382 13.0243 10.4693 12.9565C10.4344 12.9224 10.3678 12.8531 10.3307 12.8248ZM11.9592 12.8238C11.8777 12.8926 11.6759 13.0873 11.6052 13.1691C11.7338 13.4605 11.8485 13.7664 11.9753 14.0593C12.0189 13.9814 12.086 13.8717 12.1362 13.7957C12.1636 13.7544 12.1902 13.7193 12.243 13.7101C12.3445 13.6919 12.5498 13.7606 12.6536 13.7885C12.6082 13.6871 12.5603 13.5745 12.5206 13.4706C12.4391 13.2561 12.3314 13.0388 12.2573 12.8228C12.1771 12.8204 12.0381 12.8166 11.9592 12.8238Z" fill="#2D5B8D"/><path d="M11.053 9.43951C11.869 9.39094 12.5708 9.99979 12.6205 10.7996C12.6702 11.5989 12.0482 12.2866 11.2322 12.3352C10.4162 12.3837 9.71442 11.7744 9.66473 10.9751C9.61547 10.1753 10.2366 9.48761 11.053 9.43951ZM11.1908 12.0076C11.8228 11.9812 12.3136 11.4575 12.2857 10.838C12.2583 10.2186 11.7226 9.73865 11.0905 9.76702C10.4598 9.7954 9.97159 10.3186 9.99949 10.9361C10.0269 11.5541 10.56 12.0331 11.1908 12.0076Z" fill="#2D5B8D"/><path d="M11.6975 10.3369C11.8078 10.3244 11.8985 10.3716 11.9072 10.4899C11.912 10.5548 11.8662 10.6063 11.8222 10.6495C11.6553 10.8135 11.487 10.9775 11.3201 11.1415C11.2656 11.1949 11.0869 11.3772 11.0315 11.4147C11.0045 11.433 10.9727 11.4426 10.9404 11.4421C10.8388 11.4411 10.6501 11.2238 10.5725 11.1473C10.4775 11.0569 10.3005 10.9309 10.4112 10.789C10.44 10.7525 10.4831 10.7294 10.5302 10.7255C10.5638 10.7231 10.5969 10.7308 10.6261 10.7477C10.6941 10.7861 10.8676 10.9751 10.9478 11.0434C11.0376 10.9482 11.1679 10.8169 11.2625 10.7299C11.3519 10.6476 11.5995 10.3721 11.6975 10.3369Z" fill="#2D5B8D"/><path d="M7.11091 1.41728C8.42076 1.34851 9.53969 2.33199 9.61118 3.61558C9.68266 4.89868 8.67924 5.99614 7.3694 6.06684C6.05868 6.13754 4.93713 5.15357 4.86565 3.86902C4.79416 2.58448 5.79976 1.48653 7.11091 1.41728ZM7.28614 5.74077C8.41074 5.7148 9.30213 4.80201 9.27816 3.70022C9.25418 2.59794 8.32443 1.72266 7.19984 1.74382C6.07132 1.76498 5.17469 2.67922 5.19867 3.78438C5.22264 4.89002 6.15762 5.76626 7.28614 5.74077Z" fill="#2D5B8D"/></svg> },
            { bg: "#FFF7E0", title: "Deine Daten sind sicher", desc: "Datenschutz nach höchsten Standards.",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 10V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V10M5 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V12C3 10.8954 3.89543 10 5 10Z" stroke="#B07000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { bg: "var(--green-light)", title: "Kassenrückerstattung möglich", desc: "Wir unterstützen Dich bei der Abwicklung.",
              icon: <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.50953 1.15145C2.72163 1.14321 2.97594 1.14991 3.19216 1.15042H4.49308H8.47254H11.7555L12.8129 1.14991C13.0049 1.14991 13.1985 1.14785 13.3905 1.15248C13.5429 1.1566 13.6628 1.21323 13.7648 1.32906C13.8265 1.40062 13.8641 1.48968 13.8729 1.58337C13.8832 1.69715 13.8785 1.85313 13.8785 1.96948V2.61968L13.878 4.6784V7.02746L13.8785 7.75592C13.8785 7.8213 13.8775 7.89337 13.8791 7.95875C13.8847 8.21307 13.8821 8.36648 13.6783 8.541C13.7112 8.57189 13.7838 8.62131 13.8224 8.65014C13.8924 8.7011 13.9604 8.75516 14.0253 8.8123C14.4119 9.1495 14.7182 9.56804 14.9236 10.0375C15.2865 10.8762 15.302 11.8244 14.9658 12.6744C14.6224 13.5351 13.9491 14.2224 13.095 14.5833C13.0209 14.6157 12.9297 14.6497 12.853 14.6754C11.983 14.9668 11.0322 14.8968 10.2141 14.4803C9.40023 14.0695 8.78194 13.3529 8.4952 12.4875C8.23264 11.6937 8.26868 10.7032 8.64603 9.95209H3.55973H2.01789L1.53551 9.9526C1.3162 9.95312 1.11182 9.97783 0.942453 9.81103C0.824047 9.69468 0.793674 9.57628 0.793674 9.41411C0.792644 8.93174 0.793674 8.44936 0.793674 7.96699V5.08664V3.60863L0.793159 3.18237C0.792644 3.08816 0.790585 2.99395 0.799851 2.90025C0.818899 2.69948 0.969223 2.52444 1.16742 2.48068C1.29304 2.4534 1.43255 2.46215 1.56177 2.46215L2.04002 2.46318V1.90719C2.04002 1.80217 2.03333 1.63485 2.05392 1.53756C2.0704 1.45828 2.10592 1.38466 2.15688 1.32237C2.24903 1.21014 2.36898 1.16432 2.50953 1.15145ZM13.4693 4.76488C13.1521 4.77261 12.8139 4.7654 12.4947 4.76591L10.6991 4.7654L10.1457 4.76591C9.9418 4.76591 9.72661 4.77312 9.5279 4.72576C9.31734 4.67428 9.1248 4.56668 8.97088 4.4143C8.74642 4.19036 8.62184 3.88508 8.62596 3.56847C8.62905 3.25135 8.75929 2.94916 8.98735 2.72882C9.34514 2.38133 9.69315 2.39986 10.1503 2.39986H10.9096H12.5575C12.8422 2.39986 13.1377 2.39574 13.4214 2.40089L13.4718 2.40192L13.4713 2.39368C13.4631 2.2449 13.4966 1.65493 13.4415 1.58183C13.3411 1.55506 12.7295 1.56536 12.5967 1.56536H10.7284L2.61661 1.56639C2.56049 1.5669 2.51622 1.55969 2.47195 1.59161C2.44981 1.62404 2.44827 1.68737 2.44827 1.72752C2.44878 2.2135 2.44929 2.70051 2.44929 3.18649L2.44878 6.21458V7.54073C2.44878 7.62413 2.43694 8.16519 2.47143 8.20226C2.53578 8.23932 2.86166 8.22594 2.95175 8.22594H3.76978H8.87358H9.97269C10.0412 8.22594 10.4185 8.23211 10.4582 8.21667C11.251 7.90418 12.14 7.87432 12.9416 8.17394C12.9802 8.18836 13.026 8.20637 13.0672 8.21513C13.1475 8.22748 13.3967 8.24807 13.4507 8.19505C13.4801 8.08951 13.4708 7.83932 13.4708 7.71679V7.10572C13.4708 6.33041 13.479 5.53916 13.4693 4.76488ZM11.8692 13.4888C13.0193 13.4312 13.9048 12.4504 13.8456 11.3004C13.7859 10.1503 12.8046 9.26585 11.6546 9.32659C10.506 9.38734 9.62417 10.3665 9.68337 11.515C9.74257 12.6636 10.7207 13.547 11.8692 13.4888ZM11.531 8.38862C10.7315 8.44524 9.98762 8.81951 9.46561 9.42801C9.10009 9.85221 8.85968 10.3701 8.77113 10.923C8.76187 10.9812 8.73098 11.1675 8.74333 11.2144C8.76084 11.2252 8.75157 11.2216 8.77268 11.2226L9.2916 11.2252C9.35235 10.5426 9.65506 9.91502 10.1843 9.4728C10.573 9.14487 11.0543 8.94667 11.5609 8.90497C11.5598 8.83753 11.5676 8.41796 11.5511 8.38913C11.5459 8.38862 11.5356 8.3881 11.531 8.38862ZM11.5619 14.4361C11.5557 14.2698 11.5588 14.0819 11.5598 13.9146C11.4111 13.894 11.2757 13.8744 11.13 13.8353C10.5956 13.6906 10.1251 13.3709 9.79354 12.9277C9.49495 12.5333 9.35441 12.1271 9.30035 11.6401C9.13098 11.6355 8.90344 11.6468 8.74848 11.6365C8.73716 11.6607 8.74642 11.7174 8.75002 11.7472C8.77782 11.9912 8.83497 12.2311 8.92043 12.4618C9.20203 13.2185 9.77346 13.8327 10.5081 14.1684C10.8798 14.3382 11.1629 14.3918 11.5619 14.4361ZM14.2317 11.6381C14.1715 12.3089 13.8446 12.9277 13.3246 13.356C12.9575 13.6572 12.4479 13.8842 11.9712 13.9135C11.9691 14.0721 11.9758 14.2785 11.9681 14.4319C12.0829 14.4247 12.1977 14.4108 12.3115 14.3913C13.6886 14.1092 14.6657 13.0425 14.7897 11.636C14.6621 11.636 14.5282 11.6345 14.4006 11.6371C14.345 11.6386 14.2868 11.6412 14.2317 11.6381ZM13.4713 4.35098C13.4646 4.19036 13.4677 3.95149 13.4724 3.78881C12.6605 3.77697 11.8265 3.78675 11.0126 3.78675L10.2481 3.78727C10.124 3.78727 10.0056 3.78984 9.87797 3.78315C9.67874 3.77337 9.60666 3.57156 9.7364 3.42896C9.77243 3.38983 9.83627 3.38057 9.88672 3.37645C10.0695 3.37079 10.2589 3.37336 10.4422 3.37387H11.4703H12.7846C12.99 3.37387 13.269 3.36564 13.4708 3.37696C13.4615 3.22407 13.4708 2.97747 13.4698 2.81531C13.1969 2.822 12.8978 2.81531 12.6224 2.81531H10.7923C10.4751 2.81531 10.141 2.80965 9.82546 2.81582C9.57732 2.82869 9.40692 2.87142 9.23034 3.06602C9.09443 3.2184 9.02442 3.41815 9.03626 3.62201C9.04707 3.82742 9.14025 4.02047 9.29469 4.15638C9.54025 4.37363 9.78324 4.34944 10.0875 4.34944L10.6713 4.34892H12.5277H13.1285C13.2345 4.34892 13.3673 4.34532 13.4713 4.35098ZM14.2338 11.2195C14.4222 11.2273 14.6049 11.2211 14.7908 11.2262C14.7779 11.0677 14.7666 10.9467 14.7341 10.7897C14.5972 10.1354 14.2487 9.54436 13.7416 9.10883C13.355 8.77472 12.8896 8.5446 12.3892 8.44061C12.3156 8.42568 12.2461 8.41384 12.172 8.40509C12.1097 8.39737 12.0278 8.39531 11.9691 8.38141C11.9707 8.53739 11.9753 8.74692 11.9676 8.90033C12.1205 8.92247 12.2517 8.941 12.4005 8.98116C12.9359 9.12685 13.407 9.44706 13.7385 9.89185C14.0392 10.2944 14.1879 10.7233 14.2338 11.2195ZM9.17011 9.14693C9.33124 8.95439 9.51657 8.78347 9.72147 8.63881H4.72989H3.21224L2.76487 8.63933C2.54505 8.63984 2.35045 8.65992 2.18314 8.49209C2.11518 8.42362 2.06473 8.33559 2.04877 8.23726C2.03539 8.089 2.04002 7.91293 2.04002 7.76261L2.04054 6.85912V4.20426V3.32703C2.04054 3.19112 2.0462 3.01351 2.03951 2.88017C1.81969 2.88275 1.58957 2.87348 1.37077 2.8812C1.31466 2.88172 1.26215 2.87348 1.22148 2.909C1.19059 2.9646 1.2014 3.40425 1.2014 3.5L1.20192 4.45188L1.2014 8.22182V9.00947C1.2014 9.16495 1.19368 9.34255 1.21376 9.49648C1.21993 9.54178 1.33885 9.54281 1.3718 9.54178C1.89742 9.54333 2.42355 9.5423 2.94969 9.5423H5.95616H7.88978C8.19455 9.5423 8.57499 9.55363 8.87152 9.54127C8.9647 9.40021 9.05634 9.27151 9.17011 9.14693Z" fill="#33700E"/><path d="M4.67111 2.90121C4.70354 2.89812 4.75244 2.89709 4.78591 2.89709C5.0639 2.89709 5.34087 2.89658 5.61938 2.89812C5.76044 2.9007 5.90407 2.88834 6.04461 2.90275C6.12183 2.91048 6.20369 2.97534 6.21553 3.05411C6.23303 3.17509 6.22634 3.30482 6.22634 3.42734L6.22531 4.02967C6.53368 4.03893 6.84359 4.02504 7.15196 4.03533C7.21271 4.03533 7.30486 4.076 7.33215 4.13572C7.37385 4.22787 7.36098 4.41989 7.36098 4.52079L7.36149 4.98309L7.36098 5.35015C7.36098 5.48297 7.38311 5.63844 7.26574 5.72184C7.24205 5.73883 7.1638 5.75427 7.13189 5.7553C6.96303 5.76045 6.79417 5.75582 6.62531 5.75736C6.545 5.75685 6.29378 5.7656 6.22788 5.75221C6.21965 5.96895 6.23097 6.18723 6.22634 6.40499C6.22428 6.51362 6.2423 6.67681 6.19751 6.77823C6.17177 6.83588 6.11617 6.86832 6.05645 6.88685C5.7625 6.90538 5.45258 6.88222 5.15708 6.89045C5.08553 6.89045 5.00419 6.88994 4.93366 6.89148C4.69479 6.89148 4.50946 6.93524 4.50431 6.62687C4.49916 6.34218 4.51512 6.04102 4.50225 5.75942C4.30559 5.75736 4.10894 5.75685 3.91228 5.75736C3.79902 5.75839 3.67238 5.76354 3.56015 5.75273C3.50867 5.7481 3.47521 5.73471 3.43608 5.70279C3.37585 5.65234 3.36864 5.57718 3.36813 5.49841C3.36658 5.25697 3.36607 5.01604 3.3671 4.77408C3.37173 4.58 3.35526 4.38077 3.37791 4.18823C3.38615 4.1177 3.46079 4.04975 3.52926 4.04099C3.64561 4.02606 3.7671 4.03173 3.88448 4.03173L4.50431 4.03276C4.50173 3.77226 4.50637 3.51126 4.50379 3.25025C4.50173 3.08911 4.48732 2.95475 4.67111 2.90121ZM3.77997 4.44615C3.77122 4.73547 3.78975 5.06186 3.77585 5.3414C3.96839 5.34397 4.16042 5.34449 4.35295 5.34346C4.39774 5.34346 4.45025 5.34088 4.49453 5.34294C4.61036 5.34861 4.77098 5.31875 4.8585 5.41244C4.93983 5.49944 4.90792 5.6508 4.91255 5.76097C4.90534 5.9952 4.92233 6.23768 4.91152 6.47037L4.91101 6.47758L5.61063 6.48015C5.6549 6.48015 5.78515 6.48736 5.81552 6.46728C5.81707 6.25879 5.81707 6.04977 5.81604 5.84128C5.81449 5.32184 5.81398 5.34191 6.32982 5.34294H6.94295L6.95119 5.34346C6.9517 5.07215 6.96303 4.7123 6.95119 4.44975C6.65157 4.45233 6.34114 4.44975 6.04152 4.44872C5.7697 4.44769 5.81758 4.16455 5.81604 3.98334C5.81089 3.76557 5.82427 3.53545 5.81552 3.31512L5.24666 3.3146C5.16944 3.3146 4.98514 3.32078 4.9177 3.30842C4.90019 3.53545 4.91976 3.77329 4.91306 4.00599C4.90895 4.16352 4.95682 4.41423 4.72259 4.44357C4.57587 4.46211 4.4173 4.44048 4.26956 4.44821C4.15166 4.44512 3.90198 4.46005 3.79851 4.44821C3.79233 4.44769 3.78615 4.44666 3.77997 4.44615Z" fill="#33700E"/><path d="M11.1557 5.90356C11.3266 5.8979 11.5176 5.90202 11.6911 5.90202C11.8836 5.90974 12.0983 5.88349 12.2862 5.92776C12.6033 6.00189 12.853 6.27886 12.8792 6.60473C12.9003 6.86625 12.8818 7.11182 12.7057 7.31723C12.5379 7.51285 12.3572 7.58287 12.108 7.605C11.8517 7.61581 11.5881 7.6014 11.3317 7.60758C11.0661 7.61324 10.8488 7.58596 10.6403 7.40732C10.489 7.2781 10.3953 7.09277 10.3814 6.89405C10.3613 6.62532 10.3824 6.3777 10.5683 6.16869C10.7314 5.98593 10.9183 5.91901 11.1557 5.90356ZM12.108 7.1911C12.2187 7.18183 12.3222 7.14271 12.3896 7.05416C12.5508 6.84309 12.507 6.38388 12.1956 6.33085C12.0329 6.30306 11.8779 6.3185 11.7142 6.31438C11.5304 6.31541 11.3302 6.31026 11.1484 6.31747C10.8313 6.35505 10.7556 6.5759 10.7881 6.85647C10.8241 7.17257 11.0939 7.20397 11.3466 7.1947C11.5994 7.18492 11.8584 7.205 12.108 7.1911Z" fill="#33700E"/><path d="M11.7261 9.89135C11.9598 9.87848 11.9629 10.0551 11.967 10.2291C12.1225 10.2811 12.3861 10.3984 12.4489 10.5621C12.4695 10.6147 12.4674 10.6733 12.4438 10.7243C12.4221 10.7712 12.3727 10.8211 12.3212 10.8345C12.1374 10.8824 12.121 10.7372 11.9779 10.6713C11.8646 10.6152 11.7462 10.5956 11.6226 10.6352C11.4682 10.6852 11.3627 10.8654 11.4352 11.0214C11.5243 11.2139 11.7179 11.1974 11.8924 11.2247C11.9604 11.235 12.0268 11.2546 12.0901 11.2818C12.2713 11.3601 12.4118 11.4991 12.4829 11.6844C12.5472 11.8517 12.5416 12.0376 12.4664 12.2008C12.3676 12.417 12.1977 12.5287 11.9825 12.609C11.9588 12.7578 12.0015 12.8304 11.8414 12.9164C11.7724 12.938 11.706 12.9359 11.6479 12.8865C11.5665 12.818 11.567 12.714 11.5588 12.6167C11.3884 12.5586 10.9977 12.3485 11.1171 12.1189C11.1423 12.069 11.1871 12.0319 11.2412 12.017C11.4718 11.9532 11.5166 12.3058 11.878 12.208C11.9655 12.1843 12.0391 12.1266 12.0834 12.0479C12.1143 11.9918 12.1302 11.9156 12.1086 11.8548C12.0175 11.5974 11.8059 11.6422 11.6103 11.6072C11.5289 11.5923 11.4507 11.564 11.3786 11.5233C10.7979 11.2015 10.9204 10.3928 11.5511 10.2301C11.5531 10.0705 11.5403 9.93768 11.7261 9.89135Z" fill="#33700E"/></svg> },
            { bg: "var(--blue-ultra-light)", title: "Für Dich da", desc: "Unser Team hilft Dir bei allen Fragen.",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.5493 1.44235H15.386C15.4503 1.46875 15.7336 1.48898 15.8286 1.50394C17.2609 1.72829 18.5481 2.50516 19.4129 3.66914C20.1194 4.63604 20.5179 5.76483 20.5127 6.96929C20.5118 7.12149 20.4836 7.28514 20.4643 7.43646C20.4388 7.64674 20.4097 7.85613 20.3789 8.06552C20.598 8.33826 20.8171 8.65675 21.0256 8.94357C21.1972 9.17936 21.4382 9.48289 21.5702 9.73891C21.6459 9.9052 21.63 10.0996 21.5649 10.2624C21.4585 10.5307 21.1057 10.7181 20.8496 10.8211C20.9227 10.9759 21.1532 11.5082 21.125 11.6692C21.0793 11.9296 20.6622 11.9921 20.5039 12.0977L20.5012 12.1153C20.5611 12.1927 20.7669 12.322 20.8549 12.4074C20.9235 12.4733 20.9781 12.5587 20.9772 12.6563C20.9763 12.8156 20.7001 13.2001 20.6235 13.4015C20.525 13.6611 20.496 13.9241 20.3209 14.1503C20.2056 14.2989 20.0437 14.4212 19.8669 14.4855C19.6038 14.5822 19.3029 14.5805 19.0267 14.5972C18.3774 14.6377 17.7166 14.6561 17.0885 14.8365C16.9943 14.8638 16.894 14.8867 16.8087 14.935C16.5606 15.074 16.1717 15.8624 15.9157 16.114C15.8611 16.1685 15.7987 16.2108 15.7212 16.2222C15.5541 16.2468 15.3623 16.2292 15.1934 16.2292L14.1499 16.2284L10.4583 16.2292C10.3668 16.3207 10.2612 16.4377 10.1327 16.4747C10.0588 16.4958 9.9902 16.4844 9.92422 16.4457C9.77289 16.3586 9.65412 16.2143 9.5283 16.0964C9.36466 15.9442 9.19838 15.7928 9.03209 15.6433C7.9209 14.6465 5.90087 12.9396 5.52255 11.4959C5.35803 10.8686 5.54807 10.1551 5.87007 9.6087C6.24575 8.9858 6.85106 8.53534 7.55578 8.3541C8.27546 8.16406 9.04177 8.27052 9.68227 8.64971C9.57757 8.3629 9.51247 8.05584 9.47112 7.75231C9.32419 6.7159 9.47551 5.65838 9.9075 4.70467C10.2497 3.9454 10.7574 3.27147 11.3917 2.73127C11.4419 2.68992 11.5017 2.6556 11.5519 2.61513C12.0789 2.19019 12.6833 1.87258 13.3317 1.68078C13.5552 1.61479 13.7584 1.5664 13.9863 1.52065C14.1147 1.49426 14.4535 1.48458 14.5493 1.44235ZM13.5305 15.5571L14.7816 15.5562C14.9919 15.5562 15.2849 15.5474 15.4881 15.5632L15.4951 15.5544C15.716 15.2676 15.9025 14.9245 16.1304 14.6377C16.4568 14.2189 17.1791 14.0887 17.6797 14.0244C18.2903 13.9461 18.9255 13.9497 19.5378 13.8802C19.8467 13.8441 19.8704 13.5186 19.947 13.281C20.0112 13.0822 20.0921 12.9176 20.1959 12.7399C19.9909 12.5657 19.756 12.4135 19.5757 12.2147C19.4842 12.1144 19.4807 11.9059 19.581 11.8117C19.7868 11.6173 20.122 11.5469 20.371 11.422C19.8924 10.28 20.0578 10.5439 20.964 10.0029C20.7784 9.77762 20.5338 9.41514 20.3552 9.16968L19.983 8.65939C19.8273 8.44472 19.6698 8.29603 19.7032 8.02329C19.7235 7.69688 19.8255 7.31329 19.8299 6.99216C19.8467 5.89856 19.4543 4.80849 18.7821 3.95244C17.8345 2.74622 16.243 2.00279 14.7024 2.11804C13.4197 2.18755 12.2161 2.7603 11.353 3.71137C10.4847 4.67388 10.0351 5.94255 10.1037 7.23675C10.1195 7.55964 10.1679 7.87988 10.2489 8.19309C10.2911 8.35146 10.358 8.53534 10.3896 8.69018C10.8902 8.31891 11.6873 8.20189 12.2979 8.29515C13.0282 8.41217 13.6827 8.81248 14.12 9.40899C14.5054 9.93951 14.7455 10.6715 14.6382 11.3305C14.4332 12.5798 12.9068 13.991 11.9979 14.8242C11.7269 15.0732 11.4586 15.3362 11.1735 15.5694C11.3187 15.5456 11.792 15.5562 11.9601 15.5562L13.5305 15.5571ZM10.0667 15.6829C10.1732 15.5553 10.2823 15.4717 10.4028 15.36L11.0856 14.7353C11.1929 14.6385 11.3653 14.4925 11.4604 14.394C11.58 14.2778 11.7093 14.1731 11.8299 14.0596C12.5108 13.4156 13.9572 12.029 13.9792 11.0665C13.9924 10.5263 13.7619 9.97822 13.3898 9.59022C12.9974 9.17848 12.4554 8.94269 11.8862 8.93741C11.5008 8.93301 11.1207 9.03155 10.7873 9.22511C10.7072 9.27085 10.6316 9.32276 10.5586 9.37995C10.4442 9.47145 10.2066 9.72571 10.0667 9.71868C9.8943 9.70988 9.64708 9.43978 9.49663 9.32628C9.16934 9.07906 8.5658 8.88286 8.15581 8.94181C7.57866 8.98404 7.05781 9.21719 6.67422 9.65709C6.32581 10.0574 6.11026 10.6029 6.14545 11.1378C6.21232 12.1443 7.86019 13.654 8.60363 14.342C8.87021 14.5884 9.13591 14.8418 9.41129 15.0793C9.63212 15.2702 9.86439 15.4717 10.0667 15.6829Z" fill="#2F5D8F"/><path d="M4.90678 17.1249C6.10947 16.6524 7.66409 16.2143 8.96356 16.5354C9.13336 16.5776 9.37531 16.6841 9.54247 16.7536L10.2745 17.0562C10.8367 17.2885 11.3997 17.5208 11.9619 17.7557C12.3262 17.9079 12.5655 18.1727 12.657 18.5589C12.8409 18.5167 13.0635 18.4868 13.2517 18.456L14.2292 18.2985L14.9805 18.1762C15.1503 18.1481 15.402 18.1014 15.5674 18.1058C15.8049 18.1111 16.0363 18.1797 16.2378 18.3047C16.5369 18.4894 16.7498 18.7859 16.8299 19.1273C16.9108 19.4757 16.8466 19.8408 16.6522 20.1408C16.4569 20.4461 16.1463 20.6538 15.7935 20.7215C15.4856 20.7813 15.1679 20.8271 14.8583 20.8772L12.9649 21.1843L11.7429 21.3822C11.5695 21.4104 11.0742 21.5019 10.9282 21.4869C10.2525 21.4183 9.57679 21.2072 8.9882 20.864C8.76121 20.7321 8.41368 20.5121 8.17174 20.447C7.82509 20.3537 7.26642 20.5059 6.95145 20.674C7.00864 20.7567 7.05438 20.8429 7.10717 20.9274C7.23826 21.135 7.29017 21.3699 7.03679 21.516C6.44028 21.8608 5.84465 22.2163 5.24023 22.548C5.22439 22.5568 5.24023 22.5471 5.22439 22.5577H5.03875C4.9798 22.5233 4.91294 22.4838 4.87511 22.4257C4.7405 22.2189 4.61733 21.9928 4.49415 21.7781L3.86509 20.6907L2.85332 18.9373C2.71079 18.6892 2.4926 18.3504 2.38614 18.0838C2.36327 18.0267 2.40286 17.9061 2.44069 17.8507C2.46796 17.812 2.50139 17.7786 2.54011 17.7513C2.78469 17.5859 3.08734 17.4381 3.34601 17.2841C3.65834 17.0967 3.98211 16.9128 4.3006 16.736C4.61996 16.5583 4.78801 16.9084 4.90678 17.1249ZM5.24199 17.7047L6.19306 19.3508C6.29511 19.5285 6.54234 19.927 6.61536 20.0951C7.13181 19.8311 7.87348 19.6402 8.42952 19.832C8.80784 19.9631 9.10961 20.1716 9.45801 20.3634C9.77914 20.5376 10.124 20.6652 10.4821 20.7409C10.5912 20.7646 10.9361 20.8288 11.0355 20.8165C11.2625 20.7892 11.5185 20.7426 11.7464 20.7057L13.0212 20.498L14.7289 20.2227C14.9867 20.1813 15.6466 20.1021 15.8392 20.0045C15.9941 19.927 16.112 19.7898 16.1639 19.6244C16.2167 19.4572 16.2008 19.276 16.119 19.1211C16.0354 18.9654 15.892 18.844 15.7222 18.7956C15.5524 18.7463 15.3747 18.7877 15.204 18.8141C14.5802 18.9293 13.9362 19.012 13.3116 19.1229C13.1593 19.1502 12.7124 19.2065 12.5919 19.2443C12.4203 19.5505 12.2391 19.7528 11.8854 19.8549C11.705 19.9068 11.515 19.9121 11.332 19.8699C11.1824 19.8355 10.8991 19.7106 10.7469 19.6473L9.79146 19.2513L8.94421 18.9003C8.79112 18.837 8.63451 18.7771 8.48759 18.7032C8.40049 18.6592 8.3345 18.5589 8.32042 18.4639C8.29755 18.3012 8.41984 18.1252 8.58261 18.0944C8.7137 18.0698 8.84039 18.1375 8.95916 18.185C9.12105 18.2528 9.28117 18.3205 9.44305 18.3865L10.878 18.9812C11.076 19.0639 11.3118 19.1757 11.515 19.225C11.7957 19.2918 12.0605 18.9883 12.0077 18.7147C11.9584 18.4578 11.7605 18.39 11.5458 18.302C11.4587 18.266 11.3725 18.2308 11.2862 18.1947L10.4232 17.8384L9.4061 17.417C9.23278 17.3448 8.96708 17.2252 8.79464 17.1803C8.50694 17.1046 8.10399 17.0782 7.80486 17.0976C7.12389 17.1433 6.58105 17.2674 5.92823 17.4697C5.72764 17.5322 5.42587 17.6545 5.24199 17.7047ZM3.16829 18.156C3.28882 18.3381 3.42607 18.5889 3.53693 18.7815L4.14487 19.8364L4.88215 21.1121C5.00092 21.3189 5.15489 21.5723 5.2631 21.7817C5.38012 21.6954 5.57807 21.5872 5.70828 21.5124L6.43412 21.0945C6.24848 20.813 6.01885 20.3881 5.84641 20.0889L4.69739 18.0997C4.64812 18.0152 4.38242 17.526 4.33755 17.4856C3.96275 17.6976 3.5422 17.958 3.16829 18.156Z" fill="#2F5D8F"/></svg> },
          ].map((item, i) => (
            <div key={i} style={{ background: "white", border: "1px solid var(--grey-bg)", borderRadius: 14, padding: "16px 14px", flexShrink: 0, width: 172, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--black)", margin: 0, lineHeight: 1.4 }}>{item.title}</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ähnliche Fachkräfte — horizontal slider */}
      <div style={{ borderTop: "1px solid var(--grey-bg)", paddingTop: 24, marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0 16px" }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: "var(--black)", margin: 0 }}>Ähnliche Fachkräfte</h2>
          <a href="/fachkraefte" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta)", textDecoration: "none", fontWeight: 500 }}>Alle →</a>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingLeft: 16, paddingRight: 16, paddingBottom: 4, scrollbarWidth: "none" as const }}>
          {similar.map(s => {
            const sAvail = availColors[s.availability] ?? availColors.later;
            return (
              <a key={s.id} href={`/fachkraefte/${s.id}`} style={{ textDecoration: "none", display: "block", background: "white", border: "1px solid var(--grey-bg)", borderRadius: 14, overflow: "hidden", flexShrink: 0, width: 190 }}>
                {/* Photo */}
                <div style={{ width: "100%", height: 130, overflow: "hidden" }}>
                  <img src={s.photo} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                </div>
                {/* Info */}
                <div style={{ padding: "10px 12px 0" }}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, color: "var(--black)", margin: "0 0 2px", lineHeight: 1.3 }}>{s.name}</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", margin: "0 0 8px", lineHeight: 1.4 }}>{s.role}</p>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                    {(s.angebot === "online" || s.angebot === "beides") && <span style={{ padding: "2px 7px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "var(--cta)", border: "1.5px solid var(--cta)" }}>Online</span>}
                    {(s.angebot === "vor-ort" || s.angebot === "beides") && <span style={{ padding: "2px 7px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "#B07000", border: "1.5px solid #D4920A" }}>Vor Ort</span>}
                  </div>
                </div>
                {/* Footer */}
                <div style={{ borderTop: "1px solid var(--grey-bg)", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, color: "var(--black)", whiteSpace: "nowrap" }}>€{s.price} <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 11, color: "var(--grey-text)" }}>/Sitz.</span></span>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: sAvail.text, fontWeight: 500, textAlign: "right", lineHeight: 1.3 }}>{sAvail.label}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ── Slot helpers ──
function generateSlots(availability: string) {
  const today = "Heute";
  const tomorrow = "Morgen";
  if (availability === "today") {
    return [
      { day: today,    time: "16:00" },
      { day: today,    time: "18:00" },
      { day: tomorrow, time: "10:00" },
      { day: tomorrow, time: "14:00" },
      { day: tomorrow, time: "16:00" },
      { day: "Mi.",    time: "09:00" },
    ];
  } else if (availability === "thisweek") {
    return [
      { day: tomorrow, time: "10:00" },
      { day: tomorrow, time: "15:00" },
      { day: "Mi.",    time: "09:00" },
      { day: "Mi.",    time: "13:00" },
      { day: "Do.",    time: "11:00" },
    ];
  } else {
    return [
      { day: "Mo.",    time: "10:00" },
      { day: "Mo.",    time: "14:00" },
      { day: "Di.",    time: "09:00" },
      { day: "Di.",    time: "16:00" },
      { day: "Mi.",    time: "11:00" },
    ];
  }
}

// ── Booking Widget ──
function MobilePhotoActions({ t }: { t: NonNullable<ReturnType<typeof therapists.find>> }) {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <button style={{ position: "absolute", top: 12, left: 12, zIndex: 10, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "none", borderRadius: 9999, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="17" height="17" fill="none" viewBox="0 0 24 24"><path stroke="var(--cta)" strokeWidth="1.7" strokeLinecap="round" d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M16 6l-4-4-4 4M12 2v13"/></svg>
      </button>
      <button onClick={() => setSaved(s => !s)} style={{ position: "absolute", top: 12, right: 12, zIndex: 10, background: saved ? "rgba(255,235,235,0.9)" : "rgba(255,255,255,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "none", borderRadius: 9999, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="17" height="17" fill={saved ? "var(--cta-brand)" : "none"} viewBox="0 0 24 24"><path stroke={saved ? "var(--cta-brand)" : "var(--cta)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </>
  );
}

function MobileBookingSection({ t }: { t: NonNullable<ReturnType<typeof therapists.find>> }) {
  const firstSlot = generateSlots(t.availability)[0];

  return (
    <div style={{ padding: "0 16px 32px" }}>
      {/* Next slot */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--blue-ultra-light)", border: "1px solid #BFDDFF", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="var(--cta)" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)", fontWeight: 400 }}>
          Nächster freier Termin: <strong style={{ fontWeight: 600, color: "var(--cta)" }}>{firstSlot.day}, {firstSlot.time} Uhr</strong>
        </span>
      </div>

      {/* CTA */}
      <a href={`/buchen/${t.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "var(--cta)", color: "white", border: "none", borderRadius: 9999, padding: "15px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, textDecoration: "none", boxSizing: "border-box" }}>
        Termin buchen
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 10 }}>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="var(--grey-text)" strokeWidth="1.6" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)" }}>In nur 2 Minuten reservieren</span>
      </div>
    </div>
  );
}

function BookingWidget({ t, avail }: { t: ReturnType<typeof therapists.find>; avail: { dot: string; text: string; label: string } }) {
  const [saved, setSaved] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(0);
  if (!t) return null;

  const allSlots = generateSlots(t.availability);
  const visibleSlots = allSlots.slice(0, 3);
  const selected = allSlots[selectedSlot];

  // Design tokens
  const R = { s: 4, m: 8, L: 12, XL: 16, XXL: 24, circle: 9999 };
  const C = { cta: "var(--cta)", ctaHover: "var(--cta-hover)", black: "var(--black)", greyText: "var(--grey-text)", greyBg: "var(--grey-bg)", greyBorder: "var(--grey-border)", ultraLight: "var(--blue-ultra-light)" };

  return (
    <div style={{ background: "white", border: `1px solid ${C.greyBg}`, borderRadius: R.XXL, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>

      {/* ── Header: price + next appointment + actions ── */}
      <div style={{ padding: "24px 24px 16px", borderBottom: `1px solid ${C.greyBg}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          {/* Price */}
          <div>
            {/* H4 token: Poppins Medium 24px */}
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 24, color: C.black, lineHeight: 1.3 }}>€{t.price}</span>
            {/* body-S-reg: Poppins Regular 14px */}
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: C.greyText, marginLeft: 6 }}>/ {t.sessionDuration ?? 50} Min.</span>
          </div>
          {/* Action icons — outlined, blue hover */}
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ background: "white", border: `1.5px solid ${C.greyBg}`, borderRadius: R.m, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.ultraLight; e.currentTarget.style.borderColor = C.cta; (e.currentTarget.querySelector("svg path") as SVGPathElement).style.stroke = C.cta; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = C.greyBg; (e.currentTarget.querySelector("svg path") as SVGPathElement).style.stroke = C.greyText; }}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke={C.greyText} strokeWidth="1.7" strokeLinecap="round" d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </button>
            <button onClick={() => setSaved(s => !s)} style={{ background: saved ? "#FFF0F0" : "white", border: saved ? "1.5px solid var(--cta-brand)" : `1.5px solid ${C.greyBg}`, borderRadius: R.m, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.18s" }}
              onMouseEnter={e => { if (!saved) { e.currentTarget.style.background = C.ultraLight; e.currentTarget.style.borderColor = C.cta; }}}
              onMouseLeave={e => { if (!saved) { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = C.greyBg; }}}
            >
              <svg width="15" height="15" fill={saved ? "var(--cta-brand)" : "none"} viewBox="0 0 24 24"><path stroke={saved ? "var(--cta-brand)" : C.greyText} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.greyBg}`, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { path: <><rect x="3" y="4" width="18" height="18" rx="2" stroke="var(--cta)" strokeWidth="1.6"/><path stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/></>, text: "Flexible Terminplanung" },
          { path: <><circle cx="12" cy="12" r="9" stroke="var(--cta)" strokeWidth="1.6"/><path stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" d="M9 12l2 2 4-4"/></>, text: "Erstgespräch inkl. 15 Min. kostenlos" },
          { path: <><path stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 21c0 0-7-5.686-7-10.5a7 7 0 1 1 14 0C19 15.314 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.5" stroke="var(--cta)" strokeWidth="1.6"/></>, text: t.angebot === "online" ? "Online-Sitzung" : t.angebot === "vor-ort" ? "Vor-Ort-Sitzung" : "Online & Vor Ort" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Icon badge — radius-m, 36px */}
            <div style={{ width: 36, height: 36, borderRadius: R.m, background: C.ultraLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24">{f.path}</svg>
            </div>
            {/* body-S-reg */}
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: C.greyText }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* ── Next slot ── */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.greyBg}` }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, color: C.greyText, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Nächster Termin</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.ultraLight, border: `1px solid #BFDDFF`, borderRadius: R.m, padding: "12px 14px" }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke={C.cta} strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke={C.cta} strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: C.black, fontWeight: 400 }}>
            <strong style={{ fontWeight: 600, color: C.cta }}>{allSlots[0].day}</strong>, {allSlots[0].time} Uhr
          </span>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: "16px 24px" }}>
        {/* Button-L: Poppins Medium 16px, padding 12/24, radius-circle */}
        <a href={`/buchen/${t!.id}`} style={{ width: "100%", background: C.cta, color: "white", border: "none", borderRadius: R.circle, padding: "12px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: `background 0.2s`, textDecoration: "none", boxSizing: "border-box" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = C.cta)}
        >
          Termin buchen
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        {/* caption token */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 10 }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke={C.greyText} strokeWidth="1.6" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 11, color: C.greyText }}>In nur 2 Minuten reservieren</span>
        </div>
      </div>
    </div>
  );
}

// ── Lookup tables for InfoCard rich descriptions ──
const tagDetails: Record<string, string> = {
  "Angststörungen": "Panik, soziale Angst und Phobien",
  "Depression": "Stimmungstiefs und Antriebslosigkeit",
  "Trauma": "PTBS und Belastungsreaktionen",
  "Beziehungsprobleme": "Paarkonflikte und Bindungsthemen",
  "Panikattacken": "körperliche und psychische Symptome",
  "Burnout": "chronische Erschöpfung und Stressabbau",
  "Essstörungen": "Anorexie, Bulimie und Binge-Eating",
  "Sucht": "Verhaltens- und Substanzabhängigkeit",
  "Persönlichkeitsstörungen": "BPS und narzisstische Muster",
  "Schlafstörungen": "Ein- und Durchschlafprobleme",
  "ADHS": "Konzentration und Impulsivität",
  "Zwangsstörungen": "OCD und repetitive Gedanken",
  "Trauer": "Verlustverarbeitung und Abschiednehmen",
};
const arbeitswDetails: Record<string, string> = {
  "Empathisch": "wertschätzend und ohne Urteil",
  "Strukturiert": "mit klaren Schritten und Zielen",
  "Evidenzbasiert": "wissenschaftlich fundierte Methoden",
  "Lösungsorientiert": "Fokus auf konkrete Veränderung",
  "Systemisch": "Familie und soziales Umfeld einbeziehend",
  "Ressourcenorientiert": "vorhandene Stärken nutzen",
  "Praktisch": "mit Übungen für den Alltag",
  "Unterstützend": "begleitend und stabilisierend",
  "Ganzheitlich": "Körper, Geist und Seele",
  "Praxisnah": "konkrete Alltagshilfe",
  "Lösungsfokussiert": "kurzzeit und effektiv",
  "Wertfrei": "offene und akzeptierende Haltung",
  "Ermutigend": "motivierend und bestärkend",
  "Reflektierend": "Selbsterkenntnis fördernd",
  "Einfühlsam": "mit tiefem Verständnis",
  "Tiefgreifend": "Ursachen und Hintergründe ergründend",
};
const langDetails: Record<string, string> = {
  "Deutsch": "Muttersprache",
  "Englisch": "fließend",
  "Türkisch": "fließend",
  "Bosnisch": "fließend",
  "Kroatisch": "fließend",
  "Serbisch": "fließend",
  "Russisch": "fließend",
  "Französisch": "fortgeschritten",
  "Spanisch": "fortgeschritten",
  "Arabisch": "fließend",
  "Persisch": "fließend",
};

// ── Mobile Accordion Section: "Kann ich helfen" ──

function MobileAccordionSection({ t }: { t: NonNullable<ReturnType<typeof therapists.find>> }) {
  const cards = [
    {
      iconEl: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.40095 6.49999C6.15928 6.08048 6.02273 5.60872 6.00295 5.12499C5.98511 4.72542 6.04735 4.32631 6.186 3.95114C6.32466 3.57597 6.53694 3.23232 6.81035 2.94039C7.08377 2.64847 7.4128 2.41416 7.77809 2.25126C8.14338 2.08835 8.53756 2.00014 8.93745 1.9918C9.33733 1.98347 9.73485 2.05518 10.1066 2.20272C10.4784 2.35026 10.8169 2.57065 11.1022 2.85093C11.3876 3.13122 11.614 3.46572 11.7681 3.83479C11.9223 4.20385 12.0011 4.60002 12 4.99999M12 4.99999V18M17.599 6.49999C17.841 6.08057 17.9769 5.60881 17.997 5.12499C18.0148 4.72542 17.9526 4.32631 17.8139 3.95114C17.6752 3.57597 17.463 3.23232 17.1896 2.94039C16.9161 2.64847 16.5871 2.41416 16.2218 2.25126C15.8565 2.08835 15.4623 2.00014 15.0625 1.9918C14.6626 1.98347 14.2651 2.05518 13.8933 2.20272C13.5215 2.35026 13.183 2.57065 12.8977 2.85093C12.6123 3.13122 12.3859 3.46572 12.2318 3.83479C12.0776 4.20385 11.9988 4.60002 12 4.99999M6.00295 5.12499C5.41515 5.27613 4.86945 5.55904 4.40718 5.9523C3.94491 6.34556 3.57819 6.83886 3.3348 7.39484C3.0914 7.95081 2.97771 8.55488 3.00234 9.1613C3.02697 9.76772 3.18927 10.3606 3.47695 10.895M4.06195 10.5C3.85565 10.6145 3.65989 10.746 3.47695 10.895C2.97113 11.3059 2.57338 11.8342 2.31829 12.4339C2.0632 13.0336 1.95851 13.6866 2.01332 14.336C2.06812 14.9854 2.28077 15.6115 2.63276 16.16C2.98475 16.7085 3.46542 17.1626 4.03295 17.483M4.03295 17.483C3.96287 18.0252 4.00469 18.5761 4.15584 19.1015C4.30699 19.627 4.56425 20.1158 4.91174 20.5379C5.25923 20.9601 5.68956 21.3065 6.17617 21.5557C6.66278 21.805 7.19533 21.9519 7.74093 21.9873C8.28653 22.0227 8.83359 21.9459 9.34834 21.7616C9.86309 21.5773 10.3346 21.2894 10.7337 20.9157C11.1328 20.5421 11.4511 20.0906 11.6689 19.5891C11.8867 19.0876 11.9994 18.5467 12 18M4.03295 17.483C4.63322 17.8216 5.31078 18.0003 5.99995 18M12 18C12.0005 18.5467 12.1132 19.0876 12.331 19.5891C12.5488 20.0906 12.8671 20.5421 13.2662 20.9157C13.6653 21.2894 14.1368 21.5773 14.6516 21.7616C15.1663 21.9459 15.7134 22.0227 16.259 21.9873C16.8046 21.9519 17.3371 21.805 17.8237 21.5557C18.3103 21.3065 18.7407 20.9601 19.0882 20.5379C19.4357 20.1158 19.6929 19.627 19.8441 19.1015C19.9952 18.5761 20.037 18.0252 19.967 17.483M17.997 5.12499C18.5848 5.27613 19.1305 5.55904 19.5927 5.9523C20.055 6.34556 20.4217 6.83886 20.6651 7.39484C20.9085 7.95081 21.0222 8.55488 20.9976 9.1613C20.9729 9.76772 20.8106 10.3606 20.523 10.895M19.938 10.5C20.1442 10.6145 20.34 10.746 20.523 10.895C21.0288 11.3059 21.4265 11.8342 21.6816 12.4339C21.9367 13.0336 22.0414 13.6866 21.9866 14.336C21.9318 14.9854 21.7191 15.6115 21.3671 16.16C21.0152 16.7085 20.5345 17.1626 19.967 17.483M19.967 17.483C19.3667 17.8216 18.6891 18.0003 18 18M15 13C14.1604 12.7046 13.4273 12.167 12.8933 11.455C12.3593 10.743 12.0484 9.88866 12 8.99999C11.9515 9.88866 11.6406 10.743 11.1066 11.455C10.5726 12.167 9.83951 12.7046 8.99995 13" stroke="#2D5B8D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      iconBg: "var(--blue-ultra-light)",
      title: "Hilft bei",
      items: t.tags.map(tag => ({ bold: tag, detail: tagDetails[tag] ?? "Spezialisierter Schwerpunkt" })),
    },
    {
      iconEl: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#B07000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 0 0-7 7c0 2.49 1.3 4.68 3.25 5.93V17a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-2.07A7 7 0 0 0 12 2z"/><path stroke="#B07000" strokeWidth="1.6" strokeLinecap="round" d="M9 21h6"/><path stroke="#B07000" strokeWidth="1.4" strokeLinecap="round" d="M9.5 18.5v2.5M14.5 18.5v2.5"/></svg>,
      iconBg: "var(--yellow-light)",
      title: "Arbeitsweise",
      items: (t.arbeitsweise ?? ["Empathisch", "Strukturiert", "Lösungsorientiert"]).map(w => ({ bold: w, detail: arbeitswDetails[w] ?? "Individuell angepasst" })),
    },
    {
      iconEl: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--green)" strokeWidth="1.6"/><path stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" d="M8 21h8M12 17v4"/></svg>,
      iconBg: "var(--green-light)",
      title: "Sitzungsformat",
      items: [...(t.angebot === "online" || t.angebot === "beides" ? [{ bold: "Online per Video", detail: "Flexibel von zuhause" }] : []), ...(t.angebot === "vor-ort" || t.angebot === "beides" ? [{ bold: "Vor Ort in der Praxis", detail: "persönlich und vertraulich" }] : []), { bold: "50 Min. Sitzung", detail: "Standarddauer" }, { bold: "Erstgespräch kostenlos", detail: "15 Min. unverbindlich" }],
    },
    {
      iconEl: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#2D5B8D" strokeWidth="1.6"/><path stroke="#2D5B8D" strokeWidth="1.6" strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      iconBg: "var(--blue-ultra-light)",
      title: "Sprachen",
      items: t.languages.map(l => ({ bold: l, detail: langDetails[l] ?? "Sitzungssprache verfügbar" })),
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ borderTop: "1px solid var(--grey-bg)", borderBottom: "1px solid var(--grey-bg)", padding: "24px 16px", marginBottom: 40 }}>
      <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: "var(--black)", margin: "0 0 4px" }}>Kann ich Dir bei Deinem Anliegen helfen?</h2>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", margin: "0 0 20px" }}>Schau Dir an, worin ich Erfahrung habe und wie ich arbeite.</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {cards.map((card, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderTop: i > 0 ? "1px solid var(--grey-bg)" : "none" }}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "16px 0", display: "flex", alignItems: "center", gap: 12,
                  textAlign: "left",
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 9999, background: card.iconBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {card.iconEl}
                </div>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--black)", flex: 1 }}>{card.title}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M6 9l6 6 6-6" stroke="var(--grey-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isOpen && (
                <div style={{ paddingBottom: 16, paddingLeft: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {card.items.map((item, j) => {
                    const isRich = typeof item === "object";
                    return (
                      <div key={j} style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, lineHeight: 1.5 }}>
                        <span style={{ fontWeight: isRich ? 500 : 400, color: "var(--black)" }}>
                          {isRich ? item.bold : item}
                        </span>
                        {isRich && item.detail && (
                          <span style={{ fontWeight: 400, color: "var(--grey-text)" }}>{", "}{item.detail}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Info Card ──
type InfoItem = string | { bold: string; detail?: string };
function InfoCard({ iconEl, iconBg, title, items, maxVisible = 4 }: {
  iconEl: React.ReactNode;
  iconBg: string;
  title: string;
  items: InfoItem[];
  maxVisible?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, maxVisible);
  const extra = items.length - maxVisible;
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      {/* Icon circle — radius-circle, 52px */}
      <div style={{ width: 52, height: 52, borderRadius: 9999, background: iconBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {iconEl}
      </div>
      <div style={{ paddingTop: 2 }}>
        {/* body-S-med: Medium 14px */}
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, color: "var(--black)", margin: "0 0 8px" }}>{title}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {visible.map((item, i) => {
            const isRich = typeof item === "object";
            return (
              <div key={i} style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ fontWeight: isRich ? 500 : 400, color: "var(--black)" }}>
                  {isRich ? item.bold : item}
                </span>
                {isRich && item.detail && (
                  <span style={{ fontWeight: 400, color: "var(--grey-text)" }}>
                    {", "}{item.detail}
                  </span>
                )}
              </div>
            );
          })}
          {!expanded && extra > 0 && (
            <button onClick={() => setExpanded(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, color: "var(--cta)", marginTop: 2 }}>
              +{extra} weitere
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
