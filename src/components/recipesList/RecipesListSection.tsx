import { RecipesResponse } from "@/lib/api/fetchRecipesTypes";
import { RecipesForm } from "./RecipesForm";
import { RecipeCard } from "./RecipeCard";

export const RecipesListSelection = ({recipeList}:{recipeList:RecipesResponse}) => {
  return (
    <section>
      <h1 className="visually-hidden">
        Healthy Recipe Collection - Quick Mediterranean, Vegetarian and High-Protein
        Meals Under 30 Minutes.
      </h1>
      <RecipesForm/>
      <ul>
        {recipeList.recipes.recipe.map((recipe) => (
          <RecipeCard key={recipe.recipe_id} recipe={recipe}/>
        ))}
      </ul>
    </section>
  );
};
