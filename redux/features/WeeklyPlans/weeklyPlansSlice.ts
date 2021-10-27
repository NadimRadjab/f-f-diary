import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SPOO_API_KEY } from "@env";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { PlanMeal, PlanNutrients, WeeklyPlan } from "./types";
interface ApiResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data: T;
}
interface RecipesData {
  week: any;
}

interface WeeklyPlanState {
  isLoading: boolean;
  id: string;
  plans: WeeklyPlan[];
  date: Date | string;
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

const initialState: WeeklyPlanState = {
  isLoading: false,
  id: "",
  date: "",
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
        state.id = uuidv4();
        state.date = new Date();
        state.plans = action.payload;
      });
  },
});
export default weeklyPlanSlice.reducer;
