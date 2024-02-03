import { WriteApiRequestResult } from "microcms-js-sdk";
import { client } from "~/libs/client";
import {
  RecipeBeforePerseType,
  RecipeSaveType,
  RecipeType,
} from "~/types/Recipe";

export const getAllRecipes: () => Promise<RecipeType[]> = async () => {
  const response = (
    await client.get({
      endpoint: "recipes",
      queries: {
        offset: 0,
        limit: 100,
      },
    })
  ).contents as RecipeBeforePerseType[];

  const parsedResponse = response.map((recipe) => {
    return {
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      steps: JSON.parse(recipe.steps),
      keywords: recipe.keywords ? JSON.parse(recipe.keywords) : undefined,
    };
  }) as RecipeType[];

  return parsedResponse;
};

export const getRecipe: (recipeId: string) => Promise<RecipeType> = async (
  recipeId: string
) => {
  const response = (await client.get({
    endpoint: `recipes/${recipeId}`,
  })) as RecipeBeforePerseType;

  const parsedResponse = {
    ...response,
    ingredients: JSON.parse(response.ingredients),
    steps: JSON.parse(response.steps),
    keywords: response.keywords ? JSON.parse(response.keywords) : undefined,
  } as RecipeType;

  return parsedResponse;
};

export const saveRecipe: (
  content: RecipeSaveType
) => Promise<WriteApiRequestResult> = async (content: RecipeSaveType) => {
  const response = await client.create({
    endpoint: "recipes",
    content: content,
  });

  return response;
};
