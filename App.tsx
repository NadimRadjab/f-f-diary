import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Routs from "./routs/Routs";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-MediumItalic.ttf"),
  });
};
export default function App() {
  const [data, setData] = useState<boolean>(false);
  if (!data) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setData(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routs />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </Provider>
  );
}
