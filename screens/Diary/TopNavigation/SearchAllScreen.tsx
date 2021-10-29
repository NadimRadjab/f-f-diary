import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "native-base";
import React from "react";
import FoodList from "../../../components/Diary/FoodList";
import CustomText from "../../../components/UI/CustomText";
import Loading from "../../../components/Utils/Loading";
import { useAppSelector } from "../../../redux/hooks";
import { DiaryTopParamList } from "../../../routs/NavigationTypes";

const SearchAllScreen = () => {
  const foods = useAppSelector((state) => state.foods);
  const route = useRoute<RouteProp<DiaryTopParamList, "Search">>();
  if (foods.isLoading) return <Loading />;
  if (!foods.foods?.length)
    return (
      <View justifyContent="center" alignItems="center" flex="1">
        <CustomText>Search for a food.</CustomText>
      </View>
    );
  return (
    <ScrollView flex="1" mt="3">
      {foods.foods?.map((food) => (
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
