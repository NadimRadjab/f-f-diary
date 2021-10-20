import { Text, View, Badge } from "native-base";
import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import FoodSearch from "../../components/Diary/FoodSearch";
import RecipeCard from "../../components/Recipe/RecipeCard";
import { getRecipes } from "../../redux/features/Recipes/recipeSlice";
import { useAppDipsatch } from "../../redux/hooks";
import filtersData from "../../seeds/filtersData";

const RecipeScreen = () => {
  const [filters, setFilters] = useState(filtersData);
  const [selected, setSelected] = useState<any>([]);
  const dispatch = useAppDipsatch();
  const handleFilters = (key: string, id: string): void => {
    const newArr = filters.map((item) => {
      if (item.id === id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    const query = filters
      .map((item) => {
        if (item.isSelected) return item.title;
      })
      .filter((u) => u !== undefined);

    setFilters(newArr);
    setSelected(query);
  };
  const handleSumbit = () => {
    dispatch(getRecipes(selected));
  };

  return (
    <View bg="white" flex="1">
      <FoodSearch />

      <View
        borderWidth="1"
        p="2"
        borderColor="warmGray.300"
        flexDirection="row"
        overflow="hidden"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {filters.map((f, i) => (
          <TouchableOpacity
            onPress={() => handleFilters(f.title, f.id)}
            style={{ margin: 4, width: "35%" }}
            key={f.id}
          >
            <View
              w="90%"
              alignItems="center"
              borderRadius="10"
              bg={f.isSelected ? "warmGray.300" : f.color}
            >
              <Text fontSize="15" color="light.800">
                {f.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Press" onPress={handleSumbit} />
      <RecipeCard />
    </View>
  );
};

export default RecipeScreen;
