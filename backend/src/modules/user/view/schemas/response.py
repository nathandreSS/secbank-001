from uuid import UUID

from pydantic import BaseModel


class TokensResponse(BaseModel):
    access_token: str
    refresh_token: str


class ErrorResponse(BaseModel):
    error: str


class GetInfoResponse(BaseModel):
    id: UUID
    cash: float
    balance: float
