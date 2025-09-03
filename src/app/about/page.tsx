import { ExistSection } from "@/components/aboutExistSection/ExistSection";
import { AboutHero } from "@/components/aboutHero/AboutHero";
import { PhilosophySection } from "@/components/aboutPhilosophySection/PhilosophySection";
import { CallToActionSection } from "@/components/callToAction/CallToActionSection";

export default function About() {
  return (
    <>
      <AboutHero />
      <ExistSection />
      <PhilosophySection/>
      <CallToActionSection />
    </>
  );
};
