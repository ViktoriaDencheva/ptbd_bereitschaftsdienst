"use client";
import { useState } from "react";

/* ── Tab икони ── */
const TabIconBrain   = () => <img src="/icon_psychologist.svg"   width={24} height={24} alt="" style={{ flexShrink: 0 }} />;
const TabIconHerz    = () => <img src="/icon_psychotherapeut.svg" width={24} height={24} alt="" style={{ flexShrink: 0 }} />;
const TabIconPlant   = () => <img src="/icon_psychiater.svg"     width={24} height={24} alt="" style={{ flexShrink: 0 }} />;
const TabIconSozial  = () => <img src="/icon_sozialberater.svg"  width={24} height={24} alt="" style={{ flexShrink: 0 }} />;

/* ── Инфо икони ── */
const IconGraduation = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M22 10V6L12 2L2 6L12 10L22 6V10M6 12.5V17.5L12 20L18 17.5V12.5L12 15L6 12.5Z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPerson = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="var(--cta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Данни ── */
const tabs = [
  {
    label: "Psycholog*in",
    Icon: TabIconBrain,
    bg: "#FEF5F0",
    tagBg: "#FDDDD0",
    tag: "Fokus auf Diagnostik & Beratung",
    title: "Psycholog*in",
    desc: "Psychologinnen und Psychologen sind Expertinnen für das menschliche Erleben und Verhalten. Sie diagnostizieren und beraten – ohne Medikamente zu verschreiben.",
    ausbildung: "Studium Psychologie (5 Jahre), Fokus auf Forschung, Diagnostik & Beratung",
    hilft: "Angststörungen, Depressionen, Burnout, Trauma, Lebens- und Beziehungsprobleme",
    wann: "Bei psychischen Beschwerden ohne Medikamentenbedarf – zur Diagnostik, Beratung und Begleitung",
    image: "/icons/image-psychologist.svg",
  },
  {
    label: "Psychotherapeut*in",
    Icon: TabIconHerz,
    bg: "#EFF6FF",
    tagBg: "#D6EBFF",
    tag: "Fokus auf Therapie & Heilung",
    title: "Psychotherapeut*in",
    desc: "Psychotherapeutinnen sind ausgebildet in anerkannten Therapieverfahren und begleiten Menschen bei der Verarbeitung von Belastungen und der Förderung psychischer Gesundheit.",
    ausbildung: "Psychologiestudium + mehrjährige Therapieausbildung (z.B. Verhaltenstherapie, Psychoanalyse)",
    hilft: "Depressionen, Angststörungen, Trauma, Essstörungen, Persönlichkeitsstörungen",
    wann: "Wenn eine tiefgehende Bearbeitung von Problemen gewünscht wird und Veränderung nachhaltig sein soll",
    image: "/icons/image-psychotherapeut.svg",
  },
  {
    label: "Psychiater*in",
    Icon: TabIconPlant,
    bg: "#EDFAEB",
    tagBg: "#C8F0C4",
    tag: "Fokus auf Diagnose & Medikation",
    title: "Psychiater*in",
    desc: "Psychiaterinnen sind Fachärztinnen für psychische Erkrankungen. Sie können Medikamente verschreiben und kombinieren Beratung mit medizinischer Behandlung.",
    ausbildung: "Medizinstudium + Facharztausbildung Psychiatrie (ca. 12 Jahre Gesamtausbildung)",
    hilft: "Schwere Depressionen, Schizophrenie, Bipolare Störungen, ADHS, schwere Angststörungen",
    wann: "Bei schweren psychischen Erkrankungen, die medikamentöse Behandlung erfordern",
    image: "/icons/image-psychiater.svg",
  },
  {
    label: "Sozialberater*in",
    Icon: TabIconSozial,
    bg: "#FFF8EE",
    tagBg: "#FFE8C0",
    tag: "Fokus auf Lebensberatung & Orientierung",
    title: "Sozialberater*in",
    desc: "Soziale Lebensberater*innen begleiten Menschen in schwierigen Lebenssituationen — ohne Diagnose, ohne lange Wartezeiten. Ideal bei Krisen, Orientierungsbedarf und alltäglichen Belastungen.",
    ausbildung: "Ausbildung in sozialer Beratung, Coaching oder Lebensberatung (je nach Spezialisierung)",
    hilft: "Lebenskrisen, Orientierungslosigkeit, Stress, Beziehungsfragen, berufliche Veränderungen",
    wann: "Wenn du Unterstützung und Orientierung suchst, ohne eine klinische Diagnose zu benötigen",
    image: "/sozialberater.jpg",
  },
];

