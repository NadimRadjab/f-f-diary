import React from "react";
import {
  View,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
const CalculatorSelect = (props: any) => {
  return (
    <FormControl
      p="4"
      alignItems="center"
      isRequired
      isInvalid={props.error ? true : false}
    >
      <FormControl.Label>{props.title}</FormControl.Label>
      <Select
        onValueChange={props.handleChange}
        w={props.width}
        selectedValue={props.values}
        accessibilityLabel={props.placeholder}
        placeholder={props.placeholder}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={5} />,
        }}
        mt="1"
      >
        {props.children}
      </Select>
      {props.error && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default CalculatorSelect;
