import { View } from "native-base";
import React from "react";

const CustomHeader = (props: any) => {
  return (
    <View
      width="100%"
      justifyContent={!props.content ? "space-between" : props.content}
      flexDirection={!props.direction ? "row" : props.direction}
      alignItems={!props.alignItems ? "center" : props.alignItems}
      p="3"
      bg="#fff"
      shadow="4"
      height={!props.height ? "60" : props.height}
    >
      {props.children}
    </View>
  );
};

export default CustomHeader;
