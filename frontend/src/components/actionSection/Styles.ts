import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 200px;
  height: 200px;
  padding: 20px;

  background-color: ${COLORS.secondary};

  input[type="number"] {
    width: 100px;
    height: 30px;

    text-align: center;
    font-size: 16px;

    outline: none;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .error-message {
    color: ${COLORS.error};
    font-size: 14px;
    margin-top: 10px;
    min-height: 20px;
  }
`;
