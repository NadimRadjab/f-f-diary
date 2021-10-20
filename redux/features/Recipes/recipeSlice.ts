import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SPOO_API_KEY } from "@env";
import axios from "axios";

export const getRecipes = createAsyncThunk(
  "recipe/getRecipes",
  async (items: []) => {
    // const response = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?query='pasta'&${items
    //     .join("&")
    //     .toLowerCase()}&apiKey=${SPOO_API_KEY}`
    // );
    // console.log(response.data);
  }
);
interface RecipesState {
  isLoading: boolean;
  recipes: {}[];
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
        state.recipes.push(action.payload);
      });
  },
});
export default recipeSlice.reducer;
