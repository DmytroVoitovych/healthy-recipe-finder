import { Recipe } from "@/lib/api/fetchRecipesTypes";

export const filterRecipes = (
  search: string,
  recipesMap: Map<string, Recipe>
): Recipe[] => {
  if (!search) return [...recipesMap.values()];

  const normSearch = search.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const result: Recipe[] = [];

  for (const recipe of recipesMap.values()) {
    const text = `${recipe.title ?? ""} ${recipe.summary ?? ""} ${(
      recipe.cuisines ?? []
    ).join(" ")}`.toLowerCase();

    if (text.includes(normSearch)) result.push(recipe);
  }

  return result;
};
