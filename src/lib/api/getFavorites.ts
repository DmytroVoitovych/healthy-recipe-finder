import { Recipe } from "./fetchRecipesTypes";

export const getFavorites = (key: string):Record<string,Recipe> => {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};