import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { preloadPromise, recipesMap } from "@/server/preloadRecipes";
import { filterRecipes } from "@/utils/routerHelpers/filterRecipes";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_CONTROL_HEADER } from "../casheConfig";
import { getRandomIds } from "@/utils/routerHelpers/getRandomIds";
import { createPaginationFromData } from "@/utils/routerHelpers/createPaginationFromData";
import { MAX_QUERY_LENGTH, PAGE_SIZE } from "@/utils/constants";

export async function GET(req: NextRequest) {
  try {
    if (recipesMap.size === 0 && preloadPromise) {
      // uncomment if not awaited in middleware
      await preloadPromise;
    }

    const { searchParams } = req.nextUrl;
    const search = searchParams.get("q")?.toLowerCase().trim() || "";
    const prepTime = parseInt(searchParams.get("prepTime") || "");
    const cookTime = parseInt(searchParams.get("cookTime") || "");
    const diets = searchParams.get("diet") || "";

    if (search.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { error: `Query too long (max ${MAX_QUERY_LENGTH} chars)` },
        { status: 400 }
      );
    }

    const pageParam = searchParams.get("page") ?? "0";
    const page = parseInt(pageParam, 10);

    if (!Number.isInteger(page) || page < 0) {
      return NextResponse.json({ error: "Invalid page parameter" }, { status: 400 });
    }

    if (recipesMap.size === 0) {
      return NextResponse.json(
        {
          error: "Recipes not loaded yet. Please try again in a moment.",
        },
        { status: 503 }
      );
    }

    const filtered = filterRecipes(search, prepTime, cookTime, diets, recipesMap);
    const randomIds = getRandomIds(recipesMap);

    const { paginated, totalPages, total } = createPaginationFromData(
      PAGE_SIZE,
      page,
      filtered
    );

    const response: RecipeResponse = {
      data: paginated,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        totalPages,
        hasNext: page < totalPages - 1,
        hasPrev: page > 0,
      },
      randomSample: randomIds,
    };

    if (search) response.search = search;

    return NextResponse.json(response, {
      headers: { "Cache-Control": CACHE_CONTROL_HEADER },
    });
  } catch (error) {
    console.error("Error in recipes API:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
