import { ChangeEvent, FC, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { getAllRecipes } from "~/api/recipe";
import HeadingSmall from "~/components/HeadingSmall";
import RecipeCard from "~/components/RecipeCard";
import { filteredRecipes } from "~/libs/filteredRecipes";
import { LoaderData } from "~/types";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const recipes = await getAllRecipes();

  return { recipes };
};

const RecipeList: FC = () => {
  const { recipes } = useLoaderData() as LoaderData<typeof loader>;

  const [keyword, setKeyword] = useState<string>("");
  const filtered = filteredRecipes(recipes, keyword);

  const AllRecipes = () => (
    <>
      <HeadingSmall>{`すべてのレシピ：${recipes.length}件`}</HeadingSmall>
      <VStack as="ul" alignItems="stretch">
        {recipes.map((recipe) => (
          <Box key={recipe.id} as="li">
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
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
              <VStack as="ul" alignItems="stretch">
                {filtered.map((recipe) => (
                  <Box key={recipe.id} as="li">
                    <RecipeCard recipe={recipe} />
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
