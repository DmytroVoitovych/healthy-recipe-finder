import styles from "./aboutHero.module.css";
import srcDescJpg from "@/app/assets/images/aboutHero/about-hero-desctop.jpg";
import srcDescWebP from "@/app/assets/images/aboutHero/about-hero-desctop.webp";
import srcTabletJpg from "@/app/assets/images/aboutHero/about-hero-tablet.jpg";
import srcTabletWebP from "@/app/assets/images/aboutHero/about-hero-tablet.webp";
import srcMobileJpg from "@/app/assets/images/aboutHero/about-hero-mobile.jpg";
import srcMobileWebP from "@/app/assets/images/aboutHero/about-hero-mobile.webp";
import { ArtDirectionImageSquare } from "../shared/ArtDirectionImageSquare";


const imageSource = {
  srcDescJpg: srcDescJpg.src,
  srcDescWebP: srcDescWebP.src,
  srcTabletJpg: srcTabletJpg.src,
  srcTabletWebP: srcTabletWebP.src,
  srcMobileJpg: srcMobileJpg.src,
  srcMobileWebP: srcMobileWebP.src,
};

const altContent = 'A man is cutting a carrot on a wooden cutting board in a kitchen. The image illustrates the mission of Healthy Recipe Finder: "Help more people cook nourishing meals, more often." ';

export const AboutHero = () => {
  return (
    <section className={`aboutSectionTop hasDivider ${styles.aboutHeroSection}`}>
      <div className={styles.aboutHeroSectionTextBlock}>
        <p className="text-preset-5">Our mission</p>
        <h1 className="text-preset-2">
          Help more people cook nourishing meals, more often.
        </h1>
        <p className="text-preset-6">
          Healthy Recipe Finder was created to prove that healthy eating can be
          convenient, affordable, and genuinely delicious.
        </p>
        <p className="text-preset-6">
          We showcase quick, whole-food dishes that anyone can master—no fancy
          equipment, no ultra-processed shortcuts—just honest ingredients and
          straightforward steps.
        </p>
      </div>
      <ArtDirectionImageSquare altContent={altContent} {...imageSource} className={styles.aboutHeroImg}/>
    </section>
  );
};
