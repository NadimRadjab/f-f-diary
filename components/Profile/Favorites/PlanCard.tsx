import { View, Heading, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { WeeklyPlan } from "../../../redux/features/WeeklyPlans/types";
import { globalStyles } from "../../../styles/global";
interface Props {
  plan: { id: string; date: string | Date; plan: WeeklyPlan[] };
  number: number;
  handleLocation: (
    plan: WeeklyPlan[],
    planParams: { id: string; date: Date | string }
  ) => void;
}
const PlanCard = ({ number, handleLocation, plan }: Props) => {
  const nutrients = plan?.plan?.map((plan) => {
    return plan.nutrients.calories;
  });
  const averageCalories = nutrients.reduce((prev, cur) => {
    return prev + cur / nutrients.length;
  }, 0);
  const date = new Date(
    !plan.date.seconds ? plan.date : plan.date.seconds * 1000
  ).toLocaleDateString();
  return (
    <View m="2">
      <TouchableOpacity
        onPress={() =>
          handleLocation(plan.plan, { id: plan.id, date: plan.date })
        }
        style={globalStyles.touchableCard}
      >
        <View p="3" m="2" w="95%">
          <Heading>Plan Number: {number + 1}</Heading>
          <View p="2">
            <Text mb="3">
              Average calories per day: {averageCalories.toFixed()}Kcal
            </Text>
            <Text alignSelf="flex-end" m="1">
              Added on: {date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default PlanCard;
