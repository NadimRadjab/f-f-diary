import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import RecipeCard from "../../../components/Recipe/RecipeCard";
import CustomText from "../../../components/UI/CustomText";
import { Recipe } from "../../../redux/features/Recipes/type";
import { useAppSelector } from "../../../redux/hooks";
import { FavoritesParamList } from "../../../routs/Profile/types";

const FavoritesRecipesScreen = () => {
  const recipes = useAppSelector((state) => state.profile.favorites.recipes);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<FavoritesParamList, "FavoritesItems">
    >();
  const handleLocation = (recipe: Recipe) => {
    navigation.navigate("RecipeDetails", { recipe });
  };
  return (
    <View flex="1" w="100%" justifyContent="center" alignItems="center">
      {!recipes.length ? (
        <CustomText>Add some recipes to favorites.</CustomText>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
          data={recipes}
          renderItem={(items) => (
            <RecipeCard
              handleLocation={handleLocation}
              isInFavorites
              recipe={items.item}
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritesRecipesScreen;
