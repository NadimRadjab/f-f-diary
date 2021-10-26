import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import { DrawerParamList } from "./NavigationTypes";
import { Ionicons } from "@expo/vector-icons";
import AuthStack from "./AuthStacks/AuthStack";
import { useAppDipsatch } from "../redux/hooks";
import { logOut } from "../redux/features/Auth/authSlice";
import ProfileBottomBar from "./Profile/ProfileBottomBar";

const Stack = createDrawerNavigator<DrawerParamList>();
const SignOut = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDipsatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={handleLogOut} />
    </DrawerContentScrollView>
  );
};
const DrawerNavigation = () => {
  return (
    <Stack.Navigator
      drawerContent={(props) => <SignOut {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {},

        headerTintColor: "#f5f5f5",
        headerTitleStyle: {
          color: "#fafafa",
        },
        headerStyle: {
          backgroundColor: "#0369a1",
        },
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: "Food Hangout",

          drawerIcon: () => (
            <Ionicons color="#c2410c" size={23} name="bonfire" />
          ),
        })}
        name="Home"
        component={BottomNavigation}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Profile",

          drawerIcon: () => (
            <Ionicons color="#c2410c" size={23} name="bonfire" />
          ),
        })}
        name="Profile"
        component={ProfileBottomBar}
      />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
