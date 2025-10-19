"use client";
import { KEY } from "@/components/shared/StoreButton";
import { getFavorites } from "@/lib/api/getFavorites";
import { createPaginationFromData } from "@/utils/routerHelpers/createPaginationFromData";
import { PAGE_SIZE } from "@/utils/constants";
import { getRandomIds } from "@/utils/routerHelpers/getRandomIds";
import { use, useCallback, useEffect, useMemo, useRef } from "react";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import { unstable_ViewTransition as ViewTransition } from "react";
import dynamic from "next/dynamic";
import { FavoriteHeroSection } from "@/components/favoritePage/FavoriteHeroSection";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { filterRecipes } from "@/utils/routerHelpers/filterRecipes";
import { useViewTransitionUpdate } from "@/utils/customHook/useViewTransitionUpdate";

export type SearchParams = Promise<FetchRecipesParams>;

const RecipesListSection = dynamic(
  () =>
    import("../../components/recipesList/RecipesListSection").then(
      (mod) => mod.RecipesListSection
    ),
  {
    ssr: false,
  }
);

export default function Favorite(props: { searchParams: SearchParams }) {
  const params = use(props.searchParams);
  const { page = "1", q, diet, prepTime = "", cookTime = "" } = params;
  const transitionUpdate = useViewTransitionUpdate(params);

  const router = useRouter();
  const savedRecipes = getFavorites(KEY);

  const zerobased = Math.max(parseInt(page, 10) - 1, 0);
  const storeMap = new Map(Object.entries(savedRecipes));
  const randomIds = getRandomIds(storeMap);
  const filtered = filterRecipes(
    q,
    parseInt(prepTime),
    parseInt(cookTime),
    diet,
    storeMap
  );

  const { paginated, total, totalPages } = useMemo(
    () => createPaginationFromData(PAGE_SIZE, zerobased, Object.values(filtered)),
    [zerobased, filtered]
  );

  const paginationSyncCopy = useRef(paginated);

  useEffect(() => {
    paginationSyncCopy.current = paginated;
  }, [paginated]);

  const initialData = {
    data: paginated,
    pagination: {
      page: zerobased,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      hasNext: zerobased < totalPages - 1,
      hasPrev: zerobased > 0,
    },
    randomSample: randomIds,
  };

  const redirect = useCallback(() => {
    const notFirst = zerobased > 0 && total > 1;
    const prevPage = zerobased - 1;
    if (!notFirst) return;

    const sUrl = new URLSearchParams(params);
    sUrl.set("page", String(zerobased - 1));
    const path = prevPage ? `/favorite?${sUrl}` : "/favorite";
    router.replace(path);
  }, [zerobased, total, params, router]);

  useEffect(() => {
    const interceptStorageSignal = (e: CustomEvent) => {
      const id = e.detail.value;
      paginationSyncCopy.current = paginationSyncCopy.current.filter(
        (e) => e.id !== +id
      );
      if (!paginationSyncCopy.current.length) redirect();
    };

    window.addEventListener(
      "localstorage-signal",
      interceptStorageSignal as EventListener
    );

    return () =>
      window.removeEventListener(
        "localstorage-signal",
        interceptStorageSignal as EventListener
      );
  }, [redirect]);

  return (
    <>
      <ViewTransition enter="scale-in" exit="scale-out" update={transitionUpdate}>
        <FavoriteHeroSection />
        <RecipesListSection
          recipeList={initialData}
          params={params}
          route={"/favorite"}
          className={styles.favoriteItemsDisapeard}
        />
      </ViewTransition>
    </>
  );
}
