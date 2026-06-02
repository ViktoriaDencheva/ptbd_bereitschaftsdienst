const imgTelephones = "https://www.figma.com/api/mcp/asset/3701b42b-40cd-4e8f-8ef0-884ce267a4fe";
const imgLogo = "https://www.figma.com/api/mcp/asset/c4e185c2-f48e-4057-b053-23984bc562d1";
const imgLogoIcon = "https://www.figma.com/api/mcp/asset/1c756e87-0844-4e60-a824-6669cc813b3a";
const imgPhone = "https://www.figma.com/api/mcp/asset/1e71fbe6-0088-40a7-acc2-b1f3de097dd4";
const imgFacebook = "https://www.figma.com/api/mcp/asset/966dfd95-e328-4b5d-8b61-8dc54a75f70b";
const imgLinkedin = "https://www.figma.com/api/mcp/asset/eef1bbff-fc40-415c-87c0-71c31d135fe1";

const footerCols = [
  {
    title: "Plattform",
    links: ["Fachkräfte finden", "Orientierungsgespräch", "Termin buchen", "So funktioniert es", "Häufige Fragen", "Kontakt"],
  },
  {
    title: "Wichtige Informationen",
    links: ["Kosten & Krankenkasse", "Termin absagen & verschieben", "Ablauf der Beratung", "Krisenhilfe"],
  },
  {
    title: "Rechtliches",
    links: ["Datenschutz", "AGB", "Impressum", "Nutzungsbedingungen", "Cookie-Einstellungen"],
  },
  {
    title: "Kontakt",
    links: ["info@ptbd.at", "+43 1 123 45 67", "Mo–Fr · 9:00–17:00", "Österreichweit verfügbar"],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* Crisis section */}
      <div style={{
        position: "relative",
        padding: "32px var(--page-side)",
        overflow: "hidden",
      }}>
        <img src={imgTelephones} alt="" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(255,255,255,0.3)",
        }} />

        <div style={{
          maxWidth: "var(--max-width)", margin: "0 auto",
          position: "relative",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 32,
          flexWrap: "wrap",
        }} className="crisis-inner">
          {/* Left text */}
          <div style={{ maxWidth: 408, display: "flex", flexDirection: "column", gap: 8 }}>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(20px, 2.5vw, 28px)",
              lineHeight: 1.3, color: "var(--black)",
            }}>Brauchst Du sofort Hilfe?</h3>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 18,
              lineHeight: 1.5, color: "var(--grey)",
            }}>Wenn Du Dich in einer akuten Krise befindest, findest Du hier wichtige Anlaufstellen.</p>
          </div>

          {/* Main phone card */}
          <div style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "4px 8px 5px rgba(0,0,0,0.05)",
            display: "flex", flexDirection: "column", gap: 12,
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "var(--red-light-system)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <img src={imgPhone} alt="" style={{ width: 32, height: 32 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500, fontSize: 20,
                  lineHeight: 1.4, color: "var(--black)",
                }}>Telefonseelsorge</span>
                <a href="tel:142" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500, fontSize: 28,
                  lineHeight: 1.3, color: "var(--red-soft)",
                  textDecoration: "underline",
                }}>142</a>
              </div>
            </div>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 16,
              lineHeight: 1.5, color: "var(--black)",
            }}>24/7 - vertraulich & kostenlos</p>
          </div>

          {/* Additional numbers */}
          <div style={{
            backdropFilter: "blur(3px)",
            background: "rgba(254,244,240,0.5)",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <h4 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500, fontSize: 20,
              lineHeight: 1.4, color: "var(--black)",
            }}>Weitere Hilfsangebote:</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Ö3-Kummernummer:", num: "116 123" },
                { label: "Psychosozialer Dienst Wien:", num: "+43 1 313 30" },
                { label: "Kriseninterventionszentrum Wien:", num: "+43 1 406 95 95" },
              ].map((item, i) => (
                <p key={i} style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400, fontSize: 18,
                  lineHeight: 1.5, color: "var(--black)",
                  whiteSpace: "nowrap",
                }}>
                  {item.label}{" "}
                  <a href="#" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500, color: "var(--red-soft)",
                    textDecoration: "underline",
                  }}>{item.num}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{
        background: "white",
        borderTop: "0.8px solid #e8e7e6",
        padding: "32px var(--page-side)",
      }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 32,
            justifyContent: "space-between",
            flexWrap: "wrap", marginBottom: 24,
          }} className="footer-cols">
            {/* Brand col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, height: 50 }}>
                <img src={imgLogoIcon} alt="" style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
                <img src={imgLogo} alt="Psychotherapeutischer Bereitschaftsdienst" style={{ height: 32, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              </div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400, fontSize: 16,
                lineHeight: 1.5, color: "var(--grey)",
              }}>
                Wir verbinden Menschen mit qualifizierter psychosozialer Unterstützung - diskret, sicher und unkompliziert.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <img src={imgFacebook} alt="Facebook" style={{ width: 40, height: 40, cursor: "pointer" }} />
                <img src={imgLinkedin} alt="LinkedIn" style={{ width: 40, height: 40, cursor: "pointer" }} />
              </div>
            </div>

            {/* Link cols */}
            {footerCols.map((col) => (
              <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }}>
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500, fontSize: 16,
                  lineHeight: 1.5, color: "var(--black)",
                }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {col.links.map((link) => (
                    <a key={link} href="#" style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400, fontSize: 14,
                      lineHeight: 1.5, color: "var(--grey)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-dark)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--grey)")}
                    >{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid var(--grey-border)",
            paddingTop: 24,
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 14,
              lineHeight: 1.5, color: "var(--grey)",
              whiteSpace: "nowrap",
            }}>
              © 2026 Psychotherapeutischer Bereitschaftsdienst. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .crisis-inner { flex-direction: column !important; }
          .footer-cols { flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}
