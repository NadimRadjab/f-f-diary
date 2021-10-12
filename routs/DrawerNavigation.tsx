import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";

const Stack = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
