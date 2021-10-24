import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (items: { userId: string; token: any }) => {
    try {
      return { userId: items.userId, token: await items.token };
    } catch (err) {
      console.log(err);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (items: { email: string; password: string }) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(items.email, items.password);

      return { token: user.user?.getIdToken(), userId: user.user?.uid };
    } catch (err: any) {
      return err;
    }
  }
);
export const logIn = createAsyncThunk(
  "user/login",
  async (items: { email: string; password: string }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(items.email, items.password);
      return { token: user.user?.getIdToken(), userId: user.user?.uid };
    } catch (err: any) {
      return err;
    }
  }
);
export const logOut = createAsyncThunk("user/logOut", async () => {
  try {
    const user = await firebase.auth().signOut();
    return user;
  } catch (err: any) {
    return err;
  }
});
interface AuthState {
  isLoading: boolean;
  userId: null | string | undefined;
  token: null | string;
  error: null | string;
}
const initialState: AuthState = {
  isLoading: false,
  userId: null,
  token: null,
  error: null,
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
        if (action.payload.hasOwnProperty("code")) {
          state.error = action.payload.message;
          state.userId = null;
          state.token = null;
        } else {
          state.userId = action.payload.userId;
          state.token = action.payload.token.h;
        }
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.hasOwnProperty("code")) {
          state.error = action.payload.message;
          state.userId = null;
          state.token = null;
        } else {
          state.userId = action.payload.userId;
          state.token = action.payload.token.h;
        }
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = null;
        state.token = null;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.hasOwnProperty("code")) {
          state.userId = null;
          state.token = null;
        } else {
          state.userId = action.payload?.userId;
          state.token = action.payload?.token;
        }
      });
  },
});
export default authSlice.reducer;
