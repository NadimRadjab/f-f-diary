import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useAppSelector } from "../../redux/hooks";
import { AuthParamList } from "../../routs/NavigationTypes";
import { colors } from "../../styles/colors";

const LoadingScreen = () => {
  const user = useAppSelector((state) => state.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthParamList, "LoadingScreen">>();

  return (
    <View
      bg={colors.primaryBlue}
      flex="1"
      justifyContent="center"
      alignItems="center"
    >
      <View>
        <Text p="2" m="2" fontFamily="open-sans" fontSize="24" color="white">
          F&F-Diary
        </Text>
        {user.isLoading && <ActivityIndicator size="small" color="white" />}
      </View>
    </View>
  );
};

export default LoadingScreen;
