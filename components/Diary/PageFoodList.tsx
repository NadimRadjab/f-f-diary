import { View, Text, IconButton, Button } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { deleteFood } from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  food: any;
  mealId: string;
  isSearched: boolean;
  pageId: string | null;
}
const PageFoodList = ({ pageId, mealId, food, isSearched }: Props) => {
  const diaryId = useAppSelector((state) => state.diary.id);
  const dispatch = useAppDipsatch();
  const handleDeleteMeal = () => {
    dispatch(deleteFood({ pageId, mealId, diaryId, foodId: food.id }));
  };

  return (
    <View w="100%">
      <View bg="#fffffc" style={styles.listContainer}>
        <View p="3" style={styles.list}>
          <View flexDirection="row" justifyContent="space-around">
            <Text>{food.title}</Text>
            {!isSearched && null}
          </View>

          <View
            mt="3"
            borderTopWidth="0.3"
            flexDirection="row"
            justifyContent="space-between"
          >
            <View mt="3">
              <Text>
                Searvings Size:
                {isSearched ? food.servings.size : food.servingsSize}
              </Text>

              <Text>
                Searvings Number:
                {isSearched ? food.servings.number : food.servingsNumber}
              </Text>
            </View>
            <View mt="3">
              <Text>
                kcal: {isSearched ? food.nutrition?.calories : food.calories}
              </Text>
            </View>
          </View>
          <View alignItems="flex-end">
            <TouchableOpacity onPress={handleDeleteMeal}>
              <Text color="red.700">Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    padding: 10,
  },
  list: {
    width: "100%",
  },
});

export default PageFoodList;
