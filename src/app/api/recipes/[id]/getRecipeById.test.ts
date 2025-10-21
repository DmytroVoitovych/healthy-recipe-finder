/**
 * @jest-environment node
 */

import { GET } from "./route";
import { NextRequest } from "next/server";

jest.mock("@/server/preloadRecipes", () => ({
  recipesMap: new Map<string, Recipe>(),
  preloadPromise: Promise.resolve(),
}));

jest.mock("@/utils/routerHelpers/getSimilarRecipes", () => ({
  getSimilarRecipes: jest.fn(),
}));

import { recipesMap } from "@/server/preloadRecipes";
import { getSimilarRecipes } from "@/utils/routerHelpers/getSimilarRecipes";
import { Recipe } from "@/lib/api/fetchRecipesTypes";

const makeCtx = (id: string) => ({ params: Promise.resolve({ id }) });
const makeReq = (url: string) => new NextRequest(new URL(url));

describe("GET /api/recipes/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    recipesMap.clear();
  });

  it("returns 400 if id is missing", async () => {
    const req = makeReq("https://example.com/api/recipes");
    const res = await GET(req, makeCtx(" "));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/Missing or invalid ID/);
  });

  it("returns 404 if recipe not found", async () => {
    const req = makeReq("https://example.com/api/recipes?id=123");
    const res = await GET(req, makeCtx("123"));
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toMatch(/not found/);
  });

  it("returns recipe and similar data if recipe exists", async () => {
    const recipe = { id: "1", title: "ErrorCase" } as unknown;
    recipesMap.set("42", recipe as Recipe);
    (getSimilarRecipes as jest.Mock).mockReturnValue([{ id: "43", title: "Other" }]);

    const req = makeReq("https://example.com/api/recipes/42?similar=true");
    const res = await GET(req, makeCtx("42"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.recipe).toEqual(recipe);
    expect(data.similar).toEqual([{ id: "43", title: "Other" }]);
    expect(getSimilarRecipes).toHaveBeenCalledWith(recipesMap, "true", "42");
  });

  it("returns 500 if internal error occurs", async () => {
    const recipe = { id: "1", title: "ErrorCase" } as unknown;
    recipesMap.set("1", recipe as Recipe);
    (getSimilarRecipes as jest.Mock).mockImplementation(() => {
      throw new Error("Boom!");
    });

    const req = makeReq("https://example.com/api/recipes/1");
    const res = await GET(req, makeCtx("1"));
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Internal server error");
  });
});
