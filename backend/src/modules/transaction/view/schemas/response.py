from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class TransactionSchema(BaseModel):
    id: UUID
    description: Optional[str]
    from_user: UUID
    to_user: UUID
    amount: float
    created_at: datetime
