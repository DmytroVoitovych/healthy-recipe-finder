import { Recipe } from "@/lib/api/fetchRecipesTypes";
import { getRandomIds } from "./getRandomIds";

export const getSimilarRecipes = (
  recipesMap: Map<string, Recipe>,
  similarParam: string | null,
  id:string
) => {
  const ids = similarParam
    ? similarParam.split(",").filter((sid) => recipesMap.has(sid))
    : getRandomIds(recipesMap,id);

  const similar = ids.reduce((acc: Recipe[], id) => {
    if (recipesMap.has(id)) acc.push(recipesMap.get(id)!);
    return acc;
  }, []);

  return similar;
};
