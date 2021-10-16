import { Icon, IconButton, Input, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAppDipsatch } from "../../redux/hooks";
import { getFoods } from "../../redux/features/Diary/foodSlice";
import { useDispatch } from "react-redux";

const FoodSearch = () => {
  const [product, setProduct] = useState<string>("");
  const handleProduct = (value: string) => {
    setProduct(value);
  };
  const dispatch = useAppDipsatch();
  const handleSubmit = () => {
    dispatch(getFoods(product));
    setProduct("");
  };
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
          onSubmitEditing={handleSubmit}
          value={product}
          onChangeText={handleProduct}
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
