import { View } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
export default Loading;
