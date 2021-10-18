import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchAllScreen from "../../screens/Diary/TopNavigation/SearchAllScreen";
import MyMealsScreen from "../../screens/Diary/TopNavigation/MyMealsScreen";
import FoodSearch from "../../components/Diary/FoodSearch";
const Tab = createMaterialTopTabNavigator();

const DiaryTopNavigator = ({ route, navigation }: any) => {
  return (
    <>
      <FoodSearch navigation={navigation} />
      <Tab.Navigator initialRouteName="SearchNav">
        <Tab.Screen
          options={({ route }) => ({
            title: "Search",
          })}
          initialParams={{
            mealId: route.params.mealId,
            data: route.params.data,
            type: route.params.type,
          }}
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
