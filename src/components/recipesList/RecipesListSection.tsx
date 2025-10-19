import { RecipesForm } from "./RecipesForm";
import { RecipeResponse } from "@/lib/api/fetchRecipesTypes";
import { FetchRecipesParams } from "@/lib/api/fetchRecipes";
import { PaginationComponent } from "../pagination/PaginationComponent";
import { NotFoundByFilter } from "./NotFoundByFilter";
import { RecipesListComponent } from "./RecipesListComponent";
import { getLocalRecommendations } from "@/utils/componentHelpers/getLocalRecommendations";

interface RecipesListSectionProps {
  recipeList: RecipeResponse;
  params: FetchRecipesParams;
  className?: string;
  route?: "/recipes" | "/favorite";
}

export const RecipesListSection = ({
  recipeList,
  params,
  className,
  route = "/recipes",
}: RecipesListSectionProps) => {
  const isEmpty = !recipeList.data.length;
  const getAdditionalParams = getLocalRecommendations(recipeList);

  return (
    <section className={`${className} nailContent`}>
      <h1 className="visually-hidden">
        Healthy Recipe Collection - Quick Mediterranean, Vegetarian and High-Protein
        Meals Under 30 Minutes.
      </h1>
      <RecipesForm params={params} />
      {isEmpty ? (
        <NotFoundByFilter />
      ) : (
        <RecipesListComponent
          recipesList={recipeList.data}
          getAdditionalParams={getAdditionalParams}
        />
      )}

      <PaginationComponent
        pagination={recipeList.pagination}
        params={params}
        route={route}
      />
    </section>
  );
};
