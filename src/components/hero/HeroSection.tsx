import { ArtDirectionImageBanner } from "../shared/ArtDirectionImageBanner";
import { ButtonAsLink } from "../shared/ButtonAsLink";
import styles from "./heroSection.module.css";
import srcDescJpg from "@/app/assets/images/hero/hero-banner-desctop.jpg";
import srcDescWebP from "@/app/assets/images/hero/hero-banner-desctop.webp";
import srcTabletJpg from "@/app/assets/images/hero/hero-banner-tablet.jpg";
import srcTabletWebP from "@/app/assets/images/hero/hero-banner-tablet.webp";
import srcMobileJpg from "@/app/assets/images/hero/hero-banner-mobile.jpg";
import srcMobileWebP from "@/app/assets/images/hero/hero-banner-mobile.webp";



const buttonContent = "Start exploring";
const altContent = "The mexican man make healthy food in the kitchen";

const imageSource = {
  srcDescJpg: srcDescJpg.src,
  srcDescWebP: srcDescWebP.src,
  srcTabletJpg: srcTabletJpg.src,
  srcTabletWebP: srcTabletWebP.src,
  srcMobileJpg: srcMobileJpg.src,
  srcMobileWebP: srcMobileWebP.src,
};

export const HeroSection = () => {
  return (
    <section className={`sectionTop ${styles.sectionHero}`}>
      <h1 className={`text-preset-1 ${styles.heroHeading}`}>
        <strong>Healthy</strong> meals, zero fuss
      </h1>
      <p className="text-preset-6">
        Discover eight quick, whole-food recipes that you can cook tonight—no
        processed junk, no guesswork.
      </p>
      <ButtonAsLink content={buttonContent} stylesClass={styles.heroButton} />
      <ArtDirectionImageBanner
        className={`${styles.heroImage}`}
        altContent={altContent}
        {...imageSource}
      />
    </section>
  );
};
