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
      <View bg="#fffffc" shadow={3} style={styles.listContainer}>
        <View p="3">
          <View alignItems="center" justifyContent="center">
            <Text fontSize="17">{food.title}</Text>
          </View>

          <View
            mt="2"
            borderTopWidth="0.5"
            borderTopColor="warmGray.300"
            flexDirection="row"
            justifyContent="space-between"
          >
            <View mt="3">
              <Text>
                {food.servingsSize && `Searving Size: ${food.servingsSize}`}
              </Text>
            </View>
            <View mt="3">
              <Text>
                kcal: {isSearched ? food.nutrition?.calories : food.calories}
              </Text>
            </View>
          </View>
        </View>
        <View alignItems="flex-end">
          <TouchableOpacity onPress={handleDeleteMeal}>
            <Text p="1" color="red.700">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: 3,
    width: "100%",
  },
});

export default PageFoodList;
