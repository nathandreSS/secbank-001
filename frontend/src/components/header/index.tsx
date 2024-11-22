import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "./Styles";
import { COLORS } from "../../Constants";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <FontAwesomeIcon
        color={COLORS.accent}
        size={"2xl"}
        icon={faBuildingColumns}
      ></FontAwesomeIcon>
      <button onClick={logout}>
        <FontAwesomeIcon color={COLORS.secondary} icon={faRightFromBracket} />
        Logout
      </button>
    </Container>
  );
};

export default Header;
