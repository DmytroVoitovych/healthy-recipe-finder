import styles from "./page.module.css";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeatureSection } from "@/components/feature/FeatureSection";
import { RealLifeSection } from './../components/realLife/RealLifeSection';
import { CallToActionSection } from "@/components/callToAction/CallToActionSection";
import { unstable_ViewTransition as ViewTransition } from 'react';


export default function Home() {
  return (
   <ViewTransition enter="scale-in" exit="scale-out">
    <div className={styles.home}>
      <HeroSection />
      <FeatureSection/>
      <RealLifeSection/>
      <CallToActionSection/>
    </div>
    </ViewTransition>
  );
}
