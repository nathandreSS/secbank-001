from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import logging

# Import your Base model metadata
from src.infrastructure.database.init_db import (
    Base,
)  # This should point to your database's Base class
from src.modules.user.export import UserModel
from src.modules.transaction.export import TransactionModel

from src.infrastructure.settings import settings

# This is the Alembic Config object, which provides access to values within the .ini file
config = context.config
config.set_main_option("sqlalchemy.url", settings.postgresql.get_sync_url())

# Interpret the config file for Python logging
fileConfig(config.config_file_name)

# Add your model's MetaData object for 'autogenerate' support
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode without needing an Engine."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode with an Engine."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
