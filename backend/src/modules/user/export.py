from src.modules.user.view.endpoints import router

from src.modules.user.dependencies.get_user import verify_access_token

from src.modules.user.view.exception_handlers import (
    handle_exception,
    handle_duplicated_user,
    handle_weak_password,
    handle_invalid_credentials,
)

from src.modules.user.model.models import UserModel

from src.modules.user.controller.exceptions import (
    InvalidCredentialsException,
    WeakPasswordException,
)

from src.modules.user.model.exceptions import DuplicatedUserException
