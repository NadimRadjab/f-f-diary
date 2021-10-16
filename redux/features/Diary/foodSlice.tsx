import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SPOO_API_KEY } from "@env";
import axios from "axios";
interface ApiResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}
interface FoodsData {
  products: { id: string }[];
}

interface FoodState {
  foods: { id: string }[] | undefined;
  isLoading: boolean;
}
export const getFoods = createAsyncThunk(
  "food/getFoods",
  async (product: string) => {
    const response: ApiResponse<FoodsData> = await axios.get(
      `https://api.spoonacular.com/food/products/search?query=${product}&number=2&addProductInformation=true&apiKey=${SPOO_API_KEY}`
    );
    return response.data?.products;
  }
);

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
        state.foods = action.payload;
        state.isLoading = false;
      });
  },
});

export default foodSlice.reducer;
