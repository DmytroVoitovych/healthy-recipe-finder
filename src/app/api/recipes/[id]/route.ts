import { NextRequest, NextResponse } from "next/server";
import { recipesMap, preloadPromise } from "@/server/preloadRecipes";
import { CACHE_CONTROL_HEADER } from "../../casheConfig";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // if (recipesMap.size === 0 && preloadPromise) { // uncomment if not awaited in middleware
      await preloadPromise;
    // }

    const id = params.id;

    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });

    const recipe = recipesMap.get(id);

    if (!recipe) {
      return NextResponse.json(
        { error: `Recipe with id=${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe, {
      headers: {
        "Cache-Control": CACHE_CONTROL_HEADER,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ [API] Failed to serve recipe:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
