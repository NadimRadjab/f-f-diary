import React from "react";
import { Formik } from "formik";
import { View, Select, ScrollView, Text } from "native-base";
import * as Yup from "yup";
import { Button, Platform, TouchableOpacity } from "react-native";
import { colors } from "../../../styles/colors";
import CalculatorInput from "../../../components/Profile/Goals/Calculator/CalculatorInput";
import CalculatorSelect from "../../../components/Profile/Goals/Calculator/CalculatorSelect";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GoalsParamList } from "../../../routs/Profile/types";
import { globalStyles } from "../../../styles/global";
const CalculatorSchema = Yup.object({
  age: Yup.number().required("Age is required").min(1).max(100),
  weight: Yup.number().required("Weight is required").min(1).max(200),
  height: Yup.number().required("Height is required").min(1).max(250),
  gender: Yup.string().required("Gender is required."),
  activity: Yup.number().required("Acticity is required"),
});
type Props = NativeStackScreenProps<GoalsParamList, "Calculator">;
const CalculatorScreen = ({ navigation }: Props) => {
  return (
    <View flex="1">
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
          navigation.navigate("Calories", {
            results: { calories: finalResult.toFixed(), ...values },
          });
        }}
      >
        {(props) => {
          const { age, gender, activity, height, weight } = props.errors;

          return (
            <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CalculatorSelect
                title={"Choose gender"}
                placeholder={"Choose gender"}
                width={"50%"}
                error={gender}
                isTouched={props.touched.gender}
                errorMessage={props.errors.gender}
                values={props.values.gender}
                handleChange={props.handleChange("gender")}
                handleBlur={props.handleBlur("gender")}
              >
                <Select.Item label=" Male" value="Male" />
                <Select.Item label="Female" value="Female" />
              </CalculatorSelect>

              <CalculatorInput
                title={"Age"}
                placeholder={"Age"}
                error={age}
                isTouched={props.touched.age}
                errorMessage={props.errors.age}
                values={props.values.age}
                handleChange={props.handleChange("age")}
                handleBlur={props.handleBlur("age")}
              />
              <CalculatorInput
                title={"Weight"}
                placeholder={"Weight"}
                error={weight}
                isTouched={props.touched.weight}
                errorMessage={props.errors.weight}
                values={props.values.weight}
                handleChange={props.handleChange("weight")}
                handleBlur={props.handleBlur("weight")}
              />
              <CalculatorInput
                title={"Height"}
                placeholder={"Height"}
                error={height}
                isTouched={props.touched.height}
                errorMessage={props.errors.height}
                values={props.values.height}
                handleChange={props.handleChange("height")}
                handleBlur={props.handleBlur("height")}
              />
              <CalculatorSelect
                width={"80"}
                title={"Choose activity level."}
                placeholder={"Choose activity level."}
                error={activity}
                errorMessage={props.errors.activity}
                values={props.values.activity}
                isTouched={props.touched.activity}
                handleChange={props.handleChange("activity")}
                handleBlur={props.handleBlur("activity")}
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
              </CalculatorSelect>

              {Platform.OS === "ios" ? (
                <View m="2">
                  <Button
                    onPress={props.handleSubmit as (values: any) => void}
                    title="Calculate"
                    color={colors.primaryBlue}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={props.handleSubmit as (values: any) => void}
                  style={globalStyles.btn}
                >
                  <Text fontSize="16" color="white">
                    Calculate
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          );
        }}
      </Formik>
    </View>
  );
};

export default CalculatorScreen;
