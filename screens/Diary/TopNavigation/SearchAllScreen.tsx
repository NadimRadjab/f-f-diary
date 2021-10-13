import { FlatList, View, Text } from "native-base";
import React from "react";
import FoodList from "../../../components/Diary/FoodList";

const SearchAllScreen = () => {
  return (
    <View p="5" alignItems="center">
      <FoodList />
    </View>
  );
};

export default SearchAllScreen;
{
  /* <FlatList renderItem={<FoodList />} />; */
}
