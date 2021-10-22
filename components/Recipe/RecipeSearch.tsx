import { Badge, Icon, Input, View, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAppDipsatch } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RecipieParamList } from "../../routs/NavigationTypes";
import CustomText from "../UI/CustomText";

interface Props {
  handleQuery: (recipe: string) => void;
  selectedFilters: {}[];
}
const RecipeSearch: React.FC<Props> = ({ handleQuery, selectedFilters }) => {
  const [recipe, setRecipe] = useState<string>("");

  const handleRecipe = (value: string) => {
    setRecipe(value);
  };
  const dispatch = useAppDipsatch();
  const handleSubmit = () => {
    handleQuery(recipe);
    setRecipe("");
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RecipieParamList, "RecipeStack">>();

  return (
    <View>
      <View
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        p="1"
        w="100%"
      >
        <Input
          onSubmitEditing={handleSubmit}
          value={recipe}
          onChangeText={handleRecipe}
          w="80%"
          InputLeftElement={
            <Icon
              as={<Ionicons name="search" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          InputRightElement={
            !selectedFilters.length ? (
              <Box></Box>
            ) : (
              <Badge borderRadius="50" colorScheme="warning">
                <CustomText color="white">{selectedFilters?.length}</CustomText>
              </Badge>
            )
          }
          placeholder="Search for a recipe"
        />
      </View>
    </View>
  );
};

export default RecipeSearch;
