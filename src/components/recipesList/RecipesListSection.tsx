import { RecipesForm } from "./RecipesForm";
import { RecipeCard } from "./RecipeCard";
import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import styles from "./recipesListSection.module.css";

interface RecipesListSectionProps {
  recipeList: RecipeResponse;
  params: FetchRecipesParams;
}

export const RecipesListSelection = ({
  recipeList,
  params,
}: RecipesListSectionProps) => {


  return (
    <section>
      <h1 className="visually-hidden">
        Healthy Recipe Collection - Quick Mediterranean, Vegetarian and High-Protein
        Meals Under 30 Minutes.
      </h1>
      <RecipesForm />
      < ul className={styles.recipesList}>
        {recipeList.data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </section>
  );
};
