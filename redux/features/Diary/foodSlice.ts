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
  scannedFood: {
    product_name?: string;
    image_front_url?: string;
    ingredients_text?: string;
    nutriments?: {
      [energy: string]: string;
      ["fat"]: string;
      ["carbohydrates"]: string;
      ["fibers"]: string;
      ["proteins"]: string;
      ["salt"]: string;
      ["sodium"]: string;
    };
  };
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

export const getScannedFood = createAsyncThunk(
  "food/getScannedFood",
  async (barcode: string | undefined) => {
    const response: any = await axios.get(
      ` https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    return response.data.product;
  }
);

const initialState: FoodState = {
  foods: [],
  scannedFood: {},
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
      })
      .addCase(getScannedFood.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getScannedFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scannedFood = action.payload;
      });
  },
});

export default foodSlice.reducer;
