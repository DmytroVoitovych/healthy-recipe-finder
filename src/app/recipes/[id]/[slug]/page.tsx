import { MoreRecipesComponent } from "@/components/recipePage/MoreRecipesComponent";
import { RecipePageMainContent } from "@/components/recipePage/RecipePageMainContent";
import { fetchRecipeById } from "@/lib/api/fetchRecipeById";

export default async function RecipePageById(
  props: PageProps<"/recipes/[id]/[slug]">
) {
  const id = (await props.params)?.id;
  const data = await fetchRecipeById(id);

  if (!data?.recipe) return <div>Recipe not found</div>;
  return (
    <>
      <RecipePageMainContent recipe={data.recipe} />
      {data?.similar ? (
        <MoreRecipesComponent recipesList={data.similar} />
      ) : (
        <div>no similar</div>
      )}
    </>
  );
}
