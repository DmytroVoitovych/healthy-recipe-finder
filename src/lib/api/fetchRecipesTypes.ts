export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
}

export interface AnalyzedInstruction {
  name: string;
  steps: {
    number: number;
    step: string;
    ingredients: {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    }[];
    equipment: {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    }[];
    length?: {
      number: number;
      unit: string;
    };
  }[];
}

export interface Recipe {
  aggregateLikes: number;
  cheap: boolean;
  cookingMinutes: number | null;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  dishTypes: string[];
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  license: string | null;
  lowFodmap: boolean;
  nutrition: {
    nutrients: Nutrient[];
  };
  occasions: string[];
  preparationMinutes: number | null;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  summary: string;
  sustainable: boolean;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;

  extendedIngredients: ExtendedIngredient[];

  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
}

export interface RecipeResponse {
  data: Recipe[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  search?: string;
}

export interface SpoonacularSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
