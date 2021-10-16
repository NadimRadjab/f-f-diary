import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import MealsCard from "../../components/Diary/MealsCard";
import {
  addList,
  getPageCalories,
} from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { DiaryParamList } from "../../routs/DiaryStacks/DiaryParamList";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
}) => {
  const pages = useAppSelector((state) => state.diary.pages);
  const dispatch = useAppDipsatch();
  const [prevPage, setPrevPage] = useState<number>(pages.length - 1);

  const lastPage = pages[prevPage];

  const handleLocation = () => {
    navigation.navigate("FoodSearch", { title: "Meal 1" });
  };

  const handleNewPage = () => {
    if (prevPage === pages.length - 1) dispatch(addList());

    setPrevPage(prevPage + 1);
  };

  let pageNumber: number;
  if (prevPage === pages.length - 1) {
    pageNumber = pages.length - 1;
  } else {
    pageNumber = prevPage;
  }
  useEffect(() => {
    navigation.setOptions({
      title: `Page ${pageNumber.toString()}`,
      headerRight: () => (
        <TouchableOpacity onPress={handleNewPage}>
          <Text>
            {pageNumber === pages.length - 1 ? "New Page" : "Next Page"}
          </Text>
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
  }, [prevPage, pages]);
  useEffect(() => {
    dispatch(getPageCalories());
  }, [dispatch]);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }} marginTop="20">
      {!pages.length
        ? null
        : lastPage?.meals.map(
            (meal: { id: string; foods: {}[]; calories: number }, i) => (
              <MealsCard meal={meal} key={i} handleLocation={handleLocation} />
            )
          )}

      {/* <MealsCard handleLocation={handleLocation} /> */}
    </ScrollView>
  );
};

export default HomeScreen;
