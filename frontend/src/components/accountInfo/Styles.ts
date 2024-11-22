import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 30px;
  padding: 20px;
  background-color: ${COLORS.secondary};
  border-top: 2px solid ${COLORS.border};

  div {
    display: flex;
    align-items: center;

    p {
      margin-right: 10px;
    }
  }
`;
