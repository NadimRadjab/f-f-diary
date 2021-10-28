import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
type Props = {
  children: React.ReactNode;
  onHandleInfo: (value: string) => void;
  value: string;
  info?: string;
};
const InfoList = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onHandleInfo(props.value)}
      style={styles.list}
    >
      <View p="3">
        <Text m="1" fontSize="16">
          {props.children}
        </Text>
        {props.info ? (
          <Text m="1" fontSize="13">
            {props.info}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: 65,
    borderBottomColor: "#ccc",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
});

export default InfoList;
