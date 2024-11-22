from uuid import UUID

import jwt
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from starlette.requests import Request

from src.modules.user.controller.exceptions import InvalidCredentialsException
from src.modules.user.controller.service import UserService
from src.infrastructure.database.init_db import async_session
from src.modules.user.model.models import UserModel


http_bearer = HTTPBearer()


async def verify_access_token(
    request: Request, credentials: HTTPAuthorizationCredentials = Depends(http_bearer)
) -> UserModel:
    try:
        user_service = UserService()
        payload = user_service.verify_jwt(
            credentials.credentials, request.url.path == "/user/refresh"
        )

        user_repository = UserModel()
        async with async_session() as session:
            user = await user_repository.get_by_id(
                session=session, id=UUID(payload["sub"], version=4)
            )

            if user.access_token != credentials.credentials:
                raise InvalidCredentialsException()

            return user

    except jwt.exceptions.PyJWTError as e:
        raise InvalidCredentialsException()
