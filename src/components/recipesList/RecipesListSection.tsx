import { RecipesForm } from "./RecipesForm";
import { RecipeCard } from "./RecipeCard";
import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import styles from "./recipesListSection.module.css";
import { RecipesListJsonLd } from "./RecipeJsonLd";
import { PaginationComponent } from "../pagination/PaginationComponent";
import { NotFoundByFilter } from "./NotFoundByFilter";
import { ButtonAsLink } from "../shared/ButtonAsLink";

interface RecipesListSectionProps {
  recipeList: RecipeResponse;
  params: FetchRecipesParams;
}

export const RecipesListSection = ({
  recipeList,
  params,
}: RecipesListSectionProps) => {
  const isEmpty = !recipeList.data.length;

  return (
    <section>
      <h1 className="visually-hidden">
        Healthy Recipe Collection - Quick Mediterranean, Vegetarian and High-Protein
        Meals Under 30 Minutes.
      </h1>
      <RecipesForm params={params} />
      {isEmpty ? (
        <NotFoundByFilter />
      ) : (
        <ul className={styles.recipesList}>
          {recipeList.data.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe}>
                <ButtonAsLink
                  content="View Recipe"
                  stylesClass={`${styles.viewRecipeBtn} text-preset-8`}
                  link={`/recipes/${recipe.id}/${encodeURIComponent(recipe.title)}`}
                  aria-label={`View full recipe for ${recipe.title}`}
                  itemProp="url"
                />
              </RecipeCard>
            </li>
          ))}
        </ul>
      )}
      <RecipesListJsonLd recipeList={recipeList} />
      <PaginationComponent pagination={recipeList.pagination} params={params} />
    </section>
  );
};
