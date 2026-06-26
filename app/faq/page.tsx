"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA_HEX = "#2D5B8D";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "orientierung", emoji: "🩵", label: "Orientierungsgespräch" },
  { id: "fachkraefte", emoji: "👩‍⚕️", label: "Fachkräfte" },
  { id: "termine",     emoji: "📅", label: "Termine" },
  { id: "kosten",      emoji: "💶", label: "Kosten" },
  { id: "datenschutz", emoji: "🔒", label: "Datenschutz" },
  { id: "plattform",   emoji: "🌐", label: "Plattform" },
];

const POPULAR = [
  { q: "Ist das Orientierungsgespräch kostenlos?",             cat: "orientierung" },
  { q: "Wie schnell bekomme ich einen Termin?",                cat: "termine" },
  { q: "Wer übernimmt die Kosten?",                           cat: "kosten" },
  { q: "Was ist der Unterschied zwischen Psychologe und Psychotherapeut?", cat: "fachkraefte" },
];

const FAQ_DATA: { cat: string; q: string; a: string }[] = [
  // Orientierungsgespräch
  { cat: "orientierung", q: "Ist das Orientierungsgespräch kostenlos?", a: "Ja, das Orientierungsgespräch ist vollständig kostenlos und unverbindlich. Du trägst keinerlei Kosten, egal ob du dich danach für eine Weitervermittlung entscheidest oder nicht." },
  { cat: "orientierung", q: "Wie lange dauert das Orientierungsgespräch?", a: "Das Gespräch dauert in der Regel zwischen 20 und 30 Minuten. Wir nehmen uns Zeit für deine Situation, ohne dich zu hetzen." },
  { cat: "orientierung", q: "Wer führt das Gespräch?", a: "Das Gespräch wird von ausgebildeten Fachkräften aus dem psychosozialen Bereich geführt — keine Laien, keine KI." },
  { cat: "orientierung", q: "Muss ich mich vorbereiten?", a: "Nein. Du musst nichts vorbereiten. Komm einfach so, wie du bist. Wir führen dich durch das Gespräch." },
  { cat: "orientierung", q: "Was passiert nach dem Gespräch?", a: "Nach dem Gespräch erhältst du konkrete Empfehlungen — passende Fachkräfte, nächste Schritte und bei Bedarf weitere Ressourcen." },

  // Fachkräfte
  { cat: "fachkraefte", q: "Was ist der Unterschied zwischen Psychologe und Psychotherapeut?", a: "Psycholog*innen diagnostizieren und beraten auf wissenschaftlicher Basis. Psychotherapeut*innen behandeln psychische Erkrankungen mit anerkannten Therapiemethoden. Oft arbeiten beide eng zusammen — wir helfen dir herauszufinden, wer für dich der richtige ist." },
  { cat: "fachkraefte", q: "Wie werden die Fachkräfte ausgewählt?", a: "Alle Fachkräfte im Netzwerk sind staatlich anerkannt, haben abgeschlossene Ausbildungen und werden regelmäßig überprüft. Qualität ist kein Zufall — wir arbeiten nur mit verifizierten Expert*innen." },
  { cat: "fachkraefte", q: "Kann ich eine Fachkraft nach Sprache oder Methode wählen?", a: "Ja. Du kannst Präferenzen nach Therapiemethode, Sprache, Geschlecht oder Region angeben. Wir versuchen, die passendste Fachkraft für dich zu finden." },
  { cat: "fachkraefte", q: "Was passiert, wenn ich mit der Fachkraft nicht zufrieden bin?", a: "Kein Problem. Du kannst uns jederzeit kontaktieren und wir suchen gemeinsam nach einer besseren Alternative. Die Qualität deiner Unterstützung steht an erster Stelle." },
  { cat: "fachkraefte", q: "Gibt es Fachkräfte in allen Bundesländern?", a: "Ja. Wir sind österreichweit tätig — in allen 9 Bundesländern. Auch in ländlicheren Regionen versuchen wir, passende Fachkräfte zu vermitteln." },
  { cat: "fachkraefte", q: "Bieten die Fachkräfte auch Online-Termine an?", a: "Viele Fachkräfte im Netzwerk bieten sowohl Präsenz- als auch Online-Termine an. Das erfährst du im Orientierungsgespräch." },

  // Termine
  { cat: "termine", q: "Wie schnell bekomme ich einen Termin?", a: "In der Regel innerhalb von 1–2 Wochen. Bei dringendem Bedarf versuchen wir, noch schneller zu reagieren." },
  { cat: "termine", q: "Kann ich Termine online buchen?", a: "Ja, nach der Vermittlung kannst du Termine direkt über unsere Plattform buchen und verwalten." },
  { cat: "termine", q: "Was, wenn ich einen Termin absagen muss?", a: "Termine können bis zu 24 Stunden vorher kostenlos storniert werden. Bitte informiere uns rechtzeitig, damit die Zeit für andere genutzt werden kann." },
  { cat: "termine", q: "Sind Abendtermine oder Wochenendtermine möglich?", a: "Ja, viele Fachkräfte im Netzwerk bieten flexible Zeiten an, darunter auch Abend- und Wochenendtermine." },

  // Kosten
  { cat: "kosten", q: "Wer übernimmt die Kosten?", a: "Das hängt von der Art der Leistung ab. Das Orientierungsgespräch ist kostenlos. Die Therapiekosten werden je nach Fachkraft und Kassenvertrag unterschiedlich abgerechnet — wir klären das gemeinsam mit dir." },
  { cat: "kosten", q: "Übernimmt die Krankenkasse die Kosten?", a: "Bei Fachkräften mit Kassenvertrag werden die Kosten ganz oder teilweise von der Krankenkasse übernommen. Wir informieren dich über alle Optionen in deiner Region." },
  { cat: "kosten", q: "Was kostet eine Therapiestunde?", a: "Die Kosten variieren je nach Fachkraft, Methode und Region. Im Orientierungsgespräch geben wir dir eine realistische Einschätzung für deine Situation." },
  { cat: "kosten", q: "Gibt es finanzielle Unterstützung für Betroffene ohne Mittel?", a: "Ja. Es gibt verschiedene Fördermöglichkeiten und Institutionen in Österreich, die psychotherapeutische Unterstützung zu reduzierten Kosten anbieten. Wir helfen dir, die passende Lösung zu finden." },
  { cat: "kosten", q: "Entstehen Kosten für die Vermittlung selbst?", a: "Nein. Unsere Vermittlungsleistung ist für Ratsuchende kostenlos." },

  // Datenschutz
  { cat: "datenschutz", q: "Wie werden meine Daten verwendet?", a: "Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage und Vermittlung verwendet. Wir geben keine Daten an Dritte weiter — außer mit deiner ausdrücklichen Zustimmung." },
  { cat: "datenschutz", q: "Wird mein Gespräch aufgezeichnet?", a: "Nein. Das Orientierungsgespräch wird nicht aufgezeichnet. Vertraulichkeit ist für uns Grundlage — nicht Option." },
  { cat: "datenschutz", q: "Wie lange werden meine Daten gespeichert?", a: "Wir speichern Daten nur so lange wie gesetzlich notwendig und löschen sie auf Anfrage. Details findest du in unserer Datenschutzerklärung." },

  // Plattform
  { cat: "plattform", q: "Ist die Plattform für alle zugänglich?", a: "Ja. Die Plattform ist für alle Menschen in Österreich zugänglich — ohne Alterseinschränkung, ohne Warteliste für das Orientierungsgespräch." },
  { cat: "plattform", q: "Gibt es eine App?", a: "Aktuell ist die Plattform als Webseite verfügbar, die auch auf Mobilgeräten optimal funktioniert. Eine native App ist in Planung." },
  { cat: "plattform", q: "In welchen Sprachen ist die Plattform verfügbar?", a: "Die Plattform ist auf Deutsch verfügbar. Gespräche können auf Anfrage auch in anderen Sprachen geführt werden — je nach Verfügbarkeit der Fachkräfte." },
  { cat: "plattform", q: "Kann ich die Plattform auch für Angehörige nutzen?", a: "Ja. Du kannst das Orientierungsgespräch auch im Auftrag einer nahestehenden Person buchen — etwa für Kinder, Partner*innen oder Eltern." },
];

