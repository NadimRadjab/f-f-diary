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
  placeholder: string;
}
const CustomSearch: React.FC<Props> = (props) => {
  const [search, setSearch] = useState<string>("");

  const handleSerach = (value: string) => {
    setSearch(value);
  };
  const dispatch = useAppDipsatch();
  const handleSubmit = () => {
    props.handleQuery(search);
    setSearch("");
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RecipieParamList, "RecipeStack">>();

  return (
    <View>
      <View
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        p="3"
        w="100%"
      >
        <Input
          onSubmitEditing={handleSubmit}
          value={search}
          onChangeText={handleSerach}
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
            !props.selectedFilters.length ? (
              <Box></Box>
            ) : (
              <Badge borderRadius="50" colorScheme="warning">
                <CustomText color="white">
                  {props.selectedFilters?.length}
                </CustomText>
              </Badge>
            )
          }
          placeholder={props.placeholder}
        />
      </View>
    </View>
  );
};

export default CustomSearch;
