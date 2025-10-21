import { RecipesExploreSection } from "@/components/recipesExplore/RecipesExploreSection";
import { RecipesListSection } from "@/components/recipesList/RecipesListSection";
import { fetchRecipes, FetchRecipesParams } from "@/lib/api/fetchRecipes";


export const metadata = {
  title: "All Healthy Recipes",
  description: "Browse a wide collection of healthy recipes with nutrition facts, ingredients, and step-by-step instructions.",
};

export type SearchParams = Promise<FetchRecipesParams>;

export default async function Recipes(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const initialData = await fetchRecipes(params);

  return (
    <>
      <RecipesExploreSection />
      <RecipesListSection recipeList={initialData} params={params} />
    </>
  );
}
