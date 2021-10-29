import { createSlice } from "@reduxjs/toolkit";
import { PersonalData, ProgressData } from "./types";
import {
  toggleRecipeInFavorites,
  setCurrentCalories,
  togglePlanInFavorites,
  changeName,
  changeNumber,
  getUserProfile,
  setCurrentWeight,
  changePassoword,
  changeEmailAddresss,
  deleteUserAccount,
  updateProfileImage,
} from "./thunks";
import { Recipe } from "../Recipes/type";
import { WeeklyPlan } from "../WeeklyPlans/types";
interface ProfileState {
  isLoading: boolean;
  profileId: string | undefined;
  userId?: string | null;
  date?: string | undefined | Date;
  favorites: {
    recipes: Recipe[];
    plans: { date: Date; id: string; plan: WeeklyPlan[] }[];
  };
  personalData: PersonalData;
  items?: { meals?: {}[]; recipes?: {}[] };
  progressData: ProgressData;
}

const initialState: ProfileState = {
  isLoading: false,
  profileId: "",
  date: "",
  userId: "",
  favorites: {
    recipes: [],
    plans: [],
  },
  personalData: {
    image: "",
    message: "",
    name: "",
    number: "",
    email: "",
  },
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
  reducers: {
    clearErrorMessage: (state) => {
      state.personalData.message = "";
    },
  },
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
        state.personalData = action.payload!.personalData;
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
      })
      .addCase(changeName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeName.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.personalData.name = action.payload;
      })
      .addCase(changeNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeNumber.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.personalData.number = action.payload;
      })
      .addCase(changePassoword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassoword.fulfilled, (state, action: any) => {
        state.isLoading = false;

        state.personalData.message = action.payload;
      })
      .addCase(changeEmailAddresss.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeEmailAddresss.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.personalData.email = action.payload.data;
        state.personalData.message = action.payload.message;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.personalData.message = action.payload;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.personalData.image = action.payload;
      });
  },
});
export const { clearErrorMessage } = profileSlice.actions;
export default profileSlice.reducer;
