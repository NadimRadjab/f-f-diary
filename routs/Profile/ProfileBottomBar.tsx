import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileBottomParamList } from "./types";
import ProgressScreen from "../../screens/Profile/ProgressScreen";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { getUserProfile } from "../../redux/features/Profile/profileSlice";

const Tab = createMaterialBottomTabNavigator<ProfileBottomParamList>();

const ProfileBottomBar = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDipsatch();
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch]);
  return (
    <Tab.Navigator activeColor="#f5f5f5">
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
        name="goals"
        component={ProgressScreen}
      />
    </Tab.Navigator>
  );
};

export default ProfileBottomBar;
