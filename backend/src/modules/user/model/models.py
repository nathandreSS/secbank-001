import uuid
from datetime import datetime

from sqlalchemy import Column, UUID, String, Float, DateTime, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship

from src.modules.user.view.schemas.request import CreateUser

from src.infrastructure.database.init_db import Base
from src.modules.base_exceptions import DatabaseException
from src.modules.user.model.exceptions import DuplicatedUserException


class UserModel(Base):
    __tablename__ = "users"

    id = Column(UUID, primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    cash = Column(Float, default=300)
    balance = Column(Float, default=0)
    access_token = Column(String)
    refresh_token = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    transactions_made = relationship(
        "TransactionModel",
        back_populates="sender",
        foreign_keys="TransactionModel.from_user",
    )
    transactions_received = relationship(
        "TransactionModel",
        back_populates="receiver",
        foreign_keys="TransactionModel.to_user",
    )

    @staticmethod
    async def create(session: AsyncSession, user: CreateUser) -> "UserModel":
        user_repository = UserModel(username=user.username, password=user.password)
        try:
            session.add(user_repository)
            await session.commit()
            await session.refresh(user_repository)

        except IntegrityError as e:
            if (
                'duplicate key value violates unique constraint "users_username_key"'
                in str(e)
            ):
                raise DuplicatedUserException()

            raise DatabaseException()

        except Exception as e:
            raise DatabaseException()

        return user_repository

    @staticmethod
    async def update_tokens(
        session: AsyncSession, user_id: UUID, access_token: str, refresh_token: str
    ) -> "UserModel" or None:
        query = (
            update(UserModel)
            .where(UserModel.id == user_id)
            .values(access_token=access_token, refresh_token=refresh_token)
        )

        try:
            await session.execute(query)
            await session.commit()

        except Exception as e:
            raise DatabaseException(e)

    @staticmethod
    async def get_by_username(
        session: AsyncSession, username: str
    ) -> "UserModel" or None:
        query = select(UserModel).filter(UserModel.username == username)
        user = (await session.execute(query)).scalars().first()
        return user

    @staticmethod
    async def get_by_id(session: AsyncSession, id: UUID) -> "UserModel" or None:
        query = select(UserModel).filter(UserModel.id == id)
        user = (await session.execute(query)).scalars().first()
        return user

    @staticmethod
    async def get_cash(session: AsyncSession, id: UUID) -> float:
        query = select(UserModel.cash).filter(UserModel.id == id)
        user = (await session.execute(query)).scalars().first()
        return user.cash
