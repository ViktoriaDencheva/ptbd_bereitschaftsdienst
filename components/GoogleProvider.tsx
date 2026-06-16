"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Add your Google Cloud client ID here:
// https://console.cloud.google.com → APIs & Services → Credentials → OAuth 2.0 Client IDs
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "no-client-id"}>
      {children}
    </GoogleOAuthProvider>
  );
}
