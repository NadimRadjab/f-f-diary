import React, { useState } from "react";
import { View, Text } from "native-base";
import { Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import SetWeightModal from "../../components/Profile/SetWeightModal";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { setCurrentWeight } from "../../redux/features/Profile/profileSlice";
import Loading from "../../components/Utils/Loading";
import { colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GoalsParamList } from "../../routs/Profile/types";
type Props = NativeStackScreenProps<GoalsParamList, "Progress">;
const GoalsScreen = ({ navigation }: Props) => {
  const [openModel, setOpenModel] = useState(false);
  const [isCurrentWeight, setIsCurrentWeight] = useState(false);
  const profile = useAppSelector((state) => state.profile);
  const handleClose = () => {
    setOpenModel(false);
  };

  const dipsatch = useAppDipsatch();
  const handleSubmit = (weight: string) => {
    dipsatch(
      setCurrentWeight({
        isCurrentWeight,
        weight,
        profileId: profile.profileId,
      })
    );
  };
  if (profile.isLoading) return <Loading />;
  return (
    <View flex="1">
      <SetWeightModal
        handleSubmit={handleSubmit}
        isCurrentWeight={isCurrentWeight}
        handleClose={handleClose}
        isOpen={openModel}
      />
      <View alignItems="center" w="100%" h="280" bg="#fff" p="2" shadow="4">
        <TouchableOpacity
          onPress={() => {
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
    </View>
  );
};

export default GoalsScreen;
