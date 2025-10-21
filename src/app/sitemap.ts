import { fetchRecipes } from "@/lib/api/fetchRecipes";
import type { MetadataRoute } from "next";
import { Recipe } from "@/lib/api/fetchRecipesTypes";

export const revalidate = 604800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let recipes: Recipe[] = [];

  try {
    const res = await fetchRecipes();
    recipes = res.data ?? [];
  } catch (e) {
    console.warn("⚠️ Could not fetch recipes for sitemap", e);
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const recipePages: MetadataRoute.Sitemap = (recipes || []).map((r) => ({
    url: `${siteUrl}/recipes/${r.id}/${encodeURIComponent(r.title)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
    images: [`https://img.spoonacular.com/recipes/${r.id}-636x393.${r.imageType}`],
  }));

  return [...staticPages, ...recipePages];
}
