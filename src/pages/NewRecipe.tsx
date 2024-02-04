import { FC } from "react";
import {
  ActionFunctionArgs,
  redirect,
  useLocation,
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

    return redirect("/");
  } catch (e) {
    console.error(e);

    return {
      status: 500,
    };
  }
};

const NewRecipe: FC = () => {
  const submit = useSubmit();
  const location = useLocation();

  useSetOGPContext({ title: "レシピを登録", path: "/recipes/new" });

  // const data = useActionData() as { status: 201 | 500 } | undefined;

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

  return <RecipeForm onClick={(saveRecipe) => onSaveRecipe(saveRecipe)} />;
};

export default NewRecipe;
