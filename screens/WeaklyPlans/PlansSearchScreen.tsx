import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View } from "native-base";
import { Animated } from "react-native";
import Filters from "../../components/Recipe/Filters";
import CustomSearch from "../../components/UI/CustomSearch";
import { useAppDipsatch } from "../../redux/hooks";
import { WeaklyParamList } from "../../routs/NavigationTypes";
import filtersData from "../../seeds/filtersData";
import { getPlan } from "../../redux/features/WeeklyPlans/weeklyPlansSlice";

import CustomText from "../../components/UI/CustomText";
import { justifyContent } from "styled-system";

const PlansSearchScreen = () => {
  const [filters, setFilters] = useState(filtersData);
  const [selected, setSelected] = useState<any>([]);

  const dispatch = useAppDipsatch();

  const handleFilters = (id: string): void => {
    const newArr = filters.map((item) => {
      if (item.id === id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    const query = filters
      .map((item) => {
        if (item.isSelected) return item.title;
      })
      .filter((u) => u !== undefined);

    setFilters(newArr);
    setSelected(query);
  };
  const navigation =
    useNavigation<
      NativeStackNavigationProp<WeaklyParamList, "weaklyPlansSearch">
    >();

  const handleQuery = (calories: string) => {
    dispatch(getPlan({ selected, calories }));
    navigation.navigate("weeklyplan");
  };

  const HEADER_HIGHT = 110;
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HIGHT);
  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HIGHT],
    outputRange: [0, -HEADER_HIGHT],
  });

  return (
    <View
      style={{
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        // flexDirection="row"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomSearch
          handleQuery={handleQuery}
          selectedFilters={selected}
          placeholder={"Set calories..."}
        />
        <View h="150" justifyContent="space-between">
          {filters.map((filter, i) => {
            return (
              <Filters
                key={i}
                color={!filter.isSelected ? filter.color : "warmGray.400"}
                id={filter.id}
                handleFilters={handleFilters}
                title={filter.title}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PlansSearchScreen;
