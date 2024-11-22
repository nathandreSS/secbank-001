import logging
import traceback

from src.infrastructure.database.init_db import async_session
from src.modules.common.view.schemas.response import ItemsPagination
from src.modules.transaction.controller.use_cases.base_use_case import (
    TransactionUseCase,
)
from src.modules.transaction.view.schemas.response import TransactionSchema


class GetTransactionsUseCase(TransactionUseCase):
    async def execute(
        self, page: int, limit: int, user_id: int
    ) -> ItemsPagination[TransactionSchema]:
        async with async_session() as session:
            try:
                transactions, total = await self.repository.get(
                    session=session, page=page, limit=limit, user_id=user_id
                )

                formatted_transaction = [
                    TransactionSchema(**transaction.__dict__)
                    for transaction in transactions
                ]

                return ItemsPagination(
                    items=formatted_transaction, page=page, limit=limit, total=total
                )

            except Exception as e:
                logging.error(traceback.format_exc())
                raise e
