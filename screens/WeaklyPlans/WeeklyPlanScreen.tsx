import { View, ScrollView, IconButton, Icon, Text } from "native-base";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/UI/CustomHeader";
import Loading from "../../components/Utils/Loading";
import CustomCard from "../../components/UI/CustomCard";
import CustomText from "../../components/UI/CustomText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { WeeklyParamList } from "../../routs/NavigationTypes";
import { togglePlanInFavorites } from "../../redux/features/Profile/thunks";
import { FavoritesParamList } from "../../routs/Profile/types";
import { Snackbar } from "react-native-paper";

const WeeklyPlanScreen = () => {
  const route = useRoute<RouteProp<FavoritesParamList, "PlanDetails">>();
  const weeklyPlan = !route.params
    ? useAppSelector((state) => state.plans.plans)
    : route.params.plan;
  const generalPlan = !route.params
    ? useAppSelector((state) => state.plans)
    : route.params.planParams;
  const profile = useAppSelector((state) => state.profile);
  const [prevDay, setPrevDay] = useState<number>(0);
  const [isItemInFavorites, setIsItemInFavorites] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState(
    "Plan was added to favorites."
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<WeeklyParamList, "weeklyplan">>();
  const lastDay = weeklyPlan[prevDay];

  const dispatch = useAppDipsatch();

  const handleSubmit = () => {
    dispatch(
      togglePlanInFavorites({
        isItemInFavorites,
        plan: { id: generalPlan.id, plan: weeklyPlan, date: generalPlan.date },
        profileId: profile.profileId,
      })
    );

    setVisible(true);
    if (!isItemInFavorites) {
      setSnackBarText("Plan was added to favorites.");
    } else setSnackBarText("Plan was removed from favorites.");
  };
  const handleNewPage = () => {
    if (prevDay === weeklyPlan.length - 1) return;
    setPrevDay(prevDay + 1);
  };
  let dayNumber: number;

  if (prevDay === weeklyPlan.length - 1) {
    dayNumber = weeklyPlan.length - 1;
  } else {
    dayNumber = prevDay;
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          {profile.isLoading ? (
            <Loading />
          ) : (
            <Ionicons
              name={!isItemInFavorites ? "star-outline" : "star"}
              color="white"
              size={23}
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, profile, handleSubmit]);

  useEffect(() => {
    const isPlan = profile.favorites.plans.some(
      (plan) => plan?.id === generalPlan.id
    );
    setIsItemInFavorites(isPlan);
  }, [handleSubmit]);
  const nutrientsTable = () => {
    return Object.keys(weeklyPlan[dayNumber].nutrients).map((nutr) => (
      <View
        key={nutr}
        justifyContent="space-between"
        p="3"
        overflow="hidden"
        bg="white"
        m="0.5"
        shadow="4"
        flexDirection="row"
        alignItems="center"
      >
        <Text>{nutr}</Text>
        <Text>
          {nutr === "calories"
            ? weeklyPlan[dayNumber].nutrients[nutr] + " kcal"
            : weeklyPlan[dayNumber].nutrients[nutr] + " gr"}
        </Text>
      </View>
    ));
  };

  if (!route.params ? generalPlan.isLoading : null) return <Loading />;
  return (
    <View>
      <Snackbar
        style={{ backgroundColor: "#2C2F33" }}
        visible={visible}
        duration={1000}
        onDismiss={() => setVisible(false)}
      >
        {snackBarText}
      </Snackbar>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomHeader>
          {prevDay === 0 ? null : (
            <IconButton
              onPress={() => {
                setPrevDay(prevDay - 1);
              }}
              icon={<Icon as={Ionicons} name="md-arrow-back-sharp" />}
            />
          )}
          <CustomText mr={"1/6"} size={"16"}>
            {weeklyPlan[dayNumber]?.day.toUpperCase()}
          </CustomText>

          {dayNumber === weeklyPlan.length - 1 ? null : (
            <IconButton
              onPress={handleNewPage}
              icon={<Icon as={Ionicons} name="md-arrow-forward-sharp" />}
            />
          )}
        </CustomHeader>
        <View w="100%" h="270" bg="#fff" shadow="3">
          <Text p="2" fontSize="17" alignSelf="center">
            Daily Nutrients
          </Text>
          {nutrientsTable()}
        </View>

        {weeklyPlan[dayNumber]?.meals.map((meal, i) => (
          <CustomCard item={meal} key={`${meal}: ${i}`} />
        ))}
      </ScrollView>
    </View>
  );
};

export default WeeklyPlanScreen;
