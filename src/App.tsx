import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RecipeList, { loader as loaderRecipeList } from "~/pages/RecipeList";
import Recipe, { loader as loaderRecipe } from "~/pages/Recipe";
import NewRecipe, { action as actionRecipeRegister } from "~/pages/NewRecipe";
import Root from "~/pages/Root";
import "~/style/index.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<RecipeList />} loader={loaderRecipeList} />
        <Route path="/recipes/:id" element={<Recipe />} loader={loaderRecipe} />
        <Route
          path="/recipes/new"
          element={<NewRecipe />}
          action={actionRecipeRegister}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
