import hashlib
import re
from datetime import datetime, timedelta
from typing import Dict

import jwt
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from starlette import status

from src.modules.user.controller.schemas import UserModel, TokenSchema, PayloadSchema
from src.infrastructure.settings import settings


class UserService:
    http_bearer = HTTPBearer()

    @staticmethod
    def validate_password(password: str) -> bool:
        length_error = len(password) < 8
        digit_error = re.search(r"\d", password) is None
        uppercase_error = re.search(r"[A-Z]", password) is None
        lowercase_error = re.search(r"[a-z]", password) is None
        symbol_error = (
            re.search(r"[ !@#$%^&*()_+{}|:\"<>?[\];\',./\\`~-]", password) is None
        )
        valid_password = not (
            length_error
            or digit_error
            or uppercase_error
            or lowercase_error
            or symbol_error
        )

        return valid_password

    @staticmethod
    def encrypt_password(password) -> str:
        password_bytes = password.encode("utf-8")

        hash_object = hashlib.sha256(password_bytes)

        hashed_password = hash_object.hexdigest()

        return hashed_password

    def verify_password(self, plain_password, hashed_password) -> bool:
        encrypted_password = self.encrypt_password(plain_password)

        return encrypted_password == hashed_password

    @staticmethod
    def generate_jwt(user: UserModel, exp: datetime) -> str:
        secret_key = settings.jwt.secret_key
        algorithm = settings.jwt.algorithm

        payload = PayloadSchema(
            sub=str(user.id),
            cash=user.cash,
            balance=user.balance,
            created_at=user.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            exp=exp,
        )

        return jwt.encode(payload.dict(), secret_key, algorithm=algorithm)

    def generate_tokens(self, user: UserModel) -> TokenSchema:
        access_token_exp = datetime.utcnow() + timedelta(
            minutes=settings.jwt.access_token_minutes_exp
        )
        refresh_token_exp = datetime.utcnow() + timedelta(
            minutes=settings.jwt.refresh_token_minutes_exp
        )

        tokens = TokenSchema(
            access_token=self.generate_jwt(user, access_token_exp),
            refresh_token=self.generate_jwt(user, refresh_token_exp),
        )

        return tokens

    @staticmethod
    def verify_jwt(token: str, refresh: bool) -> PayloadSchema:
        try:
            payload = jwt.decode(
                token,
                settings.jwt.secret_key,
                options={"verify_exp": not refresh},
                algorithms=[settings.jwt.algorithm],
            )
            user_id: str = payload.get("sub")

            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Could not validate credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return payload

        except jwt.exceptions.PyJWTError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
