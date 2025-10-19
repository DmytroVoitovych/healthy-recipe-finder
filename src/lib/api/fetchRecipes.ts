import { RecipeResponse } from "./fetchRecipesTypes";
import { getBaseUrl } from "./../../utils/fetchHelpers/getBaseUrl";

export type FetchRecipesParams = {
  q?: string;
  page?: string;
  prepTime?: string;
  cookTime?: string;
  diet?: string;
};

export const fetchRecipes = async (
  params?: FetchRecipesParams
): Promise<RecipeResponse> => {
  const searchParams = new URLSearchParams(params);
  const isServer = typeof window === "undefined";

  if (params?.page !== undefined) {
    const safePage = Math.max(+params.page, 1);
    searchParams.set("page", (safePage - 1).toString());
  }

  const qs = searchParams.toString();
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/recipes${qs ? `?${qs}` : ""}`;

  try {
    const response = await fetch(url, {
      next: isServer ? { revalidate: 60 * 60 * 24 } : {},
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recipes: ${response.status} ${response.statusText}`
      );
    }

    const data: RecipeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
