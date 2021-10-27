import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firestore } from "../../../firebase";
import { ProgressData } from "./types";
import {
  toggleRecipeInFavorites,
  setCurrentCalories,
  togglePlanInFavorites,
} from "./thunks";
import { Recipe } from "../Recipes/type";
import { WeeklyPlan } from "../WeeklyPlans/types";
interface ProfileState {
  isLoading: boolean;
  profileId: string | undefined;
  userId?: string | null;
  date?: string;
  favorites: {
    recipes: Recipe[];
    plans: { date: Date; id: string; plan: WeeklyPlan[] }[];
  };
  personalData?: {};
  items?: { meals?: {}[]; recipes?: {}[] };
  progressData: ProgressData;
}

export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async (userId: string | undefined | null) => {
    let newProfile = {
      date: new Date().toISOString(),
      profileId: "",
      userId,
      favorites: {
        recipes: [],
        plans: [],
      },
      personalData: {},
      items: {},
      progressData: {
        startingWeight: {
          weight: "",
          date: "",
        },
        currentWeight: [],
      },
    };

    const usersIds = [] as any;
    try {
      const profile = await firestore.collection("profiles").get();
      const data = profile.docs.forEach((doc) =>
        usersIds.push(doc.data().userId)
      );
      if (usersIds.includes(userId)) {
        profile.docs.forEach((doc) => {
          if (doc.data().userId === userId) {
            newProfile.profileId = doc.id;
            newProfile.date = doc.data().date;
            newProfile.userId = doc.data().userId;
            newProfile.favorites = doc.data().favorites;
            newProfile.personalData = doc.data().personalData;
            newProfile.items = doc.data().items;
            newProfile.progressData = doc.data().progressData;
          }
        });
      } else {
        const res = await firestore.collection("profiles").add({
          ...newProfile,
        });
        await res.get().then((doc) => {
          newProfile.profileId = doc.id;
          newProfile.date = doc.data()?.date;
          newProfile.userId = doc.data()?.userId;
          newProfile.favorites = doc.data()?.favorites;
          newProfile.personalData = doc.data()?.personalData;
          newProfile.items = doc.data()?.items;
          newProfile.progressData = doc.data()!.progressData;
        });
      }
      return newProfile;
    } catch (err) {
      console.log(err);
    }
  }
);
export const setCurrentWeight = createAsyncThunk(
  "userProfile/setCurrentWeight",
  async (items: {
    isCurrentWeight: boolean;
    isStartingWeight: boolean;
    date?: Date;
    weight: string;
    profileId: string | undefined;
  }) => {
    try {
      const data = await firestore.collection("profiles").doc(items.profileId);
      let newObj = {
        weight: items.weight,
        date: new Date(),
      };
      if (items.isCurrentWeight && !items.isStartingWeight) {
        const info = await data.get();
        let weightArr = [...info.data()!.progressData.currentWeight, newObj];
        await data.update({ "progressData.currentWeight": weightArr });
      } else if (items.isCurrentWeight && items.isStartingWeight) {
        await data.update({
          "progressData.startingWeight": {
            weight: items.weight,
            date: items.date,
          },
        });
      } else {
        await data.update({ "progressData.goalWeight": items.weight });
      }
      return { ...items, newObj };
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState: ProfileState = {
  isLoading: false,
  profileId: "",
  date: "",
  userId: "",
  favorites: {
    recipes: [],
    plans: [],
  },
  personalData: {},
  items: {},
  progressData: {
    startingWeight: {
      weight: "",
      date: "",
    },
  },
};

const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileId = action.payload?.profileId;
        state.favorites = action.payload!.favorites;
        state.items = action.payload?.items;
        state.personalData = action.payload?.personalData;
        state.userId = action.payload?.userId;
        state.date = action.payload?.date;
        state.progressData = action.payload!.progressData;
      })
      .addCase(setCurrentWeight.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrentWeight.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          action.payload!.isCurrentWeight &&
          !action.payload!.isStartingWeight
        ) {
          state.progressData!.currentWeight!.push(action.payload!.newObj);
        } else if (
          action.payload?.isCurrentWeight &&
          action.payload!.isStartingWeight
        ) {
          state.progressData.startingWeight!.date =
            action.payload.date?.toISOString();
          state.progressData.startingWeight!.weight = action.payload.weight;
        } else {
          state.progressData!.goalWeight = action.payload?.weight;
        }
      })
      .addCase(setCurrentCalories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrentCalories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.progressData!.currentCalories = action.payload;
      })
      .addCase(toggleRecipeInFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleRecipeInFavorites.fulfilled, (state, action: any) => {
        state.isLoading = false;

        if (!action.payload.isRecipe) {
          state.favorites.recipes.push(action.payload.recipe);
        } else {
          state.favorites.recipes = state.favorites.recipes.filter(
            (recipe) => recipe.id !== action.payload.id
          );
        }
      })
      .addCase(togglePlanInFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(togglePlanInFavorites.fulfilled, (state, action: any) => {
        state.isLoading = false;

        if (!action.payload.isPlan) {
          state.favorites.plans.push(action.payload.plan);
        } else {
          state.favorites.plans = state.favorites.plans.filter(
            (plan) => plan.id !== action.payload.id
          );
        }
      });
  },
});
export default profileSlice.reducer;
