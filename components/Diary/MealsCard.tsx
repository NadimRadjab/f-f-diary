import { VStack, Heading, Divider, Text } from "native-base";
import React from "react";
import { TouchableOpacity, StyleSheet, Platform, Button } from "react-native";
import FoodList from "./FoodList";

const MealsCard = ({
  handleLocation,
  meal,
}: {
  handleLocation: () => void;
  meal: { id: string };
}) => {
  return (
    <VStack
      borderRadius="2xl"
      w="90%"
      marginBottom="5"
      bg="white"
      space={4}
      alignItems="center"
      padding="2"
    >
      <Heading color="muted.600">{meal.id}</Heading>
      <Divider my="1" />

      <FoodList />

      {Platform.OS === "android" ? (
        <TouchableOpacity onPress={handleLocation} style={styles.btnContainer}>
          <Text color="white">Add Food</Text>
        </TouchableOpacity>
      ) : (
        <Button onPress={handleLocation} title="Add Food" />
      )}
    </VStack>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    width: 320,
    height: 50,
    backgroundColor: "#0ea5e9",

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealsCard;
