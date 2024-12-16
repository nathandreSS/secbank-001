import { Container } from "./Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLORS, ROUTES } from "../../Constants";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import axios, { HttpStatusCode } from "axios";
import { validationSchema } from "./Schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";

interface FormValues {
  username: string;
  password: string;
}
const Register: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const data = { username: values.username, password: values.password };
    api
      .post("/user/", data)
      .then((response) => {
        navigate(ROUTES.login);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === HttpStatusCode.BadRequest) {
            setError(err.response?.data.error);
          } else {
            setError("Something went wrong, please try again later");
          }
        } else {
          setError("Something went wrong, please try again later");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container>
      <Formik
        initialValues={{ username: "", password: "", confirmPassword: "" }}
        initialErrors={{
          username: "Required Field",
          password: "Required Field",
          confirmPassword: "Required Field",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={"logo"}>
            <FontAwesomeIcon
              color={COLORS.accent}
              size={"2xl"}
              icon={faBuildingColumns}
            ></FontAwesomeIcon>
            <p>SecBank</p>
          </div>
          <div>
            <label>Username</label>
            <Field name="username" placeholder={"Username"} />
            <ErrorMessage
              data-testid="username-field-error"
              name="username"
              component="div"
              className="field-error"
            />
          </div>
          <div>
            <label>Password</label>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage
                data-testid="password-field-error"
              name="password"
              component="div"
              className="field-error"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              data-testid="confirm-password-field-error"
              name="confirmPassword"
              component="div"
              className="field-error"
            />
          </div>
          <button type="submit">Register</button>
          <p className="error-message">{error}</p>
          <p>
            Already have an account? <a data-testid="link-register" href={ROUTES.login}>Login</a>
          </p>
        </Form>
      </Formik>
    </Container>
  );
};

export default Register;
