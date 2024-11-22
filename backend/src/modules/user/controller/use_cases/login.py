import logging
import traceback

from src.infrastructure.database.init_db import (
    close_session,
    async_session,
    session_rollback,
)
from src.modules.user.controller.schemas import TokenSchema
from src.modules.user.controller.use_cases.base_use_case import UserUseCase
from src.modules.user.controller.exceptions import InvalidCredentialsException
from src.modules.user.view.schemas.request import Login


class LoginUseCase(UserUseCase):

    async def execute(self, data: Login) -> TokenSchema:
        async with async_session() as session:
            try:
                user = await self.repository.get_by_username(
                    session=session, username=data.username
                )

                if (not user) or (
                    not self.service.verify_password(
                        plain_password=data.password, hashed_password=user.password
                    )
                ):
                    raise InvalidCredentialsException()

                tokens = self.service.generate_tokens(user)

                await self.repository.update_tokens(
                    session=session,
                    user_id=user.id,
                    access_token=tokens.access_token,
                    refresh_token=tokens.refresh_token,
                )

                return tokens
            except InvalidCredentialsException as e:
                raise e
            except Exception as e:
                logging.error(e.args, exc_info=True)
                await session_rollback(session)
                raise e
