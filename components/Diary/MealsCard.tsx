import { VStack, Heading, Divider, Text } from "native-base";
import React from "react";
import { TouchableOpacity, StyleSheet, Platform, Button } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import FoodList from "./FoodList";

const MealsCard = ({
  handleLocation,
  meal,
}: {
  handleLocation: () => void;
  meal: { id: string; foods: {}[]; calories: number };
}) => {
  return (
    <VStack
      borderRadius="2xl"
      w="90%"
      marginBottom="5"
      bg="white"
      space={3}
      alignItems="center"
      padding="2"
    >
      <Heading color="muted.600">Meal {meal.id}</Heading>
      <Text color="warmGray.500">Total Calories: {meal.calories}</Text>
      <Divider my="1" />

      {meal.foods?.map((food, i) => (
        <FoodList isSearched={false} key={i} food={food} />
      ))}

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
