// heat up the server on first request in production
import { NextResponse } from "next/server";
import { preloadRecipes } from "./server/preloadRecipes";

let preloadPromise: Promise<void> | null = null;

export async function middleware() {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  if (!preloadPromise) {
    preloadPromise = preloadRecipes()
      .then(() => {
        console.log("✅ [Middleware] Recipes preloaded successfully");
      })
      .catch((err) => {
        console.error("❌ [Middleware] Failed to preload recipes:", err);
        preloadPromise = null;
      });
  }

  await preloadPromise;
  return NextResponse.next();
}

export const config = {
  matcher: ["/recipes/:path*", "/api/recipes/:path*"],
  runtime: "nodejs", // 'edge' doesn't support fs module
};
