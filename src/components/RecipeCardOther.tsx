import { FC } from "react";
import { Center, Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { RecipeOtherType } from "~/types/Recipe";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

const RecipeCardOther: FC<{ recipe: RecipeOtherType }> = ({ recipe }) => (
  <Center
    as={Link}
    href={recipe.url}
    target="_blank"
    justifyContent="flex-start"
    gap="12px"
    fontWeight="bold"
  >
    <Center boxSize="80px" bg="gray.200" rounded="8px" overflow="hidden">
      {recipe.image && (
        <Image src={recipe.image.url} w="100%" h="100%" objectFit="cover" />
      )}
    </Center>
    <Flex alignItems="center" gap="4px">
      <Text as="span">{recipe.title}</Text>
      <Icon as={LaunchRoundedIcon} boxSize="20px" color="gray.600" />
    </Flex>
  </Center>
);

export default RecipeCardOther;
