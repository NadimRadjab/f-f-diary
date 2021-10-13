import { StatusBar } from "expo-status-bar";
import React from "react";
import Routs from "./routs/Routs";
import { NativeBaseProvider } from "native-base";

import { Provider } from "react-redux";
import { store } from "./redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routs />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </Provider>
  );
}
