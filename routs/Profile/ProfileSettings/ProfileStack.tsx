import React from "react";
import { ProfileStackParamList } from "../types";
import { colors } from "../../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { DrawerParamList } from "../../NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileGeneralScreen from "../../../screens/Profile/ProfileSettings/ProfileGeneralScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerParamList, "Home">>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primaryRed,
        },
      }}
    >
      <Stack.Screen
        options={{
          title: "Profile",
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
        }}
        name="ProfileGeneral"
        component={ProfileGeneralScreen}
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;
