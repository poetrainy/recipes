import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import {
  ActionFunctionArgs,
  useActionData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { saveRecipe } from "~/api/recipe";
import HeadingSmall from "~/components/HeadingSmall";
import Layout from "~/components/Layout";
import {
  RecipeGenreType,
  RecipeIngredientType,
  RecipeSaveType,
} from "~/types/Recipe";

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const content = formData.get("content") as string;

  try {
    await saveRecipe(JSON.parse(content) as RecipeSaveType);

    return {
      status: 201,
    };
  } catch (e) {
    console.error(e);

    return {
      status: 500,
    };
  }
};

const NewRecipe: FC = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  // const { status } = useActionData() as { status: 201 | 500 };
  const data = useActionData() as { status: 201 | 500 } | undefined;
  // const data = useActionData() as ActionData;

  console.log(data?.status);

  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<RecipeGenreType>("ごはん");
  const [quantity, setQuantity] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<
    Omit<RecipeIngredientType, "id">[]
  >([
    {
      ingredient: "",
      quantity: "",
    },
  ]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [keywords, setKeywords] = useState<string>("");

  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [prevActionData, setPrevActionData] = useState<{ status: 201 | 500 }>();

  if (data?.status === 201 && !prevActionData) {
    toast({
      title: "レシピを登録しました（反映には数分かかります）",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setPrevActionData(data);

    navigate("/");
  } else if (data?.status === 500 && !prevActionData) {
    toast({
      title: "レシピを登録できませんでした",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setPrevActionData(data);
  }

  const onSaveRecipe = () => {
    const saveIngredients = ingredients.filter(
      ({ ingredient, quantity }) => !!ingredient.length && !!quantity.length
    );
    const saveSteps = steps.filter((step) => !!step.length);

    if (!title || !saveSteps.length || !saveIngredients.length) {
      return setIsInvalid(true);
    }

    const saveRecipeData: RecipeSaveType = {
      title,
      genre: [genre],
      ingredients: JSON.stringify(saveIngredients),
      steps: JSON.stringify(saveSteps),
      ...(quantity && { quantity: quantity }),
      ...(keywords && { keywords: JSON.stringify(keywords?.split("、")) }),
    };

    submit(
      {
        intent: "save",
        content: JSON.stringify(saveRecipeData),
      },
      {
        method: "POST",
        action: location.pathname,
      }
    );
  };

  return (
    <Layout>
      <Heading as="h2" fontSize="20px">
        新規レシピ
      </Heading>
      <VStack alignItems="stretch" gap="12px" p="0">
        <HeadingSmall>料理名</HeadingSmall>
        <Input
          value={title}
          placeholder="例：基本の鶏肉レンジ蒸し"
          onChange={(e) => {
            setTitle(e.target.value);
            setIsInvalid(false);
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
                setIsInvalid(false);
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
                setIsInvalid(false);
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
                setIsInvalid(false);
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
        {isInvalid && (
          <Text as="span" color="red.500">
            入力内容に不備があります。
          </Text>
        )}
        <Button onClick={() => onSaveRecipe()} fontSize="14px">
          この内容で登録する
        </Button>
      </VStack>
    </Layout>
  );
};

export default NewRecipe;
