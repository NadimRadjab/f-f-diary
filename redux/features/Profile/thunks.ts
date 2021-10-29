import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore, firestoreFunc } from "../../../firebase";
import { Recipe } from "../Recipes/type";
import { WeeklyPlan } from "../WeeklyPlans/types";
import firebase from "firebase";
import { profileData } from "../../../seeds/profileData";

export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async (userId: string | undefined | null) => {
    let newProfile = {
      ...profileData,
      userId,
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
            newProfile.personalData.email = firebase.auth()!.currentUser!.email;
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
          newProfile.personalData.email = firebase.auth()!.currentUser!.email;
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
//change user email address
export const changeEmailAddresss = createAsyncThunk(
  "user/changeEmailAddresss",
  async (items: { email: any; oldPassword: any; newEmail: string }) => {
    let message;
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      items.email,
      items.oldPassword
    );
    const data = await user
      ?.reauthenticateWithCredential(credentials)
      .then((data) => {
        return data.user?.email;
      })
      .catch((err) => {
        message = err.message;
      });
    if (!data) return message;
    if (data) {
      await user!
        .updateEmail(items.newEmail)
        .then((data) => {
          message = "Email Address Successfully Changed.";
        })
        .catch((err) => (message = err.message));
    }
    return { message, data };
  }
);
//deletes user account
export const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (items: { email: any; oldPassword: any; value: string }) => {
    let message;

    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      items.email,
      items.oldPassword
    );
    const data = await user
      ?.reauthenticateWithCredential(credentials)
      .then((data) => {
        return data.user?.email;
      })
      .catch((err) => {
        message = err.message;
      });
    if (!data) return message;
    if (data) {
      await user!
        .delete()
        .then((data) => {
          message = "Account Successfully Deleted.";
        })
        .catch((err) => (message = err.message));
    }
    return message;
  }
);

// update profile image
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (items: { image: string; profileId: string | undefined }) => {
    try {
      const data = await firestore.collection("profiles").doc(items.profileId);
      await data.update({
        "personalData.image": items.image,
      });
    } catch (err) {
      console.log(err);
    }
    return items.image;
  }
);
