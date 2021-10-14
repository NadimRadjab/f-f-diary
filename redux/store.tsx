import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "./features/Diary/diarySlice";

export const store = configureStore({
  reducer: {
    diary: diarySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
