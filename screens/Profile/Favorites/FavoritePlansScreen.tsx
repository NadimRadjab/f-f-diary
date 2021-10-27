import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import PlanCard from "../../../components/Profile/Favorites/PlanCard";
import CustomText from "../../../components/UI/CustomText";
import { Recipe } from "../../../redux/features/Recipes/type";
import { WeeklyPlan } from "../../../redux/features/WeeklyPlans/types";
import { useAppSelector } from "../../../redux/hooks";
import { FavoritesParamList } from "../../../routs/Profile/types";

const FavoritePlansScreen = () => {
  const plans = useAppSelector((state) => state.profile.favorites.plans);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<FavoritesParamList, "FavoritesItems">
    >();
  const handleLocation = (
    plan: WeeklyPlan[],
    planParams: { id: string; date: Date | string }
  ) => {
    navigation.navigate("PlanDetails", { plan, planParams });
  };
  return (
    <View flex="1" w="100%" justifyContent="center" alignItems="center">
      {!plans.length ? (
        <CustomText>Add some plans to favorites.</CustomText>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
          data={plans}
          renderItem={(items) => (
            <PlanCard
              handleLocation={handleLocation}
              number={items.index}
              plan={items.item}
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritePlansScreen;
