import { VStack, Heading, Divider, Text } from "native-base";
import React from "react";
import { TouchableOpacity, StyleSheet, Platform, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiaryParamList } from "../../routs/NavigationTypes";
import PageFoodList from "./PageFoodList";
import { useNavigation } from "@react-navigation/native";

interface Props {
  meal: {
    inPage: string;
    id: string;
    foods: {}[];
    calories: number;
    mealNumber: number;
  };
}
const MealsCard: React.FC<Props> = ({ meal }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DiaryParamList, "DiaryStack">>();
  const handleLocation = () => {
    navigation.navigate("FoodSearch", { mealId: meal.id });
  };

  return (
    <VStack
      borderRadius="2xl"
      w="95%"
      marginBottom="5"
      _light={{ backgroundColor: "light.50" }}
      space={3}
      alignItems="center"
      shadow={7}
    >
      <Heading p="2" color="muted.600">
        Meal {meal.mealNumber}
      </Heading>
      <Text color="warmGray.500">Total Calories: {meal.calories}</Text>
      <Divider my="1" />

      {meal.foods?.map((food: any, i) => (
        <PageFoodList
          pageId={meal.inPage}
          mealId={meal.id}
          isSearched={false}
          key={i}
          food={food}
        />
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
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealsCard;
