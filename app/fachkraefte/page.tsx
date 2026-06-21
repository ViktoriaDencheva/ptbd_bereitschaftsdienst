"use client";
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(0); // 0 = mobile-first (filters hidden until hydration)
  useEffect(() => {
    setWidth(window.innerWidth);
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return width;
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Mock data ──────────────────────────────────────────────
const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Müller",
    role: "Klinische Psychologin",
    roleIcon: "/icons/role-brain.svg",
    photo: "/fachkraefte/fachkraft-1.jpg",
    experience: 12,
    location: "Wien",
    stars: 4.9,
    reviewCount: 32,
    languages: ["Deutsch", "Englisch"],
    tags: ["Angststörungen", "Depression", "Trauma", "Beziehungsprobleme", "Panikattacken"],
    kassenerstattung: true,
    verified: true,
    price: 85,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 16:00",
    angebot: "beides",
  },
  {
    id: 2,
    name: "Michael Weber",
    role: "Psychologischer Psychotherapeut",
    roleIcon: "/icons/role-hilfe.svg",
    photo: "/fachkraefte/fachkraft-2.jpg",
    experience: 8,
    location: "Graz",
    stars: 4.8,
    reviewCount: 18,
    languages: ["Deutsch", "Französisch"],
    tags: ["Angststörungen", "Stress", "Burnout", "Selbstwertprobleme"],
    kassenerstattung: true,
    verified: true,
    price: 75,
    availability: "later",
    availabilityText: "Nächster Termin in 2 Wochen",
    nextAppointment: "28. Mai, 10:00",
    angebot: "online",
  },
  {
    id: 3,
    name: "Dr. Anna Schmidt",
    role: "Fachärztin für Psychiatrie",
    roleIcon: "/icons/role-psychotherapie.svg",
    photo: "/fachkraefte/fachkraft-3.jpg",
    experience: 15,
    location: "Salzburg",
    stars: 4.9,
    reviewCount: 27,
    languages: ["Deutsch", "Englisch", "Italienisch"],
    tags: ["Trauma", "PTBS", "Angststörungen", "Depression"],
    kassenerstattung: true,
    verified: true,
    price: 95,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Fr. 16. Mai, 14:00",
    angebot: "vor-ort",
  },
  {
    id: 4,
    name: "Thomas Becker",
    role: "Lebens- und Sozialberater",
    roleIcon: "/icons/role-herz.svg",
    photo: "/fachkraefte/fachkraft-4.jpg",
    experience: 6,
    location: "Linz",
    stars: 4.7,
    reviewCount: 14,
    languages: ["Deutsch"],
    tags: ["Burnout", "Work-Life-Balance", "Lebensübergänge", "Stressbewältigung"],
    kassenerstattung: true,
    verified: true,
    price: 70,
    availability: "thisweek",
    availabilityText: "Nächster Termin in 1 Woche",
    nextAppointment: "Mi. 21. Mai, 11:00",
    angebot: "beides",
  },
  {
    id: 5,
    name: "Julia Berger",
    role: "Psychologin (M.Sc.)",
    roleIcon: "/icons/role-brain.svg",
    photo: "/fachkraefte/fachkraft-5.jpg",
    experience: 5,
    location: "Wien",
    stars: 4.6,
    reviewCount: 11,
    languages: ["Deutsch", "Englisch"],
    tags: ["Selbstwert", "Persönlichkeitsentwicklung", "Stress"],
    kassenerstattung: false,
    verified: true,
    price: 80,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 18:00",
    angebot: "online",
  },
  {
    id: 6,
    name: "Markus Hofmann",
    role: "Diplom-Psychologe",
    roleIcon: "/icons/role-hilfe.svg",
    photo: "/fachkraefte/fachkraft-6.jpg",
    experience: 10,
    location: "Innsbruck",
    stars: 4.8,
    reviewCount: 23,
    languages: ["Deutsch"],
    tags: ["Depression", "Lebenskrisen", "Trauer"],
    kassenerstattung: true,
    verified: true,
    price: 90,
    availability: "later",
    availabilityText: "Nächster Termin in 3 Wochen",
    nextAppointment: "2. Jun, 09:00",
    angebot: "vor-ort",
  },
  {
    id: 7,
    name: "Sophia Gruber",
    role: "Psychologin (M.Sc.)",
    photo: "/fachkraefte/fachkraft-1.jpg",
    experience: 4,
    location: "Wien",
    stars: 4.7,
    reviewCount: 9,
    languages: ["Deutsch", "Englisch"],
    tags: ["Selbstwert", "Angst", "Stress", "Beziehungen"],
    kassenerstattung: false,
    verified: true,
    price: 75,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 19:00",
    angebot: "online",
  },
  {
    id: 8,
    name: "Dr. Klaus Wagner",
    role: "Facharzt für Psychiatrie",
    photo: "/fachkraefte/fachkraft-2.jpg",
    experience: 20,
    location: "Graz",
    stars: 4.9,
    reviewCount: 41,
    languages: ["Deutsch"],
    tags: ["Depression", "Bipolore Störung", "Schizophrenie", "Medikation"],
    kassenerstattung: true,
    verified: true,
    price: 120,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Do. 22. Mai, 10:00",
    angebot: "vor-ort",
  },
  {
    id: 9,
    name: "Elena Koch",
    role: "Psychotherapeutin",
    photo: "/fachkraefte/fachkraft-3.jpg",
    experience: 9,
    location: "Salzburg",
    stars: 4.8,
    reviewCount: 22,
    languages: ["Deutsch", "Englisch", "Russisch"],
    tags: ["Trauma", "PTBS", "Essstörungen", "Angststörungen"],
    kassenerstattung: true,
    verified: true,
    price: 95,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Mi. 21. Mai, 15:00",
    angebot: "beides",
  },
  {
    id: 10,
    name: "Felix Maier",
    role: "Lebens- und Sozialberater",
    photo: "/fachkraefte/fachkraft-4.jpg",
    experience: 3,
    location: "Wien",
    stars: 4.6,
    reviewCount: 7,
    languages: ["Deutsch"],
    tags: ["Work-Life-Balance", "Burnout", "Karriere", "Lebensveränderung"],
    kassenerstattung: false,
    verified: false,
    price: 65,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 17:30",
    angebot: "online",
  },
  {
    id: 11,
    name: "Dr. Christine Steiner",
    role: "Klinische Psychologin",
    photo: "/fachkraefte/fachkraft-5.jpg",
    experience: 14,
    location: "Innsbruck",
    stars: 4.8,
    reviewCount: 31,
    languages: ["Deutsch", "Englisch"],
    tags: ["Depression", "Angststörungen", "Schlafstörungen", "Chronischer Stress"],
    kassenerstattung: true,
    verified: true,
    price: 90,
    availability: "later",
    availabilityText: "Nächster Termin in 2 Wochen",
    nextAppointment: "3. Jun, 11:00",
    angebot: "beides",
  },
  {
    id: 12,
    name: "Robert Huber",
    role: "Diplom-Psychologe",
    photo: "/fachkraefte/fachkraft-6.jpg",
    experience: 7,
    location: "Linz",
    stars: 4.7,
    reviewCount: 16,
    languages: ["Deutsch"],
    tags: ["Paarkonflikte", "Trennungsschmerz", "Lebenskrisen"],
    kassenerstattung: false,
    verified: true,
    price: 75,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Di. 20. Mai, 13:00",
    angebot: "vor-ort",
  },
  {
    id: 13,
    name: "Laura Fischer",
    role: "Psychologin (M.Sc.)",
    photo: "/fachkraefte/fachkraft-1.jpg",
    experience: 3,
    location: "Wien",
    stars: 4.5,
    reviewCount: 8,
    languages: ["Deutsch", "Englisch"],
    tags: ["Studiumsstress", "Selbstwert", "Soziale Angst"],
    kassenerstattung: false,
    verified: true,
    price: 65,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 20:00",
    angebot: "online",
  },
  {
    id: 14,
    name: "Dr. Martin Wolf",
    role: "Facharzt für Psychiatrie",
    photo: "/fachkraefte/fachkraft-2.jpg",
    experience: 22,
    location: "Wien",
    stars: 5.0,
    reviewCount: 54,
    languages: ["Deutsch", "Englisch"],
    tags: ["ADHS", "Autismus-Spektrum", "Angststörungen", "Depression", "Persönlichkeitsstörungen"],
    kassenerstattung: true,
    verified: true,
    price: 130,
    availability: "later",
    availabilityText: "Nächster Termin in 3 Wochen",
    nextAppointment: "5. Jun, 09:00",
    angebot: "vor-ort",
  },
  {
    id: 15,
    name: "Nina Brunner",
    role: "Psychotherapeutin",
    photo: "/fachkraefte/fachkraft-3.jpg",
    experience: 11,
    location: "Graz",
    stars: 4.8,
    reviewCount: 26,
    languages: ["Deutsch", "Spanisch"],
    tags: ["Bindungsangst", "Beziehungsprobleme", "Trauma", "Selbstwert"],
    kassenerstattung: true,
    verified: true,
    price: 85,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Fr. 23. Mai, 10:00",
    angebot: "beides",
  },
  {
    id: 16,
    name: "Andreas Keller",
    role: "Lebens- und Sozialberater",
    photo: "/fachkraefte/fachkraft-4.jpg",
    experience: 5,
    location: "Wien",
    stars: 4.6,
    reviewCount: 12,
    languages: ["Deutsch"],
    tags: ["Sinnfragen", "Lebensübergänge", "Persönlichkeitsentwicklung"],
    kassenerstattung: false,
    verified: false,
    price: 60,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 15:00",
    angebot: "online",
  },
  {
    id: 17,
    name: "Dr. Eva Zimmermann",
    role: "Fachärztin für Psychiatrie",
    photo: "/fachkraefte/fachkraft-5.jpg",
    experience: 17,
    location: "Salzburg",
    stars: 4.9,
    reviewCount: 38,
    languages: ["Deutsch", "Englisch", "Französisch"],
    tags: ["Affektive Störungen", "PTBS", "Sucht", "Angststörungen"],
    kassenerstattung: true,
    verified: true,
    price: 110,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Mo. 19. Mai, 14:00",
    angebot: "vor-ort",
  },
  {
    id: 18,
    name: "Tobias Lehner",
    role: "Psychologischer Psychotherapeut",
    photo: "/fachkraefte/fachkraft-6.jpg",
    experience: 6,
    location: "Wien",
    stars: 4.7,
    reviewCount: 15,
    languages: ["Deutsch", "Englisch"],
    tags: ["Phobien", "Zwangsstörungen", "Panikattacken", "Stress"],
    kassenerstattung: false,
    verified: true,
    price: 80,
    availability: "today",
    availabilityText: "Heute verfügbar",
    nextAppointment: "Heute, 14:00",
    angebot: "beides",
  },
  {
    id: 19,
    name: "Dr. Petra Haas",
    role: "Klinische Psychologin",
    photo: "/fachkraefte/fachkraft-1.jpg",
    experience: 16,
    location: "Wien",
    stars: 4.8,
    reviewCount: 29,
    languages: ["Deutsch", "Englisch", "Türkisch"],
    tags: ["Trauma", "Migration", "Kulturelle Identität", "Depression"],
    kassenerstattung: true,
    verified: true,
    price: 95,
    availability: "thisweek",
    availabilityText: "Verfügbar diese Woche",
    nextAppointment: "Di. 20. Mai, 16:00",
    angebot: "online",
  },
  {
    id: 20,
    name: "Simon Moser",
    role: "Psychologischer Psychotherapeut",
    photo: "/fachkraefte/fachkraft-2.jpg",
    experience: 8,
    location: "Linz",
    stars: 4.7,
    reviewCount: 19,
    languages: ["Deutsch"],
    tags: ["Sucht", "Abhängigkeit", "Depression", "Burnout"],
    kassenerstattung: true,
    verified: true,
    price: 80,
    availability: "later",
    availabilityText: "Nächster Termin in 2 Wochen",
    nextAppointment: "2. Jun, 13:00",
    angebot: "vor-ort",
  },
];

