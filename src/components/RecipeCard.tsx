import { FC } from "react";
import { Center, Image, Text } from "@chakra-ui/react";
import { RecipeType } from "~/types/Recipe";
import { Link } from "react-router-dom";

const RecipeCard: FC<{ recipe: RecipeType }> = ({ recipe }) => (
  <Center
    as={Link}
    to={`/recipes/${recipe.id}`}
    justifyContent="flex-start"
    gap="12px"
    fontWeight="bold"
    _hover={{
      textDecor: "underline",
    }}
  >
    <Center boxSize="80px" bg="gray.200" rounded="8px" overflow="hidden">
      {recipe.image && (
        <Image src={recipe.image.url} w="100%" h="100%" objectFit="cover" />
      )}
    </Center>
    <Text as="span">{recipe.title}</Text>
  </Center>
);

export default RecipeCard;
