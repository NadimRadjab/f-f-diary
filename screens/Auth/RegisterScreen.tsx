import React, { useState } from "react";
import { View, Input, Icon, Button, Text } from "native-base";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import * as yup from "yup";
import { useAppDipsatch } from "../../redux/hooks";
import { register } from "../../redux/features/Auth/authSlice";

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
  return (
    <View flex="1" justifyContent="center" alignItems="center">
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
        {(props) => (
          <View
            w="95%"
            justifyContent="center"
            alignItems="center"
            h="350"
            bg="#fff"
            shadow="4"
            p="2"
          >
            <View m="1">
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
              {props.touched.email && (
                <Text style={globalStyles.errorText}>{props.errors.email}</Text>
              )}
            </View>
            <View m="1">
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
              {props.touched.password && (
                <Text style={globalStyles.errorText}>
                  {props.errors.password}
                </Text>
              )}
            </View>
            <View m="1">
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
              {props.touched.confirmPassword && (
                <Text style={globalStyles.errorText}>
                  {props.errors.confirmPassword}
                </Text>
              )}
            </View>
            <View w="40%">
              <Button onPress={props.handleSubmit}>REGISTER</Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;
