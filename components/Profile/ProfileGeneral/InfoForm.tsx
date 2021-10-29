import React from "react";
import { useFormik } from "formik";
import { Button, FormControl, Input, View } from "native-base";
import { Text } from "react-native";
import * as Yup from "yup";
import { globalStyles } from "../../../styles/global";
type Props = {
  items: {
    value: string;
    isOpen: boolean;
  };
  handleSubmit: (item: string, oldEmail?: string, oldPassword?: string) => void;
  handleClose: (value: string) => void;
  text: string;
};
const InfoForm = (props: Props) => {
  const { items } = props;
  const FormSchema = Yup.object({
    isDeletingAccount: Yup.boolean(),
    doValidation: Yup.boolean(),
    oldPassword: Yup.string().when("doValidation", {
      is: true,
      then: Yup.string().required("Password is required."),
    }),
    oldEmail: Yup.string().when("doValidation", {
      is: true,
      then: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    value: Yup.string()
      .required(`${props.text} cannot be empty.`)
      .when("isDeletingAccount", {
        is: true,
        then: Yup.string()
          .required("Field cannot be empty.")
          .matches(/\bConfirm\b/, "Please enter Confirm to continue."),
      }),
  });

  const formik = useFormik({
    initialValues: {
      isDeletingAccount: items.value === "DeleteAccount" ? true : false,
      doValidation:
        items.value === "Password" ||
        items.value === "Email" ||
        items.value === "DeleteAccount"
          ? true
          : false,
      value: "",
      oldPassword: "",
      oldEmail: "",
    },
    validationSchema: FormSchema,
    onSubmit: (value) => {
      props.handleSubmit(value.value, value.oldEmail, value.oldPassword);
      props.handleClose(props.items.value);
    },
  });
  return (
    <FormControl>
      <FormControl.Label>
        {items.value === "DeleteAccount"
          ? `Enter your data to delete the account!`
          : `Set ${props.text}`}
      </FormControl.Label>
      {(props.items.value === "Password" ||
        props.items.value === "Email" ||
        props.items.value === "DeleteAccount") && (
        <View>
          {formik.touched.oldEmail && formik.errors.oldEmail && (
            <Text style={globalStyles.errorText}>{formik.errors.oldEmail}</Text>
          )}
          <View>
            <Input
              m="2"
              onBlur={formik.handleBlur("oldEmail")}
              contextMenuHidden={true}
              onChangeText={formik.handleChange("oldEmail")}
              value={formik.values.oldEmail}
              keyboardType="email-address"
              placeholder="Email Address"
            />
          </View>
          <View>
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <Text style={globalStyles.errorText}>
                {formik.errors.oldPassword}
              </Text>
            )}
            <Input
              p="2"
              onBlur={formik.handleBlur("oldPassword")}
              m="2"
              type="password"
              contextMenuHidden={true}
              onChangeText={formik.handleChange("oldPassword")}
              value={formik.values.oldPassword}
              placeholder="Current Password"
            />
          </View>
        </View>
      )}
      <View>
        {formik.touched.value && formik.errors.value ? (
          <Text style={globalStyles.errorText}>{formik.errors.value}</Text>
        ) : null}
        {items.value === "DeleteAccount" ? (
          <Input
            p="2"
            m="2"
            keyboardType={
              props.items.value === "PhoneNumber" ? "phone-pad" : "default"
            }
            onBlur={formik.handleBlur("value")}
            contextMenuHidden={true}
            onChangeText={formik.handleChange("value")}
            value={formik.values.value}
            placeholder="Confirm"
          />
        ) : (
          <Input
            p="2"
            m="2"
            keyboardType={
              props.items.value === "PhoneNumber" ? "phone-pad" : "default"
            }
            onBlur={formik.handleBlur("value")}
            contextMenuHidden={true}
            onChangeText={formik.handleChange("value")}
            type={items.value === "Password" ? "password" : "default"}
            value={formik.values.value}
            placeholder={
              items.value === "Email"
                ? "New Email Address"
                : items.value === "Password"
                ? "New Password"
                : items.value === "PhoneNumber"
                ? "Phone Number"
                : items.value
            }
          />
        )}
      </View>
      <Button onPress={formik.submitForm}>Confirm</Button>
    </FormControl>
  );
};

export default InfoForm;
