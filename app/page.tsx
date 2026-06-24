"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WieFunktioniert from "@/components/WieFunktioniert";
import Datenschutz from "@/components/Datenschutz";
import TherapistProfiles from "@/components/TherapistProfiles";
import TherapistDifference from "@/components/TherapistDifference";
import WarumUns from "@/components/WarumUns";
import OesterreichWeit from "@/components/OesterreichWeit";
import Meinungen from "@/components/Meinungen";
import MiniFAQ from "@/components/MiniFAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <SocialProof />
      <Navbar />
      <div style={{ overflowX: "hidden" }}>
        <Hero />
        <WieFunktioniert />
        <Datenschutz />
        <TherapistProfiles />
        <OesterreichWeit />
        <TherapistDifference />
        <WarumUns />
        <Meinungen />
        <MiniFAQ />
        <Footer />
      </div>
    </main>
  );
}
