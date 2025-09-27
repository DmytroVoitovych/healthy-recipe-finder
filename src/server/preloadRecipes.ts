import fs from "fs/promises";
import path from "path";
import type { Recipe, SpoonacularSearchResponse } from "@/lib/api/fetchRecipesTypes";

export const recipesMap = new Map<string, Recipe>();

const CACHE_FILE_PATH = path.join(process.cwd(), "data", "recipes-cache.json");
const CACHE_EXPIRY_DAYS = 7;

interface CacheData {
  timestamp: number;
  recipes: Recipe[];
  totalRecipes: number;
}

const isValidCache = (data: unknown): data is CacheData => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  const checks =
    typeof obj?.timestamp === "number" &&
    Array.isArray(obj?.recipes) &&
    typeof obj?.totalRecipes === "number";

  return checks;
};

const isCacheExpired = (timestamp: number): boolean => {
  const now = Date.now();
  const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return now - timestamp > expiryTime;
};

const loadFromCache = async (): Promise<CacheData | null> => {
  try {
    const data = await fs.readFile(CACHE_FILE_PATH, "utf-8");
    const cacheData: CacheData = JSON.parse(data);

    if (!isValidCache(cacheData)) {
      console.warn("⚠️ Cache file has invalid structure, ignoring...");
      return null;
    }

    if (isCacheExpired(cacheData.timestamp)) {
      console.log("🕒 Cache expired, need to fetch fresh data");
      return null;
    }

    console.log(`📁 Loaded ${cacheData.totalRecipes} recipes from cache`);
    return cacheData;
  } catch {
    console.log("📂 No cache file found, will fetch from API");
    return null;
  }
};

const saveToCache = async (recipes: Recipe[]): Promise<void> => {
  try {
    const dataDir = path.dirname(CACHE_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });

    const cacheData: CacheData = {
      timestamp: Date.now(),
      recipes,
      totalRecipes: recipes.length,
    };

    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cacheData, null, 2));
    console.log(`💾 Saved ${recipes.length} recipes to cache file`);
  } catch (error) {
    console.error("❌ Failed to save cache:", error);
  }
};

const fetchWithRetry = async (url: string): Promise<Response> => {
  const API_KEYS = [
    process.env.SPOONACULAR_API_KEY,
    process.env.SPOONACULAR_API_KEY_2,
    process.env.SPOONACULAR_API_KEY_3,
  ];

  for (let i = 0; i < API_KEYS.length; i++) {
    const key = API_KEYS[i];

    const res = await fetch(url, {
      headers: { "x-api-key": key || "" },
    });

    if (res.ok) return res;

    if (res.status === 402 || res.status === 401) {
      console.warn(
        `⚠️ API key rate limited or invalid (${res.status}) on key API_KEY_#${
          i + 1
        }, trying next...`
      );
      continue;
    }

    return res;
  }

  throw new Error("All API keys are rate limited or invalid");
};

const fetchRecipesFromAPI = async (): Promise<Recipe[]> => {
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

const populateRecipesMap = (recipes: Recipe[]): void => {
  recipesMap.clear();

  recipes.forEach(
    (recipe) => recipe?.id && recipesMap.set(String(recipe.id), recipe)
  );
  console.log(`🗺️ Populated recipes map with ${recipesMap.size} recipes`);
};

export async function preloadRecipes(): Promise<void> {
  console.log("🚀 Starting recipe preloading...");

  const cachedData = await loadFromCache();

  if (cachedData) {
    populateRecipesMap(cachedData.recipes);
    console.log(
      "✅ Preloading complete from cache. Total recipes:",
      recipesMap.size
    );
    return;
  }

  const recipes = await fetchRecipesFromAPI();

  if (recipes.length > 0) {
    await saveToCache(recipes);
    populateRecipesMap(recipes);
    console.log("✅ Preloading complete from API. Total recipes:", recipesMap.size);
  } else {
    console.log("❌ Failed to load recipes from API");
  }
}

if (typeof window !== "undefined") {
  // edge case for client-side safety (захист від дурнів)
  throw new Error("🚨 preloadRecipes.ts must not be imported in client code!");
}

export const preloadPromise = preloadRecipes();
