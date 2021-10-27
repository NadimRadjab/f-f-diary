import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View } from "native-base";
import React, { useState } from "react";
import { Animated, Platform } from "react-native";
import Filters from "../../components/Recipe/Filters";
import RecipeCard from "../../components/Recipe/RecipeCard";
import CustomSearch from "../../components/UI/CustomSearch";
import Loading from "../../components/Utils/Loading";
import { getRecipes } from "../../redux/features/Recipes/recipeSlice";
import { Recipe } from "../../redux/features/Recipes/type";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { RecipieParamList } from "../../routs/NavigationTypes";
import filtersData from "../../seeds/filtersData";

const RecipeScreen = () => {
  const [filters, setFilters] = useState(filtersData);
  const [selected, setSelected] = useState<any>([]);
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const isLoading = useAppSelector((state) => state.recipes.isLoading);
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
  const handleLocation = (recipe: Recipe) => {
    navigation.navigate("RecipeDetails", { recipe });
  };
  const HEADER_HIGHT = 110;
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HIGHT);
  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HIGHT],
    outputRange: [0, -HEADER_HIGHT],
  });

  return (
    <View flex="1" bg="white">
      <Animated.View
        style={{
          zIndex: 1000,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          backgroundColor: "white",
          height: 105,

          transform: [{ translateY: headerY }],
        }}
      >
        <CustomSearch
          isSearching
          placeholder={"Search for a recipe..."}
          selectedFilters={selected}
          handleQuery={handleQuery}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          borderBottomWidth="1"
          mb="1"
          horizontal={true}
          borderColor="warmGray.100"
          flexDirection="row"
          contentContainerStyle={{ justifyContent: "space-around" }}
        >
          {filters.map((filter, i) => {
            return (
              <Filters
                key={i}
                color={!filter.isSelected ? filter.color : "warmGray.400"}
                id={filter.id}
                handleFilters={handleFilters}
                title={filter.title}
              />
            );
          })}
        </ScrollView>
      </Animated.View>
      {isLoading ? (
        <Loading />
      ) : (
        <Animated.FlatList
          bounces={false}
          scrollEventThrottle={16}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          style={{ flex: 1, paddingBottom: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => {
            return (
              <RecipeCard
                isInFavorites={false}
                handleLocation={handleLocation}
                recipe={item.item}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default RecipeScreen;
