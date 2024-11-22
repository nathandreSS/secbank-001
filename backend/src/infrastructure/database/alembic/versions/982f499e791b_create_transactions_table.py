"""create transactions table

Revision ID: 982f499e791b
Revises: 5f33b7f5585c
Create Date: 2024-11-11 09:53:52.931982

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "982f499e791b"
down_revision: Union[str, None] = "5f33b7f5585c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "transactions",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("from_user", sa.UUID(), nullable=False),
        sa.Column("to_user", sa.UUID(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("amount", sa.Float(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default="NOW", nullable=False),
        sa.ForeignKeyConstraint(
            ["from_user"],
            ["users.id"],
        ),
        sa.ForeignKeyConstraint(
            ["to_user"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("transactions")
    # ### end Alembic commands ###