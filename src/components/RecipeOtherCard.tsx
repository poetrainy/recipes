import { FC } from "react";
import { Center, Image, Link } from "@chakra-ui/react";
import { RecipeOtherType } from "~/types/Recipe";

const RecipeOtherCard: FC<{ recipe: RecipeOtherType }> = ({ recipe }) => (
  <Center
    as={Link}
    href={recipe.url}
    target="_blank"
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

export default RecipeOtherCard;
