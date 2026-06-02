"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowToStart from "@/components/HowToStart";
import Steps from "@/components/Steps";
import Datenschutz from "@/components/Datenschutz";
import TherapistProfiles from "@/components/TherapistProfiles";
import WarumUns from "@/components/WarumUns";
import Meinungen from "@/components/Meinungen";
import MiniFAQ from "@/components/MiniFAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowToStart />
      <Steps />
      <Datenschutz />
      <TherapistProfiles />
      <WarumUns />
      <Meinungen />
      <MiniFAQ />
      <Footer />
    </main>
  );
}
