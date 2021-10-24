import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthParamList } from "../NavigationTypes";
import LoginScreen from "../../screens/Auth/LoginScreen";
import RegisterScreen from "../../screens/Auth/RegisterScreen";
const Stack = createNativeStackNavigator<AuthParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
export default AuthStack;
