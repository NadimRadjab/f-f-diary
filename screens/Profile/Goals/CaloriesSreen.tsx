import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Heading } from "native-base";
import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import ResultCard from "../../../components/Profile/Goals/Results/ResultCard";
import CustomText from "../../../components/UI/CustomText";
import { GoalsParamList } from "../../../routs/Profile/types";
import { colors } from "../../../styles/colors";
type Props = NativeStackScreenProps<GoalsParamList, "Calories">;

const CaloriesSreen = ({ navigation, route }: Props) => {
  const { results } = route.params;
  const [calories, setCalories] = useState<number | string>(results.calories);

  return (
    <View flex="1" alignItems="center">
      <View
        p="3"
        bg="white"
        shadow="3"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Your Stats</Heading>
        <Text fontSize={17}>
          You're a{" "}
          <Text fontSize={17} fontWeight="bold">
            {results.age} y/o{" "}
          </Text>
          <Text fontSize={17} fontWeight="bold">
            {results.gender}{" "}
          </Text>
          who is{" "}
          <Text fontSize={17} fontWeight="bold">
            {results.height}
          </Text>{" "}
          cm tall & weights{" "}
          <Text fontSize={17} fontWeight="bold">
            {" "}
            {results.weight}kg
          </Text>{" "}
          with{" "}
          <Text fontSize={17} fontWeight="bold">
            {results.activity}{" "}
          </Text>
          activity score.
        </Text>
      </View>
      <View>
        <View justifyContent="center" p="2" flexDirection="row">
          <ResultCard>
            <Heading>{results.calories}</Heading>
            <CustomText>calories per day</CustomText>
          </ResultCard>

          <ResultCard>
            <Heading>{parseInt(results.calories) * 7}</Heading>
            <CustomText>calories per week</CustomText>
          </ResultCard>
        </View>
        <Text fontSize="15" p="2">
          Based on your stats, the best estimate for your maintenance calories
          is <Text fontWeight="bold">{results.calories}</Text> calories per day
          based on the Mifflin-St Jeor Formula, which is widely known to be the
          most accurate.
        </Text>
      </View>
      <View
        m="3"
        w="100%"
        justifyContent="space-between"
        p="3"
        flexDirection="row"
      >
        <TouchableOpacity
          style={calories == results.calories && style.active}
          onPress={() => setCalories(results.calories)}
        >
          <Text fontSize="16">Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={calories > results.calories && style.active}
          onPress={() => setCalories(parseInt(results.calories) + 500)}
        >
          <Text fontSize="16">Gain Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={calories < results.calories && style.active}
          onPress={() => setCalories(parseInt(results.calories) - 500)}
        >
          <Text fontSize="16">Lose Weight</Text>
        </TouchableOpacity>
      </View>
      <View alignItems="center">
        <ResultCard>
          <Heading p="1">{calories}</Heading>
          <CustomText>calories per day</CustomText>
        </ResultCard>
      </View>
      <View p="2" w="35%" m="2">
        <Button color={colors.primaryBlue} title="Set" />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  active: {
    borderBottomColor: "#ccc",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    width: "35%",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
export default CaloriesSreen;
