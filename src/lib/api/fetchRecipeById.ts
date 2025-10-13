import { getBaseUrl } from "@/utils/fetchHelpers/getBaseUrl";
import { Recipe } from "./fetchRecipesTypes";

interface RecipeByIdData {
  recipe: Recipe;
  similar: Recipe[];
}

export const fetchRecipeById = async (id: string): Promise<RecipeByIdData | null> => {
  if (!id?.trim()) return null;
  const isServer = typeof window === "undefined";

  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/recipes/${id}`, {
      next: isServer ? { revalidate: 60 } : {},
    });

    if (!response.ok) return null;

    const data: RecipeByIdData = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    return null;
  }
};
