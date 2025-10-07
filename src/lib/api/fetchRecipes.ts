import { RecipeResponse } from "./fetchRecipesTypes";
import { getBaseUrl } from "./../../utils/fetchHelpers/getBaseUrl";

export type FetchRecipesParams = {
  q?: string;
  page?: number;
};

export const fetchRecipes = async (
  params?: FetchRecipesParams
): Promise<RecipeResponse> => {
  console.log('testing fetchRecipes params:', params);
  const searchParams = new URLSearchParams();
  const isServer = typeof window === "undefined";

  if (params?.q) searchParams.set("q", params.q);

  if (params?.page !== undefined) searchParams.set("page", (params.page - 1).toString());

  const qs = searchParams.toString();
  const baseUrl =  getBaseUrl();
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
