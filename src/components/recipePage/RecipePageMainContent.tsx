import { Recipe } from "@/lib/api/fetchRecipesTypes";
import { BreadcrumbComponent } from "./BreadcrumbComponent";
import { RecipeCard } from "./../recipesList/RecipeCard";
import styles from "./recipePageMainContent.module.css";
import { RecipeManualSection } from "./RecipeManualSection";

export const RecipePageMainContent = ({ recipe }: { recipe: Recipe }) => {
  const uniqueIngredients = [
    ...new Map(recipe.extendedIngredients.map((ing) => [ing.id, ing])).values(),
  ];

  const instructionList = recipe.analyzedInstructions.flatMap((inst) => inst.steps);

  const isEmptyInstructions = instructionList.length;
  const isEmptyIngredients = uniqueIngredients.length;

  return (
    <section className={`${styles.recipePageSection} hasDivider`}>
      <h1 className="visually-hidden">
        {`${recipe.title} Recipe - Quick, Healthy & Ready in ${recipe.readyInMinutes} Minutes`}
      </h1>
      <BreadcrumbComponent>{recipe.title}</BreadcrumbComponent>
      <RecipeCard recipe={recipe} className={styles.recipePage}>
        <RecipeManualSection title="Ingredients:">
          {isEmptyIngredients ? (
            <ul className="text-preset-6">
              {uniqueIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.original || ingredient.originalName}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No ingredients data available.</p>
          )}
        </RecipeManualSection>
        <RecipeManualSection title="Instructions:">
          {isEmptyInstructions ? (
            <ol className="text-preset-6">
              {instructionList.map((step) => (
                <li key={step.number + step.step.slice(5)}>
                  <span>{step.step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p>No instructions data available.</p>
          )}
        </RecipeManualSection>
      </RecipeCard>
    </section>
  );
};
