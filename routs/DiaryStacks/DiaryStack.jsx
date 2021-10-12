import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "../../screens/Diary/Diary";
const Stack = createNativeStackNavigator();
const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DiaryStack" component={Diary} />
    </Stack.Navigator>
  );
};

export default DiaryStack;
