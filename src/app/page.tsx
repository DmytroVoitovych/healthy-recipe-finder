import Image from "next/image";
import styles from "./page.module.css";
import { HeroSection } from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <section className="sectionTop">T</section>
    </div>
  );
}
