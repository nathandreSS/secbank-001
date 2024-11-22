import logging

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from src.infrastructure.settings import settings

DATABASE_URL = settings.postgresql.get_async_url()

engine = create_async_engine(DATABASE_URL, echo=False)

async_session = sessionmaker(
    bind=engine, class_=AsyncSession, autoflush=False, expire_on_commit=False
)

Base = declarative_base()


# Dependency to get the DB session
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session


async def session_rollback(session: AsyncSession):
    await session.rollback()


async def close_session(session: AsyncSession):
    logging.error("CLOSING SESSION")
    await session.close_all()
