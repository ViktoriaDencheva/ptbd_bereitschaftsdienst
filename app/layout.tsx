import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Psychotherapeutischer Bereitschaftsdienst",
  description: "Professionelle psychosoziale Unterstützung – sicher, vertraulich, österreichweit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
