import logging
import traceback

from src.infrastructure.database.init_db import (
    close_session,
    session_rollback,
    async_session,
)
from src.modules.user.controller.schemas import TokenSchema
from src.modules.user.controller.use_cases.base_use_case import UserUseCase
from src.modules.user.controller.exceptions import InvalidCredentialsException
from src.modules.user.view.schemas.request import Refresh
from src.modules.user.model.models import UserModel


class RefreshUseCase(UserUseCase):
    async def execute(self, data: Refresh, user: UserModel) -> TokenSchema:
        self.service.verify_jwt(data.refresh_token, refresh=True)

        async with async_session() as session:
            if data.refresh_token == user.refresh_token:
                try:
                    tokens = self.service.generate_tokens(user=user)
                    await self.repository.update_tokens(
                        session=session,
                        user_id=user.id,
                        access_token=tokens.access_token,
                        refresh_token=tokens.refresh_token,
                    )
                    return tokens
                except Exception as e:
                    logging.error(e.args, exc_info=True)
                    await session_rollback(session)
                    raise e
            else:
                raise InvalidCredentialsException()
