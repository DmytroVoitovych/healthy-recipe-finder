export interface Recipe {
  recipe_description: string;
  recipe_id: string;
  recipe_image: string;
  recipe_name: string;
  recipe_ingredients: {
    ingredient: string[];
  };
  recipe_nutrition: {
    calories: string;
    carbohydrate: string;
    fat: string;
    protein: string;
  };
  recipe_types: {
    recipe_type: string[];
  };
}

export interface RecipesResponse {
  recipes: {
    max_results: string;
    page_number: string;
    total_results: string;
    recipe: Recipe[];
  };
}

