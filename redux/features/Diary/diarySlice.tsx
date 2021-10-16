import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Food from "../../../seeds/Food";
import Meal from "../../../seeds/Meal";
import Page from "../../../seeds/Page";

const mealCreator = (arr: {}[]) => {
  for (let i = 0; i < 6; i++) {
    arr.push({ ...new Meal("1", [], 0) });
  }
};

interface State {
  pages: {
    id: string;
    date: string;
    meals: {
      id: string;
      foods: {}[];
      calories: number;
    }[];
    totalcal: number;
  }[];
  isLoading: boolean;
}
const initialState: State = {
  pages: [
    {
      date: "2021-10-14T09:33:15.577Z",
      id: "1",
      meals: [
        {
          calories: 0,
          foods: [],
          id: "1",
        },
        {
          calories: 0,
          foods: [],
          id: "2",
        },
        {
          calories: 0,
          foods: [],
          id: "3",
        },
        {
          calories: 0,
          foods: [],
          id: "4",
        },
        {
          calories: 0,
          foods: [],
          id: "5",
        },
        {
          calories: 0,
          foods: [],
          id: "6",
        },
      ],
      totalcal: 0,
    },
    {
      date: "2021-10-14T09:33:15.577Z",
      id: "2",
      meals: [
        {
          calories: 0,
          foods: [],
          id: "1",
        },
        {
          calories: 400,
          foods: [],
          id: "2",
        },
        {
          calories: 79,
          foods: [],
          id: "3",
        },
        {
          calories: 34,
          foods: [],
          id: "4",
        },
        {
          calories: 250,
          foods: [],
          id: "5",
        },
        {
          calories: 0,
          foods: [],
          id: "6",
        },
      ],
      totalcal: 0,
    },
  ],
  isLoading: false,
};
export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addList: (state: State) => {
      const newPage = new Page("1", new Date().toISOString(), [], 0);
      mealCreator(newPage.meals);

      state.pages.push({ ...newPage });
    },
    addFood: (state: State) => {
      const newFood = new Food("1", "Eggs", "White Egss", 432);
      state.pages.map((page: { id: string; meals: { foods: {}[] }[] }) => {
        if (page.id === "1") {
          const meals = page?.meals.find((meal: any) => meal.id === "1");
          return meals?.foods.push({ ...newFood });
        }
        return page;
      });
    },
    getPageCalories: (state: State) => {
      state.pages.map(
        (page: {
          id: string;
          totalcal: number;
          meals: { calories: number; foods: {}[] }[];
        }) => {
          if (page.id === "2") {
            page.totalcal = page.meals?.reduce((prev: any, cur) => {
              return prev + cur.calories;
            }, 0);
          }
          return page;
        }
      );
    },
  },
});
export const { addList, addFood, getPageCalories } = diarySlice.actions;
export default diarySlice.reducer;
