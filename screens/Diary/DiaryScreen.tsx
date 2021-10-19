import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiaryParamList } from "../../routs/NavigationTypes";
import { Heading, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import MealsCard from "../../components/Diary/MealsCard";
import {
  getPageCalories,
  getMealCalories,
  createNewPage,
  getOwnerDiary,
} from "../../redux/features/Diary/diarySlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { mealCreator } from "../../helpers/helpers";
import Loading from "../../components/Utils/Loading";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
}) => {
  const pages = useAppSelector((state) => state.diary.pages);
  const diaryId = useAppSelector((state) => state.diary.id);
  const isLoading = useAppSelector((state) => state.diary.isLoading);
  const dispatch = useAppDipsatch();
  const [prevPage, setPrevPage] = useState<number>(
    pages.length ? pages.length - 1 : 0
  );

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
      headerTitle: () =>
        isLoading ? (
          <Text>
            <Loading />
          </Text>
        ) : Platform.OS === "ios" ? (
          <Text p="2" fontSize="xl">
            Page: {pageNumber.toString()}
          </Text>
        ) : (
          <Text p="3" fontSize="xl">
            Page: {pageNumber.toString()}
          </Text>
        ),

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
    dispatch(getMealCalories(pageNumber.toString()));
    dispatch(getPageCalories(pageNumber.toString()));
  }, [dispatch, prevPage, pages]);
  useEffect(() => {
    dispatch(getOwnerDiary("u1"));
  }, [dispatch]);
  useEffect(() => {
    setPrevPage(pages.length - 1);
  }, [pages.length]);
  if (isLoading) return <Loading />;
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
                  inPage: string;
                  id: string;
                  foods: {}[];
                  calories: number;
                  mealNumber: number;
                },
                i
              ) => <MealsCard meal={meal} key={i} />
            )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
