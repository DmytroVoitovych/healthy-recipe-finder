import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Image from "next/image";
import styles from "./recipeCard.module.css";
import { getFirstSentence } from "@/utils/componentHelpers/getFirstSentence";
import { RecipeTimeInfoComponent } from "./RecipeTimeInfoComponent";
import { ServingsIco } from "@/utils/svgimports";
import { ButtonAsLink } from "../shared/ButtonAsLink";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
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

  return (
    <li>
      <article
        className={styles.recipeCard}
        itemScope
        itemType="https://schema.org/Recipe"
      >
        <section className={styles.recipeCardSection}>
          <Image
            alt={title + "healthy recipe"}
            src={`https://img.spoonacular.com/recipes/${id}-636x393.${imageType}`}
            width="360"
            height="300"
            quality="100"
            sizes="(min-width: 1200px) 600px, (min-width: 640px) 400px, 100vw"
            itemProp="image"
          />
          <div>
            <h2 className="text-preset-5" itemProp="name">{title}</h2>
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
          <ButtonAsLink
            content="View Recipe"
            stylesClass={`${styles.viewRecipeBtn} text-preset-8`}
            link={`/recipes/${id}/${encodeURIComponent(title)}`}
            aria-label={`View full recipe for ${title}`}
            itemProp="url"
          />
        </section>
      </article>
    </li>
  );
};
