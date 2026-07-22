import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleProvider from "@/components/GoogleProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { LangProvider } from "@/lib/lang";

export const metadata: Metadata = {
  title: "liva",
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
        <GoogleProvider><LangProvider><ScrollToTop />{children}</LangProvider></GoogleProvider>
      </body>
    </html>
  );
}
