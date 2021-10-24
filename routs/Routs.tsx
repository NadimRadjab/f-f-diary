import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigation from "./DrawerNavigation";
import { useAppDipsatch, useAppSelector } from "../redux/hooks";
import { getCurrentUser } from "../redux/features/Auth/authSlice";
import firebase from "firebase";
import AuthStack from "./AuthStacks/AuthStack";
interface RouteProps {}
const MyThema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: "white",
    primary: "#0ea5e9",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
const Routs: React.FC<RouteProps> = ({}) => {
  const dispatch = useAppDipsatch();
  const userId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    (async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(
            getCurrentUser({ userId: user.uid, token: user.getIdToken(true) })
          );
        } else {
          console.log("logged out");
        }
      });
    })();
  }, [dispatch]);

  return (
    <NavigationContainer theme={MyThema}>
      {!userId ? <AuthStack /> : <DrawerNavigation />}
    </NavigationContainer>
  );
};

export default Routs;
