import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SPOO_API_KEY } from "@env";
import axios from "axios";

export const getFoods = createAsyncThunk(
  "food/getFoods",
  async (product: string) => {
    const response = await axios.get(
      `https://api.spoonacular.com/food/products/search?query=${product}&number=5&addProductInformation=true&apiKey=${SPOO_API_KEY}`
    );
    return response.data;
  }
);

interface FoodState {
  foods: any[];
  isLoading: boolean;
}

const initialState: FoodState = {
  foods: [],
  isLoading: false,
};

export const foodSlice = createSlice({
  name: "searchFood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.foods.push(action.payload);
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export default foodSlice.reducer;
