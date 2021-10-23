import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import axios from "axios";

interface ApiResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data: T;
}
interface RecipesData {
  results: [];
}
export const register = createAsyncThunk(
  "user/register",
  async (items: { email: string; password: string }) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(items.email, items.password);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }
);
interface AuthState {
  isLoading: boolean;
  user: null | {};
  token: null | string;
}
const initialState: AuthState = {
  isLoading: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.recipes = action.payload;
      });
  },
});
export default authSlice.reducer;
