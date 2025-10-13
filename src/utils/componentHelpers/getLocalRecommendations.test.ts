import { getLocalRecommendations } from "./getLocalRecommendations";
import { Recipe, RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { randomInteger } from "./randomInteger";

const makeRecipeResponse = (count: number): RecipeResponse => ({
  data: Array.from(
    { length: count },
    (_, i) =>
      ({
        id: i + 1,
        title: `Recipe ${i + 1}`,
      } as Recipe)
  ),
  randomSample: ["101", "102", "103"],
  pagination: {
    page: 0,
    pageSize: 8,
    total: count,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
});

jest.mock("./randomInteger", () => ({
  randomInteger: jest.fn(() => 0),
}));

describe("getLocalRecommendations", () => {
  it("returns URLSearchParams instance", () => {
    const list = makeRecipeResponse(5);
    const getParams = getLocalRecommendations(list);
    const params = getParams(1);
    expect(params).toBeInstanceOf(URLSearchParams);
  });

  it("returns 'similar' param with 3 IDs by default", () => {
    const list = makeRecipeResponse(10);
    const getParams = getLocalRecommendations(list);
    const params = getParams(1);
    const similar = params.get("similar");
    expect(similar).toBeTruthy();
    expect(similar?.split(",")).toHaveLength(3);
  });

  it("uses randomSample if data list smaller than 3", () => {
    const list = makeRecipeResponse(2);
    const getParams = getLocalRecommendations(list);
    const params = getParams(1);
    const similar = params.get("similar")!;
    expect(similar).toBe("101,102,103");
  });

  it("uses all remaining items if exactly 3 unique left", () => {
    const list = makeRecipeResponse(4);
    const getParams = getLocalRecommendations(list);
    const params = getParams(1);
    const similar = params.get("similar")!;
    expect(similar.split(",").length).toBe(3);
  });

  it("excludes current recipe id from the result", () => {
    const list = makeRecipeResponse(6);
    const getParams = getLocalRecommendations(list);
    const params = getParams(3);
    const similar = params.get("similar")!;
    expect(similar.includes("3")).toBe(false);
  });

  it("respects randomInteger boundaries", () => {
    (randomInteger as jest.Mock).mockReturnValue(0);
    const list = makeRecipeResponse(10);
    const getParams = getLocalRecommendations(list);
    const params = getParams(2);
    const similar = params.get("similar")!;
    expect(similar.split(",")).toHaveLength(3);
    jest.restoreAllMocks();
  });

  it("does not throw even if list.data is empty", () => {
    const list = makeRecipeResponse(0);
    const getParams = getLocalRecommendations(list);
    const params = getParams(1);
    expect(params).toBeInstanceOf(URLSearchParams);
  });

  it("never includes undefined in 'similar' param even for small randomIndex", () => {
    (randomInteger as jest.Mock).mockReturnValue(0);

    const list = makeRecipeResponse(10);
    const getParams = getLocalRecommendations(list);
    const params = getParams(5);

    const similar = params.get("similar")!;
    const ids = similar.split(",");

    ids.forEach((id) => {
      expect(id).toBeDefined();
      expect(id).not.toBe("");
      expect(Number.isNaN(Number(id))).toBe(false);
    });

    jest.restoreAllMocks();
  });
});
