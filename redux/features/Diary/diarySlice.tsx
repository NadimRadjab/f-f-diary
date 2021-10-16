import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore, firestoreFunc } from "../../../firebase";
import Meal from "../../../seeds/Meal";
import Page from "../../../seeds/Page";

export const mealCreator = (arr: {}[]) => {
  for (let i = 1; i < 6; i++) {
    arr.push({ ...new Meal(i.toString(), [], 0) });
  }
};

export const getOwnerDiary = createAsyncThunk(
  "diary/getOwnerDiary",
  async (ownerId: string) => {
    let ownersIds = [] as any;
    let ownerDiary = {
      id: "",
      ownerId: "",
      pages: [],
    };
    const diary = await firestore.collection("diaries").get();

    const data = diary.docs.forEach((doc) =>
      ownersIds.push(doc.data().ownerId)
    );

    if (ownersIds.includes(ownerId)) {
      diary.docs.forEach((doc) => {
        if (doc.data().ownerId === ownerId) {
          ownerDiary.id = doc.id;
          (ownerDiary.ownerId = doc.data()?.ownerId),
            (ownerDiary.pages = doc.data()?.pages);
        }
      });
    } else {
      let arr = [] as any;
      mealCreator(arr);
      const res = await firestore.collection("diaries").add({
        ownerId: "u1",
        pages: [
          {
            id: "1",
            date: new Date().toISOString(),
            ownerId: "1",
            meals: arr,
          },
        ],
      });

      const data = res.get().then((doc) => {
        ownerDiary.id = doc.id;
        (ownerDiary.ownerId = doc.data()?.ownerId),
          (ownerDiary.pages = doc.data()?.pages);
      });
    }

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
      meals: Meals[];
      totalcal: number;
    };
  }) => {
    const data = await firestore
      .collection("diaries")
      .doc(items.diaryId)
      .update({ pages: firestoreFunc.FieldValue.arrayUnion(items.newPage) });
    return items.newPage;
  }
);

interface Meals {
  id: string;
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
              calories: 53,
            },
          ],
          id: "1",
        },
        {
          calories: 0,
          foods: [],
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
  ],
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
      .addCase(createNewPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages.push(action.payload);
      });
  },
});
export const { getPageCalories, getMealCalories } = diarySlice.actions;
export default diarySlice.reducer;
