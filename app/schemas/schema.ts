import * as yup from "yup";

export const schemaForms = yup.object().shape({
  fullName: yup
    .string()
    .required("First names is required")
    .matches(/^[a-zA-Z]+$/, "First name must be a string"),
  email: yup.string().email("Invalid email"),
  phone: yup.string().required("Phone number is required").matches(/^[0-9]+$/, "Phone number must be a number"),
  address: yup.string().required("Address is required"),
  password: yup.string().required("Password is required"),
});

export const schemaFormsLogin = yup.object().shape({
  email: yup.string(),
  password: yup.string()
});
