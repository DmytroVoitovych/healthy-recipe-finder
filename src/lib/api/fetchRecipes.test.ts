/**
 * @jest-environment node
 */

import { fetchRecipes } from "./fetchRecipes";
import { getBaseUrl } from "../../utils/fetchHelpers/getBaseUrl";

jest.mock("../../utils/fetchHelpers/getBaseUrl", () => ({
  getBaseUrl: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("fetchRecipes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getBaseUrl as jest.Mock).mockReturnValue("http://localhost:3000");
  });

  it("builds correct URL with query params", async () => {
    const mockResponse = { data: [{ id: 1, title: "Soup" }] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchRecipes({
      q: "chicken",
      page: "2",
      prepTime: "30",
      cookTime: "20",
      diet: "vegan",
    });

    expect(getBaseUrl).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/recipes?q=chicken&page=1&prepTime=30&cookTime=20&diet=vegan",
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse);
  });

  it("normalizes page param to be >= 1", async () => {
    const mockResponse = { data: [] };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });

    await fetchRecipes({ page: "0" });

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("page=0"); // because safePage - 1
  });

  it("calls fetch with revalidate option on server", async () => {
    const mockResponse = { data: [] };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });

    await fetchRecipes();

    const options = mockFetch.mock.calls[0][1];
    expect(options?.next?.revalidate).toBe(60 * 60 * 24);
  });

  it("throws error when response not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchRecipes()).rejects.toThrow("Failed to fetch recipes");
  });

  it("throws error and logs when fetch itself fails", async () => {
    const error = new Error("Network down");
    mockFetch.mockRejectedValueOnce(error);
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(fetchRecipes()).rejects.toThrow("Network down");
    expect(logSpy).toHaveBeenCalledWith("Error fetching recipes:", error);

    logSpy.mockRestore();
  });
});
