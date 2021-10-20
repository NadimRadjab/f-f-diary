import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView } from "native-base";
import React, { useEffect } from "react";
import FoodList from "../../../components/Diary/FoodList";
import { getScannedFood } from "../../../redux/features/Diary/foodSlice";
import { useAppDipsatch, useAppSelector } from "../../../redux/hooks";
import { DiaryTopParamList } from "../../../routs/NavigationTypes";

const SearchAllScreen = () => {
  const foods = useAppSelector((state) => state.foods.foods);
  const route = useRoute<RouteProp<DiaryTopParamList, "Search">>();

  return (
    <ScrollView flex="1" mt="3">
      {foods?.map((food) => (
        <FoodList
          pageId={null}
          mealId={route.params.mealId}
          isSearched
          key={food.id}
          food={food}
        />
      ))}
    </ScrollView>
  );
};

export default SearchAllScreen;
