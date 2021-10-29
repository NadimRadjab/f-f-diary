import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import { DrawerParamList } from "./NavigationTypes";
import ProfileBottomBar from "./Profile/ProfileBottomBar";
import DrawerContent from "../components/UI/DrawerContent";
import GolasStack from "./Profile/Goals/GolasStack";
const Stack = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  return (
    <Stack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
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
          title: "Food Hangout",
        })}
        name="Home"
        component={BottomNavigation}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Profile",
        })}
        name="Profile"
        component={ProfileBottomBar}
      />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
