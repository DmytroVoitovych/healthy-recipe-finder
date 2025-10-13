import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { randomInteger } from "./randomInteger";

export const getLocalRecommendations = (list: RecipeResponse) => {
  const similarList = list.data.map((e) => e.id);
  const sample = list.randomSample;

  return (id: number) => {
    const listUniqueIds = similarList.filter((e) => e !== id);
    const minAllowed = 3;
    const startIndex = randomInteger(0, listUniqueIds.length - 1);
    const params = new URLSearchParams();

    if (similarList.length < minAllowed) {
      params.append("similar", sample.join(","));
      return params;
    }
    if (listUniqueIds.length === minAllowed) {
      params.append("similar", listUniqueIds.join(","));
      return params;
    }

    const randomList: number[] = [];
    for (let i = 0; i < minAllowed; i++)
      randomList.push(listUniqueIds.at(startIndex - i)!);

    params.append("similar", randomList.join(","));
    return params;
  };
};
