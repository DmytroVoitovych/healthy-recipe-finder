import styles from "./recipeManualSectiom.module.css";

interface RecipeManualSectionProps {
  title: string;
  children: React.ReactNode;
}

export const RecipeManualSection = ({
  title,
  children,
}: RecipeManualSectionProps) => {
  return (
    <section className={styles.recipeManualSection} >
      <h3 className="text-preset-4">{title}</h3>
      {children}
    </section>
  );
};
