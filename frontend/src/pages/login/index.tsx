import { Container } from "./Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLORS, ROUTES } from "../../Constants";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { validationSchema } from "./Schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const data = { username: values.username, password: values.password };
    login(data)
      .then((response) => {
        navigate(ROUTES.login);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === HttpStatusCode.Unauthorized) {
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
        initialValues={{ username: "", password: "" }}
        initialErrors={{
          username: "This field must be filled",
          password: "This field must be filled",
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
            <Field name="username" placeholder="username" />
            <ErrorMessage
              name="username"
              component="div"
              className="field-error"
            />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" type="password" placeholder="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="field-error"
            />
          </div>
          <button type="submit">Login</button>
          <p className="error-message">{error}</p>
          <p>
            Don't have an account? <a data-testid="link-register" href="/register">Register</a>
          </p>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
