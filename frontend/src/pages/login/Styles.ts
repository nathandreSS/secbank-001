import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      margin-top: 10px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 350px;
    padding: 20px;
    background-color: ${COLORS.secondary};
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin-bottom: 10px;
  }

  label {
    margin-bottom: 2px;
    font-size: 14px;
    color: ${COLORS.accent};
  }

  input {
    width: 200px;
    height: 30px;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    outline: none;
  }

  .field-error {
    color: ${COLORS.error};
    font-size: 14px;
  }

  .error-message {
    margin-top: 20px;
    min-height: 40px;
    color: ${COLORS.error};
    text-align: center;
  }

  a {
    text-decoration: none;
    color: ${COLORS.accent};
  }
`;
