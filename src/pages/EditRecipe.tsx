import {
  Params,
  ActionFunctionArgs,
  useSubmit,
  useLocation,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import { deleteRecipe, getRecipe, updateRecipe } from "~/api/recipe";
import RecipeForm from "~/components/RecipeForm";
import { RecipeSaveType } from "~/types/Recipe";
import { LoaderData } from "~/types";
import { useSetOGPContext } from "~/context/useOGPContext";
import RecipeDeleteModal from "~/components/RecipeDeleteModal";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: { params: Params<string> }) => {
  const recipe = await getRecipe(params.id!);

  return { recipe };
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;
  const recipeId = params.id!;

  switch (intent) {
    case "update":
      try {
        const content = formData.get("content") as string;
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

    case "delete":
      try {
        const contentId = formData.get("contentId") as string;
        await deleteRecipe(contentId);

        return redirect("/");
      } catch (e) {
        console.error(e);

        return {
          status: 500,
        };
      }
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

  const {
    isOpen: isOpenRecipeDeleteModal,
    onOpen: onOpenRecipeDeleteModal,
    onClose: onCloseRecipeDeleteModal,
  } = useDisclosure();

  const onUpdateRecipe = (updateRecipe: RecipeSaveType) => {
    submit(
      {
        intent: "update",
        content: JSON.stringify(updateRecipe),
      },
      {
        method: "POST",
        action: location.pathname,
      }
    );
  };

  const onDeleteRecipe = () => {
    submit(
      {
        intent: "delete",
        contentId: recipe.id,
      },
      {
        method: "DELETE",
        action: location.pathname,
      }
    );
  };

  return (
    <>
      <RecipeForm
        recipe={recipe}
        onClick={(updateRecipe) => onUpdateRecipe(updateRecipe)}
        optionalButton={
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={onOpenRecipeDeleteModal}
            h="24px"
            p="0"
            fontSize="14px"
            fontWeight="normal"
          >
            レシピを削除する
          </Button>
        }
      />
      <RecipeDeleteModal
        isOpen={isOpenRecipeDeleteModal}
        onClose={onCloseRecipeDeleteModal}
        onDelete={() => onDeleteRecipe()}
      />
    </>
  );
};

export default EditRecipe;
