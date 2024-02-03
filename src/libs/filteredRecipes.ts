import { RecipeType } from "~/types/Recipe";

export const filteredRecipes: (
  recipes: RecipeType[],
  q: string
) => RecipeType[] = (recipes: RecipeType[], q: string) => {
  const searchKeywordMap = recipes.map((recipe) => {
    const joinedKeyword: string =
      recipe.title +
      recipe.ingredients.map((ingredient) => ingredient.ingredient).join("") +
      recipe.keywords?.join("");

    return {
      recipe: recipe,
      keyword: joinedKeyword,
    };
  });

  return searchKeywordMap
    .filter(({ keyword }) => keyword.includes(q))
    .map(({ recipe }) => recipe);
};
