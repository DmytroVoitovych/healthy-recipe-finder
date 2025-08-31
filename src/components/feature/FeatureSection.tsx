import { CarrotIco, FlashIco, SearchFeatureIco } from "@/utils/svgimports";
import styles from "./featureSection.module.css";

export const FeatureSection = () => {
  return (
    <section className="sectionTop hasDivider">
      <h1 className={`text-preset-2 ${styles.featureHeading}`}>What you’ll get</h1>
      <ul className={styles.featureList}>
        <li>
          <div className={styles.icoWrapper}>
            <CarrotIco />
          </div>
          <h2 className="text-preset-3">Whole-food recipes</h2>
          <p>Each dish uses everyday, unprocessed ingredients.</p>
        </li>
        <li>
          <div className={styles.icoWrapper}>
            <FlashIco />
          </div>
          <h2 className="text-preset-3">Minimum fuss</h2>
          <p>All recipes are designed to make eating healthy quick and easy.</p>
        </li>
        <li>
          <div className={styles.icoWrapper}>
            <SearchFeatureIco/>
          </div>
          <h2 className="text-preset-3">Search in seconds</h2>
          <p>
            Filter by name or ingredient and jump straight to the recipe you need.
          </p>
        </li>
      </ul>
    </section>
  );
};
