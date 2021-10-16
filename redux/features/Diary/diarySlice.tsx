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
          foods: [
            {
              title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
              servingsSize: 50,
              servingsNumber: 8,
              calories: 113,
            },
            {
              title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
              servingsSize: 50,
              servingsNumber: 8,
              calories: 53,
            },
            {
              title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
              servingsSize: 50,
              servingsNumber: 8,
              calories: 23,
            },
          ],
          id: "1",
        },
        {
          calories: 0,
          foods: [
            {
              title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
              servingsSize: 20,
              servingsNumber: 8,
              calories: 23,
            },
          ],
          id: "2",
        },
        {
          calories: 0,
          foods: [
            {
              title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
              servingsSize: 80,
              servingsNumber: 8,
              calories: 23,
            },
            {
              title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
              servingsSize: 80,
              servingsNumber: 8,
              calories: 883,
            },
          ],
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
    addFood: (state: State, action) => {
      // const newFood = new Food("1", "Eggs", "White Egss", 432);
      state.pages.map((page: { id: string; meals: { foods: {}[] }[] }) => {
        if (page.id === "1") {
          const meals = page?.meals.find((meal: any) => meal.id === "1");
          return meals?.foods.push(action.payload);
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
          if (page.id === "1") {
            page.totalcal = page.meals?.reduce((prev: any, cur) => {
              return prev + cur.calories;
            }, 0);
          }
          return page;
        }
      );
    },
    getMealCalories: (state: State) => {
      state.pages.map(
        (page: {
          id: string;
          totalcal: number;
          meals: { calories: number; foods: {}[] }[];
        }) => {
          if (page.id === "1") {
            const foodArr = page.meals.map((meal: any) => {
              return meal.foods.reduce((prev: any, cur: any) => {
                return prev + cur.calories;
              }, 0);
            });

            for (let i = 0; i < foodArr.length; i++) {
              page.meals[i].calories = foodArr[i];
            }
          }

          return page;
        }
      );
    },
  },
});
export const { addList, addFood, getPageCalories, getMealCalories } =
  diarySlice.actions;
export default diarySlice.reducer;
