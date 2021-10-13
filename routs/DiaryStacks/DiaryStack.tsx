import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "../../screens/Diary/DiaryScreen";
import { DiaryParamList } from "./DiaryParamList";
import DiaryTopNavigator from "./DiaryTopNavigator";
const Stack = createNativeStackNavigator<DiaryParamList>();
const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          title: "Diary",
        })}
        name="DiaryStack"
        component={Diary}
      />

      <Stack.Screen
        options={({ route }) => ({
          title: route.params.title,
        })}
        name="FoodSearch"
        component={DiaryTopNavigator}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
