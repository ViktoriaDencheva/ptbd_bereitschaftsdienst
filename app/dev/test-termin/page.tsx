"use client";
import { useEffect } from "react";

export default function TestTermin() {
  useEffect(() => {
    const now = new Date();
    const appt = new Date(now.getTime() + 8 * 60 * 1000);
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    const dateStr = `${days[appt.getDay()]}, ${appt.getDate()}. ${months[appt.getMonth()]} ${appt.getFullYear()}`;
    const timeStr = `${String(appt.getHours()).padStart(2,"0")}:${String(appt.getMinutes()).padStart(2,"0")}`;

    const booking = {
      id: crypto.randomUUID(),
      therapistId: "sarah-mueller",
      therapistName: "Dr. Sarah Müller",
      therapistRole: "Klinische Psychologin",
      therapistPhoto: "/therapists/sarah-mueller.jpg",
      date: dateStr,
      time: timeStr,
      format: "online",
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("pb_bookings") || "[]");
    localStorage.setItem("pb_bookings", JSON.stringify([booking, ...existing]));
    window.location.href = "/profil";
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'Poppins',sans-serif", color: "#2D5B8D" }}>
      Termin wird erstellt…
    </div>
  );
}
