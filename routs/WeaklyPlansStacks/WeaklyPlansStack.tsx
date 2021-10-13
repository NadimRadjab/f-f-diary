import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WeaklyPlansScreen from "../../screens/WeaklyPlans/WeaklyPlansScreen";

const Stack = createNativeStackNavigator();
const WeaklyPlansStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlansScreen" component={WeaklyPlansScreen} />
    </Stack.Navigator>
  );
};

export default WeaklyPlansStack;
