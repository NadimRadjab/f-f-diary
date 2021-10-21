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
interface Props {
  recipe: {
    image: string;
    title: string;
    id: number;
    diets: string[];
    healthScore: number;
    summary: string;
    readyInMinutes: string;
  };
}
const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <Box
      m="5"
      rounded="lg"
      overflow="hidden"
      width="330"
      shadow={1}
      _light={{ backgroundColor: "gray.50" }}
      _dark={{ backgroundColor: "gray.700" }}
    >
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
          {recipe.summary.substr(0, 80).replace(/[</b>]/g, "")}...
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text color="gray.500" fontWeight="400">
              Ready in {recipe.readyInMinutes} minutes.
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};
export default RecipeCard;
