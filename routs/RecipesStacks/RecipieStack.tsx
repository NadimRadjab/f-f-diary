import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import RecipeScreen from "../../screens/Recipe/RecipeScreen";
import { Platform } from "react-native";
import { DrawerParamList, RecipieParamList } from "../NavigationTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import RecipeDetailsScreen from "../../screens/Recipe/RecipeDetailsScreen";

const Stack = createNativeStackNavigator<RecipieParamList>();
const RecipieStack = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DrawerParamList, "Home">>();
  const route = useRoute<RouteProp<RecipieParamList, "RecipeStack">>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }): any => {
          return {
            title: "Recipes",
            headerShown: Platform.OS === "ios" ? true : false,
            headerTitleStyle: {
              color: Platform.OS === "ios" ? "#0369a1" : null,
            },
          };
        }}
        name="RecipeStack"
        component={RecipeScreen}
      />
      <Stack.Screen
        options={({ route }): any => {
          return {
            title: route.params.recipe.title,
            headerShown: true,
            headerTitleStyle: {
              color: "#0369a1",
              fontFamily: "open-sans",
            },
          };
        }}
        name="RecipeDetails"
        component={RecipeDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default RecipieStack;
