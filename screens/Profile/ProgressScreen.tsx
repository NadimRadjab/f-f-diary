import React, { useState } from "react";
import { View, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import SetWeightModal from "../../components/Profile/SetWeightModal";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { setCurrentWeight } from "../../redux/features/Profile/profileSlice";

const ProgressScreen = () => {
  const [openModel, setOpenModel] = useState(false);
  const [isCurrentWeight, setIsCurrentWeight] = useState(false);
  const profile = useAppSelector((state) => state.profile);
  const handleClose = () => {
    setOpenModel(false);
  };
  const dipsatch = useAppDipsatch();
  const handleSubmit = (weight: string) => {
    dipsatch(setCurrentWeight({ weight, profileId: profile.profileId }));
  };
  return (
    <View flex="1">
      <SetWeightModal
        handleSubmit={handleSubmit}
        isCurrentWeight={isCurrentWeight}
        handleClose={handleClose}
        isOpen={openModel}
      />
      <View w="100%" h="250" bg="#fff" shadow="4">
        <TouchableOpacity
          onPress={() => {
            setOpenModel(true);
            setIsCurrentWeight(true);
          }}
          style={globalStyles.touchableList}
        >
          <Text p="2">Set Current Weight</Text>
          <Text p="5">{profile.progressData?.currentWeight}kg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenModel(true);
            setIsCurrentWeight(false);
          }}
          style={globalStyles.touchableList}
        >
          <Text p="2">Set Goal Weight</Text>
          <Text p="5">{profile.progressData?.goalWeight}kg</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProgressScreen;