// â"€â"€â"€ Stars â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFBB27">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, color: "var(--black)" }}>{rating}</span>
      <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 13, color: "var(--grey-text)" }}>({count} Bewertungen)</span>
    </div>
  );
}

// â"€â"€â"€ Availability dot colors â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const availColors: Record<string, { dot: string; text: string }> = {
  today:    { dot: "#33700E", text: "#33700E" },
  thisweek: { dot: "#B8860B", text: "#8B6914" },
  later:    { dot: "#888",    text: "#555" },
};

// â"€â"€â"€ Filter Sidebar â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
interface FilterProps {
  suche: string; setSuche: (v: string) => void;
  fachrichtung: string; setFachrichtung: (v: string) => void;
  angebot: string[]; toggleAngebotProp: (v: string) => void;
  kasse: boolean; setKasse: (v: boolean) => void;
  verfuegbarkeit: string; setVerfuegbarkeit: (v: string) => void;
  preisMin: number; setPreisMin: (v: number) => void;
  preisMax: number; setPreisMax: (v: number) => void;
  sprachen: string[]; toggleSpracheProp: (v: string) => void;
  standort: string; setStandort: (v: string) => void;
  onReset: () => void;
  resultCount: number;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

function FilterSidebar({ suche, setSuche, fachrichtung, setFachrichtung, angebot, toggleAngebotProp, kasse, setKasse, verfuegbarkeit, setVerfuegbarkeit, preisMin, setPreisMin, preisMax, setPreisMax, sprachen, toggleSpracheProp, standort, setStandort, onReset, resultCount, isMobile = false, isOpen = false, onClose }: FilterProps) {
  const [showMoreFach, setShowMoreFach] = useState(false);
  const [open, setOpen] = useState({ suche: true, fachrichtung: true, angebot: true, krankenkasse: true, verfuegbarkeit: true, standort: true, sprache: true, preis: true });
  const toggle = (key: keyof typeof open) => setOpen(o => ({ ...o, [key]: !o[key] }));

  const fachItems = ["Psycholog*in", "Psychotherapeut*in", "Psychiater*in"];
  const fachItemsMore = ["Lebens- & Sozialberater*in"];

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13,
    color: "var(--grey-text)", letterSpacing: "0.05em", textTransform: "uppercase",
    marginBottom: 8, display: "block",
  };

