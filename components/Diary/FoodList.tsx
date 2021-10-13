import { View, Text, Divider } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const FoodList = () => {
  return (
    <View m="3" bg="muted.50" style={styles.listContainer}>
      <View style={styles.list}>
        <Text marginBottom="2">Food</Text>
        <Divider bg="muted.900" my="1" />
        <Text>Description</Text>
      </View>
      <Text>Calories</Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
