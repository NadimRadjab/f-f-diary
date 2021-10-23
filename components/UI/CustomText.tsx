import React from "react";
import { Text, View } from "native-base";

const CustomText = (props: any) => {
  return (
    <View>
      <Text
        mr={props.mr}
        color={props.color}
        fontFamily="open-sans"
        fontSize={props.size}
      >
        {props.children}
      </Text>
    </View>
  );
};

export default CustomText;
