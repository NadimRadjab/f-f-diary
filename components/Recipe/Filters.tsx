import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
interface Props {
  handleFilters: (id: string) => void;

  color: string;
  title: string;
  id: string;
}
const Filters: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.handleFilters(props.id)}
      style={{ marginHorizontal: 15, width: 100 }}
    >
      <View
        alignItems="center"
        justifyContent="center"
        borderRadius="10"
        bg={props.color}
      >
        <Text fontSize="14" color="light.800">
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Filters;
