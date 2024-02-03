export type MicroCMSType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type RecipeType = MicroCMSType & {
  title: string;
  genre: ("ごはん" | "おかし")[];
  ingredients: RecipeIngredientType[];
  steps: RecipeStepType[];
  image?: { url: string; width: number; height: number };
};

export type RecipeBeforePerseType = MicroCMSType & {
  title: string;
  genre: ("ごはん" | "おかし")[];
  ingredients: string;
  steps: string;
  image?: { url: string; width: number; height: number };
};

export type RecipeIngredientType = {
  id: number;
  ingredient: string;
  quantity: string;
};

export type RecipeStepType = {
  id: number;
  description: string;
};
