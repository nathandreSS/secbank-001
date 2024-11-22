from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

from src.modules.transaction.controller.exceptions import (
    InsufficientBalanceException,
    InsufficientCashException,
)
from src.modules.user.controller.exceptions import (
    WeakPasswordException,
    InvalidCredentialsException,
)
from src.modules.user.model.exceptions import DuplicatedUserException


def handle_insufficient_balance(request: Request, exc: InsufficientBalanceException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"error": "Insufficient balance."},
    )


def handle_insufficient_cash(request: Request, exc: InsufficientCashException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Insufficient cash."}
    )
