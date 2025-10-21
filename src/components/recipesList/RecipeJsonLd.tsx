import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Head from "next/head";
import { getFirstSentence } from "@/utils/componentHelpers/getFirstSentence";

export const RecipesListJsonLd = ({ recipeList }: { recipeList: Recipe[] }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Healthy Recipe Collection - Quick Mediterranean, Vegetarian and High-Protein Meals Under 30 Minutes",
    itemListElement: recipeList.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Recipe",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/recipes/${recipe.id}/${encodeURIComponent(
            recipe.title
          )}`,
        },
        name: recipe.title,
        image: `https://img.spoonacular.com/recipes/${recipe.id}-636x393.${recipe.imageType}`,
        url: `${baseUrl}/recipes/${recipe.id}/${encodeURIComponent(recipe.title)}`,
        description: getFirstSentence(recipe.summary).replace(/<[^>]+>/g, ""),
        recipeYield: `${recipe.servings} servings`,
        totalTime: `PT${recipe.readyInMinutes}M`,
        prepTime: recipe.preparationMinutes
          ? `PT${recipe.preparationMinutes}M`
          : undefined,
        cookTime: recipe.cookingMinutes ? `PT${recipe.cookingMinutes}M` : undefined,
        author: {
          "@type": "Voit Production",
          name: "Healthy Recipes Finder",
        },
        keywords: "healthy, vegetarian, quick, high-protein, mediterranean",
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};
