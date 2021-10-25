import React from "react";
import { Formik } from "formik";
import {
  View,
  Input,
  FormControl,
  Select,
  Container,
  CheckIcon,
  WarningOutlineIcon,
  Center,
  NativeBaseProvider,
  ScrollView,
} from "native-base";
import * as Yup from "yup";
import { Button, Text } from "react-native";
import { colors } from "../../../styles/colors";
import CalculatorInput from "./CalculatorInput";
const CalculatorSchema = Yup.object({
  age: Yup.number().required("Age is required").min(1).max(100),
  weight: Yup.number().required("Weight is required").min(1).max(200),
  height: Yup.number().required("Height is required").min(1).max(250),
  gender: Yup.string().required("Gender is required."),
  activity: Yup.number().required("Acticity is required"),
});
const Calculator = () => {
  return (
    <Formik
      initialValues={{
        gender: "",
        age: "",
        weight: "",
        height: "",
        activity: "",
      }}
      validationSchema={CalculatorSchema}
      onSubmit={(values) => {
        const { weight, height, age, gender, activity } = values;
        let number = gender === "Male" ? 5 : -161;

        let result =
          10 * parseInt(weight) +
          6.25 * parseInt(height) -
          5 * parseInt(age) +
          number;

        const finalResult = result * parseFloat(activity);
      }}
    >
      {(props) => {
        const { age, gender, activity, height, weight } =
          props.touched && props.errors;

        return (
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              p="4"
              alignItems="center"
              isRequired
              isInvalid={gender ? true : false}
            >
              <FormControl.Label>Choose gender.</FormControl.Label>
              <Select
                onValueChange={props.handleChange("gender")}
                w="55%"
                selectedValue={props.values.gender}
                accessibilityLabel="Choose gender"
                placeholder="Choose gender"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
              >
                <Select.Item label=" Male" value="Male" />
                <Select.Item label="Female" value="Female" />
              </Select>
              {gender && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {props.errors.gender}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <CalculatorInput
              title={"Age"}
              placeholder={"Age"}
              error={age}
              errorMessage={props.errors.age}
              values={props.values.age}
              handleChange={props.handleChange("age")}
              handleBlur={props.handleBlur("age")}
            />
            <FormControl
              alignItems="center"
              isRequired
              isInvalid={weight ? true : false}
            >
              <FormControl.Label>Weight</FormControl.Label>
              <Input
                w="35%"
                keyboardType="numeric"
                value={props.values.weight}
                onChangeText={props.handleChange("weight")}
                variant="rounded"
                placeholder="Weight(kg)"
              />
              {weight && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {props.errors.weight}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl
              alignItems="center"
              isRequired
              isInvalid={height ? true : false}
            >
              <FormControl.Label>Height</FormControl.Label>
              <Input
                w="35%"
                keyboardType="numeric"
                value={props.values.height}
                onChangeText={props.handleChange("height")}
                variant="rounded"
                placeholder="Height(cm)"
              />
              {height && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {props.errors.height}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl
              alignItems="center"
              isRequired
              isInvalid={activity ? true : false}
            >
              <FormControl.Label>Choose activity level.</FormControl.Label>
              <Select
                onValueChange={props.handleChange("activity")}
                w="80%"
                selectedValue={props.values.activity}
                accessibilityLabel="Choose activity level."
                placeholder="Choose activity level."
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
              >
                <Select.Item label="Sedentary(office job)" value="1.2" />
                <Select.Item
                  label="Light Exercises (1-2 days/week)"
                  value="1.375"
                />
                <Select.Item
                  label="Moderate Exercise (3-5 days/week)"
                  value="1.55"
                />
                <Select.Item
                  label="Heavy Exercise (6-7 days/week)"
                  value="1.725"
                />
                <Select.Item label="Athlete (2x per day)" value="1.9" />
              </Select>
              {activity && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {props.errors.activity}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <View m="3">
              <Button
                onPress={props.handleSubmit}
                title="Calculate"
                color={colors.primaryBlue}
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default Calculator;
