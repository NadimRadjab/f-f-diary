import { View, Text, Divider } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { addFood, addList } from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch } from "../../redux/hooks";

const FoodList = () => {
  const dispatch = useAppDipsatch();
  const handleMeal = () => {
    dispatch(addFood());
  };
  return (
    <TouchableOpacity onPress={handleMeal} style={styles.screen}>
      <View m="3" bg="muted.50" style={styles.listContainer}>
        <View style={styles.list}>
          <Text marginBottom="2">Food</Text>
          <Divider bg="muted.900" my="1" />
          <Text>Description</Text>
        </View>
        <Text>Calories</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  screen: {
    width: "100%",
  },
  listContainer: {
    width: "90%",
    height: 85,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  list: {},
});

export default FoodList;
