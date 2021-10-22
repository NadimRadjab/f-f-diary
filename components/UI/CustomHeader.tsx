import { View } from "native-base";
import React from "react";
import CustomText from "./CustomText";

const CustomHeader = (props: any) => {
  return (
    <View
      width="100%"
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      p="4"
      bg="#fff"
      shadow="3"
      borderBottomWidth="0.2"
      height="60"
    >
      {props.children}
    </View>
  );
};

export default CustomHeader;
