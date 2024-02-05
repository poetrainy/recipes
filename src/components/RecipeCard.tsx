import { FC } from "react";
import { Link } from "react-router-dom";
import { Center, Image } from "@chakra-ui/react";
import { RecipeType } from "~/types/Recipe";

const RecipeCard: FC<{ recipe: RecipeType }> = ({ recipe }) => (
  <Center
    as={Link}
    to={`/recipes/${recipe.id}`}
    justifyContent="flex-start"
    gap="8px"
    fontWeight="bold"
  >
    <Center boxSize="80px" bg="gray.200" rounded="8px" overflow="hidden">
      {recipe.image && (
        <Image src={recipe.image.url} w="100%" h="100%" objectFit="cover" />
      )}
    </Center>
    {recipe.title}
  </Center>
);

export default RecipeCard;
