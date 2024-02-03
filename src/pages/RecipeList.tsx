import { Center, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getAllRecipes } from "~/api/microCMS";
import { LoaderData } from "~/types";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const recipes = await getAllRecipes();

  return { recipes };
};

const RecipeList: FC = () => {
  const { recipes } = useLoaderData() as LoaderData<typeof loader>;

  return (
    <VStack alignItems="stretch" gap="24px" p="24px 16px">
      {recipes.map((recipe) => (
        <Center key={recipe.id} as={Link} to={`/${recipe.id}`}>
          {recipe.title}
        </Center>
      ))}
    </VStack>
  );
};

export default RecipeList;
