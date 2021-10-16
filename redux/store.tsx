import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "./features/Diary/diarySlice";
import foodSlice from "./features/Diary/foodSlice";

export const store = configureStore({
  reducer: {
    diary: diarySlice,
    foods: foodSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
