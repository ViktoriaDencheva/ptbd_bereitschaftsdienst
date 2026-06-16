"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowToStart from "@/components/HowToStart";
import Steps from "@/components/Steps";
import Datenschutz from "@/components/Datenschutz";
import TherapistProfiles from "@/components/TherapistProfiles";
import TherapistDifference from "@/components/TherapistDifference";
import WarumUns from "@/components/WarumUns";
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
        <HowToStart />
        <Steps />
        <Datenschutz />
        <TherapistProfiles />
        <TherapistDifference />
        <WarumUns />
        <Meinungen />
        <MiniFAQ />
        <Footer />
      </div>
    </main>
  );
}
