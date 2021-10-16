import { ScrollView } from "native-base";
import React from "react";
import FoodList from "../../../components/Diary/FoodList";
import { useAppSelector } from "../../../redux/hooks";

const SearchAllScreen = () => {
  const foods = useAppSelector((state) => state.foods.foods);
  return (
    <ScrollView flex="1" mt="3">
      {foods?.map((food) => (
        <FoodList key={food.id} food={food} />
      ))}
    </ScrollView>
  );
};

export default SearchAllScreen;
{
}