// group by category
const FAQ_BY_CAT = CATEGORIES.map(cat => ({
  ...cat,
  items: FAQ_DATA.filter(f => f.cat === cat.id),
}));

// ─── Subcomponents ────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const [helpful, setHelpful] = useState<null | "yes" | "no">(null);

  return (
    <div style={{ borderBottom: "1px solid #E8EFF8" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" }}
      >
        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: "#1A1A1A", lineHeight: 1.45 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: open ? CTA_HEX : "#EBF2FC", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d={open ? "M2 8L6 4L10 8" : "M2 4L6 8L10 4"} stroke={open ? "white" : CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <div style={{ paddingBottom: 20 }}>
          <p style={{ fontFamily: F, fontSize: 14.5, color: "#444", lineHeight: 1.7, margin: 0 }}>{a}</p>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: F, fontSize: 12.5, color: "#888" }}>War diese Antwort hilfreich?</span>
            {helpful === null ? (
              <>
                <button onClick={() => setHelpful("yes")} style={{ background: "#F0FAF2", border: "1px solid #C6E8CC", borderRadius: 8, padding: "4px 12px", fontFamily: F, fontSize: 12.5, color: "#2D7A3A", cursor: "pointer" }}>👍 Ja</button>
                <button onClick={() => setHelpful("no")}  style={{ background: "#FFF0F0", border: "1px solid #F5C6C6", borderRadius: 8, padding: "4px 12px", fontFamily: F, fontSize: 12.5, color: "#B03A3A", cursor: "pointer" }}>👎 Nein</button>
              </>
            ) : (
              <span style={{ fontFamily: F, fontSize: 12.5, color: "#888" }}>{helpful === "yes" ? "Danke für dein Feedback! 🙏" : "Danke — wir verbessern uns."}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryAccordion({ cat }: { cat: typeof FAQ_BY_CAT[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 16, border: "1.5px solid #DDE8F5", overflow: "hidden", background: "white" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: open ? "#F3F8FF" : "white", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, transition: "background 0.2s" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>{cat.emoji}</span>
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "#1A1A1A" }}>{cat.label}</span>
          <span style={{ fontFamily: F, fontSize: 13, color: "#888", background: "#EBF2FC", borderRadius: 999, padding: "2px 10px" }}>{cat.items.length} Fragen</span>
        </div>
        <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: open ? CTA_HEX : "#EBF2FC", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path d={open ? "M2 8L6 4L10 8" : "M2 4L6 8L10 4"} stroke={open ? "white" : CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 24px", background: "white" }}>
          {cat.items.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    setTimeout(() => faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const filteredFaq = query.trim()
    ? FAQ_DATA.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()))
    : null;

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(160deg, #F0F6FF 0%, #FAFCFF 60%, white 100%)", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {/* illustration placeholder — person reading */}
          <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="48" cy="48" r="48" fill="#EBF2FC"/>
              {/* tablet */}
              <rect x="28" y="34" width="40" height="30" rx="4" fill="white" stroke={CTA_HEX} strokeWidth="2"/>
              <rect x="32" y="38" width="24" height="2.5" rx="1.25" fill={CTA_HEX} opacity=".4"/>
              <rect x="32" y="43" width="32" height="2.5" rx="1.25" fill={CTA_HEX} opacity=".25"/>
              <rect x="32" y="48" width="28" height="2.5" rx="1.25" fill={CTA_HEX} opacity=".25"/>
              <rect x="32" y="53" width="20" height="2.5" rx="1.25" fill={CTA_HEX} opacity=".2"/>
              {/* person head */}
              <circle cx="48" cy="23" r="9" fill="#FDDCB5"/>
              {/* body */}
              <path d="M32 72c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#B8D0EE"/>
              {/* question mark accent */}
              <circle cx="70" cy="28" r="10" fill={CTA_HEX}/>
              <text x="70" y="33" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="bold" fill="white">?</text>
            </svg>
          </div>

          <h1 className="faq-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 16 }}>
            Wie können wir dir helfen?
          </h1>
          <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
            Hier findest du Antworten auf die häufigsten Fragen rund um unsere Plattform und psychotherapeutische Unterstützung.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
            <svg style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Suche nach einer Frage..."
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 52, paddingRight: 20, height: 56, borderRadius: 16, border: "1.5px solid #DDE8F5", fontFamily: F, fontSize: 15.5, color: "#1A1A1A", outline: "none", boxShadow: "0 4px 24px rgba(45,91,141,0.10)", background: "white" }}
            />
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ── */}
      {filteredFaq && (
        <section style={{ background: "white", padding: "0 24px 48px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontFamily: F, fontSize: 13.5, color: "#888", marginBottom: 16, paddingTop: 32 }}>
              {filteredFaq.length} Ergebnis{filteredFaq.length !== 1 ? "se" : ""} für „{query}"
            </p>
            {filteredFaq.length === 0 ? (
              <p style={{ fontFamily: F, fontSize: 15, color: "#555" }}>Keine Fragen gefunden. Versuch ein anderes Stichwort oder <a href="/kontakt" style={{ color: CTA_HEX }}>kontaktiere uns direkt</a>.</p>
            ) : (
              <div style={{ background: "white", borderRadius: 16, border: "1.5px solid #DDE8F5", padding: "0 24px" }}>
                {filteredFaq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {!filteredFaq && (
        <>
          {/* ── KATEGORIEN ── */}
          <section style={{ background: "white", padding: "64px 24px 0" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", textAlign: "center", marginBottom: 32 }}>Kategorien</h2>
              <div className="faq-cat-grid">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    style={{
                      background: activeCategory === cat.id ? "#EBF2FC" : "white",
                      border: activeCategory === cat.id ? `1.5px solid ${CTA_HEX}` : "1.5px solid #DDE8F5",
                      borderRadius: 14, padding: "20px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                    <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14, color: activeCategory === cat.id ? CTA_HEX : "#333", textAlign: "center", lineHeight: 1.3 }}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── BELIEBTE FRAGEN ── */}
          <section style={{ background: "white", padding: "64px 24px 0" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", marginBottom: 8 }}>Beliebte Fragen</h2>
              <p style={{ fontFamily: F, fontSize: 14.5, color: "#888", marginBottom: 28 }}>Diese Fragen werden am häufigsten gestellt.</p>
              <div className="faq-popular-grid">
                {POPULAR.map((item, i) => {
                  const catData = CATEGORIES.find(c => c.id === item.cat);
                  return (
                    <button
                      key={i}
                      onClick={() => scrollToCategory(item.cat)}
                      style={{ background: "#F8FAFF", border: "1.5px solid #DDE8F5", borderRadius: 14, padding: "20px 20px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 10, transition: "box-shadow 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(45,91,141,0.12)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <span style={{ fontSize: 20 }}>⭐</span>
                      <span style={{ fontFamily: F, fontWeight: 600, fontSize: 14.5, color: "#1A1A1A", lineHeight: 1.4 }}>{item.q}</span>
                      <span style={{ fontFamily: F, fontSize: 12.5, color: CTA_HEX, background: "#EBF2FC", borderRadius: 999, padding: "2px 10px", width: "fit-content" }}>
                        {catData?.emoji} {catData?.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── FAQ ACCORDION ── */}
          <section ref={faqRef} style={{ background: "white", padding: "64px 24px 0" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", marginBottom: 8 }}>Alle Fragen</h2>
              <p style={{ fontFamily: F, fontSize: 14.5, color: "#888", marginBottom: 32 }}>Wähle eine Kategorie und finde schnell die passende Antwort.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {FAQ_BY_CAT.map(cat => (
                  <div key={cat.id} id={`cat-${cat.id}`}>
                    <CategoryAccordion cat={cat} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── NOCH FRAGEN ── */}
      <section style={{ background: "white", padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg, #F0F6FF 0%, #EBF2FC 100%)", borderRadius: 24, padding: "52px 40px", border: "1.5px solid #DDE8F5" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
          <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", marginBottom: 10 }}>Noch Fragen?</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>
            Wenn du keine passende Antwort gefunden hast, helfen wir dir gerne persönlich weiter.
          </p>
          <a
            href="/kontakt"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 50, padding: "0 32px", borderRadius: 9999, background: CTA_HEX, color: "white", fontFamily: F, fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(45,91,141,0.22)" }}
          >
            Zum Kontaktformular
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        .faq-h1 { font-size: 42px; }
        .faq-cat-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .faq-popular-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 1070px) {
          .faq-h1 { font-size: 30px !important; }
          .faq-cat-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .faq-popular-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .faq-cat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
