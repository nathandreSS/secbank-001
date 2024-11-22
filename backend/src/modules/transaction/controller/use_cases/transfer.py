import logging

from src.infrastructure.database.init_db import session_rollback, async_session
from src.modules.transaction.controller.exceptions import InsufficientBalanceException
from src.modules.transaction.controller.use_cases.base_use_case import (
    TransactionUseCase,
)
from src.modules.user.model.models import UserModel


class TransferUseCase(TransactionUseCase):
    async def execute(
        self, amount: float, to_user: str, user: UserModel, description: str
    ) -> None:
        if user.balance < amount:
            raise InsufficientBalanceException()

        async with async_session() as session:
            try:
                await self.repository.transfer(
                    session=session,
                    amount=amount,
                    to_user=to_user,
                    user=user,
                    description=description,
                )

            except Exception as e:
                logging.error(e.args, exc_info=True)
                await session_rollback(session)
                raise e
