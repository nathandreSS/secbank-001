import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 200px;
  padding: 30px;
  background-color: ${COLORS.secondary};

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    div {
      width: 300px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }

    .error-message {
      color: ${COLORS.error};
      font-size: 14px;
      margin-top: 10px;
      min-height: 20px;
    }
  }
`;
