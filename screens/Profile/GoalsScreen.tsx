import React, { useState } from "react";
import { View, Text, ScrollView } from "native-base";
import { Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import SetWeightModal from "../../components/Profile/SetWeightModal";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { setCurrentWeight } from "../../redux/features/Profile/profileSlice";
import Loading from "../../components/Utils/Loading";
import { colors } from "../../styles/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GoalsParamList } from "../../routs/Profile/types";
import { LineChart } from "react-native-chart-kit";
type Props = NativeStackScreenProps<GoalsParamList, "Progress">;
const GoalsScreen = ({ navigation }: Props) => {
  const [openModel, setOpenModel] = useState(false);
  const [isStartingWeight, setIsStartingWeight] = useState(false);
  const [isCurrentWeight, setIsCurrentWeight] = useState(false);
  const profile = useAppSelector((state) => state.profile);
  const handleClose = () => {
    setOpenModel(false);
  };

  const dipsatch = useAppDipsatch();
  const handleSubmit = (weight: string, date?: Date) => {
    dipsatch(
      setCurrentWeight({
        isCurrentWeight,
        isStartingWeight,
        date,
        weight,
        profileId: profile.profileId,
      })
    );
  };
  const date = profile.progressData?.startingWeight?.date?.seconds;

  if (profile.isLoading) return <Loading />;
  return (
    <ScrollView flex="1">
      <SetWeightModal
        isStartingWeight={isStartingWeight}
        handleSubmit={handleSubmit}
        isCurrentWeight={isCurrentWeight}
        handleClose={handleClose}
        isOpen={openModel}
      />
      <View alignItems="center" w="100%" h="350" bg="#fff" p="2" shadow="4">
        <TouchableOpacity
          onPress={() => {
            setIsStartingWeight(true);
            setOpenModel(true);
            setIsCurrentWeight(true);
          }}
          style={globalStyles.touchableList}
        >
          <Text p="2">Set Starting Weight</Text>
          <Text p="5">
            {!profile.progressData?.currentWeight
              ? "0"
              : `${
                  profile.progressData.startingWeight?.weight
                } kg ${new Date().toISOString(date)}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsStartingWeight(false);
            setOpenModel(true);
            setIsCurrentWeight(true);
          }}
          style={globalStyles.touchableList}
        >
          <Text p="2">Set Current Weight</Text>
          <Text p="5">
            {!profile.progressData?.currentWeight
              ? "0"
              : profile.progressData.currentWeight}
            kg
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenModel(true);
            setIsCurrentWeight(false);
          }}
          style={globalStyles.touchableList}
        >
          <Text p="2">Set Goal Weight</Text>
          <Text p="5">
            {!profile.progressData?.goalWeight
              ? "0"
              : profile.progressData.goalWeight}
            kg
          </Text>
        </TouchableOpacity>
        <View w="50%" m="3" alignItems="center" justifyContent="center">
          <Button
            onPress={() => navigation.navigate("Calculator")}
            title="Calculate Calories"
            color={colors.primaryBlue}
          />
        </View>
        <View alignItems="center" p="2">
          <Text fontSize={17}>Current Calories</Text>
          <Text fontSize={16}>0</Text>
        </View>
      </View>
      <View p="2" m="3" alignItems="center">
        <LineChart
          data={{
            labels: ["January", "May", "September", "December"],
            datasets: [
              {
                data: [77],
              },
            ],
          }}
          width={400}
          height={220}
          yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: colors.primaryBlue,
            backgroundGradientTo: colors.primaryTeal,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "7",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default GoalsScreen;
