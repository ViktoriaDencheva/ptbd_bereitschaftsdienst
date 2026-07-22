"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang";

const imgBg = "/TherapistProfile_bg.jpg";
const imgBgOverlay: string | null = null;
const imgQuote = "/icons/icon-quote.svg";
const imgKrankenkasse = "/icons/icon-kasse-detail.svg";

const STATIC_THERAPISTS = [
  { id: "1", name: "Dr. Sarah Müller",  roleIcon: "/icons/role-brain.svg",         kassenerstattung: true,  photo: "/fachkraefte/fachkraft-1.jpg" },
  { id: "2", name: "Thomas Weber",      roleIcon: "/icons/role-hilfe.svg",          kassenerstattung: false, photo: "/fachkraefte/fachkraft-2.jpg" },
  { id: "3", name: "Lisa Hoffmann",     roleIcon: "/icons/role-herz.svg",           kassenerstattung: false, photo: "/fachkraefte/fachkraft-3.jpg" },
  { id: "4", name: "Dr. Anna Schneider",roleIcon: "/icons/role-psychotherapie.svg", kassenerstattung: true,  photo: "/fachkraefte/fachkraft-4.jpg" },
];

export default function TherapistProfiles() {
  const [current, setCurrent] = useState(0);
  const { T } = useLang();
  const router = useRouter();
  const TP = T.therapistProfiles;
  const therapists = STATIC_THERAPISTS.map((s, i) => ({ ...s, ...TP.therapists[i] }));
  const t = therapists[current];

  const prev = () => setCurrent((current - 1 + therapists.length) % therapists.length);
  const next = () => setCurrent((current + 1) % therapists.length);

  return (
    <section style={{ background: "white" }} className="therapist-section">
      <div className="therapist-desktop" style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 80px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, marginBottom: 32 }}>
          {/* h2 — flex: 1, расте */}
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 32, lineHeight: 1.3, color: "var(--black)", flex: 1, minWidth: 220 }}>
            {TP.title1}{" "}
            <span style={{ color: "var(--cta-brand)" }}>{TP.title_highlight}</span>{TP.title2 ? " " + TP.title2 : ""}
          </h2>
          {/* p — flex: 1, расте */}
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: "var(--grey-text)", flex: 1, minWidth: 220 }}>
            {TP.subtitle}
          </p>
          {/* Бутон — фиксиран, винаги вдясно */}
          <a href="/fachkraefte"
            style={{ background: "var(--cta)", color: "white", border: "1.5px solid var(--cta)", borderRadius: "var(--radius-circle)", padding: "0 24px", height: 48, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, transition: "all var(--duration-base) var(--ease-standard)", flexShrink: 0, marginLeft: "auto", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
          >
            {TP.cta}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/></svg>
          </a>
        </div>

        {/* Preload всички снимки за бързо зареждане */}
        <div style={{ display: "none" }}>
          {therapists.map((th, i) => <img key={i} src={th.photo} alt="" />)}
        </div>

        {/* ── Card wrapper ── */}
        <div style={{ position: "relative", padding: "0 48px" }}>

          {/* Arrow left — outside card */}
          <button onClick={prev} style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "white", border: "1.5px solid #E2E8F0", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.color = "var(--cta)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.color = "#64748b"; }}
          ><ChevronLeft size={20} /></button>

          {/* Arrow right — outside card */}
          <button onClick={next} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "white", border: "1.5px solid #E2E8F0", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.color = "var(--cta)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.color = "#64748b"; }}
          ><ChevronRight size={20} /></button>

          {/* Main card */}
          <div onClick={() => router.push(`/fachkraefte/${t.id}`)} style={{ height: 500, borderRadius: 24, overflow: "hidden", display: "flex", cursor: "pointer", background: "white", boxShadow: "0 8px 48px rgba(0,0,0,0.10)" }} className="therapist-card">

            {/* Left — photo full-bleed */}
            <div key={`photo-${current}`} className="th-photo-col" style={{ position: "relative", width: "42%", flexShrink: 0, overflow: "hidden", animation: "fadeIn 0.4s ease" }}>
              <img src={t.photo} alt={t.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              {/* Dark gradient for quote readability */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(10,20,40,0.72) 0%, transparent 100%)" }} />
              {/* Quote */}
              <div style={{ position: "absolute", bottom: 28, left: 24, right: 24 }}>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: 8, opacity: 0.7 }}><path d="M0 20V12.5C0 5.596 4.09 1.417 12.27 0L13.5 2.25C10.16 3.083 8.083 4.5 7.27 6.5H12V20H0ZM16 20V12.5C16 5.596 20.09 1.417 28.27 0L29.5 2.25C26.16 3.083 24.083 4.5 23.27 6.5H28V20H16Z" fill="white"/></svg>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: 1.6, color: "white", margin: 0 }}>{t.quote}</p>
              </div>
            </div>

            {/* Right — info */}
            <div key={`info-${current}`} className="th-info-col" style={{ flex: 1, padding: "44px 52px 44px 44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, animation: "fadeIn 0.4s ease" }}>

              {/* Role + Kassenerstattung */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={t.roleIcon} alt="" style={{ width: 22, height: 22, objectFit: "contain", flexShrink: 0 }} />
                  <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 18, color: "var(--cta)", margin: 0, whiteSpace: "nowrap" }}>{t.role}</h4>
                </div>
                {t.kassenerstattung && (
                  <div style={{ background: "var(--green-light)", border: "1px solid var(--green)", borderRadius: 9999, padding: "4px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                    <img src={imgKrankenkasse} alt="" style={{ width: 18, height: 18, objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "var(--black)", whiteSpace: "nowrap" }}>{TP.kassenerstattung}</span>
                  </div>
                )}
              </div>

              {/* Name + underline */}
              <div>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, lineHeight: 1.2, color: "var(--black)", margin: "0 0 10px" }}>{t.name}</h2>
                <div style={{ height: 3, width: 160, borderRadius: 2, background: "var(--red-soft)" }} />
              </div>

              {/* Description */}
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, lineHeight: 1.7, color: "var(--grey-text)", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.desc}</p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {t.tags.map(tag => (
                  <span key={tag} style={{ background: "#F1F5F9", borderRadius: 9999, padding: "5px 14px", fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#475569", whiteSpace: "nowrap" }}>{tag}</span>
                ))}
              </div>

              {/* Mehr über mich */}
              <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, width: "fit-content" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--black)" }}>
                  {TP.mehr}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="currentColor"/></svg>
                </span>
                <div style={{ height: 2, background: "linear-gradient(to right, var(--cta), transparent)", borderRadius: 2 }} />
              </div>
            </div>
          </div>

          {/* Dots — below card */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
            {therapists.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ height: 8, width: i === current ? 28 : 8, borderRadius: 9999, background: i === current ? "var(--cta)" : "#CBD5E1", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="therapist-mob" style={{ display: "none", padding: "32px 16px" }}>

        {/* Header + бутон */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 26, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>
            {TP.title1}{" "}
            <span style={{ color: "var(--cta-brand)" }}>{TP.title_highlight}</span>{TP.title2 ? " " + TP.title2 : ""}
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
            {TP.subtitle}
          </p>
          {/* CTA бутон под subtitle */}
          <a href="/fachkraefte" style={{ width: "100%", background: "var(--cta)", color: "white", border: "none", borderRadius: 9999, height: 48, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none" }}>
            {TP.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill="white"/></svg>
          </a>
        </div>

        {/* Слайдер */}
        <div style={{ width: "100%", overflow: "hidden", borderRadius: 20 }}
          onTouchStart={e => {
            (e.currentTarget as HTMLElement).dataset.startX = String(e.touches[0].clientX);
          }}
          onTouchEnd={e => {
            const startX = Number((e.currentTarget as HTMLElement).dataset.startX);
            const diff = startX - e.changedTouches[0].clientX;
            if (diff > 40) next();
            else if (diff < -40) prev();
          }}
        >
          <div style={{
            display: "flex",
            width: `${therapists.length * 100}%`,
            transform: `translateX(-${current * (100 / therapists.length)}%)`,
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {therapists.map((th, i) => (
              <div key={i} style={{ width: `${100 / therapists.length}%`, flexShrink: 0, padding: i > 0 ? "0 0 0 0" : 0 }}>
                <a href={`/fachkraefte/${th.id}`} style={{ borderRadius: 20, overflow: "hidden", backgroundImage: "url('/TherapistProfile-background-mob.jpg')", backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", minHeight: 620, display: "flex", flexDirection: "column", textDecoration: "none" }}>

                  {/* Photo */}
                  <div style={{ height: 300, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                    <img src={th.photo} alt={th.name} className="photo-warm" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
                    {/* Quote overlay */}
                    <div style={{
                      position: "absolute", bottom: 12, left: 12, right: 12,
                      background: "rgba(214,235,255,0.82)", backdropFilter: "blur(8px)",
                      borderRadius: 12, padding: "10px 14px",
                      border: "1px solid rgba(255,255,255,0.7)",
                    }}>
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 13, lineHeight: 1.5, color: "var(--black)", margin: 0, fontStyle: "italic" }}>
                        „{th.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* Role + Kasse */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img src={th.roleIcon} alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--cta)" }}>{th.role}</span>
                      </div>
                      {th.kassenerstattung && (
                        <div style={{ background: "var(--green-light)", border: "1px solid var(--green)", borderRadius: 9999, padding: "4px 12px", alignSelf: "flex-start" }}>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "var(--black)", whiteSpace: "nowrap" }}>{TP.kassenerstattung}</span>
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    <div>
                      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 24, color: "var(--black)", margin: "0 0 6px" }}>{th.name}</h3>
                      <div style={{ height: 3, width: 120, borderRadius: 2, background: "var(--red-soft)" }} />
                    </div>
                    {/* Desc */}
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "var(--grey-text)", margin: 0 }}>{th.desc}</p>
                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
                      {th.tags.map(tag => (
                        <span key={tag} style={{ background: "rgba(255,255,255,0.85)", borderRadius: 9999, padding: "5px 14px", fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "var(--black)" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Dot индикатор под картата */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {therapists.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              height: 8,
              width: i === current ? 24 : 8,
              borderRadius: 9999,
              background: i === current ? "var(--cta)" : "#D4BAB8",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 1070px) {
          .therapist-desktop { display: none !important; }
          .therapist-mob { display: block !important; }
          .therapist-section { padding: 0 !important; }
        }
        @media (min-width: 1071px) and (max-width: 1280px) {
          .th-photo-col { width: 380px !important; }
          .th-info-col { padding: 32px 36px 32px 28px !important; }
        }
      `}</style>
    </section>
  );
}
