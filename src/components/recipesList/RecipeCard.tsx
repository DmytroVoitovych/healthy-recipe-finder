import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Image from "next/image";
import Link from "next/link";
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
      <article className={styles.recipeCard}>
        <section className={styles.recipeCardSection}>
          <Image
            alt={title + "healthy recipe"}
            src={`https://img.spoonacular.com/recipes/${id}-636x393.${imageType}`}
            width="360"
            height="300"
            quality="100"
            sizes="(min-width: 1200px) 600px, (min-width: 640px) 400px, 100vw"
          />
          <div>
            <h2 className="text-preset-5">{title}</h2>
            <p
              className="text-preset-9"
              dangerouslySetInnerHTML={{ __html: shortSummary }}
            />
          </div>
          <ul className="text-preset-9">
            <li>
              {" "}
              <ServingsIco /> Servings: {servings}
            </li>
            <RecipeTimeInfoComponent timeInfo={cookTimeInfoData} />
          </ul>
          <ButtonAsLink
            content="View Recipe"
            stylesClass={styles.viewRecipeBtn}
            link={`/recipes/${id}/${title}`}
          />
        </section>
      </article>
    </li>
  );
};
