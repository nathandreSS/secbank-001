import { Container } from "./Styles";
import { Dispatch, SetStateAction, useState } from "react";
import api from "../../api";
import axios, { HttpStatusCode } from "axios";

interface ActionSectionProps {
  type: "deposit" | "withdraw";
  setCash: Dispatch<SetStateAction<number>>;
  setBalance: Dispatch<SetStateAction<number>>;
}

const ActionSection: React.FC<ActionSectionProps> = ({
  type,
  setCash,
  setBalance,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleDeposit = () => {
    api
      .post("/transaction/deposit", { amount: amount })
      .then((response) => {
        setCash((prevState) => prevState - amount);
        setBalance((prevState) => prevState + amount);
        setAmount(0);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === HttpStatusCode.BadRequest) {
            setMessage(error.response.data.error);
          } else {
            setMessage("Failed to withdraw funds.");
          }
        } else {
          setMessage("Failed to deposit funds.");
        }
      });
  };

  const handleWithdraw = (givenAmount: number) => {
    api
      .post("/transaction/withdraw", { amount: amount })
      .then((response) => {
        setCash((prevState) => prevState + amount);
        setBalance((prevState) => prevState - amount);
        setAmount(0);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === HttpStatusCode.BadRequest) {
            setMessage(error.response.data.error);
          } else {
            setMessage("Failed to withdraw funds.");
          }
        } else {
          setMessage("Failed to deposit funds.");
        }
      });
  };

  const handleMap = {
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  };

  return (
    <Container>
      <label>Amount</label>
      <input
        type="number"
        data-testid={`${type}-amount-input`}
        value={amount}
        onChange={(event) => setAmount(parseFloat(event.target.value))}
      />
      <button data-testid={`${type}-button`} onClick={() => handleMap[type](amount)}>
        {type === "deposit" ? "Deposit" : "Withdraw"}
      </button>
      <p data-testid={`${type}-error-message`} className="error-message">{message}</p>
    </Container>
  );
};

export default ActionSection;
