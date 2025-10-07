import { RecipesExploreSection } from "@/components/recipesExplore/RecipesExploreSection";
import { RecipesListJsonLd } from "@/components/recipesList/RecipeJsonLd";
import { RecipesListSection } from "@/components/recipesList/RecipesListSection";

import { fetchRecipes, FetchRecipesParams } from "@/lib/api/fetchRecipes";

export type SearchParams = Promise<FetchRecipesParams>;

export default async function Recipes(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const initialData = await fetchRecipes(params);

  return (
    <>
      <RecipesExploreSection />
      <RecipesListSection recipeList={initialData} params={params} />
      <RecipesListJsonLd recipeList={initialData} />
    </>
  );
}
