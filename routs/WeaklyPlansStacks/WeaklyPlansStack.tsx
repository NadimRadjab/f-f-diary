import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PlansSearchScreen from "../../screens/WeaklyPlans/PlansSearchScreen";
import { WeaklyParamList } from "../NavigationTypes";
import WeeklyPlanScreen from "../../screens/WeaklyPlans/WeeklyPlanScreen";
const Stack = createNativeStackNavigator<WeaklyParamList>();
const WeaklyPlansStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
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
