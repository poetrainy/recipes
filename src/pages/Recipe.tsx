import { Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { getRecipe } from "~/api/microCMS";
import Layout from "~/components/Layout";
import { LoaderData } from "~/types";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: { params: Params<string> }) => {
  const recipe = await getRecipe(params.id!);

  return { recipe };
};

const Recipe: FC = () => {
  const { recipe } = useLoaderData() as LoaderData<typeof loader>;

  return (
    <Layout>
      <Heading as="h2" fontWeight="bold" fontSize="20px">
        {recipe.title}
      </Heading>
      <VStack alignItems="stretch" gap="0" bg="gray.50" rounded="12px">
        <Center
          as="h3"
          display="block"
          color="gray.700"
          w="full"
          bg="gray.100"
          fontWeight="bold"
          fontSize="12px"
          p="6px 16px"
          rounded="12px 12px 0 0"
        >
          材料
        </Center>
        <VStack as="ul" alignItems="stretch" gap="8px" p="12px 16px">
          {recipe.ingredients.map((ingredient) => (
            <Flex key={ingredient.id} as="li" justifyContent="space-between">
              <Text as="span" fontWeight="bold">
                {ingredient.ingredient}
              </Text>
              <Text as="span">{ingredient.quantity}</Text>
            </Flex>
          ))}
        </VStack>
      </VStack>
      <VStack alignItems="stretch" gap="12px">
        <Heading as="h3" color="gray.600" fontWeight="bold" fontSize="14px">
          手順
        </Heading>
        <VStack as="ol" alignItems="stretch">
          {recipe.steps.map((step) => (
            <Flex key={step.id} as="li" gap="4px">
              <Text as="span" color="gray.500" fontWeight="bold">
                {step.id}.
              </Text>
              <Text key={step.id}>{step.description}</Text>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Recipe;
