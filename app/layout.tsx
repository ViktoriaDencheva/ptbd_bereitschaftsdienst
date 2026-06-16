import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleProvider from "@/components/GoogleProvider";

export const metadata: Metadata = {
  title: "Psychotherapeutischer Bereitschaftsdienst",
  description: "Professionelle psychosoziale Unterstützung – sicher, vertraulich, österreichweit.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head />
      <body suppressHydrationWarning>
        <GoogleProvider>{children}</GoogleProvider>
      </body>
    </html>
  );
}
