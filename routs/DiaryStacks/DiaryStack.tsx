import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "../../screens/Diary/DiaryScreen";
import { DiaryParamList } from "./DiaryParamList";
import DiaryTopNavigator from "./DiaryTopNavigator";

import CodeScannerScreen from "../../screens/Diary/CodeScannerScreen";
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
    </Stack.Navigator>
  );
};

export default DiaryStack;
