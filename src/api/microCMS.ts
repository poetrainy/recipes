import { client } from "~/libs/client";
import { RecipeBeforePerseType, RecipeType } from "~/types/MicroCMS";

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
      keywords: JSON.parse(recipe.keywords),
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
    keywords: JSON.parse(result.keywords),
  } as RecipeType;

  return parsedResult;
};
