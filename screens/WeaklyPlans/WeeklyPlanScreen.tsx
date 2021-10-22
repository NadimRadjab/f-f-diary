import { View, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/UI/CustomHeader";
import CustomText from "../../components/UI/CustomText";
import { useAppSelector } from "../../redux/hooks";
import { TouchableOpacity } from "react-native";
import Loading from "../../components/Utils/Loading";
import CustomCard from "../../components/UI/CustomCard";

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
  if (isLoading) return <Loading />;
  return (
    <View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <CustomHeader>
          {prevDay === 0 ? null : (
            <TouchableOpacity
              onPress={() => {
                setPrevDay(prevDay - 1);
              }}
            >
              <CustomText>Prev Day</CustomText>
            </TouchableOpacity>
          )}

          <CustomText alignSelf="center" size={"16"}>
            {weeklyPlan[dayNumber]?.day.toUpperCase()}
          </CustomText>

          <TouchableOpacity onPress={handleNewPage}>
            <CustomText>
              {dayNumber === weeklyPlan.length - 1 ? null : "Next Day"}
            </CustomText>
          </TouchableOpacity>
        </CustomHeader>
        {weeklyPlan[dayNumber]?.meals.map((meal, i) => (
          <CustomCard item={meal} key={`${meal}: ${i}`} />
        ))}
      </ScrollView>
    </View>
  );
};

export default WeeklyPlanScreen;
