from src.modules.user.model.models import UserModel
from src.modules.user.controller.use_cases.base_use_case import UserUseCase


class GetInfoUseCase(UserUseCase):
    async def execute(self, user: UserModel) -> UserModel:
        return user
