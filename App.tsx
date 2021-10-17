import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Routs from "./routs/Routs";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { getOwnerDiary } from "./redux/features/Diary/diarySlice";

export default function App() {
  // useEffect(() => {
  //   store.dispatch(getOwnerDiary("u1"));
  // }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routs />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </Provider>
  );
}
