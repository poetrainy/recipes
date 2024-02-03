import { MicroCMSType } from "~/types/MicroCMS";

export type RecipeType = MicroCMSType & {
  title: string;
  genre: RecipeGenreType[];
  quantity?: string;
  ingredients: RecipeIngredientType[];
  steps: RecipeStepType[];
  image?: { url: string; width: number; height: number };
  keywords?: string[];
};

export type RecipeBeforePerseType = MicroCMSType & {
  title: string;
  genre: RecipeGenreType[];
  ingredients: string;
  steps: string;
  image?: { url: string; width: number; height: number };
  keywords?: string;
};

export type RecipeSaveType = {
  title: string;
  genre: RecipeGenreType[];
  quantity?: string;
  ingredients: string;
  steps: string;
  keywords?: string;
};

export type RecipeGenreType = "ごはん" | "おやつ";

export type RecipeIngredientType = {
  id: number;
  ingredient: string;
  quantity: string;
};

export type RecipeStepType = {
  id: number;
  description: string;
};
