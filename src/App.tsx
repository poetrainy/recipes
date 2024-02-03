import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RecipeList, { loader as loaderRecipeList } from "~/pages/RecipeList";
import Recipe, { loader as loaderRecipe } from "~/pages/Recipe";
import NewRecipe, { action as actionRecipeRegister } from "~/pages/NewRecipe";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RecipeList />} loader={loaderRecipeList} />
        <Route path="/:id" element={<Recipe />} loader={loaderRecipe} />
        <Route
          path="/new"
          element={<NewRecipe />}
          action={actionRecipeRegister}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
