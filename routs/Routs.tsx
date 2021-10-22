import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigation from "./DrawerNavigation";

interface RouteProps {}
const MyThema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: "white",
    primary: "#0ea5e9",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
const Routs: React.FC<RouteProps> = ({}) => {
  return (
    <NavigationContainer theme={MyThema}>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Routs;
