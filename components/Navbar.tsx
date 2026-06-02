"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const imgLogoIcon = "https://www.figma.com/api/mcp/asset/c961f5cc-5c4f-4871-ae6b-4cbbed7eb40f";
const imgLogoText = "https://www.figma.com/api/mcp/asset/648c18ab-4a7a-4327-8c61-c48836397b32";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Fachkräfte", "Über uns", "ÖH Helpline", "Mein Konto"];

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(15px)", background: "rgba(255,254,254,0.6)", borderBottom: "0.8px solid #e7eef6" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 80px" }} className="nav-inner">
        {/* Logo — fixed size, no stretch */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <img src={imgLogoIcon} alt="" style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
          <img src={imgLogoText} alt="Psychotherapeutischer Bereitschaftsdienst" style={{ height: 32, width: "auto", objectFit: "contain", flexShrink: 0 }} />
        </a>
        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href="#" style={{ padding: "8px", fontFamily: "'Poppins',sans-serif", fontWeight: l === "Home" ? 700 : 400, fontSize: l === "Home" ? 16 : 14, color: l === "Home" ? "var(--red-primary)" : "var(--black)", textDecoration: "none", lineHeight: 1.5, whiteSpace: "nowrap", transition: "color 0.2s" }}
              onMouseEnter={e => { if (l !== "Home") (e.currentTarget as HTMLElement).style.color = "var(--red-primary)"; }}
              onMouseLeave={e => { if (l !== "Home") (e.currentTarget as HTMLElement).style.color = "var(--black)"; }}
            >{l}</a>
          ))}
        </nav>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="mob-menu" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--black)" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "white", borderTop: "1px solid #e7eef6", padding: "12px 16px" }}>
          {links.map(l => (
            <a key={l} href="#" style={{ display: "block", padding: "12px 0", borderBottom: "1px solid #f5f5f5", fontFamily: "'Poppins',sans-serif", fontWeight: l === "Home" ? 700 : 400, fontSize: 16, color: l === "Home" ? "var(--red-primary)" : "var(--black)", textDecoration: "none" }}>{l}</a>
          ))}
          <button style={{ marginTop: 12, width: "100%", background: "var(--blue-dark)", color: "white", border: "none", borderRadius: "var(--radius-full)", padding: "12px", fontSize: 16, fontWeight: 500, cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}>
            Termin verinbaren
          </button>
        </div>
      )}
      <style>{`
        @media (max-width: 900px) {
          .nav-inner { padding: 8px 16px !important; }
          .desktop-nav { display: none !important; }
          .mob-menu { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
