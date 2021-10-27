import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeScreen from "../../screens/Recipe/RecipeScreen";
import { Platform } from "react-native";
import { DrawerParamList, RecipieParamList } from "../NavigationTypes";
import RecipeDetailsScreen from "../../screens/Recipe/RecipeDetailsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator<RecipieParamList>();
const RecipieStack = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerParamList, "Home">>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#009367",
        },
      }}
    >
      <Stack.Screen
        options={({ route }): any => {
          return {
            title: "Recipes",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons
                  style={{ marginRight: 20 }}
                  color="white"
                  size={25}
                  name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                />
              </TouchableOpacity>
            ),
          };
        }}
        name="RecipeStack"
        component={RecipeScreen}
      />
      <Stack.Screen
        options={({ route }): any => {
          return {
            title: route.params.recipe.title,
            headerTitleStyle: {
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
