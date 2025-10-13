import { Recipe } from "@/lib/api/fetchRecipesTypes";
import { randomInteger } from "../componentHelpers/randomInteger";

export const getRandomIds = (
  recipesMap: Map<string, Recipe>,
  excludedId?: string
) => {
  if (!recipesMap.size) return [];
  const minAllowed = 3;
  const sampleAmount = recipesMap.size < 100 ? recipesMap.size : 100;
  const startIndex = randomInteger(0, sampleAmount - 1);
  const resultIds: string[] = [];
  const randomIds: string[] = [];

  let count = 0;

  for (const id of recipesMap.keys()) {
    if (count >= sampleAmount) break;
    if (excludedId && excludedId === id) continue;
    resultIds[count] = id;

    count++;
  }

  for (let i = 0; i < minAllowed; i++) randomIds.push(resultIds.at(startIndex - i)!);

  return randomIds;
};
