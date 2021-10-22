import React from "react";
import { Box, Heading, Text, HStack, Link, Stack } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { PlanMeal } from "../../redux/features/WeeklyPlans/types";

interface Props {
  item: PlanMeal;
}
const CustomCard: React.FC<Props> = (props) => {
  return (
    <Box
      rounded="lg"
      overflow="hidden"
      width="72"
      m="3"
      shadow={3}
      _light={{ backgroundColor: "gray.50" }}
      _dark={{ backgroundColor: "gray.700" }}
    >
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {props.item.title}
          </Heading>
          <Text
            fontSize="xs"
            _light={{ color: "info.600" }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            Searvings: {props.item.servings}
          </Text>
        </Stack>
        <Link
          isUnderlined={false}
          isExternal
          _web={{ mb: -2 }}
          href={props.item.sourceUrl}
        >
          <Text color="info.700" fontSize="17" fontWeight="400">
            Read More
          </Text>
        </Link>

        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text color="gray.500" fontWeight="400">
              Ready in: {props.item.readyInMinutes} minutes
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CustomCard;
