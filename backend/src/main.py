from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.modules.base_exceptions import DatabaseException, ExploitException
from src.modules.transaction.controller.exceptions import (
    InsufficientBalanceException,
    InsufficientCashException,
)

# IMPORT ROUTERS
from src.modules.user.export import router as user_router
from src.modules.transaction.export import router as transaction_router

# IMPORT EXCEPTION_HANDLERS
from src.modules.user.export import (
    handle_weak_password,
    handle_exception,
    handle_duplicated_user,
    handle_invalid_credentials,
)

# IMPORT EXCEPTIONS
from src.modules.user.export import (
    WeakPasswordException,
    InvalidCredentialsException,
    DuplicatedUserException,
)

from src.modules.transaction.export import (
    handle_insufficient_cash,
    handle_insufficient_balance,
)
from src.modules.user.view.exception_handlers import handle_exploit

app = FastAPI()

# INCLUDE ROUTERS TO APP
app.include_router(user_router)
app.include_router(transaction_router)

# INCLUDE EXCEPTION_HANDLERS TO APP

# COMMON
app.add_exception_handler(Exception, handle_exception)
app.add_exception_handler(DatabaseException, handle_exception)
app.add_exception_handler(ExploitException, handle_exploit)
# USER
app.add_exception_handler(DuplicatedUserException, handle_duplicated_user)
app.add_exception_handler(WeakPasswordException, handle_weak_password)
app.add_exception_handler(InvalidCredentialsException, handle_invalid_credentials)
# TRANSACTION
app.add_exception_handler(InsufficientCashException, handle_insufficient_cash)
app.add_exception_handler(InsufficientBalanceException, handle_insufficient_balance)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (não recomendado para produção)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)
