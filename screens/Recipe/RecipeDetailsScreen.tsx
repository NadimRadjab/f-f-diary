import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AspectRatio, Box, Image, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { RecipieParamList } from "../../routs/NavigationTypes";
import CustomText from "../../components/UI/CustomText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { toggleRecipeInFavorites } from "../../redux/features/Profile/thunks";
import Loading from "../../components/Utils/Loading";
import { Snackbar } from "react-native-paper";
const RecipeDetailsScreen = () => {
  const [isItemInFavorites, setIsItemInFavorites] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState(
    "Recipe was added to favorites."
  );
  const profile = useAppSelector((state) => state.profile);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RecipieParamList, "RecipeDetails">
    >();
  const route = useRoute<RouteProp<RecipieParamList, "RecipeDetails">>();
  const { image, summary, analyzedInstructions, extendedIngredients, id } =
    route.params.recipe;
  const dispatch = useAppDipsatch();

  const handleSubmit = () => {
    dispatch(
      toggleRecipeInFavorites({
        profileId: profile.profileId,
        recipe: route.params.recipe,
        isItemInFavorites,
      })
    );

    setVisible(true);
    if (!isItemInFavorites) {
      setSnackBarText("Recipe was added to favorites.");
    } else setSnackBarText("Recipe was removed from favorites.");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          {profile.isLoading ? (
            <Loading />
          ) : (
            <Ionicons
              name={!isItemInFavorites ? "star-outline" : "star"}
              color="white"
              size={23}
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, profile, handleSubmit]);

  useEffect(() => {
    const isRecipe = profile.favorites.recipes.some(
      (recipe) => recipe?.id === id
    );

    setIsItemInFavorites(isRecipe);
  }, [handleSubmit]);

  return (
    <ScrollView>
      <Box p="1">
        <Snackbar
          style={{ backgroundColor: "#2C2F33" }}
          visible={visible}
          duration={1000}
          onDismiss={() => setVisible(false)}
        >
          {snackBarText}
        </Snackbar>
        <AspectRatio ratio={16 / 9}>
          <Image source={{ uri: image }} alt="recipe image" />
        </AspectRatio>
      </Box>
      <Box
        borderBottomWidth="1"
        borderBottomColor="warmGray.200"
        alignItems="center"
        p="3"
      >
        <CustomText size={"18"}>Description</CustomText>
        <CustomText>
          {summary.substr(0, 400).replace(/<[/]?(b)>/gi, "")}.....
        </CustomText>
      </Box>

      <Box alignItems="center">
        <CustomText size={"17"}>Ingredients</CustomText>
        {extendedIngredients.map((ing, i) => (
          <Box
            w="100%"
            p="3"
            borderBottomColor="warmGray.200"
            borderBottomWidth="1"
            key={ing.id + ing.amount + i}
          >
            <CustomText>{ing.original}</CustomText>
          </Box>
        ))}
      </Box>
      {analyzedInstructions[0].steps.map((step) => (
        <Box key={step.number} borderWidth="1" borderColor="warmGray.400">
          <View
            borderBottomWidth={"1"}
            borderBottomColor="warmGray.200"
            alignItems="center"
            p="2"
          >
            <Text fontFamily="heading" fontSize="16">
              Step: {step.number}
            </Text>
            <Text>{step.step}</Text>
          </View>
          <Box
            borderBottomColor="warmGray.200"
            borderBottomWidth={step.ingredients.length ? "1" : "0"}
            flexDirection="row"
            p="2"
            flexWrap="wrap"
          >
            {step.ingredients.map((ingredient, i: any) => (
              <Text key={`${ingredient.id + i}: ${i}`}>
                {step.ingredients.slice(-1).pop()?.name === ingredient.name
                  ? `${ingredient.name}`
                  : `${ingredient.name}, `}
              </Text>
            ))}
          </Box>
          {!step.equipment?.length ? null : (
            <Text fontSize="16" alignSelf="center">
              Equipment
            </Text>
          )}

          <Box m="2" justifyContent="space-around" flexDirection="row">
            {step.equipment?.map((eq, i) => (
              <Text key={eq.id + i}>{eq.name}</Text>
            ))}
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;
