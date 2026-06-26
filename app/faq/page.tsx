"use client";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Poppins', sans-serif";
const CTA_HEX = "#2D5B8D";
const W = { maxWidth: 1440, margin: "0 auto", padding: "0 40px" } as const;

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconChat    = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconUsers   = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconCalendar= () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2v4M8 2v4M3 10h18" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconCoin    = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={CTA_HEX} strokeWidth="1.8"/><path d="M12 7v10M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 2.5-5 2.5-5 5 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round"/></svg>;
const IconLock    = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0110 0v4" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconGlobe   = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={CTA_HEX} strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "orientierung", Icon: IconChat,     label: "Orientierungsgespräch" },
  { id: "fachkraefte", Icon: IconUsers,    label: "Fachkräfte" },
  { id: "termine",     Icon: IconCalendar, label: "Termine" },
  { id: "kosten",      Icon: IconCoin,     label: "Kosten" },
  { id: "datenschutz", Icon: IconLock,     label: "Datenschutz" },
  { id: "plattform",   Icon: IconGlobe,    label: "Plattform" },
];

const FAQ_DATA: { cat: string; q: string; a: string }[] = [
  { cat: "orientierung", q: "Ist das Orientierungsgespräch kostenlos?", a: "Ja, das Orientierungsgespräch ist vollständig kostenlos und unverbindlich. Du trägst keinerlei Kosten, egal ob du dich danach für eine Weitervermittlung entscheidest oder nicht." },
  { cat: "orientierung", q: "Wie lange dauert das Orientierungsgespräch?", a: "Das Gespräch dauert in der Regel zwischen 20 und 30 Minuten. Wir nehmen uns Zeit für deine Situation, ohne dich zu hetzen." },
  { cat: "orientierung", q: "Wer führt das Gespräch?", a: "Das Gespräch wird von ausgebildeten Fachkräften aus dem psychosozialen Bereich geführt — keine Laien, keine KI." },
  { cat: "orientierung", q: "Muss ich mich vorbereiten?", a: "Nein. Du musst nichts vorbereiten. Komm einfach so, wie du bist. Wir führen dich durch das Gespräch." },
  { cat: "orientierung", q: "Was passiert nach dem Gespräch?", a: "Nach dem Gespräch erhältst du konkrete Empfehlungen — passende Fachkräfte, nächste Schritte und bei Bedarf weitere Ressourcen." },

  { cat: "fachkraefte", q: "Was ist der Unterschied zwischen Psychologe und Psychotherapeut?", a: "Psycholog*innen diagnostizieren und beraten auf wissenschaftlicher Basis. Psychotherapeut*innen behandeln psychische Erkrankungen mit anerkannten Therapiemethoden. Oft arbeiten beide eng zusammen — wir helfen dir herauszufinden, wer für dich der richtige ist." },
  { cat: "fachkraefte", q: "Wie werden die Fachkräfte ausgewählt?", a: "Alle Fachkräfte im Netzwerk sind staatlich anerkannt, haben abgeschlossene Ausbildungen und werden regelmäßig überprüft. Qualität ist kein Zufall — wir arbeiten nur mit verifizierten Expert*innen." },
  { cat: "fachkraefte", q: "Kann ich eine Fachkraft nach Sprache oder Methode wählen?", a: "Ja. Du kannst Präferenzen nach Therapiemethode, Sprache, Geschlecht oder Region angeben. Wir versuchen, die passendste Fachkraft für dich zu finden." },
  { cat: "fachkraefte", q: "Was passiert, wenn ich mit der Fachkraft nicht zufrieden bin?", a: "Kein Problem. Du kannst uns jederzeit kontaktieren und wir suchen gemeinsam nach einer besseren Alternative. Die Qualität deiner Unterstützung steht an erster Stelle." },
  { cat: "fachkraefte", q: "Gibt es Fachkräfte in allen Bundesländern?", a: "Ja. Wir sind österreichweit tätig — in allen 9 Bundesländern. Auch in ländlicheren Regionen versuchen wir, passende Fachkräfte zu vermitteln." },
  { cat: "fachkraefte", q: "Bieten die Fachkräfte auch Online-Termine an?", a: "Viele Fachkräfte im Netzwerk bieten sowohl Präsenz- als auch Online-Termine an. Das erfährst du im Orientierungsgespräch." },

  { cat: "termine", q: "Wie schnell bekomme ich einen Termin?", a: "In der Regel innerhalb von 1–2 Wochen. Bei dringendem Bedarf versuchen wir, noch schneller zu reagieren." },
  { cat: "termine", q: "Kann ich Termine online buchen?", a: "Ja, nach der Vermittlung kannst du Termine direkt über unsere Plattform buchen und verwalten." },
  { cat: "termine", q: "Was, wenn ich einen Termin absagen muss?", a: "Termine können bis zu 24 Stunden vorher kostenlos storniert werden. Bitte informiere uns rechtzeitig, damit die Zeit für andere genutzt werden kann." },
  { cat: "termine", q: "Sind Abendtermine oder Wochenendtermine möglich?", a: "Ja, viele Fachkräfte im Netzwerk bieten flexible Zeiten an, darunter auch Abend- und Wochenendtermine." },

  { cat: "kosten", q: "Wer übernimmt die Kosten?", a: "Das hängt von der Art der Leistung ab. Das Orientierungsgespräch ist kostenlos. Die Therapiekosten werden je nach Fachkraft und Kassenvertrag unterschiedlich abgerechnet — wir klären das gemeinsam mit dir." },
  { cat: "kosten", q: "Übernimmt die Krankenkasse die Kosten?", a: "Bei Fachkräften mit Kassenvertrag werden die Kosten ganz oder teilweise von der Krankenkasse übernommen. Wir informieren dich über alle Optionen in deiner Region." },
  { cat: "kosten", q: "Was kostet eine Therapiestunde?", a: "Die Kosten variieren je nach Fachkraft, Methode und Region. Im Orientierungsgespräch geben wir dir eine realistische Einschätzung für deine Situation." },
  { cat: "kosten", q: "Gibt es finanzielle Unterstützung für Betroffene ohne Mittel?", a: "Ja. Es gibt verschiedene Fördermöglichkeiten und Institutionen in Österreich, die psychotherapeutische Unterstützung zu reduzierten Kosten anbieten. Wir helfen dir, die passende Lösung zu finden." },
  { cat: "kosten", q: "Entstehen Kosten für die Vermittlung selbst?", a: "Nein. Unsere Vermittlungsleistung ist für Ratsuchende kostenlos." },

  { cat: "datenschutz", q: "Wie werden meine Daten verwendet?", a: "Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage und Vermittlung verwendet. Wir geben keine Daten an Dritte weiter — außer mit deiner ausdrücklichen Zustimmung." },
  { cat: "datenschutz", q: "Wird mein Gespräch aufgezeichnet?", a: "Nein. Das Orientierungsgespräch wird nicht aufgezeichnet. Vertraulichkeit ist für uns Grundlage — nicht Option." },
  { cat: "datenschutz", q: "Wie lange werden meine Daten gespeichert?", a: "Wir speichern Daten nur so lange wie gesetzlich notwendig und löschen sie auf Anfrage. Details findest du in unserer Datenschutzerklärung." },

  { cat: "plattform", q: "Ist die Plattform für alle zugänglich?", a: "Ja. Die Plattform ist für alle Menschen in Österreich zugänglich — ohne Alterseinschränkung, ohne Warteliste für das Orientierungsgespräch." },
  { cat: "plattform", q: "Gibt es eine App?", a: "Aktuell ist die Plattform als Webseite verfügbar, die auch auf Mobilgeräten optimal funktioniert. Eine native App ist in Planung." },
  { cat: "plattform", q: "In welchen Sprachen ist die Plattform verfügbar?", a: "Die Plattform ist auf Deutsch verfügbar. Gespräche können auf Anfrage auch in anderen Sprachen geführt werden — je nach Verfügbarkeit der Fachkräfte." },
  { cat: "plattform", q: "Kann ich die Plattform auch für Angehörige nutzen?", a: "Ja. Du kannst das Orientierungsgespräch auch im Auftrag einer nahestehenden Person buchen — etwa für Kinder, Partner*innen oder Eltern." },
];

