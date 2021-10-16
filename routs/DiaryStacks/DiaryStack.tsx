import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "../../screens/Diary/DiaryScreen";
import { DiaryParamList } from "./DiaryParamList";
import DiaryTopNavigator from "./DiaryTopNavigator";
import { TouchableOpacity, Text } from "react-native";
const Stack = createNativeStackNavigator<DiaryParamList>();
const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitleAlign: "center",
        })}
        name="DiaryStack"
        component={Diary}
      />

      <Stack.Screen
        options={({ route }) => ({
          title: route.params.title,
          headerShown: false,
        })}
        name="FoodSearch"
        component={DiaryTopNavigator}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
