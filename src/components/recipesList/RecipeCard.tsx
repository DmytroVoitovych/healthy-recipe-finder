import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Image from "next/image";
import styles from "./recipeCard.module.css";
import { getFirstSentence } from "@/utils/componentHelpers/getFirstSentence";
import { RecipeTimeInfoComponent } from "./RecipeTimeInfoComponent";
import { ServingsIco } from "@/utils/svgimports";

interface RecipeCardProps {
  recipe: Recipe;
  children: React.ReactNode;
  className?: string;
}

const imageSizeProps = {
  card: {
    width: 360,
    height: 300,
    sizes: "(min-width: 1200px) 600px, (min-width: 640px) 400px, 100vw",
  },
  page: {
    width: 343,
    height: 343,
    sizes: "(min-width: 1200px) 580px, (min-width: 640px) 600px, 100vw",
  },
};

export const RecipeCard = ({ recipe, children, className }: RecipeCardProps) => {
  const {
    summary,
    title,
    id,
    imageType,
    servings,
    readyInMinutes,
    preparationMinutes,
    cookingMinutes,
  } = recipe;
  const shortSummary = getFirstSentence(summary);
  const cookTimeInfoData = { readyInMinutes, preparationMinutes, cookingMinutes };
  const imgProps = className ? imageSizeProps.page : imageSizeProps.card;

  return (
    <article
      className={styles.recipeCard}
      itemScope
      itemType="https://schema.org/Recipe"
    >
      <section className={className || styles.recipeCardSection}>
        <Image
          alt={title + "healthy recipe"}
          src={`https://img.spoonacular.com/recipes/${id}-636x393.${imageType}`}
          {...imgProps}
          quality="100"
          itemProp="image"
        />
        <div>
          <h2 className="text-preset-5" itemProp="name">
            {title}
          </h2>
          <p
            className="text-preset-9"
            dangerouslySetInnerHTML={{ __html: shortSummary }}
            itemProp="description"
          />
        </div>
        <ul className="text-preset-9">
          <li itemProp="recipeYield">
            {" "}
            <ServingsIco aria-hidden="true" /> Servings: {servings}
          </li>
          <RecipeTimeInfoComponent timeInfo={cookTimeInfoData} />
        </ul>
        {children}
      </section>
    </article>
  );
};
