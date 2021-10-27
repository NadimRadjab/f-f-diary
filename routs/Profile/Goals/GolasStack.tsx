import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalsScreen from "../../../screens/Profile/GoalsScreen";
import CalculatorScreen from "../../../screens/Profile/CalculatorScreen";
import { GoalsParamList } from "../types";
import { colors } from "../../../styles/colors";
import CaloriesSreen from "../../../screens/Profile/Goals/CaloriesSreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { DrawerParamList } from "../../NavigationTypes";
const Stack = createNativeStackNavigator<GoalsParamList>();
const GolasStack = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerParamList, "Home">>();
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
      <Stack.Screen
        options={({ route }) => ({
          title: "Results",
        })}
        name="Calories"
        component={CaloriesSreen}
      />
    </Stack.Navigator>
  );
};

export default GolasStack;
