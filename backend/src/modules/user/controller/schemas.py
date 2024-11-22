from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class UserModel(BaseModel):
    id: UUID
    username: str
    password: str | None
    cash: float
    balance: float
    access_token: str
    refresh_token: str
    created_at: datetime


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str


class PayloadSchema(BaseModel):
    sub: str
    cash: float
    balance: float
    created_at: str
    exp: datetime
