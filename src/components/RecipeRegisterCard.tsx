import { FC } from "react";
import { Link } from "react-router-dom";
import { Center, Text } from "@chakra-ui/react";

const RecipeRegisterCard: FC = () => (
  <Center
    as={Link}
    to="/recipes/new"
    justifyContent="flex-start"
    gap="8px"
    fontSize="16px"
    fontWeight="bold"
  >
    <Center bg="gray.200" boxSize="80px" rounded="8px" />
    <Text as="span">レシピを登録する</Text>
  </Center>
);

export default RecipeRegisterCard;
