import { ScrollView, View, Text } from "native-base";
import { Alert, Image, Platform, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import InfoList from "../../../components/Profile/ProfileGeneral/InfoList";
import InfoModal from "../../../components/Profile/ProfileGeneral/InfoModal";
import { useAppDipsatch, useAppSelector } from "../../../redux/hooks";
import {
  changeEmailAddresss,
  changeName,
  changeNumber,
  changePassoword,
  deleteUserAccount,
  updateProfileImage,
} from "../../../redux/features/Profile/thunks";
import { clearErrorMessage } from "../../../redux/features/Profile/profileSlice";
import Loading from "../../../components/Utils/Loading";
import { logOut } from "../../../redux/features/Auth/authSlice";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../styles/colors";

const ProfileGeneralScreen = () => {
  const profile = useAppSelector((state) => state.profile);

  const [info, setInfo] = useState<any>({
    Name: false,
    PhoneNumber: false,
    Password: false,
    Email: false,
    LogOut: false,
    DeleteAccount: false,
  });
  let value = {
    isOpen: false,
    value: "",
  };
  for (let v in info) {
    if (info[v]) {
      value = { value: v, isOpen: info[v] };
    }
  }

  const handleInfo = (value: string) => {
    setInfo({ ...info, [value]: true });
  };
  const handleClose = (value: string) => {
    setInfo({ ...info, [value]: false });
  };
  const dispatch = useAppDipsatch();
  const handleSubmit = (
    item: string,
    oldEmail?: string,
    oldPassword?: string
  ) => {
    if (value.value === "Name")
      dispatch(changeName({ name: item, profileId: profile.profileId }));
    if (value.value === "PhoneNumber")
      dispatch(changeNumber({ number: item, profileId: profile.profileId }));
    if (value.value === "Password")
      dispatch(
        changePassoword({
          profileId: profile.profileId,
          email: oldEmail,
          oldPassword: oldPassword,
          newPassword: item,
        })
      );
    if (value.value === "Email")
      dispatch(
        changeEmailAddresss({ email: oldEmail, oldPassword, newEmail: item })
      );
    if (value.value === "DeleteAccount") {
      dispatch(
        deleteUserAccount({ email: oldEmail, oldPassword, value: item })
      );
    }
  };
  useEffect(() => {
    if (profile.personalData.message === "Account Successfully Deleted.") {
      dispatch(logOut());
    }
  }, [dispatch, profile.personalData.message]);

  useEffect(() => {
    if (profile?.personalData?.message?.length) {
      Alert.alert("User Info ", profile.personalData?.message, [
        {
          text: "Ok",
          onPress: () => {
            dispatch(clearErrorMessage());
          },
        },
      ]);
    }
  }, [profile.personalData.message]);

  const askForImagePermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "We need camera roll permission so you can update your profile image."
        );
      }
    }
  };
  const pickImage = async () => {
    askForImagePermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      dispatch(
        updateProfileImage({ image: result.uri, profileId: profile.profileId })
      );
    }
  };
  if (profile.isLoading) return <Loading />;

  return (
    <View>
      <InfoModal
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        items={value}
      />
      <View
        justifyContent="center"
        alignItems="center"
        p="1"
        bg="warmGray.100"
        shadow="3"
      >
        <View m="2" borderRadius={200 / 2} overflow="hidden" w="50%" h="200">
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{
              uri: !profile.personalData.image
                ? "https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-hand-drawn-modern-vector-id1273297997?k=20&m=1273297997&s=612x612&w=0&h=EkhPspb58IrPQnchFVjZFrz5R1hnCZJTTH_l34J2EtU="
                : profile.personalData.image,
            }}
          />
        </View>

        <TouchableOpacity style={{ padding: 2 }} onPress={pickImage}>
          <Text fontSize="16" color={colors.primaryBlue}>
            Edit Image
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView p="1">
        <View bg="white" shadow="2" m="1">
          <InfoList
            info={profile.personalData.name}
            value={"Name"}
            onHandleInfo={handleInfo}
          >
            Name
          </InfoList>
          <InfoList
            info={profile.personalData.number}
            onHandleInfo={handleInfo}
            value={"PhoneNumber"}
          >
            Phone Number
          </InfoList>
          <InfoList onHandleInfo={handleInfo} value={"Password"}>
            Change Password
          </InfoList>
          <InfoList
            info={profile.personalData.email}
            onHandleInfo={handleInfo}
            value={"Email"}
          >
            Change Email Address
          </InfoList>
          <InfoList>Log Out</InfoList>
          <InfoList onHandleInfo={handleInfo} value={"DeleteAccount"}>
            Delete Account
          </InfoList>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileGeneralScreen;
