import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeScreen from "../../screens/Recipe/RecipeScreen";
import { Platform } from "react-native";
import { RecipieParamList } from "./RecipiePramList";
import { RouteProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const RecipieStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }): any => ({
          title: "Recipes",
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitleStyle: {
            color: Platform.OS === "ios" ? "#0369a1" : null,
          },
        })}
        name="RecipeStack"
        component={RecipeScreen}
      />
    </Stack.Navigator>
  );
};

export default RecipieStack;
