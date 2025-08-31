import styles from "./realLifeSection.module.css";
import srcDescJpg from "@/app/assets/images/realLife/real-life-desctop.jpg";
import srcDescWebP from "@/app/assets/images/realLife/real-life-desctop.webp";
import srcTabletJpg from "@/app/assets/images/realLife/real-life-tablet.jpg";
import srcTabletWebP from "@/app/assets/images/realLife/real-life-tablet.webp";
import srcMobileJpg from "@/app/assets/images/realLife/real-life-mobile.jpg";
import srcMobileWebP from "@/app/assets/images/realLife/real-life-mobile.webp";
import { ArtDirectionImageContent } from "../shared/ArtDirectionImageContent";

const imageSource = {
  srcDescJpg: srcDescJpg.src,
  srcDescWebP: srcDescWebP.src,
  srcTabletJpg: srcTabletJpg.src,
  srcTabletWebP: srcTabletWebP.src,
  srcMobileJpg: srcMobileJpg.src,
  srcMobileWebP: srcMobileWebP.src,
};

const altContent = "Fresh healthy recipe prep, chef in Los Pollos Hermanos apron.";

export const RealLifeSection = () => {
  return (
    <section className={`sectionTop ${styles.sectionRealLife}`}>
      <div>
        <h1 className={`text-preset-2 ${styles.RealLifeHeading}`}>
          Built for real life
        </h1>
        <p className="text-preset-6">
          Cooking shouldn’t be complicated. These recipes come in under{" "}
          <time className="text-preset-5" dateTime="PT30M">
            30 minutes
          </time>{" "}
          of active time, fit busy schedules, and taste good enough to repeat.
        </p>
        <p className="text-preset-6">
          Whether you’re new to the kitchen or just need fresh ideas, we’ve got you
          covered.
        </p>
      </div>
      <ArtDirectionImageContent
        altContent={altContent}
        {...imageSource}
        className={styles.realLifeImage}
      />
    </section>
  );
};
