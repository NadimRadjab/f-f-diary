import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import DiaryStack from "./DiaryStacks/DiaryStack";
import RecipieStack from "./RecipesStacks/RecipieStack";
import WeaklyPlansStack from "./WeaklyPlansStacks/WeaklyPlansStack";
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{ headerShown: true }}
        name="Diary"
        component={DiaryStack}
      />
      <Tab.Screen name="Recipes" component={RecipieStack} />
      <Tab.Screen name="Weakly Plans" component={WeaklyPlansStack} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
