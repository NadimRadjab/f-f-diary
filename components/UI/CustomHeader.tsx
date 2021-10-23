import { View } from "native-base";
import React from "react";

const CustomHeader = (props: any) => {
  return (
    <View
      width="100%"
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      p="3"
      bg="#fff"
      shadow="4"
      height="60"
    >
      {props.children}
    </View>
  );
};

export default CustomHeader;
