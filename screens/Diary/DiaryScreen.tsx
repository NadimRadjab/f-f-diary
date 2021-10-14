import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import MealsCard from "../../components/Diary/MealsCard";
import { addList } from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { DiaryParamList } from "../../routs/DiaryStacks/DiaryParamList";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
}) => {
  const diary = useAppSelector((state) => state.diary.diary);
  const dispatch = useAppDipsatch();
  const [prevPage, setPrevPage] = useState<number>(diary.length - 1);

  const lastPage = diary[prevPage];

  const handleLocation = () => {
    navigation.navigate("FoodSearch", { title: "Meal 1" });
  };

  const handleNewPage = () => {
    if (prevPage === diary.length - 1) dispatch(addList());

    setPrevPage(prevPage + 1);
  };

  let pageNumber: number;
  if (prevPage === diary.length - 1) {
    pageNumber = diary.length - 1;
  } else {
    pageNumber = prevPage;
  }
  useEffect(() => {
    navigation.setOptions({
      title: `Page ${pageNumber.toString()}`,
      headerRight: () => (
        <TouchableOpacity onPress={handleNewPage}>
          <Text>New Page</Text>
        </TouchableOpacity>
      ),
      headerLeft: () =>
        prevPage === 0 ? null : (
          <TouchableOpacity
            onPress={() => {
              setPrevPage(prevPage - 1);
            }}
          >
            <Text>Prev Page</Text>
          </TouchableOpacity>
        ),
    });
  }, [prevPage, diary]);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }} marginTop="20">
      {!diary.length
        ? null
        : lastPage?.meals.map((meal: {}, i) => (
            <MealsCard meal={meal} key={i} handleLocation={handleLocation} />
          ))}

      {/* <MealsCard handleLocation={handleLocation} /> */}
    </ScrollView>
  );
};

export default HomeScreen;
