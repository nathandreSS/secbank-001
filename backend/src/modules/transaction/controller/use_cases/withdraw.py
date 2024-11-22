import logging
import traceback

from src.infrastructure.database.init_db import (
    session_rollback,
    close_session,
    async_session,
)
from src.modules.transaction.controller.exceptions import InsufficientBalanceException
from src.modules.transaction.controller.use_cases.base_use_case import (
    TransactionUseCase,
)
from src.modules.transaction.view.schemas.response import TransactionSchema
from src.modules.user.export import UserModel


class WithdrawUseCase(TransactionUseCase):
    async def execute(self, amount: float, user: UserModel) -> TransactionSchema:
        if user.balance < amount:
            raise InsufficientBalanceException()

        async with async_session() as session:
            try:
                transaction = await self.repository.withdraw(
                    session=session, user=user, amount=amount
                )
                return transaction
            except Exception as e:
                logging.error(e.args, exc_info=True)
                await session_rollback(session)
                raise e
