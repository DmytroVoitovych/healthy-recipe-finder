/**
 * @jest-environment node
 */

import fs from "fs/promises";
import { preloadRecipes, recipesMap } from "./preloadRecipes";
import { fetchRecipesFromAPI } from "./fetchRecipesFromAPI";
import type { Recipe } from "@/lib/api/fetchRecipesTypes";


jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  mkdir: jest.fn(),
}));


jest.mock("./fetchRecipesFromAPI", () => ({
  fetchRecipesFromAPI: jest.fn(),
}));


jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

const WEEK = 7 * 24 * 60 * 60 * 1000;

describe("preloadRecipes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    recipesMap.clear();
  });

  it("loads from valid cache", async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify({
        timestamp: Date.now(),
        recipes: [{ id: 1, title: "Cached" } as Recipe],
        totalRecipes: 1,
      })
    );

    await preloadRecipes();

    expect(recipesMap.size).toBe(1);
    expect(recipesMap.get("1")?.title).toBe("Cached");
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it("fetches & updates cache if expired", async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify({
        timestamp: Date.now() - WEEK - 1,
        recipes: [],
        totalRecipes: 0,
      })
    );

    (fetchRecipesFromAPI as jest.Mock).mockResolvedValue([
      { id: 42, title: "Mocked Recipe" },
    ]);

    await preloadRecipes();

    expect(recipesMap.size).toBe(1);
    expect(recipesMap.get("42")?.title).toBe("Mocked Recipe");
    expect(fs.writeFile).toHaveBeenCalled();
  });

  it("fetches & updates cache if file missing", async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error("ENOENT"));
    (fetchRecipesFromAPI as jest.Mock).mockResolvedValue([
      { id: 99, title: "Fetched" },
    ]);

    await preloadRecipes();

    expect(recipesMap.size).toBe(1);
    expect(recipesMap.get("99")?.title).toBe("Fetched");
    expect(fs.writeFile).toHaveBeenCalled();
  });

 it("handles API errors", async () => {
  (fs.readFile as jest.Mock).mockRejectedValue(new Error("ENOENT"));

  (fetchRecipesFromAPI as jest.Mock).mockImplementation(async () => {
    console.error("❌ Error fetching recipes: API error");
    return [];
  });

  await preloadRecipes();

  expect(recipesMap.size).toBe(0);
  expect(fs.writeFile).not.toHaveBeenCalled();
  expect(console.error).toHaveBeenCalled();
});

});
