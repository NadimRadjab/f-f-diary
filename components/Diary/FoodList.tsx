import { View, Text } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { addNewFood } from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { v4 as uuidv4 } from "uuid";
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
      id: uuidv4(),
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
