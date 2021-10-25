import React from "react";
import { Formik } from "formik";
import { View, Select, ScrollView } from "native-base";
import * as Yup from "yup";
import { Button } from "react-native";
import { colors } from "../../../../styles/colors";
import CalculatorInput from "./CalculatorInput";
import CalculatorSelect from "./CalculatorSelect";
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
        console.log(finalResult);
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
            <CalculatorSelect
              title={"Choose gender"}
              placeholder={"Choose gender"}
              width={"50%"}
              error={gender}
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
              errorMessage={props.errors.age}
              values={props.values.age}
              handleChange={props.handleChange("age")}
              handleBlur={props.handleBlur("age")}
            />
            <CalculatorInput
              title={"Weight"}
              placeholder={"Weight"}
              error={weight}
              errorMessage={props.errors.weight}
              values={props.values.weight}
              handleChange={props.handleChange("weight")}
              handleBlur={props.handleBlur("weight")}
            />
            <CalculatorInput
              title={"Height"}
              placeholder={"Height"}
              error={height}
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

            <View m="3">
              <Button
                onPress={props.handleSubmit as (values: any) => void}
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
