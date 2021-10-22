import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import diarySlice from "./features/Diary/diarySlice";
import foodSlice from "./features/Diary/foodSlice";
import recipeSlice from "./features/Recipes/recipeSlice";
import weeklyPlansSlice from "./features/WeeklyPlans/weeklyPlansSlice";

export const store = configureStore({
  reducer: {
    diary: diarySlice,
    foods: foodSlice,
    recipes: recipeSlice,
    plans: weeklyPlansSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
