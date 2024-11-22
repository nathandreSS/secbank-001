import { Actions, Container, Main } from "./Styles";
import React, { useEffect, useState } from "react";
import ActionSection from "../../components/actionSection";
import TransferFunds from "../../components/transferFunds";
import Header from "../../components/header";
import AccountInfo from "../../components/accountInfo";
import DataTable from "../../components/transactionsTable";
import api from "../../api";
import Congratulations from "../../components/congratulations";

interface ResponseInstance {
  cash: number;
  balance: number;
}

const Home: React.FC = () => {
  const [cash, setCash] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const billion = 1000000000;
  useEffect(() => {
    api
      .get<ResponseInstance>("/user/")
      .then((response) => {
        setCash(response.data.cash);
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, []);

  return (
    <Container>
      {balance >= billion && <Congratulations />}
      <Header />
      <AccountInfo cash={cash} balance={balance} />
      <Main>
        <Actions>
          <ActionSection
            type={"deposit"}
            setCash={setCash}
            setBalance={setBalance}
          />
          <ActionSection
            type={"withdraw"}
            setCash={setCash}
            setBalance={setBalance}
          />
          <TransferFunds setBalance={setBalance} />
        </Actions>
        <DataTable balance={balance} />
      </Main>
    </Container>
  );
};

export default Home;
