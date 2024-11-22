from src.modules.base_exceptions import DatabaseException


class DuplicatedUserException(DatabaseException):
    """Raised when a user with the same email already exists"""

    pass
