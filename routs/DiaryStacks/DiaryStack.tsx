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
          title: "Diary",
          headerRight: () => (
            <TouchableOpacity>
              <Text>New Page</Text>
            </TouchableOpacity>
          ),
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
