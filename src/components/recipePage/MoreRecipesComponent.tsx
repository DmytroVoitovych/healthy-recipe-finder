import { Recipe } from "@/lib/api/fetchRecipesTypes";
import { RecipesListComponent } from "../recipesList/RecipesListComponent";
import styles from './moreRecipes.module.css';

export const MoreRecipesComponent = ({recipesList}:{recipesList:Recipe[]}) => {
  return (
    <section className={`${styles.moreRecipesSection} hasDivider`} >
      <h2 className="text-preset-3">More recipes</h2>
      <RecipesListComponent recipesList={recipesList} />
    </section>
  );
};
