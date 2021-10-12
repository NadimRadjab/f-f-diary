import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import DiaryStack from "./DiaryStacks/DiaryStack";
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Diary" component={DiaryStack} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
