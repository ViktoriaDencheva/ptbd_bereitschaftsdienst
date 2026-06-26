"use client";
import { useState } from "react";
const imgTelephones = null;


const PhoneIcon = () => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_69_5294)"><path d="M8.37823 5.11865C8.04547 5.13018 7.71812 5.20867 7.41632 5.34912C7.11411 5.4898 6.8434 5.69047 6.62042 5.93799L6.61163 5.94678C6.11822 6.39949 5.73199 6.95638 5.48077 7.57666C5.23992 8.18767 5.11812 8.83899 5.12238 9.49561C5.14625 10.7009 5.41088 11.8894 5.89972 12.9917V12.9927C6.49743 14.3566 7.2435 15.6508 8.12433 16.8521C9.10217 18.1879 10.1789 19.4489 11.346 20.6235L11.7933 21.0571C12.8449 22.0596 13.9608 22.993 15.1341 23.8511L15.1351 23.8521C16.3456 24.7435 17.6535 25.4949 19.0335 26.0923L19.0423 26.0962H19.0413C19.8709 26.5217 20.7783 26.7772 21.7083 26.8472C22.6381 26.9171 23.5725 26.7999 24.4564 26.5034C25.0622 26.2468 25.6017 25.8559 26.0345 25.3608L26.0364 25.3589C26.2978 25.0726 26.5143 24.7481 26.678 24.397L26.679 24.395C26.809 24.1278 26.8768 23.8347 26.8782 23.5376C26.8766 23.3518 26.8383 23.1683 26.765 22.9976C26.7001 22.8728 26.6022 22.7678 26.4818 22.6948L26.4739 22.6899L22.5179 19.8853V19.8843C22.3702 19.7802 22.2141 19.6886 22.0521 19.6089L21.8743 19.5269L21.8626 19.519C21.7725 19.4558 21.6641 19.4236 21.554 19.4282C21.4437 19.4329 21.3378 19.4746 21.2532 19.5454L21.2435 19.5532L21.2327 19.5591C20.989 19.695 20.7666 19.8675 20.5745 20.0698L20.5716 20.0728L19.6624 20.9702L19.6605 20.9722C19.4152 21.2032 19.1099 21.361 18.7796 21.4282C18.4493 21.4954 18.1065 21.4698 17.7903 21.353L17.7825 21.3501L17.4661 21.2104L17.4534 21.2046V21.2036C16.8398 20.857 16.2633 20.4485 15.7337 19.9839V19.9829C15.1536 19.4911 14.5329 18.9196 13.7835 18.1841L13.7825 18.1831C13.1923 17.582 12.6124 16.9505 11.9984 16.2417V16.2407C11.5349 15.716 11.1219 15.1487 10.7669 14.5454L10.763 14.5376L10.7591 14.5288L10.6116 14.1772L10.6068 14.1646C10.5436 13.9611 10.5107 13.7496 10.5081 13.5366C10.5047 13.3125 10.547 13.0897 10.6321 12.8823C10.7168 12.6763 10.8418 12.4891 11.0003 12.3325L11.8909 11.4077L11.8948 11.4038C12.0928 11.2138 12.2651 10.9985 12.4075 10.7642L12.4114 10.7583L12.4573 10.6812C12.4963 10.6023 12.5177 10.5157 12.5218 10.4272C12.514 10.3168 12.487 10.2085 12.4407 10.1079L12.4388 10.104C12.3432 9.87898 12.2206 9.66634 12.0745 9.47021L12.0735 9.46729L9.30304 5.56787L9.30206 5.56592C9.20415 5.42347 9.06887 5.31058 8.91144 5.23877L8.91046 5.23779C8.74417 5.15944 8.5621 5.11845 8.37823 5.11865ZM28.9339 23.5366C28.9329 24.1371 28.7963 24.7296 28.5364 25.271L28.5374 25.272C28.2873 25.8064 27.9564 26.2995 27.5589 26.7358L27.5599 26.7368C26.9214 27.4623 26.1255 28.0323 25.2327 28.4038L25.2318 28.4048C24.3707 28.7583 23.4479 28.9378 22.5169 28.9331H22.515C21.0355 28.9078 19.5764 28.5837 18.2259 27.98V27.979C16.7027 27.3208 15.2592 26.4925 13.9232 25.5093C12.4968 24.4661 11.1497 23.3184 9.89386 22.0757V22.0747C8.64987 20.823 7.50146 19.4798 6.45929 18.0562C5.61015 16.8955 4.8742 15.6568 4.26202 14.3569L4.00812 13.7964C3.41135 12.4413 3.09166 10.9807 3.06769 9.50049V9.49951C3.06259 8.5823 3.23318 7.67192 3.57062 6.81885L3.71417 6.48779C4.06998 5.72521 4.5709 5.03748 5.19073 4.46436C5.60024 4.03263 6.09216 3.68678 6.63702 3.44678C7.18458 3.20564 7.77501 3.07567 8.37335 3.06592H8.37531C8.86119 3.06485 9.34115 3.17235 9.78058 3.37939H9.78156C10.265 3.60133 10.6799 3.94927 10.9827 4.38623L13.7415 8.271C13.9795 8.59162 14.1787 8.94007 14.3333 9.30811C14.489 9.66018 14.572 10.0405 14.5775 10.4253V10.4282C14.5751 10.9156 14.4357 11.3919 14.1771 11.8052L14.178 11.8062C13.9523 12.1859 13.6765 12.5333 13.3597 12.8413L13.3607 12.8423L12.6077 13.6235C12.8163 13.9622 13.0458 14.2874 13.2962 14.5962L13.5579 14.9048L13.5589 14.9058C14.1375 15.5749 14.6878 16.1734 15.2357 16.731C15.9384 17.4211 16.5234 17.9608 17.0638 18.4185L17.0667 18.4214L17.386 18.6909C17.6872 18.9315 18.007 19.1477 18.3401 19.3423L19.1263 18.6128C19.4484 18.2791 19.8185 17.9949 20.2249 17.771C20.5916 17.5551 21.005 17.4307 21.43 17.4067C21.8563 17.3827 22.2825 17.4609 22.6722 17.6353H22.6712C22.941 17.7496 23.2014 17.8843 23.4495 18.0396L23.6946 18.2026L27.6517 21.0073C28.091 21.3016 28.4394 21.7131 28.6566 22.1948L28.6575 22.1978C28.8363 22.6213 28.9305 23.076 28.9339 23.5356V23.5366Z" fill="#A81315" stroke="#A81315" strokeWidth="0.266667"/></g><defs><clipPath id="clip0_69_5294"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>);
const FacebookIcon = () => (<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M20.75 40.75C31.7957 40.75 40.75 31.7957 40.75 20.75C40.75 9.70431 31.7957 0.75 20.75 0.75C9.70431 0.75 0.75 9.70431 0.75 20.75C0.75 31.7957 9.70431 40.75 20.75 40.75Z" stroke="#0B72B2" strokeWidth="1.5"/><path d="M22.5708 15.6308H24.4089C24.5781 15.6308 24.7153 15.5014 24.7153 15.3421V13.61C24.7153 13.4506 24.5781 13.3213 24.4089 13.3213H22.5708C20.713 13.3213 19.2009 14.7457 19.2009 16.4968V18.5176H17.0564C16.8872 18.5176 16.75 18.6469 16.75 18.8063V20.5384C16.75 20.6977 16.8872 20.8271 17.0564 20.8271H19.2009V26.8894C19.2009 27.0488 19.3381 27.1781 19.5072 27.1781H21.3454C21.5145 27.1781 21.6517 27.0488 21.6517 26.8894V20.8271H23.7962C23.928 20.8271 24.045 20.7474 24.0873 20.6296L24.7 18.8975C24.7312 18.8097 24.7153 18.7127 24.6577 18.6371C24.5995 18.562 24.5076 18.5176 24.4089 18.5176H21.6517V16.4968C21.6517 16.0193 22.0641 15.6308 22.5708 15.6308Z" fill="#0B72B2"/></svg>);
const LinkedinIcon = () => (<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M20.75 40.75C31.7957 40.75 40.75 31.7957 40.75 20.75C40.75 9.70431 31.7957 0.75 20.75 0.75C9.70431 0.75 0.75 9.70431 0.75 20.75C0.75 31.7957 9.70431 40.75 20.75 40.75Z" stroke="#0B72B2" strokeWidth="1.5"/><path d="M16.1597 16.7113C17.0961 16.7113 17.8552 15.9522 17.8552 15.0158C17.8552 14.0794 17.0961 13.3203 16.1597 13.3203C15.2233 13.3203 14.4642 14.0794 14.4642 15.0158C14.4642 15.9522 15.2233 16.7113 16.1597 16.7113Z" fill="#0B72B2"/><path d="M17.5726 17.8428H14.7468C14.5908 17.8428 14.4642 17.9694 14.4642 18.1254V26.6028C14.4642 26.7588 14.5908 26.8854 14.7468 26.8854H17.5726C17.7286 26.8854 17.8552 26.7588 17.8552 26.6028V18.1254C17.8552 17.9694 17.7286 17.8428 17.5726 17.8428Z" fill="#0B72B2"/><path d="M25.9934 17.3736C24.7857 16.9599 23.275 17.3233 22.369 17.9749C22.3379 17.8534 22.2272 17.7629 22.0955 17.7629H19.2697C19.1137 17.7629 18.9871 17.8895 18.9871 18.0455V26.523C18.9871 26.6789 19.1137 26.8055 19.2697 26.8055H22.0955C22.2515 26.8055 22.3781 26.6789 22.3781 26.523V20.4305C22.8347 20.0372 23.423 19.9117 23.9046 20.1163C24.3714 20.3135 24.6387 20.795 24.6387 21.4365V26.523C24.6387 26.6789 24.7653 26.8055 24.9213 26.8055H27.7471C27.9031 26.8055 28.0297 26.6789 28.0297 26.523V20.8674C27.9975 18.5451 26.905 17.6855 25.9934 17.3736Z" fill="#0B72B2"/></svg>);

const footerCols = [
  {
    title: "Plattform",
    links: [
      { label: "Fachkräfte finden",       href: "/fachkraefte" },
      { label: "Orientierungsgespräch",    href: "/gespraech" },
      { label: "Termin buchen",            href: "/buchen" },
      { label: "So funktioniert es",       href: "/#wie-es-funktioniert" },
      { label: "Häufige Fragen",           href: "/faq" },
    ],
  },
  {
    title: "Wichtige Informationen",
    links: [
      { label: "Kosten & Krankenkasse",         href: "#" },
      { label: "Termin absagen & verschieben",   href: "/termin-verschieben" },
      { label: "Ablauf der Beratung",            href: "#" },
      { label: "Krisenhilfe",                   href: "#" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Datenschutz",          href: "#" },
      { label: "AGB",                  href: "#" },
      { label: "Impressum",            href: "#" },
      { label: "Nutzungsbedingungen",  href: "#" },
      { label: "Cookie-Einstellungen", href: "#" },
    ],
  },
];

const contactItems = [
  { icon: "/icons/icon-mail.svg",         label: "info@ptbd.at",             href: "mailto:info@ptbd.at" },
  { icon: "/icons/icon-phone-contact.svg",label: "+43 1 123 45 67",          href: "tel:+4311234567" },
  { icon: "/icons/icon-clock.svg",        label: "Mo–Fr · 9:00–17:00",       href: "#" },
  { icon: "/icons/icon-pin.svg",          label: "Österreichweit verfügbar", href: "#" },
];

const paymentIcons = [
  "/icons/apple-pay.svg",
  "/icons/google-pay.svg",
  "/icons/visa.svg",
  "/icons/mastercard.svg",
  "/icons/paypal.svg",
  "/icons/krankenkasse.svg",
];

function AccordionCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--grey-bg)" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--black)" }}>{title}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
          <path d="M6 9l6 6 6-6" stroke="var(--grey-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 14 }}>
          {links.map(link => (
            <a key={link.label} href={link.href} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, color: "var(--grey-text)", textDecoration: "none" }}>{link.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* Crisis section */}
      <div className="footer-desktop-section" style={{
        position: "relative",
        padding: "32px var(--page-side)",
        overflow: "hidden",
      }}>
        
        <img src="/crisis_section_footer_bg.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.15)" }} />

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
                <PhoneIcon />
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
          <div className="crisis-numbers" style={{
            backdropFilter: "blur(3px)",
            background: "rgba(254,244,240,0.5)",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <h4 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500, fontSize: 20,
              lineHeight: 1.4, color: "var(--black)",
            }}>Weitere Hilfsangebote:</h4>
            <div className="crisis-numbers-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
      <div className="footer-desktop-section" style={{
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
            <div className="footer-brand" style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", height: 50 }}>
                <img src="/logo.svg" alt="Psychotherapeutischer Bereitschaftsdienst" style={{ width: 227, height: 50, objectFit: "contain", flexShrink: 0 }} />
              </div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400, fontSize: 16,
                lineHeight: 1.5, color: "var(--grey)",
              }}>
                Wir verbinden Menschen mit qualifizierter psychosozialer Unterstützung - diskret, sicher und unkompliziert.
              </p>
              <div className="social-icons" style={{ display: "flex", gap: 12 }}>
                <FacebookIcon />
                <LinkedinIcon />
              </div>
            </div>

            {/* Link cols */}
            {footerCols.map((col) => (
              <div key={col.title} className="footer-link-col" style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1.5, color: "var(--black)" }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {col.links.map((link) => (
                    <a key={link.label} href={link.href} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--grey-text)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
                    >{link.label}</a>
                  ))}
                </div>
              </div>
            ))}

            {/* Kontakt col */}
            <div className="footer-link-col" style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1.5, color: "var(--black)" }}>Kontakt</div>
              <div className="contact-items" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {contactItems.map((item) => (
                  <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--grey-text)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--cta)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--grey-text)")}
                  >
                    <img src={item.icon} width={20} height={20} alt="" style={{ flexShrink: 0 }} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Payment methods — вдясно */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", marginBottom: 24 }}>
            {paymentIcons.map((src) => (
              <img key={src} src={src} alt="" style={{ height: 34, width: "auto", display: "block" }} />
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

      {/* ===== MOBILE FOOTER ===== */}
      <div className="footer-mob" style={{ display: "none" }}>
        {/* Crisis section */}
        <div style={{ position: "relative", padding: "32px 16px", overflow: "hidden" }}>

          <img src="/crisis_section_footer_bg.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 28, lineHeight: 1.3, color: "var(--black)", margin: 0 }}>Brauchst Du sofort Hilfe?</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>Wenn Du Dich in einer akuten Krise befindest, findest Du hier wichtige Anlaufstellen.</p>
            </div>
            {/* Phone card */}
            <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "4px 8px 5px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--red-light-system)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PhoneIcon />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: "var(--black)" }}>Telefonseelsorge</span>
                  <a href="tel:142" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 28, color: "var(--red-soft)", textDecoration: "underline" }}>142</a>
                </div>
              </div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.5, color: "var(--black)", margin: 0 }}>24/7 - vertraulich & kostenlos</p>
            </div>
            {/* More numbers */}
            <div style={{ backdropFilter: "blur(3px)", background: "rgba(254,244,240,0.5)", display: "flex", flexDirection: "column", gap: 8 }}>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: "var(--black)", margin: 0 }}>Weitere Hilfsangebote:</h4>
              {[
                { label: "Ö3-Kummernummer:", num: "116 123" },
                { label: "Psychosozialer Dienst Wien:", num: "+43 1 313 30" },
                { label: "Kriseninterventionszentrum Wien:", num: "+43 1 406 95 95" },
              ].map((item, i) => (
                <p key={i} style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, lineHeight: 1.5, color: "var(--black)", margin: 0 }}>
                  {item.label} <a href="#" style={{ fontWeight: 500, color: "var(--red-soft)", textDecoration: "underline" }}>{item.num}</a>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer mobile */}
        <div style={{ background: "white", borderTop: "0.8px solid #e8e7e6", padding: "32px 16px" }}>
          {/* Logo + desc + social */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <img src="/logo.svg" alt="Logo" style={{ width: 190, height: 44, objectFit: "contain" }} />
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
              Wir verbinden Menschen mit qualifizierter psychosozialer Unterstützung – diskret, sicher und unkompliziert.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <FacebookIcon />
              <LinkedinIcon />
            </div>
          </div>

          {/* Accordion колони */}
          <div style={{ marginBottom: 24 }}>
            {footerCols.map(col => (
              <AccordionCol key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          {/* Kontakt */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--black)" }}>Kontakt</div>
            {contactItems.map(item => (
              <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontSize: 15, color: "var(--grey-text)", textDecoration: "none" }}>
                <img src={item.icon} width={20} height={20} alt="" style={{ flexShrink: 0 }} />
                {item.label}
              </a>
            ))}
          </div>

          {/* Payment */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
            {paymentIcons.map(src => (
              <img key={src} src={src} alt="" style={{ height: 33, width: "auto" }} />
            ))}
          </div>

          {/* Copyright */}
          <div style={{ borderTop: "1px solid var(--grey-border)", paddingTop: 16 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, lineHeight: 1.5, color: "var(--grey-text)", margin: 0 }}>
              © 2026 Psychotherapeutischer Bereitschaftsdienst. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Среден екран: 901px – 1314px ── */
        @media (max-width: 1314px) and (min-width: 1071px) {
          /* Full-width padding reduction for tablet */
          .footer-desktop-section {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          /* Равни колони чрез grid */
          .footer-cols {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 24px !important;
            align-items: flex-start;
          }
          .footer-brand {
            max-width: none !important;
            min-width: 0 !important;
          }
          .footer-brand > div:first-child img {
            width: 140px !important;
            height: auto !important;
          }
          .footer-brand > p {
            font-size: 12px !important;
          }
          .footer-link-col {
            min-width: 0 !important;
          }
          .footer-link-col a,
          .footer-link-col > div:first-child {
            font-size: 12px !important;
          }
          /* Контакт — вертикален списък */
          .contact-items {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          .contact-items a {
            font-size: 12px !important;
          }
          /* Crisis — заглавие горе, числа хоризонтално */
          .crisis-numbers {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .crisis-numbers-list {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 8px 24px !important;
          }
          .crisis-numbers-list p {
            font-size: 14px !important;
            white-space: nowrap !important;
          }
        }

        /* ── Мобилна версия ── */
        @media (max-width: 1070px) {
          .footer-desktop-section { display: none !important; }
          .footer-mob { display: block !important; }
        }
      `}</style>
    </footer>
  );
}
