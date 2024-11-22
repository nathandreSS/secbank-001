class DomainException(Exception):
    """Base exception for domain-specific errors"""

    pass


class WeakPasswordException(DomainException):
    """Raised when a password is too weak"""

    pass


class InvalidCredentialsException(DomainException):
    """Raised when invalid credentials are provided"""

    pass
