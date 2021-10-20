import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, Image, View, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Utils/Loading";
import { getScannedFood } from "../../redux/features/Diary/foodSlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { DiaryParamList } from "../../routs/NavigationTypes";

const FoodDetailsScreen = () => {
  const food = useAppSelector((state) => state.foods.scannedFood);
  const isLoading = useAppSelector((state) => state.foods.isLoading);
  const [items, setItems] = useState<any>({
    Kcal: "",
    fat: "",
    proteins: "",
    carbohydrates: "",
    fiber: "",
    sodium: "",
  });
  const dispatch = useAppDipsatch();
  const route = useRoute<RouteProp<DiaryParamList>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<DiaryParamList, "ScannedFoodDetails">
    >();
  for (let key in food.nutriments) {
    if (items.hasOwnProperty(key)) {
      items[key] = food?.nutriments[key];
    }
  }
  useEffect(() => {
    dispatch(getScannedFood(route.params?.data));
  }, [dispatch, route.params?.data]);
  useEffect(() => {
    navigation.setOptions({
      title: food.product_name,
    });
  });
  const createTabele = () => {
    return Object.keys(items).map((key: any) => (
      <View>
        <Text>{key}</Text>
        <View>
          <Text>{items[key]}</Text>
        </View>
      </View>
    ));
  };

  if (isLoading) return <Loading />;
  return (
    <ScrollView
      flex="1"
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View p="4">
        <Image
          alt="food image"
          size="2xl"
          source={{ uri: food.image_front_url }}
        />
      </View>
      <View>
        <Text>{food.ingredients_text}</Text>
      </View>
      <View flex="1" flexDirection="column">
        <View>
          <View justifyContent="space-between" flexDirection="row">
            <Text>Nutrition facts</Text>
            <Text>As sold for 100g/100ml</Text>
          </View>
          {createTabele()}
        </View>
      </View>
    </ScrollView>
  );
};

export default FoodDetailsScreen;
