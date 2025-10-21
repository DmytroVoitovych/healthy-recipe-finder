import { filterRecipes } from "./filterRecipes";
import type { Recipe } from "@/lib/api/fetchRecipesTypes";

describe("filterRecipes", () => {
  let recipesMap: Map<string, Recipe>;

  beforeEach(() => {
    recipesMap = new Map([
      [
        "1",
        {
          id: 1,
          title: "Vegan Salad",
          summary: "Healthy and green",
          cuisines: ["American"],
          extendedIngredients: [{ name: "Lettuce" }, { name: "Tomato" }],
          diets: ["vegan"],
          preparationMinutes: 10,
          cookingMinutes: 5,
          readyInMinutes: 15,
        } as Recipe,
      ],
      [
        "2",
        {
          id: 2,
          title: "Chicken Soup",
          summary: "Warm soup for winter",
          cuisines: ["Asian"],
          extendedIngredients: [{ name: "Chicken" }, { name: "Carrot" }],
          diets: ["high-protein"],
          preparationMinutes: 20,
          cookingMinutes: 30,
          readyInMinutes: 50,
        } as Recipe,
      ],
      [
        "3",
        {
          id: 3,
          title: "Fruit Smoothie",
          summary: "Fresh fruits blended",
          cuisines: ["Global"],
          extendedIngredients: [{ name: "Banana" }, { name: "Milk" }],
          diets: ["vegetarian"],
          preparationMinutes: 5,
          cookingMinutes: 0,
          readyInMinutes: 5,
        } as Recipe,
      ],
    ]);
  });

  it("returns all recipes if no filters applied", () => {
    const result = filterRecipes("", 0, 0, "", recipesMap);
    expect(result).toHaveLength(3);
  });

  it("filters by search term (case and diacritics insensitive)", () => {
    const result = filterRecipes("salad", 0, 0, "", recipesMap);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Vegan Salad");
  });

  it("filters by diet", () => {
    const result = filterRecipes("", 0, 0, "vegan", recipesMap);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Vegan Salad");
  });

  it("filters by prep and cook time", () => {
    const result = filterRecipes("", 15, 15, "", recipesMap);
    
    expect(result.map((r) => r.title)).toEqual(["Vegan Salad", "Fruit Smoothie"]);
  });

  it("filters by both search and time", () => {
    const result = filterRecipes("smoothie", 5, 0, "", recipesMap);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fruit Smoothie");
  });

  it("returns empty if no recipe matches search", () => {
    const result = filterRecipes("pasta", 0, 0, "", recipesMap);
    expect(result).toHaveLength(0);
  });

  it("handles recipes with missing optional fields gracefully", () => {
    const map = new Map([
      [
        "x",
        {
          id: 4,
          title: "",
          summary: "",
          cuisines: [],
          extendedIngredients: [],
          diets: [],
        } as never,
      ],
    ]);

    const result = filterRecipes("anything", 0, 0, "", map);
    expect(result).toHaveLength(0);
  });

  it("handles recipes that only have preparation time", () => {
    const map = new Map([
      [
        "1",
        {
          id: 1,
          title: "Quick Salad",
          diets: [],
          preparationMinutes: 10,
          cookingMinutes: 0,
          readyInMinutes: 15,
        } as never,
      ],
    ]);

    const result = filterRecipes("", 5, 0, "", map);
    expect(result).toHaveLength(0); // prepTime limit 5 < 10
  });

  it("handles recipes that only have cooking time", () => {
    const map = new Map([
      [
        "1",
        {
          id: 1,
          title: "Boiled Egg",
          diets: [],
          preparationMinutes: 0,
          cookingMinutes: 10,
          readyInMinutes: 10,
        } as never,
      ],
    ]);

    const result = filterRecipes("", 0, 15, "", map);
    expect(result).toHaveLength(1);
  });

    it("handles recipes with neither prep nor cook time", () => {
    const map = new Map([
      [
        "1",
        {
          id: 1,
          title: "Mystery Dish",
          diets: [],
          preparationMinutes: 0,
          cookingMinutes: 0,
          readyInMinutes: 20,
        } as never,
      ],
    ]);

    
    const result = filterRecipes("", 5, 5, "", map);
    expect(result).toHaveLength(0);

    const result2 = filterRecipes("", 15, 15, "", map);
    expect(result2).toHaveLength(1);
  });
});
