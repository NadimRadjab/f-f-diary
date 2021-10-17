import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiaryParamList } from "../../routs/DiaryStacks/DiaryParamList";
import { Heading, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import MealsCard from "../../components/Diary/MealsCard";
import { v4 as uuidv4 } from "uuid";
import {
  mealCreator,
  getPageCalories,
  getMealCalories,
  createNewPage,
  getOwnerDiary,
} from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
}) => {
  const pages = useAppSelector((state) => state.diary.pages);
  const diaryId = useAppSelector((state) => state.diary.id);
  const dispatch = useAppDipsatch();
  const [prevPage, setPrevPage] = useState<number>(pages.length - 1);

  const lastPage = pages[prevPage];

  const handleNewPage = () => {
    let newArr = [] as any;
    mealCreator(newArr, pages.length.toString());
    const newPage = {
      id: pages.length.toString(),
      date: new Date().toISOString(),
      meals: [] as any,
      totalcal: 0,
    };

    if (prevPage === pages.length - 1)
      dispatch(createNewPage({ diaryId, newPage, newArr }));

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
    dispatch(getMealCalories());
    dispatch(getPageCalories(pageNumber.toString()));
  }, [dispatch, prevPage]);

  useEffect(() => {
    dispatch(getOwnerDiary("u1"));
  }, [dispatch]);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Heading color="warmGray.700" p="7">
        Daily Calories: {pages[pageNumber]?.totalcal}
      </Heading>
      <View style={{ alignItems: "center" }} marginTop="15" w="100%">
        {!pages.length
          ? null
          : lastPage?.meals.map(
              (
                meal: {
                  id: string;
                  foods: {}[];
                  calories: number;
                  mealNumber: number;
                },
                i
              ) => <MealsCard meal={meal} key={i} navigation={navigation} />
            )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