  const SectionHeader = ({ label, sectionKey }: { label: string; sectionKey: keyof typeof open }) => {
    if (isMobile) return <span style={labelStyle}>{label}</span>;
    return (
      <button onClick={() => toggle(sectionKey)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, marginBottom: 8,
      }}>
        <span style={{ ...labelStyle, marginBottom: 0 }}>{label}</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
          style={{ transition: "transform 0.2s", transform: open[sectionKey] ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
          <path stroke="#9BAAB8" strokeWidth="1.8" strokeLinecap="round" d="M6 9l6 6 6-6"/>
        </svg>
      </button>
    );
  };

  if (isMobile && !isOpen) return null;

  return (
    <>
    {isMobile && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 99 }} />}
    <aside style={{
      width: isMobile ? "100%" : 320,
      maxWidth: isMobile ? "100%" : "none",
      flexShrink: 0,
      borderRight: isMobile ? "none" : "1px solid #E8EDF2",
      paddingRight: isMobile ? 0 : 24,
      display: "flex", flexDirection: "column",
      alignSelf: "flex-start",
      position: isMobile ? "fixed" : "sticky",
      bottom: isMobile ? 0 : "auto",
      left: isMobile ? 0 : "auto",
      right: isMobile ? 0 : "auto",
      top: isMobile ? "auto" : 80,
      zIndex: isMobile ? 100 : "auto",
      background: "white",
      borderRadius: isMobile ? "20px 20px 0 0" : 0,
      boxShadow: isMobile ? "0 -4px 32px rgba(0,0,0,0.15)" : "none",
      maxHeight: isMobile ? "85vh" : "none",
      overflow: "hidden",
    }}>
      {/* Sticky header — always visible */}
      <div style={{
        flexShrink: 0,
        padding: isMobile ? "20px 16px 14px" : "0 0 14px 0",
        borderBottom: isMobile ? "1px solid #F0F0F0" : "none",
        background: "white",
        borderRadius: isMobile ? "20px 20px 0 0" : 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {isMobile && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--grey-text)", display: "flex", alignItems: "center" }}><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg></button>}
          <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 17, color: "var(--black)", margin: 0 }}>Filter</h3>
          <button onClick={onReset} style={{ background: "none", border: "none", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta)", cursor: "pointer", padding: 0, fontWeight: 500 }}>
            Zurücksetzen
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "16px 16px 0" : "0 20px 24px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Suche */}
          <div>
            <SectionHeader label="Suche" sectionKey="suche" />
            {(isMobile || open.suche) && <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width="15" height="15" fill="none" viewBox="0 0 24 24">
                <path stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
              <input
                placeholder="Name oder Fachgebiet..."
                value={suche}
                onChange={e => setSuche(e.target.value)}
                style={{ width: "100%", height: 44, borderRadius: 9999, border: "1.5px solid var(--grey-border)", padding: "0 12px 0 34px", fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "var(--black)", background: "white", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--blue-ultra-light)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--grey-border)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Fachrichtung */}
          <div>
            <SectionHeader label="Fachrichtung" sectionKey="fachrichtung" />
            {(isMobile || open.fachrichtung) && <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Alle", ...fachItems, ...(fachItemsMore.length >= 3 ? (showMoreFach ? fachItemsMore : []) : fachItemsMore)].map(f => (
                <button key={f} onClick={() => setFachrichtung(f)} style={{
                  padding: "6px 12px", borderRadius: 9999,
                  border: fachrichtung === f ? "1.5px solid var(--cta)" : "1.5px solid #E0E0E0",
                  background: fachrichtung === f ? "var(--blue-ultra-light)" : "white",
                  fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: fachrichtung === f ? 600 : 400,
                  color: fachrichtung === f ? "var(--cta)" : "var(--grey-text)",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget; if (fachrichtung !== f) { el.style.borderColor = "var(--cta)"; el.style.color = "var(--cta)"; }}}
                  onMouseLeave={e => { const el = e.currentTarget; if (fachrichtung !== f) { el.style.borderColor = "#E0E0E0"; el.style.color = "var(--grey-text)"; }}}
                >{f}</button>
              ))}
              {fachItemsMore.length >= 3 && (
                <button onClick={() => setShowMoreFach(v => !v)} style={{
                  padding: "6px 10px", borderRadius: 9999,
                  border: "1.5px solid #E0E0E0", background: "white",
                  fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                }}>
                  {showMoreFach ? "Weniger" : "Mehr anzeigen"}
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" style={{ transform: showMoreFach ? "rotate(180deg)" : "none", transition: "0.2s" }}>
                    <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              )}
            </div>
            <a href="/unterschied" style={{
              display: "inline-flex", alignItems: "center", gap: 5, marginTop: 10,
              fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta)",
              textDecoration: "none", fontWeight: 500,
            }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M12 8v4M12 16h.01"/></svg>
              Was ist der Unterschied?
            </a>
            </>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Angebot */}
          <div>
            <SectionHeader label="Angebot" sectionKey="angebot" />
            {(isMobile || open.angebot) && <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {["Online", "Vor Ort", "Beides"].map(opt => (
                <label key={opt} onClick={e => { e.preventDefault(); toggleAngebotProp(opt); }} style={{
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                  fontFamily: "'Poppins',sans-serif", fontSize: 15,
                  color: angebot.includes(opt) ? "var(--cta)" : "var(--black)",
                  padding: "8px 8px", borderRadius: 8, transition: "background 0.15s",
                  background: angebot.includes(opt) ? "var(--blue-ultra-light)" : "transparent",
                }}
                  onMouseEnter={e => { if (!angebot.includes(opt)) (e.currentTarget as HTMLElement).style.background = "#F5F8FF"; }}
                  onMouseLeave={e => { if (!angebot.includes(opt)) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <input type="checkbox" checked={angebot.includes(opt)} onChange={() => {}} readOnly
                    style={{ width: 16, height: 16, accentColor: "var(--cta)", cursor: "pointer", pointerEvents: "none" }} />
                  {opt}
                </label>
              ))}
            </div>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Krankenkasse */}
          <div>
            <SectionHeader label="Krankenkasse" sectionKey="krankenkasse" />
            {(isMobile || open.krankenkasse) && <label onClick={e => { e.preventDefault(); setKasse(!kasse); }} style={{
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              fontFamily: "'Poppins',sans-serif", fontSize: 15,
              color: kasse ? "var(--cta)" : "var(--black)",
              padding: "8px 8px", borderRadius: 8, transition: "background 0.15s",
              background: kasse ? "var(--blue-ultra-light)" : "transparent",
            }}
              onMouseEnter={e => { if (!kasse) (e.currentTarget as HTMLElement).style.background = "#F5F8FF"; }}
              onMouseLeave={e => { if (!kasse) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <input type="checkbox" checked={kasse} onChange={() => {}} readOnly
                style={{ width: 16, height: 16, accentColor: "var(--cta)", cursor: "pointer", pointerEvents: "none" }} />
              Kassenrückerstattung
            </label>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Verfügbarkeit */}
          <div>
            <SectionHeader label="Verfügbarkeit" sectionKey="verfuegbarkeit" />
            {(isMobile || open.verfuegbarkeit) && <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { value: "today", label: "Heute verfügbar" },
                { value: "thisweek", label: "Diese Woche" },
                { value: "later", label: "Termin in 2+ Wochen" },
              ].map(opt => (
                <label key={opt.value} onClick={e => { e.preventDefault(); setVerfuegbarkeit(opt.value); }} style={{
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                  fontFamily: "'Poppins',sans-serif", fontSize: 15,
                  color: verfuegbarkeit === opt.value ? "var(--cta)" : "var(--black)",
                  padding: "8px 8px", borderRadius: 8, transition: "background 0.15s",
                  background: verfuegbarkeit === opt.value ? "var(--blue-ultra-light)" : "transparent",
                }}
                  onMouseEnter={e => { if (verfuegbarkeit !== opt.value) (e.currentTarget as HTMLElement).style.background = "#F5F8FF"; }}
                  onMouseLeave={e => { if (verfuegbarkeit !== opt.value) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <input type="radio" name="verfuegbarkeit" value={opt.value}
                    checked={verfuegbarkeit === opt.value} onChange={() => {}} readOnly
                    style={{ width: 16, height: 16, accentColor: "var(--cta)", cursor: "pointer", pointerEvents: "none" }} />
                  {opt.label}
                </label>
              ))}
            </div>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Standort */}
          <div>
            <SectionHeader label="Standort" sectionKey="standort" />
            {(isMobile || open.standort) && <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
              <input
                placeholder="Stadt oder Postleitzahl..."
                value={standort}
                onChange={e => setStandort(e.target.value)}
                style={{ width: "100%", height: 44, borderRadius: 9999, border: "1.5px solid var(--grey-border)", padding: "0 12px 0 34px", fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "var(--black)", background: "white", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--blue-ultra-light)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--grey-border)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Sprache */}
          <div>
            <SectionHeader label="Sprache" sectionKey="sprache" />
            {(isMobile || open.sprache) && <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Deutsch", "Englisch", "Türkisch", "Arabisch", "Französisch", "Spanisch"].map(s => (
                <button key={s} onClick={() => toggleSpracheProp(s)} style={{
                  padding: "6px 12px", borderRadius: 9999,
                  border: sprachen.includes(s) ? "1.5px solid var(--cta)" : "1.5px solid #E0E0E0",
                  background: sprachen.includes(s) ? "var(--blue-ultra-light)" : "white",
                  fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: sprachen.includes(s) ? 600 : 400,
                  color: sprachen.includes(s) ? "var(--cta)" : "var(--grey-text)",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget; if (!sprachen.includes(s)) { el.style.borderColor = "var(--cta)"; el.style.color = "var(--cta)"; }}}
                  onMouseLeave={e => { const el = e.currentTarget; if (!sprachen.includes(s)) { el.style.borderColor = "#E0E0E0"; el.style.color = "var(--grey-text)"; }}}
                >{s}</button>
              ))}
            </div>}
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Preis */}
          <div>
            <SectionHeader label="Preis pro Sitzung" sectionKey="preis" />
            {(isMobile || open.preis) && <><input type="range" min={30} max={200} step={5} value={preisMax}
              onChange={e => setPreisMax(Number(e.target.value))}
              className="preis-range"
              style={{ width: "100%", cursor: "pointer", marginBottom: 10, background: `linear-gradient(to right, #0B72B2 0%, #0B72B2 ${((preisMax - 30) / (200 - 30)) * 100}%, #E0E0E0 ${((preisMax - 30) / (200 - 30)) * 100}%, #E0E0E0 100%)` }}
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)" }}>€</span>
                <input type="number" value={preisMin} min={30} max={preisMax - 5} step={5}
                  onChange={e => setPreisMin(Math.min(Number(e.target.value), preisMax - 5))}
                  style={{ width: "100%", height: 44, borderRadius: 8, border: "1.5px solid var(--grey-border)", padding: "0 8px 0 22px", fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--cta)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--grey-border)")}
                />
              </div>
              <span style={{ color: "var(--grey-text)", fontSize: 13 }}>—</span>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)" }}>€</span>
                <input type="number" value={preisMax} min={preisMin + 5} max={200} step={5}
                  onChange={e => setPreisMax(Math.max(Number(e.target.value), preisMin + 5))}
                  style={{ width: "100%", height: 44, borderRadius: 8, border: "1.5px solid var(--grey-border)", padding: "0 8px 0 22px", fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--black)", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--cta)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--grey-border)")}
                />
              </div>
            </div>
            </>}
          </div>

          {/* CTA Button — desktop only */}
          {!isMobile && (
            <button style={{
              width: "100%", height: 46, background: "var(--cta)", color: "white",
              border: "none", borderRadius: 9999,
              fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer", marginTop: 4,
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
            >
              {resultCount} Ergebnisse anzeigen
            </button>
          )}
        </div>
      </div>{/* end scrollable content */}

      {/* Sticky bottom CTA — mobile only */}
      {isMobile && (
        <div style={{ flexShrink: 0, padding: "12px 16px 20px", background: "white", borderTop: "1px solid #F0F0F0" }}>
          <button onClick={onClose} onTouchEnd={e => { e.preventDefault(); onClose?.(); }} style={{ width: "100%", height: 50, background: "var(--cta)", color: "white", border: "none", borderRadius: 9999, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", touchAction: "manipulation" } as React.CSSProperties}>
            {resultCount} Ergebnisse anzeigen
          </button>
        </div>
      )}
    </aside>
    </>
  );
}

// â"€â"€â"€ Therapist Card â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function TherapistCard({ t, isMobile = false }: { t: typeof therapists[0]; isMobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const avail = availColors[t.availability] ?? availColors.later;
  const LIMIT = 2;
  const visibleTags = t.tags.slice(0, LIMIT);
  const extraTags = t.tags.length > LIMIT ? t.tags.length - LIMIT : 0;


  if (isMobile) {
    return (
      <div className="fk-card" style={{ background: "white", borderRadius: 12, border: "1px solid #EBEBEB", display: "flex", flexDirection: "column", cursor: "pointer", boxSizing: "border-box", width: "100%", padding: 14, position: "relative" }}>
        <a href={`/fachkraefte/${t.id}`} style={{ position: "absolute", inset: 0, zIndex: 1, borderRadius: 12 }} aria-label={t.name} />

        {/* Top: photo with rounded corners + info */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
          {/* Photo — rounded */}
          <div style={{ width: 96, borderRadius: 10, overflow: "hidden", flexShrink: 0, alignSelf: "stretch" }}>
            <img src={t.photo} alt={t.name} className="photo-warm" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          </div>
          {/* Info column — Verifiziert, Name, Role, Angebot, Stars */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {t.verified ? (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#33700E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#33700E", fontWeight: 500 }}>Verifiziert</span>
                </div>
              ) : <span />}
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, position: "relative", zIndex: 2 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>{t.name}</h2>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: "var(--grey-text)" }}>{t.role}</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(t.angebot === "online" || t.angebot === "beides") && <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 12, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "var(--cta)", border: "1.5px solid var(--cta)" }}>Online</span>}
              {(t.angebot === "vor-ort" || t.angebot === "beides") && <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 12, fontFamily: "'Poppins',sans-serif", fontWeight: 500, color: "#B07000", border: "1.5px solid #D4920A" }}>Vor Ort</span>}
            </div>
          </div>
        </div>

        {/* Rest of content — same left alignment as card padding */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Info row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#9BAAB8" strokeWidth="1.6"/><path d="M12 7v5l3 1.5" stroke="#9BAAB8" strokeWidth="1.6" strokeLinecap="round"/></svg>
              {t.experience} Jahre Erfahrung
            </span>
            <span style={{ color: "#C8D0DC", fontSize: 10 }}>&#x25CF;</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="#9BAAB8" strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke="#9BAAB8" strokeWidth="1.6"/></svg>
              {t.location}
            </span>
            <span style={{ color: "#C8D0DC", fontSize: 10 }}>&#x25CF;</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#9BAAB8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t.languages.join(", ")}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", alignItems: "center", marginTop: 4, overflow: "hidden" }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", fontWeight: 500, flexShrink: 0 }}>Hilft bei:</span>
            {visibleTags.map(tag => (
              <span key={tag} style={{ background: "#F5F8FF", border: "1px solid #DDE8F5", borderRadius: 9999, padding: "5px 14px", flexShrink: 0, fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--black)" }}>{tag}</span>
            ))}
            {extraTags > 0 && (
              <a href={`/fachkraefte/${t.id}`} onClick={e => e.stopPropagation()} style={{ background: "#F0F4FF", border: "1px solid #DDE8F5", borderRadius: 9999, padding: "5px 12px", flexShrink: 0, fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta)", fontWeight: 500, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}>+{extraTags} weitere</a>
            )}
          </div>

          {/* Price + Kassenleistung */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <div>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 24, color: "var(--black)" }}>€{t.price}</span>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: "var(--grey-text)" }}> / pro Sitzung</span>
            </div>
            {t.kassenerstattung && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#EDF9F0", border: "1px solid #C3EDD0", borderRadius: 9999, padding: "5px 10px" }}>
                <img src="/icons/icon-kasse-detail.svg" alt="" style={{ width: 15, height: 15, objectFit: "contain" }} />
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#33700E", fontWeight: 500, whiteSpace: "nowrap" }}>Kassenrückerstattung</span>
              </div>
            )}
          </div>

          {/* CTA — primary */}
          <a href={`/fachkraefte/${t.id}`} style={{ width: "100%", background: "var(--cta)", color: "white", border: "none", borderRadius: 9999, height: 46, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none", position: "relative", zIndex: 2 }}>
            Profil ansehen
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="currentColor"/></svg>
          </a>

          {/* Nächster Termin — below CTA, left-aligned */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--cta)", fontWeight: 500 }}>Nächster Termin: {t.nextAppointment}</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fk-card"
      style={{
        background: "white",
        borderRadius: isMobile ? 12 : 16,
        boxShadow: hovered
          ? "0 0 0 1.5px var(--blue-subtle), 0 8px 32px rgba(45,91,141,0.10)"
          : "none",
        border: hovered ? "1px solid transparent" : "1px solid #EBEBEB",
        padding: isMobile ? 0 : "0 28px 0 0",
        display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 0 : 28, alignItems: "stretch",
        transition: "box-shadow 0.2s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <a href={`/fachkraefte/${t.id}`} style={{ position: "absolute", inset: 0, zIndex: 1, borderRadius: 16 }} aria-label={t.name} />
      {/* Photo */}
      <div className="fk-card-photo" style={{ flexShrink: 0, width: isMobile ? "100%" : 195, height: isMobile ? 200 : "auto", borderRadius: isMobile ? "12px 12px 0 0" : "16px 0 0 16px", overflow: "hidden", alignSelf: isMobile ? "auto" : "stretch" }}>
        <img
          src={t.photo} alt={t.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          className="photo-warm"
        />
      </div>

      {/* Main content — 2-row layout */}
      <div className="fk-card-content" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: isMobile ? 12 : 14, padding: isMobile ? "16px 16px 16px" : "18px 0 18px" }}>

        {/* Top row: name/role + price */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          {/* Name + role */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: isMobile ? 16 : 19, color: "var(--black)", margin: 0, lineHeight: 1.3 }}>
                {t.name}
              </h2>
              {t.verified && (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#33700E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#33700E", fontWeight: 500 }}>Verifiziert</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 13, color: "var(--grey-text)" }}>{t.role}</span>
              {(t.angebot === "online" || t.angebot === "beides") && (
                <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, background: "transparent", color: "var(--cta)", border: "1.5px solid var(--cta)", whiteSpace: "nowrap", flexShrink: 0 }}>Online</span>
              )}
              {(t.angebot === "vor-ort" || t.angebot === "beides") && (
                <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontFamily: "'Poppins',sans-serif", fontWeight: 500, background: "transparent", color: "#B07000", border: "1.5px solid #D4920A", whiteSpace: "nowrap", flexShrink: 0 }}>Vor Ort</span>
              )}
            </div>
          </div>
          {/* Price + Kassenleistung */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {t.kassenerstattung && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#EDF9F0", border: "1px solid #C3EDD0", borderRadius: 9999, padding: "5px 12px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.76435 1.72716C4.0825 1.71481 4.46398 1.72484 4.7883 1.72562H6.73968H12.7089H17.6333L19.2194 1.72484C19.5074 1.72484 19.7978 1.72176 20.0858 1.72871C20.3144 1.73488 20.4943 1.81983 20.6472 1.99357C20.7399 2.10091 20.7962 2.2345 20.8094 2.37505C20.8248 2.5457 20.8179 2.77968 20.8179 2.9542V3.92951L20.8171 7.01758V10.5412L20.8179 11.6339C20.8179 11.7319 20.8163 11.84 20.8186 11.9381C20.8271 12.3196 20.8233 12.5497 20.5175 12.8115C20.5669 12.8578 20.6758 12.9319 20.7337 12.9752C20.8387 13.0516 20.9406 13.1327 21.0379 13.2184C21.6179 13.7242 22.0773 14.352 22.3855 15.0563C22.9299 16.3142 22.953 17.7366 22.4488 19.0116C21.9337 20.3027 20.9237 21.3336 19.6426 21.8749C19.5314 21.9236 19.3947 21.9745 19.2796 22.0132C17.9746 22.4502 16.5483 22.3452 15.3213 21.7205C14.1004 21.1043 13.173 20.0293 12.7429 18.7313C12.349 17.5405 12.4031 16.0548 12.9691 14.9281H5.33966H3.02689L2.30333 14.9289C1.97437 14.9297 1.6678 14.9667 1.41374 14.7165C1.23613 14.542 1.19057 14.3644 1.19057 14.1212C1.18903 13.3976 1.19057 12.674 1.19057 11.9505V7.62994V5.41293L1.1898 4.77353C1.18903 4.63222 1.18594 4.49091 1.19984 4.35036C1.22841 4.0492 1.4539 3.78665 1.7512 3.72101C1.93962 3.68008 2.14889 3.69321 2.34271 3.69321L3.0601 3.69476V2.86077C3.0601 2.70324 3.05006 2.45227 3.08095 2.30632C3.10566 2.1874 3.15894 2.07697 3.23539 1.98353C3.37361 1.81519 3.55354 1.74647 3.76435 1.72716ZM20.204 7.14731C19.7283 7.1589 19.2209 7.14808 18.7422 7.14886L16.0487 7.14808L15.2186 7.14886C14.9128 7.14886 14.59 7.15967 14.2919 7.08862C13.9761 7.0114 13.6873 6.85001 13.4564 6.62144C13.1197 6.28552 12.9328 5.8276 12.939 5.35269C12.9436 4.87701 13.139 4.42372 13.4811 4.09322C14.0178 3.57197 14.5398 3.59977 15.2255 3.59977H16.3645H18.8364C19.2634 3.59977 19.7067 3.5936 20.1321 3.60132L20.2078 3.60286L20.207 3.59051C20.1947 3.36734 20.2449 2.48238 20.1623 2.37273C20.0117 2.33257 19.0943 2.34802 18.8951 2.34802H16.0927L3.92497 2.34956C3.8408 2.35034 3.77439 2.33952 3.70798 2.3874C3.67478 2.43605 3.67246 2.53103 3.67246 2.59127C3.67323 3.32023 3.674 4.05074 3.674 4.77971L3.67323 9.32186V11.3111C3.67323 11.4362 3.65547 12.2478 3.70721 12.3034C3.80374 12.359 4.29254 12.3389 4.42768 12.3389H5.65473H13.3104H14.9591C15.0618 12.3389 15.6278 12.3482 15.6873 12.325C16.8765 11.8563 18.2101 11.8115 19.4124 12.2609C19.4704 12.2825 19.5391 12.3095 19.6009 12.3227C19.7213 12.3412 20.0951 12.3721 20.1762 12.2926C20.2202 12.1343 20.2063 11.759 20.2063 11.5752V10.6586C20.2063 9.49561 20.2186 8.30872 20.204 7.14731ZM17.8039 20.2332C19.529 20.1467 20.8573 18.6757 20.7684 16.9505C20.6789 15.2254 19.207 13.8988 17.4819 13.9899C15.7591 14.081 14.4363 15.5497 14.5251 17.2725C14.6139 18.9954 16.0811 20.3205 17.8039 20.2332ZM17.2966 12.5829C16.0973 12.6679 14.9815 13.2292 14.1985 14.142C13.6502 14.7783 13.2896 15.5552 13.1568 16.3845C13.1429 16.4718 13.0965 16.7513 13.1151 16.8216C13.1413 16.8378 13.1274 16.8324 13.1591 16.8339L13.9375 16.8378C14.0286 15.8138 14.4826 14.8725 15.2765 14.2092C15.8595 13.7173 16.5815 13.42 17.3414 13.3574C17.3398 13.2563 17.3514 12.6269 17.3267 12.5837C17.319 12.5829 17.3035 12.5821 17.2966 12.5829ZM17.3429 21.6541C17.3337 21.4046 17.3383 21.1228 17.3398 20.8718C17.1167 20.8409 16.9136 20.8116 16.695 20.7529C15.8935 20.5359 15.1877 20.0564 14.6904 19.3915C14.2425 18.8 14.0317 18.1907 13.9506 17.4602C13.6965 17.4532 13.3552 17.4702 13.1228 17.4548C13.1058 17.4911 13.1197 17.576 13.1251 17.6208C13.1668 17.9868 13.2525 18.3467 13.3807 18.6926C13.8031 19.8278 14.6603 20.749 15.7622 21.2525C16.3197 21.5074 16.7445 21.5877 17.3429 21.6541ZM21.3476 17.4571C21.2573 18.4633 20.7669 19.3915 19.987 20.034C19.4364 20.4857 18.6719 20.8263 17.9568 20.8703C17.9537 21.1081 17.9638 21.4178 17.9522 21.6479C18.1244 21.6371 18.2966 21.6162 18.4673 21.5869C20.5329 21.1637 21.9986 19.5637 22.1847 17.454C21.9932 17.454 21.7924 17.4517 21.6009 17.4556C21.5175 17.4579 21.4302 17.4617 21.3476 17.4571ZM20.207 6.52645C20.197 6.28552 20.2016 5.92722 20.2086 5.6832C18.9908 5.66544 17.7398 5.68011 16.519 5.68011L15.3722 5.68088C15.1861 5.68088 15.0085 5.68474 14.817 5.67471C14.5182 5.66003 14.4101 5.35733 14.6047 5.14342C14.6587 5.08474 14.7545 5.07084 14.8301 5.06466C15.1043 5.05616 15.3884 5.06002 15.6634 5.0608H17.2055H19.1769C19.485 5.0608 19.9036 5.04844 20.2063 5.06543C20.1924 4.83608 20.2063 4.46619 20.2047 4.22295C19.7955 4.23299 19.3468 4.22295 18.9337 4.22295H16.1885C15.7128 4.22295 15.2116 4.21445 14.7382 4.22372C14.366 4.24303 14.1104 4.30712 13.8456 4.59901C13.6417 4.82759 13.5367 5.12721 13.5544 5.433C13.5707 5.74112 13.7104 6.03069 13.9421 6.23456C14.3104 6.56043 14.6749 6.52414 15.1313 6.52414L16.007 6.52337H18.7916H19.6928C19.8518 6.52337 20.0511 6.51796 20.207 6.52645ZM21.3507 16.8293C21.6333 16.8409 21.9075 16.8316 22.1862 16.8393C22.1669 16.6015 22.1499 16.42 22.1013 16.1845C21.8959 15.203 21.3731 14.3165 20.6125 13.6632C20.0325 13.1621 19.3344 12.8169 18.5839 12.6609C18.4734 12.6385 18.3692 12.6207 18.258 12.6076C18.1645 12.596 18.0418 12.5929 17.9537 12.5721C17.9561 12.8061 17.963 13.1204 17.9514 13.3505C18.1808 13.3837 18.3777 13.4115 18.6008 13.4717C19.4039 13.6903 20.1105 14.1706 20.6078 14.8378C21.0588 15.4416 21.282 16.0849 21.3507 16.8293ZM13.7552 13.7204C13.9969 13.4316 14.2749 13.1752 14.5823 12.9582H7.0949H4.81842L4.14737 12.959C3.81763 12.9597 3.52574 12.9899 3.27477 12.7381C3.17284 12.6354 3.09716 12.5034 3.07322 12.3559C3.05315 12.1335 3.0601 11.8694 3.0601 11.6439L3.06087 10.2887V6.30637V4.99053C3.06087 4.78666 3.06936 4.52025 3.05932 4.32025C2.72959 4.32411 2.38441 4.31021 2.05622 4.32179C1.97205 4.32256 1.89328 4.31021 1.83228 4.36349C1.78595 4.44689 1.80216 5.10636 1.80216 5.24999L1.80294 6.67781L1.80216 12.3327V13.5142C1.80216 13.7474 1.79058 14.0138 1.8207 14.2447C1.82996 14.3127 2.00834 14.3142 2.05777 14.3127C2.84619 14.315 3.63539 14.3134 4.42459 14.3134H8.93431H11.8347C12.2919 14.3134 12.8625 14.3304 13.3073 14.3119C13.4471 14.1003 13.5846 13.9073 13.7552 13.7204Z" fill="#33700E"/><path d="M7.00672 4.35178C7.05537 4.34715 7.12873 4.34561 7.17892 4.34561C7.59592 4.34561 8.01137 4.34483 8.42913 4.34715C8.64072 4.35101 8.85616 4.33248 9.06698 4.3541C9.18281 4.36568 9.30559 4.46298 9.32335 4.58113C9.34961 4.7626 9.33957 4.9572 9.33957 5.14098L9.33802 6.04447C9.80058 6.05837 10.2655 6.03752 10.728 6.05297C10.8191 6.05297 10.9574 6.11397 10.9983 6.20355C11.0608 6.34177 11.0415 6.62981 11.0415 6.78116L11.0423 7.47461L11.0415 8.02519C11.0415 8.22443 11.0747 8.45763 10.8987 8.58273C10.8631 8.60821 10.7458 8.63138 10.6979 8.63293C10.4446 8.64065 10.1913 8.6337 9.93803 8.63601C9.81757 8.63524 9.44073 8.64837 9.34189 8.62829C9.32953 8.95339 9.34652 9.28081 9.33957 9.60746C9.33648 9.77039 9.36351 10.0152 9.29633 10.1673C9.25771 10.2538 9.17432 10.3024 9.08474 10.3302C8.64381 10.358 8.17894 10.3233 7.73569 10.3357C7.62835 10.3357 7.50634 10.3349 7.40055 10.3372C7.04224 10.3372 6.76424 10.4028 6.75652 9.94028C6.7488 9.51325 6.77274 9.0615 6.75343 8.6391C6.45845 8.63601 6.16346 8.63524 5.86848 8.63601C5.69859 8.63756 5.50863 8.64528 5.34029 8.62906C5.26307 8.62211 5.21287 8.60204 5.15418 8.55416C5.06383 8.47848 5.05302 8.36574 5.05225 8.24759C5.04993 7.88542 5.04916 7.52403 5.05071 7.16109C5.05766 6.86997 5.03295 6.57112 5.06692 6.28231C5.07928 6.17652 5.19125 6.07459 5.29395 6.06146C5.46847 6.03907 5.65072 6.04756 5.82678 6.04756L6.75652 6.04911C6.75266 5.65837 6.75961 5.26686 6.75575 4.87534C6.75266 4.63364 6.73104 4.43209 7.00672 4.35178ZM5.67002 6.66919C5.65689 7.10317 5.68469 7.59276 5.66384 8.01207C5.95265 8.01593 6.24068 8.0167 6.52949 8.01516C6.59667 8.01516 6.67544 8.01129 6.74185 8.01438C6.9156 8.02288 7.15653 7.97809 7.2878 8.11863C7.40981 8.24914 7.36194 8.47617 7.36889 8.64142C7.35807 8.99278 7.38356 9.35649 7.36734 9.70553L7.36657 9.71634L8.416 9.7202C8.48241 9.7202 8.67778 9.73101 8.72334 9.70089C8.72566 9.38815 8.72566 9.07463 8.72412 8.76188C8.7218 7.98272 8.72103 8.01284 9.49478 8.01438H10.4145L10.4268 8.01516C10.4276 7.6082 10.4446 7.06842 10.4268 6.6746C9.97742 6.67846 9.51177 6.6746 9.06235 6.67305C8.65462 6.67151 8.72643 6.24679 8.72412 5.97497C8.71639 5.64833 8.73647 5.30315 8.72334 4.97264L7.87005 4.97187C7.75422 4.97187 7.47777 4.98114 7.37661 4.9626C7.35035 5.30315 7.3797 5.65991 7.36966 6.00895C7.36348 6.24525 7.4353 6.62131 7.08394 6.66533C6.86386 6.69313 6.62602 6.6607 6.40439 6.67228C6.22756 6.66765 5.85303 6.69004 5.69782 6.67228C5.68855 6.67151 5.67929 6.66996 5.67002 6.66919Z" fill="#33700E"/><path d="M16.7336 8.85535C16.99 8.84685 17.2765 8.85303 17.5367 8.85303C17.8255 8.86461 18.1475 8.82523 18.4294 8.89164C18.9051 9.00284 19.2796 9.41829 19.319 9.9071C19.3506 10.2994 19.3228 10.6677 19.0587 10.9758C18.807 11.2693 18.5359 11.3743 18.1622 11.4075C17.7776 11.4237 17.3823 11.4021 16.9977 11.4114C16.5992 11.4199 16.2734 11.3789 15.9606 11.111C15.7336 10.9172 15.593 10.6392 15.5722 10.3411C15.5421 9.93799 15.5737 9.56655 15.8525 9.25304C16.0973 8.9789 16.3776 8.87851 16.7336 8.85535ZM18.1622 10.7866C18.3282 10.7727 18.4834 10.7141 18.5846 10.5812C18.8263 10.2646 18.7607 9.57582 18.2935 9.49628C18.0494 9.45458 17.817 9.47775 17.5714 9.47157C17.2958 9.47312 16.9954 9.46539 16.7228 9.4762C16.2471 9.53258 16.1336 9.86385 16.1822 10.2847C16.2363 10.7588 16.6409 10.806 17.0201 10.7921C17.3992 10.7774 17.7877 10.8075 18.1622 10.7866Z" fill="#33700E"/><path d="M17.5893 14.837C17.9399 14.8177 17.9445 15.0826 17.9507 15.3436C18.1839 15.4216 18.5793 15.5976 18.6735 15.8432C18.7044 15.922 18.7013 16.01 18.6658 16.0864C18.6333 16.1567 18.5592 16.2316 18.482 16.2517C18.2063 16.3235 18.1816 16.1057 17.9669 16.0069C17.797 15.9227 17.6194 15.8934 17.4341 15.9528C17.2024 16.0277 17.0441 16.298 17.153 16.532C17.2866 16.8208 17.5769 16.7961 17.8387 16.837C17.9407 16.8525 18.0403 16.8818 18.1352 16.9227C18.4071 17.0401 18.6179 17.2486 18.7244 17.5266C18.821 17.7776 18.8125 18.0563 18.6997 18.3011C18.5515 18.6255 18.2966 18.793 17.9739 18.9135C17.9383 19.1367 18.0024 19.2455 17.7623 19.3745C17.6588 19.4069 17.5592 19.4039 17.4719 19.3297C17.3499 19.227 17.3507 19.071 17.3383 18.9251C17.0827 18.8378 16.4966 18.5228 16.6758 18.1784C16.7136 18.1034 16.7808 18.0478 16.8619 18.0255C17.2078 17.9297 17.275 18.4587 17.8171 18.3119C17.9484 18.2764 18.0588 18.1899 18.1252 18.0718C18.1715 17.9876 18.1955 17.8733 18.163 17.7822C18.0264 17.3961 17.709 17.4633 17.4155 17.4108C17.2935 17.3884 17.1762 17.3459 17.0681 17.2849C16.197 16.8023 16.3808 15.5891 17.3267 15.3451C17.3298 15.1057 17.3105 14.9065 17.5893 14.837Z" fill="#33700E"/></svg>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#33700E", fontWeight: 500, whiteSpace: "nowrap" }}>Kassenrückerstattung</span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: isMobile ? 20 : 24, color: "var(--black)" }}>{"€"}{t.price}</span>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 14, color: "var(--grey-text)" }}>/pro Sitzung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#9BAAB8" strokeWidth="1.6"/><path d="M12 7v5l3 1.5" stroke="#9BAAB8" strokeWidth="1.6" strokeLinecap="round"/></svg>
              {t.experience} Jahre
            </span>
            <span style={{ color: "#C8D0DC", fontSize: 10 }}>&#x25CF;</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" stroke="#9BAAB8" strokeWidth="1.6"/><circle cx="12" cy="10" r="2" stroke="#9BAAB8" strokeWidth="1.6"/></svg>
              {t.location}
            </span>
            <span style={{ color: "#C8D0DC", fontSize: 10 }}>&#x25CF;</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#9BAAB8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t.languages.join(", ")}
            </span>
          </div>
        </div>

        {/* Bottom row: tags LEFT + buttons RIGHT — perfectly aligned */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", alignItems: "center", flex: 1, minWidth: 0, overflow: "hidden" }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--grey-text)", fontWeight: 500, flexShrink: 0 }}>Hilft bei:</span>
            {visibleTags.map(tag => (
              <span key={tag} style={{ background: "#F5F8FF", border: "1px solid #DDE8F5", borderRadius: 9999, padding: "5px 14px", flexShrink: 0, fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--black)" }}>{tag}</span>
            ))}
            {extraTags > 0 && (
              <a href={`/fachkraefte/${t.id}`} onClick={e => e.stopPropagation()} style={{ background: "#F0F4FF", border: "1px solid #DDE8F5", borderRadius: 9999, padding: "5px 12px", flexShrink: 0, fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "var(--cta)", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}>+{extraTags}</a>
            )}
          </div>
          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ position: "relative", zIndex: 2 }} className="bookmark-wrap">
                <button title="Profil speichern" style={{ background: "none", border: "1.5px solid #E0E0E0", borderRadius: 9999, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, transition: "border-color 0.2s, background 0.2s", flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.background = "var(--blue-ultra-light)"; (e.currentTarget.nextElementSibling as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E0E0E0"; e.currentTarget.style.background = "none"; (e.currentTarget.nextElementSibling as HTMLElement).style.opacity = "0"; }}
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke="var(--cta)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "var(--black)", color: "white", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap", pointerEvents: "none", opacity: 0, transition: "opacity 0.15s" }}>Profil speichern</div>
              </div>
              <a href={`/fachkraefte/${t.id}`} style={{ background: hovered ? "var(--cta)" : "white", color: hovered ? "white" : "var(--cta)", border: "1.5px solid var(--cta)", borderRadius: 9999, padding: "0 18px", height: 38, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, textDecoration: "none", position: "relative", zIndex: 2 }}>
                Profil ansehen
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="currentColor"/></svg>
              </a>
            </div>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--cta)", fontWeight: 600, whiteSpace: "nowrap" }}>
              {"Nächster Termin: "}{t.nextAppointment}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// â"€â"€â"€ Page â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const CARDS_PER_PAGE = 5;

export default function FachkraeftePage() {
  const winW = useWindowWidth();
  const isMobile = winW < 1071;
  const isTablet = winW >= 1071 && winW < 1280;
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [suche, setSuche] = useState("");
  const [fachrichtung, setFachrichtung] = useState("Alle");
  const [angebot, setAngebot] = useState<string[]>([]);
  const [kasse, setKasse] = useState(false);
  const [verfuegbarkeit, setVerfuegbarkeit] = useState("");
  const [preisMin, setPreisMin] = useState(30);
  const [preisMax, setPreisMax] = useState(200);
  const [sprachen, setSprachen] = useState<string[]>([]);
  const [standort, setStandort] = useState("");
  const [sortBy, setSortBy] = useState("best");
  const [page, setPage] = useState(1);

  const toggleAngebot = (v: string) =>
    setAngebot(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  const toggleSprache = (v: string) =>
    setSprachen(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const onReset = () => {
    setSuche(""); setFachrichtung("Alle"); setAngebot([]); setKasse(false);
    setVerfuegbarkeit(""); setPreisMin(30); setPreisMax(200);
    setSprachen([]); setStandort(""); setSortBy("best"); setPage(1);
  };

  // Filter
  const fachMap: Record<string, string[]> = {
    "Psycholog*in": ["Psycholog"],
    "Psychotherapeut*in": ["Psychotherapeut"],
    "Psychiater*in": ["Psychiater", "Psychiatrie"],
    "Lebens- & Sozialberater*in": ["Lebens", "Sozialberater"],
  };
  const angebotMap: Record<string, string> = { "Online": "online", "Vor Ort": "vor-ort", "Beides": "beides" };

  let filtered = therapists.filter(t => {
    if (suche) {
      const q = suche.toLowerCase();
      if (!t.name.toLowerCase().includes(q) && !t.role.toLowerCase().includes(q) && !t.tags.some(tag => tag.toLowerCase().includes(q)) && !t.location.toLowerCase().includes(q)) return false;
    }
    if (fachrichtung !== "Alle") {
      const keywords = fachMap[fachrichtung] || [];
      if (!keywords.some(k => t.role.includes(k))) return false;
    }
    if (angebot.length > 0) {
      const mapped = angebot.map(a => angebotMap[a]).filter(Boolean);
      if (!mapped.includes(t.angebot)) return false;
    }
    if (kasse && !t.kassenerstattung) return false;
    if (verfuegbarkeit && t.availability !== verfuegbarkeit) return false;
    if (t.price < preisMin || t.price > preisMax) return false;
    if (sprachen.length > 0 && !sprachen.every(s => t.languages.includes(s))) return false;
    if (standort && !t.location.toLowerCase().includes(standort.toLowerCase())) return false;
    return true;
  });

  // Sort
  const availOrder: Record<string, number> = { today: 0, thisweek: 1, later: 2 };
  const apptScore = (t: typeof therapists[0]) => {
    const base = (availOrder[t.availability] ?? 9) * 100000;
    const m = t.nextAppointment.match(/(\d{1,2}):(\d{2})/);
    const mins = m ? parseInt(m[1]) * 60 + parseInt(m[2]) : 0;
    return base + mins;
  };
  if (sortBy === "earliest") filtered = [...filtered].sort((a, b) => apptScore(a) - apptScore(b));
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.stars - a.stars || b.reviewCount - a.reviewCount);
  else if (sortBy === "experience") filtered = [...filtered].sort((a, b) => b.experience - a.experience);
  else if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * CARDS_PER_PAGE, safePage * CARDS_PER_PAGE);

  // Page numbers to show — with ellipsis logic
  // Returns array of numbers and "..." strings
  const buildPageItems = (): (number | "...")[] => {
    if (isMobile && totalPages > 3) {
      const items: (number | "...")[] = [1];
      if (safePage > 2) items.push("...");
      if (safePage !== 1 && safePage !== totalPages) items.push(safePage);
      if (safePage < totalPages - 1) items.push("...");
      items.push(totalPages);
      return items;
    }
    if (totalPages <= 5) {
      const arr: number[] = [];
      for (let i = 1; i <= totalPages; i++) arr.push(i);
      return arr;
    }
    const items: (number | "...")[] = [1];
    const rangeStart = Math.max(2, safePage - 1);
    const rangeEnd = Math.min(totalPages - 1, safePage + 1);
    if (rangeStart > 2) items.push("...");
    for (let i = rangeStart; i <= rangeEnd; i++) items.push(i);
    if (rangeEnd < totalPages - 1) items.push("...");
    items.push(totalPages);
    return items;
  };
  const pageItems = buildPageItems();

  return (
    <main style={{ background: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <div className="fk-page-header" style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "20px 16px 16px" : isTablet ? "28px 32px 20px" : "32px 80px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, fontFamily: "'Poppins',sans-serif", fontSize: 13 }}>
            <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
            >Startseite</a>
            <span style={{ color: "#C3C3C3" }}>›</span>
            <span style={{ color: "var(--black)", fontWeight: 500 }}>Fachkräfte</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: isMobile ? "clamp(19px, 5.8vw, 24px)" : isTablet ? 28 : 34, lineHeight: 1.2, color: "var(--black)", margin: "0 0 8px" }}>
                Finde die <span style={{ color: "var(--cta-brand)", whiteSpace: "nowrap" }}>passende</span><wbr /> Unterstützung
              </h1>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 15, color: "var(--grey-text)", margin: 0 }}>
                Durchsuche qualifizierte Fachkräfte und finde die richtige Unterstützung für dich.
              </p>
            </div>
            <div style={{ display: isMobile ? "none" : "flex", gap: 8 }}>
              {[
                {
                  icon: <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.7128 24.1691C22.8348 22.7567 23.8534 21.2259 24.9676 19.8033C25.0761 19.6663 25.2016 19.5811 25.3821 19.5811C25.896 19.5826 26.4818 19.6908 26.9788 19.7961C29.7458 20.392 32.2107 21.9227 33.9382 24.123C34.2311 24.4923 34.4992 24.8804 34.7424 25.283C35.2197 26.075 35.1373 26.2222 35.8788 26.8527C36.8778 26.9912 37.9266 26.5771 38.7609 27.4009C39.3336 27.9665 39.3388 28.4354 39.3375 29.1799C39.3336 29.5377 39.3336 29.8969 39.3402 30.2547C39.5742 30.5015 39.8711 30.7857 40.1156 31.0194C40.5772 31.4479 40.9081 31.8115 40.9852 32.4521C41.1408 33.7477 40.0332 34.2166 39.3454 35.0765C39.2617 36.1744 39.6318 37.3431 38.5542 38.0904C38.3136 38.2578 38.1083 38.3415 37.8298 38.4309C37.8939 38.555 37.9959 38.8262 38.0547 38.9676L38.5072 40.0641L38.9701 41.1823C39.0891 41.4679 39.3101 41.8849 39.2813 42.1893C39.2643 42.3754 39.0002 42.6077 38.8014 42.576C38.2313 42.4836 37.6585 42.3091 37.0936 42.1691C36.921 42.4721 36.275 43.6004 36.0213 43.7172C35.9062 43.7706 35.7741 43.7706 35.6565 43.7259C35.5453 43.684 35.4629 43.6119 35.4002 43.5152C35.2485 43.2786 35.1569 42.9655 35.0497 42.7058C34.7659 42.0133 34.5031 41.3006 34.1879 40.6196C34.1199 40.4335 34.0232 40.2084 33.9473 40.0223C33.5694 40.0858 33.287 40.0901 32.913 40.0194L31.9597 42.3322C31.8001 42.7203 31.6471 43.1199 31.4615 43.4965C31.3202 43.7836 30.8717 43.8586 30.6651 43.5903C30.3355 43.1574 30.0622 42.6395 29.7615 42.1821C29.3417 42.2384 28.2276 42.6582 27.9111 42.5587C27.7778 42.5154 27.6588 42.4173 27.6012 42.2903C27.5594 42.1994 27.5502 42.11 27.5724 42.0133C27.6535 41.6497 27.851 41.2732 27.9948 40.9283C28.3387 40.0944 28.7127 39.2619 29.024 38.4165C28.1596 38.1654 27.7189 37.6922 27.5345 36.8338L22.5353 36.828H13.5189L9.62731 36.8294C8.97609 36.8294 8.31833 36.8323 7.66711 36.8265C7.55596 36.8265 7.27612 36.7934 7.19243 36.7256C7.08128 36.6361 7.01982 36.5091 7.01328 36.3677C6.99759 36.0056 7.00412 35.6319 7.00543 35.2698L7.00805 33.2672C7.00674 32.3179 6.97274 31.1305 7.05512 30.197C7.28004 27.8121 8.24379 25.5513 9.81953 23.7204C11.849 21.3456 14.7573 19.8567 17.9062 19.5811C17.9676 19.5754 18.0683 19.5768 18.1285 19.5883C18.2239 19.6042 18.3115 19.6489 18.3795 19.7168C18.5129 19.8495 18.6986 20.115 18.815 20.2722L19.4322 21.1033L21.7128 24.1691ZM21.7062 25.521C21.6134 25.4936 21.4499 25.4532 21.3898 25.3839C21.0851 25.0362 20.77 24.5818 20.494 24.2081L18.4724 21.487C18.2736 21.2201 18.0435 20.8969 17.8303 20.6372C17.8002 20.5997 17.7636 20.6041 17.7244 20.6055C14.9194 20.8753 12.2819 22.3469 10.5034 24.475C9.12255 26.1198 8.27256 28.1281 8.06072 30.2475C7.99141 30.9458 8.01888 31.6355 8.01234 32.3338C8.00188 33.4938 8.02803 34.6682 8.01234 35.8253C8.88586 35.8325 9.76069 35.8339 10.6355 35.831C11.0291 35.831 11.4855 35.8209 11.8726 35.8339L11.8752 31.888V30.7857C11.8739 30.5058 11.8216 29.9691 12.019 29.7642C12.1093 29.6733 12.2322 29.6214 12.3603 29.6199C12.9972 29.6098 12.8834 30.3456 12.8821 30.7597L12.8795 31.8851L12.8808 35.8253L24.1581 35.831C25.2631 35.831 26.4178 35.8137 27.5188 35.8339C27.5228 35.5223 27.5986 35.1457 27.3698 34.9091C26.6845 34.1993 25.8542 33.7217 25.8633 32.6396C25.8725 31.4292 26.8925 31.0511 27.5097 30.2432C27.5659 29.1943 27.2861 28.1021 28.1557 27.3389C28.9612 26.6319 29.989 26.9436 30.975 26.8585C31.2405 26.6045 31.502 26.3492 31.7622 26.0895C32.3533 25.508 32.6658 25.2599 33.5341 25.2426C33.3288 24.9829 33.1379 24.7145 32.9247 24.4591C31.2222 22.4191 28.6657 20.9676 25.9862 20.6315C25.8686 20.617 25.7496 20.6041 25.6306 20.5925C24.4027 22.142 23.2807 23.8344 22.0397 25.3782C21.9743 25.459 21.8069 25.4979 21.7062 25.521ZM33.6086 39.0672C34.2978 38.8811 34.8889 37.7701 35.5492 37.4917C35.6447 37.4513 35.9494 37.4599 36.0671 37.4614L36.8804 37.4671C37.4022 37.4729 37.9527 37.5075 38.2365 36.9795C38.5202 36.4543 38.1502 35.062 38.4313 34.5874C38.5189 34.4388 38.6562 34.3176 38.7805 34.1978C39.0773 33.9107 39.7468 33.3466 39.9064 33.0205C40.0018 32.82 40.0136 32.592 39.9417 32.3828C39.7534 31.8562 38.6039 31.1348 38.3646 30.5996C38.3254 30.5144 38.3306 30.2014 38.3306 30.0946L38.3385 29.2592C38.3411 28.786 38.3699 28.157 37.8272 27.9535C37.3695 27.7833 36.6228 27.8814 36.1246 27.867C35.5152 27.8511 35.5178 27.8973 35.0667 27.4803C34.6535 27.098 34.2599 26.5598 33.7577 26.3059C33.6086 26.2381 33.3798 26.2511 33.2242 26.264C32.535 26.4473 31.8721 27.6462 31.3058 27.8309C30.8508 27.978 29.6673 27.74 29.1181 27.9218C28.9259 27.9853 28.7624 28.1137 28.6578 28.2854C28.344 28.8033 28.6813 30.1364 28.4394 30.7107C28.3976 30.8073 28.1805 31.0107 28.0929 31.0959L27.5254 31.6398C27.1919 31.9601 26.7264 32.3569 26.8977 32.8762C27.1161 33.5414 28.2041 34.1055 28.4944 34.7389C28.5362 34.8283 28.5297 35.1342 28.5284 35.2467L28.5218 36.0648C28.5192 36.3346 28.4983 36.6823 28.6094 36.9434C29.0305 37.9245 30.7475 37.1901 31.4445 37.5537C32.0748 37.8827 32.7207 39.2475 33.6086 39.0672ZM30.992 38.4742C30.7697 38.4612 30.2898 38.4771 30.1224 38.4482C29.9851 38.6978 29.7942 39.1985 29.6791 39.4798L28.9023 41.3684C29.9916 41.0712 30.2126 40.8144 30.7985 41.9412C30.8442 42.0147 30.89 42.0883 30.9345 42.1619C31.0953 41.8459 31.3215 41.2631 31.4575 40.9211C31.6328 40.4825 31.8878 39.9314 32.0368 39.4957C31.8394 39.285 31.6145 39.0729 31.4078 38.8695C31.3032 38.7671 31.1032 38.5593 30.992 38.4742ZM35.8774 38.4713C35.6329 38.6776 35.0275 39.2619 34.8156 39.5072C35.2014 40.3815 35.5453 41.2991 35.9258 42.1778C36.0566 41.944 36.258 41.6151 36.4084 41.3871C36.4907 41.2631 36.5705 41.1577 36.7287 41.1303C37.0334 41.0755 37.6493 41.2818 37.9606 41.3655C37.8246 41.0611 37.6807 40.7235 37.5617 40.4118C37.3172 39.7684 36.9942 39.1162 36.7719 38.4684C36.5313 38.4612 36.1141 38.4497 35.8774 38.4713Z" fill="var(--cta)"/><path d="M33.159 28.3185C35.6069 28.1728 37.7123 29.9993 37.8614 32.3986C38.0104 34.7965 36.1444 36.8597 33.6964 37.0054C31.2485 37.1511 29.1431 35.3231 28.9941 32.9253C28.8463 30.5259 30.7097 28.4628 33.159 28.3185ZM33.5722 36.0229C35.4683 35.9435 36.9408 34.3724 36.8571 32.5141C36.7747 30.6558 35.1676 29.2159 33.2714 29.301C31.3792 29.3861 29.9147 30.9559 29.9983 32.8084C30.0807 34.6623 31.68 36.0993 33.5722 36.0229Z" fill="var(--cta)"/><path d="M35.0926 31.0108C35.4235 30.9733 35.6954 31.1147 35.7216 31.4696C35.736 31.6644 35.5987 31.8188 35.4666 31.9486C34.9658 32.4406 34.461 32.9326 33.9602 33.4246C33.7967 33.5847 33.2606 34.1315 33.0945 34.244C33.0134 34.2989 32.918 34.3277 32.8212 34.3263C32.5165 34.3234 31.9503 33.6713 31.7175 33.4419C31.4324 33.1706 30.9015 32.7926 31.2337 32.367C31.32 32.2574 31.4494 32.1881 31.5907 32.1766C31.6914 32.1693 31.7908 32.1924 31.8784 32.2429C32.0824 32.3583 32.6028 32.9254 32.8434 33.1302C33.1128 32.8446 33.5038 32.4507 33.7876 32.1895C34.0556 31.9428 34.7984 31.1161 35.0926 31.0108Z" fill="var(--cta)"/><path d="M21.3325 4.25179C25.262 4.04547 28.6188 6.99593 28.8333 10.8467C29.0477 14.696 26.0375 17.9884 22.1079 18.2005C18.1758 18.4126 14.8112 15.4607 14.5967 11.607C14.3822 7.75339 17.399 4.45954 21.3325 4.25179ZM21.8582 17.2223C25.232 17.1444 27.9061 14.406 27.8342 11.1006C27.7623 7.79378 24.973 5.16794 21.5993 5.23143C18.2137 5.29491 15.5238 8.03761 15.5958 11.3531C15.6677 14.67 18.4726 17.2987 21.8582 17.2223Z" fill="var(--cta)"/></svg>,
                  value: "120+", label: "Fachkräfte",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L30.18 16.52L44 18.54L34 28.28L36.36 42.04L24 35.54L11.64 42.04L14 28.28L4 18.54L17.82 16.52L24 4Z" stroke="var(--cta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  value: "4.9★", label: "Durchschnittsbewertung",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="19.25" stroke="var(--cta)" strokeWidth="1.5"/><path d="M24 12V26L33 28.4115" stroke="var(--cta)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  value: "48h", label: "bis zum ersten Termin",
                },
              ].map((s, i) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "var(--blue-ultra-light)", borderRadius: 14,
                  padding: "14px 20px",
                }}>
                  {s.icon}
                  <div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--cta)", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 12, color: "var(--grey-text)", marginTop: 3, whiteSpace: "nowrap" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Main content */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "16px 16px 32px" : isTablet ? "32px 32px 48px" : "48px 80px 60px", boxSizing: "border-box", width: "100%" }}>
        <div className="fk-layout" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 0 : isTablet ? 24 : 40, alignItems: "flex-start" }}>

          {/* Sidebar */}
          <FilterSidebar
            suche={suche} setSuche={setSuche}
            fachrichtung={fachrichtung} setFachrichtung={v => { setFachrichtung(v); setPage(1); }}
            angebot={angebot} toggleAngebotProp={v => { toggleAngebot(v); setPage(1); }}
            kasse={kasse} setKasse={v => { setKasse(v); setPage(1); }}
            verfuegbarkeit={verfuegbarkeit} setVerfuegbarkeit={v => { setVerfuegbarkeit(v); setPage(1); }}
            preisMin={preisMin} setPreisMin={v => { setPreisMin(v); setPage(1); }}
            preisMax={preisMax} setPreisMax={v => { setPreisMax(v); setPage(1); }}
            sprachen={sprachen} toggleSpracheProp={v => { toggleSprache(v); setPage(1); }}
            standort={standort} setStandort={v => { setStandort(v); setPage(1); }}
            onReset={onReset}
            resultCount={filtered.length}
            isMobile={isMobile}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0, width: "100%" }}>

            {/* Results bar */}
            {isMobile ? (
              <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <button onClick={() => setShowFilters(true)} onTouchEnd={e => { e.preventDefault(); setShowFilters(true); }} style={{ display: "flex", alignItems: "center", gap: 6, height: 44, padding: "0 16px", border: "1.5px solid var(--grey-border)", borderRadius: 9999, background: "white", fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 500, color: "var(--black)", cursor: "pointer", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M3 6h18M7 12h10M11 18h2"/></svg>
                    Filter
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, flexShrink: 1 }}>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)", whiteSpace: "nowrap" }}>Sortieren:</span>
                    <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }} style={{ height: 40, borderRadius: 8, border: "1px solid var(--grey-border)", padding: "0 28px 0 10px", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--black)", background: "white", appearance: "none", cursor: "pointer", minWidth: 0, maxWidth: "min(160px, 45vw)", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%235C5C5C' stroke-width='1.5' stroke-linecap='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", outline: "none" }}>
                      <option value="best">Empfohlen</option>
                      <option value="earliest">Frühester Termin</option>
                      <option value="rating">Höchste Bewertung</option>
                      <option value="experience">Meiste Erfahrung</option>
                      <option value="price-asc">Niedrigster Preis</option>
                      <option value="price-desc">Höchster Preis</option>
                    </select>
                  </div>
                </div>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)" }}>
                  {filtered.length} Fachkräfte gefunden
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--black)" }}>
                  {filtered.length} Fachkräfte gefunden
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--grey-text)" }}>Sortieren nach</span>
                  <div style={{ position: "relative" }}>
                    <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }} style={{ height: 36, borderRadius: 8, border: "1px solid var(--grey-border)", padding: "0 32px 0 12px", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "var(--black)", background: "white", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%235C5C5C' stroke-width='1.5' stroke-linecap='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", outline: "none" }}>
                      <option value="best">Empfohlen</option>
                      <option value="earliest">Frühester Termin</option>
                      <option value="rating">Höchste Bewertung</option>
                      <option value="experience">Meiste Erfahrung</option>
                      <option value="price-asc">Niedrigster Preis</option>
                      <option value="price-desc">Höchster Preis</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {paginated.length > 0 ? paginated.map(t => <TherapistCard key={t.id} t={t} isMobile={isMobile} />) : (
                <div style={{ padding: "60px 0", textAlign: "center", fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "var(--grey-text)" }}>
                  Keine Fachkräfte gefunden. Bitte passe deine Filter an.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, paddingTop: 32 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1} style={{ width: 38, height: 38, borderRadius: 9999, border: "1.5px solid var(--grey-border)", background: "white", cursor: safePage === 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: safePage === 1 ? "#C3C3C3" : "var(--grey-text)", opacity: safePage === 1 ? 0.5 : 1 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M15 18l-6-6 6-6"/></svg>
              </button>
              {pageItems.map((item, idx) =>
                item === "..." ? (
                  <span key={"dot-" + idx} style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "var(--grey-text)", userSelect: "none" }}>...</span>
                ) : (
                  <button key={item} onClick={() => setPage(item)} style={{
                    width: 38, height: 38, borderRadius: 9999,
                    border: item === safePage ? "none" : "1.5px solid var(--grey-border)",
                    background: item === safePage ? "var(--cta)" : "white",
                    color: item === safePage ? "white" : "var(--black)",
                    fontFamily: "'Poppins',sans-serif", fontWeight: item === safePage ? 600 : 400, fontSize: 14,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>{item}</button>
                )
              )}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} style={{ width: 38, height: 38, borderRadius: 9999, border: "1.5px solid var(--grey-border)", background: "white", cursor: safePage === totalPages ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: safePage === totalPages ? "#C3C3C3" : "var(--grey-text)", opacity: safePage === totalPages ? 0.5 : 1 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            )}
          </div>
        </div>

        {/* Orientierungstest Banner */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            background: "var(--blue-ultra-light)",
            backgroundImage: "url('/banner-bg.png')",
            backgroundSize: "cover", backgroundPosition: "center",
            padding: isMobile ? "28px 20px" : "52px 48px",
            display: "flex", flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between", gap: isMobile ? 20 : 0,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: isMobile ? 18 : 20, color: "var(--black)", margin: 0 }}>
                Nicht sicher, wo du anfangen sollst?
              </p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 15, color: "var(--grey-text)", margin: 0 }}>
                Unser Orientierungstest hilft dir, die passende Unterstützung zu finden.
              </p>
            </div>
            <a href="/orientierung" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15,
              color: "var(--cta)", background: "white",
              border: "1.5px solid var(--cta)", borderRadius: 9999,
              padding: "12px 28px", textDecoration: "none", whiteSpace: "nowrap",
              flexShrink: 0, transition: "background 0.18s, color 0.18s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--cta)"; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "white"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--cta)"; }}
            >
              Jetzt herausfinden
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media (max-width: 1070px) {
          .fk-layout { flex-direction: column !important; gap: 0 !important; width: 100% !important; }
          .fk-card { flex-direction: column !important; padding: 16px !important; border-radius: 12px !important; width: 100% !important; box-sizing: border-box !important; }
          .fk-card-photo { width: 100% !important; height: 200px !important; border-radius: 12px 12px 0 0 !important; align-self: auto !important; }
          .fk-card-content { padding: 16px !important; box-sizing: border-box !important; width: 100% !important; overflow: hidden !important; }
          .fk-card-content > div:first-child { flex-wrap: wrap !important; }
          .fk-page-header { padding: 16px 16px 12px !important; }
        }
        @media (min-width: 1071px) and (max-width: 1280px) {
          .fk-layout { gap: 24px !important; }
        }
      `}</style>    </main>
  );
}



