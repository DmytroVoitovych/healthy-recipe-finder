import { ExistSection } from "@/components/aboutExistSection/ExistSection";
import { AboutHero } from "@/components/aboutHero/AboutHero";
import { PhilosophySection } from "@/components/aboutPhilosophySection/PhilosophySection";
import { BeyondThePlateSection } from "@/components/beyondThePlate/BeyondThePlateSection";
import { CallToActionSection } from "@/components/callToAction/CallToActionSection";
import { unstable_ViewTransition as ViewTransition } from 'react';
export default function About() {
  
  return (
    <ViewTransition enter="scale-in" exit="scale-out">
    <>
      <AboutHero />
      <ExistSection />
      <PhilosophySection/>
      <BeyondThePlateSection/>
      <CallToActionSection />
    </>
     </ViewTransition>
  );
};
