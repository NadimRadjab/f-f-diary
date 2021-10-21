import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, View, PresenceTransition } from "native-base";
import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Filters from "../../components/Recipe/Filters";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeSearch from "../../components/Recipe/RecipeSearch";
import Loading from "../../components/Utils/Loading";
import { getRecipes } from "../../redux/features/Recipes/recipeSlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { RecipieParamList } from "../../routs/NavigationTypes";
import filtersData from "../../seeds/filtersData";

const RecipeScreen = () => {
  const [filters, setFilters] = useState(filtersData);
  const [selected, setSelected] = useState<any>([]);
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const isLoading = useAppSelector((state) => state.recipes.isLoading);
  const dispatch = useAppDipsatch();
  const [isOpen, setIsOpen] = useState(false);

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
      <PresenceTransition
        visible={isOpen}
        initial={{ translateY: -350 }}
        animate={{ translateY: 0, transition: { duration: 550 } }}
      >
        <RecipeSearch handleQuery={handleQuery} />
        <View w="100%" alignItems="center">
          <Text mb="4" fontSize="16">
            Applied Filters
          </Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          mb="4"
          w="100%"
          horizontal={true}
        >
          {filters.map((filter, i) => {
            if (filter.isSelected) {
              return (
                <Filters
                  key={i}
                  color={filter.color}
                  id={filter.id}
                  handleFilters={handleFilters}
                  title={filter.title}
                />
              );
            }
          })}
        </ScrollView>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          borderWidth="1"
          p="2"
          horizontal={true}
          borderColor="warmGray.100"
          flexDirection="row"
          contentContainerStyle={{ justifyContent: "space-around" }}
        >
          {filters.map((filter, i) => {
            if (filter.isSelected) return null;
            if (!filter.isSelected)
              return (
                <Filters
                  key={i}
                  color={filter.color}
                  id={filter.id}
                  handleFilters={handleFilters}
                  title={filter.title}
                />
              );
          })}
        </ScrollView>
      </PresenceTransition>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          onScroll={(e) => {
            if (e.nativeEvent.contentOffset.y > 0) setIsOpen(false);
            if (e.nativeEvent.contentOffset.y <= 200) setIsOpen(true);
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => {
            return <RecipeCard recipe={item.item} />;
          }}
        />
      )}
    </View>
  );
};

export default RecipeScreen;
