import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiaryParamList } from "../../routs/NavigationTypes";
import { Heading, ScrollView, View } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
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
import CustomText from "../../components/UI/CustomText";
import CustomHeader from "../../components/UI/CustomHeader";
import { getUserProfile } from "../../redux/features/Profile/thunks";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DiaryParamList, "DiaryStack">;
}) => {
  const pages = useAppSelector((state) => state.diary.pages);
  const diaryId = useAppSelector((state) => state.diary.id);
  const isLoading = useAppSelector((state) => state.diary.isLoading);
  const userId = useAppSelector((state) => state.auth.userId);
  const profile = useAppSelector((state) => state.profile);
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
    dispatch(getMealCalories(pageNumber.toString()));
    dispatch(getPageCalories(pageNumber.toString()));
  }, [dispatch, prevPage, pages]);
  useEffect(() => {
    dispatch(getOwnerDiary(userId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch]);
  useEffect(() => {
    setPrevPage(pages.length - 1);
  }, [pages.length]);
  if (isLoading) return <Loading />;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <CustomHeader>
        {prevPage === 0 ? null : (
          <TouchableOpacity
            onPress={() => {
              setPrevPage(prevPage - 1);
            }}
          >
            <CustomText>Prev Page</CustomText>
          </TouchableOpacity>
        )}

        <CustomText alignSelf="center" size={"19"}>
          Page: {pageNumber}
        </CustomText>

        <TouchableOpacity onPress={handleNewPage}>
          <CustomText>
            {pageNumber === pages.length - 1 ? "New Page" : "Next Page"}
          </CustomText>
        </TouchableOpacity>
      </CustomHeader>
      <Heading color="warmGray.700" p="7">
        Daily Calories Left: {""}
        {!profile.progressData.currentCalories
          ? "0"
          : `${
              (profile.progressData?.currentCalories as any) -
              pages[pageNumber]?.totalcal
            } `}
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
