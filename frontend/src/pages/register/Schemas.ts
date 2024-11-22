import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .required("Campo Obrigatório")
    .test("sanitize", "Campo Obrigatório", (value) => {
      return value.trim() !== "";
    }),
  password: Yup.string()
    .required("Campo Obrigatório")
    .min(8, "Deve ter ao menos 8 caracteres")
    .test("sanitize", "O campo não deve conter apenas espaços", (value) => {
      return value.trim() !== "";
    }),
  confirmPassword: Yup.string()
    .required("Campo Obrigatório")
    .oneOf([Yup.ref("password"), ""], "As senhas devem ser iguais")
    .test("sanitize", "Campo Obrigatório", (value) => {
      return value.trim() !== "";
    }),
});
