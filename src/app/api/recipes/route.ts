import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { preloadPromise, recipesMap } from "@/server/preloadRecipes";
import { filterRecipes } from "@/utils/routerHelpers/filterRecipes";
import { NextRequest, NextResponse } from "next/server";

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;

const CACHE_MAX_AGE = ONE_DAY;
const CACHE_STALE_WHILE_REVALIDATE = ONE_WEEK - ONE_DAY;

const CACHE_CONTROL_HEADER = `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_STALE_WHILE_REVALIDATE}`;

const PAGE_SIZE = 8;
const MAX_QUERY_LENGTH = 200;

export async function GET(req: NextRequest) {
  try {
    await preloadPromise;

    const { searchParams } = req.nextUrl;
    const search = searchParams.get("q")?.toLowerCase().trim() || "";

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

    const filtered = filterRecipes(search, recipesMap);

    const total = filtered.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const startIndex = page * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, total);

    const paginated = filtered.slice(startIndex, endIndex);

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
