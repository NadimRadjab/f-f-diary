import React, { useState } from "react";
import { View, Text, ScrollView } from "native-base";
import { Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../styles/global";
import SetWeightModal from "../../../components/Profile/SetWeightModal";
import { useAppDipsatch, useAppSelector } from "../../../redux/hooks";
import { setCurrentWeight } from "../../../redux/features/Profile/thunks";
import Loading from "../../../components/Utils/Loading";
import { colors } from "../../../styles/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GoalsParamList } from "../../../routs/Profile/types";
import Chart from "../../../components/Profile/Goals/Chart";
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
            {!profile.progressData?.startingWeight.weight.length
              ? "0kg"
              : `${profile.progressData.startingWeight?.weight} kg `}
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
            {!profile.progressData?.currentWeight?.length
              ? "0"
              : profile.progressData.currentWeight.slice(-1).pop()?.weight}
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
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          p="2"
        >
          <View p="2" alignItems="center">
            <Text fontSize={17}>Current Calories</Text>
            <Text fontSize={16}>{profile.progressData?.currentCalories}</Text>
          </View>
          <View p="2" alignItems="center">
            <Text fontSize={17}> Goal Weight</Text>
            <Text fontSize={16}>
              {profile.progressData?.goalWeight &&
                `${profile.progressData?.goalWeight} kg`}
            </Text>
          </View>
        </View>
      </View>
      <View p="2" m="3" alignItems="center">
        {profile.isLoading ? (
          <Loading />
        ) : (
          <Chart currentWeightData={profile.progressData.currentWeight} />
        )}
      </View>
    </ScrollView>
  );
};

export default GoalsScreen;
