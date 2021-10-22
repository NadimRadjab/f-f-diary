import React from "react";
import { Text } from "native-base";

const CustomText = (props: any) => {
  return (
    <Text color={props.color} fontFamily="open-sans" fontSize={props.size}>
      {props.children}
    </Text>
  );
};

export default CustomText;
