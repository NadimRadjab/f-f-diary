import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchAllScreen from "../../screens/Diary/TopNavigation/SearchAllScreen";
import MyMealsScreen from "../../screens/Diary/TopNavigation/MyMealsScreen";
import FoodSearch from "../../components/Diary/FoodSearch";
import { RouteProp } from "@react-navigation/native";
import { DiaryParamList } from "./DiaryParamList";
const Tab = createMaterialTopTabNavigator();

const DiaryTopNavigator = ({
  route,
}: {
  route: RouteProp<DiaryParamList, "FoodSearch">;
}) => {
  return (
    <>
      <FoodSearch />
      <Tab.Navigator initialRouteName="SearchNav">
        <Tab.Screen
          options={({ route }) => ({
            title: "Search",
          })}
          initialParams={{ mealId: route.params.mealId }}
          name="Search"
          component={SearchAllScreen}
        />
        <Tab.Screen
          options={{ title: "My meals" }}
          name="MyMeals"
          component={MyMealsScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default DiaryTopNavigator;
