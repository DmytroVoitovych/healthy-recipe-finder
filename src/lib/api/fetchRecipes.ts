import { createFatSecretUrlRequest } from "./fatSecret";
import { RecipesResponse } from "./fetchRecipesTypes";

const initialParams = {
  format: "json",
  "calories.to": 600,
  sort_by: "caloriesPerServingAscending",
  page_number: 0,
  max_results: 8,
  must_have_images: "true",
  "protein_percentage.from": 15,
  "carb_percentage.to": 60,
};

export type FetchRecipesParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export const fetchRecipes = async (
  params: FetchRecipesParams
): Promise<RecipesResponse> => {
  const dayInSeconds = 60 * 60 * 24;
  const searchParams = new URLSearchParams(params || {});
  const combinedParams = { ...initialParams, ...Object.fromEntries(searchParams) };

  const url = createFatSecretUrlRequest(
    "GET",
    "recipes/search/v3",
    combinedParams,
    process.env.FATSECRET_KEY!,
    process.env.FATSECRET_SECRET!
  );

  try {
    const response = await fetch(url, {
      next: { revalidate: dayInSeconds },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
