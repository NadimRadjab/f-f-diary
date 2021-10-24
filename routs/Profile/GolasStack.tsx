import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalsScreen from "../../screens/Profile/GoalsScreen";
import CalculatorScreen from "../../screens/Profile/CalculatorScreen";
import { GoalsParamList } from "./types";
import { colors } from "../../styles/colors";

const Stack = createNativeStackNavigator<GoalsParamList>();
const GolasStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primaryBlue,
        },
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: "Goals",
        })}
        name="Progress"
        component={GoalsScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Calculator",
        })}
        name="Calculator"
        component={CalculatorScreen}
      />
    </Stack.Navigator>
  );
};

export default GolasStack;
