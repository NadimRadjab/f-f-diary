import React from "react";
import { Formik } from "formik";
import { View, Input } from "native-base";
import * as Yup from "yup";
import { Button, Text } from "react-native";
import { colors } from "../../../styles/colors";
const CalculatorSchema = Yup.object({
  age: Yup.number().required("Age is required").min(1).max(100),
  weight: Yup.number().required("Weight is required").min(1).max(200),
  height: Yup.number().required("Height is required").min(1).max(250),
});
const Calculator = () => {
  return (
    <View>
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
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <Text>{props.errors.height}</Text>
            <View>
              <Input
                keyboardType="numeric"
                value={props.values.age}
                onChangeText={props.handleChange("age")}
                variant="rounded"
                placeholder="Age"
              />
            </View>
            <View>
              <Input
                keyboardType="numeric"
                value={props.values.weight}
                onChangeText={props.handleChange("weight")}
                variant="rounded"
                placeholder="Weight(kg)"
              />
            </View>

            <View>
              <Input
                keyboardType="numeric"
                value={props.values.height}
                onChangeText={props.handleChange("height")}
                variant="rounded"
                placeholder="Height(cm)"
              />
            </View>
            <Button
              onPress={props.handleSubmit}
              title="Calculate"
              color={colors.primaryBlue}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Calculator;
