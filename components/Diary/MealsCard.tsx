import { VStack, Heading, Divider, Text } from "native-base";
import React from "react";
import { TouchableOpacity, StyleSheet, Platform, Button } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiaryParamList } from "../../routs/DiaryStacks/DiaryParamList";
import FoodList from "./FoodList";

const MealsCard = ({
  meal,
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
  meal: { id: string; foods: {}[]; calories: number; mealNumber: number };
}) => {
  const handleLocation = () => {
    navigation.navigate("FoodSearch", { mealId: meal.id });
  };

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
      <Heading color="muted.600">Meal {meal.mealNumber}</Heading>
      <Text color="warmGray.500">Total Calories: {meal.calories}</Text>
      <Divider my="1" />

      {meal.foods?.map((food, i) => (
        <FoodList mealId={meal.id} isSearched={false} key={i} food={food} />
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
