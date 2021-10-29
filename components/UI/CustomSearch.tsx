import { Badge, Icon, Input, View, Box, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import CustomText from "../UI/CustomText";

interface Props {
  handleQuery: (recipe: string) => void;
  selectedFilters: {}[];
  placeholder: string;
  isSearching: boolean;
}
const CustomSearch: React.FC<Props> = (props) => {
  const [search, setSearch] = useState<string>("");

  const handleSerach = (value: string) => {
    setSearch(value);
  };

  const handleSubmit = () => {
    props.handleQuery(search);
    setSearch("");
  };

  return (
    <View w="100%">
      <View
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        p="3"
        w="100%"
      >
        <Input
          onSubmitEditing={handleSubmit}
          value={search}
          keyboardType={!props.isSearching ? "number-pad" : "default"}
          onChangeText={handleSerach}
          w="80%"
          InputLeftElement={
            props.isSearching ? (
              <Icon
                as={<Ionicons name="search" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            ) : (
              <Box></Box>
            )
          }
          InputRightElement={
            !props.selectedFilters.length ? (
              <Box></Box>
            ) : (
              <Badge borderRadius="50" colorScheme="warning">
                <CustomText color="white">
                  {props.selectedFilters?.length}
                </CustomText>
              </Badge>
            )
          }
          placeholder={props.placeholder}
        />
      </View>
      {!props.isSearching && (
        <View w="100%" alignItems="center" justifyContent="center">
          <Button onPress={handleSubmit}>GENERATE MEAL PLAN</Button>
        </View>
      )}
    </View>
  );
};

export default CustomSearch;
