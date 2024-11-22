import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

import { COLORS } from "../../Constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../api";
import { useAuth } from "../../hooks/useAuth";
import { StyledPaper } from "./Styles";
import axios, { HttpStatusCode } from "axios";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "from",
    headerName: "From",
    width: 300,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "to",
    headerName: "To",
    width: 300,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
];

interface Transaction {
  id: number;
  from_user: string;
  to_user: string;
  amount: number;
  description: string;
  created_at: Date;
}

interface TransactionsResponse {
  items: Transaction[];
  page: number;
  limit: number;
  total: number;
}

interface DataTableProps {
  balance: number;
}
const inititalPaginationModel = { page: 0, pageSize: 5 };

const DataTable: React.FC<DataTableProps> = ({ balance }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
    inititalPaginationModel,
  );
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    api
      .get<TransactionsResponse>("/transaction/", {
        params: {
          page: paginationModel.page,
          limit: paginationModel.pageSize,
        },
      })
      .then((response) => {
        const newTransactions = response.data.items.map((transaction) => {
          const to =
            transaction.to_user === user?.id ? "You" : transaction.to_user;
          const from =
            transaction.from_user === user?.id ? "You" : transaction.from_user;
          return {
            ...transaction,
            from: from,
            to: to,
            date: new Date(transaction.created_at),
          };
        });
        setTransactions(newTransactions);
        setTotal(response.data.total);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === HttpStatusCode.BadRequest) {
            console.log(error.response.data.error);
          } else {
            console.log("Failed to withdraw funds.");
          }
        } else {
          console.log("Failed to deposit funds.");
        }
      });
  }, [paginationModel, balance]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };
  return (
    <StyledPaper>
      <DataGrid
        rows={transactions}
        rowCount={total}
        paginationMode="server"
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        onPaginationModelChange={handlePaginationChange}
        sx={{
          border: 0,
          backgroundColor: COLORS.secondary,
          color: COLORS.text,
        }}
      />
    </StyledPaper>
  );
};

export default DataTable;
