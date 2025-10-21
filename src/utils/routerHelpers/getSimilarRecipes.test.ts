import { getSimilarRecipes } from "./getSimilarRecipes";
import { getRandomIds } from "./getRandomIds";
import type { Recipe } from "@/lib/api/fetchRecipesTypes";

// мок для getRandomIds, чтобы не зависеть от случайности
jest.mock("./getRandomIds", () => ({
  getRandomIds: jest.fn(() => ["2", "3"]),
}));

describe("getSimilarRecipes", () => {
  const recipesMap = new Map<string, Recipe>([
    ["1", { id: 1, title: "A" } as Recipe],
    ["2", { id: 2, title: "B" } as Recipe],
    ["3", { id: 3, title: "C" } as Recipe],
  ]);

  it("returns recipes from similarParam if provided", () => {
    const result = getSimilarRecipes(recipesMap, "2,3,999", "1");
    expect(result.map((r) => r.id)).toEqual([2, 3]);
    expect(getRandomIds).not.toHaveBeenCalled();
  });

  it("calls getRandomIds if similarParam is null", () => {
    const result = getSimilarRecipes(recipesMap, null, "1");
    expect(getRandomIds).toHaveBeenCalledWith(recipesMap, "1");
    expect(result.map((r) => r.id)).toEqual([2, 3]);
  });

  it("returns empty array if none of ids exist", () => {
    const result = getSimilarRecipes(recipesMap, "999,888", "1");
    expect(result).toEqual([]);
  });
});
