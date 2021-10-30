import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "native-base";
import React, { useEffect, useState } from "react";
import FoodList from "../../../components/Diary/FoodList";
import CustomText from "../../../components/UI/CustomText";
import Loading from "../../../components/Utils/Loading";
import { useAppSelector } from "../../../redux/hooks";
import { DiaryTopParamList } from "../../../routs/NavigationTypes";
import { Snackbar } from "react-native-paper";
const SearchAllScreen = () => {
  const [isFoodAdded, setIsFoodAdded] = useState("");
  const [visible, setVisible] = useState(false);
  const foods = useAppSelector((state) => state.foods);
  const route = useRoute<RouteProp<DiaryTopParamList, "Search">>();
  const handleSnackBar = (title: string) => {
    setIsFoodAdded(title);
  };
  useEffect(() => {
    if (isFoodAdded.length) setVisible(true);
  }, [isFoodAdded]);
  console.log(isFoodAdded);

  if (foods.isLoading) return <Loading />;
  if (!foods.foods?.length)
    return (
      <View justifyContent="center" alignItems="center" flex="1">
        <CustomText>Search for a food.</CustomText>
      </View>
    );

  return (
    <View flex="1">
      <Snackbar
        style={{ backgroundColor: "#2C2F33" }}
        visible={visible}
        duration={1000}
        onDismiss={() => setVisible(false)}
      >
        {`${isFoodAdded.substr(0, 15)}...   has been added. `}
      </Snackbar>
      <ScrollView mt="3">
        {foods.foods?.map((food) => (
          <FoodList
            handleSnackBar={handleSnackBar}
            pageId={null}
            mealId={route.params.mealId}
            isSearched
            key={food.id}
            food={food}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchAllScreen;
