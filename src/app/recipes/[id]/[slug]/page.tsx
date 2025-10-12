import { RecipePageMainContent } from "@/components/recipePage/RecipePageMainContent";
import { fetchRecipeById } from "@/lib/api/fetchRecipeById";

export default async function RecipePageById(
  props: PageProps<"/recipes/[id]/[slug]">
) {
  const id = (await props.params)?.id;
  const recipe = await fetchRecipeById(id);
  
  if (!recipe) return <div>Recipe not found</div>;
  return (
    <>
      <RecipePageMainContent recipe={recipe} />
    </>
  );
}
