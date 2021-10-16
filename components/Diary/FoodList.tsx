import { View, Text, Divider } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { addFood } from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch } from "../../redux/hooks";

const FoodList = ({ food }) => {
  const dispatch = useAppDipsatch();
  const handleMeal = () => {
    const newObject = {
      title: food.title,
      servingsSize: food.servings.size,
      servingsNumber: food.servings.number,
      calories: food.nutrition?.calories,
    };
    dispatch(addFood(newObject));
  };

  return (
    <TouchableOpacity onPress={handleMeal} style={styles.screen}>
      <View bg="#fffffc" style={styles.listContainer}>
        <View p="3" style={styles.list}>
          <Text>{food.title}</Text>

          <View
            mt="3"
            borderTopWidth="0.3"
            flexDirection="row"
            justifyContent="space-between"
          >
            <View>
              {/* <Text>Searvings Size: {food.servings.size}</Text>
              
              <Text>Searvings Number: {food.servings.number}</Text> */}
            </View>

            {/* <Text>kcal: {food.nutrition?.calories}</Text> */}
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
    padding: 10,
  },
  list: {
    width: "100%",
    height: 110,
    justifyContent: "space-between",
  },
});

export default FoodList;
