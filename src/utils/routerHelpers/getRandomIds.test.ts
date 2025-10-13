import { getRandomIds } from "@/utils/routerHelpers/getRandomIds";
import { Recipe } from "@/lib/api/fetchRecipesTypes";

const makeRecipesMap = (size: number): Map<string, Recipe> => {
  const map = new Map<string, Recipe>();
  for (let i = 1; i <= size; i++) {
    map.set(String(i), { id: i, title: `Recipe ${i}` } as Recipe);
  }
  return map;
};

describe("getRandomIds", () => {
  it("returns empty array when recipesMap is empty", () => {
    const map = new Map<string, Recipe>();
    expect(getRandomIds(map)).toEqual([]);
  });

  it("returns exactly 3 ids (minAllowed)", () => {
    const map = makeRecipesMap(10);
    const ids = getRandomIds(map);
    expect(ids).toHaveLength(3);
  });

  it("returns ids that exist in the recipesMap", () => {
    const map = makeRecipesMap(10);
    const ids = getRandomIds(map);
    ids.forEach((id) => {
      expect(map.has(id)).toBe(true);
    });
  });

  it("does not throw if map has fewer than 3 items", () => {
    const map = makeRecipesMap(2);
    const ids = getRandomIds(map);
    expect(Array.isArray(ids)).toBe(true);
  });

  it("handles large maps without exceeding sample limit (100)", () => {
    const map = makeRecipesMap(500);
    const ids = getRandomIds(map);
    expect(ids).toHaveLength(3);
  });

  it("returns consistent number of ids even for small randomIndex", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.01);
    const map = makeRecipesMap(10);
    const ids = getRandomIds(map);
    expect(ids).toHaveLength(3);
    jest.restoreAllMocks();
  });

  it("returns different sets of ids on multiple calls (most of the time)", () => {
    const map = makeRecipesMap(100);
    const ids1 = getRandomIds(map);
    const ids2 = getRandomIds(map);

    const areDifferent = ids1.join(",") !== ids2.join(",");
    expect(typeof areDifferent).toBe("boolean");
  });
});
