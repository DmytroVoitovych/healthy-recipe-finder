import { ButtonAsLink } from "../shared/ButtonAsLink";
import styles from "./callToAction.module.css";

const buttonContent = 'Browse recipes';

export const CallToActionSection = () => {
  return (
    <section className={`sectionTop ${styles.callToActionSection}`}>
      <div>  
      <h1 className="text-preset-2">Ready to cook smarter?</h1>{" "}
      <p className="text-preset-6">
        Hit the button, pick a recipe, and get dinner on the table—fast.
      </p>
      <ButtonAsLink content={buttonContent} stylesClass={styles.callToActionButton} />
      </div>
    </section>
  );
};
