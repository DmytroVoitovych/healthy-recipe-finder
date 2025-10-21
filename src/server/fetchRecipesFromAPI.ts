import { Recipe, SpoonacularSearchResponse } from "@/lib/api/fetchRecipesTypes";
import { fetchWithRetry } from "./fetchWithRetry";

export const fetchRecipesFromAPI = async (): Promise<Recipe[]> => {
  const allRecipes: Recipe[] = [];
  const totalRequests = 10;
  const pageSize = 100;

  console.log("🌐 Fetching recipes from Spoonacular API...");

  for (let page = 0; page < totalRequests; page++) {
    const offset = page * pageSize;
    const url =
      `${process.env.SPOONACULAR_BASE_URL}?` +
      `maxCalories=600&sort=healthiness&offset=${offset}&number=${pageSize}` +
      `&addRecipeInformation=true&fillIngredients=true&addRecipeInstructions=true`;

    try {
      console.log(
        `📡 Fetching page ${page + 1}/${totalRequests} (offset: ${offset})`
      );

      const res = await fetchWithRetry(url);

      if (!res?.ok) {
        console.error(`❌ Failed to fetch page ${page + 1}:`, res.statusText);
        continue;
      }

      const data: SpoonacularSearchResponse = await res.json();

      if (data?.results && data?.results?.length > 0) {
        allRecipes.push(...data.results);
        console.log(`✅ Page ${page + 1}: loaded ${data.results.length} recipes`);
      } else console.log(`⚠️ Page ${page + 1}: no results returned`);
    } catch (error) {
      console.error(`❌ Error fetching page ${page + 1}:`, error);
    }
  }

  return allRecipes;
};