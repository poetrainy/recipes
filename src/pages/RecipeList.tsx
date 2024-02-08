import { ChangeEvent, FC, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { getAllOtherRecipes, getAllRecipes } from "~/api/recipe";
import HeadingSmall from "~/components/HeadingSmall";
import RecipeCard from "~/components/RecipeCard";
import { filteredRecipes } from "~/libs/filteredRecipes";
import { LoaderData } from "~/types";
import RecipeCardRegister from "~/components/RecipeCardRegister";
import {
  RecipeWithTargetType,
  RecipeOtherType,
  RecipeType,
} from "~/types/Recipe";
import RecipeCardOther from "~/components/RecipeCardOther";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const recipes = await getAllRecipes();
  const otherRecipes = await getAllOtherRecipes();

  const allRecipesWithTarget: RecipeWithTargetType[] = [
    ...recipes.map((recipe: RecipeType) => {
      return { recipe, target: "original" as const };
    }),
    ...otherRecipes.map((recipe: RecipeOtherType) => {
      return { recipe, target: "other" as const };
    }),
  ];

  return { allRecipesWithTarget };
};

const RecipeList: FC = () => {
  const { allRecipesWithTarget } = useLoaderData() as LoaderData<typeof loader>;

  const [keyword, setKeyword] = useState<string>("");
  const filtered = filteredRecipes(allRecipesWithTarget, keyword);

  const AllRecipes = () => (
    <>
      <HeadingSmall>{`すべてのレシピ：${allRecipesWithTarget.length}件`}</HeadingSmall>
      <VStack as="ul" alignItems="stretch" gap="12px">
        {allRecipesWithTarget.map(({ recipe, target }) => (
          <Box key={recipe.id} as="li">
            {target === "original" ? (
              <RecipeCard recipe={recipe} />
            ) : (
              <RecipeCardOther recipe={recipe} />
            )}
          </Box>
        ))}
        <RecipeCardRegister />
      </VStack>
    </>
  );

  return (
    <>
      <Input
        value={keyword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        placeholder="検索ワードを入力"
      />
      <VStack alignItems="stretch" gap="12px">
        {keyword.length ? (
          <>
            <HeadingSmall>{`${keyword}の検索結果`}</HeadingSmall>
            {filtered.length ? (
              <VStack as="ul" alignItems="stretch" gap="12px">
                {filtered.map(({ recipe, target }) => (
                  <Box key={recipe.id} as="li">
                    {target === "original" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <RecipeCardOther recipe={recipe} />
                    )}
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text as="span">レシピが見つかりません。</Text>
            )}
          </>
        ) : (
          <AllRecipes />
        )}
      </VStack>
    </>
  );
};

export default RecipeList;
