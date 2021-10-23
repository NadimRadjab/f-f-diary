import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import { Platform } from "react-native";
import { DrawerParamList } from "./NavigationTypes";
import { Ionicons } from "@expo/vector-icons";
import AuthStack from "./AuthStacks/AuthStack";

const Stack = createDrawerNavigator<DrawerParamList>();
const DrawerNavigation = () => {
  return (
    <Stack.Navigator
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

          drawerIcon: () => (
            <Ionicons color="#c2410c" size={23} name="bonfire" />
          ),
        })}
        name="Home"
        component={BottomNavigation}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Test",

          drawerIcon: () => (
            <Ionicons color="#c2410c" size={23} name="bonfire" />
          ),
        })}
        name="test"
        component={AuthStack}
      />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
