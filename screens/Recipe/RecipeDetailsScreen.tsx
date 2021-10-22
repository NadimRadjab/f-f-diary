import { RouteProp, useRoute } from "@react-navigation/native";
import { AspectRatio, Box, Image, ScrollView, Text, View } from "native-base";
import React from "react";
import { RecipieParamList } from "../../routs/NavigationTypes";
import CustomText from "../../components/UI/CustomText";
const RecipeDetailsScreen = () => {
  const route = useRoute<RouteProp<RecipieParamList, "RecipeDetails">>();
  const { image, summary, analyzedInstructions, extendedIngredients } =
    route.params.recipe;

  return (
    <ScrollView>
      <Box>
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
