import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Meal from "../../../seeds/Meal";
import Page from "../../../seeds/Page";

const mealCreator = (arr: {}[]) => {
  for (let i = 0; i < 6; i++) {
    arr.push({ ...new Meal("1", [], 249) });
  }
};

interface State {
  diary: {
    id: string;
    date: string;
    meals: {}[];
    totalcal: number;
  }[];
  isLoading: boolean;
}
const initialState: State = {
  diary: [
    {
      date: "2021-10-14T09:33:15.577Z",
      id: "1",
      meals: [
        {
          calories: 249,
          foods: [],
          id: "1",
        },
        {
          calories: 249,
          foods: [],
          id: "2",
        },
        {
          calories: 249,
          foods: [],
          id: "3",
        },
        {
          calories: 249,
          foods: [],
          id: "4",
        },
        {
          calories: 249,
          foods: [],
          id: "5",
        },
        {
          calories: 249,
          foods: [],
          id: "6",
        },
      ],
      totalcal: 200,
    },
    {
      date: "2021-10-14T09:33:15.577Z",
      id: "1",
      meals: [
        {
          calories: 249,
          foods: [],
          id: "7",
        },
        {
          calories: 249,
          foods: [],
          id: "2",
        },
        {
          calories: 249,
          foods: [],
          id: "3",
        },
        {
          calories: 249,
          foods: [],
          id: "4",
        },
        {
          calories: 249,
          foods: [],
          id: "5",
        },
        {
          calories: 249,
          foods: [],
          id: "6",
        },
      ],
      totalcal: 200,
    },
  ],
  isLoading: false,
};
export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addList: (state) => {
      let test: [] = [];
      const newPage = new Page("1", new Date().toISOString(), [], 200);
      mealCreator(newPage.meals);
      state.diary.push({ ...newPage });
    },
    addFood: (state) => {
      //   const diary = state.diary.find((page: { id: string }) => page.id === "1");
      //   console.log(diary);
    },
  },
});
export const { addList, addFood } = diarySlice.actions;
export default diarySlice.reducer;
