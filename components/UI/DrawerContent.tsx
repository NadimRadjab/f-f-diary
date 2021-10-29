import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Title, Caption, Paragraph, Drawer, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "native-base";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/Auth/authSlice";
const DrawerContent = (props: DrawerContentComponentProps) => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDipsatch();
  return (
    <View flex="1">
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View flexDirection="row" mt="15">
              <Avatar.Image
                source={{
                  uri: !profile.personalData.image
                    ? "https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-hand-drawn-modern-vector-id1273297997?k=20&m=1273297997&s=612x612&w=0&h=EkhPspb58IrPQnchFVjZFrz5R1hnCZJTTH_l34J2EtU="
                    : profile.personalData.image,
                }}
                size={60}
              />

              <View ml="6">
                <Title style={styles.title}>
                  {profile.personalData.name
                    ? profile.personalData.name
                    : "Example Name"}
                </Title>
                <Caption style={styles.caption}>
                  {profile.personalData.email
                    ? profile.personalData.email
                    : "example@gmail.com"}
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>Calories</Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {!profile.progressData.currentCalories
                    ? 0
                    : profile.progressData.currentCalories}
                </Paragraph>
              </View>
              <View style={styles.section}>
                <Caption style={styles.caption}>Current Weight</Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {!profile.progressData.currentWeight?.length
                    ? 0
                    : profile.progressData.currentWeight.slice(-1).pop()
                        ?.weight}
                  kg
                </Paragraph>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="star-box-multiple-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Favorties"
              onPress={() => {
                props.navigation.navigate("Favorites");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("ProfileSettings");
              }}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => {
            dispatch(logOut());
          }}
        />
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
export default DrawerContent;
