import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;
  padding: 20px;

  background-color: ${COLORS.secondary};

  svg {
    margin-right: 10px;
  }
`;
