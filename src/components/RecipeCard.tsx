import { FC } from "react";
import { Link } from "react-router-dom";
import { Center, Image } from "@chakra-ui/react";
import { RecipeType } from "~/types/MicroCMS";

const RecipeCard: FC<{ recipe: RecipeType }> = ({ recipe }) => (
  <Center
    as={Link}
    to={`/${recipe.id}`}
    justifyContent="flex-start"
    gap="8px"
    fontSize="16px"
    fontWeight="bold"
  >
    {recipe.image && (
      <Image src={recipe.image.url} w="80px" h="80px" rounded="8px" />
    )}
    {recipe.title}
  </Center>
);

export default RecipeCard;
