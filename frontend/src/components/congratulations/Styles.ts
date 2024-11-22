import styled from "styled-components";
import { COLORS } from "../../Constants";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;

  height: 100vh;
  width: 100vw;

  background-color: ${COLORS.primary};
  opacity: 0.9;

  font-size: 50px;
`;
