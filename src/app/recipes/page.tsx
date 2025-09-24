import { RecipesExploreSection } from '@/components/recipesExplore/RecipesExploreSection';
import { RecipesListSelection } from '@/components/recipesList/RecipesListSection';
import { fetchRecipes, FetchRecipesParams } from '@/lib/api/fetchRecipes';

export type SearchParams = Promise<FetchRecipesParams>

export default async function Recipes(props:{searchParams:SearchParams}) {
const searchParams = await props.searchParams;
const initialData =  await fetchRecipes(searchParams);

  return (
    <>
      <RecipesExploreSection/>
      <RecipesListSelection recipeList={initialData} />
    </>
  );
};