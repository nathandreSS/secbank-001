from pydantic import BaseModel


class DepositData(BaseModel):
    amount: float


class WithdrawData(BaseModel):
    amount: float


class TransferData(BaseModel):
    to_user: str
    amount: float
    description: str = None
