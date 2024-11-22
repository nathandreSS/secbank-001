from src.modules.base_exceptions import UseCaseException


class InsufficientCashException(UseCaseException):
    """Raised when the user has insufficient cash to deposit"""


class InsufficientBalanceException(UseCaseException):
    """Raised when the user has insufficient balance to withdraw"""
