import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileBottomParamList } from "./types";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { getUserProfile } from "../../redux/features/Profile/profileSlice";
import GolasStack from "./Goals/GolasStack";
import FavoritesStack from "./Favorites/FavoritesStack";
import { colors } from "../../styles/colors";
import ProfileStack from "./ProfileSettings/ProfileStack";

const Tab = createMaterialBottomTabNavigator<ProfileBottomParamList>();

const ProfileBottomBar = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDipsatch();
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch]);
  return (
    <Tab.Navigator shifting activeColor="#f5f5f5">
      <Tab.Screen
        options={({}) => ({
          title: "Goals",
          headerTitleStyle: {
            color: "#0369a1",
          },
          tabBarColor: "#0369a1",
          tabBarIcon: ({ color }: any) => (
            <MaterialIcons color={color} size={25} name="pie-chart" />
          ),
        })}
        name="Goals"
        component={GolasStack}
      />
      <Tab.Screen
        options={({}) => ({
          title: "Favorites",
          headerTitleStyle: {
            color: "#0369a1",
          },
          tabBarColor: colors.primaryPurple,
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons
              color={color}
              size={25}
              name="star-box-multiple"
            />
          ),
        })}
        name="Favorites"
        component={FavoritesStack}
      />
      <Tab.Screen
        options={({}) => ({
          title: "Profile",
          headerTitleStyle: {
            color: "#0369a1",
          },
          tabBarColor: colors.primaryRed,
          tabBarIcon: ({ color }: any) => (
            <MaterialIcons color={color} size={25} name="person" />
          ),
        })}
        name="ProfileSettings"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default ProfileBottomBar;
