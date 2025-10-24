import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import { useEffect, useRef } from "react";

export const useViewTransitionUpdate = (params: FetchRecipesParams) => {
  const { page = "1", ...rest } = params;
  const othersKey = JSON.stringify(rest);

  const historyEvent = useRef(false);

  const prevPageRef = useRef<string | null>(null);
  const prevOthersRef = useRef<string | null>(null);

  const pageChanged = prevPageRef.current !== null && prevPageRef.current !== page;
  const othersChanged =
    prevOthersRef.current !== null && prevOthersRef.current !== othersKey;

  const update = pageChanged && !othersChanged ? "auto" : "none";

  prevPageRef.current = page;
  prevOthersRef.current = othersKey;

  useEffect(() => {
    const handlePop = () => {
      historyEvent.current = true;
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const result = historyEvent.current ? "none" : update;

  useEffect(() => {// reset
    historyEvent.current = false;
  });

  return result;
};
