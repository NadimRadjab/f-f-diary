import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./DrawerNavigation";
interface RouteProps {}
const Routs: React.FC<RouteProps> = ({}) => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Routs;
