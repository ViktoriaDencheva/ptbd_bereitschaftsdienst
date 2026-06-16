"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Wie läuft die Beratung ab?",
    a: "Nach der Anmeldung wählst du zwischen einem persönlichen Vorgespräch oder einem kurzen Online-Test. Basierend darauf empfehlen wir dir passende Fachkräfte. Du buchst dann einen Termin – online per Videochat oder vor Ort in einer Praxis.",
  },
  { q: "Sind die Fachkräfte geprüft?", a: "Ja, alle Fachkräfte auf unserer Plattform sind staatlich anerkannte Psycholog*innen, Psychotherapeut*innen oder Psychiater*innen mit nachgewiesener Ausbildung und Berufserfahrung." },
  { q: "Wie schnell bekomme ich Unterstützung?", a: "In der Regel kannst du innerhalb von 24-72 Stunden einen Termin erhalten. Bei akuten Krisen versuchen wir schnellstmöglich zu vermitteln." },
  { q: "Was kostet die Beratung?", a: "Das Erstgespräch ist kostenlos und unverbindlich. Die weiteren Kosten hängen von der Fachkraft ab. Viele Krankenkassen übernehmen einen Teil der Kosten." },
  { q: "Wie werden meine Daten geschützt?", a: "Wir verarbeiten alle Daten DSGVO-konform. Gespräche sind Ende-zu-Ende verschlüsselt." },
  { q: "Muss ich sofort wissen, welche Unterstützung ich brauche?", a: "Nein. Du kannst zuerst unser kostenloses Orientierungsgespräch nutzen oder den Online-Test machen. Wir helfen dir, die richtige Unterstützung zu finden." },
];

export default function MiniFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="minifaq-section" style={{ background: "white", padding: 0 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48, display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600, fontSize: 40,
            lineHeight: "52px", color: "var(--black)",
          }}>Häufige Fragen</h2>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400, fontSize: 18,
            lineHeight: 1.5, color: "var(--grey)",
          }}>
            Hier findest Du Antworten auf die wichtigsten Fragen rund um unsere Plattform und den Ablauf der Unterstützung.{" "}
            <br />
            Bei weiteren Fragen kannst Du uns jederzeit{" "}
            <a href="#" style={{ color: "#0B72B2", textDecoration: "underline" }}>kontaktieren.</a>
          </p>
        </div>

        {/* FAQ items */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 8,
          maxWidth: 864, margin: "0 auto",
        }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  background: "none", border: "none",
                  borderBottom: open === i ? "none" : `1px solid var(--grey-border)`,
                  cursor: "pointer",
                  textAlign: "left", gap: 16,
                }}
              >
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500, fontSize: 20,
                  lineHeight: 1.4, color: "var(--black)",
                  flex: 1,
                }}>{faq.q}</span>
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {open === i
                    ? <Minus size={16} color="var(--black)" />
                    : <Plus size={16} color="var(--black)" />
                  }
                </div>
              </button>
              {open === i && (
                <div style={{
                  padding: "12px 16px 16px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400, fontSize: 16,
                  lineHeight: 1.5, color: "var(--grey)",
                  borderBottom: "1px solid var(--grey-border)",
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .minifaq-section { padding: 32px var(--page-side) 48px; }
        @media (max-width: 1070px) {
          .minifaq-section { padding: 24px 16px !important; }
          .minifaq-section h2 { font-size: 28px !important; }
          .minifaq-section p { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
}
