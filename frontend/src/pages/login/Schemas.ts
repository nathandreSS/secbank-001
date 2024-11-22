import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .required("This field must be filled")
    .test("sanitize", "This field must be filled", (value) => {
      return value.trim() !== "";
    }),
  password: Yup.string()
    .required("This field must be filled")
    .test("sanitize", "This field must be filled", (value) => {
      return value.trim() !== "";
    }),
});
