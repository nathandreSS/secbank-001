import logging
import traceback

from src.infrastructure.database.init_db import session_rollback, async_session
from src.modules.transaction.controller.exceptions import InsufficientCashException
from src.modules.transaction.controller.use_cases.base_use_case import (
    TransactionUseCase,
)
from src.modules.transaction.model.models import TransactionModel
from src.modules.user.export import UserModel


class DepositUseCase(TransactionUseCase):

    async def execute(self, amount: float, user: UserModel) -> TransactionModel:
        if user.cash < amount:
            raise InsufficientCashException()

        async with async_session() as session:
            try:
                transaction = await self.repository.deposit(
                    session=session, user=user, amount=amount
                )
                return transaction

            except Exception as e:
                logging.error(e.args, exc_info=True)
                await session_rollback(session)
                raise e
