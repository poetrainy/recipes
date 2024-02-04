import { Button, Text, VStack, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  ActionFunctionArgs,
  useActionData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { saveRecipe } from "~/api/recipe";
import RecipeForm from "~/components/RecipeForm";
import { useSetOGPContext } from "~/context/useOGPContext";
import { RecipeSaveType } from "~/types/Recipe";

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

  useSetOGPContext({ title: "レシピを登録", path: "/recipes/new" });

  const data = useActionData() as { status: 201 | 500 } | undefined;

  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [prevActionData, setPrevActionData] = useState<{ status: 201 | 500 }>();
  const [actionCount, setActionCount] = useState<number>(0);

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

  const onSaveRecipe = (saveRecipe: RecipeSaveType) => {
    submit(
      {
        intent: "save",
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
          この内容で登録する
        </Button>
      </VStack>
    </>
  );
};

export default NewRecipe;
