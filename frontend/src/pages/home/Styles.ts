import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.div``;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: ${COLORS.primary};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    margin: 50px;
  }
  width: 100%;
`;
