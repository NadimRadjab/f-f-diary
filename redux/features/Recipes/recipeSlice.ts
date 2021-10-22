import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SPOO_API_KEY } from "@env";
import axios from "axios";
import { Recipe } from "./type";
interface ApiResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data: T;
}
interface RecipesData {
  results: [];
}
export const getRecipes = createAsyncThunk(
  "recipe/getRecipes",
  async (items: { recipe: string; selected: [] }) => {
    const response: ApiResponse<RecipesData> = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${
        items.recipe
      }&diet=${items.selected
        .join("&")
        .toLowerCase()}&addRecipeNutrition=true&fillIngredients=true&addRecipeInformation=true&apiKey=${SPOO_API_KEY}`
    );
    return response.data.results;
  }
);
interface RecipesState {
  isLoading: boolean;
  recipes: Recipe[];
}
const initialState: RecipesState = {
  isLoading: false,
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
      });
  },
});
export default recipeSlice.reducer;
