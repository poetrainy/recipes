import { MicroCMSImageType, MicroCMSType } from "~/types/MicroCMS";

export type RecipeBaseType = MicroCMSType & {
  title: string;
  genre: RecipeGenreType[];
  image?: MicroCMSImageType;
  keywords?: string[];
};

export type RecipeBaseBeforePerseType = MicroCMSType & {
  title: string;
  genre: RecipeGenreType[];
  image?: MicroCMSImageType;
  keywords?: string;
};

export type RecipeType = RecipeBaseType & {
  quantity?: string;
  ingredients: RecipeIngredientType[];
  steps: RecipeStepType[];
};

export type RecipeBeforePerseType = RecipeBaseBeforePerseType & {
  quantity?: string;
  ingredients: string;
  steps: string;
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

export type RecipeOtherType = RecipeBaseType & {
  url: string;
};

export type RecipeOtherBeforePerseType = RecipeBaseBeforePerseType & {
  url: string;
};

export type RecipeWithTargetType =
  | {
      recipe: RecipeType;
      target: "original";
    }
  | {
      recipe: RecipeOtherType;
      target: "other";
    };