const FAQ_BY_CAT = CATEGORIES.map(cat => ({
  ...cat,
  items: FAQ_DATA.filter(f => f.cat === cat.id),
}));

// ─── Subcomponents ────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: 16,
          background: "none", border: "none",
          borderBottom: open ? "none" : "1px solid var(--grey-border)",
          cursor: "pointer", textAlign: "left", gap: 16,
        }}
      >
        <span style={{ fontFamily: F, fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: "var(--black)", flex: 1 }}>{q}</span>
        <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {open ? <Minus size={16} color="var(--black)" /> : <Plus size={16} color="var(--black)" />}
        </div>
      </button>
      {open && (
        <div style={{ padding: "12px 16px 16px", fontFamily: F, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey)", borderBottom: "1px solid var(--grey-border)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

function CategoryAccordion({ cat }: { cat: typeof FAQ_BY_CAT[number] }) {
  const [open, setOpen] = useState(false);
  const { Icon } = cat;
  return (
    <div style={{ borderRadius: 16, background: "#F5F8FD", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "white", flexShrink: 0 }}>
            <Icon />
          </span>
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: "#1A1A1A" }}>{cat.label}</span>
        </div>
        <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: open ? CTA_HEX : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path d={open ? "M2 8L6 4L10 8" : "M2 4L6 8L10 4"} stroke={open ? "white" : CTA_HEX} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ background: "white", borderRadius: "0 0 16px 16px" }}>
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

      {/* ── BREADCRUMBS ── */}
      <div className="faq-bc-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--grey-text)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CTA_HEX}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--grey-text)"}>Startseite</a>
          <span style={{ color: "#C3C3C3" }}>›</span>
          <span style={{ color: "var(--black)", fontWeight: 500 }}>FAQ</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "white", padding: "72px 0 64px", minHeight: 300 }}>
        <img src="/FAQ-banner.png" alt="" aria-hidden={true} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", pointerEvents: "none" as const }} />
        <div style={{ ...W, position: "relative", zIndex: 1 }}>
          <h1 className="faq-h1" style={{ fontFamily: F, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 16 }}>
            Wie können wir dir helfen?
          </h1>
          <p style={{ fontFamily: F, fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
            Hier findest du Antworten auf die häufigsten Fragen rund um unsere Plattform und psychotherapeutische Unterstützung.
          </p>

          <div style={{ position: "relative", maxWidth: 560 }}>
            <svg style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Suche nach einer Frage..."
              className="faq-search-input"
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 52, paddingRight: 20, height: 56, borderRadius: 16, border: "1.5px solid #DDE8F5", fontFamily: F, fontSize: 15.5, color: "#1A1A1A", outline: "none", boxShadow: "0 4px 24px rgba(45,91,141,0.10)", background: "white", transition: "border-color 0.2s, box-shadow 0.2s" }}
            />
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ── */}
      {filteredFaq && (
        <section style={{ background: "white", padding: "48px 0" }}>
          <div style={W}>
            <p style={{ fontFamily: F, fontSize: 13.5, color: "#888", marginBottom: 16 }}>
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
          <section style={{ background: "white", padding: "64px 0 0" }}>
            <div style={W}>
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 22, color: "#1A1A1A", textAlign: "center", marginBottom: 32 }}>Kategorien</h2>
              <div className="faq-cat-grid">
                {CATEGORIES.map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToCategory(id)}
                    className="faq-cat-card"
                    style={{
                      background: activeCategory === id ? "#EBF2FC" : "white",
                      border: activeCategory === id ? `1.5px solid ${CTA_HEX}` : "1.5px solid #DDE8F5",
                      borderRadius: 14, padding: "20px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, transition: "all 0.2s",
                    }}
                  >
                    <span style={{ display: "flex" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
                        {id === "orientierung" && <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
                        {id === "fachkraefte" && <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                        {id === "termine" && <><rect x="3" y="4" width="18" height="18" rx="2" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2v4M8 2v4M3 10h18" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                        {id === "kosten" && <><circle cx="12" cy="12" r="9" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8"/><path d="M12 7v10M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 2.5-5 2.5-5 5 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round"/></>}
                        {id === "datenschutz" && <><rect x="3" y="11" width="18" height="11" rx="2" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0110 0v4" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                        {id === "plattform" && <><circle cx="12" cy="12" r="9" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={activeCategory === id ? CTA_HEX : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
                      </svg>
                    </span>
                    <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12.5, color: activeCategory === id ? CTA_HEX : "#333", textAlign: "left", lineHeight: 1.3 }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ACCORDION ── */}
          <section ref={faqRef} style={{ background: "white", padding: "64px 0 0" }}>
            <div style={W}>
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
      <section style={{ background: "white", padding: "80px 0 96px" }}>
        <div style={W}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg, #F0F6FF 0%, #EBF2FC 100%)", borderRadius: 24, padding: "52px 40px", border: "1.5px solid #DDE8F5" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(45,91,141,0.12)" }}>
                <IconChat />
              </div>
            </div>
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
        </div>
      </section>

      <Footer />

      <style>{`
        .faq-bc-wrap { max-width: 1440px; margin: 0 auto; padding: 32px 80px 28px; }
        .faq-h1 { font-size: 42px; }
        .faq-search-input:focus { border-color: #2D5B8D !important; box-shadow: 0 0 0 3px rgba(45,91,141,0.15), 0 4px 24px rgba(45,91,141,0.10) !important; }
        .faq-cat-card:hover { border-color: #2D5B8D !important; box-shadow: 0 4px 16px rgba(45,91,141,0.12); transform: translateY(-2px); }
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
          .faq-bc-wrap { padding: 20px 16px 16px !important; }
          .faq-h1 { font-size: 30px !important; }
          .faq-cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .faq-popular-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .faq-cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
