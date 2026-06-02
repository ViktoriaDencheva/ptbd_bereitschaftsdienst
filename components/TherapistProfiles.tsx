"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imgBg = "https://www.figma.com/api/mcp/asset/10ad3a51-c80e-42bb-8c41-14758eb3c16e";
const imgBgOverlay = "https://www.figma.com/api/mcp/asset/557c6403-5bee-49aa-901b-60e06a786242";
const imgQuote = "https://www.figma.com/api/mcp/asset/cf8450c3-c3b7-411f-9d29-8298fbc78a7a";
const imgArrow = "https://www.figma.com/api/mcp/asset/4b6a393b-b801-4bf9-be05-9d467c384ee6";
const imgKrankenkasse = "https://www.figma.com/api/mcp/asset/897b6309-2fb9-44c1-a40d-95be12edd915";
const imgButtonArrow = "https://www.figma.com/api/mcp/asset/acdc3a5c-981a-4d3e-873a-230332151c74";

const therapists = [
  {
    name: "Dr. Sarah Müller",
    role: "Klinische Psychologin",
    roleIcon: "https://www.figma.com/api/mcp/asset/2a69b0d7-9739-4039-b7b0-c766b59f822d",
    quote: "Ich arbeite lösungsorientiert und unterstütze Sie dabei, Ihre Ressourcen zu aktivieren. Mein Ansatz ist empathisch und evidenzbasiert.",
    desc: "Spezialisiert auf Angststörungen und Burnout-Prävention. Ich begleite Sie auf Ihrem Weg zu mehr innerer Ruhe, Selbstvetrauen und emotionaler Stärke.",
    tags: ["Angststörungen", "Burnout", "Achtsamkeit"],
    kassenerstattung: true,
    photo: "https://www.figma.com/api/mcp/asset/db4e496d-4389-4325-b5ca-e1d859f2a97d",
  },
  {
    name: "Thomas Weber",
    role: "Diplom-Psychologe",
    roleIcon: "https://www.figma.com/api/mcp/asset/2a69b0d7-9739-4039-b7b0-c766b59f822d",
    quote: "Gemeinsam finden wir neue Perspektiven für Deine Zukunft.",
    desc: "Schwerpunkt Depressionen und Lebenskrisen. Gemeinsam finden wir neue Perspektiven für Ihre Zukunft.",
    tags: ["Depressionen", "Lebenskrisen", "Perspektivenfindung"],
    kassenerstattung: false,
    photo: "https://www.figma.com/api/mcp/asset/f61d7a09-4e25-4d93-9e7f-c1937e6e08ed",
  },
  {
    name: "Lisa Hoffmann",
    role: "Psychologin (M.Sc.)",
    roleIcon: "https://www.figma.com/api/mcp/asset/6101548c-84fe-4bef-83cf-f130b7e82605",
    quote: "Ich unterstütze Sie dabei, Ihre Stärken zu entdecken.",
    desc: "Fokus auf Stressbewältigung und Selbstwertthemen. Ich unterstütze Sie dabei, Ihre Stärken zu entdecken.",
    tags: ["Stressbewältigung", "Selbstwert", "Persönliche Entwicklung"],
    kassenerstattung: false,
    photo: "https://www.figma.com/api/mcp/asset/7465acfb-99ea-43fb-9c9d-7d7f81ac38d6",
  },
  {
    name: "Dr. Anna Schneider",
    role: "Fachärztin für Psychiatrie",
    roleIcon: "https://www.figma.com/api/mcp/asset/e88c4a5d-d872-4682-89c0-f96dd131592c",
    quote: "Veränderung beginnt dort, wo Verständnis und Vertrauen entstehen.",
    desc: "Spezialisiert auf Angststörungen, emotionale Belastungen und psychosomatische Beschwerden.",
    tags: ["Angststörungen", "Psychosomatik", "Emotionale Stabilität"],
    kassenerstattung: true,
    photo: "https://www.figma.com/api/mcp/asset/db732d66-d97c-4146-bc99-1fbaaee52bc9",
  },
];

