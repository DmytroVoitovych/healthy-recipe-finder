import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Head from "next/head";
import { getFirstSentence } from "./../../utils/componentHelpers/getFirstSentence";

export const RecipesListJsonLd = ({
  recipeList,
}: {
  recipeList: Recipe[];
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Healthy Recipe Collection - Quick Mediterranean, Vegetarian and High-Protein Meals Under 30 Minutes",
    itemListElement: recipeList.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Recipe",
        name: recipe.title,
        image: `https://img.spoonacular.com/recipes/${recipe.id}-636x393.${recipe.imageType}`,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/recipes/${
          recipe.id
        }/${encodeURIComponent(recipe.title)}`,
        description: getFirstSentence(recipe.summary).replace(/<[^>]+>/g, ""),
        recipeYield: `${recipe.servings} servings`,
        totalTime: `PT${recipe.readyInMinutes}M`,
        prepTime: recipe.preparationMinutes
          ? `PT${recipe.preparationMinutes}M`
          : undefined,
        cookTime: recipe.cookingMinutes ? `PT${recipe.cookingMinutes}M` : undefined,
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
