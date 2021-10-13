import { Icon, IconButton, Input, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import React from "react";

const FoodSearch = () => {
  return (
    <View>
      <View
        alignItems="center"
        justifyContent="center"
        p="5"
        flexDirection="row"
        w="100%"
      >
        <Input
          w="80%"
          InputLeftElement={
            <Icon
              as={<Ionicons name="search" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Search for a food"
        />
        <IconButton
          icon={
            <Icon color="muted.600" as={<Ionicons name="barcode-outline" />} />
          }
        />
      </View>
    </View>
  );
};

export default FoodSearch;
