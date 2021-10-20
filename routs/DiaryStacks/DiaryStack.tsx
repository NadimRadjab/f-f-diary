import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "../../screens/Diary/DiaryScreen";
import { DiaryParamList } from "../NavigationTypes";
import DiaryTopNavigator from "./DiaryTopNavigator";

import CodeScannerScreen from "../../screens/Diary/CodeScannerScreen";
import FoodDetailsScreen from "../../screens/Diary/FoodDetailsScreen";
const Stack = createNativeStackNavigator<DiaryParamList>();

const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitleAlign: "center",
          headerStyle: {},
        })}
        name="DiaryStack"
        component={Diary}
      />

      <Stack.Screen
        options={({ route }) => ({
          title: route.params.mealId,
          headerShown: false,
        })}
        name="FoodSearch"
        component={DiaryTopNavigator}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Barcode Scanner",
          headerShown: false,
        })}
        name="FoodScan"
        component={CodeScannerScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Food Details",
          headerShown: true,
        })}
        name="ScannedFoodDetails"
        component={FoodDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
