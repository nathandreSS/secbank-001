from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

from src.modules.user.controller.exceptions import (
    WeakPasswordException,
    InvalidCredentialsException,
)
from src.modules.user.model.exceptions import DuplicatedUserException


def handle_exploit(request: Request, exc: Exception) -> Response:
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": f"{exc.__str__()}"},
    )


def handle_exception(request: Request, exc: Exception) -> Response:
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "An unexpected error occurred."},
    )


def handle_duplicated_user(request: Request, exc: DuplicatedUserException) -> Response:
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"error": "An user with this username already exists."},
    )


def handle_weak_password(request: Request, exc: WeakPasswordException) -> Response:
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "error": "A password must includes at least 8 characters, uppercase letters, lowercase letters, numbers, and special characters."
        },
    )


def handle_invalid_credentials(request: Request, exc: InvalidCredentialsException):
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={"error": "Invalid credentials."},
    )
