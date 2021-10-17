import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore, firestoreFunc } from "../../../firebase";
import Meal from "../../../seeds/Meal";
import { v4 as uuid4 } from "uuid";

export const mealCreator = (arr: {}[], pageNumber: string) => {
  for (let i = 1; i < 6; i++) {
    arr.push({ ...new Meal(uuid4(), pageNumber, i, [], 0) });
  }
};

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

      res.get().then((doc) => {
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
      // page.meals = ownerDiary.meals.map((meal: { inPage: string }) => {
      //   if (meal.inPage === page.id) {
      //     console.log(meal);
      //     page.meals.push({ ...meal });
      //     return page;
      //   }
      // });
    });

    return ownerDiary;
  }
);
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
export const addNewFood = createAsyncThunk(
  "food/addNewFood",
  async (items: { diaryId: string; mealId: string; food: {} }) => {
    let newArr = [] as any;
    const data = await firestore.collection("diaries").get();
    data.forEach((doc) => {
      newArr = doc.data().meals.map((meal: Meals) => {
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
  }
);

interface Meals {
  id: string;
  mealNumber: number;
  foods: {}[];
  calories: number;
}
interface State {
  ownerId: string;
  id: string;
  pages: {
    id: string;
    date: string;
    meals: Meals[];
    totalcal: number;
  }[];
  isLoading: boolean;
}
const initialState: State = {
  ownerId: "u1",
  id: "",
  pages: [],
  isLoading: false,
};
export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    // addList: (state: State) => {
    //   const newPage = new Page("1", new Date().toISOString(), [], 0);
    //   mealCreator(newPage.meals);

    //   state.pages.push({ ...newPage });
    // },
    // addFood: (state: State, action) => {
    //   // const newFood = new Food("1", "Eggs", "White Egss", 432);
    //   state.pages.map((page: { id: string; meals: { foods: {}[] }[] }) => {
    //     if (page.id === "1") {
    //       const meals = page?.meals.find((meal: any) => meal.id === "1");
    //       return meals?.foods.push(action.payload);
    //     }
    //     return page;
    //   });
    // },
    getPageCalories: (state: State, action) => {
      state.pages.map(
        (page: {
          id: string;
          totalcal: number;
          meals: { calories: number; foods: {}[] }[];
        }) => {
          if (page.id === action.payload) {
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
      });
  },
});
export const { getPageCalories, getMealCalories } = diarySlice.actions;
export default diarySlice.reducer;
