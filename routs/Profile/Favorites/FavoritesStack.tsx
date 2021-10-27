import React from "react";
import { FavoritesParamList } from "../types";
import { colors } from "../../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { DrawerParamList } from "../../NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesTopBar from "./FavoritesTopNavigation";
import RecipeDetailsScreen from "../../../screens/Recipe/RecipeDetailsScreen";
import WeeklyPlanScreen from "../../../screens/WeaklyPlans/WeeklyPlanScreen";
const Stack = createNativeStackNavigator<FavoritesParamList>();

const FavoritesStack = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerParamList, "Home">>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primaryPurple,
        },
      }}
    >
      <Stack.Screen
        options={{
          title: "Favorites",
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
        }}
        name="FavoritesItems"
        component={FavoritesTopBar}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: route.params.recipe.title,
        })}
        name="RecipeDetails"
        component={RecipeDetailsScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Weekly Plan",
        })}
        name="PlanDetails"
        component={WeeklyPlanScreen}
      />
    </Stack.Navigator>
  );
};
export default FavoritesStack;
