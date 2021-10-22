import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import DiaryStack from "./DiaryStacks/DiaryStack";
import RecipieStack from "./RecipesStacks/RecipieStack";
import WeaklyPlansStack from "./WeaklyPlansStacks/WeaklyPlansStack";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tab: any = createMaterialBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator initialParams activeColor="#f5f5f5" shifting>
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#0369a1",
          },
          tabBarColor: "#0369a1",
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
          tabBarColor: "#009367",
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
          tabBarColor: "#009387",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="calendar-weekend"
              size={24}
              color="#fff"
            />
          ),
        }}
        name="WeaklyPlans"
        component={WeaklyPlansStack}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
