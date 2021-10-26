import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PlansSearchScreen from "../../screens/WeaklyPlans/PlansSearchScreen";
import { DrawerParamList, WeaklyParamList } from "../NavigationTypes";
import WeeklyPlanScreen from "../../screens/WeaklyPlans/WeeklyPlanScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
const Stack = createNativeStackNavigator<WeaklyParamList>();
const WeaklyPlansStack = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerParamList, "Home">>();
  return (
    <Stack.Navigator
      screenOptions={{
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
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#009387",
        },
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: "Weekly Plans",
        })}
        name="weaklyPlansSearch"
        component={PlansSearchScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Weekly Plans",
        })}
        name="weeklyplan"
        component={WeeklyPlanScreen}
      />
    </Stack.Navigator>
  );
};

export default WeaklyPlansStack;
