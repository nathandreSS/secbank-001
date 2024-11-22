import React from "react";
import { Container } from "./Styles";
import { useAuth } from "../../hooks/useAuth";

interface AccountInfoProps {
  cash: number | string;
  balance: number | string;
}
const AccountInfo: React.FC<AccountInfoProps> = ({ cash, balance }) => {
  const { user } = useAuth();

  return (
    <Container>
      <div>
        <p>Account Id: {user?.id}</p>
      </div>
      <div>
        <p>Cash: {cash}</p>
        <p>Balance: {balance}</p>
      </div>
    </Container>
  );
};

export default AccountInfo;
