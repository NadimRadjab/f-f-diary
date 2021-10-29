import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "native-base";
import CustomText from "../UI/CustomText";
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
        <CustomText fontSize="14" color="light.50">
          {props.title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default Filters;
