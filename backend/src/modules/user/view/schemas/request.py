from pydantic import BaseModel


class CreateUser(BaseModel):
    username: str
    password: str


class Login(BaseModel):
    username: str
    password: str


class Refresh(BaseModel):
    refresh_token: str
