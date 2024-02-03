import { useState, ChangeEvent, FC } from "react";
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

type Props = {
  recipe?: RecipeType;
  onInvalid: (value: boolean) => void;
  onSave: (saveRecipe: RecipeSaveType) => void;
  actionCount: number;
};

const RecipeForm: FC<Props> = ({ recipe, onInvalid, onSave, actionCount }) => {
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

  const pageHeading = recipe ? "レシピの編集" : "レシピの登録";
  const [prevActionCount, setPrevActionCount] = useState<number>(0);

  if (prevActionCount !== actionCount) {
    setPrevActionCount(actionCount);

    const saveIngredients = ingredients.filter(
      ({ ingredient, quantity }) => !!ingredient.length && !!quantity.length
    );
    const saveIngredientsFormat: RecipeIngredientType[] = saveIngredients.map(
      ({ ingredient, quantity }, i) => {
        return {
          id: i + 1,
          ingredient,
          quantity,
        };
      }
    );
    const saveSteps = steps.filter((step) => !!step.length);
    const saveStepsFormat: RecipeStepType[] = saveSteps.map(
      (description, i) => {
        return { id: i + 1, description };
      }
    );

    if (!title || !saveSteps.length || !saveIngredients.length) {
      onInvalid(true);
    } else {
      const saveRecipeData: RecipeSaveType = {
        title,
        genre: [genre],
        ingredients: JSON.stringify(saveIngredientsFormat),
        steps: JSON.stringify(saveStepsFormat),
        ...(quantity && { quantity: quantity }),
        ...(keywords && { keywords: JSON.stringify(keywords?.split("、")) }),
      };

      onSave(saveRecipeData);
    }
  }

  return (
    <>
      <Heading as="h2" fontSize="20px">
        {pageHeading}
      </Heading>
      <VStack alignItems="stretch" gap="12px" p="0">
        <HeadingSmall>料理名</HeadingSmall>
        <Input
          value={title}
          placeholder="例：基本の鶏肉レンジ蒸し"
          onChange={(e) => {
            setTitle(e.target.value);
            onInvalid(false);
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
                onInvalid(false);
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
                onInvalid(false);
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
                onInvalid(false);
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
    </>
  );
};

export default RecipeForm;
