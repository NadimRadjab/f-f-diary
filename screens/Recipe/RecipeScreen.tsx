import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, SectionList, Text, View } from "native-base";
import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeSearch from "../../components/Recipe/RecipeSearch";
import { getRecipes } from "../../redux/features/Recipes/recipeSlice";
import { useAppDipsatch } from "../../redux/hooks";
import { RecipieParamList } from "../../routs/NavigationTypes";
import filtersData from "../../seeds/filtersData";

const RecipeScreen = () => {
  const [filters, setFilters] = useState(filtersData);
  const [selected, setSelected] = useState<any>([]);
  const dispatch = useAppDipsatch();
  const handleFilters = (id: string): void => {
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
  const handleQuery = (recipe: string) => {
    dispatch(getRecipes({ selected, recipe }));
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RecipieParamList, "RecipeStack">>();

  return (
    <View bg="white" flex="1">
      <RecipeSearch handleQuery={handleQuery} />
      <View w="100%" alignItems="center">
        <Text fontSize="16">Applied Filters</Text>
        <ScrollView>
          <ScrollView mb="4" w="300" horizontal={true}>
            {filters.map((filter, i) => {
              if (filter.isSelected) {
                return (
                  <TouchableOpacity
                    onPress={() => handleFilters(filter.id)}
                    style={{ margin: 4, width: "35%" }}
                    key={i}
                  >
                    <View
                      w="90%"
                      alignItems="center"
                      borderRadius="10"
                      bg={filter.color}
                    >
                      <Text fontSize="15" color="light.800">
                        {filter.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </ScrollView>
      </View>
      <View
        borderWidth="1"
        p="2"
        borderColor="warmGray.100"
        flexDirection="row"
        overflow="hidden"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {filters.map((f, i) => (
          <TouchableOpacity
            onPress={() => handleFilters(f.id)}
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

      <RecipeCard />
    </View>
  );
};

export default RecipeScreen;
