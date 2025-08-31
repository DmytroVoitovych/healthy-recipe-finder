import styles from "./page.module.css";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeatureSection } from "@/components/feature/FeatureSection";
import { RealLifeSection } from './../components/realLife/RealLifeSection';
import { CallToActionSection } from "@/components/callToAction/CallToActionSection";

export default function Home() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <FeatureSection/>
      <RealLifeSection/>
      <CallToActionSection/>
    </div>
  );
}
