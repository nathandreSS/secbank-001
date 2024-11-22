from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.user.controller.service import UserService
from src.infrastructure.database.init_db import async_session
from src.modules.user.model.models import UserModel


class UserUseCase:
    def __init__(self):
        self.repository = UserModel()
        self.service = UserService()
