"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, User, Phone } from "lucide-react";
import { getStoredUser, clearUser, getFirstName, type AuthUser } from "@/lib/auth";
import { useLang } from "@/lib/lang";

const ArrowIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.6343 6.23433C12.9467 5.92191 13.4533 5.92191 13.7657 6.23433L18.5657 11.0343C18.8781 11.3467 18.8781 11.8533 18.5657 12.1657L13.7657 16.9657C13.4533 17.2781 12.9467 17.2781 12.6343 16.9657C12.3219 16.6533 12.3219 16.1467 12.6343 15.8343L16.0686 12.4H6.8C6.35817 12.4 6 12.0418 6 11.6C6 11.1582 6.35817 10.8 6.8 10.8H16.0686L12.6343 7.3657C12.3219 7.05328 12.3219 6.54675 12.6343 6.23433Z" fill={color}/>
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { lang, setLang, T } = useLang();

  const navLinks = [
    { label: T.nav.home,          href: "/" },
    { label: T.nav.professionals, href: "/fachkraefte" },
    { label: T.nav.differences,   href: "/unterschied" },
    { label: T.nav.about,         href: "/ueber-uns" },
    { label: T.nav.contact,       href: "/kontakt" },
  ];

  const menuLinks = [
    { label: T.nav.home,          href: "/" },
    { label: T.nav.professionals, href: "/fachkraefte" },
    { label: T.nav.differences,   href: "/unterschied" },
    { label: T.nav.about,         href: "/ueber-uns" },
    { label: T.nav.faq,           href: "/faq" },
    { label: T.nav.contact,       href: "/kontakt" },
  ];

  const active = pathname === "/" ? T.nav.home
    : pathname === "/fachkraefte" ? T.nav.professionals
    : pathname === "/unterschied" ? T.nav.differences
    : pathname === "/ueber-uns" ? T.nav.about
    : pathname === "/kontakt" ? T.nav.contact
    : null;
  const [headerBottom, setHeaderBottom] = useState(108);

  useEffect(() => {
    setUser(getStoredUser());
    const handler = () => setUser(getStoredUser());
    window.addEventListener("pb_auth_change", handler);
    return () => window.removeEventListener("pb_auth_change", handler);
  }, []);

  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [open]);

  function handleLogout() {
    clearUser();
    window.location.href = "/";
  }

  const UserButton = user ? (
    <Link href="/profil" style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "transparent",
      border: "1.5px solid var(--grey-bg)",
      borderRadius: 9999, padding: "0 14px", height: 40,
      fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14,
      color: "var(--black)", cursor: "pointer", whiteSpace: "nowrap",
      transition: "border-color 0.2s", textDecoration: "none", position: "relative",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.color = "var(--cta)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--grey-bg)"; e.currentTarget.style.color = "var(--black)"; }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <User size={15} />
        <span style={{ position: "absolute", bottom: -1, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#5BA882", border: "1.5px solid white" }} />
      </div>
      {getFirstName(user)}
    </Link>
  ) : (
    <Link href="/anmelden" style={{
      display: "flex", alignItems: "center", gap: 6,
      background: "transparent",
      border: "1.5px solid var(--grey-bg)",
      borderRadius: 9999, padding: "0 16px", height: 40,
      fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14,
      color: "var(--black)", cursor: "pointer", whiteSpace: "nowrap",
      transition: "border-color 0.2s, color 0.2s", textDecoration: "none",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cta)"; e.currentTarget.style.color = "var(--cta)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--grey-bg)"; e.currentTarget.style.color = "var(--black)"; }}
    >
      <User size={15} /> {T.nav.login}
    </Link>
  );

  const LangToggle = (
    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
      <button onClick={() => setLang("de")} style={{
        background: "none", border: "none", padding: "2px 4px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: lang === "de" ? 700 : 400,
        fontSize: 13,
        color: lang === "de" ? "var(--cta)" : "var(--grey-text)",
        cursor: lang === "de" ? "default" : "pointer",
        textTransform: "uppercase", letterSpacing: "0.04em", transition: "color 0.15s",
      }}>DE</button>
      <span style={{ color: "#d1d5db", fontSize: 12, userSelect: "none" }}>|</span>
      <button onClick={() => setLang("en")} style={{
        background: "none", border: "none", padding: "2px 4px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: lang === "en" ? 700 : 400,
        fontSize: 13,
        color: lang === "en" ? "var(--cta)" : "var(--grey-text)",
        cursor: lang === "en" ? "default" : "pointer",
        textTransform: "uppercase", letterSpacing: "0.04em", transition: "color 0.15s",
      }}>EN</button>
    </div>
  );

  const MobileUserButton = user ? (
    <Link href="/profil" style={{
      background: "none", border: "1.5px solid var(--grey-bg)",
      borderRadius: 9999, width: 44, height: 44,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", color: "var(--black)", textDecoration: "none",
      position: "relative",
    }}>
      <User size={20} />
      <span style={{ position: "absolute", top: 6, right: 6, width: 9, height: 9, borderRadius: "50%", background: "#5BA882", border: "1.5px solid white" }} />
    </Link>
  ) : (
    <Link href="/anmelden" style={{
      background: "none", border: "1.5px solid var(--grey-bg)",
      borderRadius: 9999, width: 44, height: 44,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", color: "var(--black)", textDecoration: "none",
    }}>
      <User size={22} />
    </Link>
  );

  return (
    <>
      <header ref={headerRef} style={{
        position: "sticky", top: 0, zIndex: 102,
        background: "#fffefe",
        borderBottom: "0.8px solid #e7eef6",
        height: 72,
      }}>

        {/* ── DESKTOP ── */}
        <div className="nav-desktop" style={{
          maxWidth: 1440, margin: "0 auto", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", gap: 24,
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <img src="/logo.svg" alt="liva" style={{ width: 200, height: 48, objectFit: "contain" }} />
          </Link>

          <nav style={{ display: "flex", gap: 2, alignItems: "center", flex: 1, justifyContent: "center" }}>
            {navLinks.map(l => {
              const isActive = active === l.label;
              return (
                <Link key={l.label} href={l.href}
                  onClick={e => { if (l.href === "#") e.preventDefault(); }}
                  style={{
                    padding: "6px 14px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    fontSize: 15,
                    color: isActive ? "var(--cta-brand)" : "var(--black)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    borderRadius: 8,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--cta-brand)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--black)"; }}
                >{l.label}</Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {LangToggle}
            {UserButton}
            <Link href="/vorgespraech" style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "var(--cta)", color: "white",
              border: "none", borderRadius: 9999,
              padding: "0 20px", height: 44,
              fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 15,
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "background 0.2s", textDecoration: "none",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--cta-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--cta)")}
            >
              {T.nav.cta} <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="nav-mobile" style={{
          display: "none", height: "100%",
          alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", position: "relative",
          touchAction: "manipulation",
        } as React.CSSProperties}>
          <button
            onClick={() => setOpen(o => !o)}
            onTouchEnd={e => { e.preventDefault(); setOpen(o => !o); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 10, margin: 0, color: "var(--black)", display: "flex", alignItems: "center", touchAction: "manipulation", WebkitTapHighlightColor: "transparent", position: "relative", zIndex: 10, minWidth: 44, minHeight: 44, justifyContent: "center" } as React.CSSProperties}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link href="/" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", textDecoration: "none", width: 48, height: 48, overflow: "hidden", flexShrink: 0 }}>
            <img src="/logo.svg" alt="liva" style={{ height: 48, width: "auto", objectFit: "cover", objectPosition: "left center", flexShrink: 0 }} />
          </Link>

          {MobileUserButton}
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 101, background: "rgba(0,0,0,0.3)" }} />
          <div style={{
            position: "fixed", top: headerBottom, left: 0, right: 0, zIndex: 103,
            background: "white", padding: "16px 24px 28px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
            borderRadius: "0 0 24px 24px",
          }}>
            <Link href="/vorgespraech" style={{
              width: "100%", background: "var(--cta)", color: "white",
              border: "none", borderRadius: 9999, height: 52,
              fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              textDecoration: "none",
            }}>
              {T.nav.cta} <ArrowIcon />
            </Link>
            <div style={{ height: 1, background: "#f0f0f0", margin: "16px 0 8px" }} />
            {/* Language toggle in mobile menu */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 0" }}>
              <button onClick={() => { setLang("de"); setOpen(false); }} style={{
                background: "none", border: "none", padding: "2px 6px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: lang === "de" ? 700 : 400, fontSize: 14,
                color: lang === "de" ? "var(--cta)" : "var(--grey-text)",
                cursor: lang === "de" ? "default" : "pointer",
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}>DE</button>
              <span style={{ color: "#d1d5db", fontSize: 13, userSelect: "none" }}>|</span>
              <button onClick={() => { setLang("en"); setOpen(false); }} style={{
                background: "none", border: "none", padding: "2px 6px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: lang === "en" ? 700 : 400, fontSize: 14,
                color: lang === "en" ? "var(--cta)" : "var(--grey-text)",
                cursor: lang === "en" ? "default" : "pointer",
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}>EN</button>
            </div>
            <div style={{ height: 1, background: "#f0f0f0", margin: "4px 0 8px" }} />
            {menuLinks.map(l => (
              <Link key={l.label} href={l.href}
                onClick={e => { if (l.href === "#") e.preventDefault(); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid #f5f5f5",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: l.href !== "#" && pathname === l.href ? 600 : 400,
                  fontSize: 16,
                  color: l.href !== "#" && pathname === l.href ? "var(--cta-brand)" : "var(--black)",
                  textDecoration: "none",
                }}
              >
                {l.label}
                {l.href !== "#" && pathname === l.href && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cta-brand)" }} />}
              </Link>
            ))}
            {user ? (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                <Link href="/profil" style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--cta)", textDecoration: "none" }}>
                  <div style={{ position: "relative" }}><User size={20} /><span style={{ position: "absolute", bottom: -1, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#5BA882", border: "1.5px solid white" }} /></div>
                  {T.nav.myAccount} ({getFirstName(user)})
                </Link>
                <button onClick={handleLogout} style={{ background: "none", border: "none", padding: "8px 0", fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#9CA3AF", cursor: "pointer", textAlign: "left" }}>
                  {T.nav.logout}
                </button>
              </div>
            ) : (
              <Link href="/anmelden" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--cta)", textDecoration: "none" }}>
                <User size={20} /> {T.nav.login}
              </Link>
            )}
          </div>
        </>
      )}

      {/* ── FLOATING SOFORTIGE HILFE ── */}
      <button
        className="floating-hilfe"
        title={`${T.nav.emergency}: 142`}
        style={{
          position: "fixed", bottom: 28, right: 24, zIndex: 200,
          borderRadius: 9999,
          background: "var(--cta-brand)",
          color: "white", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: "0 4px 20px rgba(205,23,25,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
          padding: "0 20px", height: 48,
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "scale(1.03)"; el.style.boxShadow = "0 6px 28px rgba(205,23,25,0.5)"; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "scale(1)"; el.style.boxShadow = "0 4px 20px rgba(205,23,25,0.4)"; }}
      >
        <Phone size={18} />
        <span className="floating-hilfe-label">{T.nav.emergency}: 142</span>
      </button>

      <style>{`
        @media (max-width: 1070px) {
          header { height: 64px !important; }
          .nav-desktop { display: none !important; pointer-events: none !important; visibility: hidden !important; }
          .nav-mobile { display: flex !important; pointer-events: auto !important; }
          .floating-hilfe {
            bottom: 84px !important;
            right: 16px !important;
            padding: 0 !important;
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
            box-shadow: 0 6px 24px rgba(205,23,25,0.45) !important;
            z-index: 210 !important;
          }
          .floating-hilfe-label { display: none !important; }
        }
        @media (max-width: 1100px) and (min-width: 1071px) {
          .nav-desktop { padding: 0 24px !important; }
          .nav-desktop nav a { padding: 6px 10px !important; font-size: 14px !important; }
          .nav-desktop > div:last-child a,
          .nav-desktop > div:last-child button { font-size: 13px !important; }
        }
      `}</style>
    </>
  );
}
