import { RecipeWithTargetType } from "~/types/Recipe";

type RecipeWithTargetAndKeywordType = {
  recipeWithTarget: RecipeWithTargetType;
  keyword: string;
};

export const filteredRecipes = (
  allRecipesWithTarget: RecipeWithTargetType[],
  q: string
) => {
  const searchKeywordMap: RecipeWithTargetAndKeywordType[] =
    allRecipesWithTarget.map((recipeWithTarget) => {
      const { target, recipe } = recipeWithTarget;

      const joinedKeywordRecipes: string =
        target === "original"
          ? recipe.title +
            recipe.ingredients
              .map((ingredient) => ingredient.ingredient)
              .join("") +
            recipe.keywords?.join("")
          : recipe.title + recipe.keywords?.join("");

      return {
        recipeWithTarget,
        keyword: joinedKeywordRecipes,
      };
    });

  return searchKeywordMap
    .filter(({ keyword }) => keyword.includes(q))
    .map(({ recipeWithTarget }) => {
      return { ...recipeWithTarget };
    }) satisfies RecipeWithTargetType[];
};
