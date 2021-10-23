import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, ScrollView, View, Text } from "native-base";
import { Animated } from "react-native";
import Filters from "../../components/Recipe/Filters";
import CustomSearch from "../../components/UI/CustomSearch";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { WeaklyParamList } from "../../routs/NavigationTypes";
import filtersData from "../../seeds/filtersData";
import { getPlan } from "../../redux/features/WeeklyPlans/weeklyPlansSlice";

const PlansSearchScreen = () => {
  const [filters, setFilters] = useState(filtersData);
  const [selected, setSelected] = useState<any>([]);

  const plan = useAppSelector((state) => state.plans.plans);

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

  const handleQuery = (calories: string): void => {
    if (!calories) return;
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
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <View
        p="2"
        w="100%"
        h="200"
        justifyContent="center"
        alignItems="center"
        shadow="4"
        bg="#fff"
      >
        <View
          h="30"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
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
          </ScrollView>
        </View>

        <CustomSearch
          isSearching={false}
          handleQuery={handleQuery}
          selectedFilters={selected}
          placeholder={"Set daily calories..."}
        />
        {plan.length ? (
          <Button
            onPress={() => {
              navigation.navigate("weeklyplan");
            }}
            colorScheme="success"
            m="1"
          >
            GO TO MEAL PLAN
          </Button>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default PlansSearchScreen;
