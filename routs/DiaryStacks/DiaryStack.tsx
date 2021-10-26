import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "../../screens/Diary/DiaryScreen";
import { DiaryParamList, DrawerParamList } from "../NavigationTypes";
import DiaryTopNavigator from "./DiaryTopNavigator";
import { Ionicons } from "@expo/vector-icons";
import CodeScannerScreen from "../../screens/Diary/CodeScannerScreen";
import FoodDetailsScreen from "../../screens/Diary/FoodDetailsScreen";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
const Stack = createNativeStackNavigator<DiaryParamList>();

const DiaryStack = () => {
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
        headerStyle: {
          backgroundColor: "#0369a1",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: "Diary",
        })}
        name="DiaryStack"
        component={Diary}
      />

      <Stack.Screen
        options={({ route }) => ({
          title: "Search Food",
        })}
        name="FoodSearch"
        component={DiaryTopNavigator}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Barcode Scanner",
          headerShown: false,
        })}
        name="FoodScan"
        component={CodeScannerScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: "Food Details",
        })}
        name="ScannedFoodDetails"
        component={FoodDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
