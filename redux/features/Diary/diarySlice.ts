import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore, firestoreFunc } from "../../../firebase";
import { mealCreator } from "../../../helpers/helpers";
import { Meal, DiaryState, Food, Page } from "./types";

export const getOwnerDiary = createAsyncThunk(
  "diary/getOwnerDiary",
  async (ownerId: string) => {
    let ownersIds = [] as any;
    let ownerDiary = {
      id: "",
      date: "",
      ownerId: "",
      pages: [] as any,
      meals: [] as any,
    };
    const diary = await firestore.collection("diaries").get();

    const data = diary.docs.forEach((doc) =>
      ownersIds.push(doc.data().ownerId)
    );

    if (ownersIds.includes(ownerId)) {
      diary.docs.forEach((doc) => {
        if (doc.data().ownerId === ownerId) {
          ownerDiary.id = doc.id;
          ownerDiary.date = doc.data().date;
          ownerDiary.ownerId = doc.data()?.ownerId;
          ownerDiary.pages = doc.data()?.pages;
          ownerDiary.meals = doc.data()?.meals;
        }
      });
    } else {
      let arr = [] as any;
      mealCreator(arr, "0");
      const res = await firestore.collection("diaries").add({
        ownerId: "u1",
        date: new Date().toISOString(),
        pages: [
          {
            id: "0",
            date: new Date().toISOString(),
            ownerId: "1",
            meals: [],
          },
        ],
        meals: arr,
      });

      await res.get().then((doc) => {
        ownerDiary.id = doc.id;
        ownerDiary.date = doc.data()?.data;
        ownerDiary.ownerId = doc.data()?.ownerId;
        ownerDiary.pages = doc.data()?.pages;
        ownerDiary.meals = doc.data()?.meals;
      });
    }
    ownerDiary.pages.map((page: { id: string; meals: {}[] }) => {
      for (let meal of ownerDiary.meals) {
        if (meal.inPage === page.id) {
          page.meals.push(meal);
        }
      }
    });
    return ownerDiary;
  }
);
//Make a new Page
export const createNewPage = createAsyncThunk(
  "page/createNewPage",
  async (items: {
    diaryId: string;
    newPage: {
      id: string;
      date: string;
      meals: {}[];
      totalcal: number;
    };
    newArr: {}[];
  }) => {
    await firestore
      .collection("diaries")
      .doc(items.diaryId)
      .update({
        pages: firestoreFunc.FieldValue.arrayUnion(items.newPage),
        meals: firestoreFunc.FieldValue.arrayUnion(...items.newArr),
      });
    items.newPage.meals = items.newArr;
    return items.newPage;
  }
);

//Add a new Food.
export const addNewFood = createAsyncThunk(
  "food/addNewFood",
  async (items: {
    diaryId: string;
    mealId: string;
    newFood: {
      id: string;
      title: string;
      badges: [];
      servingsSize: number;
      servingsNumber: number;
      description: string;
      images: [];
      calories: number;
    };
    food: any;
  }) => {
    let newArr = [] as any;
    const data = await firestore.collection("diaries").get();
    data.forEach((doc) => {
      newArr = doc.data().meals.map((meal: Meal) => {
        if (meal.id === items.mealId) {
          meal.foods.push(items.food);
          return meal;
        }
        return meal;
      });
    });
    await firestore
      .collection("diaries")
      .doc(items.diaryId)
      .update({ meals: newArr });

    return {
      mealId: items.mealId,
      id: items.newFood.id,
      title: items.newFood.title,
      servingsSize: items.newFood.servingsSize,
      servingsNumber: items.newFood.servingsNumber,
      calories: items.newFood.calories,
    };
  }
);

//Remove Food
export const deleteFood = createAsyncThunk(
  "food/deleteFood",
  async (items: {
    pageId: string | null;
    diaryId: string;
    mealId: string;
    foodId: string;
  }) => {
    let newArr = [] as any;
    const data = await firestore.collection("diaries").get();
    data.forEach((doc) => {
      newArr = doc.data().meals.map((meal: Meal) => {
        if (meal.id === items.mealId) {
          meal.foods = meal.foods.filter(
            (food: any) => food.id !== items.foodId
          );
          return meal;
        }
        return meal;
      });
    });

    await firestore
      .collection("diaries")
      .doc(items.diaryId)
      .update({ meals: newArr });

    return {
      mealId: items.mealId,
      pageId: items.pageId,
      foodId: items.foodId,
    };
  }
);

const initialState: DiaryState = {
  ownerId: "u1",
  id: "",
  pages: [],
  isLoading: false,
};
export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    getPageCalories: (state, action) => {
      state.pages.map((page: Page) => {
        if (page.id === action.payload) {
          page.totalcal = page.meals.reduce((prev: any, cur) => {
            return prev + cur.calories;
          }, 0);
        }
        return page;
      });
    },
    getMealCalories: (state, action) => {
      state.pages.map((page: Page) => {
        if (page.id === action.payload) {
          const foodArr = page.meals.map((meal: any) => {
            return meal.foods.reduce((prev: any, cur: any) => {
              return prev + cur.nutrition.calories;
            }, 0);
          });

          for (let i = 0; i < foodArr.length; i++) {
            page.meals[i].calories = foodArr[i];
          }
        }

        return page;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerDiary.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOwnerDiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownerId = action.payload.ownerId;
        state.id = action.payload.id;
        state.pages = action.payload.pages;
      })
      .addCase(createNewPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPage.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.pages.push(action.payload);
      })
      .addCase(addNewFood.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages.map((page: Page) => {
          return page.meals.map((meal: Meal) => {
            if (meal.id === action.payload.mealId) {
              meal.foods.push({
                id: action.payload.id,
                title: action.payload.title,
                servingsSize: action.payload.servingsSize,
                servingsNumber: action.payload.servingsNumber,
                calories: action.payload.calories,
              });
              return meal;
            }
          });
        });
      })
      .addCase(deleteFood.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages.map((page: Page) => {
          if (page.id === action.payload.pageId) {
            console.log(page.id === action.payload.pageId);
            return page.meals.map((meal: Meal) => {
              if (meal.id === action.payload.mealId) {
                console.log(meal.id === action.payload.mealId);
                return meal.foods.filter((food: Food) => {
                  food.id !== action.payload.foodId;
                });
              }
            });
          }
        });
      });
  },
});
export const { getPageCalories, getMealCalories } = diarySlice.actions;
export default diarySlice.reducer;
