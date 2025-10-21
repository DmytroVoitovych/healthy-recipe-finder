import { MoreRecipesComponent } from "@/components/recipePage/MoreRecipesComponent";
import { RecipePageMainContent } from "@/components/recipePage/RecipePageMainContent";
import { fetchRecipeById } from "@/lib/api/fetchRecipeById";
import { getFirstSentence } from "@/utils/componentHelpers/getFirstSentence";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";

export async function generateMetadata(
  props: PageProps<"/recipes/[id]/[slug]">,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await props.params;

  const data = await fetchRecipeById(id);

  if (!data?.recipe) {
    return {
      title: "Recipe not found",
      description: "The requested recipe could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = data?.recipe?.title || "Healthy recipe";
  const sanitize = data?.recipe?.summary?.replace(/<[^>]*>/g, "");
  const description = getFirstSentence(sanitize || "Fast healthy recipe.");

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      siteName: "Healthy Recipes Finder",
      images: [
        {
          url: `https://img.spoonacular.com/recipes/${id}-636x393.${data.recipe.imageType}`,
          width: 636,
          height: 393,
          alt: title,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function RecipePageById(
  props: PageProps<"/recipes/[id]/[slug]">
) {
  const { id } = await props.params;
  const data = await fetchRecipeById(id);

  if (!data?.recipe) return <div>Recipe not found</div>;
  return (
    <ViewTransition enter="scale-in" exit="scale-out">
      <>
        <RecipePageMainContent recipe={data.recipe} />
        {data?.similar ? (
          <MoreRecipesComponent recipesList={data.similar} />
        ) : (
          <div>no similar</div>
        )}
      </>
    </ViewTransition>
  );
}
