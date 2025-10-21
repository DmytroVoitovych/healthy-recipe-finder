/**
 * @jest-environment node
 */

import { fetchRecipeById } from "./fetchRecipeById";
import { getBaseUrl } from "@/utils/fetchHelpers/getBaseUrl";

jest.mock("@/utils/fetchHelpers/getBaseUrl", () => ({
  getBaseUrl: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("fetchRecipeById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getBaseUrl as jest.Mock).mockReturnValue("http://localhost:3000");
  });

  it("returns null if id is empty or invalid", async () => {
    expect(await fetchRecipeById("")).toBeNull();
    expect(await fetchRecipeById("   ")).toBeNull();
  });

  it("returns data if fetch is successful", async () => {
    const mockData = {
      recipe: { id: 1, title: "Soup" },
      similar: [{ id: 2, title: "Salad" }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchRecipeById("1");

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/recipes/1",
      expect.objectContaining({
        next: { revalidate: 60 },
      })
    );

    expect(result).toEqual(mockData);
  });

  it("returns null if response not ok", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await fetchRecipeById("1");
    expect(result).toBeNull();
  });

  it("returns null and logs error if fetch throws", async () => {
    const error = new Error("Network error");
    mockFetch.mockRejectedValueOnce(error);
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = await fetchRecipeById("1");

    expect(result).toBeNull();
    expect(logSpy).toHaveBeenCalledWith(
      "Error fetching recipe 1:",
      error
    );

    logSpy.mockRestore();
  });
});
