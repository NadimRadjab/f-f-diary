import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../../firebase";
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
