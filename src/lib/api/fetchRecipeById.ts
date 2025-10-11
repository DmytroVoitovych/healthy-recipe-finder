import { getBaseUrl } from "@/utils/fetchHelpers/getBaseUrl";
import { Recipe } from "./fetchRecipesTypes";

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  if (!id?.trim()) return null;
  const isServer = typeof window === "undefined";

  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/recipes/${id}`, {
      next: isServer ? { revalidate: 60 } : {},
    });

    if (!response.ok) return null;

    const data: Recipe = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    return null;
  }
};
