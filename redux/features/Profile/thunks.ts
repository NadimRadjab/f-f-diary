import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore, firestoreFunc } from "../../../firebase";
import { Recipe } from "../Recipes/type";
import { WeeklyPlan } from "../WeeklyPlans/types";
import firebase from "firebase";
//sets the calculated calories for user
export const setCurrentCalories = createAsyncThunk(
  "userProfile/setCurrentCalories",
  async (items: {
    calories: string | number;
    profileId: string | undefined;
  }) => {
    try {
      const data = await firestore.collection("profiles").doc(items.profileId);

      await data.update({ "progressData.currentCalories": items.calories });
      return items.calories;
    } catch (err) {
      console.log(err);
    }
  }
);

//add or remove a recipe in favorites
export const toggleRecipeInFavorites = createAsyncThunk(
  "userProfile/toggleRecipeInFavorites",
  async (items: {
    recipe: Recipe;
    profileId: string | undefined;
    isItemInFavorites: boolean;
  }) => {
    try {
      if (!items.isItemInFavorites) {
        const data = await firestore
          .collection("profiles")
          .doc(items.profileId);

        await data.update({
          "favorites.recipes": firestoreFunc.FieldValue.arrayUnion(
            items.recipe
          ),
        });
      } else {
        const data = await firestore
          .collection("profiles")
          .doc(items.profileId);

        await data.update({
          "favorites.recipes": firestoreFunc.FieldValue.arrayRemove(
            items.recipe
          ),
        });
      }

      return {
        id: items.recipe.id,
        recipe: items.recipe,
        isRecipe: items.isItemInFavorites,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

//add or remove a plan in favorites
export const togglePlanInFavorites = createAsyncThunk(
  "userProfile/togglePlanInFavorites",
  async (items: {
    plan: { id: string; plan: WeeklyPlan[]; date: Date | string };
    profileId: string | undefined;
    isItemInFavorites: boolean;
  }) => {
    try {
      if (!items.isItemInFavorites) {
        const data = await firestore
          .collection("profiles")
          .doc(items.profileId);

        await data.update({
          "favorites.plans": firestoreFunc.FieldValue.arrayUnion(items.plan),
        });
      } else {
        const data = await firestore
          .collection("profiles")
          .doc(items.profileId);

        await data.update({
          "favorites.plans": firestoreFunc.FieldValue.arrayRemove(items.plan),
        });
      }

      return {
        id: items.plan.id,
        plan: items.plan,
        isPlan: items.isItemInFavorites,
      };
    } catch (err) {
      console.log(err);
    }
  }
);
//change user name
export const changeName = createAsyncThunk(
  "user/changeName",
  async (items: { profileId: string | undefined; name: string }) => {
    try {
      const data = await firestore.collection("profiles").doc(items.profileId);

      await data.update({
        "personalData.name": items.name,
      });
      return items.name;
    } catch (err) {
      console.log(err);
    }
  }
);
//change user phone number
export const changeNumber = createAsyncThunk(
  "user/changeNumber",
  async (items: { profileId: string | undefined; number: string }) => {
    try {
      const data = await firestore.collection("profiles").doc(items.profileId);

      await data.update({
        "personalData.number": items.number,
      });
      return items.number;
    } catch (err) {
      console.log(err);
    }
  }
);
//change user password
export const changePassoword = createAsyncThunk(
  "user/changePassowrd",
  async (items: {
    profileId: string | undefined;
    email: any;
    oldPassword: any;
    newPassword: string;
  }) => {
    let message;
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      items.email,
      items.oldPassword
    );
    const data = await user
      ?.reauthenticateWithCredential(credentials)
      .then((data) => {
        return data.operationType;
      })
      .catch((err) => {
        message = err.message;
      });
    if (!data) return message;
    if (data) {
      await user!
        .updatePassword(items.newPassword)
        .then((data) => {
          message = "Password Successfully Changed.";
        })
        .catch((err) => (message = err.message));
    }
    return message;
  }
);
