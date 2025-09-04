import { ExistSection } from "@/components/aboutExistSection/ExistSection";
import { AboutHero } from "@/components/aboutHero/AboutHero";
import { PhilosophySection } from "@/components/aboutPhilosophySection/PhilosophySection";
import { BeyondThePlateSection } from "@/components/beyondThePlate/BeyondThePlateSection";
import { CallToActionSection } from "@/components/callToAction/CallToActionSection";

export default function About() {
  return (
    <>
      <AboutHero />
      <ExistSection />
      <PhilosophySection/>
      <BeyondThePlateSection/>
      <CallToActionSection />
    </>
  );
};