export default function TherapistProfiles() {
  const [current, setCurrent] = useState(0);
  const t = therapists[current];

  return (
    <section style={{ background: "white", padding: "32px var(--page-side) 48px" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", gap: 24, marginBottom: 48,
          flexWrap: "wrap",
        }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 3vw, 32px)",
            lineHeight: 1.3,
            color: "var(--black)",
            maxWidth: 510,
          }}>
            Erfahrene Fachkräfte, die{" "}
            <span style={{ color: "var(--red-dark)" }}>für Dich</span>
            {" "}da sind
          </h2>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400, fontSize: 18,
            lineHeight: 1.5, color: "#454343",
            maxWidth: 444,
          }}>
            Jede Fachkraft bringt Expertise und Empathie mit – für eine Begleitung, die wirklich zu Dir passt.
          </p>
          <button style={{
            background: "var(--blue-dark)", color: "white",
            border: "none", borderRadius: 9999,
            padding: "12px 24px", height: 48,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500, fontSize: 16,
            cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 8,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--blue-primary)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--blue-dark)")}
          >
            Alle Fachkräfte ansehen
            <img src={imgButtonArrow} alt="" style={{ width: 24, height: 24 }} />
          </button>
        </div>

        {/* Main card */}
        <div style={{
          position: "relative",
          height: 600,
          borderRadius: 24,
          overflow: "hidden",
          display: "flex",
        }} className="therapist-card">
          {/* Background */}
          <img src={imgBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img src={imgBgOverlay} alt="" style={{ position: "absolute", top: "-8.18%", left: 0, width: "100%", height: "116.37%" }} />
          </div>

          {/* Left — photo + quote */}
          <div style={{
            position: "relative", width: 621, flexShrink: 0,
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            justifyContent: "flex-end",
            padding: "36px 42px",
          }}>
            <img src={t.photo} alt={t.name} style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }} />
            <div style={{
              position: "relative",
              backdropFilter: "blur(5px)",
              background: "rgba(214,235,255,0.5)",
              border: "2px solid white",
              borderRadius: 30,
              padding: "16px 24px",
              display: "flex", flexDirection: "column", gap: 0,
            }}>
              <img src={imgQuote} alt="" style={{ width: 47, height: 47, marginBottom: -5 }} />
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500, fontSize: 20,
                lineHeight: 1.4, color: "var(--black)",
                maxWidth: 489,
              }}>{t.quote}</p>
            </div>
          </div>

          {/* Right — info */}
          <div style={{
            flex: 1, position: "relative",
            padding: "32px 24px 32px 16px",
            display: "flex", flexDirection: "column",
            justifyContent: "center", gap: 32,
          }}>
            {/* Role + Kassenerstattung */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 24px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={t.roleIcon} alt="" style={{ width: 32, height: 32 }} />
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500, fontSize: 24,
                    lineHeight: 1.3, color: "var(--blue-dark)",
                    whiteSpace: "nowrap",
                  }}>{t.role}</span>
                </div>
                {t.kassenerstattung && (
                  <div style={{
                    background: "var(--green-light)",
                    border: "1px solid var(--green)",
                    borderRadius: 9999,
                    padding: "5px 13px",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <img src={imgKrankenkasse} alt="" style={{ width: 24, height: 24 }} />
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400, fontSize: 16,
                      color: "var(--black)", whiteSpace: "nowrap",
                    }}>Kassenrückerstattung möglich</span>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600, fontSize: 32,
                  lineHeight: 1.3, color: "var(--black)",
                  whiteSpace: "nowrap",
                }}>{t.name}</h3>
                <div style={{ background: "var(--red-soft)", height: 5, width: 220, borderRadius: 2 }} />
              </div>
            </div>

            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 18,
              lineHeight: 1.5, color: "var(--grey)",
            }}>{t.desc}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {t.tags.map(tag => (
                <span key={tag} style={{
                  background: "white",
                  borderRadius: 2000,
                  padding: "4px 16px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400, fontSize: 16,
                  color: "var(--black)", whiteSpace: "nowrap",
                }}>{tag}</span>
              ))}
            </div>

            {/* More link */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <button style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                height: 40, paddingRight: 24,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500, fontSize: 16,
                color: "var(--black)",
              }}>
                Mehr über mich
                <img src={imgArrow} alt="" style={{ width: 24, height: 24 }} />
              </button>
              <div style={{
                height: 2, width: 276,
                background: "linear-gradient(to right, var(--blue-primary), #f4f7ff)",
              }} />
            </div>
          </div>

          {/* Navigation arrows */}
          <button onClick={() => setCurrent((current - 1 + therapists.length) % therapists.length)} style={{
            position: "absolute", left: 120, top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.2)",
            border: "none", borderRadius: "50%",
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "white",
          }}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => setCurrent((current + 1) % therapists.length)} style={{
            position: "absolute", right: 40, top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.2)",
            border: "none", borderRadius: "50%",
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "white",
          }}>
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div style={{
            position: "absolute", bottom: 42,
            left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 5,
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(2px)",
            borderRadius: 50, padding: "10px",
          }}>
            {therapists.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: 10, height: 10,
                borderRadius: 5,
                background: i === current ? "white" : "rgba(255,255,255,0.5)",
                border: "none", cursor: "pointer",
                padding: 0,
              }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .therapist-card { height: auto !important; flex-direction: column !important; }
          .therapist-card > div:first-of-type { width: 100% !important; height: 280px !important; }
        }
      `}</style>
    </section>
  );
}
