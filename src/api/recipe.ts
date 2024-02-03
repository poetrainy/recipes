import { client } from "~/libs/client";
import {
  RecipeBeforePerseType,
  RecipeSaveType,
  RecipeType,
} from "~/types/MicroCMS";

export const getAllRecipes: () => Promise<RecipeType[]> = async () => {
  const result = (
    await client.get({
      endpoint: "recipes",
      queries: {
        offset: 0,
        limit: 100,
      },
    })
  ).contents as RecipeBeforePerseType[];

  const parsedResult = result.map((recipe) => {
    return {
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      steps: JSON.parse(recipe.steps),
      keywords: recipe.keywords ? JSON.parse(recipe.keywords) : undefined,
    };
  }) as RecipeType[];

  return parsedResult;
};

export const getRecipe: (recipeId: string) => Promise<RecipeType> = async (
  recipeId: string
) => {
  const result = (await client.get({
    endpoint: `recipes/${recipeId}`,
  })) as RecipeBeforePerseType;

  const parsedResult = {
    ...result,
    ingredients: JSON.parse(result.ingredients),
    steps: JSON.parse(result.steps),
    keywords: result.keywords ? JSON.parse(result.keywords) : undefined,
  } as RecipeType;

  return parsedResult;
};

export const saveRecipe: (content: RecipeSaveType) => Promise<void> = async (content: RecipeSaveType) => {
  await client.create({
    endpoint: "recipes",
    content: content,
  });
};
