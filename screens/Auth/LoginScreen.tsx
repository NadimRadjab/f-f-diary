import React from "react";
import { View, Input, Icon, Button, Text } from "native-base";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import * as yup from "yup";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { logIn } from "../../redux/features/Auth/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthParamList } from "../../routs/NavigationTypes";
import Loading from "../../components/Utils/Loading";
import CustomAlert from "../../components/Utils/CustomAlert";
import { colors } from "../../styles/colors";

const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email adress!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must at least six characters!")
    .required("Password is required!"),
});
const LoginScreen = () => {
  const dispatch = useAppDipsatch();
  const auth = useAppSelector((state) => state.auth);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthParamList, "Login">>();
  return (
    <View
      bg="warmGray.100"
      flex="1"
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          dispatch(logIn({ email: values.email, password: values.password }));
        }}
      >
        {(props: any) => (
          <View
            w="95%"
            justifyContent="center"
            alignItems="center"
            bg="#fff"
            borderRadius="10"
            shadow="4"
            p="2"
          >
            {auth.error && !auth.token ? (
              <View w="90%" justifyContent="center" alignItems="center" mb="5">
                <CustomAlert isOpen={true} text={auth.error} />
              </View>
            ) : null}
            <View p="2" m="1">
              <Input
                onBlur={props.handleBlur("email")}
                w={{
                  base: "90%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder={"Email"}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={globalStyles.errorText}>{props.errors.email}</Text>
              ) : null}
            </View>
            <View p="2" m="1">
              <Input
                onBlur={props.handleBlur("password")}
                type="password"
                w={{
                  base: "90%",
                  md: "25%",
                }}
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name="visibility-off" />}
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                }
                placeholder="Password"
                value={props.values.password}
                onChangeText={props.handleChange("password")}
              />
              {props.touched.password && props.errors.password ? (
                <Text style={globalStyles.errorText}>
                  {props.errors.password}
                </Text>
              ) : null}
            </View>

            {auth.isLoading ? (
              <View h="20">
                <Loading />
              </View>
            ) : (
              <View justifyContent="center" m="1" flexDirection="row" w="60%">
                <Button colorScheme="info" mr="2" onPress={props.handleSubmit}>
                  Sign In
                </Button>
                <Button onPress={() => navigation.navigate("Register")}>
                  Sign Up
                </Button>
              </View>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
