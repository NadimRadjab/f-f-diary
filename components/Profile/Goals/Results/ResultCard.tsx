import { JSXElement } from "@babel/types";
import { Heading, View } from "native-base";
import React from "react";

const ResultCard = (props: any) => {
  return (
    <View
      p="2"
      m="1"
      alignItems="center"
      borderColor="yellow.300"
      borderWidth="1"
      borderRadius="10"
      shadow="2"
      bg="yellow.100"
    >
      {props.children}
    </View>
  );
};

export default ResultCard;
