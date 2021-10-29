import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthParamList } from "../NavigationTypes";
import LoginScreen from "../../screens/Auth/LoginScreen";
import RegisterScreen from "../../screens/Auth/RegisterScreen";
import LoadingScreen from "../../screens/Auth/LoadingScreen";
import { colors } from "../../styles/colors";
const Stack = createNativeStackNavigator<AuthParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.primaryBlue,
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        options={{ title: " Sign Up" }}
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
