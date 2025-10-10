import { Recipe } from "@/lib/api/fetchRecipesTypes";

const normalizeText = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const getResultsByTime = (
  recipes: Recipe[],
  prepTime: number,
  cookTime: number
): Recipe[] => {
  const pLimit = +prepTime || 0;
  const cLimit = +cookTime || 0;
  const totalLimit = pLimit + cLimit;

  return recipes.filter((recipe) => {
    const prep = recipe.preparationMinutes ?? 0;
    const cook = recipe.cookingMinutes ?? 0;
    const ready = recipe.readyInMinutes ?? 0;

    const hasPrep = prep > 0;
    const hasCook = cook > 0;

    if (hasPrep && hasCook)
      return (prep <= pLimit && cook <= cLimit) || ready <= totalLimit;

    if (hasPrep) return prep <= pLimit || ready <= pLimit;

    if (hasCook) return cook <= cLimit || ready <= cLimit;

    return ready <= totalLimit;
  });
};

export const filterRecipes = (
  search: string,
  prepTime: number,
  cookTime: number,
  recipesMap: Map<string, Recipe>
): Recipe[] => {
  const recipeArr = [...recipesMap.values()];
  if (!search && !prepTime && !cookTime) return recipeArr;

  const normSearch = normalizeText(search);

  const result: Recipe[] = [];

  for (const recipe of recipeArr) {
    const ingredientsText = (recipe.extendedIngredients ?? [])
      .map((ing) => ing.name)
      .join(" ");

    const combinedText = `
      ${recipe.title ?? ""}
      ${recipe.summary ?? ""}
      ${(recipe.cuisines ?? []).join(" ")}
      ${ingredientsText}
    `;

    const normCombinedText = normalizeText(combinedText);

    if (normCombinedText.includes(normSearch)) result.push(recipe);
  }

  if (search && (prepTime || cookTime))
    return getResultsByTime(result, prepTime, cookTime);

  if (prepTime || cookTime) return getResultsByTime(recipeArr, prepTime, cookTime);

  return result;
};
