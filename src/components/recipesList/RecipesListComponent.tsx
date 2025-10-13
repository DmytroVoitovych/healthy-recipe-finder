import { RecipeCard } from "./RecipeCard";
import { ButtonAsLink } from "../shared/ButtonAsLink";
import styles from "./recipeListComponent.module.css";
import { RecipesListJsonLd } from "./RecipeJsonLd";
import { Recipe} from "@/lib/api/fetchRecipesTypes";

interface ListProps {
  recipesList: Recipe[];
  getAdditionalParams?: (id: number) => URLSearchParams;
}

export const RecipesListComponent = ({
  recipesList,
  getAdditionalParams,
}: ListProps) => {
  const getProperParam = (id: number) =>
    getAdditionalParams ? `?${getAdditionalParams(id)}` : "";

  return (
    <>
      <ul className={styles.recipesList}>
        {recipesList.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe}>
              <ButtonAsLink
                content="View Recipe"
                stylesClass={`${styles.viewRecipeBtn} text-preset-8`}
                link={`/recipes/${recipe.id}/${encodeURIComponent(
                  recipe.title
                )}${getProperParam(recipe.id)}`}
                aria-label={`View full recipe for ${recipe.title}`}
                itemProp="url"
              />
            </RecipeCard>
          </li>
        ))}
      </ul>
      <RecipesListJsonLd recipeList={recipesList} />
    </>
  );
};
