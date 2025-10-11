import { BreadcrumbComponent } from "@/components/recipePage/BreadcrumbComponent";
import { fetchRecipeById } from "@/lib/api/fetchRecipeById";

export default async function RecipePageById(
  props: PageProps<"/recipes/[id]/[slug]">
) {
  const id = (await props.params)?.id;
  const recipe = await fetchRecipeById(id);
console.log(recipe);
  if (!recipe) return <div>Recipe not found</div>;
  return <>
  <BreadcrumbComponent >
  {recipe.title}
  </BreadcrumbComponent>
  </>;
}
