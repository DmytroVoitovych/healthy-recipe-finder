/**
 * @jest-environment node
 */

import { GET } from "./route";
import { NextRequest } from "next/server";

jest.mock("@/server/preloadRecipes", () => ({
  recipesMap: new Map<string, Recipe>(),
  preloadPromise: Promise.resolve(),
}));

jest.mock("@/utils/routerHelpers/filterRecipes", () => ({
  filterRecipes: jest.fn(),
}));
jest.mock("@/utils/routerHelpers/getRandomIds", () => ({
  getRandomIds: jest.fn(),
}));
jest.mock("@/utils/routerHelpers/createPaginationFromData", () => ({
  createPaginationFromData: jest.fn(),
}));

import { recipesMap } from "@/server/preloadRecipes";
import { filterRecipes } from "@/utils/routerHelpers/filterRecipes";
import { getRandomIds } from "@/utils/routerHelpers/getRandomIds";
import { createPaginationFromData } from "@/utils/routerHelpers/createPaginationFromData";
import { Recipe } from "@/lib/api/fetchRecipesTypes";

const makeRequest = (url: string) => new NextRequest(new URL(url));

describe("GET /api/recipes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    recipesMap.clear();
  });

  it("returns 400 if query too long", async () => {
    const req = makeRequest(`https://example.com/api/recipes?q=${"a".repeat(201)}`);
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/Query too long/);
  });

  it("returns 400 if page param invalid", async () => {
    const req = makeRequest("https://example.com/api/recipes?page=-1");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/Invalid page/);
  });

  it("returns 503 if recipes not loaded yet", async () => {
    const req = makeRequest("https://example.com/api/recipes");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(503);
    expect(data.error).toMatch(/Recipes not loaded yet/);
  });

  it("returns valid data when recipes exist", async () => {
    recipesMap.set("1", { id: 1, title: "Soup" } as Recipe);
    (filterRecipes as jest.Mock).mockReturnValue([{ id: 1, title: "Soup" }]);
    (createPaginationFromData as jest.Mock).mockReturnValue({
      paginated: [{ id: 1, title: "Soup" }],
      totalPages: 1,
      total: 1,
    });
    (getRandomIds as jest.Mock).mockReturnValue([1]);

    const req = makeRequest("https://example.com/api/recipes?page=0");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.data[0].title).toBe("Soup");
    expect(data.pagination.total).toBe(1);
    expect(data.randomSample).toEqual([1]);
  });

  it("returns 500 if internal error happens", async () => {
    recipesMap.set("1", { id: 1, title: "Soup" } as Recipe);
    (filterRecipes as jest.Mock).mockImplementation(() => {
      throw new Error("test failure");
    });

    const req = makeRequest("https://example.com/api/recipes");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Internal server error");
  });
});
