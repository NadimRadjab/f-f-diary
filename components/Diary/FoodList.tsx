import { View, Text, Button, Box, IconButton } from "native-base";
import React, { ReactComponentElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { addNewFood, deleteFood } from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";

interface Props {
  food: any;
  mealId: string;
  isSearched: boolean;
  pageId: string | null;
}
const FoodList = ({ mealId, food, isSearched }: Props) => {
  const diaryId = useAppSelector((state) => state.diary.id);
  const dispatch = useAppDipsatch();
  const handleMeal = () => {
    if (!isSearched) return;
    const newFood = {
      id: food.id,
      title: food.title,
      servingsSize: food.servings.size,
      servingsNumber: food.servings.number,
      calories: food.nutrition?.calories,
      badges: food.badges,
      description: food.description,
      images: food.images,
      nutrition: food.nutrition,
    };
    const items = {
      mealId: mealId,
      newFood,
      diaryId,
    };

    dispatch(addNewFood(items));
  };
  let cView: any = TouchableOpacity;
  if (!isSearched) {
    cView = <View></View>;
  }
  return (
    <TouchableOpacity onPress={handleMeal} style={styles.screen}>
      <View bg="#fffffc" style={styles.listContainer}>
        <View p="3" style={styles.list}>
          <View justifyContent="space-around">
            <Text>{food.title}</Text>
          </View>

          <View
            mt="2"
            borderTopWidth="0.3"
            flexDirection="row"
            justifyContent="space-between"
          >
            <View>
              <Text>Searvings Size: {food.servings.size}</Text>
            </View>

            <Text>kcal: {food.nutrition?.calories}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  screen: {},
  listContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 4,
  },
  list: {
    width: "100%",
    height: 110,
    justifyContent: "space-between",
  },
});

export default FoodList;
