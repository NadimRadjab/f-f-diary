import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeScreen from "../../screens/Recipe/RecipeScreen";

const Stack = createNativeStackNavigator();
const RecipieStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          title: "Recipes",
        })}
        name="RecipeStack"
        component={RecipeScreen}
      />
    </Stack.Navigator>
  );
};

export default RecipieStack;
