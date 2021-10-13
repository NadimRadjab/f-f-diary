import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "native-base";
import React from "react";

import MealsCard from "../../components/Diary/MealsCard";
import { DiaryParamList } from "../../routs/DiaryStacks/DiaryParamList";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
}) => {
  const handleLocation = () => {
    navigation.navigate("FoodSearch", { title: "Meal 1" });
  };
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }} marginTop="20">
      <MealsCard handleLocation={handleLocation} />
    </ScrollView>
  );
};

export default HomeScreen;
