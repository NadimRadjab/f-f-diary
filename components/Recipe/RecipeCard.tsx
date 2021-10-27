import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Recipe } from "../../redux/features/Recipes/type";

interface Props {
  recipe: Recipe;
  handleLocation: (recipe: Recipe) => void;
  isInFavorites: boolean;
}
const RecipeCard: React.FC<Props> = ({
  isInFavorites,
  recipe,
  handleLocation,
}) => {
  const handleNavigation = () => {
    handleLocation(recipe);
  };

  return (
    <Box
      margin={!isInFavorites ? "100" : "4"}
      rounded="lg"
      width="350"
      height="500"
      overflow="hidden"
      shadow={5}
      backgroundColor="black"
      _light={{ backgroundColor: "gray.100" }}
      _dark={{ backgroundColor: "gray.600" }}
    >
      <TouchableOpacity onPress={handleNavigation} style={{ flex: 1 }}>
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              source={{
                uri: recipe.image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {recipe.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{ color: "violet.500" }}
              _dark={{ color: "violet.300" }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Health Score: {recipe.healthScore}
            </Text>
          </Stack>
          <Text fontWeight="400">
            {recipe.summary.substr(0, 300).replace(/<[/]?(b)>/gi, "")}...
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="gray.500" fontWeight="400">
                Ready in {recipe.readyInMinutes} minutes.
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </TouchableOpacity>
    </Box>
  );
};
export default RecipeCard;
