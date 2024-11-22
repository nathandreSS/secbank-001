import logging
import traceback

from src.infrastructure.database.init_db import async_session, session_rollback
from src.modules.transaction.model.models import TransactionModel
from src.modules.user.controller.use_cases.base_use_case import UserUseCase
from src.modules.user.controller.exceptions import WeakPasswordException
from src.modules.user.model.exceptions import DuplicatedUserException
from src.modules.user.view.schemas.request import CreateUser


class CreateUserUseCase(UserUseCase):
    async def execute(self, user: CreateUser) -> None:
        if not self.service.validate_password(user.password):
            raise WeakPasswordException()

        async with async_session() as session:
            try:
                user.password = self.service.encrypt_password(user.password)

                created_user = await self.repository.create(session=session, user=user)
                admin = await self.repository.get_by_username(
                    session=session, username="secBankAdmin"
                )
                # The user will receive a transfer as a welcome gift
                await TransactionModel.transfer(
                    session=session,
                    amount=1,
                    to_user=created_user.id,
                    user=admin,
                    description="This is a welcome gift",
                )

            except DuplicatedUserException as e:
                raise e

            except Exception as e:
                logging.error(e.args, exc_info=True)
                await session_rollback(session)
