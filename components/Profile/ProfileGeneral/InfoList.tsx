import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
import { logOut } from "../../../redux/features/Auth/authSlice";
import { useAppDipsatch } from "../../../redux/hooks";

type Props = {
  children: React.ReactNode;
  onHandleInfo?: (value: string) => void;
  value?: string;
  info?: string | null;
};
const InfoList = (props: Props) => {
  const dispatch = useAppDipsatch();
  const handlePress = () => {
    if (!props.onHandleInfo) {
      dispatch(logOut());
    } else props.onHandleInfo(props.value as any);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.list}>
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
