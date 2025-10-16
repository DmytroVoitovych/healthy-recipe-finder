"use client";
import { useFilterBasedOnChange } from "@/utils/customHook/useFilterBasedOnChange";
import { BaseMenuOptionSelect } from "../shared/BaseMenuOptionSelect";
import styles from "./recipesForm.module.css";
import { RecipesSearchInput } from "./RecipesSearchInput";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import { useMemo } from "react";

interface RecipesFormProps {
  params: FetchRecipesParams;
}

const MAX_PREP_TIME = {
  placeholder: "Max Prep Time",
  optionList: ["0 minutes", "5 minutes", "10 minutes"],
  legend: "Select preparation time",
  popoverId: "prep-time-menu",
  radioName: "prepTime",
};

const MAX_COOK_TIME = {
  placeholder: "Max Cook Time",
  optionList: ["0 minutes", "5 minutes", "10 minutes", "15 minutes", "20 minutes"],
  legend: "Select cooking time",
  popoverId: "cook-time-menu",
  radioName: "cookTime",
};

const DIETS = {
placeholder: "Diets",
optionList:[
  "gluten free",
  "dairy free",
  "lacto ovo vegetarian",
  "vegan",
  "pescatarian",
  "ketogenic",
  "paleo",
  "primal",
  "whole 30",
  "fodmap"
],
legend: "Select your diets",
popoverId: "diets-menu",
radioName: "diets",
};

const SEARCH = {
  searchName: "q",
};

export const RecipesForm = ({ params }: RecipesFormProps) => {
  const initialState = useMemo(
    () => ({
      prepTime: params?.prepTime || "",
      cookTime: params?.cookTime || "",
      q: params?.q || "",
      diet: params?.diet || ""
    }),
    [params.prepTime, params.cookTime, params.q, params.diet]
  );

  const { filters, updateFilter, clearFilter } =
    useFilterBasedOnChange(initialState);

  return (
    <form
      className={styles.recipesListForm}
      role="search"
      aria-label="Filter healthy recipes"
    >
      <BaseMenuOptionSelect
        {...MAX_PREP_TIME}
        containerClass={styles.timeRadioMenuContainer}
        updateField={updateFilter}
        clearField={clearFilter}
        checkedValue={filters[MAX_PREP_TIME.radioName]}
      />
      <BaseMenuOptionSelect
        {...MAX_COOK_TIME}
        containerClass={styles.timeRadioMenuContainer}
        updateField={updateFilter}
        clearField={clearFilter}
        checkedValue={filters[MAX_COOK_TIME.radioName]}
      />
      <BaseMenuOptionSelect
        {...DIETS}
        containerClass={styles.timeRadioMenuContainer}
        updateField={updateFilter}
        clearField={clearFilter}
        checkedValue={filters[DIETS.radioName]}
      />
      <RecipesSearchInput
        updateField={updateFilter}
        value={filters[SEARCH.searchName]}
      />
    </form>
  );
};
