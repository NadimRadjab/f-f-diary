import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../../components/Utils/Loading";
import { addNewFood } from "../../redux/features/Diary/diarySlice";
import { getScannedFood } from "../../redux/features/Diary/foodSlice";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { DiaryParamList } from "../../routs/NavigationTypes";

const FoodDetailsScreen = () => {
  const food = useAppSelector((state) => state.foods.scannedFood);
  const isLoading = useAppSelector((state) => state.foods.isLoading);
  const diaryId = useAppSelector((state) => state.diary.id);
  const [items, setItems] = useState<any>({
    ["energy-kcal"]: "",
    fat: "",
    ["saturated-fat"]: "",
    carbohydrates: "",
    fiber: "",
    proteins: "",
    salt: "",
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

  const handleAddFood = () => {
    let newFood = {
      id: food._id,
      title: food.product_name,
      servingsSize: food.serving_size,
      servingsNumber: food.serving_quantity,
      calories: items["energy-kcal"],
      badges: food._keywords,
      description: food.ingredients_text,
      images: food.image_front_url,
      nutrition: food.nutriments,
    };
    const newObj = {
      mealId: route.params?.mealId,
      newFood,
      diaryId,
    };

    dispatch(addNewFood(newObj));
    navigation.navigate("DiaryStack");
  };

  useEffect(() => {
    dispatch(getScannedFood(route.params?.data));
  }, [dispatch, route.params?.data]);
  useEffect(() => {
    navigation.setOptions({
      title:
        food.product_name.length > 20
          ? `${food.product_name.substr(0, 20)}...`
          : food.product_name,
      headerRight: () => (
        <TouchableOpacity onPress={handleAddFood}>
          <Text color="#0369a1" fontSize="16">
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, food.product_name]);
  const createTabele = () => {
    return Object.keys(items).map((key, i) => (
      <View key={i}>
        <View
          borderColor="light.600"
          borderWidth="1"
          backgroundColor={
            key === "sodium" || key === "saturated-fat"
              ? "lightBlue.100"
              : "lightBlue.200"
          }
          p="2"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text>
            {key === "energy-kcal"
              ? "Energy (kcal)"
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Text>
            {key === "energy-kcal" ? items[key] + " kcal" : items[key] + " g"}
          </Text>
        </View>
      </View>
    ));
  };

  if (isLoading) return <Loading />;
  return (
    <ScrollView
      flex="1"
      w="100%"
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View w="100%" alignItems="center" p="4">
        <Image
          style={{ width: 400, height: 300 }}
          source={{ uri: food.image_front_url }}
        />
      </View>
      <View
        borderRightColor="light.400"
        w="95%"
        borderWidth="1"
        borderRadius="20"
        backgroundColor="light.200"
        p="5"
        alignItems="center"
      >
        <Text mb="3" fontSize="xl">
          Description
        </Text>
        <View>
          <Text color="light.800">
            {!food.ingredients_text
              ? "No description is currently found."
              : food.ingredients_text}
          </Text>
        </View>
      </View>
      <View flex="1" p="5" w="100%">
        <View
          borderWidth="1"
          justifyContent="space-between"
          alignItems="stretch"
          backgroundColor="lightBlue.300"
          p="5"
          borderColor="light.500"
          flexDirection="row"
        >
          <Text color="warmGray.600" fontSize="lg">
            Nutrition facts
          </Text>
          <Text color="warmGray.600" alignSelf="flex-end" fontSize="sm">
            As sold for 100g/100ml
          </Text>
        </View>
        {createTabele()}
      </View>
    </ScrollView>
  );
};

export default FoodDetailsScreen;
