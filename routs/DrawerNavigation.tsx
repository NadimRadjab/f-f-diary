import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import { Platform } from "react-native";

const Stack = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === "android" && true,
        drawerStyle: {},
        headerTintColor: "#f5f5f5",
        headerTitleStyle: {
          color: "#fafafa",
        },
        headerStyle: {
          backgroundColor: "#0369a1",
        },
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: "Diary",
        })}
        name="Home"
        component={BottomNavigation}
      />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
