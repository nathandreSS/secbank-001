import asyncio

from sqlalchemy.ext.asyncio import AsyncSession

from src.modules.transaction.controller.service import TransactionService
from src.infrastructure.database.init_db import async_session, close_session
from src.modules.transaction.model.models import TransactionModel


class TransactionUseCase:
    def __init__(self):
        self.repository = TransactionModel()
        self.service = TransactionService()
