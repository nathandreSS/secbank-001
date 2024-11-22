import styled from "styled-components";
import { COLORS } from "../../Constants";
import Paper from "@mui/material/Paper";

export const StyledPaper = styled(Paper)`
  height: auto;
  width: 1200px;
  align-items: center;

  .MuiDataGrid-container--top [role="row"], .MuiDataGrid-container--bottom [role="row"] {
    --DataGrid-containerBackground: ${COLORS.accent};
    --DataGrid-rowBorderColor: ${COLORS.primary};
    color: ${COLORS.primary};
  }

  rect {
    color: ${COLORS.primary};
  }
  .MuiDataGrid-footerContainer {
    background-color: ${COLORS.accent};
  }
`;
