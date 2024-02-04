import { useState } from "react";
import {
  Params,
  ActionFunctionArgs,
  useSubmit,
  useNavigate,
  useLocation,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { useToast, VStack, Button } from "@chakra-ui/react";
import { getRecipe, updateRecipe } from "~/api/recipe";
import RecipeForm from "~/components/RecipeForm";
import { RecipeSaveType } from "~/types/Recipe";
import { LoaderData } from "~/types";
import { useSetOGPContext } from "~/context/useOGPContext";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: { params: Params<string> }) => {
  const recipe = await getRecipe(params.id!);

  return { recipe };
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const recipeId = params.id!;

  try {
    await updateRecipe(recipeId, JSON.parse(content) as RecipeSaveType);

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

const EditRecipe = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const { recipe } = useLoaderData() as LoaderData<typeof loader>;
  const data = useActionData() as { status: 201 | 500 } | undefined;

  useSetOGPContext({
    title: "レシピの編集",
    path: `/recipes/${recipe.id}/edit`,
  });

  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [prevActionData, setPrevActionData] = useState<{ status: 201 | 500 }>();
  const [actionCount, setActionCount] = useState<number>(0);

  if (data?.status === 201 && !prevActionData) {
    toast({
      title: "レシピを編集しました（反映には数分かかります）",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setPrevActionData(data);

    navigate("/");
  } else if (data?.status === 500 && !prevActionData) {
    toast({
      title: "レシピを編集できませんでした",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setPrevActionData(data);
  }

  const onSaveRecipe = (saveRecipe: RecipeSaveType) => {
    submit(
      {
        intent: "edit",
        content: JSON.stringify(saveRecipe),
      },
      {
        method: "POST",
        action: location.pathname,
      }
    );
  };

  return (
    <>
      <RecipeForm
        recipe={recipe}
        onInvalid={(value) => setIsInvalid(value)}
        onSave={(saveRecipe) => onSaveRecipe(saveRecipe)}
        actionCount={actionCount}
      />
      <VStack alignItems="stretch" p="0">
        {isInvalid && (
          <Text as="span" color="red.500">
            入力内容に不備があります。
          </Text>
        )}
        <Button onClick={() => setActionCount((p) => p + 1)} fontSize="14px">
          この内容で編集する
        </Button>
      </VStack>
    </>
  );
};

export default EditRecipe;
