import { useState, ChangeEvent, FC, ReactNode } from "react";
import {
  Heading,
  VStack,
  Input,
  Select,
  Flex,
  Button,
  Textarea,
  Text,
} from "@chakra-ui/react";
import HeadingSmall from "~/components/HeadingSmall";
import {
  RecipeGenreType,
  RecipeIngredientType,
  RecipeSaveType,
  RecipeStepType,
  RecipeType,
} from "~/types/Recipe";
import { useSubmittingStatus } from "~/hooks/useSubmittingStatus";

type Props = {
  recipe?: RecipeType;
  onClick: (saveRecipe: RecipeSaveType) => void;
  optionalButton?: ReactNode;
};

const RecipeForm: FC<Props> = ({
  recipe,

  onClick,
  optionalButton,
}) => {
  const { isLoadingOrIsSubmitting } = useSubmittingStatus();
  const isEditMode = !!recipe;
  const pageAndButtonActionLabel = isEditMode ? "編集" : "登録";

  const [title, setTitle] = useState<string>(recipe?.title ?? "");
  const [genre, setGenre] = useState<RecipeGenreType>(
    recipe?.genre[0] ?? "ごはん"
  );
  const [quantity, setQuantity] = useState<string | null>(
    recipe?.quantity ?? null
  );
  const [ingredients, setIngredients] = useState<
    Omit<RecipeIngredientType, "id">[]
  >(
    recipe?.ingredients.map((ingredient) => {
      return {
        ingredient: ingredient.ingredient,
        quantity: ingredient.quantity,
      };
    }) ?? [
      {
        ingredient: "",
        quantity: "",
      },
    ]
  );
  const [steps, setSteps] = useState<string[]>(
    recipe?.steps.map(({ description }) => description) ?? [""]
  );
  const [keywords, setKeywords] = useState<string>(
    recipe?.keywords?.join("、") ?? ""
  );

  const saveIngredients = ingredients.filter(
    ({ ingredient, quantity }) => !!ingredient.length && !!quantity.length
  );
  const saveSteps = steps.filter((step) => !!step.length);

  const isDisabled = !title || !saveIngredients.length || !saveSteps.length;

  const onSaveRecipe = () => {
    if (isDisabled) {
      return;
    }

    const saveIngredientsFormat: RecipeIngredientType[] = saveIngredients.map(
      ({ ingredient, quantity }, i) => {
        return {
          id: i + 1,
          ingredient,
          quantity,
        };
      }
    );
    const saveStepsFormat: RecipeStepType[] = saveSteps.map(
      (description, i) => {
        return { id: i + 1, description };
      }
    );

    const saveRecipeData: RecipeSaveType = {
      title,
      genre: [genre],
      ingredients: JSON.stringify(saveIngredientsFormat),
      steps: JSON.stringify(saveStepsFormat),
      ...(quantity && { quantity: quantity }),
      ...(keywords && { keywords: JSON.stringify(keywords?.split("、")) }),
    };

    onClick(saveRecipeData);
  };

  return (
    <>
      <VStack gap="24px" alignItems="stretch" p="0">
        <Heading as="h2" fontSize="20px">
          {`レシピの${pageAndButtonActionLabel}`}
        </Heading>
        <VStack alignItems="stretch" gap="12px" p="0">
          <HeadingSmall>料理名</HeadingSmall>
          <Input
            value={title}
            placeholder="例：基本の鶏肉レンジ蒸し"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </VStack>
        <VStack alignItems="stretch" gap="12px" p="0">
          <HeadingSmall>ジャンル</HeadingSmall>
          <Select onChange={(e) => setGenre(e.target.value as RecipeGenreType)}>
            <option value="ごはん">ごはん</option>
            <option value="おやつ">おやつ</option>
          </Select>
        </VStack>
        <VStack alignItems="stretch" gap="12px" p="0">
          <HeadingSmall>できる量</HeadingSmall>
          <Input
            value={quantity ?? ""}
            placeholder="例：1人前"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </VStack>
        <VStack alignItems="stretch" gap="12px" p="0">
          <HeadingSmall>材料</HeadingSmall>
          {ingredients.map((ingredient, i) => (
            <Flex key={i} gap="8px">
              <Input
                value={ingredient.ingredient}
                placeholder="例：鶏むね肉"
                onChange={(e) => {
                  setIngredients((p) =>
                    p.map((prevItem, prevIndex) => {
                      return {
                        ...prevItem,
                        ...(i === prevIndex && {
                          ingredient: e.target.value,
                        }),
                      };
                    })
                  );
                }}
              />
              <Input
                value={ingredient.quantity}
                placeholder="例：1枚"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setIngredients((p) =>
                    p.map((prevItem, prevIndex) => {
                      return {
                        ...prevItem,
                        ...(i === prevIndex && {
                          quantity: e.target.value,
                        }),
                      };
                    })
                  );
                }}
              />
            </Flex>
          ))}
          <Button
            type="button"
            onClick={() =>
              setIngredients((p) => [
                ...p,
                {
                  ingredient: "",
                  quantity: "",
                },
              ])
            }
            w="fit-content"
            fontSize="12px"
          >
            材料を追加
          </Button>
        </VStack>
        <VStack alignItems="stretch" gap="12px" p="0">
          <HeadingSmall>手順</HeadingSmall>
          {steps.map((step, i) => (
            <Flex key={i} gap="8px">
              <Text as="span" color="gray.500" fontWeight="bold" mt="10px">
                {i + 1}.
              </Text>
              <Textarea
                value={step}
                placeholder="例：フォークを使って鶏もも肉にところどころ穴を開け、酒をすり込む。"
                onChange={(e) => {
                  setSteps((p) =>
                    p.map((prevItem, prevIndex) =>
                      i === prevIndex ? e.target.value : prevItem
                    )
                  );
                }}
              />
            </Flex>
          ))}
          <Button
            type="button"
            onClick={() => setSteps((p) => [...p, ""])}
            w="fit-content"
            fontSize="12px"
          >
            手順を追加
          </Button>
        </VStack>
        <VStack alignItems="stretch" gap="12px" p="0">
          <HeadingSmall>検索キーワード</HeadingSmall>
          <Input
            value={keywords}
            placeholder="例：簡単、時短"
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Text as="span" color="gray.600" fontSize="12px">
            読点（、）区切りで複数登録できます
          </Text>
        </VStack>
        <VStack alignItems="stretch" p="0">
          <Button
            isLoading={isLoadingOrIsSubmitting}
            isDisabled={isLoadingOrIsSubmitting || isDisabled}
            onClick={() => onSaveRecipe()}
            loadingText={`この内容で${pageAndButtonActionLabel}する`}
            fontSize="14px"
          >
            {`この内容で${pageAndButtonActionLabel}する`}
          </Button>
          {optionalButton}
        </VStack>
      </VStack>
    </>
  );
};

export default RecipeForm;
