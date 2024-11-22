"""create secbank admin

Revision ID: b82aec6d3c7e
Revises: 982f499e791b
Create Date: 2024-11-18 14:16:15.378901

"""

import secrets
import string
import uuid
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import text

from src.modules.user.controller.service import UserService

# revision identifiers, used by Alembic.
revision: str = "b82aec6d3c7e"
down_revision: Union[str, None] = "982f499e791b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def generate_random_password(length=12):
    # Define the character sets
    alphabet = string.ascii_letters  # both lowercase and uppercase letters
    digits = string.digits  # numbers 0-9
    punctuation = string.punctuation  # special characters

    # Combine all character sets
    all_characters = alphabet + digits + punctuation

    # Generate a random password ensuring each type of character is included
    password = [
        secrets.choice(string.ascii_lowercase),  # at least one lowercase letter
        secrets.choice(string.ascii_uppercase),  # at least one uppercase letter
        secrets.choice(string.digits),  # at least one digit
        secrets.choice(string.punctuation),  # at least one special character
    ]

    # Fill the rest of the password length with random choices
    password += [secrets.choice(all_characters) for _ in range(length - 4)]

    # Shuffle the result to ensure randomness and convert to a string
    secrets.SystemRandom().shuffle(password)
    return "".join(password)


def upgrade() -> None:

    user_id = uuid.uuid4()
    password = UserService.encrypt_password(generate_random_password())
    balance = 10**11  # 10 billions
    op.execute(
        text(
            f"INSERT INTO users (id, username, password, cash, balance) VALUES ('{user_id}',  'secBankAdmin', '{password}', 0, {balance})"
        )
    )


def downgrade() -> None:
    op.execute(text("DELETE FROM users WHERE username='secBankAdmin'"))
