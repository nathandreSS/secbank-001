import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .required("Required Field")
    .test("sanitize", "Required Field", (value) => {
      return value.trim() !== "";
    }),
  password: Yup.string()
    .required("Required Field")
    .min(8, "Must have at least 8 characters")
    .test("sanitize", "The field can`t has only spaces", (value) => {
      return value.trim() !== "";
    }),
  confirmPassword: Yup.string()
    .required("Required Field")
    .oneOf([Yup.ref("password"), ""], "The passwords must be equal")
    .test("sanitize", "Required Field", (value) => {
      return value.trim() !== "";
    }),
});
