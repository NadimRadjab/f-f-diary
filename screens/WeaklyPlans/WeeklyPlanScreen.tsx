import { View, ScrollView, IconButton, Icon, Text } from "native-base";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/UI/CustomHeader";
import CustomText from "../../components/UI/CustomText";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../components/Utils/Loading";
import CustomCard from "../../components/UI/CustomCard";
import { Ionicons } from "@expo/vector-icons";

const WeeklyPlanScreen = () => {
  const weeklyPlan = useAppSelector((state) => state.plans.plans);
  const isLoading = useAppSelector((state) => state.plans.isLoading);
  const [prevDay, setPrevDay] = useState<number>(0);

  const lastDay = weeklyPlan[prevDay];

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
  if (isLoading) return <Loading />;
  return (
    <View>
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
