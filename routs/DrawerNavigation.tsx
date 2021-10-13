import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";

const Stack = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
