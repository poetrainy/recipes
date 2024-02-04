import {
  Params,
  ActionFunctionArgs,
  useSubmit,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import { Button } from "@chakra-ui/react";
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
  // const navigate = useNavigate();
  const location = useLocation();
  // const toast = useToast();

  const { recipe } = useLoaderData() as LoaderData<typeof loader>;
  // const data = useActionData() as { status: 201 | 500 } | undefined;

  useSetOGPContext({
    title: "レシピの編集",
    path: `/recipes/${recipe.id}/edit`,
  });

  // const [prevActionData, setPrevActionData] = useState<{ status: 201 | 500 }>();

  // if (data?.status === 201 && !prevActionData) {
  //   toast({
  //     title: "レシピを編集しました（反映には数分かかります）",
  //     status: "success",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  //   setPrevActionData(data);

  //   navigate("/");
  // } else if (data?.status === 500 && !prevActionData) {
  //   toast({
  //     title: "レシピを編集できませんでした",
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  //   setPrevActionData(data);
  // }

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
    <RecipeForm
      recipe={recipe}
      onClick={(saveRecipe) => onSaveRecipe(saveRecipe)}
      optionalButton={
        <Button
          variant="ghost"
          colorScheme="red"
          h="24px"
          p="0"
          fontSize="14px"
          fontWeight="normal"
        >
          レシピを削除する
        </Button>
      }
    />
  );
};

export default EditRecipe;
