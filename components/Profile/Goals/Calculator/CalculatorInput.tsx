import React from "react";
import { Input, FormControl, WarningOutlineIcon } from "native-base";
const CalculatorInput = (props: any) => {
  return (
    <FormControl
      alignItems="center"
      isRequired
      isInvalid={props.error && props.isTouched ? true : false}
    >
      <FormControl.Label>{props.title}</FormControl.Label>
      <Input
        w="35%"
        onBlur={props.handleBlur}
        keyboardType="numeric"
        value={props.values}
        onChangeText={props.handleChange}
        variant="rounded"
        contextMenuHidden={true}
        placeholder={props.placeholder}
      />
      {props.error && props.isTouched && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {props.errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default CalculatorInput;
