"use client";
import { RemoveIco, SaveIco } from "@/utils/svgimports";
import styles from "./storeButton.module.css";
import { Recipe } from "@/lib/api/fetchRecipesTypes";
import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/api/getFavorites";
import { useSimpleToast } from "@/utils/customHook/useSimpleToast";
import { setLocalStorageSignal } from "@/utils/сustomEvents/setLocalStorageSignal";

interface StoreButtonProps {
  id: string;
  recipe: Recipe;
}

export const KEY = "favoriteRecipes";

export const StoreButton = ({ id, recipe }: StoreButtonProps) => {
  const [isExist, setExist] = useState(false);
  const label = isExist ? "Remove from favorites" : "Add to favorites";
  const toastMessage = `${label} successfully!`;
  const { list, showToast } = useSimpleToast(toastMessage, {
    animationClass: styles.toastAnimation,
    ico: !isExist ? (
      <SaveIco width="32" height="32" fill="#fff" />
    ) : (
      <RemoveIco width="32" height="32" fill="#fff" />
    ),
  });

  const toggleRecipe = () => {
    const newState = !isExist;
    setExist(newState);

    const data = getFavorites(KEY);

    if (newState) data[id] = recipe;
    else delete data[id];

    localStorage.setItem(KEY, JSON.stringify(data));
    setLocalStorageSignal(KEY,id);
    showToast();
  };

  useEffect(() => {
    const data = getFavorites(KEY);
    setExist(id in data);
  }, [id]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        const data = getFavorites(KEY);
        setExist(id in data);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [id]);

  return (
    <>
      <button
        className={styles.storeBtn}
        onClick={toggleRecipe}
        aria-label={label}
        aria-pressed={isExist}
        title={label}
      >
        {isExist ? (
          <RemoveIco width="32" height="32" />
        ) : (
          <SaveIco width="32" height="32" />
        )}
      </button>
      <span aria-live="polite" className="visually-hidden">
        {isExist ? "Recipe added to favorites" : "Recipe removed from favorites"}
      </span>
      {list}
    </>
  );
};
