
export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface NutritionProperty {
  name: string;
  amount: number;
  unit: string;
}

export interface NutritionIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
}

export interface Nutrition {
  nutrients: Nutrient[];
  properties?: NutritionProperty[];
  flavonoids?: NutritionProperty[];
  ingredients?: NutritionIngredient[];
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
  metaInformation?: string[];
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


export interface InstructionIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface InstructionEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: InstructionIngredient[];
  equipment: InstructionEquipment[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}


export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  healthScore: number;
  pricePerServing: number;

  
  nutrition: Nutrition;

 
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];

  
  aggregateLikes?: number;
  cheap?: boolean;
  dairyFree: boolean;
  glutenFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy?: boolean;
  veryPopular?: boolean;
  sustainable?: boolean;
  lowFodmap?: boolean;

  creditsText?: string;
  license?: string | null;
  sourceName?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;

  spoonacularScore?: number;
  weightWatcherSmartPoints?: number;
  cookingMinutes: number | null;
  preparationMinutes: number | null;

  
  extendedIngredients: ExtendedIngredient[];
  instructions: string | null;
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
  randomSample:string[];
}


export interface SpoonacularSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}