import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import DiaryStack from "./DiaryStacks/DiaryStack";
import RecipieStack from "./RecipesStacks/RecipieStack";
import WeaklyPlansStack from "./WeaklyPlansStacks/WeaklyPlansStack";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tab: any =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      activeColor="#f5f5f5"
      inactiveColor="#404040"
      shifting
      barStyle={{ backgroundColor: "#0369a1" }}
    >
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#0369a1",
          },
          tabBarIcon: ({ color }: any) => (
            <MaterialIcons color={color} size={25} name="book" />
          ),
        }}
        name="Diary"
        component={DiaryStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Recipes",
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons color={color} size={25} name="chef-hat" />
          ),
        }}
        name="Recipes"
        component={RecipieStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Weakly Plans",
        }}
        name="WeaklyPlans"
        component={WeaklyPlansStack}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
