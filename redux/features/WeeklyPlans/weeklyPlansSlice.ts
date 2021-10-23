import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SPOO_API_KEY } from "@env";
import axios from "axios";
import { PlanMeal, PlanNutrients } from "./types";
interface ApiResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data: T;
}
interface RecipesData {
  week: any;
}

interface RecipesState {
  isLoading: boolean;
  plans: {
    day: string;
    meals: PlanMeal[];
    nutrients: PlanNutrients;
  }[];
}
export const getPlan = createAsyncThunk(
  "plan/getPlan",
  async (items: { calories: string; selected: [] }) => {
    const response: ApiResponse<RecipesData> = await axios.get(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${
        items.calories
      }&diet=${items.selected.join("&").toLowerCase()}&apiKey=${SPOO_API_KEY}`
    );
    const newObj: any = {};
    for (let key in response.data.week) {
      newObj[key] = response.data.week[key];
      newObj[key]["day"] = key;
    }

    const newArr: {
      day: string;
      meals: PlanMeal[];
      nutrients: PlanNutrients;
    }[] = Object.values(newObj);
    return newArr;
  }
);

const initialState: RecipesState = {
  isLoading: false,
  plans: [],
};

const weeklyPlanSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
      });
  },
});
export default weeklyPlanSlice.reducer;
