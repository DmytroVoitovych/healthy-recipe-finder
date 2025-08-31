import styles from "./page.module.css";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeatureSection } from "@/components/feature/FeatureSection";
import { RealLifeSection } from './../components/realLife/RealLifeSection';

export default function Home() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <FeatureSection/>
      <RealLifeSection/>
    </div>
  );
}
