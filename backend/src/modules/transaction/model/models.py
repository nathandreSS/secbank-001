import logging
import uuid
from typing import Sequence, Tuple

from sqlalchemy import (
    UUID,
    Column,
    String,
    Float,
    ForeignKey,
    DateTime,
    Update,
    select,
    or_,
    func,
    text,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship

from src.infrastructure.database.init_db import Base
from src.modules.base_exceptions import DatabaseException, ExploitException
from src.modules.user.model.models import UserModel


class TransactionModel(Base):
    __tablename__ = "transactions"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    from_user = Column(UUID, ForeignKey("users.id"), nullable=False)
    to_user = Column(UUID, ForeignKey("users.id"), nullable=False)
    description = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default="NOW")

    sender = relationship(
        "UserModel",
        back_populates="transactions_made",
        foreign_keys="TransactionModel.from_user",
    )
    receiver = relationship(
        "UserModel",
        back_populates="transactions_received",
        foreign_keys="TransactionModel.to_user",
    )

    @staticmethod
    async def deposit(
        session: AsyncSession, user: UserModel, amount: float
    ) -> "TransactionModel":
        try:
            transaction = TransactionModel(
                from_user=user.id, to_user=user.id, description="Deposit", amount=amount
            )
            session.add(transaction)

            update_query = (
                Update(UserModel)
                .where(UserModel.id == user.id)
                .values(cash=user.cash - amount, balance=user.balance + amount)
            )

            await session.execute(update_query)
            await session.commit()
            await session.refresh(transaction)
            return transaction

        except Exception as e:
            logging.error(e.args, exc_info=True)
            raise DatabaseException()

    @staticmethod
    async def withdraw(
        session: AsyncSession, user: UserModel, amount: float
    ) -> "TransactionModel":
        try:
            transaction = TransactionModel(
                from_user=user.id,
                to_user=user.id,
                description="Withdraw",
                amount=amount,
            )
            session.add(transaction)

            update_query = (
                Update(UserModel)
                .where(UserModel.id == user.id)
                .values(cash=user.cash + amount, balance=user.balance - amount)
            )

            await session.execute(update_query)
            await session.commit()
            await session.refresh(transaction)
            return transaction

        except Exception as e:
            logging.error(e.args, exc_info=True)
            raise DatabaseException()

    @staticmethod
    async def transfer(
        session: AsyncSession,
        amount: float,
        to_user: UUID,
        user: UserModel,
        description: str,
    ) -> None:
        try:
            id = uuid.uuid4()
            sql = f"INSERT INTO transactions (id, description, from_user, to_user, amount) VALUES ('{id}', '{description}', '{user.id}', '{to_user}', {amount})"
            query = text(sql)
            await session.execute(query)
            await session.flush()

            query = select(TransactionModel).filter(TransactionModel.id == id)
            transaction = (await session.execute(query)).scalar_one_or_none()

            # Update sender
            update_query = (
                Update(UserModel)
                .where(UserModel.id == transaction.from_user)
                .values(balance=user.balance - transaction.amount)
            )
            await session.execute(update_query)

            # Update receiver
            update_query = (
                Update(UserModel)
                .where(UserModel.id == transaction.to_user)
                .values(balance=UserModel.balance + transaction.amount)
            )
            await session.execute(update_query)
            await session.commit()
        except Exception as e:
            logging.error(e.args, exc_info=True)
            raise ExploitException(e)

    @staticmethod
    async def get(
        session: AsyncSession, page: int, limit: int, user_id: UUID
    ) -> Tuple[Sequence["TransactionModel"], int]:
        try:
            offset = limit * page
            _filter = or_(
                TransactionModel.from_user == user_id,
                TransactionModel.to_user == user_id,
            )
            result_query = (
                select(TransactionModel).filter(_filter).limit(limit).offset(offset)
            )
            transactions = (await session.execute(result_query)).scalars().all()
            count_query = (
                select(func.count()).select_from(TransactionModel).filter(_filter)
            )
            total = (await session.execute(count_query)).scalar()

            return transactions, total

        except Exception as e:
            logging.error(e.args, exc_info=True)
            raise DatabaseException()
