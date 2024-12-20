import { Dispatch, SetStateAction, useState } from "react";
import { Container } from "./Styles";
import api from "../../api";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import axios, { HttpStatusCode } from "axios";

interface TransferFundsProps {
  setBalance: Dispatch<SetStateAction<number>>;
}
const TransferFunds: React.FC<TransferFundsProps> = ({ setBalance }) => {
  const [accountId, setAccountId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleTransfer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      to_user: accountId,
      amount,
      description,
    };
    api
      .post("transaction/transfer/", data)
      .then((response) => {
        setBalance((prevState) => prevState - amount);
        setAccountId("");
        setAmount(0);
        setDescription("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === HttpStatusCode.BadRequest) {
            setMessage(error.response.data.error);
          } else {
            setMessage("Failed to transfer funds.");
          }
        } else {
          setMessage("Failed to transfer funds.");
        }
      });
  };
  return (
    <Container>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Account Id:</label>
          <input
              data-testid="account-input"
            type="text"
            onChange={(event) => setAccountId(event.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
              data-testid="description-input"
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
              data-testid="transfer-amount-input"
            type="number"
            onChange={(event) => setAmount(parseFloat(event.target.value))}
          />
        </div>
        <button data-testid="transfer-button" type="submit">Transfer</button>
        <p data-testid="transfer-error-message" className="error-message">{message}</p>
      </form>
    </Container>
  );
};

export default TransferFunds;
