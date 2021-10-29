import React, { useState } from "react";
import { View, Input, Icon, Button, Text } from "native-base";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthParamList } from "../../routs/NavigationTypes";
import { useAppDipsatch, useAppSelector } from "../../redux/hooks";
import { register } from "../../redux/features/Auth/authSlice";
import CustomAlert from "../../components/Utils/CustomAlert";
import Loading from "../../components/Utils/Loading";
import { colors } from "../../styles/colors";

const RegisterSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email adress!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must at least six characters!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required!"),
});
const RegisterScreen = () => {
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
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          dispatch(
            register({ email: values.email, password: values.password })
          );
        }}
      >
        {(props: any) => (
          <View
            w="95%"
            justifyContent="center"
            alignItems="center"
            borderRadius="10"
            bg="#fff"
            shadow="4"
            p="2"
          >
            {auth.error && !auth.token ? (
              <View w="90%" justifyContent="center" alignItems="center" mb="5">
                <CustomAlert isOpen={true} text={auth.error} />
              </View>
            ) : null}
            <View p="1" m="1">
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
              {props.touched.email && props.errors.email && (
                <Text style={globalStyles.errorText}>{props.errors.email}</Text>
              )}
            </View>
            <View p="1" m="1">
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
              {props.touched.password && props.errors.password && (
                <Text style={globalStyles.errorText}>
                  {props.errors.password}
                </Text>
              )}
            </View>
            <View p="1" m="1">
              <Input
                onBlur={props.handleBlur("confirmPassword")}
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
                placeholder="Confirm Password"
                value={props.values.confirmPassword}
                onChangeText={props.handleChange("confirmPassword")}
              />
              {props.touched.confirmPassword &&
                props.errors.confirmPassword && (
                  <Text style={globalStyles.errorText}>
                    {props.errors.confirmPassword}
                  </Text>
                )}
            </View>
            <View w="40%" h="60">
              {auth.isLoading ? (
                <Loading />
              ) : (
                <Button onPress={props.handleSubmit}>Sign Up</Button>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;
