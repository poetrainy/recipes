import { FC } from "react";
import { Link } from "react-router-dom";
import { Center, Text } from "@chakra-ui/react";

const RecipeCardRegister: FC = () => (
  <Center
    as={Link}
    to="/recipes/new"
    justifyContent="flex-start"
    gap="8px"
    fontWeight="bold"
    _hover={{
      textDecor: "underline",
    }}
  >
    <Center
      bg="gray.200"
      boxSize="80px"
      rounded="8px"
      pos="relative"
      sx={{
        "&::before": {
          content: "''",
          display: "block",
          w: "4px",
          h: "24px",
          bg: "gray.400",
          rounded: "full",
          pos: "absolute",
          inset: "0",
          m: "auto",
        },
        "&::after": {
          content: "''",
          display: "block",
          w: "24px",
          h: "4px",
          bg: "gray.400",
          rounded: "full",
          pos: "absolute",
          inset: "0",
          m: "auto",
        },
      }}
    />
    <Text as="span" color="gray.600">
      レシピを登録する
    </Text>
  </Center>
);

export default RecipeCardRegister;