export default function TherapistDifference() {
  const [active, setActive] = useState(0);
  const t = tabs[active];

  const infoRows = [
    { Icon: IconGraduation, label: "Ausbildung",     text: t.ausbildung },
    { Icon: IconPerson,     label: "Hilft bei",      text: t.hilft },
    { Icon: IconCalendar,   label: "Wann sinnvoll?", text: t.wann },
  ];

  return (
    <section style={{ background: "white" }}>
      <div className="td-desktop" style={{ padding: "48px 80px", maxWidth: "var(--max-width)", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 32, lineHeight: 1.3, color: "var(--black)", flexShrink: 0 }}>
            Wer hilft wobei?
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)", flex: 1, minWidth: 220 }}>
            Psycholog*in, Psychotherapeut*in, Psychiater*in oder Sozialberater*in – vier Berufsgruppen, unterschiedliche Schwerpunkte. Wir erklären Dir die Unterschiede – einfach und verständlich.
          </p>
          <a
            href="/unterschied"
            style={{ background: "var(--cta)", color: "white", border: "1.5px solid var(--cta)", borderRadius: "var(--radius-circle)", padding: "0 24px", height: 48, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: "auto", transition: "background 0.2s", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
          >
            Unterschiede im Detail ansehen
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/></svg>
          </a>
        </div>

        {/* ── Tabs + Content ── */}
        <div style={{ display: "grid", gridTemplateColumns: "306px 1fr", gap: 20, alignItems: "start" }}>

          {/* Ляво — табове */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tabs.map((tab, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 12,
                    // Активен: 306×64, неактивен: 300×60
                    width: isActive ? 306 : 300,
                    height: isActive ? 64 : 60,
                    padding: "0 16px",
                    // Фон: активен red-bg, неактивен бял
                    background: isActive ? "var(--red-bg)" : "white",
                    // Бордър: активен ляв red-soft 2px, неактивен сив
                    border: "none",
                    borderLeft: isActive ? "2px solid var(--red-soft)" : "none",
                    // Заобляне само отдясно 8px
                    borderRadius: "0 8px 8px 0",
                    cursor: "pointer",
                    transition: "all var(--duration-base) var(--ease-standard)",
                    boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <tab.Icon />
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: isActive ? 600 : 400, fontSize: 16, color: "var(--black)" }}>
                      {tab.label}
                    </span>
                  </div>
                  {/* Стрелка — на всички табове */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="#1A1A1A"/>
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Дясно — съдържание (един и същи вид за всички табове) */}
          <div
            key={active}
            className="td-content-card"
            style={{
              background: "linear-gradient(135deg, #FFF6F2 0%, #F5FBFF 100%)",
              borderRadius: 20,
              padding: 32,
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gridTemplateRows: "auto auto",
              columnGap: 32,
              rowGap: 24,
              animation: "tdFadeIn 0.3s ease",
            }}
          >
            {/* Текст — ред 1, колона 1 */}
            <div style={{ gridColumn: 1, gridRow: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Tag — blue-bg-light */}
              <span style={{
                display: "inline-flex", alignSelf: "flex-start",
                background: "var(--blue-subtle)", borderRadius: 9999,
                padding: "4px 14px",
                fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: "var(--black)",
              }}>
                {t.tag}
              </span>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 36, lineHeight: 1.2, color: "var(--black)", margin: 0 }}>
                {t.title}
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>
                {t.desc}
              </p>
            </div>

            {/* Илюстрация — колона 2, span 2 реда (overlap) */}
            <div style={{ gridColumn: 2, gridRow: "1 / 3", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <img
                src={t.image}
                alt={t.title}
                style={{ width: "100%", maxWidth: 240, height: "auto", objectFit: active === 3 ? "cover" : "contain", borderRadius: active === 3 ? 16 : 0 }}
              />
            </div>

            {/* 3 бенефита — ред 2, span двете колони */}
            <div className="td-benefits-grid" style={{ gridColumn: "1 / 3", gridRow: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {infoRows.map(({ Icon, label, text }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#D6EBFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon />
                    </div>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--black)" }}>{label}</span>
                  </div>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--grey-text)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="td-mobile" style={{ display: "none", padding: "32px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 26, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
            Wer hilft wobei?
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
            Drei Berufsgruppen, unterschiedliche Schwerpunkte – einfach erklärt.
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none" }}>
          {tabs.map((tab, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="td-tab-btn"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "10px 16px", flexShrink: 0,
                  background: isActive ? "var(--red-bg)" : "white",
                  border: isActive ? "1.5px solid var(--red-soft)" : "1.5px solid var(--grey-bg)",
                  borderRadius: 9999,
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 15, color: "var(--black)",
                  transition: "all 0.2s ease",
                }}
              >
                <tab.Icon />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content card */}
        <div key={active} style={{ background: "linear-gradient(135deg, var(--red-bg) 0%, var(--blue-ultra-light) 100%)", borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 16, animation: "tdFadeIn 0.3s ease" }}>
          {/* Илюстрация + tag + заглавие */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img className="td-card-img" src={t.image} alt={t.title} style={{ width: 120, height: 120, objectFit: active === 3 ? "cover" : "contain", borderRadius: active === 3 ? 12 : 0, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              <span style={{ display: "inline-flex", alignSelf: "flex-start", background: "var(--blue-subtle)", borderRadius: 9999, padding: "3px 10px", fontFamily: "'Poppins', sans-serif", fontSize: 11, color: "var(--black)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                {t.tag}
              </span>
              <h3 className="td-card-title" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 20, lineHeight: 1.2, color: "var(--black)", margin: 0 }}>
                {t.title}
              </h3>
            </div>
          </div>

          {/* Описание — съкратено */}
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--grey-text)", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {t.desc}
          </p>

          {/* Info rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {infoRows.map(({ Icon, label, text }) => (
              <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#D6EBFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--black)" }}>{label}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--grey-text)" }}>{text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/unterschied" style={{ width: "100%", background: "var(--cta)", color: "white", border: "none", borderRadius: 9999, height: 48, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4, textDecoration: "none" }}>
            Unterschiede im Detail ansehen
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/></svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes tdFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1070px) {
          .td-desktop { display: none !important; }
          .td-mobile { display: block !important; }
        }
        @media (max-width: 390px) {
          .td-tab-btn { font-size: 13px !important; padding: 8px 12px !important; }
          .td-card-img { width: 96px !important; height: 96px !important; }
          .td-card-title { font-size: 18px !important; }
        }
        @media (min-width: 1071px) and (max-width: 1280px) {
          .td-content-card { grid-template-columns: 1fr 200px !important; column-gap: 20px !important; }
          .td-benefits-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
