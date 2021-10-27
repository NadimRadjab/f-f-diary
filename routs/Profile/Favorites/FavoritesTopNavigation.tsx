import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FavoritesTopParamList } from "../types";
import FavoriteRecipesScreen from "../../../screens/Profile/Favorites/FavoriteRecipesScreen";
import FavoritePlansScreen from "../../../screens/Profile/Favorites/FavoritePlansScreen";
const Tab = createMaterialTopTabNavigator<FavoritesTopParamList>();
const FavoritesTopBar = () => {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name="Recipes" component={FavoriteRecipesScreen} />
      <Tab.Screen name="Plans" component={FavoritePlansScreen} />
    </Tab.Navigator>
  );
};

export default FavoritesTopBar;
