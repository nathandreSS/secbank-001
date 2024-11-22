from typing import List, Any, Generic, TypeVar

from pydantic import BaseModel


T = TypeVar("T")


class ItemsPagination(BaseModel, Generic[T]):
    items: List[Any]
    page: int
    limit: int
    total: int
