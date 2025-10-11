import { RecipesForm } from "./RecipesForm";
import { RecipeCard } from "./RecipeCard";
import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import styles from "./recipesListSection.module.css";
import { RecipesListJsonLd } from "./RecipeJsonLd";
import { PaginationComponent } from "../pagination/PaginationComponent";
import { NotFoundByFilter } from "./NotFoundByFilter";

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
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
      <RecipesListJsonLd recipeList={recipeList} />
      <PaginationComponent pagination={recipeList.pagination} params={params} />
    </section>
  );
};
